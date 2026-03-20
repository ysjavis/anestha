import { calculatePediatricAirwayEstimates } from '../calc/pediatric.js';
import { formatNumber, isPositiveNumber, getUnitBase, shouldDeferDecimalInput } from '../calc/utils.js';
import { PEDIATRIC_DRUG_PRESETS, DEFAULT_CUSTOM_PEDIATRIC_DRUG } from '../data/pediatric-presets.js';
import { SUPRAGLOTTIC_DEVICE_GUIDES, getSupraglotticDeviceRecommendation, getOralAirwayRecommendation, getLaryngoscopeRecommendation, getNasalAirwayRecommendation, getFaceMaskRecommendation } from '../data/pediatric-airway.js';
import {
  getPediatricDoseState, updatePediatricDoseState,
  getPediatricDrugPresetById, createDefaultPediatricDrugSettings,
  getSavedCustomPediatricDrugs, getActiveSavedCustomPediatricDrugId,
  getSavedCustomOptionValue, getSavedCustomDrugIdFromOptionValue,
  isCustomPediatricSelection, getPediatricSelectValueFromState,
  normalizePediatricDoseState, normalizeSavedCustomPediatricDrug,
  sanitizePediatricActiveMode, sanitizePediatricSelectedDrugId,
  createDefaultPediatricDoseState,
  persistedState, savePersistedState
} from '../store/state.js';
import { currentLanguage, t } from '../i18n.js';
import { getDisplaySourceLabel, renderReferenceList } from '../calc/reference-helpers.js';
import { calculateWeightBasedDoseRange, calculateDoseVolume } from '../calc/infusion.js';

// -----------------------------
// DOM refs
// -----------------------------

const pediatricForm = document.getElementById("pediatric-form");
const pediatricResetButton = document.getElementById("pediatric-reset-button");
const pediatricDrugSelect = document.getElementById("pediatric-drug-select");
const pediatricModeTabs = document.querySelectorAll("[data-pediatric-mode-tab]");
const pediatricModePanels = document.querySelectorAll("[data-pediatric-mode-panel]");
const pediatricDrugHelp = document.getElementById("pediatric-drug-help");
const pediatricToggleUnverifiedButton = document.getElementById("pediatric-toggle-unverified-button");
const pediatricCustomFields = document.getElementById("pediatric-custom-fields");
const pediatricSaveCustomButton = document.getElementById("pediatric-save-custom-button");
const pediatricDeleteCustomButton = document.getElementById("pediatric-delete-custom-button");
const pediatricCustomSaveHelp = document.getElementById("pediatric-custom-save-help");
const pediatricRangeText = document.getElementById("pediatric-range-text");
const pediatricAgeNoteText = document.getElementById("pediatric-age-note-text");
const pediatricConcentrationText = document.getElementById("pediatric-concentration-text");
const pediatricVerificationText = document.getElementById("pediatric-verification-text");
const pediatricNotesText = document.getElementById("pediatric-notes-text");
const pediatricAgeWarning = document.getElementById("pediatric-age-warning");
const pediatricErrorMessage = document.getElementById("pediatric-error-message");
const pediatricResultCard = document.getElementById("pediatric-result-card");
const pediatricResultLabel = document.getElementById("pediatric-result-label");
const pediatricPrimaryResult = document.getElementById("pediatric-primary-result");
const pediatricSecondaryResultLabel = document.getElementById("pediatric-secondary-result-label");
const pediatricSecondaryResult = document.getElementById("pediatric-secondary-result");
const pediatricConcentrationResult = document.getElementById("pediatric-concentration-result");
const pediatricDoseExplanation = document.getElementById("pediatric-dose-explanation");
const pediatricVolumeExplanation = document.getElementById("pediatric-volume-explanation");
const pediatricDoseReferenceList = document.getElementById("pediatric-dose-reference-list");
const pediatricResultWarning = document.getElementById("pediatric-result-warning");
const pediatricConcentrationUnitLabel = document.getElementById("pediatric-concentration-unit-label");
const pediatricAirwayWarning = document.getElementById("pediatric-airway-warning");
const pediatricAirwayDeviceModelField = document.getElementById("pediatric-airway-device-model-field");
const pediatricAirwayResultCard = document.getElementById("pediatric-airway-result-card");
const pediatricAirwayPrimaryResult = document.getElementById("pediatric-airway-primary-result");
const pediatricAirwaySecondaryLabel = document.getElementById("pediatric-airway-secondary-label");
const pediatricAirwaySecondaryResult = document.getElementById("pediatric-airway-secondary-result");
const pediatricAirwayContext = document.getElementById("pediatric-airway-context");
const pediatricAirwayDeviceResult = document.getElementById("pediatric-airway-device-result");
const pediatricAirwaySizeExplanation = document.getElementById("pediatric-airway-size-explanation");
const pediatricAirwayDepthExplanation = document.getElementById("pediatric-airway-depth-explanation");
const pediatricAirwayReferenceList = document.getElementById("pediatric-airway-reference-list");
const pediatricAirwayResultWarning = document.getElementById("pediatric-airway-result-warning");
const pediatricEmergencyResultCard = document.getElementById("pediatric-emergency-result-card");
const pediatricEmergencyPrimaryResult = document.getElementById("pediatric-emergency-primary-result");
const pediatricEmergencyContext = document.getElementById("pediatric-emergency-context");
const pediatricEmergencyDoseGrid = document.getElementById("pediatric-emergency-dose-grid");
const pediatricEmergencyReferenceList = document.getElementById("pediatric-emergency-reference-list");
const pediatricEmergencyResultWarning = document.getElementById("pediatric-emergency-result-warning");

const pediatricInputs = {
  weight: document.getElementById("pediatric-weight"),
  emergencyWeight: document.getElementById("pediatric-emergency-weight"),
  ageGroup: document.getElementById("pediatric-age-group"),
  concentration: document.getElementById("pediatric-concentration"),
  customDrugName: document.getElementById("pediatric-custom-drug-name"),
  customDrugNotes: document.getElementById("pediatric-custom-drug-notes"),
  minDosePerKg: document.getElementById("pediatric-min-dose-per-kg"),
  maxDosePerKg: document.getElementById("pediatric-max-dose-per-kg"),
  doseUnit: document.getElementById("pediatric-dose-unit"),
  concentrationUnit: document.getElementById("pediatric-concentration-unit"),
  maxTotalDose: document.getElementById("pediatric-max-total-dose"),
  airwayAgeYears: document.getElementById("pediatric-airway-age-years"),
  airwayWeight: document.getElementById("pediatric-airway-weight"),
  airwayDeviceCategory: document.getElementById("pediatric-airway-device-category"),
  airwayDeviceModel: document.getElementById("pediatric-airway-device-model")
};

// -----------------------------
// Constants
// -----------------------------

const PEDIATRIC_EMERGENCY_REFERENCE_IDS = [
  "pediatric_emergency_cardiac_arrest_aha",
  "pediatric_emergency_bradycardia_aha",
  "pediatric_emergency_tachycardia_aha"
];

// -----------------------------
// Calculation helpers
// -----------------------------

function getPediatricEmergencyCards(weightKg) {
  const epinephrineDoseMg = weightKg * 0.01;
  const epinephrineVolumeMl = epinephrineDoseMg / 0.1;
  const atropineRawMg = weightKg * 0.02;
  const atropineDoseMg = Math.min(Math.max(atropineRawMg, 0.1), 0.5);
  const adenosineFirstMg = Math.min(weightKg * 0.1, 6);
  const adenosineSecondMg = Math.min(weightKg * 0.2, 12);
  const amiodaroneFirstMg = Math.min(weightKg * 5, 300);
  const amiodaroneRepeatMg = Math.min(weightKg * 5, 150);
  const lidocaineDoseMg = weightKg * 1;
  const isEnglish = currentLanguage === "en";

  return [
    {
      context: isEnglish ? "Cardiac arrest / Bradycardia" : "Cardiac arrest / Bradycardia",
      name: "Epinephrine",
      primary: `${formatNumber(epinephrineDoseMg, 2)} mg IV/IO`,
      secondary: isEnglish
        ? `0.1 mg/mL concentration: ${formatNumber(epinephrineVolumeMl, 2)} mL`
        : `0.1 mg/mL 농도 기준 ${formatNumber(epinephrineVolumeMl, 2)} mL`,
      note: isEnglish
        ? "Cardiac arrest / symptomatic bradycardia context. In arrest, repeat every 3-5 minutes."
        : "Cardiac arrest / symptomatic bradycardia 맥락입니다. Arrest에서는 3-5분마다 반복합니다."
    },
    {
      context: "Bradycardia",
      name: "Atropine",
      primary: `${formatNumber(atropineDoseMg, 2)} mg IV/IO`,
      secondary: isEnglish
        ? "0.02 mg/kg (minimum 0.1 mg, maximum 0.5 mg)"
        : "0.02 mg/kg (최소 0.1 mg, 최대 0.5 mg)",
      note: isEnglish
        ? `${atropineRawMg < 0.1 ? "Minimum single dose applied. " : atropineRawMg > 0.5 ? "Maximum single dose applied. " : ""}May repeat once for bradycardia with increased vagal tone or primary AV block.`
        : `${atropineRawMg < 0.1 ? "최소 1회 용량이 적용되었습니다. " : atropineRawMg > 0.5 ? "최대 1회 용량이 적용되었습니다. " : ""}Increased vagal tone 또는 primary AV block 관련 bradycardia에서 1회 반복할 수 있습니다.`
    },
    {
      context: isEnglish ? "Regular narrow-complex tachycardia" : "Regular narrow-complex tachycardia",
      name: "Adenosine",
      primary: isEnglish
        ? `First dose: ${formatNumber(adenosineFirstMg, 2)} mg IV/IO`
        : `1차 dose: ${formatNumber(adenosineFirstMg, 2)} mg IV/IO`,
      secondary: isEnglish
        ? `Second dose: ${formatNumber(adenosineSecondMg, 2)} mg IV/IO`
        : `2차 dose: ${formatNumber(adenosineSecondMg, 2)} mg IV/IO`,
      note: isEnglish
        ? "Regular narrow-complex tachycardia context. Give as a rapid push followed by flush."
        : "Regular narrow-complex tachycardia 맥락입니다. Rapid push 후 flush가 필요합니다."
    },
    {
      context: "VF/pVT arrest",
      name: "Amiodarone",
      primary: isEnglish
        ? `First dose: ${formatNumber(amiodaroneFirstMg, 2)} mg IV/IO`
        : `1차 dose: ${formatNumber(amiodaroneFirstMg, 2)} mg IV/IO`,
      secondary: isEnglish
        ? `Subsequent dose ceiling: ${formatNumber(amiodaroneRepeatMg, 2)} mg`
        : `이후 dose 상한: ${formatNumber(amiodaroneRepeatMg, 2)} mg`,
      note: isEnglish
        ? "Shock-refractory VF/pVT arrest context. Algorithm lists 5 mg/kg bolus, max 300 mg first dose then 150 mg."
        : "Shock-refractory VF/pVT arrest 맥락입니다. Algorithm 기준 5 mg/kg bolus이며 1차 최대 300 mg, 이후 150 mg입니다."
    },
    {
      context: "VF/pVT arrest",
      name: "Lidocaine",
      primary: `${formatNumber(lidocaineDoseMg, 2)} mg IV/IO`,
      secondary: isEnglish
        ? "1 mg/kg bolus"
        : "1 mg/kg bolus",
      note: isEnglish
        ? "Alternative antiarrhythmic for shock-refractory VF/pVT when amiodarone is not used."
        : "Amiodarone을 사용하지 않을 때 shock-refractory VF/pVT의 대안 antiarrhythmic입니다."
    }
  ];
}

function getPediatricAirwayReferenceIds(values) {
  if (values.deviceCategory === "ett") {
    return ["pediatric_ett_openanesthesia", "pediatric_ett_msd_calculator"];
  }

  if (values.deviceCategory === "oral-airway") {
    return ["pediatric_oral_airway_basics"];
  }

  if (values.deviceCategory === "nasal-airway") {
    return ["pediatric_nasal_airway_pubmed", "pediatric_oral_airway_basics"];
  }

  if (values.deviceCategory === "laryngoscope") {
    return ["pediatric_oral_airway_basics", "pediatric_laryngoscope_blade_guide"];
  }

  if (values.deviceCategory === "face-mask") {
    return ["pediatric_face_mask_ambu", "pediatric_face_mask_intersurgical"];
  }

  if (values.deviceCategory !== "supraglottic") {
    return [];
  }

  if (values.deviceModel === "i-gel") {
    return ["igel_intersurgical"];
  }

  if (values.deviceModel === "lma-supreme") {
    return ["lma_supreme_teleflex"];
  }

  return [];
}

function getPediatricAirwayWarningText(deviceCategory) {
  if (deviceCategory === "ett") {
    return t("airway_warning_ett_infant");
  }

  if (deviceCategory === "supraglottic") {
    return currentLanguage === "en"
      ? "Supraglottic size guidance is weight-based. Confirm device availability, seal, and manufacturer instructions."
      : "Supraglottic size guide는 weight-based입니다. device availability, seal, manufacturer instruction을 함께 확인하세요.";
  }

  if (deviceCategory === "oral-airway") {
    return t("airway_warning_oral");
  }

  if (deviceCategory === "nasal-airway") {
    return currentLanguage === "en"
      ? "Nasal airway length is best estimated by external measurement. Age and weight are weak proxies, especially outside infancy."
      : "Nasal airway length는 외부 길이 측정이 가장 중요합니다. 특히 infancy를 벗어나면 age와 weight는 약한 proxy에 가깝습니다.";
  }

  if (deviceCategory === "laryngoscope") {
    return t("airway_warning_laryngoscope");
  }

  if (deviceCategory === "face-mask") {
    return currentLanguage === "en"
      ? "Face mask numbering varies by manufacturer. Use this as a broad starting guide and confirm actual facial fit clinically."
      : "Face mask numbering은 manufacturer마다 다릅니다. broad starting guide로만 보고 실제 facial fit을 임상적으로 확인하세요.";
  }

  return t("airway_device_select_note");
}

function getPediatricDoseReferenceIds(values) {
  if (!values || !values.profile || !Array.isArray(values.profile.references)) {
    return [];
  }

  return values.profile.references;
}

function getPediatricVerificationConfig(status) {
  if (status === "supported") {
    return {
      summary: "Supported - attached reference reviewed.",
      warning: ""
    };
  }

  if (status === "off-label") {
    return {
      summary: "Off-label / Reference only - verify institutional protocol and indication.",
      warning: "This preset may reflect off-label or institution-specific pediatric use."
    };
  }

  return {
    summary: "Unverified - do not rely on this preset without manual source confirmation.",
    warning: "This preset is not yet fully verified against a current pediatric source."
  };
}

function getPediatricVerificationRank(status) {
  if (status === "supported") {
    return 0;
  }

  if (status === "off-label") {
    return 1;
  }

  return 2;
}

function formatPediatricDrugOptionLabel(preset) {
  const profile = preset.profiles.pediatricBolus;

  if (profile.verificationStatus === "off-label") {
    return `${preset.name} [Off-label]`;
  }

  if (profile.verificationStatus === "unverified") {
    return `${preset.name} [Unverified]`;
  }

  return preset.name;
}

function applyPediatricDoseLimits(doseRange, profile) {
  const doseLimits = profile.doseLimits;

  if (!doseLimits) {
    return {
      minDose: doseRange.minDose,
      maxDose: doseRange.maxDose,
      wasAdjusted: false,
      messages: []
    };
  }

  let minDose = doseRange.minDose;
  let maxDose = doseRange.maxDose;
  const messages = [];

  if (isPositiveNumber(doseLimits.maxTotalDose)) {
    if (minDose > doseLimits.maxTotalDose || maxDose > doseLimits.maxTotalDose) {
      messages.push(`Maximum single dose applied: ${formatNumber(doseLimits.maxTotalDose, 2)} ${profile.doseAmountUnit}.`);
    }

    minDose = Math.min(minDose, doseLimits.maxTotalDose);
    maxDose = Math.min(maxDose, doseLimits.maxTotalDose);
  }

  if (isPositiveNumber(doseLimits.minTotalDose)) {
    if (minDose < doseLimits.minTotalDose || maxDose < doseLimits.minTotalDose) {
      messages.push(`Minimum single dose applied: ${formatNumber(doseLimits.minTotalDose, 2)} ${profile.doseAmountUnit}.`);
    }

    minDose = Math.max(minDose, doseLimits.minTotalDose);
    maxDose = Math.max(maxDose, doseLimits.minTotalDose);
  }

  return {
    minDose: minDose,
    maxDose: Math.max(minDose, maxDose),
    wasAdjusted: messages.length > 0,
    messages: messages
  };
}

// -----------------------------
// View state helpers
// -----------------------------

function renderPediatricDrugSelectOptions() {
  const savedCustomDrugs = getSavedCustomPediatricDrugs();
  const pediatricDoseState = getPediatricDoseState();
  const showUnverifiedPresets = Boolean(pediatricDoseState.showUnverifiedPresets);
  const selectedDrugId = pediatricDoseState.selectedDrugId;
  const sortedPresets = PEDIATRIC_DRUG_PRESETS.slice().sort(function (leftPreset, rightPreset) {
    const leftRank = getPediatricVerificationRank(leftPreset.profiles.pediatricBolus.verificationStatus);
    const rightRank = getPediatricVerificationRank(rightPreset.profiles.pediatricBolus.verificationStatus);

    if (leftRank !== rightRank) {
      return leftRank - rightRank;
    }

    return leftPreset.name.localeCompare(rightPreset.name);
  });
  const visiblePresets = sortedPresets.filter(function (preset) {
    const isUnverified = preset.profiles.pediatricBolus.verificationStatus === "unverified";
    return !isUnverified || showUnverifiedPresets || preset.id === selectedDrugId;
  });
  const presetOptions = visiblePresets.map(function (preset) {
    return `<option value="${preset.id}">${formatPediatricDrugOptionLabel(preset)}</option>`;
  }).join("");
  const savedCustomOptions = savedCustomDrugs.length
    ? `<optgroup label="Saved Custom Drugs">${savedCustomDrugs.map(function (savedDrug) {
      return `<option value="${getSavedCustomOptionValue(savedDrug.id)}">${savedDrug.customDrugName}</option>`;
    }).join("")}</optgroup>`
    : "";

  pediatricDrugSelect.innerHTML = `${presetOptions}${savedCustomOptions}<option value="custom">Custom drug</option>`;
}

function getActivePediatricMode() {
  const selectedTab = document.querySelector("[data-pediatric-mode-tab].is-active");
  return selectedTab ? selectedTab.dataset.pediatricModeTab : "dosing";
}

function getCurrentPediatricDrugSettings() {
  const selectedOptionValue = pediatricDrugSelect.value;
  const drugSettingsKey = isCustomPediatricSelection(selectedOptionValue)
    ? "custom"
    : selectedOptionValue;

  return getPediatricDoseState().drugSettings[drugSettingsKey] || createDefaultPediatricDrugSettings()[drugSettingsKey];
}

function buildCustomPediatricDrugFromInputs() {
  const currentSettings = getCurrentPediatricDrugSettings();
  const minDosePerKg = Number(currentSettings.minDosePerKg) || DEFAULT_CUSTOM_PEDIATRIC_DRUG.profiles.pediatricBolus.recommendedRange.min;
  const maxDosePerKg = Number(currentSettings.maxDosePerKg) || DEFAULT_CUSTOM_PEDIATRIC_DRUG.profiles.pediatricBolus.recommendedRange.max;
  const maxTotalDose = Number(currentSettings.maxTotalDose);
  const amountUnit = getUnitBase(currentSettings.doseUnit) || DEFAULT_CUSTOM_PEDIATRIC_DRUG.profiles.pediatricBolus.doseAmountUnit;

  return {
    id: "custom",
    name: currentSettings.customDrugName.trim() || "Custom drug",
    category: "custom",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: currentSettings.doseUnit,
        doseAmountUnit: amountUnit,
        recommendedRange: {
          min: Math.min(minDosePerKg, maxDosePerKg),
          max: Math.max(minDosePerKg, maxDosePerKg)
        },
        concentration: {
          value: Number(currentSettings.concentration) || DEFAULT_CUSTOM_PEDIATRIC_DRUG.profiles.pediatricBolus.concentration.value,
          unit: currentSettings.concentrationUnit
        },
        doseLimits: isPositiveNumber(maxTotalDose)
          ? {
            maxTotalDose: maxTotalDose,
            note: "Custom maximum single dose cap."
          }
          : null,
        notes: currentSettings.customDrugNotes.trim() || "User-defined pediatric bolus reference.",
        ageGuidance: DEFAULT_CUSTOM_PEDIATRIC_DRUG.profiles.pediatricBolus.ageGuidance,
        metadata: {
          source: "User defined",
          lastReviewed: "Current session"
        }
      }
    }
  };
}

function createSavedCustomPediatricDrugFromView(savedDrugId) {
  const currentSettings = getCurrentPediatricDrugSettings();
  const customDrugName = currentSettings.customDrugName.trim();

  return {
    id: savedDrugId || customDrugName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `custom-${Date.now()}`,
    customDrugName: customDrugName,
    customDrugNotes: currentSettings.customDrugNotes,
    minDosePerKg: currentSettings.minDosePerKg,
    maxDosePerKg: currentSettings.maxDosePerKg,
    doseUnit: currentSettings.doseUnit,
    concentration: currentSettings.concentration,
    concentrationUnit: currentSettings.concentrationUnit,
    maxTotalDose: currentSettings.maxTotalDose
  };
}

function applySavedCustomPediatricDrug(savedDrug) {
  const normalizedSavedDrug = normalizeSavedCustomPediatricDrug(savedDrug);

  persistedState.pediatricDose = normalizePediatricDoseState({
    ...getPediatricDoseState(),
    selectedDrugId: "custom",
    activeSavedCustomDrugId: normalizedSavedDrug.id,
    drugSettings: {
      ...getPediatricDoseState().drugSettings,
      custom: {
        ...getPediatricDoseState().drugSettings.custom,
        ...normalizedSavedDrug
      }
    }
  });
  savePersistedState(persistedState);
}

// -----------------------------
// Core exported functions
// -----------------------------

export function applyPediatricDoseStateToView(pediatricDoseState) {
  const normalizedState = normalizePediatricDoseState(pediatricDoseState);
  const currentDrugSettings = normalizedState.drugSettings[normalizedState.selectedDrugId];

  renderPediatricDrugSelectOptions();
  pediatricToggleUnverifiedButton.textContent = normalizedState.showUnverifiedPresets
    ? t("hide_unverified_presets")
    : t("show_unverified_presets");
  pediatricDrugSelect.value = getPediatricSelectValueFromState(normalizedState);
  pediatricInputs.weight.value = normalizedState.inputs.weight;
  pediatricInputs.emergencyWeight.value = normalizedState.inputs.emergencyWeight;
  pediatricInputs.ageGroup.value = normalizedState.inputs.ageGroup;
  pediatricInputs.airwayAgeYears.value = normalizedState.inputs.airwayAgeYears;
  pediatricInputs.airwayWeight.value = normalizedState.inputs.airwayWeight;
  pediatricInputs.airwayDeviceCategory.value = normalizedState.inputs.airwayDeviceCategory;
  pediatricInputs.airwayDeviceModel.value = normalizedState.inputs.airwayDeviceModel;
  pediatricInputs.concentration.value = currentDrugSettings.concentration;
  pediatricInputs.customDrugName.value = currentDrugSettings.customDrugName;
  pediatricInputs.customDrugNotes.value = currentDrugSettings.customDrugNotes;
  pediatricInputs.minDosePerKg.value = currentDrugSettings.minDosePerKg;
  pediatricInputs.maxDosePerKg.value = currentDrugSettings.maxDosePerKg;
  pediatricInputs.doseUnit.value = currentDrugSettings.doseUnit;
  pediatricInputs.concentrationUnit.value = currentDrugSettings.concentrationUnit;
  pediatricInputs.maxTotalDose.value = currentDrugSettings.maxTotalDose;
  pediatricAirwayDeviceModelField.classList.toggle("hidden", normalizedState.inputs.airwayDeviceCategory !== "supraglottic");
  pediatricAirwayWarning.textContent = getPediatricAirwayWarningText(normalizedState.inputs.airwayDeviceCategory);
  activatePediatricMode(normalizedState.activeMode);
}

export function activatePediatricMode(modeId) {
  pediatricModeTabs.forEach(function (tab) {
    const isActive = tab.dataset.pediatricModeTab === modeId;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  pediatricModePanels.forEach(function (panel) {
    const isActive = panel.dataset.pediatricModePanel === modeId;
    panel.classList.toggle("hidden", !isActive);
  });

  updatePediatricDoseState({
    activeMode: sanitizePediatricActiveMode(modeId)
  });
  clearPediatricResult();
  pediatricErrorMessage.textContent = "";
}

export function updatePediatricDrugUI() {
  const selectedOptionValue = getPediatricSelectValueFromState(getPediatricDoseState());
  renderPediatricDrugSelectOptions();
  pediatricDrugSelect.value = selectedOptionValue;
  const selectedSavedCustomDrugId = getSavedCustomDrugIdFromOptionValue(selectedOptionValue);
  const isCustomDrug = selectedOptionValue === "custom" || selectedSavedCustomDrugId !== "";
  const selectedDrug = isCustomDrug
    ? buildCustomPediatricDrugFromInputs()
    : getPediatricDrugPresetById(selectedOptionValue);
  const pediatricProfile = selectedDrug.profiles.pediatricBolus;
  const currentDrugSettings = getCurrentPediatricDrugSettings();
  const ageGroup = pediatricInputs.ageGroup.value || "child";
  const ageGuidance = pediatricProfile.ageGuidance && (pediatricProfile.ageGuidance[ageGroup] || pediatricProfile.ageGuidance.default);
  const doseLimitNote = pediatricProfile.doseLimits && pediatricProfile.doseLimits.note
    ? ` / ${pediatricProfile.doseLimits.note}`
    : "";
  const activeSavedCustomDrugId = getActiveSavedCustomPediatricDrugId();
  const verificationConfig = getPediatricVerificationConfig(pediatricProfile.verificationStatus);

  pediatricCustomFields.classList.toggle("hidden", !isCustomDrug);
  pediatricInputs.concentration.value = currentDrugSettings.concentration || String(pediatricProfile.concentration.value);
  pediatricRangeText.textContent = `${pediatricProfile.recommendedRange.min} - ${pediatricProfile.recommendedRange.max} ${pediatricProfile.dosePerKgUnit}`;
  pediatricAgeNoteText.textContent = ageGuidance ? ageGuidance.note : (currentLanguage === "en" ? "No specific age-group note provided." : "특정 age group note가 없습니다.");
  pediatricConcentrationText.textContent = `${pediatricInputs.concentration.value} ${pediatricProfile.concentration.unit}`;
  pediatricVerificationText.textContent = verificationConfig.summary;
  pediatricNotesText.textContent = `${pediatricProfile.notes}${doseLimitNote} / ${getDisplaySourceLabel(pediatricProfile.metadata.source)}`;
  pediatricConcentrationUnitLabel.textContent = pediatricProfile.concentration.unit;
  pediatricSaveCustomButton.classList.toggle("hidden", !isCustomDrug);
  pediatricDeleteCustomButton.classList.toggle("hidden", !activeSavedCustomDrugId);
  pediatricSaveCustomButton.textContent = activeSavedCustomDrugId
    ? (currentLanguage === "en" ? "Update saved drug" : "저장된 custom drug 업데이트")
    : t("save_custom_drug");
  pediatricCustomSaveHelp.classList.toggle("hidden", !isCustomDrug);
  pediatricCustomSaveHelp.textContent = activeSavedCustomDrugId
    ? (currentLanguage === "en"
      ? "You are editing a saved custom drug. Renaming it still updates the same saved item."
      : "현재 저장된 custom drug를 편집 중입니다. 이름을 바꿔도 같은 저장 항목이 업데이트됩니다.")
    : (currentLanguage === "en"
      ? "Click Save custom drug to store the current values locally."
      : "Save custom drug를 누르면 현재 입력값이 로컬에 저장됩니다.");
  pediatricAgeWarning.textContent = ageGuidance && ageGuidance.warning
    ? ageGuidance.warning
    : (currentLanguage === "en"
      ? "Weight-based estimate only. Neonates, infants, and selected drugs may require age-specific adjustment."
      : "Weight-based estimate only입니다. Neonate, infant, 일부 약물은 age-specific adjustment가 필요할 수 있습니다.");
  pediatricDrugHelp.textContent = isCustomDrug
    ? t("pediatric_drug_help_custom")
    : (currentLanguage === "en"
      ? `${selectedDrug.name} default values are shown. Adjust weight and concentration if needed.`
      : `${selectedDrug.name} 기본값이 표시됩니다. 필요하면 체중과 농도를 조정해 사용하세요.`);
}

// -----------------------------
// Validation
// -----------------------------

function readPediatricFormValues() {
  if (getActivePediatricMode() === "airway") {
    return {
      mode: "airway",
      ageYears: Number(pediatricInputs.airwayAgeYears.value),
      weight: Number(pediatricInputs.airwayWeight.value),
      deviceCategory: pediatricInputs.airwayDeviceCategory.value,
      deviceModel: pediatricInputs.airwayDeviceModel.value
    };
  }

  if (getActivePediatricMode() === "emergency") {
    return {
      mode: "emergency",
      weight: Number(pediatricInputs.emergencyWeight.value)
    };
  }

  const drug = isCustomPediatricSelection(pediatricDrugSelect.value)
    ? buildCustomPediatricDrugFromInputs()
    : getPediatricDrugPresetById(pediatricDrugSelect.value);
  const profile = drug.profiles.pediatricBolus;
  const ageGroup = pediatricInputs.ageGroup.value || "child";
  const ageGuidance = profile.ageGuidance && (profile.ageGuidance[ageGroup] || profile.ageGuidance.default);

  return {
    mode: "dosing",
    weight: Number(pediatricInputs.weight.value),
    ageGroup: ageGroup,
    concentration: Number(pediatricInputs.concentration.value),
    drug: drug,
    profile: profile,
    ageGuidance: ageGuidance || null
  };
}

function validatePediatricValues(values) {
  if (values.mode === "airway") {
    if (values.deviceCategory === "ett" && !isPositiveNumber(values.ageYears)) {
      return t("validation_ett_age");
    }

    if (values.deviceCategory === "supraglottic" && !isPositiveNumber(values.weight)) {
      return t("validation_supraglottic_weight");
    }

    if (["oral-airway", "nasal-airway", "laryngoscope", "face-mask"].includes(values.deviceCategory)
      && !isPositiveNumber(values.ageYears)
      && !isPositiveNumber(values.weight)) {
      return t("validation_airway_age_or_weight");
    }

    return "";
  }

  if (values.mode === "emergency") {
    if (!isPositiveNumber(values.weight)) {
      return t("validation_pediatric_emergency_weight");
    }

    return "";
  }

  if (!isPositiveNumber(values.weight)) {
    return t("validation_patient_weight");
  }

  if (!isPositiveNumber(values.concentration)) {
    return t("validation_drug_concentration");
  }

  if (isCustomPediatricSelection(pediatricDrugSelect.value)) {
    if (pediatricInputs.customDrugName.value.trim() === "") {
      return t("validation_custom_name_required");
    }

    if (!isPositiveNumber(Number(pediatricInputs.minDosePerKg.value)) || !isPositiveNumber(Number(pediatricInputs.maxDosePerKg.value))) {
      return t("validation_custom_range_positive");
    }

    if (Number(pediatricInputs.maxDosePerKg.value) < Number(pediatricInputs.minDosePerKg.value)) {
      return t("validation_custom_max_gte_min");
    }

    if (getUnitBase(pediatricInputs.concentrationUnit.value) !== getUnitBase(pediatricInputs.doseUnit.value)) {
      return t("validation_unit_base_match");
    }
  }

  return "";
}

// -----------------------------
// Rendering
// -----------------------------

export function clearPediatricResult() {
  pediatricResultCard.classList.add("hidden");
  pediatricResultLabel.textContent = t("pediatric_dosing_result");
  pediatricPrimaryResult.textContent = "0.00 - 0.00";
  pediatricSecondaryResultLabel.textContent = t("calculated_dose_range");
  pediatricSecondaryResult.textContent = "-";
  pediatricConcentrationResult.textContent = "";
  pediatricDoseExplanation.textContent = "";
  pediatricVolumeExplanation.textContent = "";
  pediatricVerificationText.textContent = "-";
  pediatricDoseReferenceList.innerHTML = "";
  pediatricResultWarning.textContent = t("pediatric_result_warning_default");
  pediatricAirwayResultCard.classList.add("hidden");
  pediatricAirwayPrimaryResult.textContent = "-";
  pediatricAirwaySecondaryLabel.textContent = t("estimated_oral_depth");
  pediatricAirwaySecondaryResult.textContent = "-";
  pediatricAirwayContext.textContent = "";
  pediatricAirwayDeviceResult.textContent = "";
  pediatricAirwaySizeExplanation.textContent = "";
  pediatricAirwayDepthExplanation.textContent = "";
  pediatricAirwayReferenceList.innerHTML = "";
  pediatricAirwayResultWarning.textContent = t("pediatric_airway_warning_default");
  pediatricAirwayWarning.textContent = getPediatricAirwayWarningText(pediatricInputs.airwayDeviceCategory.value);
  pediatricEmergencyResultCard.classList.add("hidden");
  pediatricEmergencyPrimaryResult.textContent = "-";
  pediatricEmergencyContext.textContent = "";
  pediatricEmergencyDoseGrid.innerHTML = "";
  pediatricEmergencyReferenceList.innerHTML = "";
  pediatricEmergencyResultWarning.textContent = t("pediatric_emergency_warning_default");
}

function showPediatricDoseResult(values) {
  const rawDoseRange = calculateWeightBasedDoseRange(
    values.weight,
    values.profile.recommendedRange.min,
    values.profile.recommendedRange.max
  );
  const adjustedDoseRange = applyPediatricDoseLimits(rawDoseRange, values.profile);
  const minVolume = calculateDoseVolume(adjustedDoseRange.minDose, values.concentration);
  const maxVolume = calculateDoseVolume(adjustedDoseRange.maxDose, values.concentration);
  const limitMessage = adjustedDoseRange.messages.join(" ");
  const referenceIds = getPediatricDoseReferenceIds(values);
  const verificationConfig = getPediatricVerificationConfig(values.profile.verificationStatus);

  pediatricResultLabel.textContent = t("pediatric_weight_based_bolus");
  pediatricPrimaryResult.textContent = `${formatNumber(adjustedDoseRange.minDose, 2)} - ${formatNumber(adjustedDoseRange.maxDose, 2)} ${values.profile.doseAmountUnit}`;
  pediatricSecondaryResultLabel.textContent = t("recommended_dose_range_label");
  pediatricSecondaryResult.textContent = `${values.profile.recommendedRange.min} - ${values.profile.recommendedRange.max} ${values.profile.dosePerKgUnit} / ${values.ageGroup}`;
  pediatricConcentrationResult.textContent = `${values.drug.name} / ${formatNumber(values.weight, 1)} kg / ${formatNumber(values.concentration, 2)} ${values.profile.concentration.unit}`;
  pediatricDoseExplanation.textContent = adjustedDoseRange.wasAdjusted
    ? t("pediatric_dose_formula_adjusted", {
      weight: formatNumber(values.weight, 1),
      min: values.profile.recommendedRange.min,
      max: values.profile.recommendedRange.max,
      unitPerKg: values.profile.dosePerKgUnit,
      rawMin: formatNumber(rawDoseRange.minDose, 2),
      rawMax: formatNumber(rawDoseRange.maxDose, 2),
      amountUnit: values.profile.doseAmountUnit,
      limitMessage: limitMessage
    })
    : t("pediatric_dose_formula_plain", {
      weight: formatNumber(values.weight, 1),
      min: values.profile.recommendedRange.min,
      max: values.profile.recommendedRange.max,
      unitPerKg: values.profile.dosePerKgUnit,
      rawMin: formatNumber(rawDoseRange.minDose, 2),
      rawMax: formatNumber(rawDoseRange.maxDose, 2),
      amountUnit: values.profile.doseAmountUnit
    });
  pediatricVolumeExplanation.textContent = t("pediatric_optional_volume_formula", {
    minDose: formatNumber(adjustedDoseRange.minDose, 2),
    maxDose: formatNumber(adjustedDoseRange.maxDose, 2),
    amountUnit: values.profile.doseAmountUnit,
    concentration: formatNumber(values.concentration, 2),
    concentrationUnit: values.profile.concentration.unit,
    minVolume: formatNumber(minVolume, 2),
    maxVolume: formatNumber(maxVolume, 2)
  });
  renderReferenceList(pediatricDoseReferenceList, referenceIds);
  pediatricResultWarning.textContent = adjustedDoseRange.wasAdjusted
    ? `${limitMessage} ${verificationConfig.warning ? `${verificationConfig.warning} ` : ""}${values.ageGuidance && values.ageGuidance.warning ? `${values.ageGuidance.warning} ` : ""}${t("pediatric_warning_suffix")}`
    : values.ageGuidance && values.ageGuidance.warning
      ? `${verificationConfig.warning ? `${verificationConfig.warning} ` : ""}${values.ageGuidance.warning} ${t("pediatric_warning_suffix")}`
      : verificationConfig.warning
        ? `${verificationConfig.warning} ${t("pediatric_warning_suffix")}`
        : t("pediatric_verify_reference_only");
  pediatricResultCard.classList.remove("hidden");
}

function showPediatricAirwayResult(values) {
  const isETTMode = values.deviceCategory === "ett";
  const isSupraglotticMode = values.deviceCategory === "supraglottic";
  const isOralAirwayMode = values.deviceCategory === "oral-airway";
  const isNasalAirwayMode = values.deviceCategory === "nasal-airway";
  const isLaryngoscopeMode = values.deviceCategory === "laryngoscope";
  const isFaceMaskMode = values.deviceCategory === "face-mask";
  const estimates = isETTMode ? calculatePediatricAirwayEstimates(values.ageYears) : null;
  const supraglotticRecommendation = isSupraglotticMode
    ? getSupraglotticDeviceRecommendation(values.deviceModel, values.weight)
    : null;
  const oralAirwayRecommendation = isOralAirwayMode
    ? getOralAirwayRecommendation(values.weight, values.ageYears)
    : null;
  const nasalAirwayRecommendation = isNasalAirwayMode
    ? getNasalAirwayRecommendation(values.weight, values.ageYears)
    : null;
  const laryngoscopeRecommendation = isLaryngoscopeMode
    ? getLaryngoscopeRecommendation(values.weight, values.ageYears)
    : null;
  const faceMaskRecommendation = isFaceMaskMode
    ? getFaceMaskRecommendation(values.weight, values.ageYears)
    : null;
  const referenceIds = getPediatricAirwayReferenceIds(values);
  const ageText = isPositiveNumber(values.ageYears) ? `${formatNumber(values.ageYears, 1)} yr` : t("age_not_entered");
  const weightText = isPositiveNumber(values.weight) ? ` / ${formatNumber(values.weight, 1)} kg` : "";
  const isInfantRange = values.ageYears < 1;
  const airwayResultLabel = document.querySelector("#pediatric-airway-result-card .result-label");

  if (airwayResultLabel) {
    airwayResultLabel.textContent = isETTMode
      ? t("pediatric_ett_result")
      : isSupraglotticMode
        ? t("pediatric_supraglottic_result")
        : isOralAirwayMode
        ? t("pediatric_oral_airway_result")
        : isNasalAirwayMode
          ? t("pediatric_nasal_airway_result")
          : isFaceMaskMode
            ? t("pediatric_face_mask_result")
          : t("pediatric_laryngoscope_result");
  }

  pediatricAirwayPrimaryResult.textContent = isETTMode
    ? `Cuffed ${formatNumber(estimates.cuffedSize, 1)} / Uncuffed ${formatNumber(estimates.uncuffedSize, 1)}`
    : isSupraglotticMode
      ? `${SUPRAGLOTTIC_DEVICE_GUIDES[values.deviceModel].label} ${supraglotticRecommendation ? `size ${supraglotticRecommendation.size}` : (currentLanguage === "en" ? "reference" : "참고값")}`
      : isOralAirwayMode
        ? (oralAirwayRecommendation ? `Oral airway size ${oralAirwayRecommendation.size} (${oralAirwayRecommendation.length})` : (currentLanguage === "en" ? "Oral airway reference" : "Oral airway 참고값"))
        : isNasalAirwayMode
          ? (currentLanguage === "en" ? "Nasal airway guide" : "Nasal airway 가이드")
          : isFaceMaskMode
            ? (faceMaskRecommendation ? `Face mask size ${faceMaskRecommendation.size}` : (currentLanguage === "en" ? "Face mask guide" : "Face mask 가이드"))
        : (laryngoscopeRecommendation ? laryngoscopeRecommendation.primaryBlade : (currentLanguage === "en" ? "Laryngoscope reference" : "Laryngoscope 참고값"));
  pediatricAirwaySecondaryLabel.textContent = isETTMode
    ? t("oral_depth_from_lip")
    : isSupraglotticMode
      ? t("reference_weight_range")
      : isOralAirwayMode
        ? t("sizing_method")
        : isNasalAirwayMode
          ? t("preferred_measurement")
          : isFaceMaskMode
            ? t("reference_band")
        : t("alternative_guide");
  pediatricAirwaySecondaryResult.textContent = isETTMode
    ? t("cm_from_lip", { depth: formatNumber(estimates.oralDepth, 1) })
    : isSupraglotticMode
      ? (supraglotticRecommendation ? `${supraglotticRecommendation.weightRange}` : t("enter_weight_size_range"))
      : isOralAirwayMode
        ? t("oral_airway_measure_method")
        : isNasalAirwayMode
          ? t("nasal_airway_measure_method")
          : isFaceMaskMode
            ? (faceMaskRecommendation ? faceMaskRecommendation.label : t("enter_age_or_weight_face_mask"))
        : (laryngoscopeRecommendation ? laryngoscopeRecommendation.secondaryBlade : t("enter_age_or_weight_blade"));
  pediatricAirwayContext.textContent = t("airway_age_context", { ageText: ageText, weightText: weightText });
  pediatricAirwayDeviceResult.textContent = isETTMode
    ? t("device_category_ett")
    : isSupraglotticMode
      ? (supraglotticRecommendation
        ? `${supraglotticRecommendation.deviceLabel} reference: size ${supraglotticRecommendation.size} (${supraglotticRecommendation.weightRange}, ${supraglotticRecommendation.sourceLabel})`
        : t("enter_supraglottic_reference", { deviceLabel: SUPRAGLOTTIC_DEVICE_GUIDES[values.deviceModel].label }))
      : isOralAirwayMode
        ? (oralAirwayRecommendation
          ? t("device_reference_band", { label: oralAirwayRecommendation.label })
          : t("enter_age_or_weight_blade"))
        : isNasalAirwayMode
          ? (nasalAirwayRecommendation
            ? t("infant_depth_band", { depth: nasalAirwayRecommendation.insertionDepth, label: nasalAirwayRecommendation.label })
            : t("use_external_measurement_first"))
          : isFaceMaskMode
            ? (faceMaskRecommendation
              ? t("device_reference_band", { label: faceMaskRecommendation.label })
              : t("enter_face_mask_guide"))
        : (laryngoscopeRecommendation
          ? t("device_reference_band", { label: laryngoscopeRecommendation.label })
          : t("enter_laryngoscope_guide"));
  pediatricAirwaySizeExplanation.textContent = isETTMode
    ? `ETT size estimate: uncuffed = age/4 + 4, cuffed = age/4 + 3.5, rounded to available 0.5 mm ID sizes -> ${formatNumber(estimates.uncuffedSize, 1)} / ${formatNumber(estimates.cuffedSize, 1)} mm ID`
    : isSupraglotticMode
      ? t("suction_reference_size_only", { deviceLabel: SUPRAGLOTTIC_DEVICE_GUIDES[values.deviceModel].label })
      : isOralAirwayMode
        ? (oralAirwayRecommendation
          ? t("oral_airway_quick_guide", { size: oralAirwayRecommendation.size, length: oralAirwayRecommendation.length, label: oralAirwayRecommendation.label.toLowerCase() })
          : t("oral_airway_reference_only"))
        : isNasalAirwayMode
          ? t("nasal_airway_external_measurement")
          : isFaceMaskMode
            ? (faceMaskRecommendation
              ? t("face_mask_quick_guide", { size: faceMaskRecommendation.size, label: faceMaskRecommendation.label.toLowerCase() })
              : t("face_mask_reference_only"))
        : (laryngoscopeRecommendation
          ? t("laryngoscope_quick_guide", { blade: laryngoscopeRecommendation.primaryBlade, label: laryngoscopeRecommendation.label.toLowerCase() })
          : t("laryngoscope_reference_only"));
  pediatricAirwayDepthExplanation.textContent = isETTMode
    ? `${values.ageYears < 2
      ? t("ett_depth_under_two")
      : t("ett_depth_age_formula", { depth: formatNumber(estimates.oralDepth, 1) })} ${t("ett_depth_crosscheck", { depth: formatNumber(estimates.cuffedDepthBySize, 1) })}`
    : isSupraglotticMode
      ? t("supraglottic_depth_note", { deviceLabel: SUPRAGLOTTIC_DEVICE_GUIDES[values.deviceModel].label })
      : isOralAirwayMode
        ? t("oral_airway_depth_note")
        : isNasalAirwayMode
          ? (nasalAirwayRecommendation
            ? t("nasal_airway_infant_study", { depth: nasalAirwayRecommendation.insertionDepth })
            : t("nasal_airway_depth_note"))
          : isFaceMaskMode
            ? t("face_mask_depth_note")
        : t("laryngoscope_depth_note");
  pediatricAirwayResultWarning.textContent = isETTMode
    ? isInfantRange
      ? t("airway_warning_ett_infant")
      : t("airway_warning_ett")
    : isSupraglotticMode
      ? t("airway_warning_supraglottic", { deviceLabel: SUPRAGLOTTIC_DEVICE_GUIDES[values.deviceModel].label })
      : isOralAirwayMode
        ? t("airway_warning_oral")
        : isNasalAirwayMode
          ? t("airway_warning_nasal")
          : isFaceMaskMode
            ? t("airway_warning_face_mask")
        : t("airway_warning_laryngoscope");
  renderReferenceList(pediatricAirwayReferenceList, referenceIds);
  pediatricAirwayResultCard.classList.remove("hidden");
}

function showPediatricEmergencyResult(values) {
  const cards = getPediatricEmergencyCards(values.weight);
  const isEnglish = currentLanguage === "en";

  pediatricEmergencyPrimaryResult.textContent = `${formatNumber(values.weight, 1)} kg`;
  pediatricEmergencyContext.textContent = isEnglish
    ? "Core weight-based doses from official PALS algorithms."
    : "공식 PALS algorithm 기반 핵심 weight-based dose를 빠르게 보여줍니다.";
  pediatricEmergencyDoseGrid.innerHTML = cards.map(function (card) {
    const noteMarkup = card.note
      ? `<details class="context-disclosure context-disclosure-compact emergency-dose-disclosure">
           <summary class="context-disclosure-summary">${t("view_emergency_note")}</summary>
           <div class="context-disclosure-content">
             <p class="emergency-dose-note">${card.note}</p>
           </div>
         </details>`
      : "";

    return `<article class="emergency-dose-card">
              <p class="emergency-dose-kicker">${card.context}</p>
              <p class="pump-setting-label">${card.name}</p>
              <p class="pump-setting-range">${card.primary}</p>
              <p class="emergency-dose-secondary">${card.secondary}</p>
              ${noteMarkup}
            </article>`;
  }).join("");
  renderReferenceList(pediatricEmergencyReferenceList, PEDIATRIC_EMERGENCY_REFERENCE_IDS);
  pediatricEmergencyResultWarning.textContent = t("pediatric_emergency_warning_default");
  pediatricEmergencyResultCard.classList.remove("hidden");
}

// -----------------------------
// Event handlers
// -----------------------------

function handlePediatricSubmit(event) {
  event.preventDefault();

  const values = readPediatricFormValues();
  const validationError = validatePediatricValues(values);

  if (validationError) {
    pediatricErrorMessage.textContent = validationError;
    clearPediatricResult();
    return;
  }

  pediatricErrorMessage.textContent = "";
  clearPediatricResult();
  if (values.mode === "airway") {
    showPediatricAirwayResult(values);
    return;
  }

  if (values.mode === "emergency") {
    showPediatricEmergencyResult(values);
    return;
  }

  showPediatricDoseResult(values);
}

function handlePediatricDrugChange() {
  const selectedOptionValue = pediatricDrugSelect.value;
  const selectedSavedCustomDrugId = getSavedCustomDrugIdFromOptionValue(selectedOptionValue);

  if (selectedSavedCustomDrugId) {
    const savedDrug = getSavedCustomPediatricDrugs().find(function (item) {
      return item.id === selectedSavedCustomDrugId;
    });

    if (savedDrug) {
      applySavedCustomPediatricDrug(savedDrug);
    }
  } else {
    updatePediatricDoseState({
      selectedDrugId: sanitizePediatricSelectedDrugId(selectedOptionValue),
      activeSavedCustomDrugId: ""
    });
  }

  applyPediatricDoseStateToView(getPediatricDoseState());
  updatePediatricDrugUI();
  clearPediatricResult();
  pediatricErrorMessage.textContent = "";
}

function handlePediatricInputChange(event) {
  if (shouldDeferDecimalInput(event)) {
    return;
  }
  const selectedOptionValue = pediatricDrugSelect.value;
  const drugSettingsKey = isCustomPediatricSelection(selectedOptionValue) ? "custom" : selectedOptionValue;
  pediatricAirwayDeviceModelField.classList.toggle("hidden", pediatricInputs.airwayDeviceCategory.value !== "supraglottic");
  pediatricAirwayWarning.textContent = getPediatricAirwayWarningText(pediatricInputs.airwayDeviceCategory.value);

  persistedState.pediatricDose = normalizePediatricDoseState({
    ...getPediatricDoseState(),
    selectedDrugId: sanitizePediatricSelectedDrugId(drugSettingsKey),
    activeSavedCustomDrugId: isCustomPediatricSelection(selectedOptionValue)
      ? getActiveSavedCustomPediatricDrugId()
      : "",
    inputs: {
      weight: pediatricInputs.weight.value,
      emergencyWeight: pediatricInputs.emergencyWeight.value,
      ageGroup: pediatricInputs.ageGroup.value,
      airwayAgeYears: pediatricInputs.airwayAgeYears.value,
      airwayWeight: pediatricInputs.airwayWeight.value,
      airwayDeviceCategory: pediatricInputs.airwayDeviceCategory.value,
      airwayDeviceModel: pediatricInputs.airwayDeviceModel.value
    },
    drugSettings: {
      ...getPediatricDoseState().drugSettings,
      [drugSettingsKey]: {
        concentration: pediatricInputs.concentration.value,
        customDrugName: pediatricInputs.customDrugName.value,
        customDrugNotes: pediatricInputs.customDrugNotes.value,
        minDosePerKg: pediatricInputs.minDosePerKg.value,
        maxDosePerKg: pediatricInputs.maxDosePerKg.value,
        doseUnit: pediatricInputs.doseUnit.value,
        concentrationUnit: pediatricInputs.concentrationUnit.value,
        maxTotalDose: pediatricInputs.maxTotalDose.value
      }
    }
  });
  savePersistedState(persistedState);
  updatePediatricDrugUI();
  clearPediatricResult();
  pediatricErrorMessage.textContent = "";
}

function syncPediatricCustomUnits(sourceField) {
  if (!isCustomPediatricSelection(pediatricDrugSelect.value)) {
    return;
  }

  let baseUnit = "";

  if (sourceField === "dose") {
    baseUnit = getUnitBase(pediatricInputs.doseUnit.value);
  } else if (sourceField === "concentration") {
    baseUnit = getUnitBase(pediatricInputs.concentrationUnit.value);
  }

  if (!baseUnit) {
    return;
  }

  pediatricInputs.doseUnit.value = `${baseUnit}/kg`;
  pediatricInputs.concentrationUnit.value = `${baseUnit}/mL`;
}

function handlePediatricCustomUnitChange(sourceField) {
  syncPediatricCustomUnits(sourceField);
  handlePediatricInputChange();
}

function handlePediatricSaveCustomDrug() {
  if (!isCustomPediatricSelection(pediatricDrugSelect.value)) {
    return;
  }

  const values = readPediatricFormValues();
  const validationError = validatePediatricValues(values);

  if (validationError) {
    pediatricErrorMessage.textContent = validationError;
    return;
  }

  const activeSavedCustomDrugId = getActiveSavedCustomPediatricDrugId();
  const savedDrug = createSavedCustomPediatricDrugFromView(activeSavedCustomDrugId);
  const updatedSavedCustomDrugs = getSavedCustomPediatricDrugs()
    .filter(function (item) {
      return item.id !== savedDrug.id;
    })
    .concat(savedDrug)
    .slice(-12);

  updatePediatricDoseState({
    savedCustomDrugs: updatedSavedCustomDrugs,
    activeSavedCustomDrugId: savedDrug.id
  });
  pediatricErrorMessage.textContent = activeSavedCustomDrugId
    ? (currentLanguage === "en" ? "Saved custom drug updated locally." : "저장된 custom drug가 로컬에서 업데이트되었습니다.")
    : (currentLanguage === "en" ? "Custom drug saved locally." : "Custom drug가 로컬에 저장되었습니다.");
  applyPediatricDoseStateToView(getPediatricDoseState());
  updatePediatricDrugUI();
}

function handlePediatricDeleteSavedDrug() {
  const activeSavedCustomDrugId = getActiveSavedCustomPediatricDrugId();

  if (!activeSavedCustomDrugId) {
    return;
  }

  persistedState.pediatricDose = normalizePediatricDoseState({
    ...getPediatricDoseState(),
    selectedDrugId: "custom",
    activeSavedCustomDrugId: "",
    drugSettings: {
      ...getPediatricDoseState().drugSettings,
      custom: {
        ...createDefaultPediatricDrugSettings().custom
      }
    },
    savedCustomDrugs: getSavedCustomPediatricDrugs().filter(function (item) {
      return item.id !== activeSavedCustomDrugId;
    })
  });
  savePersistedState(persistedState);
  applyPediatricDoseStateToView(getPediatricDoseState());
  updatePediatricDrugUI();
  clearPediatricResult();
  pediatricErrorMessage.textContent = currentLanguage === "en"
    ? "Saved custom drug removed."
    : "저장된 custom drug가 삭제되었습니다.";
}

function handlePediatricToggleUnverified() {
  updatePediatricDoseState({
    showUnverifiedPresets: !getPediatricDoseState().showUnverifiedPresets
  });
  applyPediatricDoseStateToView(getPediatricDoseState());
  updatePediatricDrugUI();
  clearPediatricResult();
  pediatricErrorMessage.textContent = "";
}

function resetPediatricForm() {
  persistedState.pediatricDose = normalizePediatricDoseState({
    ...createDefaultPediatricDoseState(),
    savedCustomDrugs: getSavedCustomPediatricDrugs(),
    activeSavedCustomDrugId: ""
  });
  savePersistedState(persistedState);
  pediatricForm.reset();
  applyPediatricDoseStateToView(getPediatricDoseState());
  updatePediatricDrugUI();
  clearPediatricResult();
  pediatricErrorMessage.textContent = "";
}

// -----------------------------
// Wiring
// -----------------------------

pediatricModeTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    activatePediatricMode(tab.dataset.pediatricModeTab);
  });
});

pediatricDrugSelect.addEventListener("change", handlePediatricDrugChange);
pediatricInputs.ageGroup.addEventListener("change", handlePediatricInputChange);
pediatricForm.addEventListener("submit", handlePediatricSubmit);
pediatricResetButton.addEventListener("click", resetPediatricForm);
pediatricSaveCustomButton.addEventListener("click", handlePediatricSaveCustomDrug);
pediatricDeleteCustomButton.addEventListener("click", handlePediatricDeleteSavedDrug);
pediatricToggleUnverifiedButton.addEventListener("click", handlePediatricToggleUnverified);
pediatricInputs.doseUnit.addEventListener("change", function () {
  handlePediatricCustomUnitChange("dose");
});
pediatricInputs.concentrationUnit.addEventListener("change", function () {
  handlePediatricCustomUnitChange("concentration");
});

[
  pediatricInputs.weight,
  pediatricInputs.emergencyWeight,
  pediatricInputs.ageGroup,
  pediatricInputs.concentration,
  pediatricInputs.airwayAgeYears,
  pediatricInputs.airwayWeight,
  pediatricInputs.airwayDeviceCategory,
  pediatricInputs.airwayDeviceModel,
  pediatricInputs.customDrugName,
  pediatricInputs.customDrugNotes,
  pediatricInputs.minDosePerKg,
  pediatricInputs.maxDosePerKg,
  pediatricInputs.maxTotalDose
].forEach(function (input) {
  input.addEventListener("input", handlePediatricInputChange);
  if (input.tagName === "SELECT") {
    input.addEventListener("change", handlePediatricInputChange);
  }
});

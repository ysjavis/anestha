import { isWeightBasedReferenceRange, isNitroglycerinDrug, getReferenceTimeFactor, doseToRate, rateToDose, buildReferenceTable } from '../calc/infusion.js';
import { formatNumber, formatList, parseDoseList, isPositiveNumber, getAdaptiveQuickStep, getStepPrecision, clampNumber, shouldDeferDecimalInput } from '../calc/utils.js';
import { REFERENCE_REGISTRY } from '../data/reference-registry.js';
import { DEFAULT_CUSTOM_DRUG, DRUG_PRESETS } from '../data/drug-presets.js';
import {
  getDrugPresetById, isWithinReferenceRange,
  createDefaultDrugSettings,
  sanitizeSelectedDrugId, sanitizeActiveMode,
  sanitizeInfusionLayoutMode, sanitizeNitroglycerinDoseUnitView,
  normalizeSingleDrugState,
  createDefaultSingleDrugState, createDefaultInfusionCardState, normalizeInfusionCardState,
  normalizePersistedState,
  loadPersistedState, savePersistedState,
  persistedState,
  getSingleDrugState,
  resetPersistedState,
  updateSingleDrugState,
  getFavoriteDrugIds, getRecentDrugIds
} from '../store/state.js';
import { currentLanguage, t } from '../i18n.js';
import { getPreferredNitroglycerinDoseView, getDisplayDoseUnit, convertDoseValueForDisplay, convertDoseValueToReferenceUnit, convertDoseListForDisplay, convertDoseListToReferenceUnit, formatInfusionDoseDisplay, formatInfusionRangeDisplay, formatEditableDoseValue, formatEditableDoseList } from '../calc/infusion-display.js';
import { renderRangeSourceBadge, applyRangeSourceTheme, getDrugUseCaseSummary, getDisplaySourceLabel, renderUseCaseBadge, getRangeSourceSummary, getRangeRationale, renderReferenceList } from '../calc/reference-helpers.js';
import { formatDilutionPreset } from './dilution.js';

// -----------------------------
// DOM references
// -----------------------------

const form = document.getElementById("infusion-form");
const resetButton = document.getElementById("reset-button");
const errorMessage = document.getElementById("error-message");
const resultCard = document.getElementById("result-card");
const resultLabel = document.getElementById("result-label");
const primaryResult = document.getElementById("primary-result");
const secondaryResultLabel = document.getElementById("secondary-result-label");
const secondaryResult = document.getElementById("secondary-result");
const concentrationResult = document.getElementById("concentration-result");
const concentrationExplanation = document.getElementById("concentration-explanation");
const rateExplanation = document.getElementById("rate-explanation");
const infusionReferenceList = document.getElementById("infusion-reference-list");
const resultWarning = document.getElementById("result-warning");
const resultRangeBadge = document.getElementById("result-range-badge");
const resultUseCaseText = document.getElementById("result-use-case-text");
const resultUseCaseBadge = document.getElementById("result-use-case-badge");
const quickResultPreview = document.getElementById("quick-result-preview");
const quickResultLabel = document.getElementById("quick-result-label");
const quickResultBadge = document.getElementById("quick-result-badge");
const quickResultContext = document.getElementById("quick-result-context");
const quickPrimaryResult = document.getElementById("quick-primary-result");
const quickSecondaryResultLabel = document.getElementById("quick-secondary-result-label");
const quickSecondaryResult = document.getElementById("quick-secondary-result");
const quickConcentrationResult = document.getElementById("quick-concentration-result");
const multiDrugWarning = document.getElementById("multi-drug-warning");
const drugSelect = document.getElementById("drug-select");
const drugHelp = document.getElementById("drug-help");
const favoriteDrugButton = document.getElementById("favorite-drug-button");
const favoriteDrugsContainer = document.getElementById("favorite-drugs");
const recentDrugsContainer = document.getElementById("recent-drugs");
const infusionShortcutsDisclosure = document.getElementById("infusion-shortcuts-disclosure");
const presetSummary = document.getElementById("preset-summary");
const referenceRangeText = document.getElementById("reference-range-text");
const referenceRangeBadge = document.getElementById("reference-range-badge");
const referenceUseCaseText = document.getElementById("reference-use-case-text");
const referenceUseCaseBadge = document.getElementById("reference-use-case-badge");
const referenceRangeSourceText = document.getElementById("reference-range-source-text");
const referenceRangeRationaleText = document.getElementById("reference-range-rationale-text");
const alternateUseCaseRow = document.getElementById("alternate-use-case-row");
const alternateUseCaseText = document.getElementById("alternate-use-case-text");
const drugNotesText = document.getElementById("drug-notes-text");
const drugDilutionText = document.getElementById("drug-dilution-text");
const drugDilutionButton = document.getElementById("drug-dilution-button");
const drugSourceText = document.getElementById("drug-source-text");
const drugLastReviewedText = document.getElementById("drug-last-reviewed-text");
const concentrationUnitLabel = document.getElementById("concentration-unit-label");
const doseUnitLabel = document.getElementById("dose-unit-label");
const nitroglycerinDoseViewSelect = document.getElementById("nitroglycerin-dose-view");
const nitroglycerinDoseViewHelp = document.getElementById("nitroglycerin-dose-view-help");
const customDrugFields = document.getElementById("custom-drug-fields");
const referenceTableCard = document.getElementById("reference-table-card");
const referenceTableCaption = document.getElementById("reference-table-caption");
const referenceTableBody = document.getElementById("reference-table-body");
const infusionReferencesDisclosure = document.getElementById("infusion-references-disclosure");
const infusionModeTabs = document.querySelectorAll("[data-infusion-mode-tab]");
const infusionModePanels = document.querySelectorAll("[data-infusion-mode-panel]");
const infusionLayoutTabs = document.querySelectorAll("[data-infusion-layout-tab]");
const infusionSingleDrugPanel = document.getElementById("infusion-view-single-drug");
const infusionQuickModeHint = document.getElementById("infusion-quick-mode-hint");
const calculateButton = document.getElementById("calculate-button");
const quickWeightSliderWrap = document.getElementById("quick-weight-slider-wrap");
const quickWeightSlider = document.getElementById("quick-weight-slider");
const quickWeightSliderMin = document.getElementById("quick-weight-slider-min");
const quickWeightSliderMax = document.getElementById("quick-weight-slider-max");
const quickTargetDoseSliderWrap = document.getElementById("quick-target-dose-slider-wrap");
const quickTargetDoseSlider = document.getElementById("quick-target-dose-slider");
const quickTargetDoseSliderMin = document.getElementById("quick-target-dose-slider-min");
const quickTargetDoseSliderMax = document.getElementById("quick-target-dose-slider-max");
const quickPumpRateSliderWrap = document.getElementById("quick-pump-rate-slider-wrap");
const quickPumpRateSlider = document.getElementById("quick-pump-rate-slider");
const quickPumpRateSliderMin = document.getElementById("quick-pump-rate-slider-min");
const quickPumpRateSliderMax = document.getElementById("quick-pump-rate-slider-max");

const inputs = {
  weight: document.getElementById("weight"),
  concentration: document.getElementById("concentration"),
  targetDose: document.getElementById("target-dose"),
  pumpRate: document.getElementById("pump-rate"),
  referenceDoseList: document.getElementById("reference-dose-list"),
  customDrugName: document.getElementById("custom-drug-name"),
  customDrugNotes: document.getElementById("custom-drug-notes")
};

// -----------------------------
// Calculation engine helpers
// -----------------------------

function getSelectedNitroglycerinDoseView() {
  return sanitizeNitroglycerinDoseUnitView(
    nitroglycerinDoseViewSelect ? nitroglycerinDoseViewSelect.value : "mcg/min"
  );
}

function getInfusionReferenceIds(values) {
  if (!values || !values.drug || !Array.isArray(values.drug.references)) {
    return [];
  }

  return values.drug.references;
}

// -----------------------------
// Drug config layer
// -----------------------------

function buildCustomDrugFromInputs() {
  const referenceDoses = parseDoseList(inputs.referenceDoseList.value) || DEFAULT_CUSTOM_DRUG.referenceDoses;

  return {
    id: "custom",
    name: inputs.customDrugName.value.trim() || "Custom drug",
    concentration: Number(inputs.concentration.value) || DEFAULT_CUSTOM_DRUG.concentration,
    concentrationUnit: DEFAULT_CUSTOM_DRUG.concentrationUnit,
    referenceDoses: referenceDoses,
    referenceRange: {
      min: 0,
      max: 0,
      unit: DEFAULT_CUSTOM_DRUG.referenceRange.unit
    },
    notes: inputs.customDrugNotes.value.trim() || "User-defined custom drug.",
    metadata: {
      source: "User defined",
      lastReviewed: "Current session"
    }
  };
}

function getSelectedDrugDefinition() {
  if (drugSelect.value === "custom") {
    return buildCustomDrugFromInputs();
  }

  return getDrugPresetById(drugSelect.value);
}

// -----------------------------
// View state layer
// -----------------------------

function getActiveInfusionMode() {
  const selectedTab = document.querySelector("[data-infusion-mode-tab].is-active");
  return selectedTab ? selectedTab.dataset.infusionModeTab : "dose-to-rate";
}

function getActiveInfusionLayoutMode() {
  const selectedTab = document.querySelector("[data-infusion-layout-tab].is-active");
  return selectedTab ? sanitizeInfusionLayoutMode(selectedTab.dataset.infusionLayoutTab) : "quick";
}

function getCurrentDrugSettings() {
  return getSingleDrugState().drugSettings[drugSelect.value] || createDefaultDrugSettings()[drugSelect.value];
}

function getSelectedDrugDilutionPreset() {
  const selectedDrug = getSelectedDrugDefinition();
  return selectedDrug.dilutionPresets && selectedDrug.dilutionPresets.length
    ? selectedDrug.dilutionPresets[0]
    : null;
}

function readSingleDrugSelectionFromView() {
  return {
    selectedDrugId: sanitizeSelectedDrugId(drugSelect.value),
    activeMode: sanitizeActiveMode(getActiveInfusionMode()),
    viewMode: sanitizeInfusionLayoutMode(getActiveInfusionLayoutMode()),
    nitroglycerinDoseUnitView: getSelectedNitroglycerinDoseView()
  };
}

function readSingleDrugInputsFromView(selectedDrugId, nitroglycerinDoseUnitView) {
  const selectedDrug = getDrugPresetById(selectedDrugId);
  const weightValue = Number(inputs.weight.value);
  const rawTargetDose = inputs.targetDose.value;
  const numericTargetDose = Number(rawTargetDose);

  return {
    weight: inputs.weight.value,
    targetDose: isPositiveNumber(numericTargetDose)
      ? formatEditableDoseValue(
        convertDoseValueToReferenceUnit(
          numericTargetDose,
          selectedDrug,
          weightValue,
          getDisplayDoseUnit(selectedDrug, weightValue, nitroglycerinDoseUnitView)
        )
      )
      : rawTargetDose,
    pumpRate: inputs.pumpRate.value
  };
}

function readDrugSettingsFromView(drugId, nitroglycerinDoseUnitView) {
  const selectedDrug = getDrugPresetById(drugId);
  const weightValue = Number(inputs.weight.value);
  const parsedReferenceDoseList = parseDoseList(inputs.referenceDoseList.value);
  const displayDoseUnit = getDisplayDoseUnit(selectedDrug, weightValue, nitroglycerinDoseUnitView);

  return {
    concentration: inputs.concentration.value,
    referenceDoseList: parsedReferenceDoseList
      ? formatEditableDoseList(
        convertDoseListToReferenceUnit(parsedReferenceDoseList, selectedDrug, weightValue, displayDoseUnit)
      )
      : inputs.referenceDoseList.value,
    customDrugName: inputs.customDrugName.value,
    customDrugNotes: inputs.customDrugNotes.value
  };
}

function createSingleDrugStateFromView(baseState) {
  const source = normalizeSingleDrugState(baseState);
  const selection = readSingleDrugSelectionFromView();
  const viewInputs = readSingleDrugInputsFromView(selection.selectedDrugId, selection.nitroglycerinDoseUnitView);

  return {
    selectedDrugId: selection.selectedDrugId,
    activeMode: selection.activeMode,
    viewMode: selection.viewMode,
    nitroglycerinDoseUnitView: selection.nitroglycerinDoseUnitView,
    favoriteDrugIds: source.favoriteDrugIds,
    recentDrugIds: source.recentDrugIds,
    inputs: viewInputs,
    drugSettings: {
      ...source.drugSettings,
      [selection.selectedDrugId]: readDrugSettingsFromView(selection.selectedDrugId, selection.nitroglycerinDoseUnitView)
    }
  };
}

function createInfusionCardStateFromView(baseCardState) {
  const source = normalizeInfusionCardState(baseCardState || createDefaultInfusionCardState());

  return {
    ...source,
    singleDrug: createSingleDrugStateFromView(source.singleDrug)
  };
}

export function commitSingleDrugStateFromView() {
  persistedState.singleDrug = createSingleDrugStateFromView(getSingleDrugState());
  savePersistedState(persistedState);
}

function commitSingleDrugInputsFromView() {
  const source = normalizeSingleDrugState(getSingleDrugState());
  const selection = readSingleDrugSelectionFromView();

  persistedState.singleDrug = normalizeSingleDrugState({
    ...source,
    selectedDrugId: selection.selectedDrugId,
    activeMode: selection.activeMode,
    viewMode: selection.viewMode,
    nitroglycerinDoseUnitView: selection.nitroglycerinDoseUnitView,
    inputs: readSingleDrugInputsFromView(
      selection.selectedDrugId,
      selection.nitroglycerinDoseUnitView
    )
  });
  savePersistedState(persistedState);
}

function getCurrentInfusionCardState() {
  return createInfusionCardStateFromView({
    cardId: "single-drug-card",
    singleDrug: getSingleDrugState()
  });
}

export function applySingleDrugStateToView(singleDrugState) {
  const normalizedState = normalizeSingleDrugState(singleDrugState);
  const currentDrugSettings = normalizedState.drugSettings[normalizedState.selectedDrugId];
  const selectedDrug = getDrugPresetById(normalizedState.selectedDrugId);
  const weightValue = Number(normalizedState.inputs.weight);
  const displayDoseUnit = getDisplayDoseUnit(
    selectedDrug,
    weightValue,
    normalizedState.nitroglycerinDoseUnitView
  );
  const parsedReferenceDoseList = parseDoseList(currentDrugSettings.referenceDoseList);

  drugSelect.value = normalizedState.selectedDrugId;
  inputs.weight.value = normalizedState.inputs.weight;
  inputs.targetDose.value = isPositiveNumber(Number(normalizedState.inputs.targetDose))
    ? formatEditableDoseValue(
      convertDoseValueForDisplay(
        Number(normalizedState.inputs.targetDose),
        selectedDrug,
        weightValue,
        displayDoseUnit
      )
    )
    : normalizedState.inputs.targetDose;
  inputs.pumpRate.value = normalizedState.inputs.pumpRate;
  inputs.concentration.value = currentDrugSettings.concentration;
  inputs.referenceDoseList.value = parsedReferenceDoseList
    ? formatEditableDoseList(
      convertDoseListForDisplay(parsedReferenceDoseList, selectedDrug, weightValue, displayDoseUnit)
    )
    : currentDrugSettings.referenceDoseList;
  inputs.customDrugName.value = currentDrugSettings.customDrugName;
  inputs.customDrugNotes.value = currentDrugSettings.customDrugNotes;
  if (nitroglycerinDoseViewSelect) {
    nitroglycerinDoseViewSelect.value = normalizedState.nitroglycerinDoseUnitView;
  }
  activateInfusionLayoutMode(normalizedState.viewMode, {
    persist: false,
    refresh: false
  });
}

// -----------------------------
// Favorites and recent drugs
// -----------------------------

function recordRecentDrug(drugId) {
  if (drugId === "custom") {
    return;
  }

  const updatedRecentDrugIds = [drugId].concat(
    getRecentDrugIds().filter(function (item) {
      return item !== drugId;
    })
  ).slice(0, 5);

  updateSingleDrugState({
    recentDrugIds: updatedRecentDrugIds
  });
}

function toggleFavoriteDrug(drugId) {
  if (drugId === "custom") {
    return;
  }

  const currentFavoriteDrugIds = getFavoriteDrugIds();
  const isFavorite = currentFavoriteDrugIds.includes(drugId);
  const updatedFavoriteDrugIds = isFavorite
    ? currentFavoriteDrugIds.filter(function (item) {
      return item !== drugId;
    })
    : currentFavoriteDrugIds.concat(drugId).slice(0, 5);

  updateSingleDrugState({
    favoriteDrugIds: updatedFavoriteDrugIds
  });
}

function removeRecentDrug(drugId) {
  updateSingleDrugState({
    recentDrugIds: getRecentDrugIds().filter(function (item) {
      return item !== drugId;
    })
  });
}

function renderQuickDrugButtons(container, drugIds) {
  if (!container) {
    return;
  }

  if (!drugIds.length) {
    container.innerHTML = `<span class="helper-text">${t("no_drugs_yet")}</span>`;
    return;
  }

  container.innerHTML = drugIds.map(function (drugId) {
    const preset = getDrugPresetById(drugId);
    if (container === recentDrugsContainer) {
      return `<span class="quick-drug-chip"><button type="button" class="chip-button" data-quick-drug-id="${drugId}">${preset.name}</button><button type="button" class="quick-drug-remove" data-remove-quick-drug-id="${drugId}" aria-label="${t("remove_favorite")} ${preset.name}">x</button></span>`;
    }

    return `<button type="button" class="chip-button" data-quick-drug-id="${drugId}">${preset.name}</button>`;
  }).join("");
}

export function updateQuickDrugUI() {
  const selectedDrugId = drugSelect.value;
  const isFavorite = getFavoriteDrugIds().includes(selectedDrugId);
  const favoriteDrugIds = getFavoriteDrugIds();
  const recentDrugIds = getRecentDrugIds();
  const favoriteDrugRow = favoriteDrugsContainer ? favoriteDrugsContainer.closest(".quick-drug-row") : null;
  const recentDrugRow = recentDrugsContainer ? recentDrugsContainer.closest(".quick-drug-row") : null;
  const quickDrugGroups = infusionShortcutsDisclosure
    ? infusionShortcutsDisclosure.querySelector(".quick-drug-groups")
    : null;

  favoriteDrugButton.textContent = isFavorite ? t("remove_favorite") : t("add_to_favorites");
  favoriteDrugButton.classList.toggle("is-active", isFavorite);
  favoriteDrugButton.disabled = selectedDrugId === "custom";
  renderQuickDrugButtons(favoriteDrugsContainer, favoriteDrugIds);
  renderQuickDrugButtons(recentDrugsContainer, recentDrugIds);

  if (favoriteDrugRow) {
    favoriteDrugRow.classList.toggle("hidden", !favoriteDrugIds.length);
  }

  if (recentDrugRow) {
    recentDrugRow.classList.toggle("hidden", !recentDrugIds.length);
  }

  if (quickDrugGroups) {
    quickDrugGroups.classList.toggle("hidden", !favoriteDrugIds.length && !recentDrugIds.length);
  }
}

// -----------------------------
// Mode activation
// -----------------------------

export function activateInfusionMode(modeId) {
  const normalizedModeId = sanitizeActiveMode(modeId);

  infusionModeTabs.forEach(function (tab) {
    const isActive = tab.dataset.infusionModeTab === normalizedModeId;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  infusionModePanels.forEach(function (panel) {
    const isActive = panel.dataset.infusionModePanel === normalizedModeId;
    panel.classList.toggle("hidden", !isActive);
  });

  updateSingleDrugState({
    activeMode: normalizedModeId
  });
  updateInfusionQuickSliders();
  refreshInfusionResultForCurrentMode({
    showValidation: false
  });
}

function activateInfusionLayoutMode(modeId, options) {
  const normalizedModeId = sanitizeInfusionLayoutMode(modeId);
  const shouldPersist = !options || options.persist !== false;
  const shouldRefresh = !options || options.refresh !== false;
  const isQuickMode = normalizedModeId === "quick";

  infusionLayoutTabs.forEach(function (tab) {
    const isActive = tab.dataset.infusionLayoutTab === normalizedModeId;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  if (infusionSingleDrugPanel) {
    infusionSingleDrugPanel.classList.toggle("is-quick-mode", isQuickMode);
    infusionSingleDrugPanel.classList.toggle("is-full-mode", !isQuickMode);
  }

  if (infusionQuickModeHint) {
    infusionQuickModeHint.classList.toggle("hidden", !isQuickMode);
  }

  if (infusionReferencesDisclosure) {
    if (isQuickMode) {
      infusionReferencesDisclosure.removeAttribute("open");
    } else {
      infusionReferencesDisclosure.setAttribute("open", "open");
    }
  }

  if (infusionShortcutsDisclosure) {
    if (isQuickMode) {
      infusionShortcutsDisclosure.removeAttribute("open");
    } else {
      infusionShortcutsDisclosure.setAttribute("open", "open");
    }
  }

  if (calculateButton) {
    calculateButton.classList.toggle("hidden", isQuickMode);
  }

  updateInfusionQuickSliders();

  if (shouldPersist) {
    updateSingleDrugState({
      viewMode: normalizedModeId
    });
  }

  if (!shouldRefresh) {
    return;
  }

  if (isQuickMode) {
    maybeRenderLiveInfusionResult({
      showValidation: false
    });
    return;
  }

  clearResult();
  errorMessage.textContent = "";
}

// -----------------------------
// Drug UI
// -----------------------------

export function updateDrugUI() {
  const selectedDrug = getSelectedDrugDefinition();
  const currentSettings = getCurrentDrugSettings();
  const isCustomDrug = drugSelect.value === "custom";
  const savedDoseList = parseDoseList(currentSettings.referenceDoseList);
  const dilutionPreset = getSelectedDrugDilutionPreset();
  const weightValue = Number(inputs.weight.value);
  const displayDoseUnit = getDisplayDoseUnit(
    selectedDrug,
    weightValue,
    getPreferredNitroglycerinDoseView()
  );
  const displayDoseList = savedDoseList
    ? convertDoseListForDisplay(savedDoseList, selectedDrug, weightValue, displayDoseUnit)
    : null;

  customDrugFields.classList.toggle("hidden", !isCustomDrug);
  presetSummary.classList.remove("hidden");

  inputs.concentration.value = currentSettings.concentration || String(selectedDrug.concentration);
  inputs.referenceDoseList.value = displayDoseList
    ? formatEditableDoseList(displayDoseList)
    : (currentSettings.referenceDoseList || formatList(selectedDrug.referenceDoses));
  inputs.customDrugName.value = isCustomDrug ? currentSettings.customDrugName : "";
  inputs.customDrugNotes.value = isCustomDrug ? currentSettings.customDrugNotes : "";

  concentrationUnitLabel.textContent = selectedDrug.concentrationUnit || "mcg/mL";
  doseUnitLabel.textContent = displayDoseUnit;

  if (nitroglycerinDoseViewSelect && nitroglycerinDoseViewHelp && doseUnitLabel) {
    const shouldShowNitroglycerinUnitView = !isCustomDrug && isNitroglycerinDrug(selectedDrug);
    const weightReadyForKgUnit = isPositiveNumber(weightValue);
    const kgUnitOption = nitroglycerinDoseViewSelect.querySelector('option[value="mcg/kg/min"]');

    if (kgUnitOption) {
      kgUnitOption.disabled = !weightReadyForKgUnit;
    }

    doseUnitLabel.classList.toggle("hidden", shouldShowNitroglycerinUnitView);
    nitroglycerinDoseViewSelect.classList.toggle("hidden", !shouldShowNitroglycerinUnitView);
    nitroglycerinDoseViewHelp.classList.toggle("hidden", !shouldShowNitroglycerinUnitView);
    nitroglycerinDoseViewSelect.value = displayDoseUnit;
    nitroglycerinDoseViewHelp.textContent = weightReadyForKgUnit
      ? t("nitroglycerin_unit_help")
      : t("nitroglycerin_unit_help_weight_needed");
  }

  if (displayDoseList) {
    referenceRangeText.textContent = formatInfusionRangeDisplay(
      Math.min.apply(null, displayDoseList),
      Math.max.apply(null, displayDoseList),
      displayDoseUnit,
      selectedDrug,
      weightValue
    );
  } else if (isNitroglycerinDrug(selectedDrug) && displayDoseUnit === "mcg/kg/min" && !isPositiveNumber(weightValue)) {
    referenceRangeText.textContent = formatInfusionRangeDisplay(
      selectedDrug.referenceRange.min,
      selectedDrug.referenceRange.max,
      selectedDrug.referenceRange.unit,
      selectedDrug,
      weightValue
    );
  } else if (selectedDrug.referenceRange.min > 0 || selectedDrug.referenceRange.max > 0) {
    referenceRangeText.textContent = formatInfusionRangeDisplay(
      convertDoseValueForDisplay(selectedDrug.referenceRange.min, selectedDrug, weightValue, displayDoseUnit),
      convertDoseValueForDisplay(selectedDrug.referenceRange.max, selectedDrug, weightValue, displayDoseUnit),
      displayDoseUnit,
      selectedDrug,
      weightValue
    );
  } else {
    referenceRangeText.textContent = "Custom reference values";
  }
  renderRangeSourceBadge(referenceRangeBadge, selectedDrug);
  renderUseCaseBadge(referenceUseCaseBadge, selectedDrug);
  referenceUseCaseText.textContent = isCustomDrug
    ? "Custom use case."
    : getDrugUseCaseSummary(selectedDrug);
  referenceRangeSourceText.textContent = isCustomDrug
    ? "User-defined range."
    : getRangeSourceSummary(selectedDrug);
  referenceRangeRationaleText.textContent = isCustomDrug
    ? "Custom values should be checked against your own source before clinical use."
    : getRangeRationale(selectedDrug);
  if (alternateUseCaseRow && alternateUseCaseText) {
    const alternateUseText = !isCustomDrug && selectedDrug.alternateUseCase
      ? selectedDrug.alternateUseCase
      : "";
    alternateUseCaseRow.classList.toggle("hidden", !alternateUseText);
    alternateUseCaseText.textContent = alternateUseText || "-";
  }
  applyRangeSourceTheme(presetSummary, selectedDrug);

  drugNotesText.textContent = isCustomDrug
    ? inputs.customDrugNotes.value.trim() || "User-defined custom drug."
    : selectedDrug.notes || "-";
  drugDilutionText.textContent = isCustomDrug
    ? "Custom / not set"
    : formatDilutionPreset(dilutionPreset);
  drugDilutionButton.disabled = !dilutionPreset || isCustomDrug;
  drugDilutionButton.title = dilutionPreset
    ? "Apply this concentration"
    : "No standard dilution preset available";
  drugSourceText.textContent = getDisplaySourceLabel(selectedDrug.metadata.source);
  drugLastReviewedText.textContent = selectedDrug.metadata.lastReviewed || "-";
  drugHelp.textContent = isCustomDrug
    ? t("drug_help_custom")
    : t("drug_help_selected", { drug: selectedDrug.name });
  updateQuickDrugUI();
  updateInfusionQuickSliders();
}

// -----------------------------
// Validation and input reading
// -----------------------------

function readInfusionFormValues() {
  const weight = Number(inputs.weight.value);
  const drug = getSelectedDrugDefinition();
  const displayDoseUnit = getDisplayDoseUnit(drug, weight, getSelectedNitroglycerinDoseView());
  const parsedReferenceDoseList = parseDoseList(inputs.referenceDoseList.value);

  return {
    mode: getActiveInfusionMode(),
    weight: weight,
    concentration: Number(inputs.concentration.value),
    targetDose: convertDoseValueToReferenceUnit(
      Number(inputs.targetDose.value),
      drug,
      weight,
      displayDoseUnit
    ),
    pumpRate: Number(inputs.pumpRate.value),
    referenceDoseList: parsedReferenceDoseList
      ? convertDoseListToReferenceUnit(parsedReferenceDoseList, drug, weight, displayDoseUnit)
      : null,
    displayDoseUnit: displayDoseUnit,
    drug: drug
  };
}

function validateInfusionValues(values) {
  if (isNitroglycerinDrug(values.drug) && values.displayDoseUnit === "mcg/kg/min" && !isPositiveNumber(values.weight)) {
    return t("validation_ntg_weight_for_kg_unit");
  }

  if (isWeightBasedReferenceRange(values.drug.referenceRange) && !isPositiveNumber(values.weight)) {
    return t("validation_patient_weight");
  }

  if (!isPositiveNumber(values.concentration)) {
    return t("validation_drug_concentration");
  }

  if (drugSelect.value === "custom" && inputs.customDrugName.value.trim() === "") {
    return t("validation_custom_drug_name");
  }

  if (values.mode === "dose-to-rate" && !isPositiveNumber(values.targetDose)) {
    return t("validation_target_dose");
  }

  if (values.mode === "rate-to-dose" && !isPositiveNumber(values.pumpRate)) {
    return t("validation_pump_rate");
  }

  return "";
}

function hasStartedQuickInfusionInput(values) {
  if (values.mode === "dose-to-rate" && inputs.targetDose.value.trim() !== "") {
    return true;
  }

  if (values.mode === "rate-to-dose" && inputs.pumpRate.value.trim() !== "") {
    return true;
  }

  if (drugSelect.value === "custom" && inputs.concentration.value.trim() !== "") {
    return true;
  }

  return false;
}

export function maybeRenderLiveInfusionResult(options) {
  const normalizedOptions = options || {};

  if (getActiveInfusionLayoutMode() !== "quick") {
    return false;
  }

  const values = readInfusionFormValues();
  const validationError = validateInfusionValues(values);
  const shouldShowValidation = normalizedOptions.showValidation !== false;

  if (validationError) {
    clearResult();
    errorMessage.textContent = shouldShowValidation && hasStartedQuickInfusionInput(values)
      ? validationError
      : "";
    return false;
  }

  errorMessage.textContent = "";
  clearResult();

  if (values.mode === "rate-to-dose") {
    showRateToDoseResult(values);
    return true;
  }

  showDoseToRateResult(values);
  return true;
}

function refreshInfusionResultForCurrentMode(options) {
  if (getActiveInfusionLayoutMode() === "quick") {
    maybeRenderLiveInfusionResult(options);
    return;
  }

  clearResult();
  errorMessage.textContent = "";
}

// -----------------------------
// Quick mode sliders and steppers
// -----------------------------

function getInfusionQuickInput(fieldKey) {
  switch (fieldKey) {
    case "weight":
      return inputs.weight;
    case "concentration":
      return inputs.concentration;
    case "targetDose":
      return inputs.targetDose;
    case "pumpRate":
      return inputs.pumpRate;
    default:
      return null;
  }
}

function getInfusionQuickFallbackValue(fieldKey) {
  if (fieldKey === "weight") {
    return 60;
  }

  if (fieldKey === "concentration") {
    return Number(getCurrentDrugSettings().concentration) || Number(getSelectedDrugDefinition().concentration) || 1;
  }

  if (fieldKey === "pumpRate") {
    return Number(inputs.pumpRate.value) || 1;
  }

  if (fieldKey === "targetDose") {
    const selectedDrug = getSelectedDrugDefinition();
    const weightValue = Number(inputs.weight.value);
    const displayDoseUnit = getDisplayDoseUnit(selectedDrug, weightValue, getSelectedNitroglycerinDoseView());
    const referenceMin = convertDoseValueForDisplay(selectedDrug.referenceRange.min || 0, selectedDrug, weightValue, displayDoseUnit);
    const referenceMax = convertDoseValueForDisplay(selectedDrug.referenceRange.max || 0, selectedDrug, weightValue, displayDoseUnit);

    if (isPositiveNumber(referenceMin) && isPositiveNumber(referenceMax)) {
      return (referenceMin + referenceMax) / 2;
    }

    return Number(inputs.targetDose.value) || 0.1;
  }

  return 0.1;
}

function getInfusionQuickStep(fieldKey) {
  if (fieldKey === "weight") {
    return 5;
  }

  return getAdaptiveQuickStep(getInfusionQuickFallbackValue(fieldKey));
}

function formatQuickSliderBound(value, unit, precision) {
  const digits = precision === undefined ? 0 : precision;
  return `${Number(value).toFixed(digits)} ${unit}`;
}

function getQuickWeightSliderConfig() {
  const currentWeight = Number(inputs.weight.value);
  let min = 20;
  let max = 140;

  if (isPositiveNumber(currentWeight) && currentWeight < min) {
    min = Math.max(1, Math.floor(currentWeight / 5) * 5 || 1);
  }

  if (isPositiveNumber(currentWeight) && currentWeight > max) {
    max = Math.ceil((currentWeight + 10) / 10) * 10;
  }

  const value = clampNumber(isPositiveNumber(currentWeight) ? currentWeight : 70, min, max);

  return {
    hidden: getActiveInfusionLayoutMode() !== "quick",
    min: min,
    max: max,
    step: 1,
    value: value,
    minLabel: formatQuickSliderBound(min, "kg", 0),
    maxLabel: formatQuickSliderBound(max, "kg", 0)
  };
}

function getQuickDoseSliderConfig() {
  const selectedDrug = getSelectedDrugDefinition();
  const currentSettings = getCurrentDrugSettings();
  const weightValue = Number(inputs.weight.value);
  const displayDoseUnit = getDisplayDoseUnit(selectedDrug, weightValue, getSelectedNitroglycerinDoseView());
  const canonicalDoseList = parseDoseList(currentSettings.referenceDoseList) || selectedDrug.referenceDoses || null;
  const displayDoseList = canonicalDoseList
    ? convertDoseListForDisplay(canonicalDoseList, selectedDrug, weightValue, displayDoseUnit)
    : null;
  const currentTargetDose = Number(inputs.targetDose.value);
  const fallbackTargetDose = getInfusionQuickFallbackValue("targetDose");
  let min = displayDoseList ? Math.min.apply(null, displayDoseList) : convertDoseValueForDisplay(selectedDrug.referenceRange.min || 0, selectedDrug, weightValue, displayDoseUnit);
  let max = displayDoseList ? Math.max.apply(null, displayDoseList) : convertDoseValueForDisplay(selectedDrug.referenceRange.max || 0, selectedDrug, weightValue, displayDoseUnit);

  if (isNitroglycerinDrug(selectedDrug) && displayDoseUnit === "mcg/kg/min" && !isPositiveNumber(weightValue)) {
    return {
      hidden: true
    };
  }

  if (isNitroglycerinDrug(selectedDrug) && displayDoseUnit === "mcg/kg/min") {
    const anchor = isPositiveNumber(currentTargetDose) ? currentTargetDose : fallbackTargetDose;
    const min = Math.max(0.001, anchor * 0.25);
    const max = Math.max(min + 0.01, anchor * 2.5);
    const step = getAdaptiveQuickStep(anchor);
    const precision = Math.min(getStepPrecision(step), 3);
    const value = clampNumber(anchor, min, max);

    return {
      hidden: getActiveInfusionLayoutMode() !== "quick" || getActiveInfusionMode() !== "dose-to-rate",
      min: min,
      max: max,
      step: step,
      value: value,
      precision: precision,
      minLabel: formatQuickSliderBound(min, displayDoseUnit, precision),
      maxLabel: formatQuickSliderBound(max, displayDoseUnit, precision)
    };
  }

  if (!isPositiveNumber(min) || !isPositiveNumber(max) || max <= min) {
    const anchor = isPositiveNumber(currentTargetDose) ? currentTargetDose : fallbackTargetDose;
    min = Math.max(0.001, anchor * 0.2);
    max = anchor * 2.5;
  }

  const step = getAdaptiveQuickStep((min + max) / 2);
  const precision = Math.min(getStepPrecision(step), 3);
  const value = clampNumber(
    isPositiveNumber(currentTargetDose) ? currentTargetDose : fallbackTargetDose,
    min,
    max
  );

  return {
    hidden: getActiveInfusionLayoutMode() !== "quick" || getActiveInfusionMode() !== "dose-to-rate",
    min: min,
    max: max,
    step: step,
    value: value,
    precision: precision,
    minLabel: formatQuickSliderBound(min, displayDoseUnit, precision),
    maxLabel: formatQuickSliderBound(max, displayDoseUnit, precision)
  };
}

function getQuickPumpRateSliderConfig() {
  const selectedDrug = getSelectedDrugDefinition();
  const currentSettings = getCurrentDrugSettings();
  const weightValue = Number(inputs.weight.value);
  const referenceRange = selectedDrug.referenceRange || null;
  const usesWeight = isWeightBasedReferenceRange(referenceRange);
  const concentrationValue = Number(inputs.concentration.value) || Number(getCurrentDrugSettings().concentration) || Number(selectedDrug.concentration);
  const currentPumpRate = Number(inputs.pumpRate.value);
  const fallbackPumpRate = getInfusionQuickFallbackValue("pumpRate");
  const canonicalDoseList = parseDoseList(currentSettings.referenceDoseList) || selectedDrug.referenceDoses || [];
  let min = 0;
  let max = 0;

  if (isPositiveNumber(concentrationValue) && (!usesWeight || isPositiveNumber(weightValue))) {
    if (canonicalDoseList.length) {
      min = doseToRate(weightValue, concentrationValue, Math.min.apply(null, canonicalDoseList), referenceRange);
      max = doseToRate(weightValue, concentrationValue, Math.max.apply(null, canonicalDoseList), referenceRange);
    } else if (isPositiveNumber(referenceRange.min) && isPositiveNumber(referenceRange.max)) {
      min = doseToRate(weightValue, concentrationValue, referenceRange.min, referenceRange);
      max = doseToRate(weightValue, concentrationValue, referenceRange.max, referenceRange);
    }
  }

  if (!isPositiveNumber(min) || !isPositiveNumber(max) || max <= min) {
    const anchor = isPositiveNumber(currentPumpRate) ? currentPumpRate : fallbackPumpRate;
    min = Math.max(0.1, anchor * 0.2);
    max = Math.max(min + 1, anchor * 2.5);
  }

  const step = getAdaptiveQuickStep((min + max) / 2);
  const precision = Math.min(getStepPrecision(step), 2);
  const value = clampNumber(
    isPositiveNumber(currentPumpRate) ? currentPumpRate : fallbackPumpRate,
    min,
    max
  );

  return {
    hidden: getActiveInfusionLayoutMode() !== "quick" || getActiveInfusionMode() !== "rate-to-dose",
    min: min,
    max: max,
    step: step,
    value: value,
    precision: precision,
    minLabel: formatQuickSliderBound(min, "mL/hr", precision),
    maxLabel: formatQuickSliderBound(max, "mL/hr", precision)
  };
}

function applyQuickSliderConfig(wrapper, slider, minLabelEl, maxLabelEl, config) {
  if (!wrapper || !slider || !minLabelEl || !maxLabelEl) {
    return;
  }

  if (!config || config.hidden) {
    wrapper.classList.add("hidden");
    return;
  }

  wrapper.classList.remove("hidden");
  slider.min = String(config.min);
  slider.max = String(config.max);
  slider.step = String(config.step);
  slider.value = String(config.value);
  slider.dataset.sliderPrecision = String(config.precision || 0);
  minLabelEl.textContent = config.minLabel;
  maxLabelEl.textContent = config.maxLabel;
}

function updateInfusionQuickSliders() {
  applyQuickSliderConfig(
    quickWeightSliderWrap,
    quickWeightSlider,
    quickWeightSliderMin,
    quickWeightSliderMax,
    getQuickWeightSliderConfig()
  );
  applyQuickSliderConfig(
    quickTargetDoseSliderWrap,
    quickTargetDoseSlider,
    quickTargetDoseSliderMin,
    quickTargetDoseSliderMax,
    getQuickDoseSliderConfig()
  );
  applyQuickSliderConfig(
    quickPumpRateSliderWrap,
    quickPumpRateSlider,
    quickPumpRateSliderMin,
    quickPumpRateSliderMax,
    getQuickPumpRateSliderConfig()
  );
}

function adjustInfusionQuickInput(fieldKey, direction) {
  const input = getInfusionQuickInput(fieldKey);

  if (!input) {
    return;
  }

  const stepValue = getInfusionQuickStep(fieldKey);
  const precision = getStepPrecision(stepValue);
  const currentValue = Number(input.value);
  const fallbackValue = getInfusionQuickFallbackValue(fieldKey);
  const baseValue = isPositiveNumber(currentValue) ? currentValue : fallbackValue;
  const nextValue = baseValue + (stepValue * direction);

  input.value = nextValue > 0
    ? Number(nextValue.toFixed(precision)).toString()
    : "";

  commitSingleDrugInputsFromView();
  updateDrugUI();
  refreshInfusionResultForCurrentMode({
    showValidation: true
  });
  input.focus();
}

function handleInfusionQuickSliderInput(event) {
  const slider = event.target.closest("[data-infusion-slider-target]");

  if (!slider) {
    return;
  }

  const fieldKey = slider.dataset.infusionSliderTarget;
  const input = getInfusionQuickInput(fieldKey);
  const precision = Number(slider.dataset.sliderPrecision || "0");

  if (!input) {
    return;
  }

  input.value = Number(slider.value).toFixed(precision).replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
  commitSingleDrugInputsFromView();
  updateDrugUI();
  refreshInfusionResultForCurrentMode({
    showValidation: true
  });
}

// -----------------------------
// Rendering layer
// -----------------------------

export function clearResult() {
  resultCard.classList.add("hidden");
  resultCard.classList.remove("is-warning");
  referenceTableCard.classList.add("hidden");
  resultLabel.textContent = t("result_label_calc");
  primaryResult.textContent = "0.00 mL/hr";
  primaryResult.classList.remove("is-warning");
  secondaryResultLabel.textContent = t("supporting_information");
  secondaryResult.textContent = "-";
  secondaryResult.classList.remove("is-warning");
  concentrationResult.textContent = "";
  concentrationExplanation.textContent = "";
  rateExplanation.textContent = "";
  infusionReferenceList.innerHTML = "";
  referenceTableCaption.textContent = "-";
  referenceTableBody.innerHTML = "";
  resultWarning.textContent = t("result_warning_default");
  resultWarning.classList.add("is-neutral");
  if (resultRangeBadge) {
    resultRangeBadge.innerHTML = "";
  }
  if (resultUseCaseBadge) {
    resultUseCaseBadge.innerHTML = "";
  }
  if (resultUseCaseText) {
    resultUseCaseText.textContent = "-";
  }
  applyRangeSourceTheme(resultCard, null);
  clearQuickResultPreview();
}

function clearQuickResultPreview() {
  if (!quickResultPreview) {
    return;
  }

  quickResultPreview.classList.add("hidden");
  quickResultPreview.classList.remove("is-warning");
  quickResultLabel.textContent = t("quick_live_result");
  quickPrimaryResult.textContent = "0.00 mL/hr";
  quickSecondaryResultLabel.textContent = t("supporting_information");
  quickSecondaryResult.textContent = "-";
  quickResultContext.textContent = "-";
  quickConcentrationResult.textContent = "";

  if (quickResultBadge) {
    quickResultBadge.innerHTML = "";
  }
}

function renderQuickResultPreview(config) {
  if (!quickResultPreview) {
    return;
  }

  if (getActiveInfusionLayoutMode() !== "quick") {
    clearQuickResultPreview();
    return;
  }

  quickResultLabel.textContent = t("quick_live_result");
  quickPrimaryResult.textContent = config.primary;
  quickSecondaryResultLabel.textContent = config.secondaryLabel;
  quickSecondaryResult.textContent = config.secondary;
  quickResultContext.textContent = config.context;
  quickConcentrationResult.textContent = config.meta;
  quickResultPreview.classList.toggle("is-warning", Boolean(config.isWarning));

  if (quickResultBadge) {
    quickResultBadge.innerHTML = config.badgeMarkup || "";
  }

  quickResultPreview.classList.remove("hidden");
}

function renderReferenceRows(rows, doseUnit, drug, weightKg) {
  referenceTableBody.innerHTML = rows.map(function (row) {
    return `
      <tr class="${row.isOutOfRange ? "is-warning" : ""}">
        <td>${formatInfusionDoseDisplay(row.dose, doseUnit, drug, weightKg)}</td>
        <td>${formatNumber(row.rate, 2)} mL/hr</td>
      </tr>
    `;
  }).join("");
}

function showDoseToRateResult(values) {
  const referenceRange = values.drug.referenceRange || null;
  const usesWeight = isWeightBasedReferenceRange(referenceRange);
  const rate = doseToRate(values.weight, values.concentration, values.targetDose, referenceRange);
  const doseUnit = values.displayDoseUnit || values.drug.referenceRange.unit || "mcg/kg/min";
  const concentrationUnit = values.drug.concentrationUnit || "mcg/mL";
  const isOutOfRange = !isWithinReferenceRange(values.targetDose, values.drug.referenceRange);
  const referenceIds = getInfusionReferenceIds(values);
  const displayedTargetDose = convertDoseValueForDisplay(values.targetDose, values.drug, values.weight, doseUnit);

  resultLabel.textContent = t("dose_to_rate");
  renderRangeSourceBadge(resultRangeBadge, values.drug);
  renderUseCaseBadge(resultUseCaseBadge, values.drug);
  resultUseCaseText.textContent = getDrugUseCaseSummary(values.drug);
  applyRangeSourceTheme(resultCard, values.drug);
  primaryResult.textContent = `${formatNumber(rate, 2)} mL/hr`;
  secondaryResultLabel.textContent = t("target_dose");
  secondaryResult.textContent = formatInfusionDoseDisplay(displayedTargetDose, doseUnit, values.drug, values.weight);
  concentrationResult.textContent = usesWeight
    ? `${values.drug.name} / ${formatNumber(values.concentration, 2)} ${concentrationUnit} / ${formatNumber(values.weight, 1)} kg`
    : `${values.drug.name} / ${formatNumber(values.concentration, 2)} ${concentrationUnit} / ${t("absolute_dose_mode")}`;
  concentrationExplanation.textContent = t("infusion_dose_calculation", {
    concentration: formatNumber(values.concentration, 2),
    unit: concentrationUnit
  });
  rateExplanation.textContent = usesWeight
    ? t("infusion_rate_formula_weight", {
      dose: formatNumber(values.targetDose, 3),
      weight: formatNumber(values.weight, 1),
      factor: getReferenceTimeFactor(referenceRange),
      concentration: formatNumber(values.concentration, 2),
      rate: formatNumber(rate, 2)
    })
    : t("infusion_rate_formula_absolute", {
      dose: formatNumber(values.targetDose, 3),
      factor: getReferenceTimeFactor(referenceRange),
      concentration: formatNumber(values.concentration, 2),
      rate: formatNumber(rate, 2)
    });
  renderReferenceList(infusionReferenceList, referenceIds);
  resultCard.classList.toggle("is-warning", isOutOfRange);
  primaryResult.classList.toggle("is-warning", isOutOfRange);
  primaryResult.classList.toggle("is-out-of-range", isOutOfRange);
  secondaryResult.classList.toggle("is-warning", isOutOfRange);
  secondaryResult.classList.toggle("is-out-of-range", isOutOfRange);
  resultWarning.textContent = isOutOfRange
    ? t("infusion_result_out_of_range")
    : t("infusion_result_reference_only");
  resultWarning.classList.toggle("is-neutral", !isOutOfRange);
  resultCard.classList.remove("hidden");
  renderQuickResultPreview({
    primary: `${formatNumber(rate, 2)} mL/hr`,
    secondaryLabel: t("target_dose"),
    secondary: formatInfusionDoseDisplay(displayedTargetDose, doseUnit, values.drug, values.weight),
    context: getDrugUseCaseSummary(values.drug),
    meta: concentrationResult.textContent,
    badgeMarkup: resultRangeBadge ? resultRangeBadge.innerHTML : "",
    isWarning: isOutOfRange
  });
}

function showRateToDoseResult(values) {
  const referenceRange = values.drug.referenceRange || null;
  const usesWeight = isWeightBasedReferenceRange(referenceRange);
  const dose = rateToDose(values.weight, values.concentration, values.pumpRate, referenceRange);
  const doseUnit = values.displayDoseUnit || values.drug.referenceRange.unit || "mcg/kg/min";
  const concentrationUnit = values.drug.concentrationUnit || "mcg/mL";
  const isOutOfRange = !isWithinReferenceRange(dose, values.drug.referenceRange);
  const referenceIds = getInfusionReferenceIds(values);
  const displayedDose = convertDoseValueForDisplay(dose, values.drug, values.weight, doseUnit);

  resultLabel.textContent = t("rate_to_dose");
  renderRangeSourceBadge(resultRangeBadge, values.drug);
  renderUseCaseBadge(resultUseCaseBadge, values.drug);
  resultUseCaseText.textContent = getDrugUseCaseSummary(values.drug);
  applyRangeSourceTheme(resultCard, values.drug);
  primaryResult.textContent = formatInfusionDoseDisplay(displayedDose, doseUnit, values.drug, values.weight);
  secondaryResultLabel.textContent = t("pump_rate");
  secondaryResult.textContent = `${formatNumber(values.pumpRate, 2)} mL/hr`;
  concentrationResult.textContent = usesWeight
    ? `${values.drug.name} / ${formatNumber(values.concentration, 2)} ${concentrationUnit} / ${formatNumber(values.weight, 1)} kg`
    : `${values.drug.name} / ${formatNumber(values.concentration, 2)} ${concentrationUnit} / ${t("absolute_dose_mode")}`;
  concentrationExplanation.textContent = t("infusion_dose_calculation", {
    concentration: formatNumber(values.concentration, 2),
    unit: concentrationUnit
  });
  rateExplanation.textContent = usesWeight
    ? t("infusion_dose_formula_weight", {
      rate: formatNumber(values.pumpRate, 2),
      concentration: formatNumber(values.concentration, 2),
      weight: formatNumber(values.weight, 1),
      factor: getReferenceTimeFactor(referenceRange),
      dose: formatNumber(dose, 3),
      unit: doseUnit
    })
    : t("infusion_dose_formula_absolute", {
      rate: formatNumber(values.pumpRate, 2),
      concentration: formatNumber(values.concentration, 2),
      factor: getReferenceTimeFactor(referenceRange),
      dose: formatNumber(dose, 3),
      unit: (values.drug.referenceRange && values.drug.referenceRange.unit) || doseUnit
    });
  renderReferenceList(infusionReferenceList, referenceIds);
  resultCard.classList.toggle("is-warning", isOutOfRange);
  primaryResult.classList.toggle("is-warning", isOutOfRange);
  primaryResult.classList.toggle("is-out-of-range", isOutOfRange);
  secondaryResult.classList.toggle("is-warning", isOutOfRange);
  secondaryResult.classList.toggle("is-out-of-range", isOutOfRange);
  resultWarning.textContent = isOutOfRange
    ? t("infusion_result_out_of_range")
    : t("infusion_result_reference_only");
  resultWarning.classList.toggle("is-neutral", !isOutOfRange);
  resultCard.classList.remove("hidden");
  renderQuickResultPreview({
    primary: formatInfusionDoseDisplay(displayedDose, doseUnit, values.drug, values.weight),
    secondaryLabel: t("pump_rate"),
    secondary: `${formatNumber(values.pumpRate, 2)} mL/hr`,
    context: getDrugUseCaseSummary(values.drug),
    meta: concentrationResult.textContent,
    badgeMarkup: resultRangeBadge ? resultRangeBadge.innerHTML : "",
    isWarning: isOutOfRange
  });
}

function showReferenceTableResult(values) {
  const referenceRange = values.drug.referenceRange || null;
  const usesWeight = isWeightBasedReferenceRange(referenceRange);
  const doseList = values.referenceDoseList || values.drug.referenceDoses;
  const rows = buildReferenceTable(values.weight, values.concentration, doseList, referenceRange).map(function (row) {
    return {
      ...row,
      isOutOfRange: !isWithinReferenceRange(row.dose, values.drug.referenceRange)
    };
  });
  const doseUnit = values.displayDoseUnit || values.drug.referenceRange.unit || "mcg/kg/min";
  const concentrationUnit = values.drug.concentrationUnit || "mcg/mL";
  const hasOutOfRangeRow = rows.some(function (row) {
    return row.isOutOfRange;
  });
  const referenceIds = getInfusionReferenceIds(values);
  const displayedDoseList = convertDoseListForDisplay(doseList, values.drug, values.weight, doseUnit);

  resultLabel.textContent = t("reference_dosing_table");
  renderRangeSourceBadge(resultRangeBadge, values.drug);
  renderUseCaseBadge(resultUseCaseBadge, values.drug);
  resultUseCaseText.textContent = getDrugUseCaseSummary(values.drug);
  applyRangeSourceTheme(resultCard, values.drug);
  primaryResult.textContent = values.drug.name;
  secondaryResultLabel.textContent = t("result_setup");
  secondaryResult.textContent = usesWeight
    ? `${formatNumber(values.weight, 1)} kg / ${formatNumber(values.concentration, 2)} ${concentrationUnit}`
    : `${formatNumber(values.concentration, 2)} ${concentrationUnit} / ${t("absolute_dose_mode")}`;
  concentrationResult.textContent = doseUnit === "mcg/kg/hr"
    ? `${t("reference_doses")}: ${displayedDoseList.map(function (dose) {
      return `${formatNumber(dose, 3)} mcg/kg/hr (${formatNumber(dose / 1000, 3)} mg/kg/hr)`;
    }).join(", ")}`
    : `${t("reference_doses")}: ${displayedDoseList.map(function (dose) {
      return formatEditableDoseValue(dose);
    }).join(", ")}`;
  concentrationExplanation.textContent = usesWeight
    ? t("reference_table_explanation_weight")
    : t("reference_table_explanation_absolute");
  rateExplanation.textContent = usesWeight
    ? t("formula_same_weight", { factor: getReferenceTimeFactor(referenceRange) })
    : t("formula_same_absolute", { factor: getReferenceTimeFactor(referenceRange) });
  renderReferenceList(infusionReferenceList, referenceIds);
  referenceTableCaption.textContent = usesWeight
    ? `${values.drug.name} / ${formatNumber(values.weight, 1)} kg / ${formatNumber(values.concentration, 2)} ${concentrationUnit}`
    : `${values.drug.name} / ${formatNumber(values.concentration, 2)} ${concentrationUnit} / ${t("absolute_dose_mode")}`;
  renderReferenceRows(rows.map(function (row) {
    return {
      ...row,
      dose: convertDoseValueForDisplay(row.dose, values.drug, values.weight, doseUnit)
    };
  }), doseUnit, values.drug, values.weight);
  resultCard.classList.toggle("is-warning", hasOutOfRangeRow);
  primaryResult.classList.remove("is-warning");
  secondaryResult.classList.toggle("is-warning", hasOutOfRangeRow);
  referenceTableCard.classList.remove("hidden");
  resultWarning.textContent = hasOutOfRangeRow
    ? t("infusion_result_out_of_range")
    : t("infusion_result_reference_only");
  resultWarning.classList.toggle("is-neutral", !hasOutOfRangeRow);
  resultCard.classList.remove("hidden");
}

// -----------------------------
// Event handlers
// -----------------------------

function handleSubmit(event) {
  event.preventDefault();

  const values = readInfusionFormValues();
  const validationError = validateInfusionValues(values);

  if (validationError) {
    errorMessage.textContent = validationError;
    clearResult();
    return;
  }

  errorMessage.textContent = "";
  clearResult();

  if (values.mode === "dose-to-rate") {
    showDoseToRateResult(values);
    return;
  }

  if (values.mode === "rate-to-dose") {
    showRateToDoseResult(values);
    return;
  }

  showDoseToRateResult(values);
}

function resetInfusionForm() {
  resetPersistedState(normalizePersistedState({
    ...persistedState,
    singleDrug: createDefaultSingleDrugState()
  }));
  savePersistedState(persistedState);
  form.reset();
  applySingleDrugStateToView(getSingleDrugState());
  activateInfusionMode(getSingleDrugState().activeMode);
  updateDrugUI();
  clearResult();
  errorMessage.textContent = "";
}

function handleDrugChange() {
  updateSingleDrugState({
    selectedDrugId: sanitizeSelectedDrugId(drugSelect.value)
  });
  recordRecentDrug(drugSelect.value);
  updateDrugUI();
  refreshInfusionResultForCurrentMode({
    showValidation: false
  });
}

function handleSessionInputChange(event) {
  if (shouldDeferDecimalInput(event)) {
    return;
  }
  commitSingleDrugInputsFromView();
  updateDrugUI();
  refreshInfusionResultForCurrentMode({
    showValidation: true
  });
}

function handleDrugSettingsChange(event) {
  if (shouldDeferDecimalInput(event)) {
    return;
  }
  commitSingleDrugStateFromView();
  updateDrugUI();
  refreshInfusionResultForCurrentMode({
    showValidation: true
  });
}

function handleNitroglycerinDoseViewChange() {
  const selectedDrug = getSelectedDrugDefinition();
  const currentWeight = Number(inputs.weight.value);
  const previousView = getPreferredNitroglycerinDoseView();
  const nextView = getSelectedNitroglycerinDoseView();

  if (!isNitroglycerinDrug(selectedDrug)) {
    return;
  }

  if (previousView === nextView) {
    return;
  }

  if (nextView === "mcg/kg/min" && !isPositiveNumber(currentWeight)) {
    nitroglycerinDoseViewSelect.value = previousView;
    if (nitroglycerinDoseViewHelp) {
      nitroglycerinDoseViewHelp.textContent = t("nitroglycerin_unit_help_weight_needed");
    }
    errorMessage.textContent = t("validation_ntg_weight_for_kg_unit");
    return;
  }

  const currentTargetDose = Number(inputs.targetDose.value);
  const currentReferenceDoseList = parseDoseList(inputs.referenceDoseList.value);

  if (isPositiveNumber(currentTargetDose)) {
    const canonicalTargetDose = convertDoseValueToReferenceUnit(
      currentTargetDose,
      selectedDrug,
      currentWeight,
      previousView
    );
    inputs.targetDose.value = formatEditableDoseValue(
      convertDoseValueForDisplay(canonicalTargetDose, selectedDrug, currentWeight, nextView)
    );
  }

  if (currentReferenceDoseList) {
    const canonicalReferenceDoseList = convertDoseListToReferenceUnit(
      currentReferenceDoseList,
      selectedDrug,
      currentWeight,
      previousView
    );
    inputs.referenceDoseList.value = formatEditableDoseList(
      convertDoseListForDisplay(canonicalReferenceDoseList, selectedDrug, currentWeight, nextView)
    );
  }

  updateSingleDrugState({
    nitroglycerinDoseUnitView: nextView
  });
  commitSingleDrugStateFromView();
  updateDrugUI();
  refreshInfusionResultForCurrentMode({
    showValidation: true
  });
}

function handleFavoriteDrugToggle() {
  toggleFavoriteDrug(drugSelect.value);
  updateDrugUI();
}

function handleQuickDrugSelect(event) {
  const removeQuickDrugButton = event.target.closest("[data-remove-quick-drug-id]");

  if (removeQuickDrugButton) {
    removeRecentDrug(removeQuickDrugButton.dataset.removeQuickDrugId);
    updateQuickDrugUI();
    return;
  }

  const quickDrugButton = event.target.closest("[data-quick-drug-id]");

  if (!quickDrugButton) {
    return;
  }

  drugSelect.value = quickDrugButton.dataset.quickDrugId;
  handleDrugChange();
}

function handleDilutionApply() {
  const dilutionPreset = getSelectedDrugDilutionPreset();

  if (!dilutionPreset) {
    return;
  }

  inputs.concentration.value = String(dilutionPreset.finalConcentration);
  commitSingleDrugStateFromView();
  updateDrugUI();
  refreshInfusionResultForCurrentMode({
    showValidation: false
  });
}

function handleInfusionQuickStepperClick(event) {
  const quickStepperButton = event.target.closest("[data-infusion-step-target]");

  if (!quickStepperButton) {
    return;
  }

  adjustInfusionQuickInput(
    quickStepperButton.dataset.infusionStepTarget,
    Number(quickStepperButton.dataset.infusionStepDirection) || 1
  );
}

// -----------------------------
// Wiring
// -----------------------------

infusionModeTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    activateInfusionMode(tab.dataset.infusionModeTab);
  });
});

infusionLayoutTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    activateInfusionLayoutMode(tab.dataset.infusionLayoutTab);
  });
});

drugSelect.addEventListener("change", handleDrugChange);
favoriteDrugButton.addEventListener("click", handleFavoriteDrugToggle);
favoriteDrugsContainer.addEventListener("click", handleQuickDrugSelect);
recentDrugsContainer.addEventListener("click", handleQuickDrugSelect);
drugDilutionButton.addEventListener("click", handleDilutionApply);
if (nitroglycerinDoseViewSelect) {
  nitroglycerinDoseViewSelect.addEventListener("change", handleNitroglycerinDoseViewChange);
}
form.addEventListener("submit", handleSubmit);
form.addEventListener("click", handleInfusionQuickStepperClick);
form.addEventListener("input", handleInfusionQuickSliderInput);
resetButton.addEventListener("click", resetInfusionForm);

[
  inputs.weight,
  inputs.targetDose,
  inputs.pumpRate
].forEach(function (input) {
  input.addEventListener("input", handleSessionInputChange);
});

[
  inputs.concentration,
  inputs.referenceDoseList,
  inputs.customDrugName,
  inputs.customDrugNotes
].forEach(function (input) {
  input.addEventListener("input", handleDrugSettingsChange);
});

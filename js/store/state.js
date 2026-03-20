import { DRUG_PRESETS, DEFAULT_CUSTOM_DRUG } from '../data/drug-presets.js';
import { PEDIATRIC_DRUG_PRESETS, DEFAULT_CUSTOM_PEDIATRIC_DRUG } from '../data/pediatric-presets.js';
import { DANTROLENE_FORMULATIONS } from '../data/mh-presets.js';
import { formatList, parseDoseList, isPositiveNumber, createClientId } from '../calc/utils.js';

// -----------------------------
// Drug config layer
// -----------------------------

export function getDefaultDrugPreset() {
  return DRUG_PRESETS[0];
}

export function getDrugPresetById(drugId) {
  return DRUG_PRESETS.find(function (preset) {
    return preset.id === drugId;
  }) || getDefaultDrugPreset();
}

export function isWithinReferenceRange(value, referenceRange) {
  if (!referenceRange) {
    return true;
  }

  if (!isPositiveNumber(referenceRange.min) || !isPositiveNumber(referenceRange.max)) {
    return true;
  }

  return value >= referenceRange.min && value <= referenceRange.max;
}

export function createDefaultDrugSettings() {
  const settings = {};

  DRUG_PRESETS.forEach(function (preset) {
    settings[preset.id] = {
      concentration: String(preset.concentration),
      referenceDoseList: formatList(preset.referenceDoses),
      customDrugName: "",
      customDrugNotes: ""
    };
  });

  settings.custom = {
    concentration: String(DEFAULT_CUSTOM_DRUG.concentration),
    referenceDoseList: formatList(DEFAULT_CUSTOM_DRUG.referenceDoses),
    customDrugName: "",
    customDrugNotes: ""
  };

  return settings;
}

export function getDefaultPediatricDrugPreset() {
  return PEDIATRIC_DRUG_PRESETS[0];
}

export function getPediatricDrugPresetById(drugId) {
  if (drugId === "custom") {
    return DEFAULT_CUSTOM_PEDIATRIC_DRUG;
  }

  return PEDIATRIC_DRUG_PRESETS.find(function (preset) {
    return preset.id === drugId;
  }) || getDefaultPediatricDrugPreset();
}

export function createDefaultPediatricDrugSettings() {
  const settings = {};

  PEDIATRIC_DRUG_PRESETS.forEach(function (preset) {
    settings[preset.id] = {
      concentration: String(preset.profiles.pediatricBolus.concentration.value),
      customDrugName: "",
      customDrugNotes: "",
      minDosePerKg: "",
      maxDosePerKg: "",
      doseUnit: "mg/kg",
      concentrationUnit: preset.profiles.pediatricBolus.concentration.unit,
      maxTotalDose: ""
    };
  });

  settings.custom = {
    concentration: String(DEFAULT_CUSTOM_PEDIATRIC_DRUG.profiles.pediatricBolus.concentration.value),
    customDrugName: "",
    customDrugNotes: "",
    minDosePerKg: String(DEFAULT_CUSTOM_PEDIATRIC_DRUG.profiles.pediatricBolus.recommendedRange.min),
    maxDosePerKg: String(DEFAULT_CUSTOM_PEDIATRIC_DRUG.profiles.pediatricBolus.recommendedRange.max),
    doseUnit: DEFAULT_CUSTOM_PEDIATRIC_DRUG.profiles.pediatricBolus.dosePerKgUnit,
    concentrationUnit: DEFAULT_CUSTOM_PEDIATRIC_DRUG.profiles.pediatricBolus.concentration.unit,
    maxTotalDose: ""
  };

  return settings;
}

// -----------------------------
// Persistence layer
// -----------------------------

export const STORAGE_KEY = "anestha.infusionPump.v1";

export function createDefaultSingleDrugState() {
  return {
    selectedDrugId: getDefaultDrugPreset().id,
    activeMode: "dose-to-rate",
    viewMode: "quick",
    nitroglycerinDoseUnitView: "mcg/min",
    favoriteDrugIds: [],
    recentDrugIds: [],
    inputs: {
      weight: "",
      targetDose: "",
      pumpRate: ""
    },
    drugSettings: createDefaultDrugSettings()
  };
}

export function createDefaultInfusionCardState() {
  return {
    cardId: "single-drug-card",
    calculatorType: "infusion-pump",
    patientScope: "independent",
    singleDrug: createDefaultSingleDrugState()
  };
}

export function normalizeInfusionCardState(rawState) {
  const source = rawState && typeof rawState === "object" ? rawState : {};

  return {
    cardId: sanitizeString(source.cardId, "single-drug-card"),
    calculatorType: "infusion-pump",
    patientScope: "independent",
    singleDrug: normalizeSingleDrugState(source.singleDrug)
  };
}

export function sanitizeString(value, fallback) {
  return typeof value === "string" ? value : fallback;
}

export function sanitizeSelectedDrugId(value) {
  if (value === "custom") {
    return "custom";
  }

  return DRUG_PRESETS.some(function (preset) {
    return preset.id === value;
  }) ? value : getDefaultDrugPreset().id;
}

export function sanitizeActiveMode(value) {
  const allowedModes = ["dose-to-rate", "rate-to-dose"];
  return allowedModes.includes(value) ? value : "dose-to-rate";
}

export function sanitizeInfusionLayoutMode(value) {
  return ["quick", "full"].includes(value) ? value : "quick";
}

export function sanitizeWorkspaceLayoutMode(value) {
  if (value === "detail") {
    return "full";
  }

  return ["quick", "full"].includes(value) ? value : "quick";
}

export function sanitizeNitroglycerinDoseUnitView(value) {
  return ["mcg/min", "mcg/kg/min"].includes(value) ? value : "mcg/min";
}

export function normalizeDrugSetting(rawSetting, defaultSetting) {
  const source = rawSetting && typeof rawSetting === "object" ? rawSetting : {};

  return {
    concentration: sanitizeString(source.concentration, defaultSetting.concentration),
    referenceDoseList: sanitizeString(source.referenceDoseList, defaultSetting.referenceDoseList),
    customDrugName: sanitizeString(source.customDrugName, defaultSetting.customDrugName),
    customDrugNotes: sanitizeString(source.customDrugNotes, defaultSetting.customDrugNotes)
  };
}

export function shouldMigrateLegacyRemimazolamValues(drugId) {
  return drugId === "remimazolam-induction" || drugId === "remimazolam-maintenance";
}

export function getCanonicalDrugPreset(drugId) {
  return DRUG_PRESETS.find(function (preset) {
    return preset.id === drugId;
  }) || null;
}

export function isCloseToCanonicalDoseList(parsedList, canonicalDoseList) {
  if (!Array.isArray(parsedList) || !Array.isArray(canonicalDoseList) || parsedList.length !== canonicalDoseList.length) {
    return false;
  }

  return parsedList.every(function (dose, index) {
    return Math.abs(dose - canonicalDoseList[index]) <= 5;
  });
}

export function migrateLegacyRemimazolamReferenceDoseList(drugId, referenceDoseList, fallbackList) {
  if (!shouldMigrateLegacyRemimazolamValues(drugId)) {
    return referenceDoseList;
  }

  const parsedList = parseDoseList(referenceDoseList);
  const preset = getCanonicalDrugPreset(drugId);
  const canonicalDoseList = preset ? preset.referenceDoses : [];

  if (!parsedList || !parsedList.length) {
    return fallbackList;
  }

  if (isCloseToCanonicalDoseList(parsedList, canonicalDoseList)) {
    return fallbackList;
  }

  const maxDose = Math.max.apply(null, parsedList);

  if (maxDose >= 500) {
    return referenceDoseList;
  }

  return fallbackList;
}

export function migrateLegacyRemimazolamTargetDose(drugId, targetDose) {
  if (!shouldMigrateLegacyRemimazolamValues(drugId)) {
    return targetDose;
  }

  const numericDose = Number(targetDose);
  const preset = getCanonicalDrugPreset(drugId);
  const canonicalDoseList = preset ? preset.referenceDoses : [];

  if (!isPositiveNumber(numericDose)) {
    return targetDose;
  }

  if (!canonicalDoseList.length) {
    return targetDose;
  }

  if (canonicalDoseList.some(function (dose) {
    return Math.abs(dose - numericDose) <= 5;
  })) {
    const nearestCanonicalExistingDose = canonicalDoseList.reduce(function (closest, currentDose) {
      if (Math.abs(currentDose - numericDose) < Math.abs(closest - numericDose)) {
        return currentDose;
      }

      return closest;
    }, canonicalDoseList[0]);

    return String(nearestCanonicalExistingDose);
  }

  if (numericDose >= 500) {
    return targetDose;
  }

  const migratedDose = numericDose * 60;
  const nearestCanonicalDose = canonicalDoseList.reduce(function (closest, currentDose) {
    if (Math.abs(currentDose - migratedDose) < Math.abs(closest - migratedDose)) {
      return currentDose;
    }

    return closest;
  }, canonicalDoseList[0]);

  return String(nearestCanonicalDose);
}

export function normalizeSingleDrugState(rawState) {
  const fallback = createDefaultSingleDrugState();
  const source = rawState && typeof rawState === "object" ? rawState : {};
  const rawInputs = source.inputs && typeof source.inputs === "object" ? source.inputs : {};
  const rawDrugSettings = source.drugSettings && typeof source.drugSettings === "object" ? source.drugSettings : {};
  const selectedDrugId = sanitizeSelectedDrugId(source.selectedDrugId);

  const normalizedDrugSettings = {};

  Object.keys(fallback.drugSettings).forEach(function (drugId) {
    const normalizedSetting = normalizeDrugSetting(rawDrugSettings[drugId], fallback.drugSettings[drugId]);

    normalizedDrugSettings[drugId] = {
      ...normalizedSetting,
      referenceDoseList: migrateLegacyRemimazolamReferenceDoseList(
        drugId,
        normalizedSetting.referenceDoseList,
        fallback.drugSettings[drugId].referenceDoseList
      )
    };
  });

  return {
    selectedDrugId: selectedDrugId,
    activeMode: sanitizeActiveMode(source.activeMode),
    viewMode: sanitizeInfusionLayoutMode(source.viewMode),
    nitroglycerinDoseUnitView: sanitizeNitroglycerinDoseUnitView(source.nitroglycerinDoseUnitView),
    favoriteDrugIds: normalizeQuickDrugIds(source.favoriteDrugIds),
    recentDrugIds: normalizeQuickDrugIds(source.recentDrugIds),
    inputs: {
      weight: sanitizeString(rawInputs.weight, fallback.inputs.weight),
      targetDose: migrateLegacyRemimazolamTargetDose(
        selectedDrugId,
        sanitizeString(rawInputs.targetDose, fallback.inputs.targetDose)
      ),
      pumpRate: sanitizeString(rawInputs.pumpRate, fallback.inputs.pumpRate)
    },
    drugSettings: normalizedDrugSettings
  };
}

export function normalizeQuickDrugIds(rawIds) {
  if (!Array.isArray(rawIds)) {
    return [];
  }

  return rawIds.filter(function (drugId, index) {
    return drugId !== "custom"
      && DRUG_PRESETS.some(function (preset) {
        return preset.id === drugId;
      })
      && rawIds.indexOf(drugId) === index;
  }).slice(0, 5);
}

export function createDefaultPersistedState() {
  return {
    singleDrug: createDefaultSingleDrugState(),
    pediatricDose: createDefaultPediatricDoseState(),
    dantroleneQuick: createDefaultDantroleneQuickState(),
    infusionWorkspace: createDefaultInfusionWorkspaceState(),
    infusionTemplates: []
  };
}

export function createDefaultPediatricDoseState() {
  return {
    selectedDrugId: getDefaultPediatricDrugPreset().id,
    activeSavedCustomDrugId: "",
    activeMode: "dosing",
    showUnverifiedPresets: false,
    inputs: {
      weight: "",
      emergencyWeight: "",
      ageGroup: "child",
      airwayAgeYears: "",
      airwayWeight: "",
      airwayDeviceCategory: "ett",
      airwayDeviceModel: "i-gel"
    },
    drugSettings: createDefaultPediatricDrugSettings(),
    savedCustomDrugs: []
  };
}

export function createDefaultDantroleneQuickState() {
  return {
    inputs: {
      weight: "",
      formulationId: DANTROLENE_FORMULATIONS[0].id,
      initialDoseMgKg: String(DANTROLENE_FORMULATIONS[0].defaultInitialDoseMgKg)
    }
  };
}

export function createDefaultInfusionWorkspaceCardState(drugId) {
  const preset = getDrugPresetById(drugId || getDefaultDrugPreset().id);
  const defaultTargetDose = preset.referenceDoses[2] || preset.referenceDoses[0] || 0.1;

  return {
    cardId: createClientId("workspace-card"),
    selectedDrugId: preset.id,
    concentration: String(preset.concentration),
    targetDose: String(defaultTargetDose),
    nitroglycerinDoseUnitView: "mcg/min"
  };
}

export function createDefaultInfusionWorkspaceState() {
  return {
    activeView: "single-drug",
    viewMode: "quick",
    sharedWeight: "",
    selectedTemplateId: "",
    cards: [createDefaultInfusionWorkspaceCardState()]
  };
}

export function createInfusionTemplateState(name, note, cards, existingTemplateId) {
  const timestamp = new Date().toISOString();

  return {
    id: existingTemplateId || createClientId("template"),
    name: name.trim(),
    note: (note || "").trim(),
    createdAt: timestamp,
    updatedAt: timestamp,
    cards: cards.map(function (card) {
      return normalizeInfusionWorkspaceCardState(card);
    })
  };
}

export function normalizePersistedState(rawState) {
  const source = rawState && typeof rawState === "object" ? rawState : {};
  const legacySingleDrugState = source.singleDrug && typeof source.singleDrug === "object"
    ? source.singleDrug
    : source;

  return {
    singleDrug: normalizeSingleDrugState(legacySingleDrugState),
    pediatricDose: normalizePediatricDoseState(source.pediatricDose),
    dantroleneQuick: normalizeDantroleneQuickState(source.dantroleneQuick),
    infusionWorkspace: normalizeInfusionWorkspaceState(source.infusionWorkspace),
    infusionTemplates: normalizeInfusionTemplates(source.infusionTemplates)
  };
}

export function normalizeInfusionWorkspaceCardState(rawCard) {
  const fallback = createDefaultInfusionWorkspaceCardState();
  const source = rawCard && typeof rawCard === "object" ? rawCard : {};
  const selectedDrugId = sanitizeSelectedDrugId(source.selectedDrugId);

  return {
    cardId: sanitizeString(source.cardId, fallback.cardId),
    selectedDrugId: selectedDrugId,
    concentration: sanitizeString(source.concentration, fallback.concentration),
    targetDose: migrateLegacyRemimazolamTargetDose(
      selectedDrugId,
      sanitizeString(source.targetDose, fallback.targetDose)
    ),
    nitroglycerinDoseUnitView: sanitizeNitroglycerinDoseUnitView(source.nitroglycerinDoseUnitView)
  };
}

export function normalizeInfusionWorkspaceState(rawState) {
  const fallback = createDefaultInfusionWorkspaceState();
  const source = rawState && typeof rawState === "object" ? rawState : {};
  const rawCards = Array.isArray(source.cards) ? source.cards : fallback.cards;
  const normalizedCards = rawCards
    .map(normalizeInfusionWorkspaceCardState)
    .slice(0, 6);

  return {
    activeView: ["single-drug", "workspace"].includes(source.activeView)
      ? source.activeView
      : fallback.activeView,
    viewMode: sanitizeWorkspaceLayoutMode(source.viewMode),
    sharedWeight: sanitizeString(source.sharedWeight, fallback.sharedWeight),
    selectedTemplateId: sanitizeString(source.selectedTemplateId, fallback.selectedTemplateId),
    cards: normalizedCards.length ? normalizedCards : fallback.cards
  };
}

export function normalizeInfusionTemplate(rawTemplate) {
  const source = rawTemplate && typeof rawTemplate === "object" ? rawTemplate : {};
  const rawCards = Array.isArray(source.cards) ? source.cards : [];
  const normalizedCards = rawCards
    .map(normalizeInfusionWorkspaceCardState)
    .slice(0, 6);

  return {
    id: sanitizeString(source.id, createClientId("template")),
    name: sanitizeString(source.name, "Untitled template").trim() || "Untitled template",
    note: sanitizeString(source.note, "").trim(),
    createdAt: sanitizeString(source.createdAt, ""),
    updatedAt: sanitizeString(source.updatedAt, ""),
    cards: normalizedCards.length ? normalizedCards : [createDefaultInfusionWorkspaceCardState()]
  };
}

export function normalizeInfusionTemplates(rawTemplates) {
  if (!Array.isArray(rawTemplates)) {
    return [];
  }

  return rawTemplates
    .map(normalizeInfusionTemplate)
    .filter(function (template, index, array) {
      return array.findIndex(function (item) {
        return item.id === template.id;
      }) === index;
    })
    .slice(-10);
}

export function normalizeDantroleneQuickState(rawState) {
  const fallback = createDefaultDantroleneQuickState();
  const source = rawState && typeof rawState === "object" ? rawState : {};
  const rawInputs = source.inputs && typeof source.inputs === "object" ? source.inputs : {};

  return {
    inputs: {
      weight: sanitizeString(rawInputs.weight, fallback.inputs.weight),
      formulationId: DANTROLENE_FORMULATIONS.some(function (item) {
        return item.id === rawInputs.formulationId;
      }) ? rawInputs.formulationId : fallback.inputs.formulationId,
      initialDoseMgKg: sanitizeString(rawInputs.initialDoseMgKg, fallback.inputs.initialDoseMgKg)
    }
  };
}

export function sanitizePediatricSelectedDrugId(value) {
  if (value === "custom") {
    return "custom";
  }

  return PEDIATRIC_DRUG_PRESETS.some(function (preset) {
    return preset.id === value;
  }) ? value : getDefaultPediatricDrugPreset().id;
}

export function sanitizePediatricActiveMode(value) {
  return ["dosing", "airway", "emergency"].includes(value) ? value : "dosing";
}

export function normalizePediatricDrugSetting(rawSetting, defaultSetting) {
  const source = rawSetting && typeof rawSetting === "object" ? rawSetting : {};

  return {
    concentration: sanitizeString(source.concentration, defaultSetting.concentration),
    customDrugName: sanitizeString(source.customDrugName, defaultSetting.customDrugName),
    customDrugNotes: sanitizeString(source.customDrugNotes, defaultSetting.customDrugNotes),
    minDosePerKg: sanitizeString(source.minDosePerKg, defaultSetting.minDosePerKg),
    maxDosePerKg: sanitizeString(source.maxDosePerKg, defaultSetting.maxDosePerKg),
    doseUnit: sanitizeString(source.doseUnit, defaultSetting.doseUnit),
    concentrationUnit: sanitizeString(source.concentrationUnit, defaultSetting.concentrationUnit),
    maxTotalDose: sanitizeString(source.maxTotalDose, defaultSetting.maxTotalDose)
  };
}

export function normalizePediatricDoseState(rawState) {
  const fallback = createDefaultPediatricDoseState();
  const source = rawState && typeof rawState === "object" ? rawState : {};
  const rawInputs = source.inputs && typeof source.inputs === "object" ? source.inputs : {};
  const rawDrugSettings = source.drugSettings && typeof source.drugSettings === "object" ? source.drugSettings : {};
  const normalizedDrugSettings = {};

  Object.keys(fallback.drugSettings).forEach(function (drugId) {
    normalizedDrugSettings[drugId] = normalizePediatricDrugSetting(rawDrugSettings[drugId], fallback.drugSettings[drugId]);
  });

  return {
    selectedDrugId: sanitizePediatricSelectedDrugId(source.selectedDrugId),
    activeSavedCustomDrugId: sanitizeString(source.activeSavedCustomDrugId, fallback.activeSavedCustomDrugId),
    activeMode: sanitizePediatricActiveMode(source.activeMode),
    showUnverifiedPresets: Boolean(source.showUnverifiedPresets),
    inputs: {
      weight: sanitizeString(rawInputs.weight, fallback.inputs.weight),
      emergencyWeight: sanitizeString(rawInputs.emergencyWeight, fallback.inputs.emergencyWeight),
      airwayAgeYears: sanitizeString(rawInputs.airwayAgeYears, fallback.inputs.airwayAgeYears),
      airwayWeight: sanitizeString(rawInputs.airwayWeight, fallback.inputs.airwayWeight),
      airwayDeviceCategory: ["ett", "supraglottic", "oral-airway", "nasal-airway", "laryngoscope", "face-mask"].includes(rawInputs.airwayDeviceCategory)
        ? rawInputs.airwayDeviceCategory
        : fallback.inputs.airwayDeviceCategory,
      airwayDeviceModel: ["i-gel", "lma-supreme"].includes(rawInputs.airwayDeviceModel)
        ? rawInputs.airwayDeviceModel
        : fallback.inputs.airwayDeviceModel,
      ageGroup: ["neonate", "infant", "child", "adolescent"].includes(rawInputs.ageGroup)
        ? rawInputs.ageGroup
        : fallback.inputs.ageGroup
    },
    drugSettings: normalizedDrugSettings,
    savedCustomDrugs: normalizeSavedCustomPediatricDrugs(source.savedCustomDrugs)
  };
}

export function normalizeSavedCustomPediatricDrug(rawDrug) {
  const source = rawDrug && typeof rawDrug === "object" ? rawDrug : {};
  const fallback = createDefaultPediatricDrugSettings().custom;

  return {
    id: sanitizeString(source.id, `custom-${Date.now()}`),
    customDrugName: sanitizeString(source.customDrugName, fallback.customDrugName),
    customDrugNotes: sanitizeString(source.customDrugNotes, fallback.customDrugNotes),
    minDosePerKg: sanitizeString(source.minDosePerKg, fallback.minDosePerKg),
    maxDosePerKg: sanitizeString(source.maxDosePerKg, fallback.maxDosePerKg),
    doseUnit: sanitizeString(source.doseUnit, fallback.doseUnit),
    concentration: sanitizeString(source.concentration, fallback.concentration),
    concentrationUnit: sanitizeString(source.concentrationUnit, fallback.concentrationUnit),
    maxTotalDose: sanitizeString(source.maxTotalDose, fallback.maxTotalDose)
  };
}

export function normalizeSavedCustomPediatricDrugs(rawDrugs) {
  if (!Array.isArray(rawDrugs)) {
    return [];
  }

  return rawDrugs
    .map(normalizeSavedCustomPediatricDrug)
    .filter(function (drug, index, array) {
      return drug.customDrugName.trim() !== ""
        && array.findIndex(function (item) {
          return item.id === drug.id;
        }) === index;
    })
    .slice(0, 12);
}

export function loadPersistedState() {
  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);

    if (!rawValue) {
      return createDefaultPersistedState();
    }

    return normalizePersistedState(JSON.parse(rawValue));
  } catch (error) {
    return createDefaultPersistedState();
  }
}

export function savePersistedState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizePersistedState(state)));
  } catch (error) {
    // Keep the app usable if storage is unavailable.
  }
}

// -----------------------------
// View state layer
// -----------------------------

export let persistedState = loadPersistedState();

export function getSingleDrugState() {
  return persistedState.singleDrug;
}

export function getPediatricDoseState() {
  return persistedState.pediatricDose;
}

export function getDantroleneQuickState() {
  return persistedState.dantroleneQuick;
}

export function getInfusionWorkspaceState() {
  return persistedState.infusionWorkspace;
}

export function getInfusionTemplates() {
  return persistedState.infusionTemplates || [];
}

export function getSavedCustomPediatricDrugs() {
  return getPediatricDoseState().savedCustomDrugs || [];
}

export function getActiveSavedCustomPediatricDrugId() {
  return getPediatricDoseState().activeSavedCustomDrugId || "";
}

export function getSavedCustomOptionValue(savedDrugId) {
  return `saved:${savedDrugId}`;
}

export function getSavedCustomDrugIdFromOptionValue(optionValue) {
  return typeof optionValue === "string" && optionValue.startsWith("saved:")
    ? optionValue.slice(6)
    : "";
}

export function isCustomPediatricSelection(optionValue) {
  return optionValue === "custom" || getSavedCustomDrugIdFromOptionValue(optionValue) !== "";
}

export function getPediatricSelectValueFromState(pediatricDoseState) {
  const normalizedState = normalizePediatricDoseState(pediatricDoseState);
  return normalizedState.selectedDrugId === "custom" && normalizedState.activeSavedCustomDrugId
    ? getSavedCustomOptionValue(normalizedState.activeSavedCustomDrugId)
    : normalizedState.selectedDrugId;
}

export function updateSingleDrugState(patch) {
  persistedState.singleDrug = normalizeSingleDrugState({
    ...getSingleDrugState(),
    ...patch
  });
  savePersistedState(persistedState);
}

export function updatePediatricDoseState(patch) {
  persistedState.pediatricDose = normalizePediatricDoseState({
    ...getPediatricDoseState(),
    ...patch
  });
  savePersistedState(persistedState);
}

export function updateDantroleneQuickState(patch) {
  persistedState.dantroleneQuick = normalizeDantroleneQuickState({
    ...getDantroleneQuickState(),
    ...patch
  });
  savePersistedState(persistedState);
}

export function updateInfusionWorkspaceState(patch) {
  persistedState.infusionWorkspace = normalizeInfusionWorkspaceState({
    ...getInfusionWorkspaceState(),
    ...patch
  });
  savePersistedState(persistedState);
}

export function updateInfusionTemplates(templates) {
  persistedState.infusionTemplates = normalizeInfusionTemplates(templates);
  savePersistedState(persistedState);
}

export function getFavoriteDrugIds() {
  return getSingleDrugState().favoriteDrugIds || [];
}

export function getRecentDrugIds() {
  return getSingleDrugState().recentDrugIds || [];
}

export function resetPersistedState(newState) {
  persistedState = newState;
}

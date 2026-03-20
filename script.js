import { isWeightBasedReferenceRange, isNitroglycerinDrug, getReferenceTimeFactor, doseToRate, rateToDose, buildReferenceTable, calculateWeightBasedDoseRange, calculateDoseVolume } from './js/calc/infusion.js';
import { calculateBodyWeightMetrics } from './js/calc/body-weight.js';
import { roundToNearestHalf, calculatePediatricAirwayEstimates, calculateDantroleneDose } from './js/calc/pediatric.js';
import { formatNumber, formatList, parseDoseList, isPositiveNumber, getUnitBase } from './js/calc/utils.js';
import { TRANSLATIONS } from './js/data/translations.js';
import { REFERENCE_REGISTRY } from './js/data/reference-registry.js';
import { DEFAULT_CUSTOM_DRUG, DRUG_PRESETS } from './js/data/drug-presets.js';
import { DEFAULT_CUSTOM_PEDIATRIC_DRUG, PEDIATRIC_DRUG_PRESETS } from './js/data/pediatric-presets.js';

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
const infusionViewTabs = document.querySelectorAll("[data-infusion-view-tab]");
const infusionViewPanels = document.querySelectorAll("[data-infusion-view-panel]");
const calculatorTabs = document.querySelectorAll("[data-calculator-tab]");
const calculatorViews = document.querySelectorAll("[data-calculator-view]");
const infusionSingleDrugPanel = document.getElementById("infusion-view-single-drug");
const infusionWorkspacePanel = document.getElementById("infusion-view-workspace");
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
const dantroleneForm = document.getElementById("dantrolene-form");
const dantroleneResetButton = document.getElementById("dantrolene-reset-button");
const dantroleneErrorMessage = document.getElementById("dantrolene-error-message");
const dantroleneResultCard = document.getElementById("dantrolene-result-card");
const dantrolenePrimaryResult = document.getElementById("dantrolene-primary-result");
const dantroleneSecondaryResult = document.getElementById("dantrolene-secondary-result");
const dantroleneContext = document.getElementById("dantrolene-context");
const dantroleneInitialVials = document.getElementById("dantrolene-initial-vials");
const dantroleneMaxVials = document.getElementById("dantrolene-max-vials");
const dantroleneVialExplanation = document.getElementById("dantrolene-vial-explanation");
const dantroleneReconstitutionExplanation = document.getElementById("dantrolene-reconstitution-explanation");
const dantroleneInitialGuide = document.getElementById("dantrolene-initial-guide");
const dantroleneRepeatGuide = document.getElementById("dantrolene-repeat-guide");
const dantroleneMaintenanceGuide = document.getElementById("dantrolene-maintenance-guide");
const dantroleneReferenceList = document.getElementById("dantrolene-reference-list");
const dantroleneResultWarning = document.getElementById("dantrolene-result-warning");
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

const inputs = {
  weight: document.getElementById("weight"),
  concentration: document.getElementById("concentration"),
  targetDose: document.getElementById("target-dose"),
  pumpRate: document.getElementById("pump-rate"),
  referenceDoseList: document.getElementById("reference-dose-list"),
  customDrugName: document.getElementById("custom-drug-name"),
  customDrugNotes: document.getElementById("custom-drug-notes")
};

const workspaceSharedWeightInput = document.getElementById("workspace-shared-weight");
const workspaceSharedWeightStepButtons = document.querySelectorAll("[data-workspace-shared-step]");
const workspaceLayoutTabs = document.querySelectorAll("[data-workspace-layout-tab]");
const workspaceAddCardButton = document.getElementById("workspace-add-card-button");
const workspaceQuickModeHint = document.getElementById("workspace-quick-mode-hint");
const workspaceTemplateNameInput = document.getElementById("workspace-template-name");
const workspaceTemplateNoteInput = document.getElementById("workspace-template-note");
const workspaceTemplateSelect = document.getElementById("workspace-template-select");
const workspaceLoadTemplateButton = document.getElementById("workspace-load-template-button");
const workspaceSaveTemplateButton = document.getElementById("workspace-save-template-button");
const workspaceDeleteTemplateButton = document.getElementById("workspace-delete-template-button");
const workspaceTemplateDisclosure = document.getElementById("workspace-template-disclosure");
const workspaceCardList = document.getElementById("workspace-card-list");
const workspaceHelp = document.getElementById("workspace-help");

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

const dilutionInputs = {
  targetConcentration: document.getElementById("dilution-target-concentration"),
  targetUnit: document.getElementById("dilution-target-unit"),
  finalVolume: document.getElementById("dilution-final-volume"),
  stockConcentration: document.getElementById("dilution-stock-concentration"),
  stockUnit: document.getElementById("dilution-stock-unit"),
  errorMessage: document.getElementById("dilution-error-message"),
  form: document.getElementById("dilution-form"),
  resetButton: document.getElementById("dilution-reset-button"),
  resultCard: document.getElementById("dilution-result-card"),
  resultLabel: document.getElementById("dilution-result-label"),
  resultBox1: document.getElementById("dilution-result-box-1"),
  resultBox2: document.getElementById("dilution-result-box-2"),
  resultTitle1: document.getElementById("dilution-result-title-1"),
  resultTitle2: document.getElementById("dilution-result-title-2"),
  resultValue1: document.getElementById("dilution-result-value-1"),
  resultValue2: document.getElementById("dilution-result-value-2"),
  summaryHeading: document.getElementById("dilution-summary-heading"),
  summaryText: document.getElementById("dilution-summary-text"),
  modeTabs: document.querySelectorAll("[data-dilution-mode-tab]"),
  modePanels: document.querySelectorAll("[data-dilution-mode-panel]"),
  reverseDrugAmount: document.getElementById("dilution-reverse-drug-amount"),
  reverseDrugUnit: document.getElementById("dilution-reverse-drug-unit"),
  reverseFinalVolume: document.getElementById("dilution-reverse-final-volume")
};

const dantroleneInputs = {
  weight: document.getElementById("dantrolene-weight"),
  formulation: document.getElementById("dantrolene-formulation"),
  initialDose: document.getElementById("dantrolene-initial-dose")
};

const languageSelect = document.getElementById("language-select");
const feedbackGeneralLink = document.getElementById("feedback-general-link");
const feedbackReferenceLink = document.getElementById("feedback-reference-link");
const feedbackBugLink = document.getElementById("feedback-bug-link");
const contactLink = document.getElementById("contact-link");
const contactEmailRow = document.getElementById("contact-email-row");
const contactEmailText = document.getElementById("contact-email-text");
const feedbackStatus = document.getElementById("feedback-status");
const supportDonateCard = document.getElementById("support-donate-card");
const supportTossLink = document.getElementById("support-toss-link");
const supportKofiLink = document.getElementById("support-kofi-link");
const supportStatus = document.getElementById("support-status");
const supportWeightSexInput = document.getElementById("support-weight-sex");
const supportWeightHeightInput = document.getElementById("support-weight-height");
const supportWeightTotalInput = document.getElementById("support-weight-total");
const supportWeightBmi = document.getElementById("support-weight-bmi");
const supportWeightBsa = document.getElementById("support-weight-bsa");
const supportWeightIbw = document.getElementById("support-weight-ibw");
const supportWeightLbw = document.getElementById("support-weight-lbw");
const supportWeightAdjbw = document.getElementById("support-weight-adjbw");
const supportWeightNote = document.getElementById("support-weight-note");

const LANGUAGE_STORAGE_KEY = "anestha.language";
const FEEDBACK_CONFIG = {
  generalUrl: "https://docs.google.com/forms/d/e/1FAIpQLSekcnkvm28ePkxhL0tGtDDtIas3uVhr4mwiGdcKnwTn_W2qvw/viewform?usp=publish-editor",
  referenceUrl: "https://docs.google.com/forms/d/e/1FAIpQLSekcnkvm28ePkxhL0tGtDDtIas3uVhr4mwiGdcKnwTn_W2qvw/viewform?usp=publish-editor",
  bugUrl: "https://docs.google.com/forms/d/e/1FAIpQLSekcnkvm28ePkxhL0tGtDDtIas3uVhr4mwiGdcKnwTn_W2qvw/viewform?usp=publish-editor",
  email: ""
};
const CONTACT_CONFIG = {
  url: "",
  email: "Anestha.contact@gmail.com"
};
const SUPPORT_CONFIG = {
  tossUrl: "",
  kofiUrl: ""
};

let currentLanguage = "ko";

function t(key, replacements) {
  const dictionary = TRANSLATIONS[currentLanguage] || TRANSLATIONS.ko;
  const fallbackDictionary = TRANSLATIONS.ko;
  let template = dictionary[key] || fallbackDictionary[key] || key;

  if (!replacements) {
    return template;
  }

  Object.keys(replacements).forEach(function (token) {
    template = template.replace(new RegExp(`\\{${token}\\}`, "g"), replacements[token]);
  });

  return template;
}

function loadLanguagePreference() {
  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (savedLanguage === "ko" || savedLanguage === "en") {
    return savedLanguage;
  }

  return "en";
}

function saveLanguagePreference(language) {
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLanguage === "en" ? "en" : "ko";

  document.querySelectorAll("[data-i18n]").forEach(function (element) {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach(function (element) {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });

  if (languageSelect) {
    languageSelect.value = currentLanguage;
  }
}

function buildFeedbackMailto(subject, body) {
  if (!FEEDBACK_CONFIG.email) {
    return "";
  }

  const query = new URLSearchParams({
    subject: subject,
    body: body
  });

  return `mailto:${FEEDBACK_CONFIG.email}?${query.toString()}`;
}

function buildContactMailto() {
  if (!CONTACT_CONFIG.email) {
    return "";
  }

  const query = new URLSearchParams({
    subject: "Anestha inquiry",
    body: "Name:\nInstitution (optional):\nTopic:\nMessage:\n"
  });

  return `mailto:${CONTACT_CONFIG.email}?${query.toString()}`;
}

function resolveFeedbackHref(type) {
  if (type === "general") {
    return FEEDBACK_CONFIG.generalUrl || buildFeedbackMailto(
      "Anestha feedback",
      "Category: General feedback\nCalculator:\nDrug/Feature:\nWhat happened?\nWhat would you like to improve?\n"
    );
  }

  if (type === "reference") {
    return FEEDBACK_CONFIG.referenceUrl || buildFeedbackMailto(
      "Anestha reference issue",
      "Category: Reference issue\nCalculator:\nDrug/Feature:\nCurrent displayed content:\nWhat seems incorrect?\nReference/source:\n"
    );
  }

  return FEEDBACK_CONFIG.bugUrl || buildFeedbackMailto(
    "Anestha bug report",
    "Category: Bug report\nCalculator:\nDevice/Browser:\nWhat happened?\nExpected behavior:\nSteps to reproduce:\n"
  );
}

function resolveContactHref() {
  return CONTACT_CONFIG.url || buildContactMailto() || resolveFeedbackHref("general");
}

function applyActionLink(element, href) {
  if (!element) {
    return;
  }

  if (href) {
    element.href = href;
    element.classList.remove("is-disabled");
    element.setAttribute("aria-disabled", "false");
    return;
  }

  element.href = "#";
  element.classList.add("is-disabled");
  element.setAttribute("aria-disabled", "true");
}

function updateFeedbackLinks() {
  const generalHref = resolveFeedbackHref("general");
  const referenceHref = resolveFeedbackHref("reference");
  const bugHref = resolveFeedbackHref("bug");
  const hasLiveChannel = Boolean(generalHref || referenceHref || bugHref);

  applyActionLink(feedbackGeneralLink, generalHref);
  applyActionLink(feedbackReferenceLink, referenceHref);
  applyActionLink(feedbackBugLink, bugHref);

  if (feedbackStatus) {
    feedbackStatus.textContent = hasLiveChannel
      ? t("feedback_status_configured")
      : t("feedback_status_unconfigured");
    feedbackStatus.classList.toggle("hidden", hasLiveChannel);
  }
}

function updateSupportLinks() {
  const tossHref = SUPPORT_CONFIG.tossUrl || "";
  const kofiHref = SUPPORT_CONFIG.kofiUrl || "";
  const hasLiveChannel = Boolean(tossHref || kofiHref);
  const contactHref = resolveContactHref();
  const contactEmail = CONTACT_CONFIG.email || "";

  if (supportDonateCard) {
    supportDonateCard.classList.toggle("hidden", !hasLiveChannel);
  }

  applyActionLink(supportTossLink, tossHref);
  applyActionLink(supportKofiLink, kofiHref);
  applyActionLink(contactLink, contactHref);

  if (contactEmailRow && contactEmailText) {
    contactEmailText.textContent = contactEmail;
    contactEmailRow.classList.toggle("hidden", !contactEmail);
  }

  if (supportStatus) {
    supportStatus.textContent = hasLiveChannel
      ? t("support_status_configured")
      : t("support_status_unconfigured");
    supportStatus.classList.toggle("hidden", hasLiveChannel);
  }
}

function renderSupportWeightTools() {
  if (
    !supportWeightSexInput ||
    !supportWeightHeightInput ||
    !supportWeightTotalInput ||
    !supportWeightBmi ||
    !supportWeightBsa ||
    !supportWeightIbw ||
    !supportWeightLbw ||
    !supportWeightAdjbw ||
    !supportWeightNote
  ) {
    return;
  }

  const sex = supportWeightSexInput.value;
  const heightCm = Number(supportWeightHeightInput.value);
  const totalWeightKg = Number(supportWeightTotalInput.value);
  const metrics = calculateBodyWeightMetrics(sex, heightCm, totalWeightKg);

  if (!metrics) {
    supportWeightBmi.textContent = "-";
    supportWeightBsa.textContent = "-";
    supportWeightIbw.textContent = "-";
    supportWeightLbw.textContent = "-";
    supportWeightAdjbw.textContent = "-";
    supportWeightNote.textContent = t("weight_tools_note_default");
    return;
  }

  supportWeightBmi.textContent = `${formatNumber(metrics.bmi, 2)} kg/m²`;
  supportWeightBsa.textContent = `${formatNumber(metrics.bsaMosteller, 2)} m²`;
  supportWeightIbw.textContent = `${formatNumber(metrics.ibw, 1)} kg`;
  supportWeightLbw.textContent = `${formatNumber(metrics.lbw, 1)} kg`;
  supportWeightAdjbw.textContent = `${formatNumber(metrics.adjbw, 1)} kg`;
  supportWeightNote.textContent = metrics.usesAdjustedBodyWeight
    ? t("weight_tools_note_ready")
    : t("weight_tools_note_non_obese");
}

function handleSupportWeightInputChange() {
  renderSupportWeightTools();
}

// -----------------------------
// Calculation engine
// -----------------------------

function getSelectedNitroglycerinDoseView() {
  return sanitizeNitroglycerinDoseUnitView(
    nitroglycerinDoseViewSelect ? nitroglycerinDoseViewSelect.value : "mcg/min"
  );
}

function getPreferredNitroglycerinDoseView() {
  return sanitizeNitroglycerinDoseUnitView(getSingleDrugState().nitroglycerinDoseUnitView);
}

function getWorkspaceNitroglycerinDoseView(card, weightKg) {
  const preferredView = sanitizeNitroglycerinDoseUnitView(card && card.nitroglycerinDoseUnitView);

  if (preferredView === "mcg/kg/min" && !isPositiveNumber(weightKg)) {
    return "mcg/min";
  }

  return preferredView;
}

function getDisplayDoseUnit(drug, weightKg, preferredView) {
  if (!isNitroglycerinDrug(drug)) {
    return (drug && drug.referenceRange && drug.referenceRange.unit) || "mcg/kg/min";
  }

  return sanitizeNitroglycerinDoseUnitView(preferredView || getPreferredNitroglycerinDoseView());
}

function convertDoseValueForDisplay(value, drug, weightKg, displayUnit) {
  if (!isNitroglycerinDrug(drug) || displayUnit !== "mcg/kg/min" || !isPositiveNumber(weightKg)) {
    return value;
  }

  return value / weightKg;
}

function convertDoseValueToReferenceUnit(value, drug, weightKg, displayUnit) {
  if (!isNitroglycerinDrug(drug) || displayUnit !== "mcg/kg/min" || !isPositiveNumber(weightKg)) {
    return value;
  }

  return value * weightKg;
}

function convertDoseListForDisplay(values, drug, weightKg, displayUnit) {
  return values.map(function (value) {
    return convertDoseValueForDisplay(value, drug, weightKg, displayUnit);
  });
}

function convertDoseListToReferenceUnit(values, drug, weightKg, displayUnit) {
  return values.map(function (value) {
    return convertDoseValueToReferenceUnit(value, drug, weightKg, displayUnit);
  });
}

function formatDoseValueWithEquivalent(value, unit) {
  if (unit === "mcg/kg/hr") {
    return `${formatNumber(value, 3)} ${unit} (${formatNumber(value / 1000, 3)} mg/kg/hr)`;
  }

  return `${formatNumber(value, 3)} ${unit}`;
}

function formatDoseRangeWithEquivalent(min, max, unit) {
  if (unit === "mcg/kg/hr") {
    return `${formatNumber(min, 3)} - ${formatNumber(max, 3)} ${unit} (${formatNumber(min / 1000, 3)} - ${formatNumber(max / 1000, 3)} mg/kg/hr)`;
  }

  return `${formatNumber(min, 3)} - ${formatNumber(max, 3)} ${unit}`;
}

function formatInfusionDoseDisplay(value, unit, drug, weightKg) {
  const baseText = formatDoseValueWithEquivalent(value, unit);

  if (
    drug &&
    drug.id === "nitroglycerin" &&
    unit === "mcg/kg/min" &&
    isPositiveNumber(weightKg)
  ) {
    return `${baseText} (${formatNumber(value * weightKg, 3)} mcg/min)`;
  }

  if (
    drug &&
    drug.id === "nitroglycerin" &&
    unit === "mcg/min" &&
    isPositiveNumber(weightKg)
  ) {
    return `${baseText} (${formatNumber(value / weightKg, 3)} mcg/kg/min)`;
  }

  return baseText;
}

function formatInfusionRangeDisplay(min, max, unit, drug, weightKg) {
  const baseText = formatDoseRangeWithEquivalent(min, max, unit);

  if (
    drug &&
    drug.id === "nitroglycerin" &&
    unit === "mcg/kg/min" &&
    isPositiveNumber(weightKg)
  ) {
    return `${baseText} (${formatNumber(min * weightKg, 3)} - ${formatNumber(max * weightKg, 3)} mcg/min)`;
  }

  if (
    drug &&
    drug.id === "nitroglycerin" &&
    unit === "mcg/min" &&
    isPositiveNumber(weightKg)
  ) {
    return `${baseText} (${formatNumber(min / weightKg, 3)} - ${formatNumber(max / weightKg, 3)} mcg/kg/min)`;
  }

  return baseText;
}

function formatEditableDoseValue(value) {
  return Number(Number(value).toFixed(3)).toString();
}

function formatEditableDoseList(values) {
  return values.map(function (value) {
    return formatEditableDoseValue(value);
  }).join(", ");
}

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

const SUPRAGLOTTIC_DEVICE_GUIDES = {
  "i-gel": {
    label: "i-gel",
    sourceLabel: "Intersurgical weight guide",
    sizes: [
      { size: "1", minWeight: 2, maxWeight: 5 },
      { size: "1.5", minWeight: 5, maxWeight: 12 },
      { size: "2", minWeight: 10, maxWeight: 25 },
      { size: "2.5", minWeight: 25, maxWeight: 35 },
      { size: "3", minWeight: 30, maxWeight: 60 }
    ]
  },
  "lma-supreme": {
    label: "LMA Supreme",
    sourceLabel: "Teleflex weight guide",
    sizes: [
      { size: "1", minWeight: 0, maxWeight: 5 },
      { size: "1.5", minWeight: 5, maxWeight: 10 },
      { size: "2", minWeight: 10, maxWeight: 20 },
      { size: "2.5", minWeight: 20, maxWeight: 30 },
      { size: "3", minWeight: 30, maxWeight: 50 }
    ]
  }
};

const ORAL_AIRWAY_GUIDE = [
  { minWeight: 0, maxWeight: 5, minAge: 0, maxAge: 0.5, size: "000", length: "40 mm", label: "Neonate / small infant" },
  { minWeight: 5, maxWeight: 10, minAge: 0.5, maxAge: 1.5, size: "0", length: "50 mm", label: "Infant" },
  { minWeight: 10, maxWeight: 20, minAge: 1.5, maxAge: 5, size: "1", length: "60 mm", label: "Toddler / preschool" },
  { minWeight: 20, maxWeight: 35, minAge: 5, maxAge: 9, size: "2", length: "70 mm", label: "School-age child" },
  { minWeight: 35, maxWeight: 50, minAge: 9, maxAge: 13, size: "3", length: "80 mm", label: "Older child" },
  { minWeight: 50, maxWeight: 999, minAge: 13, maxAge: 99, size: "4", length: "90 mm", label: "Adolescent" }
];

const LARYNGOSCOPE_GUIDE = [
  {
    minWeight: 0,
    maxWeight: 5,
    minAge: 0,
    maxAge: 0.25,
    primaryBlade: "Miller 0",
    secondaryBlade: "Miller 1 if needed",
    label: "Neonate / small infant"
  },
  {
    minWeight: 5,
    maxWeight: 10,
    minAge: 0.25,
    maxAge: 2,
    primaryBlade: "Miller 1",
    secondaryBlade: "Miller 0-1 depending on anatomy",
    label: "Infant / toddler"
  },
  {
    minWeight: 10,
    maxWeight: 20,
    minAge: 2,
    maxAge: 6,
    primaryBlade: "Miller 2 or Macintosh 2",
    secondaryBlade: "Choose straight vs curved by anatomy and operator preference",
    label: "Young child"
  },
  {
    minWeight: 20,
    maxWeight: 40,
    minAge: 6,
    maxAge: 12,
    primaryBlade: "Macintosh 2",
    secondaryBlade: "Macintosh 3 for larger child",
    label: "School-age child"
  },
  {
    minWeight: 40,
    maxWeight: 999,
    minAge: 12,
    maxAge: 99,
    primaryBlade: "Macintosh 3",
    secondaryBlade: "Macintosh 2-3 depending on size and anatomy",
    label: "Adolescent"
  }
];

const NASAL_AIRWAY_GUIDE = [
  { minAge: 0, maxAge: 1, minWeight: 0, maxWeight: 10, insertionDepth: "7.0-8.5 cm", label: "First year of life" },
  { minAge: 1, maxAge: 2, minWeight: 8, maxWeight: 15, insertionDepth: "8.0-10.0 cm", label: "Second year of life" }
];

const FACE_MASK_GUIDE = [
  { minWeight: 0, maxWeight: 5, minAge: 0, maxAge: 0.5, size: "0-1", label: "Neonate / small infant" },
  { minWeight: 5, maxWeight: 10, minAge: 0.5, maxAge: 1.5, size: "1", label: "Infant" },
  { minWeight: 10, maxWeight: 20, minAge: 1.5, maxAge: 5, size: "2", label: "Toddler / preschool child" },
  { minWeight: 20, maxWeight: 35, minAge: 5, maxAge: 10, size: "3", label: "School-age child" },
  { minWeight: 35, maxWeight: 60, minAge: 10, maxAge: 18, size: "4", label: "Older child / adolescent" }
];

const DANTROLENE_FORMULATIONS = [
  {
    id: "standard-20mg",
    name: "Standard 20 mg vial",
    vialStrengthMg: 20,
    defaultInitialDoseMgKg: 2.5,
    cumulativeMaxMgKg: 10,
    reconstitution: "Reconstitute each 20 mg vial with 60 mL sterile water before use.",
    notes: "Traditional formulation; many vials may be required during MH treatment.",
    references: ["dantrolene_standard_dailymed", "mhaus_dantrolene"]
  },
  {
    id: "ryanodex-250mg",
    name: "RYANODEX 250 mg vial",
    vialStrengthMg: 250,
    defaultInitialDoseMgKg: 2.5,
    cumulativeMaxMgKg: 10,
    reconstitution: "Reconstitute each 250 mg vial with 5 mL sterile water before use.",
    notes: "Concentrated formulation; fewer vials may be needed for the same target dose.",
    references: ["dantrolene_ryanodex_fda", "mhaus_dantrolene"]
  }
];

function getSupraglotticDeviceRecommendation(deviceId, weightKg) {
  const guide = SUPRAGLOTTIC_DEVICE_GUIDES[deviceId];

  if (!guide || !isPositiveNumber(weightKg)) {
    return null;
  }

  const matchingSize = guide.sizes.find(function (sizeItem) {
    return weightKg >= sizeItem.minWeight && weightKg <= sizeItem.maxWeight;
  });

  return matchingSize
    ? {
      deviceLabel: guide.label,
      sourceLabel: guide.sourceLabel,
      size: matchingSize.size,
      weightRange: `${matchingSize.minWeight}-${matchingSize.maxWeight} kg`
    }
    : {
      deviceLabel: guide.label,
      sourceLabel: guide.sourceLabel,
      size: "Out of listed range",
      weightRange: "Verify manufacturer guidance"
    };
}

function getReferenceItems(referenceIds) {
  return referenceIds.map(function (referenceId) {
    return REFERENCE_REGISTRY[referenceId];
  }).filter(Boolean);
}

function getReferenceType(item) {
  if (!item) {
    return "";
  }

  if (item.referenceType) {
    return item.referenceType;
  }

  if (item.source === "AHA" || /algorithm|guideline/i.test(item.title)) {
    return "guideline";
  }

  if (item.source === "DailyMed" || item.source === "FDA" || /label dose/i.test(item.title)) {
    return "label";
  }

  if (item.source === "PubMed" || /study|meta-analysis/i.test(item.title)) {
    return "study";
  }

  if (item.source === "OpenAnesthesia" || /clinical|context|dosing/i.test(item.title)) {
    return "clinical";
  }

  return "";
}

function getReferenceTypeBadge(type) {
  if (type === "guideline") {
    return '<span class="reference-badge is-guideline">Guideline</span>';
  }

  if (type === "label") {
    return '<span class="reference-badge is-label">Label</span>';
  }

  if (type === "clinical") {
    return '<span class="reference-badge is-clinical">Clinical</span>';
  }

  if (type === "study") {
    return '<span class="reference-badge is-study">Study-specific</span>';
  }

  return "";
}

function getUseCaseBadge(useCase) {
  if (useCase === "ga-induction") {
    return '<span class="reference-badge is-use-case-induction">GA induction</span>';
  }

  if (useCase === "ga-maintenance") {
    return '<span class="reference-badge is-use-case-maintenance">GA maintenance</span>';
  }

  if (useCase === "procedural-sedation") {
    return '<span class="reference-badge is-use-case-sedation">Procedural sedation</span>';
  }

  if (useCase === "vasopressor-support") {
    return '<span class="reference-badge is-use-case-support">Hemodynamic support</span>';
  }

  return "";
}

function getRangeSourceType(drug) {
  return drug && drug.rangeSourceType ? drug.rangeSourceType : "";
}

function renderRangeSourceBadge(container, drug) {
  if (!container) {
    return;
  }

  container.innerHTML = getReferenceTypeBadge(getRangeSourceType(drug));
}

function applyRangeSourceTheme(element, drug) {
  if (!element) {
    return;
  }

  element.classList.remove("has-range-label", "has-range-clinical", "has-range-study");

  const type = getRangeSourceType(drug);
  if (type) {
    element.classList.add(`has-range-${type}`);
  }
}

function getDrugUseCaseSummary(drug) {
  if (!drug || !drug.useCaseLabel) {
    return "Not specified";
  }

  return drug.useCaseLabel;
}

function getDisplaySourceLabel(rawSource) {
  const source = (rawSource || "").trim();

  if (!source) {
    return "-";
  }

  if (source === "Editable local preset") {
    return currentLanguage === "en" ? "Literature-based summary value" : "문헌 기반 요약값";
  }

  return source;
}

function extractReferenceYears(text) {
  if (typeof text !== "string" || !text.trim()) {
    return [];
  }

  const matches = text.match(/\b(19|20)\d{2}\b/g);
  return matches ? Array.from(new Set(matches)) : [];
}

function getReferenceSourceYear(item) {
  if (!item) {
    return "";
  }

  if (item.sourceYear) {
    return String(item.sourceYear);
  }

  const candidateYears = [
    ...extractReferenceYears(item.title),
    ...extractReferenceYears(item.url)
  ];

  return candidateYears.length ? candidateYears[0] : "";
}

function getReferenceMetaText(item) {
  if (!item) {
    return "";
  }

  const sourceLine = item.source
    ? `<span class="reference-summary-meta-line reference-summary-meta-source">${item.source}</span>`
    : "";
  const secondaryParts = [];
  const sourceYear = getReferenceSourceYear(item);

  if (sourceYear) {
    secondaryParts.push(`${t("source_year")}: ${sourceYear}`);
  }

  if (item.lastReviewed) {
    secondaryParts.push(`${t("last_reviewed")}: ${item.lastReviewed}`);
  }

  const secondaryLine = secondaryParts.length
    ? `<span class="reference-summary-meta-line reference-summary-meta-secondary">${secondaryParts.join(" · ")}</span>`
    : "";

  return `${sourceLine}${secondaryLine}`;
}

function getReferenceDisclaimer(item) {
  const type = getReferenceType(item);
  const isEnglish = currentLanguage === "en";

  if (type === "label") {
    return isEnglish
      ? "Label references reflect approved prescribing information. Confirm concentration, indication, and local protocol before use."
      : "Label reference는 허가사항 기반 자료입니다. 실제 사용 전 농도, 적응증, 기관 프로토콜을 함께 확인하세요.";
  }

  if (type === "guideline") {
    return isEnglish
      ? "Guideline references summarize official algorithm or society recommendations, but they still require patient-specific interpretation and protocol alignment."
      : "Guideline reference는 공식 algorithm 또는 학회 권고를 요약한 자료이지만, 실제 적용에는 환자 상태와 기관 프로토콜을 함께 반영해야 합니다.";
  }

  if (type === "study") {
    return isEnglish
      ? "Study-specific references describe selected protocols or research settings and should not be treated as universal dosing standards."
      : "Study-specific reference는 특정 연구 프로토콜 또는 제한된 연구 환경을 반영하므로, 절대적 표준 용법으로 해석하면 안 됩니다.";
  }

  return isEnglish
    ? "Clinical references describe common practice patterns or selected educational summaries and should be checked against the original source and local protocol."
    : "Clinical reference는 관행적 사용이나 교육용 요약을 반영하므로, 원문과 기관 프로토콜을 함께 확인해야 합니다.";
}

function getReferenceDetailMetadataMarkup(item) {
  const detailRows = [];

  if (item.referenceContext) {
    detailRows.push(`<p class="reference-detail-meta"><strong>${t("reference_context")}:</strong> ${item.referenceContext}</p>`);
  }

  if (item.checkSection) {
    detailRows.push(`<p class="reference-detail-meta"><strong>${t("reference_check_section")}:</strong> ${item.checkSection}</p>`);
  }

  if (!detailRows.length) {
    return "";
  }

  return `<div class="reference-detail-grid">${detailRows.join("")}</div>`;
}

function renderUseCaseBadge(container, drug) {
  if (!container) {
    return;
  }

  container.innerHTML = getUseCaseBadge(drug && drug.useCase ? drug.useCase : "");
}

function getRangeSourceSummary(drug) {
  if (!drug || !drug.rangeSourceType) {
    return "Not specified";
  }

  if (drug.rangeSourceType === "label") {
    return drug.rangeSourceNote || "Derived from product labeling and intended label-based dosing context.";
  }

  if (drug.rangeSourceType === "clinical") {
    return drug.rangeSourceNote || "Derived from clinical or perioperative practice references rather than a single package insert range.";
  }

  if (drug.rangeSourceType === "study") {
    return drug.rangeSourceNote || "Derived from a specific study context and not intended as a universal range.";
  }

  return drug.rangeSourceNote || "Not specified";
}

function getRangeRationale(drug) {
  return drug && drug.rangeRationale
    ? drug.rangeRationale
    : "Verify against the original source, local protocol, and patient-specific context before use.";
}

function renderReferenceList(container, referenceIds) {
  if (!container) {
    return;
  }

  const referenceItems = getReferenceItems(referenceIds);

  if (!referenceItems.length) {
    container.innerHTML = '<li>No references attached yet.</li>';
    return;
  }

  container.innerHTML = referenceItems.map(function (item) {
    const badgeStr = getReferenceTypeBadge(getReferenceType(item));
    const metaText = getReferenceMetaText(item);
    const detailMetadataMarkup = getReferenceDetailMetadataMarkup(item);
    const hasExpandedDetail = Boolean(item.usageNote || detailMetadataMarkup);

    if (hasExpandedDetail) {
      return `<li class="reference-item">
                <details class="reference-details">
                  <summary class="reference-summary">
                    <span class="reference-summary-title-row">
                      <span class="reference-summary-title">${item.title}</span>
                      ${badgeStr}
                    </span>
                    <span class="reference-summary-meta">${metaText}</span>
                  </summary>
                  <div class="reference-detail-body">
                    ${detailMetadataMarkup}
                    ${item.usageNote ? `<p class="reference-usage-note"><strong>${t("usage_note")}:</strong> ${item.usageNote}</p>` : ""}
                    <p class="reference-disclaimer">${getReferenceDisclaimer(item)}</p>
                    <a class="reference-external-link" href="${item.url}" target="_blank" rel="noreferrer">${item.linkLabel || "Open reference"}</a>
                  </div>
                </details>
              </li>`;
    }

    return `<li class="reference-item">
              <span class="reference-summary-title-row">
                <span class="reference-summary-title">${item.title}</span>
                ${badgeStr}
              </span>
              <span class="reference-summary-meta">${metaText}</span>
              <a class="reference-external-link" href="${item.url}" target="_blank" rel="noreferrer">${item.linkLabel || "Open reference"}</a>
            </li>`;
  }).join("");
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

function findGuideItemByWeightOrAge(guideItems, weightKg, ageYears) {
  if (isPositiveNumber(weightKg)) {
    const weightMatch = guideItems.find(function (item) {
      return weightKg >= item.minWeight && weightKg <= item.maxWeight;
    });

    if (weightMatch) {
      return weightMatch;
    }
  }

  if (isPositiveNumber(ageYears)) {
    return guideItems.find(function (item) {
      return ageYears >= item.minAge && ageYears < item.maxAge;
    }) || null;
  }

  return null;
}

function getOralAirwayRecommendation(weightKg, ageYears) {
  return findGuideItemByWeightOrAge(ORAL_AIRWAY_GUIDE, weightKg, ageYears);
}

function getLaryngoscopeRecommendation(weightKg, ageYears) {
  return findGuideItemByWeightOrAge(LARYNGOSCOPE_GUIDE, weightKg, ageYears);
}

function getNasalAirwayRecommendation(weightKg, ageYears) {
  return findGuideItemByWeightOrAge(NASAL_AIRWAY_GUIDE, weightKg, ageYears);
}

function getFaceMaskRecommendation(weightKg, ageYears) {
  return findGuideItemByWeightOrAge(FACE_MASK_GUIDE, weightKg, ageYears);
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

function getInfusionReferenceIds(values) {
  if (!values || !values.drug || !Array.isArray(values.drug.references)) {
    return [];
  }

  return values.drug.references;
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
// Formatting helpers
// -----------------------------

function createClientId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// -----------------------------
// Drug config layer
// -----------------------------

const PEDIATRIC_EMERGENCY_REFERENCE_IDS = [
  "pediatric_emergency_cardiac_arrest_aha",
  "pediatric_emergency_bradycardia_aha",
  "pediatric_emergency_tachycardia_aha"
];

function getDefaultDrugPreset() {
  return DRUG_PRESETS[0];
}

function getDrugPresetById(drugId) {
  return DRUG_PRESETS.find(function (preset) {
    return preset.id === drugId;
  }) || getDefaultDrugPreset();
}

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

function formatDilutionPreset(dilutionPreset) {
  if (!dilutionPreset) {
    return "Custom / not set";
  }

  return `${dilutionPreset.label} (${formatNumber(dilutionPreset.finalConcentration, 0)} ${dilutionPreset.finalConcentrationUnit})`;
}

function isWithinReferenceRange(value, referenceRange) {
  if (!referenceRange) {
    return true;
  }

  if (!isPositiveNumber(referenceRange.min) || !isPositiveNumber(referenceRange.max)) {
    return true;
  }

  return value >= referenceRange.min && value <= referenceRange.max;
}

function createDefaultDrugSettings() {
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

function getDefaultPediatricDrugPreset() {
  return PEDIATRIC_DRUG_PRESETS[0];
}

function getPediatricDrugPresetById(drugId) {
  if (drugId === "custom") {
    return DEFAULT_CUSTOM_PEDIATRIC_DRUG;
  }

  return PEDIATRIC_DRUG_PRESETS.find(function (preset) {
    return preset.id === drugId;
  }) || getDefaultPediatricDrugPreset();
}

function createDefaultPediatricDrugSettings() {
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

const STORAGE_KEY = "anestha.infusionPump.v1";

function createDefaultSingleDrugState() {
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

function createDefaultInfusionCardState() {
  return {
    cardId: "single-drug-card",
    calculatorType: "infusion-pump",
    patientScope: "independent",
    singleDrug: createDefaultSingleDrugState()
  };
}

function normalizeInfusionCardState(rawState) {
  const source = rawState && typeof rawState === "object" ? rawState : {};

  return {
    cardId: sanitizeString(source.cardId, "single-drug-card"),
    calculatorType: "infusion-pump",
    patientScope: "independent",
    singleDrug: normalizeSingleDrugState(source.singleDrug)
  };
}

function sanitizeString(value, fallback) {
  return typeof value === "string" ? value : fallback;
}

function sanitizeSelectedDrugId(value) {
  if (value === "custom") {
    return "custom";
  }

  return DRUG_PRESETS.some(function (preset) {
    return preset.id === value;
  }) ? value : getDefaultDrugPreset().id;
}

function sanitizeActiveMode(value) {
  const allowedModes = ["dose-to-rate", "rate-to-dose"];
  return allowedModes.includes(value) ? value : "dose-to-rate";
}

function sanitizeInfusionLayoutMode(value) {
  return ["quick", "full"].includes(value) ? value : "quick";
}

function sanitizeWorkspaceLayoutMode(value) {
  if (value === "detail") {
    return "full";
  }

  return ["quick", "full"].includes(value) ? value : "quick";
}

function sanitizeNitroglycerinDoseUnitView(value) {
  return ["mcg/min", "mcg/kg/min"].includes(value) ? value : "mcg/min";
}

function normalizeDrugSetting(rawSetting, defaultSetting) {
  const source = rawSetting && typeof rawSetting === "object" ? rawSetting : {};

  return {
    concentration: sanitizeString(source.concentration, defaultSetting.concentration),
    referenceDoseList: sanitizeString(source.referenceDoseList, defaultSetting.referenceDoseList),
    customDrugName: sanitizeString(source.customDrugName, defaultSetting.customDrugName),
    customDrugNotes: sanitizeString(source.customDrugNotes, defaultSetting.customDrugNotes)
  };
}

function shouldMigrateLegacyRemimazolamValues(drugId) {
  return drugId === "remimazolam-induction" || drugId === "remimazolam-maintenance";
}

function getCanonicalDrugPreset(drugId) {
  return DRUG_PRESETS.find(function (preset) {
    return preset.id === drugId;
  }) || null;
}

function isCloseToCanonicalDoseList(parsedList, canonicalDoseList) {
  if (!Array.isArray(parsedList) || !Array.isArray(canonicalDoseList) || parsedList.length !== canonicalDoseList.length) {
    return false;
  }

  return parsedList.every(function (dose, index) {
    return Math.abs(dose - canonicalDoseList[index]) <= 5;
  });
}

function migrateLegacyRemimazolamReferenceDoseList(drugId, referenceDoseList, fallbackList) {
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

function migrateLegacyRemimazolamTargetDose(drugId, targetDose) {
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

function normalizeSingleDrugState(rawState) {
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

function normalizeQuickDrugIds(rawIds) {
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

function createDefaultPersistedState() {
  return {
    singleDrug: createDefaultSingleDrugState(),
    pediatricDose: createDefaultPediatricDoseState(),
    dantroleneQuick: createDefaultDantroleneQuickState(),
    infusionWorkspace: createDefaultInfusionWorkspaceState(),
    infusionTemplates: []
  };
}

function createDefaultPediatricDoseState() {
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

function createDefaultDantroleneQuickState() {
  return {
    inputs: {
      weight: "",
      formulationId: DANTROLENE_FORMULATIONS[0].id,
      initialDoseMgKg: String(DANTROLENE_FORMULATIONS[0].defaultInitialDoseMgKg)
    }
  };
}

function createDefaultInfusionWorkspaceCardState(drugId) {
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

function createDefaultInfusionWorkspaceState() {
  return {
    activeView: "single-drug",
    viewMode: "quick",
    sharedWeight: "",
    selectedTemplateId: "",
    cards: [createDefaultInfusionWorkspaceCardState()]
  };
}

function createInfusionTemplateState(name, note, cards, existingTemplateId) {
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

function normalizePersistedState(rawState) {
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

function normalizeInfusionWorkspaceCardState(rawCard) {
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

function normalizeInfusionWorkspaceState(rawState) {
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

function normalizeInfusionTemplate(rawTemplate) {
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

function normalizeInfusionTemplates(rawTemplates) {
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

function normalizeDantroleneQuickState(rawState) {
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

function sanitizePediatricSelectedDrugId(value) {
  if (value === "custom") {
    return "custom";
  }

  return PEDIATRIC_DRUG_PRESETS.some(function (preset) {
    return preset.id === value;
  }) ? value : getDefaultPediatricDrugPreset().id;
}

function sanitizePediatricActiveMode(value) {
  return ["dosing", "airway", "emergency"].includes(value) ? value : "dosing";
}

function normalizePediatricDrugSetting(rawSetting, defaultSetting) {
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

function normalizePediatricDoseState(rawState) {
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

function normalizeSavedCustomPediatricDrug(rawDrug) {
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

function normalizeSavedCustomPediatricDrugs(rawDrugs) {
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

function loadPersistedState() {
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

function savePersistedState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizePersistedState(state)));
  } catch (error) {
    // Keep the app usable if storage is unavailable.
  }
}

// -----------------------------
// View state layer
// -----------------------------

let persistedState = loadPersistedState();

function getSingleDrugState() {
  return persistedState.singleDrug;
}

function getPediatricDoseState() {
  return persistedState.pediatricDose;
}

function getDantroleneQuickState() {
  return persistedState.dantroleneQuick;
}

function getInfusionWorkspaceState() {
  return persistedState.infusionWorkspace;
}

function getInfusionTemplates() {
  return persistedState.infusionTemplates || [];
}

function getSavedCustomPediatricDrugs() {
  return getPediatricDoseState().savedCustomDrugs || [];
}

function getActiveSavedCustomPediatricDrugId() {
  return getPediatricDoseState().activeSavedCustomDrugId || "";
}

function getSavedCustomOptionValue(savedDrugId) {
  return `saved:${savedDrugId}`;
}

function getSavedCustomDrugIdFromOptionValue(optionValue) {
  return typeof optionValue === "string" && optionValue.startsWith("saved:")
    ? optionValue.slice(6)
    : "";
}

function isCustomPediatricSelection(optionValue) {
  return optionValue === "custom" || getSavedCustomDrugIdFromOptionValue(optionValue) !== "";
}

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

function getPediatricSelectValueFromState(pediatricDoseState) {
  const normalizedState = normalizePediatricDoseState(pediatricDoseState);
  return normalizedState.selectedDrugId === "custom" && normalizedState.activeSavedCustomDrugId
    ? getSavedCustomOptionValue(normalizedState.activeSavedCustomDrugId)
    : normalizedState.selectedDrugId;
}

function getActivePediatricMode() {
  const selectedTab = document.querySelector("[data-pediatric-mode-tab].is-active");
  return selectedTab ? selectedTab.dataset.pediatricModeTab : "dosing";
}

function updateSingleDrugState(patch) {
  persistedState.singleDrug = normalizeSingleDrugState({
    ...getSingleDrugState(),
    ...patch
  });
  savePersistedState(persistedState);
}

function updatePediatricDoseState(patch) {
  persistedState.pediatricDose = normalizePediatricDoseState({
    ...getPediatricDoseState(),
    ...patch
  });
  savePersistedState(persistedState);
}

function updateDantroleneQuickState(patch) {
  persistedState.dantroleneQuick = normalizeDantroleneQuickState({
    ...getDantroleneQuickState(),
    ...patch
  });
  savePersistedState(persistedState);
}

function updateInfusionWorkspaceState(patch) {
  persistedState.infusionWorkspace = normalizeInfusionWorkspaceState({
    ...getInfusionWorkspaceState(),
    ...patch
  });
  savePersistedState(persistedState);
}

function updateInfusionTemplates(templates) {
  persistedState.infusionTemplates = normalizeInfusionTemplates(templates);
  savePersistedState(persistedState);
}

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

function getFavoriteDrugIds() {
  return getSingleDrugState().favoriteDrugIds || [];
}

function getRecentDrugIds() {
  return getSingleDrugState().recentDrugIds || [];
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

function commitSingleDrugStateFromView() {
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

function applySingleDrugStateToView(singleDrugState) {
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

function updateQuickDrugUI() {
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

function applyPediatricDoseStateToView(pediatricDoseState) {
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

function applyDantroleneQuickStateToView(dantroleneQuickState) {
  const normalizedState = normalizeDantroleneQuickState(dantroleneQuickState);

  dantroleneInputs.weight.value = normalizedState.inputs.weight;
  dantroleneInputs.formulation.value = normalizedState.inputs.formulationId;
  dantroleneInputs.initialDose.value = normalizedState.inputs.initialDoseMgKg;
}

function activateCalculator(calculatorId) {
  calculatorTabs.forEach(function (tab) {
    const isActive = tab.dataset.calculatorTab === calculatorId;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  calculatorViews.forEach(function (view) {
    const isActive = view.dataset.calculatorView === calculatorId;
    view.classList.toggle("hidden", !isActive);
  });
}

function activateInfusionMode(modeId) {
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

function activateInfusionView(viewId) {
  const normalizedViewId = ["single-drug", "workspace"].includes(viewId) ? viewId : "single-drug";

  infusionViewTabs.forEach(function (tab) {
    const isActive = tab.dataset.infusionViewTab === normalizedViewId;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  infusionViewPanels.forEach(function (panel) {
    const isActive = panel.dataset.infusionViewPanel === normalizedViewId;
    panel.classList.toggle("hidden", !isActive);
  });

  updateInfusionWorkspaceState({
    activeView: normalizedViewId
  });
}

function syncWorkspaceLayoutUi(modeId) {
  const normalizedModeId = sanitizeWorkspaceLayoutMode(modeId);
  const isQuickMode = normalizedModeId === "quick";

  workspaceLayoutTabs.forEach(function (tab) {
    const isActive = tab.dataset.workspaceLayoutTab === normalizedModeId;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  if (infusionWorkspacePanel) {
    infusionWorkspacePanel.classList.toggle("is-quick-mode", isQuickMode);
    infusionWorkspacePanel.classList.toggle("is-full-mode", !isQuickMode);
  }

  if (workspaceQuickModeHint) {
    workspaceQuickModeHint.classList.add("hidden");
  }

  if (workspaceTemplateDisclosure) {
    if (isQuickMode) {
      workspaceTemplateDisclosure.classList.add("hidden");
      workspaceTemplateDisclosure.removeAttribute("open");
    } else {
      workspaceTemplateDisclosure.classList.remove("hidden");
      workspaceTemplateDisclosure.setAttribute("open", "open");
    }
  }

  if (workspaceHelp) {
    workspaceHelp.classList.toggle("hidden", !isQuickMode);
  }
}

function activateWorkspaceLayoutMode(modeId, options) {
  const normalizedModeId = sanitizeWorkspaceLayoutMode(modeId);
  const shouldPersist = !options || options.persist !== false;
  const shouldRender = !options || options.render !== false;

  syncWorkspaceLayoutUi(normalizedModeId);

  if (shouldPersist) {
    updateInfusionWorkspaceState({
      viewMode: normalizedModeId
    });
  }

  if (shouldRender) {
    renderInfusionWorkspace();
  }
}

function activateDilutionMode(modeId) {
  dilutionInputs.modeTabs.forEach(function (tab) {
    const isActive = tab.dataset.dilutionModeTab === modeId;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  dilutionInputs.modePanels.forEach(function (panel) {
    const isActive = panel.dataset.dilutionModePanel === modeId;
    panel.classList.toggle("hidden", !isActive);
  });
  
  dilutionInputs.errorMessage.textContent = "";
  dilutionInputs.resultCard.classList.add("hidden");
}

function activatePediatricMode(modeId) {
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

function updateDrugUI() {
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

function updatePediatricDrugUI() {
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

function cloneWorkspaceCards(cards) {
  return cards.map(function (card) {
    return normalizeInfusionWorkspaceCardState({
      ...card,
      cardId: createClientId("workspace-card")
    });
  });
}

function getInfusionDrugCategory(drugId) {
  if (["norepinephrine", "epinephrine", "phenylephrine", "vasopressin", "dopamine"].includes(drugId)) {
    return {
      key: "vasopressor",
      label: "Vasopressor"
    };
  }

  if (["dobutamine", "milrinone", "isoproterenol"].includes(drugId)) {
    return {
      key: "inotrope",
      label: "Inotrope"
    };
  }

  if (["nitroglycerin", "nicardipine"].includes(drugId)) {
    return {
      key: "vasodilator",
      label: "Vasodilator"
    };
  }

  return {
    key: "other",
    label: "Infusion"
  };
}

function renderInfusionWorkspace() {
  const workspaceState = normalizeInfusionWorkspaceState(getInfusionWorkspaceState());
  const templates = getInfusionTemplates();
  const workspaceLayoutMode = sanitizeWorkspaceLayoutMode(workspaceState.viewMode);
  const isQuickWorkspaceMode = workspaceLayoutMode === "quick";
  const sharedWeight = Number(workspaceState.sharedWeight);
  const hasReachedWorkspaceCardLimit = workspaceState.cards.length >= 6;

  syncWorkspaceLayoutUi(workspaceLayoutMode);
  workspaceSharedWeightInput.value = workspaceState.sharedWeight;
  workspaceTemplateNameInput.value = "";
  workspaceTemplateNoteInput.value = "";
  workspaceTemplateSelect.innerHTML = templates.length
    ? `<option value="">${t("workspace_select_template")}</option>${templates.map(function (template) {
      return `<option value="${template.id}" ${template.id === workspaceState.selectedTemplateId ? "selected" : ""}>${template.name}</option>`;
    }).join("")}`
    : `<option value="">${t("no_saved_templates")}</option>`;
  workspaceLoadTemplateButton.disabled = !templates.length || !workspaceState.selectedTemplateId;
  workspaceDeleteTemplateButton.disabled = !templates.length || !workspaceState.selectedTemplateId;
  workspaceAddCardButton.disabled = hasReachedWorkspaceCardLimit;
  workspaceAddCardButton.title = hasReachedWorkspaceCardLimit
    ? t("workspace_limit_title")
    : t("workspace_add_card_title");
  workspaceHelp.textContent = isPositiveNumber(sharedWeight)
    ? t("workspace_current_shared_weight", {
      weight: formatNumber(sharedWeight, 1)
    })
    : t("workspace_help");

  if (workspaceState.selectedTemplateId) {
    const selectedTemplate = templates.find(function (template) {
      return template.id === workspaceState.selectedTemplateId;
    });

    if (selectedTemplate) {
      workspaceTemplateNameInput.value = selectedTemplate.name;
      workspaceTemplateNoteInput.value = selectedTemplate.note;
      
      let helpText = t("workspace_loaded_template", {
        name: selectedTemplate.name
      });
      if (selectedTemplate.note) {
        helpText += t("workspace_loaded_template_note", {
          note: selectedTemplate.note
        });
      }
      workspaceHelp.textContent = `${workspaceHelp.textContent} ${helpText}`;
    }
  }

  if (hasReachedWorkspaceCardLimit) {
    workspaceHelp.textContent = `${workspaceHelp.textContent} ${t("workspace_limit_help")}`;
  }

  workspaceCardList.innerHTML = workspaceState.cards.map(function (card, index) {
    const preset = getDrugPresetById(card.selectedDrugId);
    const drugCategory = getInfusionDrugCategory(card.selectedDrugId);
    const rangeBadge = getReferenceTypeBadge(getRangeSourceType(preset));
    const useCaseBadge = getUseCaseBadge(preset.useCase);
    const concentration = Number(card.concentration);
    const targetDose = Number(card.targetDose);
    const displayDoseUnit = getDisplayDoseUnit(
      preset,
      sharedWeight,
      getWorkspaceNitroglycerinDoseView(card, sharedWeight)
    );
    const displayTargetDose = convertDoseValueForDisplay(targetDose, preset, sharedWeight, displayDoseUnit);
    const displayRangeMin = convertDoseValueForDisplay(preset.referenceRange.min, preset, sharedWeight, displayDoseUnit);
    const displayRangeMax = convertDoseValueForDisplay(preset.referenceRange.max, preset, sharedWeight, displayDoseUnit);
    const targetDoseInputValue = card.targetDose === ""
      ? ""
      : (Number.isFinite(targetDose) ? formatEditableDoseValue(displayTargetDose) : card.targetDose);
    const usesWeight = isWeightBasedReferenceRange(preset.referenceRange);
    const hasReadyCalculation = (usesWeight ? isPositiveNumber(sharedWeight) : true) && isPositiveNumber(concentration) && isPositiveNumber(targetDose);
    const targetRate = hasReadyCalculation ? doseToRate(sharedWeight, concentration, targetDose, preset.referenceRange) : null;
    const isOutOfRange = hasReadyCalculation && !isWithinReferenceRange(targetDose, preset.referenceRange);
    const dilutionPreset = preset.dilutionPresets[0] || null;
    const showNitroglycerinUnitView = isNitroglycerinDrug(preset);
    const concentrationStep = getAdaptiveQuickStep(
      isPositiveNumber(concentration) ? concentration : Number(preset.concentration) || 1
    );
    const doseStep = getAdaptiveQuickStep(
      isPositiveNumber(displayTargetDose)
        ? displayTargetDose
        : (isPositiveNumber(displayRangeMin) ? displayRangeMin : 0.1)
    );
    const optionMarkup = DRUG_PRESETS.map(function (drugPreset) {
      return `<option value="${drugPreset.id}" ${drugPreset.id === card.selectedDrugId ? "selected" : ""}>${drugPreset.name}</option>`;
    }).join("");

	    return `
	      <article class="workspace-card is-${drugCategory.key} ${isQuickWorkspaceMode ? "is-quick" : "is-full"}" data-workspace-card-id="${card.cardId}">
	        <div class="workspace-card-header">
	          <div class="workspace-card-header-main">
	            <h3 class="workspace-card-title">${index + 1}. ${preset.name}</h3>
	            ${isQuickWorkspaceMode ? "" : `<p class="workspace-card-meta">${formatNumber(concentration, 1)} ${preset.concentrationUnit} / ${getDisplaySourceLabel(preset.metadata.source)} / Last reviewed ${preset.metadata.lastReviewed}</p>`}
	            <div class="workspace-card-tag-row">
	              <span class="workspace-card-tag is-${drugCategory.key}">${drugCategory.label}</span>
	              ${useCaseBadge}
	              ${rangeBadge}
	            </div>
	          </div>
	          <div class="quick-drug-list workspace-card-header-actions">
	            <button
	              type="button"
	              class="chip-button chip-button-secondary"
              data-move-workspace-card-up="${card.cardId}"
              ${index === 0 ? "disabled" : ""}
            >
              ${t("move_up")}
            </button>
            <button
              type="button"
              class="chip-button chip-button-secondary"
              data-move-workspace-card-down="${card.cardId}"
              ${index === workspaceState.cards.length - 1 ? "disabled" : ""}
            >
              ${t("move_down")}
            </button>
            <button
              type="button"
              class="chip-button chip-button-secondary"
              data-remove-workspace-card-id="${card.cardId}"
              ${workspaceState.cards.length === 1 ? "disabled" : ""}
            >
              ${t("remove")}
	            </button>
	          </div>
	        </div>

	        <div class="form-grid workspace-card-fields ${isQuickWorkspaceMode ? "workspace-card-fields-quick" : ""}">
          <label class="field">
            <span class="field-label">${t("workspace_drug")}</span>
            <div class="select-row">
              <select data-workspace-field="selectedDrugId" data-workspace-card-id="${card.cardId}">
                ${optionMarkup}
              </select>
            </div>
          </label>

          <label class="field">
            <span class="field-label">${t("workspace_concentration")}</span>
            <div class="workspace-input-control-row ${isQuickWorkspaceMode ? "is-inline-stepper" : ""}">
              <div class="input-row">
                <input data-workspace-field="concentration" data-workspace-card-id="${card.cardId}" type="number" inputmode="decimal" step="any" value="${card.concentration}">
                <span class="unit">${preset.concentrationUnit}</span>
              </div>
              ${isQuickWorkspaceMode
                ? `<div class="workspace-stepper-row workspace-stepper-row-inline">
                    <button type="button" class="workspace-stepper-button" data-workspace-step-card-id="${card.cardId}" data-workspace-step-field="concentration" data-workspace-step-direction="-1" data-workspace-step-size="${concentrationStep}" aria-label="${t("decrease_value")}">-</button>
                    <button type="button" class="workspace-stepper-button" data-workspace-step-card-id="${card.cardId}" data-workspace-step-field="concentration" data-workspace-step-direction="1" data-workspace-step-size="${concentrationStep}" aria-label="${t("increase_value")}">+</button>
                  </div>`
                : ""}
            </div>
          </label>

          <label class="field">
            <span class="field-label">${t("workspace_target_dose")}</span>
            <div class="workspace-input-control-row ${isQuickWorkspaceMode ? "is-inline-stepper" : ""}">
              <div class="input-row">
                <input data-workspace-field="targetDose" data-workspace-card-id="${card.cardId}" data-workspace-dose-display-unit="${displayDoseUnit}" type="number" inputmode="decimal" step="any" value="${targetDoseInputValue}">
                ${showNitroglycerinUnitView
                  ? `<select class="unit-select" data-workspace-field="nitroglycerinDoseUnitView" data-workspace-card-id="${card.cardId}">
                      <option value="mcg/min" ${displayDoseUnit === "mcg/min" ? "selected" : ""}>mcg/min</option>
                      <option value="mcg/kg/min" ${displayDoseUnit === "mcg/kg/min" ? "selected" : ""} ${isPositiveNumber(sharedWeight) ? "" : "disabled"}>mcg/kg/min</option>
                    </select>`
                  : `<span class="unit">${displayDoseUnit}</span>`}
              </div>
              ${isQuickWorkspaceMode
                ? `<div class="workspace-stepper-row workspace-stepper-row-inline">
                    <button type="button" class="workspace-stepper-button" data-workspace-step-card-id="${card.cardId}" data-workspace-step-field="targetDose" data-workspace-step-direction="-1" data-workspace-step-size="${doseStep}" data-workspace-dose-display-unit="${displayDoseUnit}" aria-label="${t("decrease_value")}">-</button>
                    <button type="button" class="workspace-stepper-button" data-workspace-step-card-id="${card.cardId}" data-workspace-step-field="targetDose" data-workspace-step-direction="1" data-workspace-step-size="${doseStep}" data-workspace-dose-display-unit="${displayDoseUnit}" aria-label="${t("increase_value")}">+</button>
                  </div>`
                : ""}
            </div>
            ${showNitroglycerinUnitView ? `<p class="helper-text">${isPositiveNumber(sharedWeight) ? t("workspace_ntg_unit_hint") : t("validation_ntg_weight_for_kg_unit")}</p>` : ""}
          </label>
        </div>

        <div class="workspace-card-result ${isOutOfRange ? "is-warning" : ""}">
          <p class="workspace-card-rate ${isOutOfRange ? "is-warning is-out-of-range" : ""}">
            ${hasReadyCalculation ? `${formatNumber(targetRate, 2)} mL/hr` : (usesWeight ? t("workspace_enter_shared_weight") : t("workspace_enter_valid_values"))}
          </p>
          <p class="workspace-card-context">
            ${hasReadyCalculation
              ? t("workspace_target_at_concentration", {
                dose: `<span class="${isOutOfRange ? "is-out-of-range" : ""}">${formatNumber(displayTargetDose, 3)}</span>`,
                unit: displayDoseUnit,
                concentration: formatNumber(concentration, 1),
                concentrationUnit: preset.concentrationUnit
              })
              : t("workspace_reference_range_note", {
                min: formatNumber(displayRangeMin, 3),
                max: formatNumber(displayRangeMax, 3),
                unit: displayDoseUnit,
                sharedWeightNote: ""
              })}
          </p>
          ${isOutOfRange ? `<p class="workspace-card-warning">${t("workspace_out_of_range")}</p>` : ""}
        </div>

        <details class="context-disclosure context-disclosure-compact workspace-card-reference-disclosure">
          <summary class="context-disclosure-summary">${t("view_workspace_range_basis")}</summary>
          <div class="context-disclosure-content">
            <p class="workspace-card-reference-note">
              ${t("workspace_reference_range_note", {
                min: formatNumber(displayRangeMin, 3),
                max: formatNumber(displayRangeMax, 3),
                unit: displayDoseUnit,
                sharedWeightNote: usesWeight ? "" : t("workspace_shared_weight_not_used")
              })}<br>
              ${t("workspace_use_case_note", { useCase: getDrugUseCaseSummary(preset) })}<br>
              ${t("workspace_range_basis_note", { basis: getRangeSourceSummary(preset) })}<br>
              ${t("workspace_rationale_note", { rationale: getRangeRationale(preset) })}<br>
              ${t("workspace_standard_dilution_note", { dilution: formatDilutionPreset(preset.dilutionPresets[0] || null) })}
            </p>
          </div>
	        </details>

	        <div class="quick-drug-actions workspace-card-footer-actions">
	          <button
	            type="button"
	            class="chip-button chip-button-secondary"
            data-apply-workspace-dilution="${card.cardId}"
            ${dilutionPreset ? "" : "disabled"}
            title="${dilutionPreset ? t("workspace_apply_standard_dilution_title") : t("workspace_no_standard_dilution_title")}"
          >
            ${t("workspace_apply_standard_dilution")}
          </button>
        </div>
      </article>
    `;
  }).join("");
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

function maybeRenderLiveInfusionResult(options) {
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

function getAdaptiveQuickStep(value) {
  const absValue = Math.abs(Number(value));

  if (!Number.isFinite(absValue) || absValue === 0) {
    return 0.1;
  }

  if (absValue >= 100) {
    return 10;
  }

  if (absValue >= 20) {
    return 5;
  }

  if (absValue >= 5) {
    return 0.5;
  }

  if (absValue >= 1) {
    return 0.1;
  }

  if (absValue >= 0.2) {
    return 0.05;
  }

  if (absValue >= 0.05) {
    return 0.01;
  }

  return 0.005;
}

function getStepPrecision(stepValue) {
  const stepText = String(stepValue);
  return stepText.includes(".") ? stepText.split(".")[1].length : 0;
}

function clampNumber(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

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

function readDantroleneFormValues() {
  const formulation = DANTROLENE_FORMULATIONS.find(function (item) {
    return item.id === dantroleneInputs.formulation.value;
  }) || DANTROLENE_FORMULATIONS[0];

  return {
    weight: Number(dantroleneInputs.weight.value),
    formulation: formulation,
    initialDoseMgKg: Number(dantroleneInputs.initialDose.value)
  };
}

function validateDantroleneValues(values) {
  if (!isPositiveNumber(values.weight)) {
    return t("validation_patient_weight");
  }

  if (!isPositiveNumber(values.initialDoseMgKg)) {
    return t("validation_initial_dose_target");
  }

  return "";
}

// -----------------------------
// Rendering layer
// -----------------------------

function clearResult() {
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

function clearPediatricResult() {
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

function clearDantroleneResult() {
  dantroleneResultCard.classList.add("hidden");
  dantrolenePrimaryResult.textContent = "0 mg";
  dantroleneSecondaryResult.textContent = "-";
  dantroleneContext.textContent = "";
  dantroleneInitialVials.textContent = "-";
  dantroleneMaxVials.textContent = "-";
  dantroleneVialExplanation.textContent = "";
  dantroleneReconstitutionExplanation.textContent = "";
  dantroleneInitialGuide.textContent = "";
  dantroleneRepeatGuide.textContent = "";
  dantroleneMaintenanceGuide.textContent = "";
  dantroleneReferenceList.innerHTML = "";
  dantroleneResultWarning.textContent = t("dantrolene_result_warning_default");
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

function showDantroleneResult(values) {
  const initialDoseMg = calculateDantroleneDose(values.weight, values.initialDoseMgKg);
  const maxDoseMg = calculateDantroleneDose(values.weight, values.formulation.cumulativeMaxMgKg);
  const initialVials = Math.ceil(initialDoseMg / values.formulation.vialStrengthMg);
  const maxVials = Math.ceil(maxDoseMg / values.formulation.vialStrengthMg);

  dantrolenePrimaryResult.textContent = `${formatNumber(initialDoseMg, 1)} mg`;
  dantroleneSecondaryResult.textContent = `${formatNumber(maxDoseMg, 1)} mg (${values.formulation.cumulativeMaxMgKg} mg/kg)`;
  dantroleneContext.textContent = `${formatNumber(values.weight, 1)} kg / ${values.formulation.name} / target ${formatNumber(values.initialDoseMgKg, 2)} mg/kg`;
  dantroleneInitialVials.textContent = `${initialVials} vial(s)`;
  dantroleneMaxVials.textContent = `${maxVials} vial(s)`;
  dantroleneVialExplanation.textContent = t("dantrolene_vial_explanation", {
    formulation: values.formulation.name,
    initialVials: initialVials,
    maxVials: maxVials
  });
  dantroleneReconstitutionExplanation.textContent = `${values.formulation.reconstitution} ${values.formulation.notes}`;
  dantroleneInitialGuide.textContent = t("dantrolene_initial_guide", {
    dose: formatNumber(values.initialDoseMgKg, 2)
  });
  dantroleneRepeatGuide.textContent = t("dantrolene_repeat_guide");
  dantroleneMaintenanceGuide.textContent = t("dantrolene_maintenance_guide");
  renderReferenceList(dantroleneReferenceList, values.formulation.references);
  dantroleneResultWarning.textContent = t("dantrolene_emergency_reference_only");
  dantroleneResultCard.classList.remove("hidden");
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
  persistedState = normalizePersistedState({
    ...persistedState,
    singleDrug: createDefaultSingleDrugState()
  });
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

function handleSessionInputChange() {
  commitSingleDrugInputsFromView();
  updateDrugUI();
  refreshInfusionResultForCurrentMode({
    showValidation: true
  });
}

function handleDrugSettingsChange() {
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

function setLanguage(language) {
  currentLanguage = language === "en" ? "en" : "ko";
  saveLanguagePreference(currentLanguage);
  applyStaticTranslations();
  updateFeedbackLinks();
  updateSupportLinks();
  renderSupportWeightTools();
  updateQuickDrugUI();
  updateDrugUI();
  updatePediatricDrugUI();
  renderInfusionWorkspace();
  clearResult();
  clearPediatricResult();
  clearDantroleneResult();
  maybeRenderLiveInfusionResult({
    showValidation: false
  });
}

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

function handlePediatricInputChange() {
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

function handleDantroleneSubmit(event) {
  event.preventDefault();

  const values = readDantroleneFormValues();
  const validationError = validateDantroleneValues(values);

  if (validationError) {
    dantroleneErrorMessage.textContent = validationError;
    clearDantroleneResult();
    return;
  }

  dantroleneErrorMessage.textContent = "";
  clearDantroleneResult();
  showDantroleneResult(values);
}

function handleDantroleneInputChange() {
  updateDantroleneQuickState({
    inputs: {
      weight: dantroleneInputs.weight.value,
      formulationId: dantroleneInputs.formulation.value,
      initialDoseMgKg: dantroleneInputs.initialDose.value
    }
  });
  clearDantroleneResult();
  dantroleneErrorMessage.textContent = "";
}

function handleWorkspaceSharedWeightChange() {
  updateInfusionWorkspaceState({
    sharedWeight: workspaceSharedWeightInput.value
  });
  renderInfusionWorkspace();
}

function handleWorkspaceSharedWeightStepClick(event) {
  const direction = Number(event.currentTarget.dataset.workspaceSharedStep);

  if (!Number.isFinite(direction) || direction === 0) {
    return;
  }

  const currentWeight = Number(workspaceSharedWeightInput.value);
  const baseWeight = isPositiveNumber(currentWeight)
    ? currentWeight
    : 70;
  const nextWeight = Math.max(1, baseWeight + direction);

  workspaceSharedWeightInput.value = String(Math.round(nextWeight));
  handleWorkspaceSharedWeightChange();
}

function handleWorkspaceAddCard() {
  const workspaceState = getInfusionWorkspaceState();

  if ((workspaceState.cards || []).length >= 6) {
    workspaceHelp.textContent = t("workspace_limit_help");
    return;
  }

  updateInfusionWorkspaceState({
    cards: workspaceState.cards.concat(createDefaultInfusionWorkspaceCardState())
  });
  renderInfusionWorkspace();
}

function captureWorkspaceCardInputFocusState(input) {
  if (!input || !input.dataset.workspaceCardId || !input.dataset.workspaceField) {
    return null;
  }

  const focusState = {
    cardId: input.dataset.workspaceCardId,
    field: input.dataset.workspaceField,
    selectionStart: null,
    selectionEnd: null
  };

  try {
    if (typeof input.selectionStart === "number") {
      focusState.selectionStart = input.selectionStart;
      focusState.selectionEnd = typeof input.selectionEnd === "number"
        ? input.selectionEnd
        : input.selectionStart;
    }
  } catch (error) {
    focusState.selectionStart = null;
    focusState.selectionEnd = null;
  }

  return focusState;
}

function restoreWorkspaceCardInputFocusState(focusState) {
  if (!focusState || !workspaceCardList) {
    return;
  }

  const nextInput = workspaceCardList.querySelector(
    `[data-workspace-card-id="${focusState.cardId}"][data-workspace-field="${focusState.field}"]`
  );

  if (!nextInput) {
    return;
  }

  nextInput.focus({
    preventScroll: true
  });

  if (
    typeof focusState.selectionStart === "number"
    && typeof nextInput.setSelectionRange === "function"
  ) {
    try {
      nextInput.setSelectionRange(
        focusState.selectionStart,
        typeof focusState.selectionEnd === "number"
          ? focusState.selectionEnd
          : focusState.selectionStart
      );
    } catch (error) {
      // Some input types do not support selection restoration.
    }
  }
}

function renderInfusionWorkspacePreservingFocus(focusState) {
  renderInfusionWorkspace();
  restoreWorkspaceCardInputFocusState(focusState);
}

function shouldDeferWorkspaceQuickRender(input) {
  if (!input || input.tagName !== "INPUT" || input.type !== "number") {
    return false;
  }

  const trimmedValue = input.value.trim();

  return trimmedValue === "-"
    || trimmedValue === "."
    || trimmedValue === "-."
    || trimmedValue.endsWith(".");
}

function updateWorkspaceCardState(cardId, field, value, options) {
  const workspaceState = getInfusionWorkspaceState();
  const sharedWeight = Number(workspaceState.sharedWeight);
  const updatedCards = workspaceState.cards.map(function (card) {
    if (card.cardId !== cardId) {
      return card;
    }

    const preset = getDrugPresetById(card.selectedDrugId);

    if (field === "selectedDrugId") {
      const nextPreset = getDrugPresetById(value);
      return normalizeInfusionWorkspaceCardState({
        ...card,
        selectedDrugId: nextPreset.id,
        concentration: String(nextPreset.concentration),
        targetDose: String(nextPreset.referenceDoses[2] || nextPreset.referenceDoses[0] || card.targetDose),
        nitroglycerinDoseUnitView: isNitroglycerinDrug(nextPreset)
          ? sanitizeNitroglycerinDoseUnitView(card.nitroglycerinDoseUnitView)
          : "mcg/min"
      });
    }

    if (field === "nitroglycerinDoseUnitView") {
      if (!isNitroglycerinDrug(preset)) {
        return card;
      }

      const nextView = sanitizeNitroglycerinDoseUnitView(value);
      if (nextView === "mcg/kg/min" && !isPositiveNumber(sharedWeight)) {
        workspaceHelp.textContent = t("validation_ntg_weight_for_kg_unit");
        return card;
      }

      return normalizeInfusionWorkspaceCardState({
        ...card,
        nitroglycerinDoseUnitView: nextView
      });
    }

    if (field === "targetDose") {
      if (!isNitroglycerinDrug(preset) || value === "") {
        return normalizeInfusionWorkspaceCardState({
          ...card,
          targetDose: value
        });
      }

      const parsedTargetDose = Number(value);
      if (!Number.isFinite(parsedTargetDose)) {
        return normalizeInfusionWorkspaceCardState({
          ...card,
          targetDose: value
        });
      }

      const displayDoseUnit = sanitizeNitroglycerinDoseUnitView(
        (options && options.displayDoseUnit) || getWorkspaceNitroglycerinDoseView(card, sharedWeight)
      );
      const canonicalTargetDose = convertDoseValueToReferenceUnit(
        parsedTargetDose,
        preset,
        sharedWeight,
        displayDoseUnit
      );

      return normalizeInfusionWorkspaceCardState({
        ...card,
        targetDose: String(canonicalTargetDose)
      });
    }

    return normalizeInfusionWorkspaceCardState({
      ...card,
      [field]: value
    });
  });

  updateInfusionWorkspaceState({
    cards: updatedCards
  });
}

function handleWorkspaceCardStepper(stepButton) {
  const cardId = stepButton.dataset.workspaceStepCardId;
  const field = stepButton.dataset.workspaceStepField;
  const direction = Number(stepButton.dataset.workspaceStepDirection);
  const stepSize = Number(stepButton.dataset.workspaceStepSize);
  const displayDoseUnit = stepButton.dataset.workspaceDoseDisplayUnit;
  const workspaceState = getInfusionWorkspaceState();
  const card = workspaceState.cards.find(function (item) {
    return item.cardId === cardId;
  });

  if (!card || !Number.isFinite(direction) || !Number.isFinite(stepSize) || stepSize <= 0) {
    return false;
  }

  if (field === "concentration") {
    const currentValue = Number(card.concentration);
    const baseValue = isPositiveNumber(currentValue)
      ? currentValue
      : Number(getDrugPresetById(card.selectedDrugId).concentration) || 1;
    const nextValue = baseValue + (stepSize * direction);

    updateWorkspaceCardState(
      cardId,
      field,
      nextValue > 0 ? formatEditableDoseValue(nextValue) : ""
    );
    return true;
  }

  if (field === "targetDose") {
    const preset = getDrugPresetById(card.selectedDrugId);
    const sharedWeight = Number(workspaceState.sharedWeight);
    const unit = displayDoseUnit || getWorkspaceNitroglycerinDoseView(card, sharedWeight);
    const canonicalTargetDose = Number(card.targetDose);
    const displayTargetDose = convertDoseValueForDisplay(canonicalTargetDose, preset, sharedWeight, unit);
    const baseValue = isPositiveNumber(displayTargetDose) ? displayTargetDose : 0;
    const nextValue = baseValue + (stepSize * direction);

    updateWorkspaceCardState(
      cardId,
      field,
      nextValue > 0 ? formatEditableDoseValue(nextValue) : "",
      {
        displayDoseUnit: unit
      }
    );
    return true;
  }

  return false;
}

function handleWorkspaceCardClick(event) {
  const stepButton = event.target.closest("[data-workspace-step-field]");

  if (stepButton) {
    if (handleWorkspaceCardStepper(stepButton)) {
      renderInfusionWorkspace();
    }
    return;
  }

  const moveUpButton = event.target.closest("[data-move-workspace-card-up]");

  if (moveUpButton) {
    const cardId = moveUpButton.dataset.moveWorkspaceCardUp;
    const workspaceState = getInfusionWorkspaceState();
    const cardIndex = workspaceState.cards.findIndex(function (card) {
      return card.cardId === cardId;
    });

    if (cardIndex > 0) {
      const updatedCards = workspaceState.cards.slice();
      const currentCard = updatedCards[cardIndex];
      updatedCards[cardIndex] = updatedCards[cardIndex - 1];
      updatedCards[cardIndex - 1] = currentCard;
      updateInfusionWorkspaceState({ cards: updatedCards });
      renderInfusionWorkspace();
    }
    return;
  }

  const moveDownButton = event.target.closest("[data-move-workspace-card-down]");

  if (moveDownButton) {
    const cardId = moveDownButton.dataset.moveWorkspaceCardDown;
    const workspaceState = getInfusionWorkspaceState();
    const cardIndex = workspaceState.cards.findIndex(function (card) {
      return card.cardId === cardId;
    });

    if (cardIndex > -1 && cardIndex < workspaceState.cards.length - 1) {
      const updatedCards = workspaceState.cards.slice();
      const currentCard = updatedCards[cardIndex];
      updatedCards[cardIndex] = updatedCards[cardIndex + 1];
      updatedCards[cardIndex + 1] = currentCard;
      updateInfusionWorkspaceState({ cards: updatedCards });
      renderInfusionWorkspace();
    }
    return;
  }

  const applyDilutionButton = event.target.closest("[data-apply-workspace-dilution]");

  if (applyDilutionButton) {
    const cardId = applyDilutionButton.dataset.applyWorkspaceDilution;
    const workspaceState = getInfusionWorkspaceState();
    const targetCard = workspaceState.cards.find(function (card) {
      return card.cardId === cardId;
    });

    if (!targetCard) {
      return;
    }

    const preset = getDrugPresetById(targetCard.selectedDrugId);
    const dilutionPreset = preset.dilutionPresets[0];

    if (!dilutionPreset) {
      return;
    }

    updateWorkspaceCardState(cardId, "concentration", String(dilutionPreset.finalConcentration));
    workspaceHelp.textContent = `${preset.name} ${t("workspace_standard_dilution_note", { dilution: formatDilutionPreset(dilutionPreset) })}`;
    renderInfusionWorkspace();
    return;
  }

  const removeButton = event.target.closest("[data-remove-workspace-card-id]");

  if (removeButton) {
    const cardId = removeButton.dataset.removeWorkspaceCardId;
    const workspaceState = getInfusionWorkspaceState();
    const remainingCards = workspaceState.cards.filter(function (card) {
      return card.cardId !== cardId;
    });

    updateInfusionWorkspaceState({
      cards: remainingCards.length ? remainingCards : [createDefaultInfusionWorkspaceCardState()]
    });
    renderInfusionWorkspace();
    return;
  }
}

function handleWorkspaceCardInput(event) {
  const input = event.target.closest("[data-workspace-field]");

  if (!input) {
    return;
  }

  const isQuickWorkspaceMode = sanitizeWorkspaceLayoutMode(getInfusionWorkspaceState().viewMode) === "quick";
  const focusState = isQuickWorkspaceMode
    ? captureWorkspaceCardInputFocusState(input)
    : null;

  updateWorkspaceCardState(
    input.dataset.workspaceCardId,
    input.dataset.workspaceField,
    input.value,
    {
      displayDoseUnit: input.dataset.workspaceDoseDisplayUnit
    }
  );

  if (isQuickWorkspaceMode && !shouldDeferWorkspaceQuickRender(input)) {
    renderInfusionWorkspacePreservingFocus(focusState);
  }
}

function handleWorkspaceCardChange(event) {
  const input = event.target.closest("[data-workspace-field]");

  if (!input) {
    return;
  }

  updateWorkspaceCardState(
    input.dataset.workspaceCardId,
    input.dataset.workspaceField,
    input.value,
    {
      displayDoseUnit: input.dataset.workspaceDoseDisplayUnit
    }
  );
  renderInfusionWorkspace();
}

function handleWorkspaceTemplateSelectChange() {
  updateInfusionWorkspaceState({
    selectedTemplateId: workspaceTemplateSelect.value
  });
  renderInfusionWorkspace();
}

function handleWorkspaceSaveTemplate() {
  const templateName = workspaceTemplateNameInput.value.trim();
  const templateNote = workspaceTemplateNoteInput.value.trim();

  if (!templateName) {
    workspaceHelp.textContent = currentLanguage === "en" ? "Enter a template name before saving." : "저장하기 전에 template name을 입력해 주세요.";
    return;
  }

  const workspaceState = getInfusionWorkspaceState();
  const templates = getInfusionTemplates();
  const existingTemplate = templates.find(function (template) {
    return template.id === workspaceState.selectedTemplateId || template.name.toLowerCase() === templateName.toLowerCase();
  });
  const savedTemplate = createInfusionTemplateState(templateName, templateNote, workspaceState.cards, existingTemplate && existingTemplate.id);

  if (existingTemplate && existingTemplate.createdAt) {
    savedTemplate.createdAt = existingTemplate.createdAt;
  }

  const updatedTemplates = templates
    .filter(function (template) {
      return template.id !== savedTemplate.id;
    })
    .concat(savedTemplate)
    .slice(-10);

  updateInfusionTemplates(updatedTemplates);
  updateInfusionWorkspaceState({
    selectedTemplateId: savedTemplate.id
  });
  workspaceHelp.textContent = currentLanguage === "en"
    ? `Template saved: ${savedTemplate.name}. Saved setups load drug cards only and do not assess interactions.`
    : `Template 저장 완료: ${savedTemplate.name}. 저장된 setup은 drug card만 불러오며 interaction은 평가하지 않습니다.`;
  renderInfusionWorkspace();
}

function handleWorkspaceLoadTemplate() {
  const selectedTemplateId = workspaceTemplateSelect.value;
  const selectedTemplate = getInfusionTemplates().find(function (template) {
    return template.id === selectedTemplateId;
  });

  if (!selectedTemplate) {
    workspaceHelp.textContent = currentLanguage === "en" ? "Select a template to load first." : "불러올 template를 먼저 선택해 주세요.";
    return;
  }

  updateInfusionWorkspaceState({
    selectedTemplateId: selectedTemplate.id,
    cards: cloneWorkspaceCards(selectedTemplate.cards)
  });
  workspaceHelp.textContent = currentLanguage === "en"
    ? `Loaded template: ${selectedTemplate.name}. Shared weight remains based on the current patient.`
    : `불러온 template: ${selectedTemplate.name}. Shared weight는 현재 환자 기준으로 유지됩니다.`;
  renderInfusionWorkspace();
}

function handleWorkspaceDeleteTemplate() {
  const selectedTemplateId = workspaceTemplateSelect.value;

  if (!selectedTemplateId) {
    workspaceHelp.textContent = currentLanguage === "en" ? "Select a template to delete first." : "삭제할 template를 먼저 선택해 주세요.";
    return;
  }

  const selectedTemplate = getInfusionTemplates().find(function (template) {
    return template.id === selectedTemplateId;
  });

  updateInfusionTemplates(getInfusionTemplates().filter(function (template) {
    return template.id !== selectedTemplateId;
  }));
  updateInfusionWorkspaceState({
    selectedTemplateId: ""
  });
  workspaceTemplateNameInput.value = "";
  workspaceHelp.textContent = selectedTemplate
    ? (currentLanguage === "en" ? `Deleted template: ${selectedTemplate.name}.` : `삭제한 template: ${selectedTemplate.name}.`)
    : (currentLanguage === "en" ? "Template deleted." : "Template를 삭제했습니다.");
  renderInfusionWorkspace();
}

function resetDantroleneForm() {
  persistedState.dantroleneQuick = createDefaultDantroleneQuickState();
  savePersistedState(persistedState);
  dantroleneForm.reset();
  applyDantroleneQuickStateToView(getDantroleneQuickState());
  clearDantroleneResult();
  dantroleneErrorMessage.textContent = "";
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

infusionViewTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    activateInfusionView(tab.dataset.infusionViewTab);
  });
});

workspaceLayoutTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    activateWorkspaceLayoutMode(tab.dataset.workspaceLayoutTab);
  });
});

calculatorTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    activateCalculator(tab.dataset.calculatorTab);
  });
});

pediatricModeTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    activatePediatricMode(tab.dataset.pediatricModeTab);
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
pediatricDrugSelect.addEventListener("change", handlePediatricDrugChange);
pediatricInputs.ageGroup.addEventListener("change", handlePediatricInputChange);
pediatricForm.addEventListener("submit", handlePediatricSubmit);
pediatricResetButton.addEventListener("click", resetPediatricForm);
dantroleneForm.addEventListener("submit", handleDantroleneSubmit);
dantroleneResetButton.addEventListener("click", resetDantroleneForm);
workspaceSharedWeightInput.addEventListener("input", handleWorkspaceSharedWeightChange);
workspaceSharedWeightStepButtons.forEach(function (button) {
  button.addEventListener("click", handleWorkspaceSharedWeightStepClick);
});
workspaceAddCardButton.addEventListener("click", handleWorkspaceAddCard);
workspaceTemplateSelect.addEventListener("change", handleWorkspaceTemplateSelectChange);
workspaceLoadTemplateButton.addEventListener("click", handleWorkspaceLoadTemplate);
workspaceSaveTemplateButton.addEventListener("click", handleWorkspaceSaveTemplate);
workspaceDeleteTemplateButton.addEventListener("click", handleWorkspaceDeleteTemplate);
workspaceCardList.addEventListener("input", handleWorkspaceCardInput);
workspaceCardList.addEventListener("change", handleWorkspaceCardChange);
workspaceCardList.addEventListener("click", handleWorkspaceCardClick);
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

[
  dantroleneInputs.weight,
  dantroleneInputs.formulation,
  dantroleneInputs.initialDose
].forEach(function (input) {
  input.addEventListener("input", handleDantroleneInputChange);
  if (input.tagName === "SELECT") {
    input.addEventListener("change", handleDantroleneInputChange);
  }
});

[
  supportWeightSexInput,
  supportWeightHeightInput,
  supportWeightTotalInput
].forEach(function (input) {
  if (!input) {
    return;
  }

  input.addEventListener("input", handleSupportWeightInputChange);
  if (input.tagName === "SELECT") {
    input.addEventListener("change", handleSupportWeightInputChange);
  }
});

// -----------------------------
// Dilution Calculator Event Listeners
// -----------------------------

dilutionInputs.modeTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    const modeId = tab.dataset.dilutionModeTab;
    activateDilutionMode(modeId);
  });
});

dilutionInputs.form.addEventListener("submit", function (e) {
  e.preventDefault();
  dilutionInputs.errorMessage.textContent = "";

  const activeModeTab = document.querySelector("[data-dilution-mode-tab].is-active");
  const modeId = activeModeTab ? activeModeTab.dataset.dilutionModeTab : "target-to-mix";

  try {
    if (modeId === "target-to-mix") {
      const targetConc = Number(dilutionInputs.targetConcentration.value);
      const targetUnit = dilutionInputs.targetUnit.value; // "mcg" or "mg"
      const finalVolume = Number(dilutionInputs.finalVolume.value);
      const stockConc = Number(dilutionInputs.stockConcentration.value);
      const stockUnit = dilutionInputs.stockUnit.value; // "mcg" or "mg"

      if (!isPositiveNumber(targetConc)) throw new Error(t("dilution_error_target_concentration"));
      if (!isPositiveNumber(finalVolume)) throw new Error(t("dilution_error_final_volume"));
      if (!isPositiveNumber(stockConc)) throw new Error(t("dilution_error_stock_concentration"));

      // Convert target back to mg/mL for calculation base
      const targetConcMg = targetUnit === "mcg" ? targetConc / 1000 : targetConc;
      const totalDrugMgNeeded = targetConcMg * finalVolume;
      
      const stockConcMg = stockUnit === "mcg" ? stockConc / 1000 : stockConc;
      const drawVolume = totalDrugMgNeeded / stockConcMg;

      if (drawVolume > finalVolume) {
        throw new Error(t("dilution_error_dilution_impossible"));
      }

      const diluentVolume = finalVolume - drawVolume;

      const formattedDrawVol = Number(drawVolume.toFixed(2));
      const formattedDiluentVol = Number(diluentVolume.toFixed(2));
      const totalDrugDisplay = targetUnit === "mcg" ? (totalDrugMgNeeded * 1000).toFixed(1) + " mcg" : totalDrugMgNeeded.toFixed(2) + " mg";

      dilutionInputs.resultLabel.textContent = t("dilution_result_mix");
      dilutionInputs.resultBox2.classList.remove("hidden");
      dilutionInputs.resultTitle1.textContent = t("dilution_result_draw_volume");
      dilutionInputs.resultValue1.textContent = `${formattedDrawVol} mL`;
      dilutionInputs.resultTitle2.textContent = t("dilution_result_add_diluent");
      dilutionInputs.resultValue2.textContent = `${formattedDiluentVol} mL`;
      dilutionInputs.summaryHeading.textContent = t("dilution_result_summary");
      dilutionInputs.summaryText.innerHTML = currentLanguage === "en"
        ? `To achieve <strong>${targetConc} ${targetUnit}/mL</strong> in <strong>${finalVolume} mL</strong> (Total drug: ${totalDrugDisplay}):<br>Draw <strong>${formattedDrawVol} mL</strong> of stock drug and mix with <strong>${formattedDiluentVol} mL</strong> of diluent.`
        : `<strong>${targetConc} ${targetUnit}/mL</strong> 농도를 <strong>${finalVolume} mL</strong>로 만들려면 (총 약물량: ${totalDrugDisplay}):<br>원액 약물 <strong>${formattedDrawVol} mL</strong>를 뽑고 diluent <strong>${formattedDiluentVol} mL</strong>를 추가하세요.`;

    } else if (modeId === "mix-to-conc") {
      const drugAmount = Number(dilutionInputs.reverseDrugAmount.value);
      const drugUnit = dilutionInputs.reverseDrugUnit.value; // "mcg" or "mg"
      const finalVolume = Number(dilutionInputs.reverseFinalVolume.value);

      if (!isPositiveNumber(drugAmount)) throw new Error(t("dilution_error_drug_amount"));
      if (!isPositiveNumber(finalVolume)) throw new Error(t("dilution_error_final_volume"));

      const drugAmountMg = drugUnit === "mcg" ? drugAmount / 1000 : drugAmount;
      const finalConcMg = drugAmountMg / finalVolume;
      const finalConcMcg = finalConcMg * 1000;

      const formattedMg = Number(finalConcMg.toFixed(2));
      const formattedMcg = Number(finalConcMcg.toFixed(1));

      dilutionInputs.resultLabel.textContent = t("dilution_result_final_concentration");
      dilutionInputs.resultBox2.classList.add("hidden");
      dilutionInputs.resultTitle1.textContent = t("dilution_result_target_conc");
      
      if (formattedMg >= 1) {
        dilutionInputs.resultValue1.textContent = `${formattedMg} mg/mL`;
      } else {
        dilutionInputs.resultValue1.textContent = `${formattedMcg} mcg/mL`;
      }

      dilutionInputs.summaryHeading.textContent = t("dilution_result_calculated");
      dilutionInputs.summaryText.innerHTML = currentLanguage === "en"
        ? `Mixing <strong>${drugAmount} ${drugUnit}</strong> in a total volume of <strong>${finalVolume} mL</strong> yields a final concentration of:<br><strong style="font-size: 1.1em; color: var(--primary);">${formattedMg} mg/mL</strong> (or ${formattedMcg} mcg/mL).`
        : `총 <strong>${finalVolume} mL</strong>에 <strong>${drugAmount} ${drugUnit}</strong>를 섞으면 최종 농도는 다음과 같습니다:<br><strong style="font-size: 1.1em; color: var(--primary);">${formattedMg} mg/mL</strong> (또는 ${formattedMcg} mcg/mL).`;
    }

    dilutionInputs.resultCard.classList.remove("hidden");
    
  } catch (error) {
    dilutionInputs.errorMessage.textContent = error.message;
    dilutionInputs.resultCard.classList.add("hidden");
  }
});

dilutionInputs.resetButton.addEventListener("click", function () {
  dilutionInputs.form.reset();
  dilutionInputs.resultCard.classList.add("hidden");
  dilutionInputs.errorMessage.textContent = "";
});

if (languageSelect) {
  languageSelect.addEventListener("change", function () {
    setLanguage(languageSelect.value);
  });
}

// -----------------------------
// Initial restore
// -----------------------------

currentLanguage = loadLanguagePreference();
applyStaticTranslations();
updateFeedbackLinks();
updateSupportLinks();
renderSupportWeightTools();
applySingleDrugStateToView(getSingleDrugState());
applyPediatricDoseStateToView(getPediatricDoseState());
applyDantroleneQuickStateToView(getDantroleneQuickState());
activateCalculator("infusion");
activateInfusionView(getInfusionWorkspaceState().activeView);
activateInfusionMode(getSingleDrugState().activeMode);
updateDrugUI();
updatePediatricDrugUI();
renderInfusionWorkspace();
clearResult();
clearPediatricResult();
clearDantroleneResult();
maybeRenderLiveInfusionResult({
  showValidation: false
});

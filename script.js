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
const multiDrugWarning = document.getElementById("multi-drug-warning");
const drugSelect = document.getElementById("drug-select");
const drugHelp = document.getElementById("drug-help");
const favoriteDrugButton = document.getElementById("favorite-drug-button");
const favoriteDrugsContainer = document.getElementById("favorite-drugs");
const recentDrugsContainer = document.getElementById("recent-drugs");
const presetSummary = document.getElementById("preset-summary");
const referenceRangeText = document.getElementById("reference-range-text");
const drugNotesText = document.getElementById("drug-notes-text");
const drugDilutionText = document.getElementById("drug-dilution-text");
const drugDilutionButton = document.getElementById("drug-dilution-button");
const drugSourceText = document.getElementById("drug-source-text");
const drugLastReviewedText = document.getElementById("drug-last-reviewed-text");
const concentrationUnitLabel = document.getElementById("concentration-unit-label");
const doseUnitLabel = document.getElementById("dose-unit-label");
const customDrugFields = document.getElementById("custom-drug-fields");
const referenceTableCard = document.getElementById("reference-table-card");
const referenceTableCaption = document.getElementById("reference-table-caption");
const referenceTableBody = document.getElementById("reference-table-body");
const infusionModeTabs = document.querySelectorAll("[data-infusion-mode-tab]");
const infusionModePanels = document.querySelectorAll("[data-infusion-mode-panel]");
const infusionViewTabs = document.querySelectorAll("[data-infusion-view-tab]");
const infusionViewPanels = document.querySelectorAll("[data-infusion-view-panel]");
const calculatorTabs = document.querySelectorAll("[data-calculator-tab]");
const calculatorViews = document.querySelectorAll("[data-calculator-view]");
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
const workspaceAddCardButton = document.getElementById("workspace-add-card-button");
const workspaceTemplateNameInput = document.getElementById("workspace-template-name");
const workspaceTemplateNoteInput = document.getElementById("workspace-template-note");
const workspaceTemplateSelect = document.getElementById("workspace-template-select");
const workspaceLoadTemplateButton = document.getElementById("workspace-load-template-button");
const workspaceSaveTemplateButton = document.getElementById("workspace-save-template-button");
const workspaceDeleteTemplateButton = document.getElementById("workspace-delete-template-button");
const workspaceCardList = document.getElementById("workspace-card-list");
const workspaceHelp = document.getElementById("workspace-help");

const pediatricInputs = {
  weight: document.getElementById("pediatric-weight"),
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

// -----------------------------
// Calculation engine
// -----------------------------

function doseToRate(weightKg, concentrationPerMl, dosePerKgTime, timeUnit = "min") {
  const timeFactor = timeUnit === "hr" ? 1 : 60;
  return (dosePerKgTime * weightKg * timeFactor) / concentrationPerMl;
}

function rateToDose(weightKg, concentrationPerMl, rateMlHr, timeUnit = "min") {
  const timeFactor = timeUnit === "hr" ? 1 : 60;
  return (rateMlHr * concentrationPerMl) / (weightKg * timeFactor);
}

function buildReferenceTable(weightKg, concentrationPerMl, doseList, timeUnit = "min") {
  return doseList.map(function (dose) {
    return {
      dose: dose,
      rate: doseToRate(weightKg, concentrationPerMl, dose, timeUnit)
    };
  });
}

function calculateWeightBasedDoseRange(weightKg, minDosePerKg, maxDosePerKg) {
  return {
    minDose: weightKg * minDosePerKg,
    maxDose: weightKg * maxDosePerKg
  };
}

function calculateDoseVolume(doseAmount, concentrationPerMl) {
  return doseAmount / concentrationPerMl;
}

function calculateDantroleneDose(weightKg, dosePerKg) {
  return weightKg * dosePerKg;
}

function roundToNearestHalf(value) {
  return Math.round(value * 2) / 2;
}

function calculatePediatricAirwayEstimates(ageYears) {
  const uncuffedSize = roundToNearestHalf((ageYears / 4) + 4);
  const cuffedSize = roundToNearestHalf((ageYears / 4) + 3.5);
  const oralDepth = ageYears < 2
    ? 10 + ageYears
    : (ageYears / 2) + 12;

  return {
    uncuffedSize: uncuffedSize,
    cuffedSize: cuffedSize,
    oralDepth: oralDepth,
    cuffedDepthBySize: cuffedSize * 3
  };
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

const REFERENCE_REGISTRY = {
  pediatric_ett_openanesthesia: {
    title: "Pediatric direct laryngoscopy and tracheal intubation",
    source: "OpenAnesthesia",
    url: "https://www.openanesthesia.org/keywords/pediatric-direct-laryngoscopy-and-tracheal-intubation/",
    lastReviewed: "2026-03-14"
  },
  pediatric_ett_msd_calculator: {
    title: "Endotracheal tube size for children age 1 to 8 years",
    source: "MSD Manual Professional Edition",
    url: "https://www.msdmanuals.com/professional/multimedia/clinical-calculator/endotracheal-tube-size-for-children-age-1-to-8-years",
    lastReviewed: "2026-03-14"
  },
  igel_intersurgical: {
    title: "i-gel sizing guide",
    source: "Intersurgical",
    url: "https://www.intersurgical.com/info/igel",
    lastReviewed: "2026-03-14"
  },
  lma_supreme_teleflex: {
    title: "LMA Supreme airway user guide",
    source: "Teleflex",
    url: "https://www.teleflex.com/usa/en/product-areas/emergency-medicine/airway-management/supraglottic-airways/AN_LM_Supreme-User-Guide_PC_MC-000163.pdf",
    lastReviewed: "2026-03-14"
  },
  pediatric_oral_airway_basics: {
    title: "Routine airway management",
    source: "Basics of Pediatric Anesthesia",
    url: "https://basicsofpediatricanesthesia.com/section-iii-anesthetic-management/chapter-16-routine-airway-management/",
    lastReviewed: "2026-03-14"
  },
  pediatric_laryngoscope_blade_guide: {
    title: "Choose your blade",
    source: "The Protected Airway",
    url: "https://theprotectedairway.com/choose-your-blade/",
    lastReviewed: "2026-03-14"
  },
  pediatric_nasal_airway_pubmed: {
    title: "Insertion depth of nasal airway in children younger than 2 years",
    source: "PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/34600970/",
    lastReviewed: "2026-03-14"
  },
  pediatric_face_mask_ambu: {
    title: "Anatomical face masks product information",
    source: "Ambu",
    url: "https://www.ambu.com/anaesthesia-and-patient-monitoring/face-masks/product/ambu-anaesthetic-face-masks",
    lastReviewed: "2026-03-15"
  },
  pediatric_face_mask_intersurgical: {
    title: "EcoMask anaesthetic face masks",
    source: "Intersurgical",
    url: "https://www.intersurgical.com/products/anaesthesia/ecolite-mask-range",
    lastReviewed: "2026-03-15"
  },
  pediatric_fentanyl_dailymed: {
    title: "Fentanyl citrate injection prescribing information",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c5d40297-b769-48cc-9f84-f98b7a333507",
    lastReviewed: "2026-03-14"
  },
  pediatric_rocuronium_dailymed: {
    title: "Rocuronium bromide injection prescribing information",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9a622308-7bda-4ca0-9de5-d6b3b4be3384",
    lastReviewed: "2026-03-14"
  },
  pediatric_sugammadex_fda: {
    title: "BRIDION prescribing information",
    source: "FDA",
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/022225s014lbl.pdf",
    lastReviewed: "2026-03-14"
  },
  pediatric_neostigmine_dailymed: {
    title: "Neostigmine methylsulfate injection prescribing information",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9cc2bfa1-c968-4d01-8162-2ef188974164",
    lastReviewed: "2026-03-14"
  },
  pediatric_glycopyrrolate_dailymed: {
    title: "Glycopyrrolate injection prescribing information",
    source: "DailyMed",
    url: "https://fda.report/DailyMed/250eeef7-b1a9-45e7-a927-7807232e10be",
    lastReviewed: "2026-03-15"
  },
  pediatric_atropine_dailymed: {
    title: "Atropine sulfate injection prescribing information",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4c15d3cc-7888-4c82-b3f8-a5d93c5523df",
    lastReviewed: "2026-03-14"
  },
  pediatric_propofol_dailymed: {
    title: "Propofol injectable emulsion prescribing information",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5ec25932-6c21-4cd5-8f60-80761f2e20a6",
    lastReviewed: "2026-03-14"
  },
  pediatric_ketamine_dailymed: {
    title: "Ketamine hydrochloride injection prescribing information",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f8b01c77-620d-4734-a771-b8524b65bcca",
    lastReviewed: "2026-03-14"
  },
  pediatric_ondansetron_dailymed: {
    title: "Ondansetron injection prescribing information",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=97713356-f42b-4a67-95f6-561afa68c0c2",
    lastReviewed: "2026-03-14"
  },
  infusion_norepinephrine_dailymed: {
    title: "Norepinephrine bitartrate injection",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a27fb6e0-8f7a-11db-9739-0050c2490048",
    lastReviewed: "2026-03-15"
  },
  infusion_epinephrine_dailymed: {
    title: "Epinephrine injection",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3b1ac82f-6920-4e40-a77e-598398679f2d",
    lastReviewed: "2026-03-15"
  },
  infusion_phenylephrine_dailymed: {
    title: "Phenylephrine hydrochloride injection",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?audience=consumer&setid=1e77b9c8-fa17-4aa4-adc8-ff716ab2e5d7",
    lastReviewed: "2026-03-15"
  },
  infusion_vasopressin_dailymed: {
    title: "Vasopressin injection",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?audience=consumer&setid=ad3ac280-49da-4816-9097-14517d0c0f85",
    lastReviewed: "2026-03-15"
  },
  infusion_nitroglycerin_dailymed: {
    title: "Nitroglycerin injection, solution",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=b8af0974-33ea-4dd5-9ff7-3b61272aeb25",
    lastReviewed: "2026-03-15"
  },
  infusion_dopamine_dailymed: {
    title: "Dopamine hydrochloride injection",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=0e499952-46c7-4172-8c70-186312e240a3",
    lastReviewed: "2026-03-15"
  },
  infusion_dobutamine_dailymed: {
    title: "Dobutamine injection, solution, concentrate",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=9794e9d0-c8b7-4d18-8cd1-15cc4f2a9a55",
    lastReviewed: "2026-03-15"
  },
  infusion_milrinone_dailymed: {
    title: "Milrinone lactate injection, solution",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fde1e354-4f15-4ade-9ae3-db2ba67e0431",
    lastReviewed: "2026-03-15"
  },
  infusion_isoproterenol_dailymed: {
    title: "Isoproterenol hydrochloride injection, solution",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=d2a9b767-0274-49bf-83cd-2fcce9bedc78",
    lastReviewed: "2026-03-15"
  },
  dantrolene_standard_dailymed: {
    title: "Dantrolene sodium for injection",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?audience=consumer&setid=ab0efc75-0598-4f4e-91ad-6195bb2661fe",
    lastReviewed: "2026-03-15"
  },
  dantrolene_ryanodex_fda: {
    title: "RYANODEX prescribing information",
    source: "FDA",
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/205579s011lbl.pdf",
    lastReviewed: "2026-03-15"
  },
  mhaus_dantrolene: {
    title: "How much dantrolene should be kept on hand?",
    source: "MHAUS",
    url: "https://www.mhaus.org/faqs/how-much-dantrolene-should-be-kept-on-hand/",
    lastReviewed: "2026-03-15"
  },
  infusion_remifentanil_dailymed: {
    title: "Remifentanil hydrochloride injection",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=remifentanil",
    lastReviewed: "2026-03-15"
  },
  infusion_propofol_dailymed: {
    title: "Propofol injectable emulsion",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=propofol",
    lastReviewed: "2026-03-15"
  },
  infusion_esmolol_dailymed: {
    title: "Esmolol hydrochloride injection",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=esmolol",
    lastReviewed: "2026-03-15"
  },
  infusion_dexmedetomidine_dailymed: {
    title: "Dexmedetomidine hydrochloride injection",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=dexmedetomidine",
    lastReviewed: "2026-03-15"
  }
};

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
    return `<li><a href="${item.url}" target="_blank" rel="noreferrer">${item.source}</a> - ${item.title} (Last reviewed: ${item.lastReviewed})</li>`;
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
    return "Age-based ETT formulas are less reliable in neonates and young infants. Use infant-specific references and clinical confirmation.";
  }

  if (deviceCategory === "supraglottic") {
    return "Supraglottic size guidance is weight-based. Confirm device availability, seal, and manufacturer instructions.";
  }

  if (deviceCategory === "oral-airway") {
    return "Oral airway size is only a starting guide. External measurement and clinical fit are more important than age alone.";
  }

  if (deviceCategory === "nasal-airway") {
    return "Nasal airway length is best estimated by external measurement. Age and weight are weak proxies, especially outside infancy.";
  }

  if (deviceCategory === "laryngoscope") {
    return "Blade choice depends on anatomy, pathology, and operator preference. Use this as a quick reference only.";
  }

  if (deviceCategory === "face-mask") {
    return "Face mask numbering varies by manufacturer. Use this as a broad starting guide and confirm actual facial fit clinically.";
  }

  return "Select an airway device type to see the matching guide. Confirm anatomy, fit, and clinical position before use.";
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

function formatNumber(value, digits) {
  return Number(value).toFixed(digits === undefined ? 2 : digits);
}

function formatList(values) {
  return values.map(function (value) {
    return String(value);
  }).join(", ");
}

function parseDoseList(rawValue) {
  if (typeof rawValue !== "string" || rawValue.trim() === "") {
    return null;
  }

  const values = rawValue
    .split(",")
    .map(function (item) {
      return Number(item.trim());
    })
    .filter(function (value) {
      return Number.isFinite(value) && value > 0;
    });

  return values.length ? values : null;
}

function isPositiveNumber(value) {
  return Number.isFinite(value) && value > 0;
}

function getUnitBase(unitValue) {
  return typeof unitValue === "string" ? unitValue.split("/")[0] : "";
}

function createClientId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// -----------------------------
// Drug config layer
// -----------------------------

const DEFAULT_CUSTOM_DRUG = {
  id: "custom",
  name: "",
  concentration: 100,
  concentrationUnit: "mcg/mL",
  referenceDoses: [0.02, 0.05, 0.1, 0.2, 0.3],
  referenceRange: {
    min: 0.02,
    max: 0.3,
    unit: "mcg/kg/min"
  },
  notes: "",
  dilutionPresets: [],
  metadata: {
    source: "User defined",
    lastReviewed: "Not set"
  }
};

const DEFAULT_CUSTOM_PEDIATRIC_DRUG = {
  id: "custom",
  name: "Custom drug",
  category: "custom",
  profiles: {
    pediatricBolus: {
      dosePerKgUnit: "mg/kg",
      doseAmountUnit: "mg",
      recommendedRange: {
        min: 0.01,
        max: 0.02
      },
      concentration: {
        value: 1,
        unit: "mg/mL"
      },
      doseLimits: null,
      notes: "User-defined pediatric bolus reference.",
      ageGuidance: {
        default: {
          note: "Custom weight-based bolus estimate.",
          warning: "Custom pediatric dose - verify with institutional protocols and current references."
        }
      },
      verificationStatus: "unverified",
      metadata: {
        source: "User defined",
        lastReviewed: "Current session"
      }
    }
  }
};

const DRUG_PRESETS = [
  {
    id: "norepinephrine",
    name: "Norepinephrine",
    concentration: 100,
    concentrationUnit: "mcg/mL",
    referenceDoses: [0.02, 0.05, 0.1, 0.2, 0.3],
    referenceRange: {
      min: 0.01,
      max: 0.3,
      unit: "mcg/kg/min"
    },
    notes: "Common vasopressor reference doses. Adjust to institutional standards.",
    dilutionPresets: [
      {
        id: "ne-4mg-50ml",
        label: "4 mg / 50 mL",
        drugAmount: 4,
        drugAmountUnit: "mg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 80,
        finalConcentrationUnit: "mcg/mL",
        note: "Common syringe pump example"
      }
    ],
    references: ["infusion_norepinephrine_dailymed"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "epinephrine",
    name: "Epinephrine",
    concentration: 100,
    concentrationUnit: "mcg/mL",
    referenceDoses: [0.01, 0.02, 0.05, 0.1, 0.2],
    referenceRange: {
      min: 0.01,
      max: 0.2,
      unit: "mcg/kg/min"
    },
    notes: "Reference values only. Verify concentration and local pump labeling conventions.",
    dilutionPresets: [
      {
        id: "epi-5mg-50ml",
        label: "5 mg / 50 mL",
        drugAmount: 5,
        drugAmountUnit: "mg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 100,
        finalConcentrationUnit: "mcg/mL",
        note: "Example infusion syringe"
      }
    ],
    references: ["infusion_epinephrine_dailymed"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "phenylephrine",
    name: "Phenylephrine",
    concentration: 100,
    concentrationUnit: "mcg/mL",
    referenceDoses: [0.1, 0.2, 0.5, 1, 2],
    referenceRange: {
      min: 0.1,
      max: 2,
      unit: "mcg/kg/min"
    },
    notes: "Dose conventions vary between institutions. Use as a quick reference only.",
    dilutionPresets: [
      {
        id: "phe-10mg-100ml",
        label: "10 mg / 100 mL",
        drugAmount: 10,
        drugAmountUnit: "mg",
        finalVolume: 100,
        finalVolumeUnit: "mL",
        finalConcentration: 100,
        finalConcentrationUnit: "mcg/mL",
        note: "Common vasopressor dilution example"
      }
    ],
    references: ["infusion_phenylephrine_dailymed"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "vasopressin",
    name: "Vasopressin",
    concentration: 1,
    concentrationUnit: "unit/mL",
    referenceDoses: [0.0003, 0.0006, 0.001, 0.002, 0.003],
    referenceRange: {
      min: 0.0003,
      max: 0.003,
      unit: "unit/kg/min"
    },
    notes: "Unit-based example preset included for workflow planning; confirm local conventions before use.",
    dilutionPresets: [
      {
        id: "vaso-20u-20ml",
        label: "20 units / 20 mL",
        drugAmount: 20,
        drugAmountUnit: "units",
        finalVolume: 20,
        finalVolumeUnit: "mL",
        finalConcentration: 1,
        finalConcentrationUnit: "unit/mL",
        note: "Example only"
      }
    ],
    references: ["infusion_vasopressin_dailymed"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "nitroglycerin",
    name: "Nitroglycerin",
    concentration: 200,
    concentrationUnit: "mcg/mL",
    referenceDoses: [0.25, 0.5, 1, 2, 3],
    referenceRange: {
      min: 0.25,
      max: 3,
      unit: "mcg/kg/min"
    },
    notes: "Use local hemodynamic protocol and titrate to clinical context.",
    dilutionPresets: [
      {
        id: "ntg-10mg-50ml",
        label: "10 mg / 50 mL",
        drugAmount: 10,
        drugAmountUnit: "mg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 200,
        finalConcentrationUnit: "mcg/mL",
        note: "Common NTG syringe example"
      }
    ],
    references: ["infusion_nitroglycerin_dailymed"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "dopamine",
    name: "Dopamine",
    concentration: 4000,
    concentrationUnit: "mcg/mL",
    referenceDoses: [3, 5, 10, 15, 20],
    referenceRange: {
      min: 2,
      max: 20,
      unit: "mcg/kg/min"
    },
    notes: "Dose-response varies by range; verify local standards before use.",
    dilutionPresets: [
      {
        id: "dopamine-200mg-50ml",
        label: "200 mg / 50 mL",
        drugAmount: 200,
        drugAmountUnit: "mg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 4000,
        finalConcentrationUnit: "mcg/mL",
        note: "Example only"
      }
    ],
    references: ["infusion_dopamine_dailymed"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "dobutamine",
    name: "Dobutamine",
    concentration: 5000,
    concentrationUnit: "mcg/mL",
    referenceDoses: [2.5, 5, 7.5, 10, 15],
    referenceRange: {
      min: 2.5,
      max: 15,
      unit: "mcg/kg/min"
    },
    notes: "Reference only. Match final concentration to institutional practice.",
    dilutionPresets: [
      {
        id: "dobutamine-250mg-50ml",
        label: "250 mg / 50 mL",
        drugAmount: 250,
        drugAmountUnit: "mg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 5000,
        finalConcentrationUnit: "mcg/mL",
        note: "Common inotrope syringe example"
      }
    ],
    references: ["infusion_dobutamine_dailymed"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "milrinone",
    name: "Milrinone",
    concentration: 200,
    concentrationUnit: "mcg/mL",
    referenceDoses: [0.125, 0.25, 0.375, 0.5, 0.75],
    referenceRange: {
      min: 0.125,
      max: 0.75,
      unit: "mcg/kg/min"
    },
    notes: "Loading and maintenance should be interpreted separately if needed.",
    dilutionPresets: [
      {
        id: "milrinone-10mg-50ml",
        label: "10 mg / 50 mL",
        drugAmount: 10,
        drugAmountUnit: "mg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 200,
        finalConcentrationUnit: "mcg/mL",
        note: "Example only"
      }
    ],
    references: ["infusion_milrinone_dailymed"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "isoproterenol",
    name: "Isoproterenol",
    concentration: 4,
    concentrationUnit: "mcg/mL",
    referenceDoses: [0.01, 0.02, 0.05, 0.1, 0.2],
    referenceRange: {
      min: 0.01,
      max: 0.2,
      unit: "mcg/kg/min"
    },
    notes: "High-alert drug; verify pump setup carefully.",
    dilutionPresets: [
      {
        id: "isoproterenol-200mcg-50ml",
        label: "200 mcg / 50 mL",
        drugAmount: 200,
        drugAmountUnit: "mcg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 4,
        finalConcentrationUnit: "mcg/mL",
        note: "Example only"
      }
    ],
    references: ["infusion_isoproterenol_dailymed"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "remifentanil",
    name: "Remifentanil",
    concentration: 50,
    concentrationUnit: "mcg/mL",
    referenceDoses: [0.05, 0.1, 0.15, 0.2, 0.25],
    referenceRange: {
      min: 0.05,
      max: 0.3,
      unit: "mcg/kg/min"
    },
    notes: "Potent ultra-short acting opioid. Ensure continuous infusion line patency.",
    dilutionPresets: [
      {
        id: "remi-2mg-40ml",
        label: "2 mg / 40 mL",
        drugAmount: 2,
        drugAmountUnit: "mg",
        finalVolume: 40,
        finalVolumeUnit: "mL",
        finalConcentration: 50,
        finalConcentrationUnit: "mcg/mL",
        note: "Common remifentanil dilution"
      }
    ],
    references: ["infusion_remifentanil_dailymed"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-15"
    }
  },
  {
    id: "propofol",
    name: "Propofol (TIVA)",
    concentration: 10000,
    concentrationUnit: "mcg/mL",
    referenceDoses: [25, 50, 75, 100, 150],
    referenceRange: {
      min: 25,
      max: 200,
      unit: "mcg/kg/min"
    },
    notes: "TIVA continuous infusion mode. Standard 1% emulsion is 10 mg/mL (10,000 mcg/mL).",
    dilutionPresets: [
      {
        id: "propofol-10mg-ml",
        label: "1% (10 mg/mL) neat",
        drugAmount: 500,
        drugAmountUnit: "mg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 10000,
        finalConcentrationUnit: "mcg/mL",
        note: "Neat 1% emulsion"
      }
    ],
    references: ["infusion_propofol_dailymed"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-15"
    }
  },
  {
    id: "esmolol",
    name: "Esmolol",
    concentration: 10000,
    concentrationUnit: "mcg/mL",
    referenceDoses: [50, 100, 150, 200, 300],
    referenceRange: {
      min: 50,
      max: 300,
      unit: "mcg/kg/min"
    },
    notes: "Ultra-short acting beta blocker. Titrate to heart rate and blood pressure.",
    dilutionPresets: [
      {
        id: "esmolol-2500mg-250ml",
        label: "2500 mg / 250 mL",
        drugAmount: 2500,
        drugAmountUnit: "mg",
        finalVolume: 250,
        finalVolumeUnit: "mL",
        finalConcentration: 10000,
        finalConcentrationUnit: "mcg/mL",
        note: "Pre-mixed bag standard"
      }
    ],
    references: ["infusion_esmolol_dailymed"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-15"
    }
  },
  {
    id: "dexmedetomidine",
    name: "Dexmedetomidine",
    concentration: 4,
    concentrationUnit: "mcg/mL",
    referenceDoses: [0.2, 0.4, 0.6, 0.8, 1.0],
    referenceRange: {
      min: 0.2,
      max: 1.4,
      unit: "mcg/kg/hr",
      timeUnit: "hr",
      weightBased: true
    },
    notes: "Alpha-2 agonist. Dosed in mcg/kg/hr. Use caution if using loading doses.",
    dilutionPresets: [
      {
        id: "dex-200mcg-50ml",
        label: "200 mcg / 50 mL",
        drugAmount: 200,
        drugAmountUnit: "mcg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 4,
        finalConcentrationUnit: "mcg/mL",
        note: "Standard 4 mcg/mL infusion"
      }
    ],
    references: ["infusion_dexmedetomidine_dailymed"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-15"
    }
  }
];

const PEDIATRIC_DRUG_PRESETS = [
  {
    id: "fentanyl",
    name: "Fentanyl",
    category: "opioid",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mcg/kg",
        doseAmountUnit: "mcg",
        recommendedRange: {
          min: 1,
          max: 2
        },
        concentration: {
          value: 50,
          unit: "mcg/mL"
        },
        notes: "Example bolus preset for procedural or intraoperative use. Titrate to context.",
        ageGuidance: {
          default: {
            note: "Weight-based bolus estimate for general pediatric use.",
            warning: "Opioids may require additional caution in younger patients."
          },
          neonate: {
            note: "Neonates may have greater sensitivity and slower clearance.",
            warning: "Use age-specific adjustment and close monitoring."
          },
          infant: {
            note: "Infants may require cautious titration based on response.",
            warning: "Verify local pediatric opioid protocol."
          }
        },
        references: ["pediatric_fentanyl_dailymed"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "glycopyrrolate-preanesthetic",
    name: "Glycopyrrolate (Preanesthetic)",
    category: "anticholinergic",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.004,
          max: 0.004
        },
        concentration: {
          value: 0.2,
          unit: "mg/mL"
        },
        doseLimits: {
          maxTotalDose: 0.1,
          note: "Example IV/IM single-dose cap from labeling context."
        },
        notes: "Preanesthetic pediatric reference preset only. Reversal pairing with neostigmine/pyridostigmine follows a different use-case and should not be inferred from this weight-based preset.",
        ageGuidance: {
          default: {
            note: "Labeling includes 0.004 mg/kg IM preanesthetic dosing and 0.004 mg/kg IV intraoperative dosing in pediatric patients.",
            warning: "Use-case matters. Preanesthetic, intraoperative bradycardia, and reversal workflows are not interchangeable."
          },
          infant: {
            note: "Labeling notes that infants 1 month to 2 years may require up to 0.009 mg/kg in selected preanesthetic contexts.",
            warning: "If using an infant-specific dose outside 0.004 mg/kg, verify the exact labeled context and institutional protocol."
          },
          neonate: {
            note: "Neonatal handling may differ from older infants and children.",
            warning: "Use neonatal-specific judgment and institutional guidance."
          }
        },
        references: ["pediatric_glycopyrrolate_dailymed"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-15"
        }
      }
    }
  },
  {
    id: "glycopyrrolate-reversal",
    name: "Glycopyrrolate (Reversal pairing)",
    category: "reversal-agent",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.005,
          max: 0.01
        },
        concentration: {
          value: 0.2,
          unit: "mg/mL"
        },
        doseLimits: {
          maxTotalDose: 0.2,
          note: "Quick-reference cap only; reversal pairing should be checked directly."
        },
        notes: "Reference-only placeholder for reversal workflows. Glycopyrrolate reversal dosing should be paired directly with neostigmine or pyridostigmine rather than inferred from a standalone weight-based estimate.",
        ageGuidance: {
          default: {
            note: "Typical pairing references are ratio-based, such as glycopyrrolate 0.2 mg per 1 mg neostigmine or per 5 mg pyridostigmine.",
            warning: "Do not rely on this preset alone for reversal. Verify the actual paired reversal agent dose and local protocol."
          },
          infant: {
            note: "Infants may require extra caution with reversal timing and monitoring.",
            warning: "Verify reversal pairing and pediatric monitoring guidance before use."
          },
          neonate: {
            note: "Routine neonatal reversal workflows may differ from older pediatric practice.",
            warning: "Use neonatal-specific judgment and monitoring."
          }
        },
        references: ["pediatric_glycopyrrolate_dailymed", "pediatric_neostigmine_dailymed"],
        verificationStatus: "off-label",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-15"
        }
      }
    }
  },
  {
    id: "rocuronium",
    name: "Rocuronium",
    category: "neuromuscular-blocker",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.6,
          max: 1.2
        },
        concentration: {
          value: 10,
          unit: "mg/mL"
        },
        notes: "Example intubating dose range. Verify indication and protocol.",
        ageGuidance: {
          default: {
            note: "Weight-based bolus estimate for pediatric neuromuscular blockade.",
            warning: ""
          },
          neonate: {
            note: "Neonatal pharmacodynamics may differ from older children.",
            warning: "Use age-specific clinical judgment and neuromuscular monitoring."
          }
        },
        references: ["pediatric_rocuronium_dailymed"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "sugammadex",
    name: "Sugammadex",
    category: "reversal-agent",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 2,
          max: 4
        },
        concentration: {
          value: 100,
          unit: "mg/mL"
        },
        notes: "Example reversal range only. Actual dose depends on depth of block and monitoring.",
        ageGuidance: {
          default: {
            note: "Interpret dose in the context of neuromuscular monitoring and reversal goal.",
            warning: "Depth-of-block specific dosing may differ from this quick estimate."
          },
          infant: {
            note: "Infants may require extra caution with monitoring and confirmation of recovery.",
            warning: "Verify institutional pediatric reversal protocol."
          },
          neonate: {
            note: "Routine neonatal use may not follow the same assumptions as older children.",
            warning: "Use neonatal-specific guidance and monitoring."
          }
        },
        references: ["pediatric_sugammadex_fda"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "neostigmine",
    name: "Neostigmine",
    category: "reversal-agent",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.04,
          max: 0.07
        },
        concentration: {
          value: 1,
          unit: "mg/mL"
        },
        notes: "Example reversal range only. Pairing with an anticholinergic and monitoring remain essential.",
        ageGuidance: {
          default: {
            note: "Use as a reference estimate alongside neuromuscular monitoring.",
            warning: "Verify pairing agent, timing, and institutional practice."
          },
          neonate: {
            note: "Neonates may not follow routine pediatric reversal assumptions.",
            warning: "Use neonatal-specific judgment and monitoring."
          }
        },
        references: ["pediatric_neostigmine_dailymed"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "pyridostigmine",
    name: "Pyridostigmine",
    category: "reversal-agent",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.1,
          max: 0.25
        },
        concentration: {
          value: 5,
          unit: "mg/mL"
        },
        notes: "Example reversal range only. Confirm local practice and monitoring before use.",
        ageGuidance: {
          default: {
            note: "Weight-based estimate for pediatric reversal workflows.",
            warning: "Verify timing, anticholinergic pairing, and recovery monitoring."
          },
          infant: {
            note: "Infants may require more cautious interpretation of reversal timing.",
            warning: "Check institutional pediatric reversal guidance."
          }
        },
        verificationStatus: "off-label",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "atropine",
    name: "Atropine",
    category: "anticholinergic",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.01,
          max: 0.02
        },
        concentration: {
          value: 0.1,
          unit: "mg/mL"
        },
        doseLimits: {
          maxTotalDose: 0.5,
          note: "Example maximum single dose cap."
        },
        notes: "Use current institutional standards, including any minimum dose rules if applicable.",
        ageGuidance: {
          default: {
            note: "Weight-based estimate only; minimum dose policies may exist locally.",
            warning: "Check institutional guidance for minimum dose handling."
          },
          neonate: {
            note: "Neonates may require extra attention to dilution and minimum dose handling.",
            warning: "Verify neonatal protocol before administration."
          },
          infant: {
            note: "Infants may still be affected by local minimum dose conventions.",
            warning: "Check institutional reference before use."
          }
        },
        references: ["pediatric_atropine_dailymed"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "propofol",
    name: "Propofol",
    category: "hypnotic",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 1,
          max: 3
        },
        concentration: {
          value: 10,
          unit: "mg/mL"
        },
        notes: "Example bolus range only. Sedation and induction workflows may use different targets.",
        ageGuidance: {
          default: {
            note: "Use clinical context to distinguish sedation from induction dosing.",
            warning: "Hemodynamic response and airway risk should be considered."
          },
          infant: {
            note: "Infants may have different sensitivity and airway considerations.",
            warning: "Use cautious titration and verify local protocol."
          },
          neonate: {
            note: "Neonatal practice may differ substantially from older children.",
            warning: "Use neonatal-specific guidance."
          }
        },
        references: ["pediatric_propofol_dailymed"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "ketamine",
    name: "Ketamine",
    category: "dissociative",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 1,
          max: 2
        },
        concentration: {
          value: 10,
          unit: "mg/mL"
        },
        notes: "Example IV bolus range only. Sedation, analgesia, and induction goals may differ.",
        ageGuidance: {
          default: {
            note: "Interpret in the context of intended depth and adjunct medications.",
            warning: "Verify sedation pathway and local pediatric guidance."
          },
          infant: {
            note: "Younger infants may require more cautious airway and recovery planning.",
            warning: "Use age-specific clinical judgment."
          }
        },
        references: ["pediatric_ketamine_dailymed"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "thiopental",
    name: "Thiopental",
    category: "hypnotic",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 3,
          max: 5
        },
        concentration: {
          value: 25,
          unit: "mg/mL"
        },
        notes: "Example induction range only. Availability and local workflow may vary.",
        ageGuidance: {
          default: {
            note: "Use as a quick reference only and confirm institutional familiarity.",
            warning: "Check formulation strength and local protocol."
          },
          neonate: {
            note: "Neonatal handling may differ from standard pediatric assumptions.",
            warning: "Use neonatal-specific guidance."
          }
        },
        verificationStatus: "unverified",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "ondansetron",
    name: "Ondansetron",
    category: "antiemetic",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.1,
          max: 0.15
        },
        concentration: {
          value: 2,
          unit: "mg/mL"
        },
        doseLimits: {
          maxTotalDose: 4,
          note: "Example maximum single dose cap."
        },
        notes: "Example antiemetic dose range only. Verify age- and indication-specific guidance.",
        ageGuidance: {
          default: {
            note: "Weight-based estimate for common pediatric antiemetic use.",
            warning: ""
          },
          neonate: {
            note: "Neonatal use may not follow the same routine assumptions as older children.",
            warning: "Verify neonatal appropriateness and protocol."
          }
        },
        references: ["pediatric_ondansetron_dailymed"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "dexamethasone",
    name: "Dexamethasone",
    category: "steroid",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.1,
          max: 0.15
        },
        concentration: {
          value: 4,
          unit: "mg/mL"
        },
        notes: "Example perioperative antiemetic or airway edema reference range only.",
        ageGuidance: {
          default: {
            note: "Indication-specific practice may differ between antiemetic and airway use.",
            warning: "Verify indication-specific institutional guidance."
          },
          infant: {
            note: "Infants may require more careful indication-based interpretation.",
            warning: "Check local pediatric anesthesia protocol."
          },
          neonate: {
            note: "Routine neonatal use may not follow standard pediatric assumptions.",
            warning: "Verify neonatal appropriateness before use."
          }
        },
        verificationStatus: "off-label",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  }
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
  const allowedModes = ["dose-to-rate", "rate-to-dose", "reference-table"];
  return allowedModes.includes(value) ? value : "dose-to-rate";
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

function normalizeSingleDrugState(rawState) {
  const fallback = createDefaultSingleDrugState();
  const source = rawState && typeof rawState === "object" ? rawState : {};
  const rawInputs = source.inputs && typeof source.inputs === "object" ? source.inputs : {};
  const rawDrugSettings = source.drugSettings && typeof source.drugSettings === "object" ? source.drugSettings : {};

  const normalizedDrugSettings = {};

  Object.keys(fallback.drugSettings).forEach(function (drugId) {
    normalizedDrugSettings[drugId] = normalizeDrugSetting(rawDrugSettings[drugId], fallback.drugSettings[drugId]);
  });

  return {
    selectedDrugId: sanitizeSelectedDrugId(source.selectedDrugId),
    activeMode: sanitizeActiveMode(source.activeMode),
    favoriteDrugIds: normalizeQuickDrugIds(source.favoriteDrugIds),
    recentDrugIds: normalizeQuickDrugIds(source.recentDrugIds),
    inputs: {
      weight: sanitizeString(rawInputs.weight, fallback.inputs.weight),
      targetDose: sanitizeString(rawInputs.targetDose, fallback.inputs.targetDose),
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
    targetDose: String(defaultTargetDose)
  };
}

function createDefaultInfusionWorkspaceState() {
  return {
    activeView: "single-drug",
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

  return {
    cardId: sanitizeString(source.cardId, fallback.cardId),
    selectedDrugId: sanitizeSelectedDrugId(source.selectedDrugId),
    concentration: sanitizeString(source.concentration, fallback.concentration),
    targetDose: sanitizeString(source.targetDose, fallback.targetDose)
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
  return ["dosing", "airway"].includes(value) ? value : "dosing";
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
    activeMode: sanitizeActiveMode(getActiveInfusionMode())
  };
}

function readSingleDrugInputsFromView() {
  return {
    weight: inputs.weight.value,
    targetDose: inputs.targetDose.value,
    pumpRate: inputs.pumpRate.value
  };
}

function readDrugSettingsFromView(drugId) {
  return {
    concentration: inputs.concentration.value,
    referenceDoseList: inputs.referenceDoseList.value,
    customDrugName: inputs.customDrugName.value,
    customDrugNotes: inputs.customDrugNotes.value
  };
}

function createSingleDrugStateFromView(baseState) {
  const source = normalizeSingleDrugState(baseState);
  const selection = readSingleDrugSelectionFromView();
  const viewInputs = readSingleDrugInputsFromView();

  return {
    selectedDrugId: selection.selectedDrugId,
    activeMode: selection.activeMode,
    favoriteDrugIds: source.favoriteDrugIds,
    recentDrugIds: source.recentDrugIds,
    inputs: viewInputs,
    drugSettings: {
      ...source.drugSettings,
      [selection.selectedDrugId]: readDrugSettingsFromView(selection.selectedDrugId)
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

function getCurrentInfusionCardState() {
  return createInfusionCardStateFromView({
    cardId: "single-drug-card",
    singleDrug: getSingleDrugState()
  });
}

function applySingleDrugStateToView(singleDrugState) {
  const normalizedState = normalizeSingleDrugState(singleDrugState);
  const currentDrugSettings = normalizedState.drugSettings[normalizedState.selectedDrugId];

  drugSelect.value = normalizedState.selectedDrugId;
  inputs.weight.value = normalizedState.inputs.weight;
  inputs.targetDose.value = normalizedState.inputs.targetDose;
  inputs.pumpRate.value = normalizedState.inputs.pumpRate;
  inputs.concentration.value = currentDrugSettings.concentration;
  inputs.referenceDoseList.value = currentDrugSettings.referenceDoseList;
  inputs.customDrugName.value = currentDrugSettings.customDrugName;
  inputs.customDrugNotes.value = currentDrugSettings.customDrugNotes;
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
    container.innerHTML = '<span class="helper-text">No drugs yet</span>';
    return;
  }

  container.innerHTML = drugIds.map(function (drugId) {
    const preset = getDrugPresetById(drugId);
    if (container === recentDrugsContainer) {
      return `<span class="quick-drug-chip"><button type="button" class="chip-button" data-quick-drug-id="${drugId}">${preset.name}</button><button type="button" class="quick-drug-remove" data-remove-quick-drug-id="${drugId}" aria-label="Remove ${preset.name} from recent">x</button></span>`;
    }

    return `<button type="button" class="chip-button" data-quick-drug-id="${drugId}">${preset.name}</button>`;
  }).join("");
}

function updateQuickDrugUI() {
  const selectedDrugId = drugSelect.value;
  const isFavorite = getFavoriteDrugIds().includes(selectedDrugId);

  favoriteDrugButton.textContent = isFavorite ? "Remove favorite" : "Add to favorites";
  favoriteDrugButton.classList.toggle("is-active", isFavorite);
  favoriteDrugButton.disabled = selectedDrugId === "custom";
  renderQuickDrugButtons(favoriteDrugsContainer, getFavoriteDrugIds());
  renderQuickDrugButtons(recentDrugsContainer, getRecentDrugIds());
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
    ? "Hide unverified presets"
    : "Show unverified presets";
  pediatricDrugSelect.value = getPediatricSelectValueFromState(normalizedState);
  pediatricInputs.weight.value = normalizedState.inputs.weight;
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
  infusionModeTabs.forEach(function (tab) {
    const isActive = tab.dataset.infusionModeTab === modeId;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  infusionModePanels.forEach(function (panel) {
    const isActive = panel.dataset.infusionModePanel === modeId;
    panel.classList.toggle("hidden", !isActive);
  });

  updateSingleDrugState({
    activeMode: sanitizeActiveMode(modeId)
  });
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

  if (multiDrugWarning) {
    multiDrugWarning.classList.toggle("hidden", normalizedViewId !== "workspace");
  }

  updateInfusionWorkspaceState({
    activeView: normalizedViewId
  });
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

  customDrugFields.classList.toggle("hidden", !isCustomDrug);
  presetSummary.classList.remove("hidden");

  inputs.concentration.value = currentSettings.concentration || String(selectedDrug.concentration);
  inputs.referenceDoseList.value = currentSettings.referenceDoseList || formatList(selectedDrug.referenceDoses);
  inputs.customDrugName.value = isCustomDrug ? currentSettings.customDrugName : "";
  inputs.customDrugNotes.value = isCustomDrug ? currentSettings.customDrugNotes : "";

  concentrationUnitLabel.textContent = selectedDrug.concentrationUnit || "mcg/mL";
  doseUnitLabel.textContent = selectedDrug.referenceRange.unit || "mcg/kg/min";

  if (savedDoseList) {
    referenceRangeText.textContent = `${Math.min.apply(null, savedDoseList)} - ${Math.max.apply(null, savedDoseList)} ${selectedDrug.referenceRange.unit}`;
  } else if (selectedDrug.referenceRange.min > 0 || selectedDrug.referenceRange.max > 0) {
    referenceRangeText.textContent = `${selectedDrug.referenceRange.min} - ${selectedDrug.referenceRange.max} ${selectedDrug.referenceRange.unit}`;
  } else {
    referenceRangeText.textContent = "Custom reference values";
  }

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
  drugSourceText.textContent = selectedDrug.metadata.source || "-";
  drugLastReviewedText.textContent = selectedDrug.metadata.lastReviewed || "-";
  drugHelp.textContent = isCustomDrug
    ? "Custom drug를 선택했습니다. 이름, 농도, Reference Dosing Table 값을 자유롭게 입력하세요."
    : `${selectedDrug.name} preset이 적용되었습니다. 농도와 Reference Dosing Table 값은 필요하면 수정할 수 있습니다.`;
  updateQuickDrugUI();
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
  pediatricAgeNoteText.textContent = ageGuidance ? ageGuidance.note : "No specific age-group note provided.";
  pediatricConcentrationText.textContent = `${pediatricInputs.concentration.value} ${pediatricProfile.concentration.unit}`;
  pediatricVerificationText.textContent = verificationConfig.summary;
  pediatricNotesText.textContent = `${pediatricProfile.notes}${doseLimitNote} / ${pediatricProfile.metadata.source}`;
  pediatricConcentrationUnitLabel.textContent = pediatricProfile.concentration.unit;
  pediatricSaveCustomButton.classList.toggle("hidden", !isCustomDrug);
  pediatricDeleteCustomButton.classList.toggle("hidden", !activeSavedCustomDrugId);
  pediatricSaveCustomButton.textContent = activeSavedCustomDrugId ? "Update saved drug" : "Save custom drug";
  pediatricCustomSaveHelp.classList.toggle("hidden", !isCustomDrug);
  pediatricCustomSaveHelp.textContent = activeSavedCustomDrugId
    ? "현재 저장된 custom drug를 편집 중입니다. 이름을 바꿔도 같은 저장 항목이 업데이트됩니다."
    : "Save custom drug를 누르면 현재 입력값이 로컬에 저장됩니다.";
  pediatricAgeWarning.textContent = ageGuidance && ageGuidance.warning
    ? ageGuidance.warning
    : "Weight-based estimate only. Neonates, infants, and selected drugs may require age-specific adjustment.";
  pediatricDrugHelp.textContent = isCustomDrug
    ? "Custom pediatric drug를 선택했습니다. 이름, dose range, unit, concentration을 직접 입력하세요."
    : `${selectedDrug.name} pediatric bolus preset이 적용되었습니다. 체중과 농도는 필요하면 수정할 수 있습니다.`;
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

  if (["nitroglycerin"].includes(drugId)) {
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
  const sharedWeight = Number(workspaceState.sharedWeight);
  const hasReachedWorkspaceCardLimit = workspaceState.cards.length >= 6;

  workspaceSharedWeightInput.value = workspaceState.sharedWeight;
  workspaceTemplateNameInput.value = "";
  workspaceTemplateNoteInput.value = "";
  workspaceTemplateSelect.innerHTML = templates.length
    ? `<option value="">Select template</option>${templates.map(function (template) {
      return `<option value="${template.id}" ${template.id === workspaceState.selectedTemplateId ? "selected" : ""}>${template.name}</option>`;
    }).join("")}`
    : `<option value="">No saved templates</option>`;
  workspaceLoadTemplateButton.disabled = !templates.length || !workspaceState.selectedTemplateId;
  workspaceDeleteTemplateButton.disabled = !templates.length || !workspaceState.selectedTemplateId;
  workspaceAddCardButton.disabled = hasReachedWorkspaceCardLimit;
  workspaceAddCardButton.title = hasReachedWorkspaceCardLimit
    ? "Maximum 6 drug cards"
    : "Add another drug card";
  workspaceHelp.textContent = isPositiveNumber(sharedWeight)
    ? `Current shared weight: ${formatNumber(sharedWeight, 1)} kg. Each card is calculated independently using the same patient weight.`
    : "Shared weight를 입력하면 각 infusion card의 target dose를 같은 환자 기준으로 계산할 수 있습니다.";

  if (workspaceState.selectedTemplateId) {
    const selectedTemplate = templates.find(function (template) {
      return template.id === workspaceState.selectedTemplateId;
    });

    if (selectedTemplate) {
      workspaceTemplateNameInput.value = selectedTemplate.name;
      workspaceTemplateNoteInput.value = selectedTemplate.note;
      
      let helpText = `Loaded template: ${selectedTemplate.name}.`;
      if (selectedTemplate.note) {
        helpText += ` (Note: ${selectedTemplate.note})`;
      }
      workspaceHelp.textContent = `${workspaceHelp.textContent} ${helpText}`;
    }
  }

  if (hasReachedWorkspaceCardLimit) {
    workspaceHelp.textContent = `${workspaceHelp.textContent} Workspace card는 최대 6개까지 추가할 수 있습니다.`;
  }

  workspaceCardList.innerHTML = workspaceState.cards.map(function (card, index) {
    const preset = getDrugPresetById(card.selectedDrugId);
    const drugCategory = getInfusionDrugCategory(card.selectedDrugId);
    const concentration = Number(card.concentration);
    const targetDose = Number(card.targetDose);
    const hasReadyCalculation = isPositiveNumber(sharedWeight) && isPositiveNumber(concentration) && isPositiveNumber(targetDose);
    const targetRate = hasReadyCalculation ? doseToRate(sharedWeight, concentration, targetDose, preset.referenceRange ? preset.referenceRange.timeUnit : "min") : null;
    const isOutOfRange = hasReadyCalculation && !isWithinReferenceRange(targetDose, preset.referenceRange);
    const dilutionPreset = preset.dilutionPresets[0] || null;
    const optionMarkup = DRUG_PRESETS.map(function (drugPreset) {
      return `<option value="${drugPreset.id}" ${drugPreset.id === card.selectedDrugId ? "selected" : ""}>${drugPreset.name}</option>`;
    }).join("");

    return `
      <article class="workspace-card is-${drugCategory.key}" data-workspace-card-id="${card.cardId}">
        <div class="workspace-card-header">
          <div>
            <h3 class="workspace-card-title">${index + 1}. ${preset.name}</h3>
            <p class="workspace-card-meta">${formatNumber(concentration, 1)} ${preset.concentrationUnit} / ${preset.metadata.source} / Last reviewed ${preset.metadata.lastReviewed}</p>
            <div class="workspace-card-tag-row">
              <span class="workspace-card-tag is-${drugCategory.key}">${drugCategory.label}</span>
            </div>
          </div>
          <div class="quick-drug-list">
            <button
              type="button"
              class="chip-button chip-button-secondary"
              data-move-workspace-card-up="${card.cardId}"
              ${index === 0 ? "disabled" : ""}
            >
              Move up
            </button>
            <button
              type="button"
              class="chip-button chip-button-secondary"
              data-move-workspace-card-down="${card.cardId}"
              ${index === workspaceState.cards.length - 1 ? "disabled" : ""}
            >
              Move down
            </button>
            <button
              type="button"
              class="chip-button chip-button-secondary"
              data-remove-workspace-card-id="${card.cardId}"
              ${workspaceState.cards.length === 1 ? "disabled" : ""}
            >
              Remove
            </button>
          </div>
        </div>

        <div class="form-grid">
          <label class="field">
            <span class="field-label">Drug</span>
            <div class="select-row">
              <select data-workspace-field="selectedDrugId" data-workspace-card-id="${card.cardId}">
                ${optionMarkup}
              </select>
            </div>
          </label>

          <label class="field">
            <span class="field-label">Concentration</span>
            <div class="input-row">
              <input data-workspace-field="concentration" data-workspace-card-id="${card.cardId}" type="number" inputmode="decimal" step="any" value="${card.concentration}">
              <span class="unit">${preset.concentrationUnit}</span>
            </div>
          </label>

          <label class="field">
            <span class="field-label">Target Dose</span>
            <div class="input-row">
              <input data-workspace-field="targetDose" data-workspace-card-id="${card.cardId}" type="number" inputmode="decimal" step="any" value="${card.targetDose}">
              <span class="unit">${preset.referenceRange.unit}</span>
            </div>
          </label>
        </div>

        <div class="workspace-card-result ${isOutOfRange ? "is-warning" : ""}">
          <p class="workspace-card-rate ${isOutOfRange ? "is-warning is-out-of-range" : ""}">
            ${hasReadyCalculation ? `${formatNumber(targetRate, 2)} mL/hr` : "Enter shared weight and valid card values"}
          </p>
          <p class="workspace-card-context">
            ${hasReadyCalculation
              ? `Target <span class="${isOutOfRange ? "is-out-of-range" : ""}">${formatNumber(targetDose, 3)} ${preset.referenceRange.unit}</span> at ${formatNumber(concentration, 1)} ${preset.concentrationUnit}`
              : `Reference range ${preset.referenceRange.min} - ${preset.referenceRange.max} ${preset.referenceRange.unit}`}
          </p>
          ${isOutOfRange ? `<p class="workspace-card-warning">Outside reference range - verify institutional protocol.</p>` : ""}
        </div>

        <p class="workspace-card-reference-note">
          Reference range: ${preset.referenceRange.min} - ${preset.referenceRange.max} ${preset.referenceRange.unit}. Standard dilution: ${formatDilutionPreset(preset.dilutionPresets[0] || null)}.
        </p>

        <div class="quick-drug-actions">
          <button
            type="button"
            class="chip-button chip-button-secondary"
            data-apply-workspace-dilution="${card.cardId}"
            ${dilutionPreset ? "" : "disabled"}
            title="${dilutionPreset ? "Apply standard dilution concentration" : "No standard dilution preset available"}"
          >
            Apply standard dilution
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
  return {
    mode: getActiveInfusionMode(),
    weight: Number(inputs.weight.value),
    concentration: Number(inputs.concentration.value),
    targetDose: Number(inputs.targetDose.value),
    pumpRate: Number(inputs.pumpRate.value),
    referenceDoseList: parseDoseList(inputs.referenceDoseList.value),
    drug: getSelectedDrugDefinition()
  };
}

function validateInfusionValues(values) {
  if (!isPositiveNumber(values.weight)) {
    return "Patient Weight must be a number greater than 0.";
  }

  if (!isPositiveNumber(values.concentration)) {
    return "Drug Concentration must be a number greater than 0.";
  }

  if (drugSelect.value === "custom" && inputs.customDrugName.value.trim() === "") {
    return "Custom Drug Name을 입력해 주세요.";
  }

  if (values.mode === "dose-to-rate" && !isPositiveNumber(values.targetDose)) {
    return "Target Dose must be a number greater than 0.";
  }

  if (values.mode === "rate-to-dose" && !isPositiveNumber(values.pumpRate)) {
    return "Pump Rate must be a number greater than 0.";
  }

  if (values.mode === "reference-table" && !values.referenceDoseList) {
    return "Reference Dose List에 0보다 큰 숫자를 쉼표로 구분해 입력해 주세요.";
  }

  return "";
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
      return "ETT guide requires Age greater than 0.";
    }

    if (values.deviceCategory === "supraglottic" && !isPositiveNumber(values.weight)) {
      return "Supraglottic guide requires Weight greater than 0.";
    }

    if (["oral-airway", "nasal-airway", "laryngoscope", "face-mask"].includes(values.deviceCategory)
      && !isPositiveNumber(values.ageYears)
      && !isPositiveNumber(values.weight)) {
      return "Oral Airway, Nasal Airway, Laryngoscope, and Face Mask guides require Age or Weight.";
    }

    return "";
  }

  if (!isPositiveNumber(values.weight)) {
    return "Patient Weight must be a number greater than 0.";
  }

  if (!isPositiveNumber(values.concentration)) {
    return "Drug Concentration must be a number greater than 0.";
  }

  if (isCustomPediatricSelection(pediatricDrugSelect.value)) {
    if (pediatricInputs.customDrugName.value.trim() === "") {
      return "Custom Drug Name is required.";
    }

    if (!isPositiveNumber(Number(pediatricInputs.minDosePerKg.value)) || !isPositiveNumber(Number(pediatricInputs.maxDosePerKg.value))) {
      return "Custom dose range must contain numbers greater than 0.";
    }

    if (Number(pediatricInputs.maxDosePerKg.value) < Number(pediatricInputs.minDosePerKg.value)) {
      return "Max Dose per kg must be greater than or equal to Min Dose per kg.";
    }

    if (getUnitBase(pediatricInputs.concentrationUnit.value) !== getUnitBase(pediatricInputs.doseUnit.value)) {
      return "Dose Unit and Concentration Unit should use the same base unit for volume calculation.";
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
    return "Patient Weight must be a number greater than 0.";
  }

  if (!isPositiveNumber(values.initialDoseMgKg)) {
    return "Initial dose target must be a number greater than 0.";
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
  resultLabel.textContent = "Calculation Result";
  primaryResult.textContent = "0.00 mL/hr";
  primaryResult.classList.remove("is-warning");
  secondaryResultLabel.textContent = "Supporting information";
  secondaryResult.textContent = "-";
  secondaryResult.classList.remove("is-warning");
  concentrationResult.textContent = "";
  concentrationExplanation.textContent = "";
  rateExplanation.textContent = "";
  infusionReferenceList.innerHTML = "";
  referenceTableCaption.textContent = "-";
  referenceTableBody.innerHTML = "";
  resultWarning.textContent = "계산 결과는 참고용입니다. 실제 사용 전 반드시 별도로 검증해야 합니다.";
}

function clearPediatricResult() {
  pediatricResultCard.classList.add("hidden");
  pediatricResultLabel.textContent = "Pediatric Dosing Result";
  pediatricPrimaryResult.textContent = "0.00 - 0.00";
  pediatricSecondaryResultLabel.textContent = "Calculated dose range";
  pediatricSecondaryResult.textContent = "-";
  pediatricConcentrationResult.textContent = "";
  pediatricDoseExplanation.textContent = "";
  pediatricVolumeExplanation.textContent = "";
  pediatricVerificationText.textContent = "-";
  pediatricDoseReferenceList.innerHTML = "";
  pediatricResultWarning.textContent = "Pediatric dosing examples are for reference only. Verify before clinical use.";
  pediatricAirwayResultCard.classList.add("hidden");
  pediatricAirwayPrimaryResult.textContent = "-";
  pediatricAirwaySecondaryLabel.textContent = "Estimated oral depth (from lip)";
  pediatricAirwaySecondaryResult.textContent = "-";
  pediatricAirwayContext.textContent = "";
  pediatricAirwayDeviceResult.textContent = "";
  pediatricAirwaySizeExplanation.textContent = "";
  pediatricAirwayDepthExplanation.textContent = "";
  pediatricAirwayReferenceList.innerHTML = "";
  pediatricAirwayResultWarning.textContent = "Airway estimates are reference formulas only. Confirm tube fit, leak, depth, and position clinically.";
  pediatricAirwayWarning.textContent = getPediatricAirwayWarningText(pediatricInputs.airwayDeviceCategory.value);
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
  dantroleneResultWarning.textContent = "Verify institutional MH protocol, redosing plan, and emergency workflow.";
}

function renderReferenceRows(rows, doseUnit) {
  referenceTableBody.innerHTML = rows.map(function (row) {
    return `
      <tr class="${row.isOutOfRange ? "is-warning" : ""}">
        <td>${formatNumber(row.dose, 3)} ${doseUnit}</td>
        <td>${formatNumber(row.rate, 2)} mL/hr</td>
      </tr>
    `;
  }).join("");
}

function showDoseToRateResult(values) {
  const rate = doseToRate(values.weight, values.concentration, values.targetDose, values.drug.referenceRange ? values.drug.referenceRange.timeUnit : "min");
  const doseUnit = values.drug.referenceRange.unit || "mcg/kg/min";
  const concentrationUnit = values.drug.concentrationUnit || "mcg/mL";
  const isOutOfRange = !isWithinReferenceRange(values.targetDose, values.drug.referenceRange);
  const referenceIds = getInfusionReferenceIds(values);

  resultLabel.textContent = "Dose -> Infusion Rate";
  primaryResult.textContent = `${formatNumber(rate, 2)} mL/hr`;
  secondaryResultLabel.textContent = "Target dose";
  secondaryResult.textContent = `${formatNumber(values.targetDose, 3)} ${doseUnit}`;
  concentrationResult.textContent = `${values.drug.name} / ${formatNumber(values.concentration, 2)} ${concentrationUnit} / ${formatNumber(values.weight, 1)} kg`;
  concentrationExplanation.textContent = `농도 입력: ${formatNumber(values.concentration, 2)} ${concentrationUnit}를 사용했습니다.`;
  rateExplanation.textContent = `주입 속도 계산: (${formatNumber(values.targetDose, 3)} x ${formatNumber(values.weight, 1)} x 60) / ${formatNumber(values.concentration, 2)} = ${formatNumber(rate, 2)} mL/hr`;
  renderReferenceList(infusionReferenceList, referenceIds);
  resultCard.classList.toggle("is-warning", isOutOfRange);
  primaryResult.classList.toggle("is-warning", isOutOfRange);
  primaryResult.classList.toggle("is-out-of-range", isOutOfRange);
  secondaryResult.classList.toggle("is-warning", isOutOfRange);
  secondaryResult.classList.toggle("is-out-of-range", isOutOfRange);
  resultWarning.textContent = isOutOfRange
    ? "Outside preset reference range - verify institutional protocol before use."
    : "Reference dose values and ranges are informational only. Verify with institutional protocols.";
  resultCard.classList.remove("hidden");
}

function showRateToDoseResult(values) {
  const dose = rateToDose(values.weight, values.concentration, values.pumpRate, values.drug.referenceRange ? values.drug.referenceRange.timeUnit : "min");
  const doseUnit = values.drug.referenceRange.unit || "mcg/kg/min";
  const concentrationUnit = values.drug.concentrationUnit || "mcg/mL";
  const isOutOfRange = !isWithinReferenceRange(dose, values.drug.referenceRange);
  const referenceIds = getInfusionReferenceIds(values);

  resultLabel.textContent = "Infusion Rate -> Dose";
  primaryResult.textContent = `${formatNumber(dose, 3)} ${doseUnit}`;
  secondaryResultLabel.textContent = "Pump rate";
  secondaryResult.textContent = `${formatNumber(values.pumpRate, 2)} mL/hr`;
  concentrationResult.textContent = `${values.drug.name} / ${formatNumber(values.concentration, 2)} ${concentrationUnit} / ${formatNumber(values.weight, 1)} kg`;
  concentrationExplanation.textContent = `농도 입력: ${formatNumber(values.concentration, 2)} ${concentrationUnit}를 사용했습니다.`;
  rateExplanation.textContent = `용량 계산: (${formatNumber(values.pumpRate, 2)} x ${formatNumber(values.concentration, 2)}) / (${formatNumber(values.weight, 1)} x 60) = ${formatNumber(dose, 3)} ${doseUnit}`;
  renderReferenceList(infusionReferenceList, referenceIds);
  resultCard.classList.toggle("is-warning", isOutOfRange);
  primaryResult.classList.toggle("is-warning", isOutOfRange);
  primaryResult.classList.toggle("is-out-of-range", isOutOfRange);
  secondaryResult.classList.toggle("is-warning", isOutOfRange);
  secondaryResult.classList.toggle("is-out-of-range", isOutOfRange);
  resultWarning.textContent = isOutOfRange
    ? "Calculated dose is outside preset reference range - verify institutional protocol and pump settings."
    : "Calculated dose is for reference only. Verify with institutional protocols and pump settings.";
  resultCard.classList.remove("hidden");
}

function showReferenceTableResult(values) {
  const doseList = values.referenceDoseList || values.drug.referenceDoses;
  const rows = buildReferenceTable(values.weight, values.concentration, doseList, values.drug.referenceRange ? values.drug.referenceRange.timeUnit : "min").map(function (row) {
    return {
      ...row,
      isOutOfRange: !isWithinReferenceRange(row.dose, values.drug.referenceRange)
    };
  });
  const doseUnit = values.drug.referenceRange.unit || "mcg/kg/min";
  const concentrationUnit = values.drug.concentrationUnit || "mcg/mL";
  const hasOutOfRangeRow = rows.some(function (row) {
    return row.isOutOfRange;
  });
  const referenceIds = getInfusionReferenceIds(values);

  resultLabel.textContent = "Reference Dosing Table";
  primaryResult.textContent = values.drug.name;
  secondaryResultLabel.textContent = "Setup";
  secondaryResult.textContent = `${formatNumber(values.weight, 1)} kg / ${formatNumber(values.concentration, 2)} ${concentrationUnit}`;
  concentrationResult.textContent = `Reference doses: ${doseList.join(", ")}`;
  concentrationExplanation.textContent = "Reference Dosing Table은 선택한 농도와 체중 기준으로 각 dose에 대응하는 mL/hr를 보여줍니다.";
  rateExplanation.textContent = "표의 모든 행은 동일한 공식으로 계산됩니다: (dose x weight x 60) / concentration.";
  renderReferenceList(infusionReferenceList, referenceIds);
  referenceTableCaption.textContent = `${values.drug.name} / ${formatNumber(values.weight, 1)} kg / ${formatNumber(values.concentration, 2)} ${concentrationUnit}`;
  renderReferenceRows(rows, doseUnit);
  resultCard.classList.toggle("is-warning", hasOutOfRangeRow);
  primaryResult.classList.remove("is-warning");
  secondaryResult.classList.toggle("is-warning", hasOutOfRangeRow);
  referenceTableCard.classList.remove("hidden");
  resultWarning.textContent = hasOutOfRangeRow
    ? "Some reference doses are outside the preset reference range - verify institutional protocol."
    : "Reference Dosing Table is informational only. Verify with institutional protocols.";
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

  pediatricResultLabel.textContent = "Pediatric Weight-Based Bolus";
  pediatricPrimaryResult.textContent = `${formatNumber(adjustedDoseRange.minDose, 2)} - ${formatNumber(adjustedDoseRange.maxDose, 2)} ${values.profile.doseAmountUnit}`;
  pediatricSecondaryResultLabel.textContent = "Recommended dose range";
  pediatricSecondaryResult.textContent = `${values.profile.recommendedRange.min} - ${values.profile.recommendedRange.max} ${values.profile.dosePerKgUnit} / ${values.ageGroup}`;
  pediatricConcentrationResult.textContent = `${values.drug.name} / ${formatNumber(values.weight, 1)} kg / ${formatNumber(values.concentration, 2)} ${values.profile.concentration.unit}`;
  pediatricDoseExplanation.textContent = adjustedDoseRange.wasAdjusted
    ? `Dose calculation: ${formatNumber(values.weight, 1)} kg x ${values.profile.recommendedRange.min}-${values.profile.recommendedRange.max} ${values.profile.dosePerKgUnit} = ${formatNumber(rawDoseRange.minDose, 2)}-${formatNumber(rawDoseRange.maxDose, 2)} ${values.profile.doseAmountUnit}. ${limitMessage}`
    : `Dose calculation: ${formatNumber(values.weight, 1)} kg x ${values.profile.recommendedRange.min}-${values.profile.recommendedRange.max} ${values.profile.dosePerKgUnit} = ${formatNumber(rawDoseRange.minDose, 2)}-${formatNumber(rawDoseRange.maxDose, 2)} ${values.profile.doseAmountUnit}`;
  pediatricVolumeExplanation.textContent = `Optional volume calculation: ${formatNumber(adjustedDoseRange.minDose, 2)}-${formatNumber(adjustedDoseRange.maxDose, 2)} ${values.profile.doseAmountUnit} / ${formatNumber(values.concentration, 2)} ${values.profile.concentration.unit} = ${formatNumber(minVolume, 2)}-${formatNumber(maxVolume, 2)} mL`;
  renderReferenceList(pediatricDoseReferenceList, referenceIds);
  pediatricResultWarning.textContent = adjustedDoseRange.wasAdjusted
    ? `${limitMessage} ${verificationConfig.warning ? `${verificationConfig.warning} ` : ""}${values.ageGuidance && values.ageGuidance.warning ? `${values.ageGuidance.warning} ` : ""}Verify with institutional protocols and current references.`
    : values.ageGuidance && values.ageGuidance.warning
      ? `${verificationConfig.warning ? `${verificationConfig.warning} ` : ""}${values.ageGuidance.warning} Verify with institutional protocols and current references.`
      : verificationConfig.warning
        ? `${verificationConfig.warning} Verify with institutional protocols and current references.`
        : "Pediatric dosing presets are examples only. Verify with institutional protocols and current references.";
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
  const ageText = isPositiveNumber(values.ageYears) ? `${formatNumber(values.ageYears, 1)} yr` : "Age not entered";
  const weightText = isPositiveNumber(values.weight) ? ` / ${formatNumber(values.weight, 1)} kg` : "";
  const isInfantRange = values.ageYears < 1;
  const airwayResultLabel = document.querySelector("#pediatric-airway-result-card .result-label");

  if (airwayResultLabel) {
    airwayResultLabel.textContent = isETTMode
      ? "Pediatric ETT Result"
      : isSupraglotticMode
        ? "Pediatric Supraglottic Result"
        : isOralAirwayMode
        ? "Pediatric Oral Airway Result"
        : isNasalAirwayMode
          ? "Pediatric Nasal Airway Result"
          : isFaceMaskMode
            ? "Pediatric Face Mask Result"
          : "Pediatric Laryngoscope Result";
  }

  pediatricAirwayPrimaryResult.textContent = isETTMode
    ? `Cuffed ${formatNumber(estimates.cuffedSize, 1)} / Uncuffed ${formatNumber(estimates.uncuffedSize, 1)}`
    : isSupraglotticMode
      ? `${SUPRAGLOTTIC_DEVICE_GUIDES[values.deviceModel].label} ${supraglotticRecommendation ? `size ${supraglotticRecommendation.size}` : "reference"}`
      : isOralAirwayMode
        ? (oralAirwayRecommendation ? `Oral airway size ${oralAirwayRecommendation.size} (${oralAirwayRecommendation.length})` : "Oral airway reference")
        : isNasalAirwayMode
          ? "Nasal airway guide"
          : isFaceMaskMode
            ? (faceMaskRecommendation ? `Face mask size ${faceMaskRecommendation.size}` : "Face mask guide")
        : (laryngoscopeRecommendation ? laryngoscopeRecommendation.primaryBlade : "Laryngoscope reference");
  pediatricAirwaySecondaryLabel.textContent = isETTMode
    ? "Estimated oral depth (from lip)"
    : isSupraglotticMode
      ? "Reference weight range"
      : isOralAirwayMode
        ? "Sizing method"
        : isNasalAirwayMode
          ? "Preferred measurement"
          : isFaceMaskMode
            ? "Reference band"
        : "Alternative guide";
  pediatricAirwaySecondaryResult.textContent = isETTMode
    ? `${formatNumber(estimates.oralDepth, 1)} cm from lip`
    : isSupraglotticMode
      ? (supraglotticRecommendation ? `${supraglotticRecommendation.weightRange}` : "Enter weight to show size range")
      : isOralAirwayMode
        ? "Measure mouth corner to angle of mandible"
        : isNasalAirwayMode
          ? "Nostril to tragus minus 10 mm"
          : isFaceMaskMode
            ? (faceMaskRecommendation ? faceMaskRecommendation.label : "Enter age or weight to show size band")
        : (laryngoscopeRecommendation ? laryngoscopeRecommendation.secondaryBlade : "Enter age or weight to show blade guide");
  pediatricAirwayContext.textContent = `Age ${ageText}${weightText}`;
  pediatricAirwayDeviceResult.textContent = isETTMode
    ? "Device category: ETT"
    : isSupraglotticMode
      ? (supraglotticRecommendation
        ? `${supraglotticRecommendation.deviceLabel} reference: size ${supraglotticRecommendation.size} (${supraglotticRecommendation.weightRange}, ${supraglotticRecommendation.sourceLabel})`
        : `Enter weight to show ${SUPRAGLOTTIC_DEVICE_GUIDES[values.deviceModel].label} size reference.`)
      : isOralAirwayMode
        ? (oralAirwayRecommendation
          ? `Reference band: ${oralAirwayRecommendation.label}`
          : "Enter age or weight to show oral airway reference band.")
        : isNasalAirwayMode
          ? (nasalAirwayRecommendation
            ? `Infant depth band: ${nasalAirwayRecommendation.insertionDepth} (${nasalAirwayRecommendation.label})`
            : "Use external measurement first; infant age/weight only gives a rough guide.")
          : isFaceMaskMode
            ? (faceMaskRecommendation
              ? `Reference band: ${faceMaskRecommendation.label}`
              : "Enter age or weight to show face mask guide.")
        : (laryngoscopeRecommendation
          ? `Reference band: ${laryngoscopeRecommendation.label}`
          : "Enter age or weight to show laryngoscope guide.");
  pediatricAirwaySizeExplanation.textContent = isETTMode
    ? `ETT size estimate: uncuffed = age/4 + 4, cuffed = age/4 + 3.5, rounded to available 0.5 mm ID sizes -> ${formatNumber(estimates.uncuffedSize, 1)} / ${formatNumber(estimates.cuffedSize, 1)} mm ID`
    : isSupraglotticMode
      ? `${SUPRAGLOTTIC_DEVICE_GUIDES[values.deviceModel].label} size is selected by manufacturer weight guide rather than age-based formula.`
      : isOralAirwayMode
        ? (oralAirwayRecommendation
          ? `Oral airway quick guide: size ${oralAirwayRecommendation.size} (${oralAirwayRecommendation.length}) is a starting reference for the ${oralAirwayRecommendation.label.toLowerCase()} range.`
          : "Oral airway size is shown as a quick reference only.")
        : isNasalAirwayMode
          ? "Nasopharyngeal airway sizing should start with external measurement rather than age-based formula alone."
          : isFaceMaskMode
            ? (faceMaskRecommendation
              ? `Face mask quick guide: commonly size ${faceMaskRecommendation.size} for the ${faceMaskRecommendation.label.toLowerCase()} range. Manufacturer numbering may differ.`
              : "Face mask sizing is shown as a broad reference only.")
        : (laryngoscopeRecommendation
          ? `Laryngoscope quick guide: ${laryngoscopeRecommendation.primaryBlade} is the first-choice reference for the ${laryngoscopeRecommendation.label.toLowerCase()} range.`
          : "Laryngoscope blade guidance is shown as a quick reference only.");
  pediatricAirwayDepthExplanation.textContent = isETTMode
    ? `${values.ageYears < 2
      ? `Depth estimate: for infants and toddlers under 2 years, this calculator uses the 10-12 cm age progression reference from the lip.`
      : `Depth estimate: oral = age/2 + 12 -> ${formatNumber(estimates.oralDepth, 1)} cm from the lip.`} Tube size x 3 gives an additional cuffed oral depth cross-check of ${formatNumber(estimates.cuffedDepthBySize, 1)} cm. For oral ETT, interpret this as lip depth; if you need tooth depth, use your local labeling convention and confirm clinically.`
    : isSupraglotticMode
      ? `${SUPRAGLOTTIC_DEVICE_GUIDES[values.deviceModel].label} result is a supraglottic airway size reference only. Depth-style ETT formulas do not apply here.`
      : isOralAirwayMode
        ? "Use the oral airway as a starting estimate only, then confirm external fit from the mouth corner to the angle of the mandible and reassess clinically."
        : isNasalAirwayMode
          ? (nasalAirwayRecommendation
            ? `For children younger than 2 years, the attached study reported an approximate insertion depth band of ${nasalAirwayRecommendation.insertionDepth}. Outside infancy, rely more on external measurement and clinical confirmation than on age-only estimates.`
            : "Use nostril-to-tragus style external measurement as the primary guide, then confirm patency and position clinically.")
          : isFaceMaskMode
            ? "Choose the smallest mask that seals nose and mouth without resting on the eyes. Brand-specific numbering and cushion shape vary, so confirm fit clinically."
        : "Blade type and size vary with anatomy, pathology, and operator preference. Straight blades are often preferred in younger infants, while curved blades become more common with larger children.";
  pediatricAirwayResultWarning.textContent = isETTMode
    ? isInfantRange
      ? "Age-based ETT formulas are less reliable in neonates and young infants. Use infant-specific references and confirm clinically."
      : "ETT formulas are reference estimates only. Confirm tube fit, leak, depth, and position clinically."
    : isSupraglotticMode
      ? `${SUPRAGLOTTIC_DEVICE_GUIDES[values.deviceModel].label} sizing is based on manufacturer weight guidance. Verify product-specific instructions and clinical fit.`
      : isOralAirwayMode
        ? "Oral airway size guidance is approximate. Confirm fit externally and reassess airway patency clinically."
        : isNasalAirwayMode
          ? "Nasal airway guidance is approximate and should not replace external measurement, lubrication, gentle insertion, and clinical confirmation."
          : isFaceMaskMode
            ? "Face mask guidance is approximate. Check seal, dead space, eye clearance, and brand-specific numbering before use."
        : "Laryngoscope blade guidance is approximate. Confirm mouth opening, airway anatomy, and operator preference before selection.";
  renderReferenceList(pediatricAirwayReferenceList, referenceIds);
  pediatricAirwayResultCard.classList.remove("hidden");
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
  dantroleneVialExplanation.textContent = `${values.formulation.name} 기준으로 initial dose에는 약 ${initialVials} vial, cumulative 10 mg/kg 준비에는 약 ${maxVials} vial이 필요합니다.`;
  dantroleneReconstitutionExplanation.textContent = `${values.formulation.reconstitution} ${values.formulation.notes}`;
  dantroleneInitialGuide.textContent = `Initial: give ${formatNumber(values.initialDoseMgKg, 2)} mg/kg IV now. Many MH references start with 2.5 mg/kg as the initial treatment dose.`;
  dantroleneRepeatGuide.textContent = "Repeat bolus: if hypermetabolic signs persist or recur, continue repeat boluses. A common emergency reference is to escalate toward a cumulative 10 mg/kg, while some formulations also describe 1 mg/kg repeat bolus after recurrence.";
  dantroleneMaintenanceGuide.textContent = "Maintenance: after initial control, many MH references advise 1 mg/kg IV every 4-6 hours, or an equivalent infusion strategy, for at least 24 hours.";
  renderReferenceList(dantroleneReferenceList, values.formulation.references);
  dantroleneResultWarning.textContent = "Emergency quick reference only. Continue with your institutional MH protocol, redosing plan, cooling, and post-crisis monitoring.";
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

  showReferenceTableResult(values);
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
  clearResult();
  errorMessage.textContent = "";
}

function handleSessionInputChange() {
  commitSingleDrugStateFromView();
  clearResult();
}

function handleDrugSettingsChange() {
  commitSingleDrugStateFromView();
  updateDrugUI();
  clearResult();
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
  clearResult();
  errorMessage.textContent = "";
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
    ? "Saved custom drug updated locally."
    : "Custom drug saved locally.";
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
  pediatricErrorMessage.textContent = "Saved custom drug removed.";
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

function handleWorkspaceAddCard() {
  const workspaceState = getInfusionWorkspaceState();

  if ((workspaceState.cards || []).length >= 6) {
    workspaceHelp.textContent = "Workspace card는 최대 6개까지 추가할 수 있습니다.";
    return;
  }

  updateInfusionWorkspaceState({
    cards: workspaceState.cards.concat(createDefaultInfusionWorkspaceCardState())
  });
  renderInfusionWorkspace();
}

function updateWorkspaceCardState(cardId, field, value) {
  const workspaceState = getInfusionWorkspaceState();
  const updatedCards = workspaceState.cards.map(function (card) {
    if (card.cardId !== cardId) {
      return card;
    }

    if (field === "selectedDrugId") {
      const preset = getDrugPresetById(value);
      return normalizeInfusionWorkspaceCardState({
        ...card,
        selectedDrugId: preset.id,
        concentration: String(preset.concentration),
        targetDose: String(preset.referenceDoses[2] || preset.referenceDoses[0] || card.targetDose)
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

function handleWorkspaceCardClick(event) {
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
    workspaceHelp.textContent = `${preset.name} standard dilution applied: ${formatDilutionPreset(dilutionPreset)}.`;
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

  updateWorkspaceCardState(input.dataset.workspaceCardId, input.dataset.workspaceField, input.value);
}

function handleWorkspaceCardChange(event) {
  const input = event.target.closest("[data-workspace-field]");

  if (!input) {
    return;
  }

  updateWorkspaceCardState(input.dataset.workspaceCardId, input.dataset.workspaceField, input.value);
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
    workspaceHelp.textContent = "Template name을 입력한 뒤 저장해 주세요.";
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
  workspaceHelp.textContent = `Template saved: ${savedTemplate.name}. Saved setups load drug cards only and do not assess interactions.`;
  renderInfusionWorkspace();
}

function handleWorkspaceLoadTemplate() {
  const selectedTemplateId = workspaceTemplateSelect.value;
  const selectedTemplate = getInfusionTemplates().find(function (template) {
    return template.id === selectedTemplateId;
  });

  if (!selectedTemplate) {
    workspaceHelp.textContent = "불러올 template를 먼저 선택해 주세요.";
    return;
  }

  updateInfusionWorkspaceState({
    selectedTemplateId: selectedTemplate.id,
    cards: cloneWorkspaceCards(selectedTemplate.cards)
  });
  workspaceHelp.textContent = `Loaded template: ${selectedTemplate.name}. Shared weight는 현재 환자 기준으로 유지됩니다.`;
  renderInfusionWorkspace();
}

function handleWorkspaceDeleteTemplate() {
  const selectedTemplateId = workspaceTemplateSelect.value;

  if (!selectedTemplateId) {
    workspaceHelp.textContent = "삭제할 template를 먼저 선택해 주세요.";
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
    ? `Deleted template: ${selectedTemplate.name}.`
    : "Template deleted.";
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

infusionViewTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    activateInfusionView(tab.dataset.infusionViewTab);
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
form.addEventListener("submit", handleSubmit);
resetButton.addEventListener("click", resetInfusionForm);
pediatricDrugSelect.addEventListener("change", handlePediatricDrugChange);
pediatricInputs.ageGroup.addEventListener("change", handlePediatricInputChange);
pediatricForm.addEventListener("submit", handlePediatricSubmit);
pediatricResetButton.addEventListener("click", resetPediatricForm);
dantroleneForm.addEventListener("submit", handleDantroleneSubmit);
dantroleneResetButton.addEventListener("click", resetDantroleneForm);
workspaceSharedWeightInput.addEventListener("input", handleWorkspaceSharedWeightChange);
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

      if (!isPositiveNumber(targetConc)) throw new Error("Target concentration must be a positive number.");
      if (!isPositiveNumber(finalVolume)) throw new Error("Final volume must be a positive number.");
      if (!isPositiveNumber(stockConc)) throw new Error("Stock concentration must be a positive number.");

      // Convert target back to mg/mL for calculation base
      const targetConcMg = targetUnit === "mcg" ? targetConc / 1000 : targetConc;
      const totalDrugMgNeeded = targetConcMg * finalVolume;
      
      const stockConcMg = stockUnit === "mcg" ? stockConc / 1000 : stockConc;
      const drawVolume = totalDrugMgNeeded / stockConcMg;

      if (drawVolume > finalVolume) {
        throw new Error("Target concentration is higher than the stock concentration. Dilution impossible.");
      }

      const diluentVolume = finalVolume - drawVolume;

      const formattedDrawVol = Number(drawVolume.toFixed(2));
      const formattedDiluentVol = Number(diluentVolume.toFixed(2));
      const totalDrugDisplay = targetUnit === "mcg" ? (totalDrugMgNeeded * 1000).toFixed(1) + " mcg" : totalDrugMgNeeded.toFixed(2) + " mg";

      dilutionInputs.resultLabel.textContent = "Mixing Instructions";
      dilutionInputs.resultBox2.classList.remove("hidden");
      dilutionInputs.resultTitle1.textContent = "Draw Drug Volume";
      dilutionInputs.resultValue1.textContent = `${formattedDrawVol} mL`;
      dilutionInputs.resultTitle2.textContent = "Add Diluent (NS/D5W)";
      dilutionInputs.resultValue2.textContent = `${formattedDiluentVol} mL`;
      dilutionInputs.summaryHeading.textContent = "Summary";
      dilutionInputs.summaryText.innerHTML = `To achieve <strong>${targetConc} ${targetUnit}/mL</strong> in <strong>${finalVolume} mL</strong> (Total drug: ${totalDrugDisplay}):<br>Draw <strong>${formattedDrawVol} mL</strong> of stock drug and mix with <strong>${formattedDiluentVol} mL</strong> of diluent.`;

    } else if (modeId === "mix-to-conc") {
      const drugAmount = Number(dilutionInputs.reverseDrugAmount.value);
      const drugUnit = dilutionInputs.reverseDrugUnit.value; // "mcg" or "mg"
      const finalVolume = Number(dilutionInputs.reverseFinalVolume.value);

      if (!isPositiveNumber(drugAmount)) throw new Error("Drug amount must be a positive number.");
      if (!isPositiveNumber(finalVolume)) throw new Error("Final volume must be a positive number.");

      const drugAmountMg = drugUnit === "mcg" ? drugAmount / 1000 : drugAmount;
      const finalConcMg = drugAmountMg / finalVolume;
      const finalConcMcg = finalConcMg * 1000;

      const formattedMg = Number(finalConcMg.toFixed(2));
      const formattedMcg = Number(finalConcMcg.toFixed(1));

      dilutionInputs.resultLabel.textContent = "Final Concentration";
      dilutionInputs.resultBox2.classList.add("hidden");
      dilutionInputs.resultTitle1.textContent = "Target Conc.";
      
      if (formattedMg >= 1) {
        dilutionInputs.resultValue1.textContent = `${formattedMg} mg/mL`;
      } else {
        dilutionInputs.resultValue1.textContent = `${formattedMcg} mcg/mL`;
      }

      dilutionInputs.summaryHeading.textContent = "Calculated Result";
      dilutionInputs.summaryText.innerHTML = `Mixing <strong>${drugAmount} ${drugUnit}</strong> in a total volume of <strong>${finalVolume} mL</strong> yields a final concentration of:<br><strong style="font-size: 1.1em; color: var(--primary);">${formattedMg} mg/mL</strong> (or ${formattedMcg} mcg/mL).`;
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

// -----------------------------
// Initial restore
// -----------------------------

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

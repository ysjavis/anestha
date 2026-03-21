import { formatNumber, isPositiveNumber, shouldDeferDecimalInput } from '../calc/utils.js';
import { LOCAL_ANESTHETIC_PRESETS } from '../data/last-presets.js';
import { getLASTQuickState, updateLASTQuickState, normalizeLASTQuickState, createDefaultLASTQuickState, savePersistedState, persistedState } from '../store/state.js';
import { t } from '../i18n.js';
import { renderReferenceList } from '../calc/reference-helpers.js';

// DOM refs
const lastForm = document.getElementById("last-form");
const lastResetButton = document.getElementById("last-reset-button");
const lastErrorMessage = document.getElementById("last-error-message");
const lastResultCard = document.getElementById("last-result-card");
const lastPrimaryResult = document.getElementById("last-primary-result");
const lastDoseBasis = document.getElementById("last-dose-basis");
const lastEpiSection = document.getElementById("last-epi-section");
const lastEpiResult = document.getElementById("last-epi-result");
const lastOnset = document.getElementById("last-onset");
const lastDuration = document.getElementById("last-duration");
const lastSafetySection = document.getElementById("last-safety-section");
const lastSafetyResult = document.getElementById("last-safety-result");
const lastDrugNotes = document.getElementById("last-drug-notes");
const lastReferenceList = document.getElementById("last-reference-list");
const lastGuideReferenceList = document.getElementById("last-guide-reference-list");
const lastResultWarning = document.getElementById("last-result-warning");

const lastInputs = {
  weight: document.getElementById("last-weight"),
  drug: document.getElementById("last-drug"),
  epinephrine: document.getElementById("last-epinephrine"),
  plannedDose: document.getElementById("last-planned-dose")
};

function applyLASTStateToView(lastQuickState) {
  const normalizedState = normalizeLASTQuickState(lastQuickState);

  lastInputs.weight.value = normalizedState.inputs.weight;
  lastInputs.drug.value = normalizedState.inputs.drugId;
  lastInputs.epinephrine.checked = normalizedState.inputs.withEpinephrine;
  lastInputs.plannedDose.value = normalizedState.inputs.plannedDose;
}

function readLASTFormValues() {
  const drug = LOCAL_ANESTHETIC_PRESETS.find(function (item) {
    return item.id === lastInputs.drug.value;
  }) || LOCAL_ANESTHETIC_PRESETS[0];

  return {
    weight: Number(lastInputs.weight.value),
    drug: drug,
    withEpinephrine: lastInputs.epinephrine.checked,
    plannedDose: lastInputs.plannedDose.value.trim() ? Number(lastInputs.plannedDose.value) : null
  };
}

function validateLASTValues(values) {
  if (!isPositiveNumber(values.weight)) {
    return t("validation_last_weight");
  }

  return "";
}

function clearLASTResult() {
  lastResultCard.classList.add("hidden");
  lastPrimaryResult.textContent = "0 mg";
  lastDoseBasis.textContent = "";
  lastEpiSection.classList.add("hidden");
  lastEpiResult.textContent = "-";
  lastOnset.textContent = "-";
  lastDuration.textContent = "-";
  lastSafetySection.classList.add("hidden");
  lastSafetyResult.textContent = "-";
  lastDrugNotes.textContent = "";
  lastReferenceList.innerHTML = "";
  lastResultWarning.textContent = t("last_result_warning");
}

function showLASTResult(values) {
  var drug = values.drug;
  var weight = values.weight;
  var withEpi = values.withEpinephrine;

  var effectiveMgPerKg = withEpi && drug.maxDoseWithEpiMgPerKg != null
    ? drug.maxDoseWithEpiMgPerKg
    : drug.maxDoseMgPerKg;
  var maxDoseMg = effectiveMgPerKg * weight;

  lastPrimaryResult.textContent = formatNumber(maxDoseMg, 1) + " mg";
  lastDoseBasis.textContent = t("last_dose_basis", {
    mgPerKg: formatNumber(effectiveMgPerKg, 1),
    weight: formatNumber(weight, 1)
  });

  // Epi section
  if (drug.maxDoseWithEpiMgPerKg != null) {
    var epiMaxDose = drug.maxDoseWithEpiMgPerKg * weight;
    lastEpiResult.textContent = formatNumber(epiMaxDose, 1) + " mg (" + formatNumber(drug.maxDoseWithEpiMgPerKg, 1) + " mg/kg)";
    lastEpiSection.classList.remove("hidden");
  } else {
    lastEpiResult.textContent = t("last_no_epi_benefit");
    lastEpiSection.classList.remove("hidden");
  }

  // Onset/duration
  lastOnset.textContent = drug.onsetMinutes + " min";
  lastDuration.textContent = drug.durationMinutes + " min";

  // Safety assessment for planned dose
  if (values.plannedDose != null && isPositiveNumber(values.plannedDose)) {
    var percent = (values.plannedDose / maxDoseMg) * 100;
    lastSafetySection.classList.remove("hidden");

    if (percent > 100) {
      lastSafetyResult.textContent = t("last_planned_over") + " (" + formatNumber(percent, 0) + "%)";
      lastSafetyResult.classList.add("safety-over");
      lastSafetyResult.classList.remove("safety-ok");
    } else {
      lastSafetyResult.textContent = t("last_planned_within") + " — " + t("last_planned_ratio", { percent: formatNumber(percent, 0) });
      lastSafetyResult.classList.add("safety-ok");
      lastSafetyResult.classList.remove("safety-over");
    }
  } else {
    lastSafetySection.classList.add("hidden");
  }

  // Drug notes
  lastDrugNotes.textContent = drug.notes;

  // References
  renderReferenceList(lastReferenceList, drug.references);

  lastResultWarning.textContent = t("last_result_warning");
  lastResultCard.classList.remove("hidden");
}

function handleLASTSubmit(event) {
  event.preventDefault();

  var values = readLASTFormValues();
  var validationError = validateLASTValues(values);

  if (validationError) {
    lastErrorMessage.textContent = validationError;
    clearLASTResult();
    return;
  }

  lastErrorMessage.textContent = "";
  clearLASTResult();
  showLASTResult(values);
}

function handleLASTInputChange(event) {
  if (shouldDeferDecimalInput(event)) {
    return;
  }
  updateLASTQuickState({
    inputs: {
      weight: lastInputs.weight.value,
      drugId: lastInputs.drug.value,
      withEpinephrine: lastInputs.epinephrine.checked,
      plannedDose: lastInputs.plannedDose.value
    }
  });
  clearLASTResult();
  lastErrorMessage.textContent = "";
}

function resetLASTForm() {
  persistedState.lastQuick = createDefaultLASTQuickState();
  savePersistedState(persistedState);
  lastForm.reset();
  applyLASTStateToView(getLASTQuickState());
  clearLASTResult();
  lastErrorMessage.textContent = "";
}

// Render guide references on load
renderReferenceList(lastGuideReferenceList, ["last_asra_2020", "last_asra_checklist", "last_lipid_rescue"]);

// Wiring
lastForm.addEventListener("submit", handleLASTSubmit);
lastResetButton.addEventListener("click", resetLASTForm);

[
  lastInputs.weight,
  lastInputs.drug,
  lastInputs.plannedDose
].forEach(function (input) {
  input.addEventListener("input", handleLASTInputChange);
  if (input.tagName === "SELECT") {
    input.addEventListener("change", handleLASTInputChange);
  }
});

lastInputs.epinephrine.addEventListener("change", handleLASTInputChange);

export { applyLASTStateToView, clearLASTResult };

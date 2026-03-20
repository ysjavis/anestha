import { calculateDantroleneDose } from '../calc/pediatric.js';
import { formatNumber, isPositiveNumber } from '../calc/utils.js';
import { DANTROLENE_FORMULATIONS } from '../data/mh-presets.js';
import { getDantroleneQuickState, updateDantroleneQuickState, normalizeDantroleneQuickState, createDefaultDantroleneQuickState, savePersistedState, persistedState } from '../store/state.js';
import { t } from '../i18n.js';
import { renderReferenceList } from '../calc/reference-helpers.js';

// DOM refs
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

const dantroleneInputs = {
  weight: document.getElementById("dantrolene-weight"),
  formulation: document.getElementById("dantrolene-formulation"),
  initialDose: document.getElementById("dantrolene-initial-dose")
};

function applyDantroleneQuickStateToView(dantroleneQuickState) {
  const normalizedState = normalizeDantroleneQuickState(dantroleneQuickState);

  dantroleneInputs.weight.value = normalizedState.inputs.weight;
  dantroleneInputs.formulation.value = normalizedState.inputs.formulationId;
  dantroleneInputs.initialDose.value = normalizedState.inputs.initialDoseMgKg;
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

function resetDantroleneForm() {
  persistedState.dantroleneQuick = createDefaultDantroleneQuickState();
  savePersistedState(persistedState);
  dantroleneForm.reset();
  applyDantroleneQuickStateToView(getDantroleneQuickState());
  clearDantroleneResult();
  dantroleneErrorMessage.textContent = "";
}

// Wiring
dantroleneForm.addEventListener("submit", handleDantroleneSubmit);
dantroleneResetButton.addEventListener("click", resetDantroleneForm);

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

export { applyDantroleneQuickStateToView, clearDantroleneResult };

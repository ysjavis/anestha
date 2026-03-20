import { calculateBodyWeightMetrics } from '../calc/body-weight.js';
import { formatNumber, isPositiveNumber, shouldDeferDecimalInput } from '../calc/utils.js';
import { t } from '../i18n.js';

const supportWeightSexInput = document.getElementById("support-weight-sex");
const supportWeightHeightInput = document.getElementById("support-weight-height");
const supportWeightTotalInput = document.getElementById("support-weight-total");
const supportWeightBmi = document.getElementById("support-weight-bmi");
const supportWeightBsa = document.getElementById("support-weight-bsa");
const supportWeightIbw = document.getElementById("support-weight-ibw");
const supportWeightLbw = document.getElementById("support-weight-lbw");
const supportWeightAdjbw = document.getElementById("support-weight-adjbw");
const supportWeightNote = document.getElementById("support-weight-note");

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

function handleSupportWeightInputChange(event) {
  if (shouldDeferDecimalInput(event)) {
    return;
  }
  renderSupportWeightTools();
}

// Wiring
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

export { renderSupportWeightTools };

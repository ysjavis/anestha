import { isPositiveNumber, formatNumber } from '../calc/utils.js';
import { currentLanguage, t } from '../i18n.js';

// DOM refs
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

// Functions

function formatDilutionPreset(dilutionPreset) {
  if (!dilutionPreset) {
    return "Custom / not set";
  }

  return `${dilutionPreset.label} (${formatNumber(dilutionPreset.finalConcentration, 0)} ${dilutionPreset.finalConcentrationUnit})`;
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

function handleDilutionModeChange(modeId) {
  activateDilutionMode(modeId);
}

function handleDilutionSubmit(e) {
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
}

function handleDilutionReset() {
  dilutionInputs.form.reset();
  dilutionInputs.resultCard.classList.add("hidden");
  dilutionInputs.errorMessage.textContent = "";
}

// Wiring — all event listeners

dilutionInputs.modeTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    const modeId = tab.dataset.dilutionModeTab;
    handleDilutionModeChange(modeId);
  });
});

dilutionInputs.form.addEventListener("submit", handleDilutionSubmit);

dilutionInputs.resetButton.addEventListener("click", handleDilutionReset);

export { activateDilutionMode, formatDilutionPreset };

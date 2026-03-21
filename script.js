import { currentLanguage, setCurrentLanguage, loadLanguagePreference, saveLanguagePreference } from './js/i18n.js';
import {
  getSingleDrugState, getDantroleneQuickState, getLASTQuickState,
  getInfusionWorkspaceState,
  updateInfusionWorkspaceState
} from './js/store/state.js';
import { renderSupportWeightTools } from './js/ui/weight.js';
import { applyDantroleneQuickStateToView, clearDantroleneResult } from './js/ui/mh.js';
import { applyLASTStateToView, clearLASTResult } from './js/ui/last.js';
import './js/ui/dilution.js';
import './js/ui/pediatric.js';
import { renderInfusionWorkspace } from './js/ui/workspace.js';
import { applySingleDrugStateToView, activateInfusionMode, updateDrugUI, clearResult, maybeRenderLiveInfusionResult, updateQuickDrugUI } from './js/ui/infusion.js';
import { applyStaticTranslations, updateFeedbackLinks, updateSupportLinks } from './js/ui/support.js';

// -----------------------------
// DOM references
// -----------------------------

const calculatorTabs = document.querySelectorAll("[data-calculator-tab]");
const calculatorViews = document.querySelectorAll("[data-calculator-view]");
const infusionViewTabs = document.querySelectorAll("[data-infusion-view-tab]");
const infusionViewPanels = document.querySelectorAll("[data-infusion-view-panel]");
const languageSelect = document.getElementById("language-select");

// -----------------------------
// Tab / view routing
// -----------------------------

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

// -----------------------------
// Language
// -----------------------------

function setLanguage(language) {
  setCurrentLanguage(language === "en" ? "en" : "ko");
  saveLanguagePreference(currentLanguage);
  applyStaticTranslations();
  updateFeedbackLinks();
  updateSupportLinks();
  renderSupportWeightTools();
  updateQuickDrugUI();
  updateDrugUI();
  renderInfusionWorkspace();
  clearResult();
  clearDantroleneResult();
  clearLASTResult();
  maybeRenderLiveInfusionResult({
    showValidation: false
  });
}

// -----------------------------
// Wiring
// -----------------------------

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

if (languageSelect) {
  languageSelect.addEventListener("change", function () {
    setLanguage(languageSelect.value);
  });
}

// -----------------------------
// Initial restore
// -----------------------------

setCurrentLanguage(loadLanguagePreference());
applyStaticTranslations();
updateFeedbackLinks();
updateSupportLinks();
renderSupportWeightTools();
applySingleDrugStateToView(getSingleDrugState());
applyDantroleneQuickStateToView(getDantroleneQuickState());
applyLASTStateToView(getLASTQuickState());
activateCalculator("infusion");
activateInfusionView(getInfusionWorkspaceState().activeView);
activateInfusionMode(getSingleDrugState().activeMode);
updateDrugUI();
renderInfusionWorkspace();
clearResult();
clearDantroleneResult();
clearLASTResult();
maybeRenderLiveInfusionResult({
  showValidation: false
});

import { isWeightBasedReferenceRange, isNitroglycerinDrug, doseToRate } from '../calc/infusion.js';
import { formatNumber, isPositiveNumber, createClientId, getAdaptiveQuickStep, getStepPrecision, shouldDeferDecimalInput } from '../calc/utils.js';
import { getDisplayDoseUnit, convertDoseValueForDisplay, convertDoseValueToReferenceUnit, getWorkspaceNitroglycerinDoseView, formatEditableDoseValue } from '../calc/infusion-display.js';
import { getReferenceTypeBadge, getUseCaseBadge, getRangeSourceType, getDrugUseCaseSummary, getDisplaySourceLabel, getRangeSourceSummary, getRangeRationale } from '../calc/reference-helpers.js';
import { DRUG_PRESETS } from '../data/drug-presets.js';
import {
  getDrugPresetById, isWithinReferenceRange,
  sanitizeWorkspaceLayoutMode, sanitizeNitroglycerinDoseUnitView,
  normalizeInfusionWorkspaceCardState, normalizeInfusionWorkspaceState,
  createDefaultInfusionWorkspaceCardState,
  createInfusionTemplateState, normalizeInfusionTemplate, normalizeInfusionTemplates,
  getInfusionWorkspaceState, getInfusionTemplates,
  updateInfusionWorkspaceState, updateInfusionTemplates
} from '../store/state.js';
import { currentLanguage, t } from '../i18n.js';
import { formatDilutionPreset } from './dilution.js';

// -----------------------------
// DOM references
// -----------------------------

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
const infusionWorkspacePanel = document.getElementById("infusion-view-workspace");

// -----------------------------
// Workspace helpers
// -----------------------------

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

// -----------------------------
// Layout mode
// -----------------------------

export function syncWorkspaceLayoutUi(modeId) {
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

export function activateWorkspaceLayoutMode(modeId, options) {
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

// -----------------------------
// Rendering
// -----------------------------

export function renderInfusionWorkspace() {
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
// Focus management
// -----------------------------

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

  if (nextInput.type === "number") {
    // number inputs do not support setSelectionRange in most browsers.
    // Re-assign value to move the cursor to the end after innerHTML rebuild.
    var currentValue = nextInput.value;
    nextInput.value = "";
    nextInput.value = currentValue;
    return;
  }

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

  if (trimmedValue === "" || trimmedValue === "-" || trimmedValue === "." || trimmedValue === "-.") {
    return true;
  }

  if (trimmedValue.endsWith(".")) {
    return true;
  }

  // Defer if the value has trailing zeros after decimal point (e.g. "0.0", "1.50")
  // that would be stripped by formatEditableDoseValue during re-render
  if (trimmedValue.includes(".")) {
    const numericValue = Number(trimmedValue);
    if (Number.isFinite(numericValue) && String(numericValue) !== trimmedValue) {
      return true;
    }
  }

  return false;
}

// -----------------------------
// Card state management
// -----------------------------

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

// -----------------------------
// Event handlers
// -----------------------------

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

  if (!isQuickWorkspaceMode) {
    return;
  }

  if (!shouldDeferDecimalInput(event) && !shouldDeferWorkspaceQuickRender(input)) {
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

// -----------------------------
// Wiring
// -----------------------------

workspaceLayoutTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    activateWorkspaceLayoutMode(tab.dataset.workspaceLayoutTab);
  });
});

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

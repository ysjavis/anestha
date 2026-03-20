import { isNitroglycerinDrug } from './infusion.js';
import { formatNumber, isPositiveNumber } from './utils.js';
import { sanitizeNitroglycerinDoseUnitView, getSingleDrugState } from '../store/state.js';

export function getPreferredNitroglycerinDoseView() {
  return sanitizeNitroglycerinDoseUnitView(getSingleDrugState().nitroglycerinDoseUnitView);
}

export function getWorkspaceNitroglycerinDoseView(card, weightKg) {
  const preferredView = sanitizeNitroglycerinDoseUnitView(card && card.nitroglycerinDoseUnitView);

  if (preferredView === "mcg/kg/min" && !isPositiveNumber(weightKg)) {
    return "mcg/min";
  }

  return preferredView;
}

export function getDisplayDoseUnit(drug, weightKg, preferredView) {
  if (!isNitroglycerinDrug(drug)) {
    return (drug && drug.referenceRange && drug.referenceRange.unit) || "mcg/kg/min";
  }

  return sanitizeNitroglycerinDoseUnitView(preferredView || getPreferredNitroglycerinDoseView());
}

export function convertDoseValueForDisplay(value, drug, weightKg, displayUnit) {
  if (!isNitroglycerinDrug(drug) || displayUnit !== "mcg/kg/min" || !isPositiveNumber(weightKg)) {
    return value;
  }

  return value / weightKg;
}

export function convertDoseValueToReferenceUnit(value, drug, weightKg, displayUnit) {
  if (!isNitroglycerinDrug(drug) || displayUnit !== "mcg/kg/min" || !isPositiveNumber(weightKg)) {
    return value;
  }

  return value * weightKg;
}

export function convertDoseListForDisplay(values, drug, weightKg, displayUnit) {
  return values.map(function (value) {
    return convertDoseValueForDisplay(value, drug, weightKg, displayUnit);
  });
}

export function convertDoseListToReferenceUnit(values, drug, weightKg, displayUnit) {
  return values.map(function (value) {
    return convertDoseValueToReferenceUnit(value, drug, weightKg, displayUnit);
  });
}

export function formatDoseValueWithEquivalent(value, unit) {
  if (unit === "mcg/kg/hr") {
    return `${formatNumber(value, 3)} ${unit} (${formatNumber(value / 1000, 3)} mg/kg/hr)`;
  }

  return `${formatNumber(value, 3)} ${unit}`;
}

export function formatDoseRangeWithEquivalent(min, max, unit) {
  if (unit === "mcg/kg/hr") {
    return `${formatNumber(min, 3)} - ${formatNumber(max, 3)} ${unit} (${formatNumber(min / 1000, 3)} - ${formatNumber(max / 1000, 3)} mg/kg/hr)`;
  }

  return `${formatNumber(min, 3)} - ${formatNumber(max, 3)} ${unit}`;
}

export function formatInfusionDoseDisplay(value, unit, drug, weightKg) {
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

export function formatInfusionRangeDisplay(min, max, unit, drug, weightKg) {
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

export function formatEditableDoseValue(value) {
  return Number(Number(value).toFixed(3)).toString();
}

export function formatEditableDoseList(values) {
  return values.map(function (value) {
    return formatEditableDoseValue(value);
  }).join(", ");
}

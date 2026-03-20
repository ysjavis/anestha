export function roundToNearestHalf(value) {
  return Math.round(value * 2) / 2;
}

export function formatNumber(value, digits) {
  return Number(value).toFixed(digits === undefined ? 2 : digits);
}

export function formatList(values) {
  return values.map(function (value) {
    return String(value);
  }).join(", ");
}

export function parseDoseList(rawValue) {
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

export function isPositiveNumber(value) {
  return Number.isFinite(value) && value > 0;
}

export function getUnitBase(unitValue) {
  return typeof unitValue === "string" ? unitValue.split("/")[0] : "";
}

export function createClientId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getAdaptiveQuickStep(value) {
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

export function getStepPrecision(stepValue) {
  const stepText = String(stepValue);
  return stepText.includes(".") ? stepText.split(".")[1].length : 0;
}

export function clampNumber(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

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

export function isWeightBasedReferenceRange(referenceRange) {
  return !referenceRange || referenceRange.weightBased !== false;
}

export function isNitroglycerinDrug(drug) {
  return Boolean(drug && drug.id === "nitroglycerin");
}

export function getReferenceTimeFactor(referenceRange) {
  return referenceRange && referenceRange.timeUnit === "hr" ? 1 : 60;
}

export function doseToRate(weightKg, concentrationPerMl, doseValue, referenceRange) {
  const timeFactor = getReferenceTimeFactor(referenceRange);

  if (isWeightBasedReferenceRange(referenceRange)) {
    return (doseValue * weightKg * timeFactor) / concentrationPerMl;
  }

  return (doseValue * timeFactor) / concentrationPerMl;
}

export function rateToDose(weightKg, concentrationPerMl, rateMlHr, referenceRange) {
  const timeFactor = getReferenceTimeFactor(referenceRange);

  if (isWeightBasedReferenceRange(referenceRange)) {
    return (rateMlHr * concentrationPerMl) / (weightKg * timeFactor);
  }

  return (rateMlHr * concentrationPerMl) / timeFactor;
}

export function buildReferenceTable(weightKg, concentrationPerMl, doseList, referenceRange) {
  return doseList.map(function (dose) {
    return {
      dose: dose,
      rate: doseToRate(weightKg, concentrationPerMl, dose, referenceRange)
    };
  });
}

export function calculateWeightBasedDoseRange(weightKg, minDosePerKg, maxDosePerKg) {
  return {
    minDose: weightKg * minDosePerKg,
    maxDose: weightKg * maxDosePerKg
  };
}

export function calculateDoseVolume(doseAmount, concentrationPerMl) {
  return doseAmount / concentrationPerMl;
}

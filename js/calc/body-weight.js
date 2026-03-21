import { isPositiveNumber } from './utils.js';

export function calculateBodyWeightMetrics(sex, heightCm, totalWeightKg) {
  if (!isPositiveNumber(heightCm) || !isPositiveNumber(totalWeightKg)) {
    return null;
  }

  const normalizedSex = sex === "female" ? "female" : "male";
  const heightM = heightCm / 100;
  const bmi = totalWeightKg / (heightM * heightM);
  const bsaMosteller = Math.sqrt((heightCm * totalWeightKg) / 3600);
  const ibwBase = normalizedSex === "female" ? 45.5 : 50;
  const ibw = Math.max(0, ibwBase + (0.9 * (heightCm - 152.4)));
  const ffmDenominator = normalizedSex === "female"
    ? (8780 + (244 * bmi))
    : (6680 + (216 * bmi));
  const ffm = (9270 * totalWeightKg) / ffmDenominator;
  const heightRatio = totalWeightKg / heightCm;
  const lbm = normalizedSex === "female"
    ? (1.07 * totalWeightKg) - (148 * heightRatio * heightRatio)
    : (1.1 * totalWeightKg) - (128 * heightRatio * heightRatio);
  const adjbw = totalWeightKg > ibw
    ? ibw + (0.4 * (totalWeightKg - ibw))
    : totalWeightKg;

  return {
    bmi: bmi,
    bsaMosteller: bsaMosteller,
    ibw: ibw,
    ffm: ffm,
    lbm: Math.max(0, lbm),
    adjbw: adjbw,
    usesAdjustedBodyWeight: totalWeightKg > ibw
  };
}

import { roundToNearestHalf } from './utils.js';

export { roundToNearestHalf };

export function calculateDantroleneDose(weightKg, dosePerKg) {
  return weightKg * dosePerKg;
}

export function calculatePediatricAirwayEstimates(ageYears) {
  const uncuffedSize = roundToNearestHalf((ageYears / 4) + 4);
  const cuffedSize = roundToNearestHalf((ageYears / 4) + 3.5);
  const oralDepth = ageYears < 2
    ? 10 + ageYears
    : (ageYears / 2) + 12;

  return {
    uncuffedSize: uncuffedSize,
    cuffedSize: cuffedSize,
    oralDepth: oralDepth,
    cuffedDepthBySize: cuffedSize * 3
  };
}

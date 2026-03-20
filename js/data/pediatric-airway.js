import { isPositiveNumber } from '../calc/utils.js';

export const SUPRAGLOTTIC_DEVICE_GUIDES = {
  "i-gel": {
    label: "i-gel",
    sourceLabel: "Intersurgical weight guide",
    sizes: [
      { size: "1", minWeight: 2, maxWeight: 5 },
      { size: "1.5", minWeight: 5, maxWeight: 12 },
      { size: "2", minWeight: 10, maxWeight: 25 },
      { size: "2.5", minWeight: 25, maxWeight: 35 },
      { size: "3", minWeight: 30, maxWeight: 60 }
    ]
  },
  "lma-supreme": {
    label: "LMA Supreme",
    sourceLabel: "Teleflex weight guide",
    sizes: [
      { size: "1", minWeight: 0, maxWeight: 5 },
      { size: "1.5", minWeight: 5, maxWeight: 10 },
      { size: "2", minWeight: 10, maxWeight: 20 },
      { size: "2.5", minWeight: 20, maxWeight: 30 },
      { size: "3", minWeight: 30, maxWeight: 50 }
    ]
  }
};

export const ORAL_AIRWAY_GUIDE = [
  { minWeight: 0, maxWeight: 5, minAge: 0, maxAge: 0.5, size: "000", length: "40 mm", label: "Neonate / small infant" },
  { minWeight: 5, maxWeight: 10, minAge: 0.5, maxAge: 1.5, size: "0", length: "50 mm", label: "Infant" },
  { minWeight: 10, maxWeight: 20, minAge: 1.5, maxAge: 5, size: "1", length: "60 mm", label: "Toddler / preschool" },
  { minWeight: 20, maxWeight: 35, minAge: 5, maxAge: 9, size: "2", length: "70 mm", label: "School-age child" },
  { minWeight: 35, maxWeight: 50, minAge: 9, maxAge: 13, size: "3", length: "80 mm", label: "Older child" },
  { minWeight: 50, maxWeight: 999, minAge: 13, maxAge: 99, size: "4", length: "90 mm", label: "Adolescent" }
];

export const LARYNGOSCOPE_GUIDE = [
  {
    minWeight: 0,
    maxWeight: 5,
    minAge: 0,
    maxAge: 0.25,
    primaryBlade: "Miller 0",
    secondaryBlade: "Miller 1 if needed",
    label: "Neonate / small infant"
  },
  {
    minWeight: 5,
    maxWeight: 10,
    minAge: 0.25,
    maxAge: 2,
    primaryBlade: "Miller 1",
    secondaryBlade: "Miller 0-1 depending on anatomy",
    label: "Infant / toddler"
  },
  {
    minWeight: 10,
    maxWeight: 20,
    minAge: 2,
    maxAge: 6,
    primaryBlade: "Miller 2 or Macintosh 2",
    secondaryBlade: "Choose straight vs curved by anatomy and operator preference",
    label: "Young child"
  },
  {
    minWeight: 20,
    maxWeight: 40,
    minAge: 6,
    maxAge: 12,
    primaryBlade: "Macintosh 2",
    secondaryBlade: "Macintosh 3 for larger child",
    label: "School-age child"
  },
  {
    minWeight: 40,
    maxWeight: 999,
    minAge: 12,
    maxAge: 99,
    primaryBlade: "Macintosh 3",
    secondaryBlade: "Macintosh 2-3 depending on size and anatomy",
    label: "Adolescent"
  }
];

export const NASAL_AIRWAY_GUIDE = [
  { minAge: 0, maxAge: 1, minWeight: 0, maxWeight: 10, insertionDepth: "7.0-8.5 cm", label: "First year of life" },
  { minAge: 1, maxAge: 2, minWeight: 8, maxWeight: 15, insertionDepth: "8.0-10.0 cm", label: "Second year of life" }
];

export const FACE_MASK_GUIDE = [
  { minWeight: 0, maxWeight: 5, minAge: 0, maxAge: 0.5, size: "0-1", label: "Neonate / small infant" },
  { minWeight: 5, maxWeight: 10, minAge: 0.5, maxAge: 1.5, size: "1", label: "Infant" },
  { minWeight: 10, maxWeight: 20, minAge: 1.5, maxAge: 5, size: "2", label: "Toddler / preschool child" },
  { minWeight: 20, maxWeight: 35, minAge: 5, maxAge: 10, size: "3", label: "School-age child" },
  { minWeight: 35, maxWeight: 60, minAge: 10, maxAge: 18, size: "4", label: "Older child / adolescent" }
];

export function getSupraglotticDeviceRecommendation(deviceId, weightKg) {
  const guide = SUPRAGLOTTIC_DEVICE_GUIDES[deviceId];

  if (!guide || !isPositiveNumber(weightKg)) {
    return null;
  }

  const matchingSize = guide.sizes.find(function (sizeItem) {
    return weightKg >= sizeItem.minWeight && weightKg <= sizeItem.maxWeight;
  });

  return matchingSize
    ? {
      deviceLabel: guide.label,
      sourceLabel: guide.sourceLabel,
      size: matchingSize.size,
      weightRange: `${matchingSize.minWeight}-${matchingSize.maxWeight} kg`
    }
    : {
      deviceLabel: guide.label,
      sourceLabel: guide.sourceLabel,
      size: "Out of listed range",
      weightRange: "Verify manufacturer guidance"
    };
}

export function findGuideItemByWeightOrAge(guideItems, weightKg, ageYears) {
  if (isPositiveNumber(weightKg)) {
    const weightMatch = guideItems.find(function (item) {
      return weightKg >= item.minWeight && weightKg <= item.maxWeight;
    });

    if (weightMatch) {
      return weightMatch;
    }
  }

  if (isPositiveNumber(ageYears)) {
    return guideItems.find(function (item) {
      return ageYears >= item.minAge && ageYears < item.maxAge;
    }) || null;
  }

  return null;
}

export function getOralAirwayRecommendation(weightKg, ageYears) {
  return findGuideItemByWeightOrAge(ORAL_AIRWAY_GUIDE, weightKg, ageYears);
}

export function getLaryngoscopeRecommendation(weightKg, ageYears) {
  return findGuideItemByWeightOrAge(LARYNGOSCOPE_GUIDE, weightKg, ageYears);
}

export function getNasalAirwayRecommendation(weightKg, ageYears) {
  return findGuideItemByWeightOrAge(NASAL_AIRWAY_GUIDE, weightKg, ageYears);
}

export function getFaceMaskRecommendation(weightKg, ageYears) {
  return findGuideItemByWeightOrAge(FACE_MASK_GUIDE, weightKg, ageYears);
}

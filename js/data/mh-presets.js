export const DANTROLENE_FORMULATIONS = [
  {
    id: "standard-20mg",
    name: "Standard 20 mg vial",
    vialStrengthMg: 20,
    defaultInitialDoseMgKg: 2.5,
    cumulativeMaxMgKg: 10,
    reconstitution: "Reconstitute each 20 mg vial with 60 mL sterile water before use.",
    notes: "Traditional formulation; many vials may be required during MH treatment.",
    references: ["dantrolene_standard_dailymed", "mhaus_dantrolene"]
  },
  {
    id: "ryanodex-250mg",
    name: "RYANODEX 250 mg vial",
    vialStrengthMg: 250,
    defaultInitialDoseMgKg: 2.5,
    cumulativeMaxMgKg: 10,
    reconstitution: "Reconstitute each 250 mg vial with 5 mL sterile water before use.",
    notes: "Concentrated formulation; fewer vials may be needed for the same target dose.",
    references: ["dantrolene_ryanodex_fda", "mhaus_dantrolene"]
  }
];

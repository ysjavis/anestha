export const DEFAULT_CUSTOM_DRUG = {
  id: "custom",
  name: "",
  concentration: 100,
  concentrationUnit: "mcg/mL",
  referenceDoses: [0.02, 0.05, 0.1, 0.2, 0.3],
  referenceRange: {
    min: 0.02,
    max: 0.3,
    unit: "mcg/kg/min"
  },
  notes: "",
  dilutionPresets: [],
  metadata: {
    source: "User defined",
    lastReviewed: "Not set"
  }
};

export const DRUG_PRESETS = [
  {
    id: "norepinephrine",
    name: "Norepinephrine",
    concentration: 100,
    concentrationUnit: "mcg/mL",
    referenceDoses: [0.01, 0.02, 0.05, 0.1, 0.2, 0.3],
    referenceRange: {
      min: 0.01,
      max: 0.3,
      unit: "mcg/kg/min"
    },
    useCase: "vasopressor-support",
    useCaseLabel: "General anesthesia / perioperative vasopressor support",
    rangeSourceType: "clinical",
    rangeSourceNote: "Institutional / perioperative practice range shown as a weight-based clinical preset; DailyMed label dosing remains linked separately as an absolute mcg/min reference.",
    rangeRationale: "Expanded to reflect common OR and institutional norepinephrine practice while keeping the product label visible as a separate reference context.",
    notes: "Clinical perioperative and institutional practice preset. Weight-based display is used for infusion planning, while the linked DailyMed label still presents absolute mcg/min dosing.",
    dilutionPresets: [
      {
        id: "ne-4mg-50ml",
        label: "4 mg / 50 mL",
        drugAmount: 4,
        drugAmountUnit: "mg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 80,
        finalConcentrationUnit: "mcg/mL",
        note: "Common syringe pump example"
      }
    ],
    references: [
      "infusion_norepinephrine_dailymed",
      "infusion_norepinephrine_openanesthesia",
      "infusion_norepinephrine_periop_study"
    ],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "epinephrine",
    name: "Epinephrine",
    concentration: 100,
    concentrationUnit: "mcg/mL",
    referenceDoses: [0.05, 0.1, 0.2, 0.5, 1, 2],
    referenceRange: {
      min: 0.05,
      max: 2,
      unit: "mcg/kg/min"
    },
    useCase: "vasopressor-support",
    useCaseLabel: "General anesthesia / perioperative hemodynamic support",
    rangeSourceType: "label",
    rangeSourceNote: "Broad label-oriented continuous infusion range based on product prescribing information; perioperative low-dose inotrope practice may use a narrower lower band depending on context.",
    rangeRationale: "Kept broad so the default does not falsely imply that moderate or higher vasopressor/inotrope doses are out of reference, while lower-dose anesthesia use remains visible through the linked clinical context.",
    notes: "Default preset mirrors the broad DailyMed adult infusion range. In OR practice, some users may center lower when epinephrine is being used mainly for low-dose beta support rather than full vasopressor escalation.",
    dilutionPresets: [
      {
        id: "epi-5mg-50ml",
        label: "5 mg / 50 mL",
        drugAmount: 5,
        drugAmountUnit: "mg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 100,
        finalConcentrationUnit: "mcg/mL",
        note: "Example infusion syringe"
      }
    ],
    references: ["infusion_epinephrine_dailymed", "infusion_epinephrine_openanesthesia"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "phenylephrine",
    name: "Phenylephrine",
    concentration: 100,
    concentrationUnit: "mcg/mL",
    referenceDoses: [0.5, 0.75, 1, 1.2, 1.4],
    referenceRange: {
      min: 0.5,
      max: 1.4,
      unit: "mcg/kg/min"
    },
    useCase: "vasopressor-support",
    useCaseLabel: "Anesthesia-associated hypotension support",
    rangeSourceType: "label",
    rangeSourceNote: "Label-based OR hypotension infusion range. A broader vasodilatory-shock label range exists separately, but the default here stays focused on anesthesia-associated hypotension support.",
    rangeRationale: "Kept at the narrower perioperative hypotension band so the default does not automatically imply vasodilatory-shock or ICU-style titration ceilings during routine OR use.",
    notes: "Default preset mirrors the DailyMed anesthesia-associated hypotension infusion range; broader vasodilatory-shock labeling should be interpreted separately if that context is relevant.",
    dilutionPresets: [
      {
        id: "phe-10mg-100ml",
        label: "10 mg / 100 mL",
        drugAmount: 10,
        drugAmountUnit: "mg",
        finalVolume: 100,
        finalVolumeUnit: "mL",
        finalConcentration: 100,
        finalConcentrationUnit: "mcg/mL",
        note: "Common vasopressor dilution example"
      }
    ],
    references: ["infusion_phenylephrine_dailymed", "infusion_phenylephrine_periop_study"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "vasopressin",
    name: "Vasopressin",
    concentration: 1,
    concentrationUnit: "unit/mL",
    referenceDoses: [0.01, 0.02, 0.03, 0.04],
    referenceRange: {
      min: 0.01,
      max: 0.04,
      unit: "unit/min",
      weightBased: false
    },
    useCase: "vasopressor-support",
    useCaseLabel: "Refractory perioperative hypotension support",
    rangeSourceType: "clinical",
    rangeSourceNote: "Clinical perioperative low-dose vasopressin range from anesthesia references.",
    rangeRationale: "Switched to absolute units/min because perioperative vasopressin is usually prescribed that way; weight-based display was misleading.",
    notes: "Absolute-dose infusion aligned to perioperative low-dose vasopressin use; weight input is not used for this drug.",
    dilutionPresets: [
      {
        id: "vaso-20u-20ml",
        label: "20 units / 20 mL",
        drugAmount: 20,
        drugAmountUnit: "units",
        finalVolume: 20,
        finalVolumeUnit: "mL",
        finalConcentration: 1,
        finalConcentrationUnit: "unit/mL",
        note: "Example only"
      }
    ],
    references: ["infusion_vasopressin_dailymed", "infusion_vasopressin_openanesthesia"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "nitroglycerin",
    name: "Nitroglycerin",
    concentration: 200,
    concentrationUnit: "mcg/mL",
    referenceDoses: [5, 10, 20, 40, 80, 160],
    referenceRange: {
      min: 5,
      max: 200,
      unit: "mcg/min",
      weightBased: false
    },
    useCase: "vasopressor-support",
    useCaseLabel: "Perioperative vasodilator titration",
    rangeSourceType: "label",
    rangeSourceNote: "Label-oriented nitroglycerin infusion range using absolute mcg/min titration.",
    rangeRationale: "Changed to absolute mcg/min because both label and anesthesia references describe OR titration that way rather than mcg/kg/min defaults.",
    notes: "Absolute-dose infusion aligned to DailyMed and OpenAnesthesia titration guidance; optional mcg/kg/min view is shown for weight-based clinical convenience.",
    dilutionPresets: [
      {
        id: "ntg-10mg-50ml",
        label: "10 mg / 50 mL",
        drugAmount: 10,
        drugAmountUnit: "mg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 200,
        finalConcentrationUnit: "mcg/mL",
        note: "Common NTG syringe example"
      }
    ],
    references: ["infusion_nitroglycerin_dailymed", "infusion_nitroglycerin_openanesthesia"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "nicardipine",
    name: "Nicardipine",
    concentration: 0.1,
    concentrationUnit: "mg/mL",
    referenceDoses: [2.5, 5, 7.5, 10, 12.5, 15],
    referenceRange: {
      min: 2.5,
      max: 15,
      unit: "mg/hr",
      timeUnit: "hr",
      weightBased: false
    },
    useCase: "vasopressor-support",
    useCaseLabel: "Perioperative blood pressure control / vasodilator infusion",
    rangeSourceType: "label",
    rangeSourceNote: "Label-oriented nicardipine infusion range expressed as absolute mg/hr titration.",
    rangeRationale: "Kept in absolute mg/hr because the official infusion titration framework is presented that way; this avoids forcing a misleading weight-based default.",
    notes: "Reference range follows common label titration (5 mg/hr start, titrate by 2.5 mg/hr, usual upper band around 15 mg/hr). Study-based perioperative protocols may report mcg/kg/min in selected settings.",
    dilutionPresets: [
      {
        id: "nicardipine-25mg-250ml",
        label: "25 mg / 250 mL",
        drugAmount: 25,
        drugAmountUnit: "mg",
        finalVolume: 250,
        finalVolumeUnit: "mL",
        finalConcentration: 0.1,
        finalConcentrationUnit: "mg/mL",
        note: "Common infusion concentration"
      }
    ],
    references: ["infusion_nicardipine_dailymed", "infusion_nicardipine_periop_study"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-16"
    }
  },
  {
    id: "dopamine",
    name: "Dopamine",
    concentration: 4000,
    concentrationUnit: "mcg/mL",
    referenceDoses: [2, 5, 10, 20, 40, 50],
    referenceRange: {
      min: 2,
      max: 50,
      unit: "mcg/kg/min"
    },
    useCase: "vasopressor-support",
    useCaseLabel: "Hemodynamic support / inopressor use",
    rangeSourceType: "label",
    rangeSourceNote: "Label-based adult dopamine infusion range spanning lower to higher hemodynamic effect bands.",
    rangeRationale: "Expanded to the labeled upper range so the calculator does not falsely imply that doses above 20 mcg/kg/min are automatically out of reference.",
    notes: "Reference range aligned to DailyMed adult infusion labeling; physiologic effects vary by dose band.",
    dilutionPresets: [
      {
        id: "dopamine-200mg-50ml",
        label: "200 mg / 50 mL",
        drugAmount: 200,
        drugAmountUnit: "mg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 4000,
        finalConcentrationUnit: "mcg/mL",
        note: "Example only"
      }
    ],
    references: ["infusion_dopamine_dailymed", "infusion_dopamine_periop_study"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "dobutamine",
    name: "Dobutamine",
    concentration: 5000,
    concentrationUnit: "mcg/mL",
    referenceDoses: [2.5, 5, 7.5, 10, 15, 20],
    referenceRange: {
      min: 2.5,
      max: 20,
      unit: "mcg/kg/min"
    },
    useCase: "ga-maintenance",
    useCaseLabel: "Perioperative inotrope support",
    rangeSourceType: "label",
    rangeSourceNote: "Label-based adult dobutamine infusion range.",
    rangeRationale: "Extended to 20 mcg/kg/min to match labeling and common inotrope titration practice.",
    notes: "Reference range aligned to common DailyMed adult infusion dosing; rare higher doses should be protocol-specific.",
    dilutionPresets: [
      {
        id: "dobutamine-250mg-50ml",
        label: "250 mg / 50 mL",
        drugAmount: 250,
        drugAmountUnit: "mg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 5000,
        finalConcentrationUnit: "mcg/mL",
        note: "Common inotrope syringe example"
      }
    ],
    references: ["infusion_dobutamine_dailymed"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "milrinone",
    name: "Milrinone",
    concentration: 200,
    concentrationUnit: "mcg/mL",
    referenceDoses: [0.375, 0.5, 0.6, 0.7, 0.75],
    referenceRange: {
      min: 0.375,
      max: 0.75,
      unit: "mcg/kg/min"
    },
    useCase: "ga-maintenance",
    useCaseLabel: "Cardiac anesthesia maintenance support",
    rangeSourceType: "clinical",
    rangeSourceNote: "Clinical cardiac anesthesia maintenance range aligned with OpenAnesthesia and label maintenance dosing.",
    rangeRationale: "The displayed range focuses on maintenance infusion and excludes loading-dose logic so the table stays interpretable during pump setup.",
    notes: "Maintenance infusion range aligned to DailyMed and OpenAnesthesia; loading dose should be considered separately.",
    dilutionPresets: [
      {
        id: "milrinone-10mg-50ml",
        label: "10 mg / 50 mL",
        drugAmount: 10,
        drugAmountUnit: "mg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 200,
        finalConcentrationUnit: "mcg/mL",
        note: "Example only"
      }
    ],
    references: ["infusion_milrinone_dailymed", "infusion_milrinone_openanesthesia"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "isoproterenol",
    name: "Isoproterenol",
    concentration: 4,
    concentrationUnit: "mcg/mL",
    referenceDoses: [0.5, 1, 2, 3, 5],
    referenceRange: {
      min: 0.5,
      max: 5,
      unit: "mcg/min",
      weightBased: false
    },
    useCase: "ga-maintenance",
    useCaseLabel: "Electrophysiology / perioperative chronotrope support",
    rangeSourceType: "label",
    rangeSourceNote: "Label-based isoproterenol infusion range using absolute mcg/min dosing.",
    rangeRationale: "Converted to absolute mcg/min because the labeled effective range is commonly expressed that way and better matches electrophysiology practice.",
    notes: "Absolute-dose infusion aligned to DailyMed adult infusion dosing; weight input is not used for this drug.",
    dilutionPresets: [
      {
        id: "isoproterenol-200mcg-50ml",
        label: "200 mcg / 50 mL",
        drugAmount: 200,
        drugAmountUnit: "mcg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 4,
        finalConcentrationUnit: "mcg/mL",
        note: "Example only"
      }
    ],
    references: ["infusion_isoproterenol_dailymed", "infusion_isoproterenol_tiva_study"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "remifentanil",
    name: "Remifentanil",
    concentration: 50,
    concentrationUnit: "mcg/mL",
    referenceDoses: [0.05, 0.1, 0.2, 0.5, 1, 2],
    referenceRange: {
      min: 0.05,
      max: 2,
      unit: "mcg/kg/min"
    },
    useCase: "ga-maintenance",
    useCaseLabel: "General anesthesia maintenance analgesia",
    rangeSourceType: "label",
    rangeSourceNote: "Label-based remifentanil maintenance infusion range for general anesthesia; lower-centered anesthetic supplementation often sits within the same band rather than needing a separate default.",
    rangeRationale: "Kept broad because remifentanil use in the OR commonly spans lighter supplementation through deeper TIVA-style opioid maintenance, and the label range already maps that reasonably well.",
    notes: "Default preset mirrors remifentanil labeling for general anesthesia. In practice, many cases cluster in the lower-middle part of this band even when the full labeled range remains appropriate.",
    dilutionPresets: [
      {
        id: "remi-2mg-40ml",
        label: "2 mg / 40 mL",
        drugAmount: 2,
        drugAmountUnit: "mg",
        finalVolume: 40,
        finalVolumeUnit: "mL",
        finalConcentration: 50,
        finalConcentrationUnit: "mcg/mL",
        note: "Common remifentanil dilution"
      }
    ],
    references: ["infusion_remifentanil_dailymed", "infusion_remifentanil_periop_study"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-15"
    }
  },
  {
    id: "propofol",
    name: "Propofol (TIVA)",
    concentration: 10000,
    concentrationUnit: "mcg/mL",
    referenceDoses: [100, 125, 150, 175, 200],
    referenceRange: {
      min: 100,
      max: 200,
      unit: "mcg/kg/min"
    },
    useCase: "ga-maintenance",
    useCaseLabel: "General anesthesia maintenance (TIVA)",
    rangeSourceType: "label",
    rangeSourceNote: "Label-based maintenance infusion range for general anesthesia in healthier adults; lower maintenance rates may be appropriate in older, frailer, or more hemodynamically limited patients.",
    rangeRationale: "Kept centered on the classic healthy-adult TIVA maintenance band so the default stays simple, while the notes make clear that some common OR populations will run lower.",
    notes: "Default preset mirrors the familiar healthy-adult TIVA maintenance band. Elderly, cardiac, or otherwise vulnerable patients may require lower maintenance rates than this default center.",
    dilutionPresets: [
      {
        id: "propofol-10mg-ml",
        label: "1% (10 mg/mL) neat",
        drugAmount: 500,
        drugAmountUnit: "mg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 10000,
        finalConcentrationUnit: "mcg/mL",
        note: "Neat 1% emulsion"
      }
    ],
    references: ["infusion_propofol_dailymed", "infusion_propofol_openanesthesia"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-15"
    }
  },
  {
    id: "esmolol",
    name: "Esmolol",
    concentration: 10000,
    concentrationUnit: "mcg/mL",
    referenceDoses: [50, 100, 150, 200, 300],
    referenceRange: {
      min: 50,
      max: 300,
      unit: "mcg/kg/min"
    },
    useCase: "ga-maintenance",
    useCaseLabel: "Perioperative rate / pressure control",
    rangeSourceType: "label",
    rangeSourceNote: "Label-based esmolol infusion range used perioperatively for rate and pressure control.",
    rangeRationale: "Maintains the broad labeled titration band because esmolol response varies widely with indication and bolus use.",
    notes: "Reference range aligned to DailyMed perioperative infusion dosing; most patients respond within 50-200 mcg/kg/min.",
    dilutionPresets: [
      {
        id: "esmolol-2500mg-250ml",
        label: "2500 mg / 250 mL",
        drugAmount: 2500,
        drugAmountUnit: "mg",
        finalVolume: 250,
        finalVolumeUnit: "mL",
        finalConcentration: 10000,
        finalConcentrationUnit: "mcg/mL",
        note: "Pre-mixed bag standard"
      }
    ],
    references: ["infusion_esmolol_dailymed", "infusion_esmolol_meta_analysis"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-15"
    }
  },
  {
    id: "dexmedetomidine",
    name: "Dexmedetomidine",
    concentration: 4,
    concentrationUnit: "mcg/mL",
    referenceDoses: [0.2, 0.3, 0.4, 0.5, 0.7, 1.0],
    referenceRange: {
      min: 0.2,
      max: 1,
      unit: "mcg/kg/hr",
      timeUnit: "hr",
      weightBased: true
    },
    useCase: "ga-maintenance",
    useCaseLabel: "General anesthesia adjunct / maintenance sedation",
    rangeSourceType: "label",
    rangeSourceNote: "Label-informed perioperative sedation and anesthesia-adjunct maintenance range, broadened beyond the narrower OpenAnesthesia-only band.",
    rangeRationale: "Expanded to 0.2-1 mcg/kg/hr so the default better reflects official dosing guidance and common perioperative practice, without automatically adopting broader ICU-only ceilings.",
    notes: "Default preset now reflects a label-informed perioperative range. OpenAnesthesia remains linked for the more conservative 0.2-0.7 mcg/kg/hr anesthesia-adjunct context.",
    dilutionPresets: [
      {
        id: "dex-200mcg-50ml",
        label: "200 mcg / 50 mL",
        drugAmount: 200,
        drugAmountUnit: "mcg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 4,
        finalConcentrationUnit: "mcg/mL",
        note: "Standard 4 mcg/mL infusion"
      }
    ],
    references: ["infusion_dexmedetomidine_dailymed", "infusion_dexmedetomidine_openanesthesia"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-15"
    }
  },
  {
    id: "remimazolam-induction",
    name: "Remimazolam (GA induction)",
    concentration: 2500,
    concentrationUnit: "mcg/mL",
    referenceDoses: [6000, 9000, 12000],
    referenceRange: {
      min: 6000,
      max: 12000,
      unit: "mcg/kg/hr",
      timeUnit: "hr",
      weightBased: true
    },
    useCase: "ga-induction",
    useCaseLabel: "General anesthesia induction infusion",
    rangeSourceType: "clinical",
    rangeSourceNote: "Clinical induction range based on general-anesthesia trial and OpenAnesthesia summary.",
    rangeRationale: "Converted to hourly units because the attached anesthesia references describe induction infusion as 6-12 mg/kg/hr rather than a default minute-based pump expression.",
    alternateUseCase: "Procedural sedation label uses bolus/top-up dosing: initial 5 mg IV over 1 minute, then 2.5 mg supplements over 15 seconds no sooner than 2 minutes apart.",
    notes: "Use as an induction infusion reference only. Displayed as 6000-12000 mcg/kg/hr to mirror the commonly cited 6-12 mg/kg/hr anesthesia references.",
    dilutionPresets: [
      {
        id: "remimazolam-20mg-8ml",
        label: "20 mg / 8 mL",
        drugAmount: 20,
        drugAmountUnit: "mg",
        finalVolume: 8,
        finalVolumeUnit: "mL",
        finalConcentration: 2500,
        finalConcentrationUnit: "mcg/mL",
        note: "Reconstituted BYFAVO vial concentration"
      }
    ],
    references: [
      "infusion_remimazolam_dailymed",
      "infusion_remimazolam_openanesthesia",
      "infusion_remimazolam_study"
    ],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-15"
    }
  },
  {
    id: "remimazolam-maintenance",
    name: "Remimazolam (GA maintenance)",
    concentration: 2500,
    concentrationUnit: "mcg/mL",
    referenceDoses: [1000, 1200, 1500, 1800, 2000],
    referenceRange: {
      min: 1000,
      max: 2000,
      unit: "mcg/kg/hr",
      timeUnit: "hr",
      weightBased: true
    },
    useCase: "ga-maintenance",
    useCaseLabel: "General anesthesia maintenance infusion",
    rangeSourceType: "clinical",
    rangeSourceNote: "Clinical maintenance range based on OpenAnesthesia and general-anesthesia study dosing.",
    rangeRationale: "Converted to hourly units because the attached anesthesia references describe maintenance infusion around 1-2 mg/kg/hr rather than a label-style minute-based default.",
    alternateUseCase: "Procedural sedation label is separate and bolus-based rather than infusion-based: initial 5 mg IV over 1 minute, then 2.5 mg top-up doses as needed.",
    notes: "Maintenance infusion use for general anesthesia is practice-based and should be checked against institutional protocol. Displayed as 1000-2000 mcg/kg/hr to mirror the commonly cited 1-2 mg/kg/hr anesthesia references.",
    dilutionPresets: [
      {
        id: "remimazolam-20mg-8ml",
        label: "20 mg / 8 mL",
        drugAmount: 20,
        drugAmountUnit: "mg",
        finalVolume: 8,
        finalVolumeUnit: "mL",
        finalConcentration: 2500,
        finalConcentrationUnit: "mcg/mL",
        note: "Reconstituted BYFAVO vial concentration"
      }
    ],
    references: [
      "infusion_remimazolam_dailymed",
      "infusion_remimazolam_openanesthesia",
      "infusion_remimazolam_study"
    ],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-15"
    }
  }
];

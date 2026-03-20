export const DEFAULT_CUSTOM_PEDIATRIC_DRUG = {
  id: "custom",
  name: "Custom drug",
  category: "custom",
  profiles: {
    pediatricBolus: {
      dosePerKgUnit: "mg/kg",
      doseAmountUnit: "mg",
      recommendedRange: {
        min: 0.01,
        max: 0.02
      },
      concentration: {
        value: 1,
        unit: "mg/mL"
      },
      doseLimits: null,
      notes: "User-defined pediatric bolus reference.",
      ageGuidance: {
        default: {
          note: "Custom weight-based bolus estimate.",
          warning: "Custom pediatric dose - verify with institutional protocols and current references."
        }
      },
      verificationStatus: "unverified",
      metadata: {
        source: "User defined",
        lastReviewed: "Current session"
      }
    }
  }
};

export const PEDIATRIC_DRUG_PRESETS = [
  {
    id: "fentanyl",
    name: "Fentanyl",
    category: "opioid",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mcg/kg",
        doseAmountUnit: "mcg",
        recommendedRange: {
          min: 1,
          max: 2
        },
        concentration: {
          value: 50,
          unit: "mcg/mL"
        },
        notes: "Example bolus preset for procedural or intraoperative use. Titrate to context.",
        ageGuidance: {
          default: {
            note: "Weight-based bolus estimate for general pediatric use.",
            warning: "Opioids may require additional caution in younger patients."
          },
          neonate: {
            note: "Neonates may have greater sensitivity and slower clearance.",
            warning: "Use age-specific adjustment and close monitoring."
          },
          infant: {
            note: "Infants may require cautious titration based on response.",
            warning: "Verify local pediatric opioid protocol."
          }
        },
        references: ["pediatric_fentanyl_dailymed"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "glycopyrrolate-preanesthetic",
    name: "Glycopyrrolate (Preanesthetic)",
    category: "anticholinergic",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.004,
          max: 0.004
        },
        concentration: {
          value: 0.2,
          unit: "mg/mL"
        },
        doseLimits: {
          maxTotalDose: 0.1,
          note: "Example IV/IM single-dose cap from labeling context."
        },
        notes: "Preanesthetic pediatric reference preset only. Reversal pairing with neostigmine/pyridostigmine follows a different use-case and should not be inferred from this weight-based preset.",
        ageGuidance: {
          default: {
            note: "Labeling includes 0.004 mg/kg IM preanesthetic dosing and 0.004 mg/kg IV intraoperative dosing in pediatric patients.",
            warning: "Use-case matters. Preanesthetic, intraoperative bradycardia, and reversal workflows are not interchangeable."
          },
          infant: {
            note: "Labeling notes that infants 1 month to 2 years may require up to 0.009 mg/kg in selected preanesthetic contexts.",
            warning: "If using an infant-specific dose outside 0.004 mg/kg, verify the exact labeled context and institutional protocol."
          },
          neonate: {
            note: "Neonatal handling may differ from older infants and children.",
            warning: "Use neonatal-specific judgment and institutional guidance."
          }
        },
        references: ["pediatric_glycopyrrolate_dailymed"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-15"
        }
      }
    }
  },
  {
    id: "glycopyrrolate-reversal",
    name: "Glycopyrrolate (Reversal pairing)",
    category: "reversal-agent",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.005,
          max: 0.01
        },
        concentration: {
          value: 0.2,
          unit: "mg/mL"
        },
        doseLimits: {
          maxTotalDose: 0.2,
          note: "Quick-reference cap only; reversal pairing should be checked directly."
        },
        notes: "Reference-only placeholder for reversal workflows. Glycopyrrolate reversal dosing should be paired directly with neostigmine or pyridostigmine rather than inferred from a standalone weight-based estimate.",
        ageGuidance: {
          default: {
            note: "Typical pairing references are ratio-based, such as glycopyrrolate 0.2 mg per 1 mg neostigmine or per 5 mg pyridostigmine.",
            warning: "Do not rely on this preset alone for reversal. Verify the actual paired reversal agent dose and local protocol."
          },
          infant: {
            note: "Infants may require extra caution with reversal timing and monitoring.",
            warning: "Verify reversal pairing and pediatric monitoring guidance before use."
          },
          neonate: {
            note: "Routine neonatal reversal workflows may differ from older pediatric practice.",
            warning: "Use neonatal-specific judgment and monitoring."
          }
        },
        references: ["pediatric_glycopyrrolate_dailymed", "pediatric_neostigmine_dailymed"],
        verificationStatus: "off-label",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-15"
        }
      }
    }
  },
  {
    id: "rocuronium",
    name: "Rocuronium",
    category: "neuromuscular-blocker",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.6,
          max: 1.2
        },
        concentration: {
          value: 10,
          unit: "mg/mL"
        },
        notes: "Example intubating dose range. Verify indication and protocol.",
        ageGuidance: {
          default: {
            note: "Weight-based bolus estimate for pediatric neuromuscular blockade.",
            warning: ""
          },
          neonate: {
            note: "Neonatal pharmacodynamics may differ from older children.",
            warning: "Use age-specific clinical judgment and neuromuscular monitoring."
          }
        },
        references: ["pediatric_rocuronium_dailymed"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "sugammadex",
    name: "Sugammadex",
    category: "reversal-agent",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 2,
          max: 4
        },
        concentration: {
          value: 100,
          unit: "mg/mL"
        },
        notes: "Example reversal range only. Actual dose depends on depth of block and monitoring.",
        ageGuidance: {
          default: {
            note: "Interpret dose in the context of neuromuscular monitoring and reversal goal.",
            warning: "Depth-of-block specific dosing may differ from this quick estimate."
          },
          infant: {
            note: "Infants may require extra caution with monitoring and confirmation of recovery.",
            warning: "Verify institutional pediatric reversal protocol."
          },
          neonate: {
            note: "Routine neonatal use may not follow the same assumptions as older children.",
            warning: "Use neonatal-specific guidance and monitoring."
          }
        },
        references: ["pediatric_sugammadex_fda"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "neostigmine",
    name: "Neostigmine",
    category: "reversal-agent",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.04,
          max: 0.07
        },
        concentration: {
          value: 1,
          unit: "mg/mL"
        },
        notes: "Example reversal range only. Pairing with an anticholinergic and monitoring remain essential.",
        ageGuidance: {
          default: {
            note: "Use as a reference estimate alongside neuromuscular monitoring.",
            warning: "Verify pairing agent, timing, and institutional practice."
          },
          neonate: {
            note: "Neonates may not follow routine pediatric reversal assumptions.",
            warning: "Use neonatal-specific judgment and monitoring."
          }
        },
        references: ["pediatric_neostigmine_dailymed"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "pyridostigmine",
    name: "Pyridostigmine",
    category: "reversal-agent",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.1,
          max: 0.25
        },
        concentration: {
          value: 5,
          unit: "mg/mL"
        },
        notes: "Example reversal range only. Confirm local practice and monitoring before use.",
        ageGuidance: {
          default: {
            note: "Weight-based estimate for pediatric reversal workflows.",
            warning: "Verify timing, anticholinergic pairing, and recovery monitoring."
          },
          infant: {
            note: "Infants may require more cautious interpretation of reversal timing.",
            warning: "Check institutional pediatric reversal guidance."
          }
        },
        verificationStatus: "off-label",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "atropine",
    name: "Atropine",
    category: "anticholinergic",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.01,
          max: 0.02
        },
        concentration: {
          value: 0.1,
          unit: "mg/mL"
        },
        doseLimits: {
          maxTotalDose: 0.5,
          note: "Example maximum single dose cap."
        },
        notes: "Use current institutional standards, including any minimum dose rules if applicable.",
        ageGuidance: {
          default: {
            note: "Weight-based estimate only; minimum dose policies may exist locally.",
            warning: "Check institutional guidance for minimum dose handling."
          },
          neonate: {
            note: "Neonates may require extra attention to dilution and minimum dose handling.",
            warning: "Verify neonatal protocol before administration."
          },
          infant: {
            note: "Infants may still be affected by local minimum dose conventions.",
            warning: "Check institutional reference before use."
          }
        },
        references: ["pediatric_atropine_dailymed"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "propofol",
    name: "Propofol",
    category: "hypnotic",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 1,
          max: 3
        },
        concentration: {
          value: 10,
          unit: "mg/mL"
        },
        notes: "Example bolus range only. Sedation and induction workflows may use different targets.",
        ageGuidance: {
          default: {
            note: "Use clinical context to distinguish sedation from induction dosing.",
            warning: "Hemodynamic response and airway risk should be considered."
          },
          infant: {
            note: "Infants may have different sensitivity and airway considerations.",
            warning: "Use cautious titration and verify local protocol."
          },
          neonate: {
            note: "Neonatal practice may differ substantially from older children.",
            warning: "Use neonatal-specific guidance."
          }
        },
        references: ["pediatric_propofol_dailymed"],
        verificationStatus: "off-label",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-15"
        }
      }
    }
  },
  {
    id: "ketamine",
    name: "Ketamine",
    category: "dissociative",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 1,
          max: 2
        },
        concentration: {
          value: 10,
          unit: "mg/mL"
        },
        notes: "Example IV bolus range only. Sedation, analgesia, and induction goals may differ.",
        ageGuidance: {
          default: {
            note: "Interpret in the context of intended depth and adjunct medications.",
            warning: "Verify sedation pathway and local pediatric guidance."
          },
          infant: {
            note: "Younger infants may require more cautious airway and recovery planning.",
            warning: "Use age-specific clinical judgment."
          }
        },
        references: ["pediatric_ketamine_dailymed"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "thiopental",
    name: "Thiopental",
    category: "hypnotic",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 3,
          max: 5
        },
        concentration: {
          value: 25,
          unit: "mg/mL"
        },
        notes: "Example induction range only. Availability and local workflow may vary.",
        ageGuidance: {
          default: {
            note: "Use as a quick reference only and confirm institutional familiarity.",
            warning: "Check formulation strength and local protocol."
          },
          neonate: {
            note: "Neonatal handling may differ from standard pediatric assumptions.",
            warning: "Use neonatal-specific guidance."
          }
        },
        verificationStatus: "unverified",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "ondansetron",
    name: "Ondansetron",
    category: "antiemetic",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.1,
          max: 0.15
        },
        concentration: {
          value: 2,
          unit: "mg/mL"
        },
        doseLimits: {
          maxTotalDose: 4,
          note: "Example maximum single dose cap."
        },
        notes: "Example antiemetic dose range only. Verify age- and indication-specific guidance.",
        ageGuidance: {
          default: {
            note: "Weight-based estimate for common pediatric antiemetic use.",
            warning: ""
          },
          neonate: {
            note: "Neonatal use may not follow the same routine assumptions as older children.",
            warning: "Verify neonatal appropriateness and protocol."
          }
        },
        references: ["pediatric_ondansetron_dailymed"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "dexamethasone",
    name: "Dexamethasone",
    category: "steroid",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.1,
          max: 0.15
        },
        concentration: {
          value: 4,
          unit: "mg/mL"
        },
        notes: "Example perioperative antiemetic or airway edema reference range only.",
        ageGuidance: {
          default: {
            note: "Indication-specific practice may differ between antiemetic and airway use.",
            warning: "Verify indication-specific institutional guidance."
          },
          infant: {
            note: "Infants may require more careful indication-based interpretation.",
            warning: "Check local pediatric anesthesia protocol."
          },
          neonate: {
            note: "Routine neonatal use may not follow standard pediatric assumptions.",
            warning: "Verify neonatal appropriateness before use."
          }
        },
        verificationStatus: "off-label",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  }
];

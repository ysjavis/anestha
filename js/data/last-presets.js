export const LOCAL_ANESTHETIC_PRESETS = [
  {
    id: "lidocaine",
    name: "Lidocaine",
    maxDoseMgPerKg: 4.5,
    maxDoseWithEpiMgPerKg: 7,
    onsetMinutes: "5–10",
    durationMinutes: "60–120",
    notes: "Most commonly used LA. CNS toxicity threshold lower than cardiovascular.",
    references: ["last_asra_2020"]
  },
  {
    id: "bupivacaine",
    name: "Bupivacaine",
    maxDoseMgPerKg: 2.5,
    maxDoseWithEpiMgPerKg: 3,
    onsetMinutes: "10–20",
    durationMinutes: "120–240",
    notes: "High cardiotoxicity risk. Narrow margin between CNS and cardiovascular toxicity.",
    references: ["last_asra_2020"]
  },
  {
    id: "ropivacaine",
    name: "Ropivacaine",
    maxDoseMgPerKg: 3,
    maxDoseWithEpiMgPerKg: null,
    onsetMinutes: "10–20",
    durationMinutes: "120–240",
    notes: "Lower cardiotoxicity than bupivacaine. Epinephrine does not significantly increase max dose.",
    references: ["last_asra_2020"]
  },
  {
    id: "levobupivacaine",
    name: "Levobupivacaine",
    maxDoseMgPerKg: 2.5,
    maxDoseWithEpiMgPerKg: 3,
    onsetMinutes: "10–20",
    durationMinutes: "120–240",
    notes: "S-enantiomer of bupivacaine. Lower cardiotoxicity profile than racemic bupivacaine.",
    references: ["last_asra_2020"]
  },
  {
    id: "mepivacaine",
    name: "Mepivacaine",
    maxDoseMgPerKg: 4.5,
    maxDoseWithEpiMgPerKg: 7,
    onsetMinutes: "5–10",
    durationMinutes: "90–180",
    notes: "Similar profile to lidocaine. Longer duration without epinephrine.",
    references: ["last_asra_2020"]
  },
  {
    id: "chloroprocaine",
    name: "Chloroprocaine",
    maxDoseMgPerKg: 11,
    maxDoseWithEpiMgPerKg: 14,
    onsetMinutes: "3–5",
    durationMinutes: "30–60",
    notes: "Ester-type LA. Rapid hydrolysis by pseudocholinesterase limits systemic toxicity.",
    references: ["last_asra_2020"]
  }
];

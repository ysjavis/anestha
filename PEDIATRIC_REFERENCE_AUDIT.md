# Pediatric Reference Audit

## Purpose

This file is the pediatric counterpart to the infusion audit. It records where pediatric dosing and airway references come from, whether links have been verified, and where source-to-logic review still needs caution.

Important interpretation rules:
- Pediatric dosing presets may be `Supported`, `Off-label / Reference only`, or `Unverified` inside the UI. That status is separate from whether the URL itself has been link-verified.
- Airway references are often formula-based or manufacturer-guide based. Even a verified link does not mean the estimate is appropriate for every child.
- Link verification is complete for the current pediatric references, but content review is still narrower than the infusion audit and should be extended whenever preset values or sizing logic change.

## Dosing References

| Pediatric reference id | Drug / topic | Source | Current link type | Link status | Audit note |
| --- | --- | --- | --- | --- | --- |
| `pediatric_fentanyl_dailymed` | Fentanyl dosing | DailyMed | Official | Verified | DailyMed link was re-opened successfully in this pediatric dosing pass. |
| `pediatric_rocuronium_dailymed` | Rocuronium dosing | DailyMed | Official | Verified | DailyMed link was re-opened successfully in this pediatric dosing pass. |
| `pediatric_sugammadex_fda` | Sugammadex dosing | FDA PDF | Official | Verified | FDA label PDF was re-opened successfully in this pediatric dosing pass. |
| `pediatric_neostigmine_dailymed` | Neostigmine dosing | DailyMed | Official | Verified | DailyMed link was re-opened successfully in this pediatric dosing pass. |
| `pediatric_glycopyrrolate_dailymed` | Glycopyrrolate dosing | DailyMed | Official | Verified | Mirror link was replaced with an official DailyMed link in this pass, but preset-vs-source wording should still be reviewed later. |
| `pediatric_atropine_dailymed` | Atropine dosing | DailyMed | Official | Verified | DailyMed link was re-opened successfully in this pediatric dosing pass. |
| `pediatric_propofol_dailymed` | Propofol dosing | DailyMed | Official | Verified | DailyMed link was re-opened successfully in this pediatric dosing pass. |
| `pediatric_ketamine_dailymed` | Ketamine dosing | DailyMed | Official | Verified | DailyMed link was re-opened successfully in this pediatric dosing pass. |
| `pediatric_ondansetron_dailymed` | Ondansetron dosing | DailyMed | Official | Verified | DailyMed link was re-opened successfully in this pediatric dosing pass. |

## Airway References

| Pediatric reference id | Topic | Source | Current link type | Link status | Audit note |
| --- | --- | --- | --- | --- | --- |
| `pediatric_ett_openanesthesia` | ETT / pediatric laryngoscopy | OpenAnesthesia | Clinical education | Verified | OpenAnesthesia link was re-opened successfully in this pediatric airway pass. |
| `pediatric_ett_msd_calculator` | ETT size calculator | MSD Manual | Clinical calculator | Verified | MSD calculator link was re-opened successfully in this pediatric airway pass. |
| `igel_intersurgical` | i-gel sizing | Intersurgical | Manufacturer | Verified | Intersurgical sizing page was re-opened successfully in this pediatric airway pass. |
| `lma_supreme_teleflex` | LMA Supreme sizing | Teleflex PDF | Manufacturer | Verified | Teleflex PDF was re-opened successfully in this pediatric airway pass. |
| `pediatric_oral_airway_basics` | Oral airway / routine airway management | Basics of Pediatric Anesthesia | Educational | Verified | Educational airway chapter was re-opened successfully in this pediatric airway pass. |
| `pediatric_laryngoscope_blade_guide` | Blade choice | The Protected Airway | Educational / blog-style | Verified | Link was re-opened successfully, though source authority is still lower than society guidance or textbooks. |
| `pediatric_nasal_airway_pubmed` | Nasal airway insertion depth | PubMed | Study | Verified | PubMed study link was re-opened successfully in this pediatric airway pass. |
| `pediatric_face_mask_ambu` | Face mask sizing | Ambu | Manufacturer | Verified | Manufacturer link was updated to a more stable product page in this pass. |
| `pediatric_face_mask_intersurgical` | Face mask sizing | Intersurgical | Manufacturer | Verified | Manufacturer link was updated to a more stable information page in this pass. |

## Content And Logic Review

| Area | Current app logic | Review outcome | Audit note |
| --- | --- | --- | --- |
| `Fentanyl` | `1-2 mcg/kg` quick-reference bolus range | Acceptable as a local quick-reference range | Source link is valid, but the preset is still a simplified anesthesia bolus estimate rather than a label-derived pediatric range table. |
| `Glycopyrrolate (Preanesthetic)` | `0.004 mg/kg` preset with infant note up to `0.009 mg/kg` | Acceptable if kept tightly scoped | This matches the preanesthetic context better than reversal or generic anticholinergic use. The UI note correctly warns against extrapolating to reversal workflows. |
| `Glycopyrrolate (Reversal pairing)` | `0.005-0.01 mg/kg` placeholder range | Keep as `Off-label / Reference only` | Attached sources support the component drugs, but the actual pairing is ratio-based and protocol-dependent. The current status is appropriately conservative. |
| `Pyridostigmine` | `0.1-0.25 mg/kg` quick-reference reversal range | Keep as `Off-label / Reference only` | No direct pediatric reference is attached in `REFERENCE_REGISTRY`, so this should remain clearly non-validated. |
| `Atropine` | `0.01-0.02 mg/kg` with `0.5 mg` single-dose cap | Acceptable with caution note | The calculator already warns that institutional minimum-dose conventions may differ. That warning should remain prominent because it is not encoded in the arithmetic. |
| `Propofol` | `1-3 mg/kg` single bolus range | Downgraded to `Off-label / Reference only` | The attached label is real, but the preset blends sedation and induction contexts into one quick range. It should not appear as fully source-matched pediatric guidance. |
| `Ketamine` | `1-2 mg/kg` IV bolus range | Acceptable as quick-reference only | The linked source is valid, but clinical context still matters because analgesia, sedation, and induction targets differ. |
| `Ondansetron` | `0.1-0.15 mg/kg`, max `4 mg` | Acceptable as quick-reference range | The cap and range are reasonable for common perioperative use, but indication- and age-specific exceptions still belong to protocol review. |
| `ETT sizing` | `age/4 + 4`, `age/4 + 3.5`, oral depth rules, `tube size x 3` cross-check | Keep as reference-only formula support | These are standard quick estimates, but they are assembled from educational formula patterns rather than a single authoritative source. They should stay clearly labeled as estimates. |
| `Other airway devices` | weight/age bands for oral airway, laryngoscope, nasal airway, face mask, supraglottic devices | Acceptable as guide-band logic | Manufacturer and educational links support the broad categories, but fit and numbering remain brand- and anatomy-dependent. |

## Open Follow-up

- If any pediatric reference link is edited in the future, it should return to `Needs recheck` until the updated destination is manually confirmed again.
- Expand source-to-logic review to the remaining lower-confidence pediatric presets, especially `thiopental` and `dexamethasone`.
- If pediatric dose arithmetic is changed later, re-check whether the warning text still matches what is and is not encoded in the calculator.
- Pediatric airway links are structurally audited, but formula-to-source alignment should still be reviewed if the sizing logic is changed later.

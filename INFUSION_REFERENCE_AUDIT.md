# Infusion Reference Audit

## Purpose

This file tracks which source type is currently driving each infusion calculator preset.

Important interpretation rules:
- `Label` means the displayed calculator range is based primarily on product labeling or equivalent prescribing information.
- `Clinical` means the displayed calculator range is based primarily on perioperative or anesthesia practice references, not a single package insert.
- `Study-specific` means a cited study is provided for context only; it should not be treated as the default calculator range unless explicitly stated.
- Calculator presets are operational references only. They are not universal dosing standards and must be checked against institutional protocols and the original source.

## Current Audit

Verification status rules:
- `Verified` means the currently stored reference links were manually rechecked during this cleanup pass or directly repaired because a broken link was found.
- `Needs recheck` means the citation structure is still reasonable, but the exact URL was not re-opened and re-verified in this cleanup pass.

| Drug | Current calculator range | Range type | Primary range basis | Supporting references | Link status | Audit note |
| --- | --- | --- | --- | --- | --- | --- |
| Norepinephrine | `0.01-0.3 mcg/kg/min` | Clinical | Institutional / perioperative practice range | DailyMed label, OpenAnesthesia context, perioperative induction study | Verified | Calculator preset was widened to better reflect common OR practice while the DailyMed label remains linked separately as `mcg/min`. |
| Epinephrine | `0.05-2 mcg/kg/min` | Label | Broad DailyMed prescribing range | OpenAnesthesia context article | Verified | Current preset intentionally stays broad; perioperative low-dose beta-support practice may live in a narrower lower band, but the calculator keeps the wider labeled range as the default. |
| Phenylephrine | `0.5-1.4 mcg/kg/min` | Label | DailyMed anesthesia-associated hypotension infusion range | perioperative safety study | Verified | DailyMed also includes a broader vasodilatory-shock infusion range, but the calculator intentionally keeps the narrower OR hypotension band as the default. |
| Vasopressin | `0.01-0.04 unit/min` | Clinical | OpenAnesthesia perioperative refractory hypotension dosing | DailyMed label | Verified | DailyMed and OpenAnesthesia links were repaired in this pass; perioperative use is shown in `unit/min`. |
| Nitroglycerin | `5-200 mcg/min` | Label | DailyMed titration approach | OpenAnesthesia nitroglycerin article | Verified | DailyMed and OpenAnesthesia links were re-opened successfully in this pass. |
| Nicardipine | `2.5-15 mg/hr` | Label | DailyMed titration range for continuous infusion | perioperative emergence study | Verified | Current preset stays in absolute `mg/hr` because that matches the label-style titration workflow; a perioperative study using `mcg/kg/min` is linked separately as contextual support only. |
| Dopamine | `2-50 mcg/kg/min` | Label | DailyMed infusion labeling | perioperative cardiac study | Verified | DailyMed and PubMed links were re-opened successfully in this pass. |
| Dobutamine | `2.5-20 mcg/kg/min` | Label | DailyMed infusion labeling | none added yet beyond label | Verified | DailyMed link was re-opened successfully in this pass; it still lacks an added perioperative anesthesia-specific supporting source. |
| Milrinone | `0.375-0.75 mcg/kg/min` | Clinical | OpenAnesthesia perioperative maintenance dosing | DailyMed label | Verified | DailyMed and OpenAnesthesia links were re-opened successfully in this pass. |
| Isoproterenol | `0.5-5 mcg/min` | Label | DailyMed infusion labeling | electrophysiology/TIVA study | Verified | DailyMed and PubMed links were re-opened successfully in this pass. |
| Remifentanil | `0.05-2 mcg/kg/min` | Label | DailyMed maintenance infusion labeling | thoracic anesthesia study | Verified | Current preset remains appropriate as a broad OR maintenance band; clarification was added that many routine cases cluster in the lower-middle part of the same labeled range. |
| Propofol (TIVA) | `100-200 mcg/kg/min` | Label | DailyMed adult general anesthesia maintenance range | OpenAnesthesia propofol article | Verified | Current preset remains a clean healthy-adult TIVA default; clarification was added that elderly or more fragile patients commonly require lower maintenance rates. |
| Esmolol | `50-300 mcg/kg/min` | Label | DailyMed perioperative infusion labeling | perioperative meta-analysis | Verified | DailyMed and PubMed links were re-opened successfully in this pass. |
| Dexmedetomidine | `0.2-1 mcg/kg/hr` | Label | Label-informed perioperative sedation / anesthesia-adjunct maintenance range | OpenAnesthesia clinical context | Verified | Preset was widened from the narrower `0.2-0.7` anesthesia-adjunct band so the calculator better reflects official dosing guidance while still avoiding broader ICU-only ceilings. |
| Remimazolam (GA induction) | `6000-12000 mcg/kg/hr` | Clinical | OpenAnesthesia and phase IIb/III general anesthesia trial induction infusion range | FDA BYFAVO label for procedural sedation context, PubMed PMID 32417976 | Verified | FDA label link was repaired in this pass; display was converted to hourly units so the calculator mirrors the commonly cited `6-12 mg/kg/hr` anesthesia references. |
| Remimazolam (GA maintenance) | `1000-2000 mcg/kg/hr` | Clinical | OpenAnesthesia and phase IIb/III general anesthesia trial maintenance infusion range | FDA BYFAVO label for procedural sedation context, PubMed PMID 32417976 | Verified | FDA label link was repaired in this pass; display was converted to hourly units so the calculator mirrors the commonly cited `1-2 mg/kg/hr` anesthesia references. |

## Open Follow-up

- Dobutamine still needs a stronger perioperative anesthesia-specific supporting reference if one is available.
- Norepinephrine now uses a broader institutional / perioperative practice range rather than the narrower OpenAnesthesia-only band; similar review may later be worthwhile for other vasopressor presets if local workflow fit becomes a larger priority.
- Remimazolam procedural sedation remains a labeled bolus/top-up use case rather than an infusion calculator preset and should stay separated unless a dedicated non-infusion calculator is added.
- If any link is edited in the future, its status should return to `Needs recheck` until the updated destination is manually confirmed again.
- Any future change to a calculator range should update both `script.js` and this audit file in the same commit.
- If a drug's displayed range is changed from `Label` to `Clinical`, the rationale should explain why the workflow benefit outweighs strict label mirroring.

## Practice-Range Review Candidates

These are the next presets most likely to diverge from day-to-day perioperative or institutional use, even if the current range is still defensible.

### Priority 1

- `Phenylephrine`
  - Current preset is a narrow label-style OR hypotension band.
  - DailyMed also includes a broader vasodilatory-shock infusion range, so this drug is a strong candidate if local practice wants a wider perioperative default than `0.5-1.4 mcg/kg/min`.

- `Epinephrine`
  - Current preset is broad and label-based, but actual OR use often depends heavily on hemodynamic context and local convention.
  - Worth checking whether the local workflow wants to keep the broad labeled band or use a lower-centered perioperative default for beta-support use cases.

- `Dexmedetomidine`
  - Current preset now uses a label-informed perioperative range rather than the narrower OpenAnesthesia-only anesthesia-adjunct band.
  - Still worth checking if local practice prefers to keep the default centered lower, especially when dexmedetomidine is used mainly as a light adjunct rather than a deeper sedation infusion.

### Priority 2

- `Remifentanil`
  - Current preset is label-based and broad enough for many OR cases, but institutional TIVA practice may still favor a different default center of gravity.

- `Propofol (TIVA)`
  - Current preset is a relatively clean healthy-adult maintenance band, but some sites may want lower routine maintenance values or a separate lighter-sedation / TIVA distinction.

- `Vasopressin`
  - Current preset is already clinical and expressed in `unit/min`, which matches many perioperative workflows.
  - Still worth checking if the local institution prefers a different practical ceiling or more explicit “adjunct to norepinephrine” framing.

### Lower Priority For Now

- `Nitroglycerin`
  - Current absolute-dose framing, with optional `mcg/kg/min` display support, already matches common OR titration language reasonably well.

- `Dopamine`
  - Less likely to need a workflow-driven adjustment unless the local site still uses dopamine frequently and wants narrower clinical bands.

- `Dobutamine`
  - More likely to need better supporting references than an immediate range change.

- `Milrinone`
  - Current maintenance-focused framing is already fairly close to how many cardiac anesthesia users think about the drug.

- `Esmolol`
  - Current range is broad but still clinically recognizable; user feedback may tell us whether the default band feels too wide.

- `Isoproterenol`
  - Niche enough that workflow feedback should probably come before any preset change.

# Anestha Project Status

## Overview

Anestha is a lightweight HTML/CSS/JavaScript anesthesia calculator web app prototype.

Current stack:
- Plain `HTML / CSS / JavaScript`
- No framework
- No build system
- Local persistence with `localStorage`

Current main files:
- [index.html](/Users/mymacbookprom2/Desktop/ Coding projects/anestha/index.html)
- [style.css](/Users/mymacbookprom2/Desktop/ Coding projects/anestha/style.css)
- [script.js](/Users/mymacbookprom2/Desktop/ Coding projects/anestha/script.js)
- [CHANGELOG.md](/Users/mymacbookprom2/Desktop/ Coding projects/anestha/CHANGELOG.md)
- [VERSIONING_AND_RELEASE.md](/Users/mymacbookprom2/Desktop/ Coding projects/anestha/VERSIONING_AND_RELEASE.md)

## Current App Structure

Top-level calculator tabs:
- `Infusion`
- `Dilution`
- `Pediatric`
- `MH / Dantrolene`
- `Weight`
- `Support`

Implemented calculators:
- `Infusion`
- `Dilution`
- `Pediatric`
- `MH / Dantrolene`
- `Weight`
- `Support`

## Recent Progress

### 2026-03-20

ES module refactoring Phase 4d completed:
- Extracted `js/ui/infusion.js` (~1558 lines): Infusion Single Drug DOM refs, drug config, view state, validation, quick mode sliders/steppers, result rendering, all event handlers and wiring
- Extracted `js/ui/workspace.js` (~887 lines): Multi Drug workspace DOM refs, card rendering, layout mode management, card state management, template handlers, all event handlers and wiring
- Moved shared utility functions (`getAdaptiveQuickStep`, `getStepPrecision`, `clampNumber`) to `js/calc/utils.js`
- `script.js` is now a thin orchestration layer (~286 lines): imports, calculator/view routing, support/feedback config, language switching, and initial restore

### 2026-03-19

Latest committed progress:
- `Infusion > Multi Drug Quick` concentration / target-dose input layout was stabilized so numeric values remain visible during quick editing
- `Multi Drug Quick` now uses a more reliable `Drug full-width + 2-column numeric fields` layout
- quick `Concentration` / `Target Dose` steppers were moved below the input row to reduce layout collisions with unit suffixes
- `main` and `next` are currently synced at commit `f86d50a`

### 2026-03-18

Completed UI polish:
- `Infusion > Multi Drug` toolbar order refined to `Quick / Full -> Shared Patient Weight -> Add drug`
- `Multi Drug Quick` now preserves input focus more carefully while re-rendering
- `Multi Drug Quick` now recalculates during input editing instead of feeling delayed until blur/change
- mobile quick cards in `Multi Drug` have larger number inputs, clearer supporting text, and more structured action button layout
- `Single Drug Quick` was simplified further so result support/reference surfaces feel less duplicated
- empty favorites/recent shortcut groups are now hidden in `Single Drug Quick`
- neutral reference-only warning styling was added so default result warnings feel less visually alarming when the value is still within range
- `Multi Drug` top-right `Add drug` action was visually softened to behave more like a secondary toolbar action

Current follow-up check:
- manually review `Multi Drug Quick` on real mobile browsers for spacing consistency after the latest input-layout stabilization

## Infusion Status

### Single Drug

Implemented inside `Infusion > Single Drug`:
- `Dose -> Infusion Rate`
- `Infusion Rate -> Dose`

Supported features:
- `Quick / Full` input layouts for Single Drug
- automatic live calculation in `Quick`
- `+ / -` steppers for weight, concentration, target dose, and pump rate in `Quick`
- `Quick` sliders for weight and the active calculation field
- preset drugs
- custom drug
- editable concentration
- editable reference dose list
- supporting reference table shown after calculation
- standard dilution preset display
- `Apply` button for standard dilution
- warning when outside reference range
- favorites / recent drugs
- result references
- localStorage restore
- `KO / EN` language toggle (medical terms remain primarily English in `KO` mode)
- compact quick-mode reference/support presentation to reduce initial reading burden

Current infusion presets include:
- norepinephrine
- epinephrine
- phenylephrine
- vasopressin
- nitroglycerin
- nicardipine
- dopamine
- dobutamine
- milrinone
- isoproterenol
- remifentanil
- propofol (TIVA)
- esmolol
- dexmedetomidine
- remimazolam (GA induction)
- remimazolam (GA maintenance)

Infusion references:
- connected through `REFERENCE_REGISTRY`
- mix of official label, clinical education, and study links
- cards now show `Source year` separately from `Last reviewed` when that year is known
- key references can include `Context` and `Check section` to make manual verification easier

### Multi Drug

Implemented inside `Infusion > Multi Drug`:
- shared patient weight
- multiple infusion cards
- `+ Add drug`
- remove card
- `Move up`
- `Move down`
- template save / load / delete
- localStorage restore

Multi Drug behavior:
- cards are independent calculations
- no drug-drug interaction logic
- no compatibility / combined effect logic
- shared weight applies to all multi-drug cards when the drug uses weight-based dosing
- some drugs now use absolute-dose mode (`mcg/min`, `unit/min`) and do not require shared weight
- workspace-level `Quick / Full` mode is available
- `Quick` supports compact card controls with stepper-based adjustment
- template controls are moved behind disclosure in `Quick`
- `Quick` now prioritizes manipulation-first layout with faster visual scan and lighter reference density
- recent quick-mode polish improved live input response while preserving focus during quick edits
- quick numeric fields were rebalanced so `Concentration` and `Target Dose` values stay visible even with unit suffixes and steppers

Current multi-drug card UI:
- drug name shown clearly in header
- category chip shown
- subtle accent border by drug group
- concentration editable
- target dose editable
- `Apply standard dilution`
- reference range shown
- range-type badge shown (`Label` / `Clinical`)
- source note and rationale shown in card reference note
- quick cards use denser layout and larger touch-friendly inputs on mobile
- quick header/actions are simplified to reduce control clutter
- quick cards use `Drug` as a full-width row, with `Concentration` and `Target Dose` shown in a stable 2-column layout
- quick `Concentration` / `Target Dose` steppers are placed below the input row to protect input visibility

Current limits:
- maximum 6 multi-drug cards
- maximum 10 saved templates

Template behavior:
- saves card setup only
- keeps current shared patient weight separate
- intended for routine setups such as `Open Heart Surgery`

## Pediatric Status

`Pediatric` currently has two major modes:
- `Dosing`
- `Airway Equipment`
- `Emergency`

### Pediatric Dosing

Implemented:
- weight-based bolus dosing
- age group support
- concentration-based volume calculation
- min/max dose calculation
- max dose / capped dose support for selected drugs
- custom pediatric drug
- saved custom pediatric drugs
- localStorage restore
- verification status system
- references panel

Current pediatric concepts:
- `Supported`
- `Off-label / Reference only`
- `Unverified`

Unverified presets can be hidden by default.

Examples of pediatric presets:
- fentanyl
- rocuronium
- sugammadex
- neostigmine
- pyridostigmine
- atropine
- propofol
- ketamine
- thiopental
- ondansetron
- dexamethasone
- glycopyrrolate (preanesthetic)
- glycopyrrolate (reversal pairing)

### Pediatric Emergency

Implemented:
- weight-based emergency quick reference
- core PALS drug cards
- official AHA algorithm references

Current emergency drug quick reference includes:
- epinephrine
- atropine
- adenosine
- amiodarone
- lidocaine

Notes:
- this is a core-code drug quick reference, not a full resuscitation workflow
- rhythm recognition, cardioversion/defibrillation, airway steps, and institutional emergency protocol still require separate review

### Pediatric Airway Equipment

Implemented:
- ETT
- Supraglottic airway
- Oral airway
- Nasal airway
- Laryngoscope
- Face mask

Notes:
- ETT size rounded to available `0.5 mm ID`
- oral depth shown as `from lip`
- supraglottic sizing is device-specific reference, not formula-based
- references shown via `REFERENCE_REGISTRY`

## MH / Dantrolene Status

Implemented as separate calculator tab:
- patient weight
- formulation selection
- initial dose target
- calculated initial dose in mg
- cumulative max dose
- vial count
- reconstitution reminder
- MH quick guide
- references
- localStorage restore

Current formulations:
- `Standard 20 mg vial`
- `RYANODEX 250 mg vial`

Current MH quick guide sections:
- `Initial`
- `Repeat bolus`
- `Maintenance`

## Support Status

Implemented as separate calculator tab:
- feedback access
- support/donation structure
- direct contact channel
- donation area hidden until real support links are configured

Current support behavior:
- `Feedback` is available through Google Form
- `Support` links can later point to `Toss` and/or `Ko-fi`
- donation UI remains hidden until a real support URL is added
- `Contact Us` is available separately from feedback
- current contact email is `Anestha.contact@gmail.com`

## Weight Status

Implemented as separate calculator tab:
- biological sex selection
- height input
- total body weight input
- calculated `BMI`
- calculated `IBW`
- calculated `LBW`
- calculated `AdjBW`
- calculated `BSA (Mosteller)`

Current weight-tools behavior:
- intended as a quick perioperative body-weight reference helper
- updates live as values change
- shows a note when `AdjBW` is effectively the same as total body weight

## Architecture Notes

### ES Module Refactoring (next branch)

The codebase is being progressively split from a single `script.js` into ES modules. Current status:

| Phase | Extracted | script.js lines |
|-------|-----------|-----------------|
| 1 | Static data + pure calc functions | 8100 → 5538 |
| 2 | Persistence + state layer | 5538 → 4823 |
| 3 | i18n layer + infusion display helpers + pediatric airway data | 4823 → 4509 |
| 4a | Reference helpers, Weight UI, MH/Dantrolene UI | 4509 → 3994 |
| 4b | Dilution UI (`js/ui/dilution.js`) | 3994 → ~3888 |
| 4c | Pediatric UI (`js/ui/pediatric.js`) | ~3888 → ~2694 |
| 4d | Infusion Single Drug UI (`js/ui/infusion.js`) + Workspace UI (`js/ui/workspace.js`) + shared utils | ~2694 → ~286 |

Current module structure:
- `js/data/` — translations, drug presets, pediatric presets, reference registry, mh-presets, pediatric-airway
- `js/calc/` — infusion, body-weight, pediatric, utils (+ getAdaptiveQuickStep, getStepPrecision, clampNumber), infusion-display, reference-helpers
- `js/store/` — state (persistence + state getters/setters)
- `js/i18n.js` — t(), currentLanguage, language preference
- `js/ui/weight.js` — Weight tab DOM refs, render, event wiring
- `js/ui/mh.js` — MH/Dantrolene tab DOM refs, render, event wiring
- `js/ui/dilution.js` — Dilution tab DOM refs, `formatDilutionPreset`, `activateDilutionMode`, submit/reset/mode-change handlers, event wiring
- `js/ui/pediatric.js` — Pediatric tab DOM refs, all rendering/display functions, all event handlers, wiring
- `js/ui/infusion.js` — Infusion Single Drug DOM refs, drug config layer, view state, validation, quick mode sliders/steppers, result rendering, event handlers, wiring
- `js/ui/workspace.js` — Multi Drug workspace DOM refs, card rendering, layout mode, card state management, template handlers, event wiring

Remaining in `script.js` (~286 lines, thin orchestration layer):
- Imports from all UI modules
- Calculator tab / infusion view routing
- Support / feedback config and link management
- `setLanguage()` orchestration across modules
- Initial restore bootstrap

Important state structures:
- `singleDrug`
- `pediatricDose`
- `dantroleneQuick`
- `infusionWorkspace`
- `infusionTemplates`

There is already groundwork for future expansion:
- `singleDrug` can later become one infusion card in a larger `Case View`
- drug/reference structures are moving toward reusable catalog patterns
- `REFERENCE_REGISTRY` is in place for updateable medical sources
- infusion presets now carry explicit range-source metadata (`Label` vs `Clinical`)
- infusion reference audit is tracked in [INFUSION_REFERENCE_AUDIT.md](/Users/mymacbookprom2/Desktop/ Coding projects/anestha/INFUSION_REFERENCE_AUDIT.md)
- pediatric reference links are verified, and source-to-logic review notes are tracked in [PEDIATRIC_REFERENCE_AUDIT.md](/Users/mymacbookprom2/Desktop/ Coding projects/anestha/PEDIATRIC_REFERENCE_AUDIT.md)
- release/version workflow is documented in [VERSIONING_AND_RELEASE.md](/Users/mymacbookprom2/Desktop/ Coding projects/anestha/VERSIONING_AND_RELEASE.md)
- colleague-facing changes can be tracked in [CHANGELOG.md](/Users/mymacbookprom2/Desktop/ Coding projects/anestha/CHANGELOG.md)

## Product Direction

## Product Direction & Long-Term Roadmap

Current product principle:
- this app does **not** currently assess drug interactions or recommend drug combinations
- multi-drug templates are routine setup helpers only

**Release & QA Checklist:**
- [ ] Review all reference values before release
- [ ] Implement login / custom configuration saving (cloud persistence?)
- [x] `KO / EN` language toggle
- [ ] Additional language support beyond `KO / EN` (only if it can be meaningfully reviewed)

### Focus Area 1: Infusion (Infusion Pump Calculator)
*   **Enhancements:**
    - [x] Indicate rate limits visually (e.g., turn text/background red if target rate exceeds reference range).
    - [ ] Create distinct Multi Drug case workspaces (Case 1, Case 2...) via horizontal tabs or similar UI layout.
    - [x] Build `Multi Drug Quick Mode v1` as a compact, manipulation-first workspace for common OR infusion setups.
*   **Implemented Features (Review list):**
    - [x] Drug presets included: NE, Epi, Phenylephrine, Vasopressin, NTG, Nicardipine, Dopamine, Dobutamine, Milrinone, Isoproterenol, Remifentanil, Propofol, Esmolol, Dexmedetomidine.
    - [x] Remimazolam split into GA induction and GA maintenance presets, with procedural sedation kept as a separately labeled reference context.
    - [x] Standard dilution presets displayed.
    - [x] Single Drug `Quick / Full` layout with auto-calc, steppers, and sliders.
    - [x] Favorites and recent drugs list.
    - [x] Multiple drugs on one page (vertical stack with Add Drug button).
    - [x] Linked drug cards with dosing and references.
    - [x] Range source badges and rationale notes shown for infusion presets.
    - [x] Audit file added to track calculator range basis by drug.

#### Multi Drug Quick Mode v1 Plan

**Goal**
- make `Multi Drug` feel like a fast OR manipulation workspace rather than a settings-heavy screen
- reduce reading burden and increase `at-a-glance` usability
- keep reference support available without letting it dominate the first screen

**Core UX principle**
- `Single Drug` quick mode is for focused calculation
- `Multi Drug` quick mode should be for `compare + adjust + glance`

**Primary user tasks**
- enter one shared patient weight
- load or assemble a routine infusion set quickly
- adjust concentration / target dose with minimal taps
- see resulting `mL/hr` immediately for several drugs on one screen
- notice out-of-range cards without opening extra text

**Proposed v1 scope**
- workspace-level `Quick / Full` toggle (not per-card)
- `Quick` as the default view
- compact card layout with:
  - drug name
  - category chip
  - concentration
  - target dose
  - immediate `mL/hr` result
  - `+ / -` steppers
  - `Apply standard dilution`
  - short out-of-range warning
- keep `NTG` unit selection behavior in quick mode
- move reference basis / rationale / long notes behind disclosure in quick mode

**What should be hidden or deprioritized in Quick**
- long source notes
- rationale paragraphs
- `Last reviewed`
- detailed range-basis text
- template management details while actively titrating

**What should stay visible in Quick**
- shared weight
- card title
- drug group/category
- editable concentration
- editable target dose
- calculated pump rate
- range warning state

**Workspace-level layout direction**
- top row:
  - shared weight
  - `Quick / Full`
  - `Add drug`
- template management should be visually reduced or placed behind a secondary disclosure
- drug cards should be short enough that multiple cards can be scanned on mobile without excessive scrolling

**Interaction rules**
- auto-calculate as values change
- use steppers first, sliders only if later testing shows real value
- keep warnings short in the main card
- put supporting explanation behind `View basis` / `References`

**Not in v1**
- per-card quick/full toggle
- per-card slider controls
- drag-and-drop sorting
- case memo system
- interaction/compatibility logic
- expanded case tabs

**Implementation order**
1. add workspace-level `Quick / Full` state
2. update `renderInfusionWorkspace()` to render compact cards in `Quick`
3. reduce template controls visually in `Quick`
4. move range/source/rationale text into disclosures
5. add concentration / target-dose steppers
6. confirm auto-calc behavior stays stable for absolute-dose drugs such as `NTG`
7. manually review mobile density before release

**Success criteria**
- multiple cards can be understood with a quick visual scan
- fewer taps are needed to update concentration or target dose
- `mL/hr` result becomes the dominant value on each card
- reference support remains available but no longer blocks the main workflow

### Focus Area 2: Pediatric (Pediatric Anesthesia)
*   **Dosing Enhancements:**
    - [x] Calculate drug dose limits (min/max dose).
    - [x] Calculate expected volume (mL) when concentration is entered.
    - [x] Implement emergency drug dosing quick reference for code situations.
*   **Implemented Features (Review list):**
    - [x] Weight and age-based dosing guidelines.
    - [x] Selected presets (Rocuronium, Sugammadex, Neostigmine, Pyridostigmine, Propofol, Ketamine, Thiopental, Fentanyl, Atropine, Ondansetron, Dexamethasone).
    - [x] Airway equipment size guidelines (ETT depth, Laryngoscope, LMA/i-gel, Oral/Nasal airway) based on age/weight.
    - [x] Saved custom pediatric drugs with verification status display.

---

### Future Modules (Backlog)

**3. Obstetrics (산모마취)**
- Obstetric-safe drug dosing.
- Regional anesthesia dosing.
- Hypotension treatment quick guide (Ephedrine, Phenylephrine etc.).

**4. Dilution (희석 계산기)**
- **Mode 1: Vasopressor dilution:**
  - Standard presets (Phenylephrine, NE, Epi).
  - Calculate final concentration from amount + volume.
  - Calculate required amount from target concentration + volume.
  - Automatically calculate required Ampule/Vial counts.
  - Display ready-to-use syringe recipes and directly link to Infusion Pump calculator.
- **Mode 2: Custom syringe dilution:**
  - Universal dilution calculator (amount + volume -> concentration, amount + concentration -> volume, etc.).
  - Useful for Remifentanil, Dexmedetomidine, Ketamine, Lidocaine.

**5. Opioid Conversion**
- Morphine / Fentanyl / Hydromorphone / Oxycodone IV equivalents.
- IV <-> PO conversion.
- Intraoperative dose to PACU equivalent.
- PCA conversion reference.

**6. Local Anesthetic Toxicity (LAST)**
- Lidocaine / Bupivacaine / Ropivacaine max dose calculator.
- Epinephrine inclusion adjustments.
- Weight-based safe range display.
- LAST management quick reference.

**7. MAC Equivalent**
- Sevoflurane / Desflurane / Isoflurane MAC conversion.
- Age-corrected MAC.
- Target MAC calculator.

**8. Fluid Deficit**
- NPO deficit calculation.
- Maintenance fluid calculation.
- Intraoperative volume replacement guide.

**9. Cardiac Drug Dosing**
- Adenosine, Amiodarone, Diltiazem, Lidocaine antiarrhythmic dosing.

**10. General Quick Calculators**
- Drug bolus calculator (mg/kg -> total dose).
- Unit converter (mcg/kg/min <-> mL/hr).

**11. Workflow Features (Long-Term)**
- Manage multiple infusion drugs in a single case (OR workflow).
- Share patient weight/age across the entire case level.
- Add Case Note / Quick Memo.
- Save and load recent cases.

**12. Weight & Body Size Utilities**
- Ideal body weight (`IBW`) calculator.
- Lean body weight (`LBW`) and adjusted body weight (`AdjBW`) calculator.
- Body surface area (`BSA`) calculator.
- Quick comparison of actual body weight vs `IBW / LBW / AdjBW` for dosing context.

**13. Liver Disease Risk / Severity**
- Cirrhosis `Child-Turcotte-Pugh (CTP)` score calculator.
- Show component inputs clearly (`bilirubin`, `albumin`, `INR`, `ascites`, `encephalopathy`).
- Display class (`A / B / C`) with a reminder that this is a severity stratification aid, not a stand-alone perioperative decision tool.

**14. Cardiac Surgery Risk**
- `EuroSCORE II` calculator for adult cardiac surgery mortality risk.
- `STS Risk` integration or structured input module if feasible.
- Keep cardiac-risk tools clearly separated from general anesthesia calculators.
- Add strong scope note that these tools are for preoperative risk discussion/support and do not replace institutional evaluation.

## Migration / Resume Notes

If this project folder is moved and a new chat must be started:

Provide this summary plus the new project path, and mention:
- the project is plain HTML/CSS/JavaScript
- `Infusion > Single Drug / Multi Drug` is already implemented
- templates are localStorage-based
- `Pediatric` and `MH / Dantrolene` are already active

## Validation Notes

During recent work:
- `node --check script.js` has been used for syntax validation
- infusion reference ranges were split into `Label`, `Clinical`, and `Study-specific` contexts
- `Infusion > Workspace` user-facing naming was updated to `Infusion > Multi Drug`
- infusion reference links were manually rechecked and marked `Verified` in the audit file
- reference cards were updated to show source year, context, and recommended section-to-check when curated
- pediatric dosing reference links were manually rechecked and official glycopyrrolate sourcing was restored
- pediatric airway references were rechecked and unstable face-mask links were replaced with more stable manufacturer URLs

Runtime browser testing has still been limited and should be done manually before release.

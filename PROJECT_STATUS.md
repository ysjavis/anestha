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

## Current App Structure

Top-level calculator tabs:
- `Infusion`
- `Pediatric`
- `MH / Dantrolene`
- `Dilution`
- `Opioid`

Implemented calculators:
- `Infusion`
- `Pediatric`
- `MH / Dantrolene`

Placeholder / not yet implemented:
- `Dilution`
- `Opioid`

## Infusion Status

### Single Drug

Implemented inside `Infusion > Single Drug`:
- `Dose -> Infusion Rate`
- `Infusion Rate -> Dose`
- `Reference Dosing Table`

Supported features:
- preset drugs
- custom drug
- editable concentration
- editable reference dose list
- standard dilution preset display
- `Apply` button for standard dilution
- warning when outside reference range
- favorites / recent drugs
- result references
- localStorage restore

Current infusion presets include:
- norepinephrine
- epinephrine
- phenylephrine
- vasopressin
- nitroglycerin
- dopamine
- dobutamine
- milrinone
- isoproterenol

Infusion references:
- connected through `REFERENCE_REGISTRY`
- mostly precise `DailyMed` label links

### Workspace

Implemented inside `Infusion > Workspace`:
- shared patient weight
- multiple infusion cards
- `+ Add drug`
- remove card
- `Move up`
- `Move down`
- template save / load / delete
- localStorage restore

Workspace behavior:
- cards are independent calculations
- no drug-drug interaction logic
- no compatibility / combined effect logic
- shared weight applies to all workspace cards

Current workspace card UI:
- drug name shown clearly in header
- category chip shown
- subtle accent border by drug group
- concentration editable
- target dose editable
- `Apply standard dilution`
- reference range shown

Current limits:
- maximum 6 workspace cards
- maximum 10 saved templates

Template behavior:
- saves card setup only
- keeps current shared patient weight separate
- intended for routine setups such as `Open Heart Surgery`

## Pediatric Status

`Pediatric` currently has two major modes:
- `Dosing`
- `Airway Equipment`

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

## Architecture Notes

`script.js` is already organized into clearer layers:
- calculation engine
- drug config layer
- persistence layer
- view state layer

Important state structures already exist:
- `singleDrug`
- `pediatricDose`
- `dantroleneQuick`
- `infusionWorkspace`
- `infusionTemplates`

There is already groundwork for future expansion:
- `singleDrug` can later become one infusion card in a larger `Case View`
- drug/reference structures are moving toward reusable catalog patterns
- `REFERENCE_REGISTRY` is in place for updateable medical sources

## Product Direction

Current product direction:
- focus on `Infusion` and `Pediatric`
- improve practical OR workflow usefulness
- keep structure lightweight
- preserve mobile friendliness
- prepare for long-term App Store / Google Play release

Important product principle:
- this app does **not** currently assess drug interactions or recommend drug combinations
- workspace templates are routine setup helpers only

## Recommended Next Steps

Most natural next steps from current state:

1. Add `template note / use case note` to infusion templates
- example: `Open Heart Surgery`, `Routine TIVA`

2. Improve workspace quality
- stronger template labeling
- maybe case name / case note
- maybe shared case-level quick memo

3. Continue pediatric QA
- strengthen references
- review verification status before release

4. Later expansion
- true `Case View / Room View`
- `Dilution`
- `Opioid`
- more emergency / quick calculators

## Migration / Resume Notes

If this project folder is moved and a new chat must be started:

Provide this summary plus the new project path, and mention:
- the project is plain HTML/CSS/JavaScript
- `Infusion > Single Drug / Workspace` is already implemented
- templates are localStorage-based
- `Pediatric` and `MH / Dantrolene` are already active
- next likely task is `template note / use case note`

## Validation Notes

During recent work:
- `node --check script.js` has been used for syntax validation

Runtime browser testing has still been limited and should be done manually before release.

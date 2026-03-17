# Changelog

All meaningful colleague-facing changes should be recorded here.

## [Unreleased]

### Added

- Support tab
- Feedback Google Form entry points
- Privacy page
- Disclaimer page
- favicon, app icon, and OG image assets
- deployment and review documentation
- nicardipine infusion preset with label-based range and references
- pediatric emergency quick-reference mode with core PALS drug doses

### Changed

- language selector changed to dropdown with English default
- feedback moved into Support flow
- donation area hidden until support links are configured
- hero copy softened to remove prototype wording from the main landing message
- mobile polish and action hierarchy improvements
- single-drug infusion flow simplified to `Dose to Rate` and `Rate to Dose`, while the supporting reference table remains available in the result view
- reference cards now show `Source year` separately from `Last reviewed` when the original document year can be identified
- reference cards can now show `Context` and `Check section` to make source verification faster
- infusion single-drug now supports `Quick / Full` input layouts, with Quick mode auto-calculation, touch-friendly steppers, and live sliders for weight and active value
- norepinephrine preset updated to `0.01-0.3 mcg/kg/min` as an institutional / perioperative practice range
- dexmedetomidine preset widened to `0.2-1 mcg/kg/hr` as a label-informed perioperative range
- phenylephrine, epinephrine, remifentanil, and propofol notes clarified for better interpretation
- pediatric tab description and roadmap/status docs updated to reflect the new emergency mode

### Fixed

- broken remimazolam reference link
- broken vasopressin reference links
- multiple infusion and pediatric reference verification issues
- support links hidden until configured

## [v0.1.0] - 2026-03-16

### Initial colleague-facing web release

- infusion, dilution, pediatric, and MH calculators available
- support and feedback flow available
- privacy/disclaimer pages added
- reference audit structure added

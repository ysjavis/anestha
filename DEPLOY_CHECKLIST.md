# Anestha Pre-Launch Checklist

## Core Function Check

- [ ] Top-level tabs switch correctly:
  - `Infusion Pump`
  - `Dilution`
  - `Pediatric Anesthesia`
  - `MH / Dantrolene`
  - `Support`
- [ ] `KO / EN` language select works correctly and persists after refresh
- [ ] Mobile layout is usable on at least:
  - `iPhone Safari`
  - `Android Chrome`
  - `Desktop Chrome`
- [ ] Local persistence works as expected:
  - favorites
  - recent drugs
  - custom drugs
  - saved templates
  - language preference
- [ ] Reset buttons clear the intended fields and result cards
- [ ] Feedback form links open correctly
- [ ] Support links stay hidden until configured

## Infusion Check

- [ ] `Single Drug` tab works in all 3 modes:
  - `Dose to Rate`
  - `Rate to Dose`
  - `Reference Dosing Table`
- [ ] `Multi Drug` tab works with:
  - shared weight
  - add/remove card
  - move up/down
  - save/load/delete template
- [ ] Reference badges are visible and understandable:
  - `Label`
  - `Clinical`
  - `Study-specific`
- [ ] Use-case badges are visible and understandable:
  - `GA induction`
  - `GA maintenance`
  - hemodynamic support contexts
- [ ] Remimazolam display is clean and uses the intended hourly framing
- [ ] Warning text is visible when a value is outside the preset range
- [ ] A sample of key drug reference links opens correctly

## Dilution Check

- [ ] Both modes work:
  - `Dilute to Target Concentration`
  - `Calculate Final Concentration`
- [ ] Units (`mcg/mL`, `mg/mL`) convert correctly
- [ ] Error messages appear for invalid inputs
- [ ] Result summary reads naturally in both languages

## Pediatric Check

- [ ] `Dosing` mode works with representative presets
- [ ] `Airway / ETT` mode works for each device category
- [ ] Preset summary wording is clear:
  - range
  - verification
  - notes
- [ ] Pediatric reference links open correctly
- [ ] Pediatric warning text is visible and not too easy to miss

## MH / Dantrolene Check

- [ ] Both formulations calculate correctly
- [ ] Initial dose, cumulative max, and vial counts all update together
- [ ] Quick guide text remains readable on mobile
- [ ] Reference links open correctly

## Safety / Trust Check

- [ ] Warning banner is visible on first load
- [ ] Reference notes do not imply absolute dosing authority
- [ ] `Last reviewed` and `Source` fields are present where intended
- [ ] Reference and clinical ranges are not visually confused
- [ ] Any link known to be broken is fixed or removed before sharing

## Support / Feedback Check

- [ ] Support tab feels secondary and does not interrupt calculator use
- [ ] Feedback links clearly read as actions
- [ ] Google Form submission is tested once end-to-end
- [ ] Google Sheets response logging is confirmed
- [ ] Support links remain hidden until real Toss / Ko-fi URLs are configured

## Web Release Check

- [ ] Page title is correct
- [ ] Favicon is set if available
- [ ] Deployment URL loads over `https`
- [ ] Refresh works without broken routing
- [ ] External links open in a new tab
- [ ] No obviously unfinished placeholder text remains
- [ ] No debug/test-only wording remains on the visible UI

## Share With Colleagues

- [ ] Send a short note that this is a `prototype`
- [ ] State that it is `reference only`
- [ ] Ask specifically for:
  - usability feedback
  - reference issues
  - mobile issues
  - unclear wording

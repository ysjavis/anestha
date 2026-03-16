# Mobile UI Checklist

## Goal

Verify that Anestha remains readable and usable on iPhone Safari and Android Chrome before any public release.

## Devices To Check

- iPhone 13 / 14 / 15 size class
- iPhone SE size class
- Android 6.1-6.7 inch size class

## Global Checks

- Header, language toggle, and warning banner fit without awkward clipping
- Top calculator tabs stack cleanly and remain easy to tap
- No horizontal page overflow on the main layout
- Body text and helper text remain readable without zoom
- Inputs do not trigger broken zoom or clipped keyboards

## Infusion Pump

- `Single Drug` / `Multi Drug` toggle is easy to tap
- Drug preset select fits on screen
- Favorite / recent chips wrap cleanly
- Preset summary rows do not overlap badges
- Result card badges wrap cleanly on narrow width
- `Reference Dosing Table` can scroll horizontally without breaking layout
- Long reference notes remain readable

## Multi Drug

- Shared weight field and template controls stack cleanly
- Card header buttons do not overflow
- Card tags wrap without collision
- Long drug names and rationale text wrap correctly
- `Apply standard dilution` button remains usable

## Pediatric

- Dosing / Airway mode buttons stack cleanly
- Custom drug fields remain readable in one-column layout
- Result card headings and warnings do not collide
- Airway result text wraps cleanly for long explanations

## MH / Dantrolene

- Form inputs fit comfortably without horizontal scrolling
- Result summary cards stack correctly
- Quick guide paragraphs remain readable on small screens

## Dilution

- Unit dropdowns beside inputs remain usable on narrow screens
- Two result boxes stack vertically on mobile
- Summary text remains readable without overflow

## Pass Criteria

- No clipped text in common mobile widths
- No horizontal page scroll except inside the reference table
- Primary actions remain visible and easy to tap
- Long medical/reference text wraps instead of overflowing

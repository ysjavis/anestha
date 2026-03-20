# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Anestha** is a browser-based anesthesia calculator web app for anesthesiologists. It is intentionally a **zero-build-system project**: plain HTML/CSS/JavaScript with no framework, no package manager, and no compilation step.

- Open `index.html` directly in a browser, or serve the directory with any static file server (e.g., `python3 -m http.server`)
- There are no install steps, no `npm install`, no build commands

## Architecture

The entire app lives in three files:

- **`index.html`** — All markup, tab structure, and UI panels (~1,578 lines)
- **`style.css`** — All styling including CSS custom properties for theming (~2,191 lines)
- **`script.js`** — All logic (~8,100+ lines), organized in layers:

### script.js Layers (top to bottom)

1. **DOM References** — All `document.querySelector` calls upfront, organized by section
2. **Translations** — `TRANSLATIONS` object with `KO`/`EN` keys; `applyLanguage()` swaps all text
3. **Calculation Engine** — Core math functions (`doseToRate`, `rateToDose`, etc.) and formatting utilities
4. **Drug/Reference Config** — `REFERENCE_REGISTRY`, `INFUSION_DRUG_PRESETS`, `PEDIATRIC_DRUG_PRESETS`, `DILUTION_PRESETS`
5. **Persistence Layer** — `loadPersistedState()` / `savePersistedState()` using `localStorage`
6. **State Layer** — `getXxxState()` / `updateXxxState(patch)` pattern; patching merges into `persistedState`
7. **Render/Event Layer** — `renderXxx()` functions and event listeners wiring everything together

### State Pattern

```js
// All app state lives here, persisted to localStorage
let persistedState = loadPersistedState();

// Getter
function getSingleDrugState() { return persistedState.singleDrug; }

// Updater — always saves after patching
function updateSingleDrugState(patch) {
  persistedState.singleDrug = { ...getSingleDrugState(), ...patch };
  savePersistedState(persistedState);
}
```

### Tab/View Routing

Navigation uses `data-calculator-tab` attributes on buttons and `data-panel` attributes on content panels. Active state is managed via CSS classes. Sub-views (e.g., Infusion → Single Drug / Multi Drug, Quick / Full) are toggled similarly.

## Key Medical Calculators

| Tab | Features |
|-----|----------|
| **Infusion** | Single/Multi-drug pump rate ↔ dose, Quick/Full layouts, presets, steppers, sliders |
| **Dilution** | Drug dilution concentration calculations |
| **Pediatric** | Dosing, airway equipment sizing, emergency reference; Dose/Airway/Emergency sub-tabs |
| **MH / Dantrolene** | Malignant hyperthermia quick dosing |
| **Weight** | BMI, IBW, LBW, AdjBW, BSA calculations |
| **Support** | Feedback, contact, donation links |

## Localization

The app supports Korean (`KO`) and English (`EN`). All user-visible strings must have entries in the `TRANSLATIONS` object in `script.js`. Call `applyLanguage()` after adding new strings.

## Important Files

- `PROJECT_STATUS.md` — ongoing development notes and current focus areas
- `CHANGELOG.md` — release history
- `VERSIONING_AND_RELEASE.md` — branching and release workflow
- `INFUSION_REFERENCE_AUDIT.md` / `PEDIATRIC_REFERENCE_AUDIT.md` — drug reference sources
- `DEPLOY_CHECKLIST.md` — steps before publishing

## Workflow

Before starting any coding work, always read `PROJECT_STATUS.md` to understand the current development state.

After completing each task (feature, bug fix, refactor, etc.), update `PROJECT_STATUS.md` to reflect the latest progress.

Before stopping or switching sessions, record upcoming next steps in `PROJECT_STATUS.md` so work can be resumed without losing context.

## Medical Reference Accuracy

Drug presets and dose ranges in `REFERENCE_REGISTRY` and `*_PRESETS` objects are sourced from clinical references documented in the audit files. When modifying drug data, cross-check against those audit files and document the source.

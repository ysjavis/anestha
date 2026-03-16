# Anestha Versioning and Release Workflow

## Recommended Branch Strategy

Use a simple 2-layer flow:

- `main`
  - deployment branch
  - only move stable, review-ready changes here
- working branches
  - use short branches for active work
  - recommended format: `codex/<topic>` or `feature/<topic>`
  - examples:
    - `codex/mobile-polish`
    - `codex/reference-update`
    - `feature/support-links`

## Recommended Working Flow

1. Create a working branch from `main`
2. Make and test changes there
3. When the change feels stable, merge into `main`
4. Deploy from `main`
5. Tag that deployment version

This keeps:
- public deployment stable
- in-progress work separate
- feedback tied to a real released version

## Version Naming

Use lightweight semantic versioning:

- `v0.1.0`
- `v0.2.0`
- `v0.2.1`

Practical meaning:

- `major`:
  - not needed yet unless the app changes direction significantly
- `minor`:
  - new calculator
  - major UI change
  - major reference restructuring
- `patch`:
  - bug fix
  - wording fix
  - reference correction
  - styling fix

## Suggested Early Versions

- `v0.1.0`
  - first colleague-facing web release
- `v0.1.1`
  - small fixes after first feedback round
- `v0.2.0`
  - larger reference revision or major UI refinement

## Release Rule of Thumb

Create a new release version when at least one of these is true:

- colleague-facing behavior changed
- dose range or reference interpretation changed
- support / feedback flow changed
- wording changes affect clinical interpretation
- mobile behavior changed in a meaningful way

## What To Record In Each Release

For each release, record:

- version number
- date
- summary of user-facing changes
- reference/range changes
- known limitations

## Deployment Rule

Deploy only from `main`.

If you want to keep experimenting safely:

- work in a separate branch
- merge only once you are comfortable sharing the result with colleagues

## Feedback Rule

When colleagues report feedback, always ask:

- which deployed version they used
- which calculator/tab they were in
- which device/browser they used

This makes reference and UI issues much easier to reproduce.

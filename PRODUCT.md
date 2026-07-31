# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: people in Rwanda (and similar MoMo markets) whose money moves through Mobile Money - hustlers with irregular income, planners who already try to budget, and anyone who ends every month asking where the money went.

Situation: they already pay bills, send airtime, tap transit, and transfer cash via MoMo SMS and USSD. They do not want another spreadsheet.

## Product Purpose

Fundt shows where MoMo spending went - month-aware, with categories you assign - without turning budgeting into homework. MoMo SMS capture logs outside MoMo activity and confirms payments started in Fundt; it does not auto-sort into categories. Success is a clear monthly picture and a first logged transaction that proves the loop works.

## Positioning

Fundt is built around real MoMo life (SMS/USSD, local bill providers, irregular income rhythms) with on-device processing as a default trust posture - not a generic Western bank-export budget app.

## Operating Context

- Mobile Money SMS and USSD flows on the phone
- Local Mode (data stays on device) and optional Cloud Sync (signed-in backup)
- Monthly Budget Model against a calendar month
- Familiar Rwanda bill surfaces: electricity, WASAC, Canal+, Tap&Go, phone bill, RRA

## Capabilities and Constraints

- Waitlist landing collects email before app ship
- App is dark-first; brand accent is `#0090ff`
- Privacy: on-device processing, no sale of data, real deletion
- Do not invent customers, benchmarks, pricing, or fake app-store ratings on marketing surfaces
- Product language: prefer **log** over tag; Local Mode / Cloud Sync naming from CONTEXT.md

## Brand Commitments

- Name: **Fundt**
- Existing mark/icon and bill-provider assets in `assets/`
- Voice: plain, human, non-guilt, concrete (from current landing copy)
- Accent blue `#0090ff` is a recognized product color; other landing explorations may reinterpret palette if clearly labeled as concept options

## Evidence on Hand

- Landing: Month concept at root (`index.html` / `variants/taste-month.html`) with locked "Where it went" hero copy
- App tokens: `fundt-frontend/theme/tokens.ts`
- Product language: `CONTEXT.md`
- Assets: logo, favicon, provider icons
- Demo video slot: `assets/demo.mp4` (optional)
- No customer testimonials or press on hand - do not fabricate

## Product Principles

1. Clarity over guilt: show the picture, do not lecture.
2. Respect irregular income: design for waves, not textbook paychecks.
3. Privacy is product: on-device by default, honest about cloud.
4. Zero homework: automation and glanceability beat manual entry.
5. Local truth: MoMo and Rwanda bill life are first-class, not afterthoughts.

## Accessibility & Inclusion

Aim for WCAG AA contrast on marketing surfaces. Respect `prefers-reduced-motion`. Keep waitlist forms keyboard-usable with clear error recovery.

## Init assumptions

Inferred from repository evidence and the user's request to iterate on what already exists. Not a live interview. Revisit with `/impeccable init` if any fact above is wrong.

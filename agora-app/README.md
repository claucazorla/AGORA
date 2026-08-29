# Agora

*Argue with the dead.*

A frontend prototype for a Socratic-style philosophical dialogue app. You argue a position
against an AI character of Socrates, who responds strictly in character, grounded in Plato's
early "Socratic" dialogues (Apology, Crito, Euthyphro, Laches, Charmides, the opening of
Meno, Republic Book I), and is designed to genuinely push back rather than agree by default.

## What this draft includes

- **Landing screen** with two modes: *Open Dialogue* (Socrates opens with a question of his
  own choosing) and *Defend a Thesis* (you state a position, he restates it accurately, then
  interrogates it).
- **Dialogue screen**, a two-column layout: the transcript on the left (Socrates in an italic
  serif voice, you in a plain input), and a **Marginalia** sidebar on the right showing the
  citation behind Socrates' last turn, tagged by confidence: *Attested*, *Demonstrated Method
  on New Terrain*, or *Consistent Extrapolation*.
- **Aporia screen**, the dedicated end-state shown when the dialogue reaches a genuine
  impasse, with a reflection on where the impasse actually lies and a reviewable transcript.

## How the dialogue works right now

There is no backend and no LLM call in this draft. `src/lib/dialogues/` contains
hand-authored dialogue trees (`thrasymachus.ts` for the Republic I "justice is the advantage
of the stronger" thesis, `euthyphro.ts` for the Open Dialogue mode's "what is piety?"
opening, and `genericFallback.ts` for any other thesis you type). `src/lib/engine.ts` walks
those trees, classifying each reply as a concession, a defense, or a request for
clarification with lightweight keyword matching, and always resolves to a coherent next turn
within a bounded number of exchanges.

This is enough to demonstrate the full product loop end to end, but it is a mock. The natural
next step is replacing `src/lib/engine.ts` with a real model call (e.g. the Claude API),
using the existing dialogue trees and citation data as grounding context or examples rather
than a fixed script.

All dialogue text is original writing that follows the argumentative shape of the source
material; citations reference standard Stephanus locators, not quotations of any translation.

## Development

```bash
npm install
npm run dev
```

## Stack

Vite, React, TypeScript, Tailwind CSS v4, React Router. Typography: EB Garamond (dialogue and
display), Public Sans (UI), IBM Plex Mono (citations and marginalia).

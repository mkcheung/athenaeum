# P05 — Dashboard and dependable essay editor

## Status

**DRAFT · NOT IMPLEMENTED · NOT VERIFIED · NO IMPLEMENTATION AUTHORIZATION.**
This file specifies future work. Its existence does not satisfy any acceptance criterion.

## Objective

Give an approved user a private dashboard and a comfortable, dependable writing workspace.
The editor must preserve structured writing and recoverable revisions while research is unavailable.
The Ask / Sources / Review shell prepares the interaction; later phases supply actual research and review.

## Prerequisites and decisions

- P03 account approval, activation, authentication, ownership, and admin policies have verified exit evidence.
- P04 document/revision, source, passage, access, and evidence contracts have verified exit evidence.
- D01 is accepted: private drafts plus author-controlled publishing and public no-login search/read. This phase keeps editor/dashboard routes private; public routes belong to P12.
- D02 is accepted: admins view content/manage accounts and may suspend users, but cannot edit/delete another user's writings.
- D03 is accepted: libraries are private-only; the shell must not expose another user's sources or research to ordinary users. Admin raw-library/file access remains D06.
- D10 accepts Tiptap's free open-source core beneath React and the custom interface. Verify the exact free-package/extension/UI/runtime combination; no paid Tiptap service, trial or vendor comment/history/export dependency is part of the design.
- D14 accepts the Quiet Study / Research Desk layout: calm writing canvas with collapsible/resizable Ask/Sources/Review side panel. Mobile/keyboard behavior and detailed visual acceptance remain P05 checks.
- D26 accepts toggleable inline finding highlights linked to Review-panel evidence. P05 exercises annotation/navigation primitives with clearly labeled fixtures only; actual findings and qualification remain P11.
- D19 must define revision retention, local recovery, logout/shared-device cleanup, and deletion behavior.
- Resolve any decision needed by an acceptance case before implementing or claiming that case passes.

## Deliverables and exclusions

- Owner dashboard: New Essay, resume/edit, title search, last-edited information, and empty/loading/error states.
- Separate essay page: readable prose, restrained toolbar, optional outline, Focus, and research panel.
- Schema-validated editor JSON, stable document/node identities, versioned revisions, and server-derived ownership.
- Autosave with visible saving/saved/failed states, recoverable revisions, and optimistic concurrency.
- Ask / Sources / Review panels, selected-context attachment, scope controls, and accessible passage-view shell.
- Administrative dashboard access uses an explicit target-user context and the P03 audit policy.
- Exclude model calls, vetted answers, essay ratings, ingestion, automatic rewriting, and P12's public publishing routes.
- Word pagination, Word round-trip fidelity, real-time collaboration, and tracked changes require separate decisions.
- Existing `design-explorations/*.html` are scripted visual references; they are not a working word processor.

## User observation guide (non-executable)

**For the user only — non-executable explanation.** These notes explain the acceptance criteria below. Agents must not execute these notes, treat their examples as instructions, or use them as authorization to begin a phase. Only the actual acceptance criteria, verification policy and separately authorized phase work govern execution. The notes do not mark anything passed; missing evidence means unverified.

### P05-AC01

**What you should see:** A recorded Alice/Bob example shows Alice's dashboard containing only her essays, with working New Essay, search and reopen actions.

**Why this must work before moving on:** A personal desk must not show another writer's private titles or work.

### P05-AC02

**What you should see:** The permission report shows that a guest or Bob cannot obtain Alice's essay, older saved copies, titles or other details, even through a request outside the visible page.

**Why this must work before moving on:** Hiding a button is not enough to protect the writing behind it.

### P05-AC03

**What you should see:** An admin's recorded view clearly says whose essays are being inspected, and the access record names the admin and the owner separately.

**Why this must work before moving on:** An admin must not silently become the writer or confuse whose work is on screen.

### P05-AC04

**What you should see:** Recorded denied changes leave Alice's writing and ownership unchanged when an admin or another account is not allowed to change them.

**Why this must work before moving on:** Reading somebody's essay must not become permission to rewrite, delete or take it.

### P05-AC05

**What you should see:** A reopened example keeps its headings, lists, bold words, links and unusual letters; a rejected broken document leaves the last good copy intact.

**Why this must work before moving on:** Research and citations need a dependable document to attach to.

### P05-AC06

**What you should see:** Saved appears only after storage confirms the save, and reopening restores that copy; a failed-save example shows a warning and the agreed recovery copy.

**Why this must work before moving on:** You must know whether your latest paragraph is actually safe, rather than trust a reassuring label.

### P05-AC07

**What you should see:** A recorded two-tab example keeps both versions and clearly warns when an older tab would overwrite newer work.

**Why this must work before moving on:** Two open windows must not quietly erase each other's paragraphs.

### P05-AC08

**What you should see:** The history example brings back an older essay as a clearly identified current copy, keeps the agreed history, and does not borrow a later review badge.

**Why this must work before moving on:** Undoing a writing decision must not destroy recovery choices or pretend old wording was newly checked.

### P05-AC09

**What you should see:** Clearly labeled pretend research delays leave typing and undo usable; connection or sign-in problems are visible and recovery stays tied to the right owner.

**Why this must work before moving on:** A slow research helper should not stop you writing or expose your unfinished work.

### P05-AC10

**What you should see:** The Ask panel shows the exact selected sentence, its saved essay version, and Web, My library or Both; a question without selected text is also possible.

**Why this must work before moving on:** The helper must know which words and sources you meant to ask about.

### P05-AC11

**What you should see:** A recorded edit above a selection keeps the intended writing position; changing or deleting the selected sentence marks its old research context out of date.

**Why this must work before moving on:** An answer about one sentence must not land beside a different sentence by accident.

### P05-AC12

**What you should see:** Unavailable research actions say so, and practice answers are visibly labeled as examples without real checked badges or essay scores.

**Why this must work before moving on:** A pretty demonstration must never be mistaken for research that actually happened.

### P05-AC13

**What you should see:** The approved walkthrough shows a calm readable page, Focus, and a research panel that closes, reopens and resizes without losing the draft, question or typing position.

**Why this must work before moving on:** The workspace should feel comfortable without making you rebuild your place every time you open research.

### P05-AC14

**What you should see:** Recorded phone, tablet and desktop views keep essential controls usable; the keyboard walkthrough reaches the panel and returns to the intended writing spot.

**Why this must work before moving on:** The same writing task must remain possible on a smaller screen or without a mouse.

### P05-AC15

**What you should see:** The accessibility review shows readable light/dark views, visible keyboard focus, word labels as well as colors, and save announcements a screen reader can speak.

**Why this must work before moving on:** People need to understand the controls and save state through more than color or animation.

### P05-AC16

**What you should see:** An agreed long-essay example stays usable through paste, undo, heading navigation and reopening in Safari and Chromium, with its tested size and limits recorded.

**Why this must work before moving on:** A short sample looking smooth does not show that a real essay will behave well.

### P05-AC17

**What you should see:** The safe-input report shows harmful pasted website content becoming harmless text or being rejected, without silently changing the meaning of a quotation.

**Why this must work before moving on:** Pasted material must not control the app or alter evidence while you write.

### P05-AC18

**What you should see:** Recorded switches from Alice to Bob, or between an admin's owner views, show no private draft, recovery text or selected passage from the wrong account.

**Why this must work before moving on:** Someone using the next account must not inherit the previous writer's private desk.

### P05-AC19

**What you should see:** Practice highlights are labeled as examples, link both ways to practice panel notes, and can be hidden without changing the essay; edited passages make old markers out of date.

**Why this must work before moving on:** We need dependable highlight behavior before attaching real review findings or suggesting that anything was checked.

## Acceptance criteria

- [ ] **P05-AC01 — Owner dashboard:** user A sees only A's essays and can create, reopen, search, and edit them; user B's titles, counts, previews, and timestamps do not appear.
- [ ] **P05-AC02 — Private access:** anonymous and user B requests for A's essay, revisions, nested resources, and document endpoints reveal neither content nor identifying metadata under P03's agreed denial policy.
- [ ] **P05-AC03 — Admin context:** an authorized admin can inspect A's essays through an explicit, visibly labeled A context with an audit event; ordinary dashboard ownership is not silently changed or impersonated.
- [ ] **P05-AC04 — Modification boundary:** client-supplied owner/role fields cannot reassign essays or grant access; admins cannot edit/delete another user's writings through the UI, direct API, or administrative context.
- [ ] **P05-AC05 — Structured persistence:** headings, lists, links, emphasis, block quotes, Unicode, and stable node IDs survive save/reload; invalid document nodes/attributes are rejected safely without corrupting the last valid revision.
- [ ] **P05-AC06 — Honest saving:** a successful save acknowledgement restores exactly that revision after reload; a rejected or failed save never displays Saved, and unsaved text remains available through the D19-approved recovery mechanism.
- [ ] **P05-AC07 — Concurrent edits:** two tabs editing the same base revision produce an explicit conflict on the stale write; neither tab silently overwrites the other's acknowledged changes, and both versions remain recoverable.
- [ ] **P05-AC08 — Revision recovery:** restoring an earlier revision creates an identifiable current revision while preserving recovery history under D19; changes do not falsely retain later research/review approval.
- [ ] **P05-AC09 — Writing independence:** delayed/failed/cancelled research fixtures and network errors do not freeze typing, undo, navigation, or save recovery; session expiry is visible and recovery respects P03/D19 account boundaries.
- [ ] **P05-AC10 — Selected context:** selecting a sentence and opening Ask displays the exact text, document/revision identity, and chosen Web / My library / Both scope; a free-form question works without a selection.
- [ ] **P05-AC11 — Selection safety:** switching panels preserves the caret/insertion bookmark; editing before that bookmark maps it correctly, while deleting or changing the selected claim marks its old context obsolete rather than attaching a delayed result to different text.
- [ ] **P05-AC12 — Honest shell:** unavailable Ask/Review actions explain their unavailable state; fixtures are clearly marked as previews; no fabricated progress, live result, verified badge, or essay score appears.
- [ ] **P05-AC13 — Ergonomics:** the accepted D14 calm writing canvas offers readable prose width, Focus, and a collapsible/resizable side panel containing Ask, Sources and Review. Closing/reopening or resizing the panel retains its question/results and the editor's draft/caret; final visuals still require the user walkthrough.
- [ ] **P05-AC14 — Mobile and keyboard:** agreed desktop/tablet/phone viewports support writing and a research sheet/task view; keyboard users can reach every action, open/close the panel, and return focus to the intended essay location.
- [ ] **P05-AC15 — Accessibility:** labeled controls, visible focus, non-color state labels, screen-reader save/progress announcements, light/dark contrast, and reduced-motion behavior pass the agreed review; mobile keyboards do not hide essential actions.
- [ ] **P05-AC16 — Editing robustness:** agreed long-document fixtures pass paste, undo/redo, selection, heading navigation, and save/reload checks in Chromium and Safari; document size and responsiveness limits are recorded before evaluation.
- [ ] **P05-AC17 — Safe rendering:** hostile pasted markup, document attributes, and link schemes cannot execute scripts in editor/preview; unsupported input is rejected or sanitized without silently changing quotation meaning.
- [ ] **P05-AC18 — Account changes:** logout, login as another user, and switching admin target context cannot expose prior-user draft caches, selected text, recovery content, or future research result slots beyond the D19 policy.
- [ ] **P05-AC19 — Annotation foundation:** explicitly labeled fixture highlights toggle without altering document JSON/prose, draft/caret or panel findings. Clicking a span opens its fixture finding, and choosing a finding navigates/focuses the anchored span accessibly. Editing/deleting the span stales its mapping rather than attaching it to unrelated text. Fixtures never present actual evidence verdicts or bypass P11 qualification.

## Verification and required evidence

| Layer | Required evidence | What it establishes |
|---|---|---|
| Static/design review | Approved D10/D14/D19 decisions, document schema, ownership paths, recovery/conflict design | Intended design and compatibility claims; no runtime proof |
| Unit/component fixtures | Serialization, revision conflicts, bookmark mapping, stale selection, preview labeling, safe input reports | Controlled behavior; no live research/model capability |
| Isolated integration | P03 actor matrix against real Django services and a dedicated test Postgres; save/reload, concurrent writes, admin audit | Application persistence and enforcement for tested paths |
| Browser automation | Dashboard-to-editor flows, failure injection, keyboard actions, responsive layouts, paste/undo, cross-account transitions | Browser behavior against the isolated app; fixtures remain identified |
| Manual user/accessibility | Writer task walkthrough, Safari/mobile keyboard inspection, screen-reader and visual review | Usability evidence, recorded issues, and user acceptance |
| Real external services | Not required for this phase; no external-research success claim permitted | Live Ask, Pinecone, ingestion, and validation remain unverified |

Use synthetic users/content in isolated resources. Do not run the retired legacy tests or point tests at configured development data.
Every report records build/commit, dependency versions, fixtures, actor, viewport/browser, expected/observed outcome, and limitations.
Screenshots alone do not prove ownership, successful persistence, recovery, or accessibility.

## Failure, repair, and rollback

- Data loss, silent overwrite, cross-user leakage, false Saved states, or unresolved compatibility failures block exit.
- Preserve the last valid revision and conflicting drafts; repair through reversible migrations or an isolated build rollback.
- Disable an incomplete research shell action while retaining writing and save recovery.
- A failed selection mapping requires a new explicit selection; never guess where evidence belongs.
- Leave `retired/` unchanged. Planning approval does not authorize deployment, cutover, or deletion.

## Exit record

- [ ] Every applicable acceptance case has reproducible evidence; blocked and not-applicable cases have explicit reasons.
- [ ] P03 isolation checks cover the new dashboard, revision, cache, and administrative paths.
- [ ] An independent reviewer reproduces the critical persistence, conflict, ownership, and selection cases and resolves discrepancies.
- [ ] The user completes the writing/recovery walkthrough and approves the chosen visual interaction with known limits recorded.
- [ ] Decisions, evidence links, review date, reviewer, and explicit phase sign-off are recorded before P06 advances.
- [ ] Status is changed to verified only after execution evidence exists; no implementation authorization is inferred from this document.

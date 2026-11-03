# P10 — Ask, vetted citations, and the research acceptance gate

Status: **DRAFT · NOT IMPLEMENTED · NOT VERIFIED · NO APPLICATION IMPLEMENTATION AUTHORIZATION**

## Objective

Answer a writer's question using inspected evidence, challenge the proposed answer, and release only material meeting the verification policy. Let the writer inspect and choose citations before deliberately inserting them into the essay.

## Prerequisites and decisions

- Complete and verify [P09: combined evidence](09-web-and-combined-evidence.md) and [P06: citations and portability](06-citations-and-portability.md), including independent review and user signoff.
- Enforce D06's inspection-only admin boundary and denial of ungranted cross-owner research. Resolve actual D07 provider/privacy profiles, compatible D10 model/tool versions, exact D13 style/export setup, D15 evaluation protocol, D17 limits and D19 retention in [DECISIONS.md](DECISIONS.md).
- Freeze the P04 held-out Ask benchmark and adjudication rubric before tuning against development fixtures. D15 must settle sample adequacy, interval method, coverage/abstention requirements, and release thresholds.
- Apply [VALIDATION_POLICY.md](VALIDATION_POLICY.md) and [ARCHITECTURE.md](ARCHITECTURE.md). No live ready-to-cite release precedes the measured evaluation gate below.
- D08/D17 restrict current work to the local/free profile. Real chosen free/local model execution and independent qualification still have to pass. If quotas or quality block testing, preserve NOT VERIFIED/NOT QUALIFIED; no payment, weakened rubric or unapproved dependency bypass is permitted.
- Accepted D01/D02/D03: private drafts and private-only libraries; owner-controlled public publication; admin viewing/account management/suspension without author-content edits/deletion. D06 allows attached-evidence inspection only, denies original/library browsing and leaves new cross-owner research undecided/denied. D21/D22 publish the essay and bibliography, not private research/originals/extra chunks, and keep published snapshots readable after suspension.

## Deliverables and exclusions

- Ask accepts a question and optional selected essay context, with explicit scope, progress, cancellation, limits, and independent research history.
- Accepted D17 makes thorough research the default, with an explicit further-investigation action. Both use bounded searches and retain the same mandatory evidence and final-output gates; exact budgets/latency remain undecided.
- Five bounded roles: researcher retrieves; challenger seeks exceptions/counterevidence; checker performs code checks plus separate evidence-conditioned support assessment; editor composes; final validator rechecks the actual final output.
- A server-controlled source/passage registry; quote text and CSL citations resolve through application code rather than model reconstruction.
- Checked answer clauses, supporting/qualifying/disconfirming evidence, unresolved findings, inspected source cards, and deliberate copy/insert actions.
- The user requires **two independent reviews per example and a conservative uncertainty-adjusted lower estimate of accepted-pair precision >=80%**, with initial science/politics/religion/philosophy coverage. Exact D15 samples, interval method/confidence level, adjudication and coverage/stopping rules still require decisions. Qualification must meet the complete protocol plus hard checks; this is not a per-citation truth guarantee.
- No essay-wide grade in Ask; Essay Review is P11. No unchecked factual streaming, endless debate, model voting, automatic essay rewrites, or fabricated source quotas.

## User observation guide (non-executable)

**For the user only — non-executable explanation.** These notes explain the acceptance criteria below. Agents must not execute these notes, treat their examples as instructions, or use them as authorization to begin a phase. Only the actual acceptance criteria, verification policy and separately authorized phase work govern execution. The notes do not mark anything passed; missing evidence means unverified.

### P10-AC01

**What you should see:** The saved run shows thorough research, clearly bounded stages and any extra investigation you chose. Cancelled or unresolved work is described honestly.

**Why this must work before moving on:** The research helpers need limits and clear jobs; more activity does not automatically mean a better answer.

### P10-AC02

**What you should see:** The evidence report rejects invented references, wrong editions or locations, and passages the writer is not allowed to access.

**Why this must work before moving on:** A citation cannot be trusted simply because it looks convincing or its link opens.

### P10-AC03

**What you should see:** The ready quotation matches the captured source words, with deliberate omissions or changes visible. Missing context can still stop it passing.

**Why this must work before moving on:** An exact-looking quote can mislead when important words or nearby sentences are missing.

### P10-AC04

**What you should see:** The check explains whether the passage supports the exact claim, including dates, numbers and causal wording. A real but unrelated quotation is rejected.

**Why this must work before moving on:** A genuine source must support what the answer actually says, not merely mention the same topic.

### P10-AC05

**What you should see:** The answer shows meaningful exceptions or contrary findings when found and explains when trustworthy sources still disagree. If no opposition is found, it describes the limits of the search rather than inventing an opposing source.

**Why this must work before moving on:** The challenger should find real weaknesses without pretending all opposing sources are equally strong.

### P10-AC06

**What you should see:** The final-answer record covers facts added during rewriting as well as the first draft. Progress appears before checked factual prose is released.

**Why this must work before moving on:** A careful early check is wasted if the final rewrite slips in a new unsupported fact.

### P10-AC07

**What you should see:** Evidence with failed or unfinished required checks has no normal ready-to-cite action. Its unresolved status remains even after a personal override.

**Why this must work before moving on:** Choosing to use something yourself must not turn an unfinished check into a verified result.

### P10-AC08

**What you should see:** When several usable sources exist, their cards offer a choice with original links or passages, limitations and supporting or opposing roles.

**Why this must work before moving on:** You should choose evidence after seeing it; the program must not invent extra choices to fill a list.

### P10-AC09

**What you should see:** The recorded writing example previews the chosen material, inserts it at the saved writing position, supports undo and updates the references.

**Why this must work before moving on:** Research should help your essay without unexpectedly changing other words or losing the source connection.

### P10-AC10

**What you should see:** The privacy report shows another writer cannot open your questions, answers, evidence or background progress, or insert into your essay.

**Why this must work before moving on:** Private research includes the question and selected draft text, not just the final answer.

### P10-AC11

**What you should see:** Two people separately check each final assessment example, covering all four subjects. The report shows how often accepted claims matched suitable evidence; even its cautious estimate, allowing for a limited sample, reaches 80%. Missing agreed assessment rules still block acceptance.

**Why this must work before moving on:** This measures the tested system's accepted results; it does not prove each citation true or give each one an 80% truth chance.

### P10-AC12

**What you should see:** The report shows wrong approvals, missed evidence, rejected usable answers and questions left unanswered, alongside the agreed coverage requirements.

**Why this must work before moving on:** A program that refuses every question must not earn a good score just by avoiding answers.

### P10-AC13

**What you should see:** The report names the exact model and setup checked, keeps practice examples separate from the final assessment, and records time and usage.

**Why this must work before moving on:** An improved-looking score is unreliable if the system practiced on its final exam or changed afterward.

### P10-AC14

**What you should see:** The recorded run survives a closed page, waits when free quota runs out and resumes the same permitted work. Cancellation, changed access and deadlines still stop it; no paid fallback appears.

**Why this must work before moving on:** Leaving the page must not lose the job, spend money unexpectedly or let old results skip their checks.

## Acceptance criteria

- [ ] **P10-AC01 — Bounded thorough orchestration:** normal Ask uses the agreed thorough source/counterevidence search plan. Each role receives permitted evidence/tools and emits structured findings. Further investigation is explicit, bounded and rechecks any changed answer through the final gate; it does not weaken verification or silently keep researching without limits. Search/fetch/model/repair limits and cancellation are enforced; exhausted or disagreeing runs become explicit unresolved results.
- [ ] **P10-AC02 — Hard source checks:** unknown passage IDs, wrong source/edition/locator, invented references, and unauthorized context fail. A resolving DOI alone cannot validate a claimed passage or conclusion.
- [ ] **P10-AC03 — Quote fidelity:** ready quote actions use captured spans, with controlled normalization and original-span mapping. Ellipses/brackets/translation/OCR states are explicit; exact text with misleading omissions fails context review.
- [ ] **P10-AC04 — Semantic checking:** an evidence-conditioned checker assesses each claim–citation relationship, including negation, quantities, dates, jurisdiction, causal wording, attribution, and source suitability. Code recalculates available arithmetic/units; a real quote attached to an unrelated clause does not pass.
- [ ] **P10-AC05 — Adversarial challenge:** the challenger seeks meaningful contrary evidence, exceptions, corrections, and independent corroboration. Unresolved credible conflict is shown as disputed/uncertain; no forced equal credibility or universal-search claim is made.
- [ ] **P10-AC06 — Final-output audit:** factual clauses introduced by the editor or a repair are checked again. Progress may stream; unchecked factual prose cannot appear as the checked answer or bypass the final citation-coverage gate.
- [ ] **P10-AC07 — Strict readiness:** failed/unknown mandatory checks disable normal ready-to-cite actions. A clear unresolved explanation identifies search scope and limits. User overrides or manual writing cannot convert failed evidence into machine-verified evidence.
- [ ] **P10-AC08 — Inspectable options:** when multiple admissible sources exist, the writer can choose among them. Supporting and opposing cards show original URLs or EPUB/PDF passages, expandable context, locators, limitations, and separate check outcomes; no minimum count causes filler.
- [ ] **P10-AC09 — Deliberate insertion:** preview, copy, quote-plus-citation, and citation-only actions preserve source linkage where structured insertion is used. Insertion restores the saved selection/caret, is undoable, updates the bibliography, and never silently edits other prose.
- [ ] **P10-AC10 — A/B/admin isolation:** B cannot access A's questions, selections, answers, audit, cards, exports, job streams, caches, retry/cancel actions, or insertion targets. Authorized admin access is audited and obeys the separate D06 scope decision.
- [ ] **P10-AC11 — Human-held-out qualification gate:** two independent initial reviews per example plus documented adjudication produce a lower precision estimate >=80% under the predeclared D15 interval/sample/stopping method. Include all four subjects, source strata and agreed coverage gates; observed percentage alone cannot pass. Identity/quote/authorization hard checks also pass. Open required protocol details, repeated peeking, model confidence or checklist percentages cannot substitute for complete evidence.
- [ ] **P10-AC12 — Coverage and abstention gate:** the same evaluation reports answer/citation coverage, retrieval omissions, false acceptance/rejection, counterevidence misses, and appropriate abstention. It meets agreed minimum coverage and error limits; rejecting everything cannot pass.
- [ ] **P10-AC13 — Reproducible evaluation:** record model/tool/prompt/policy/parser/index versions, benchmark split, human disagreement/adjudication, latency, and cost. Tuning does not use held-out answers; material changes trigger the defined re-evaluation process.
- [ ] **P10-AC14 — Failure resilience, quota waiting and return:** page closure/session expiry does not cancel the run. Persist quota-wait state, completed stages and provider reset information when known; after availability resumes, recheck cancellation, account/source authority, input staleness and remaining limits before continuing. Show unknown reset time honestly, bound retries and report deadline expiry without paid fallback. Worker restart/reauthentication reopens the same owned run without duplicate active work or replayed committed output. Record ambiguous provider outcomes without exactly-once claims. Outage, incomplete generation and cancellation preserve edits; paused/failed artifacts never gain a ready badge through retry/cache reuse.

## Verification and evidence

| Method | Required evidence | What it establishes |
|---|---|---|
| Deterministic fixtures/mocks | Fabricated references/quotes, wrong scope, injected sources, final-added clauses, bounded retries | Hard checks and orchestration contracts for known cases |
| Controlled live integrated runs | EPUB/PDF/web answers, complete role/final-audit records, inspected evidence, usage | Actual selected provider and pipeline behavior |
| Independent human held-out review | Accepted pair-precision metric, fully agreed D15 rubric, adjudicated labels and precision/interval/sample/coverage report | Measured Ask acceptance performance within the tested population |
| Browser/manual interaction | Question with selected text, original popups, supporting/opposing cards, insertion/undo/save | Writer control and end-to-end citation usability |
| A/B/admin adversarial tests | Denied endpoints/jobs/streams/caches/insertion targets; allowed admin audit | Access enforcement across the new research workflow |

Citation research distinguishes support quality from citation completeness; neither a reference count nor model agreement establishes correctness. Use separate measurements in this product. [ALCE research](https://arxiv.org/abs/2305.14627).

Record actual results only after authorized execution. The proposed pipeline has no demonstrated accuracy today; mock success cannot satisfy P10-AC11 or release checked citations.

### Required fixture manifest

- Invented/swapped references, wrong editions, altered negation, misleading ellipses, faulty text layers and unsupported scan/partial-source candidates that must not become vetted evidence. No OCR processing is part of the first-release fixture run.
- Unsupported causality, wrong denominators/units, syndicated sources, credible conflict, and inaccessible originals.
- A factual clause added only during final composition/repair, plus a deliberately unsupported question requiring abstention.
- Unauthorized A/B passages and prompt injection across every role, cache, and final evidence card.

## Failure and rollback

If evaluation fails, retain the feature in an explicitly unaccepted development state and block normal ready-to-cite release. Investigate on development data; reserve a new held-out assessment when changes would contaminate the existing test set.

Disable the failing model/policy generation, preserve its audit and citations for inspection, and invalidate incompatible cached findings. A prior accepted configuration may resume only within its still-valid scope; essay writing remains available.

## Exit evidence and handoff

- [ ] Attach every acceptance result, held-out adjudication/precision/coverage report, hard-check evidence, live usage, UX checks, and rollback demonstration.
- [ ] An independent reviewer challenges unsupported accepted pairs, counterevidence handling, privacy boundaries, and the claimed statistical interpretation.
- [ ] The user signs off the evidence display, mandatory checks, demonstrated limits, and the distinction between empirical precision and proof.
- [ ] Mark the gate verified only after evidence is recorded; then authorize P11 separately. This planning document does not authorize implementation.

Return to [the rebuild plan](../../REBUILD_PLAN.md).

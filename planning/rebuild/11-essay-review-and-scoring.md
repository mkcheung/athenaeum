# P11 — Essay claims, argument review, and evidence scoring

Status: **DRAFT · NOT IMPLEMENTED · NOT VERIFIED · NO APPLICATION IMPLEMENTATION AUTHORIZATION**

## Objective

Review the user's saved complete or partial essay: inspect factual claims, citations, and reasoning; expose supporting and contrary evidence; and report transparent coverage and support measures without claiming a probability that the essay is true.

## Prerequisites and decisions

- Complete and verify [P10: Ask and verification](10-ask-and-verification.md), including independent review and user signoff.
- Enforce D06's inspection-only admin boundary and denial of ungranted cross-owner research. Resolve actual D07 draft/provider data profiles, D15/D16 evaluation/rubric details, D17 section/whole-essay limits and D19 retention in [DECISIONS.md](DECISIONS.md).
- Approve a separate held-out, human-reviewed essay/argument benchmark from P04. Passing Ask's accepted-pair precision gate does not validate claim detection, argument reconstruction or an essay score; the detailed D15/D16 protocols remain required.
- Apply [VALIDATION_POLICY.md](VALIDATION_POLICY.md) and [ARCHITECTURE.md](ARCHITECTURE.md). Freeze the score formula, denominator, critical-premise policy, and coverage gates before evaluation.
- Current execution is local/free only. Actual local or approved free model behavior and this separate human benchmark remain mandatory; mock success or free-quota exhaustion cannot establish score validity. Proposed previews stay labeled unqualified and cannot advance a required gate without evidence.
- Accepted D01/D02/D03 preserve private drafts/libraries, owner-controlled public publication, and admin viewing/account management/suspension without edits/deletion of author content. D06 allows attached-evidence inspection only, denies original/library browsing and leaves new cross-owner research undecided/denied; D21/D22 expose only published essays/bibliographies and retain their readability after suspension.

## Deliverables and exclusions

- Section or whole-draft review bound to a saved revision, with progress, cancellation, cost/work limits, and user-correctable claims.
- A claim ledger distinguishing facts, interpretations, predictions, personal experiences, normative positions, and incomplete planned arguments.
- A writer-correctable argument map linking thesis, premises, intermediate conclusions, assumptions, and objections to exact draft spans.
- Existing-reference/quotation audits plus additional supporting and disconfirming research using P10's shared verification service.
- Per-claim findings and separate coverage, citation integrity, quote fidelity, and critical-argument status; visible pending/unknown/stale states.
- Accepted D16: fully supported distinct factual claims / all detected distinct factual claims in the corrected scope ledger, plus a separate conclusion assessment. Pending/unresolved/skipped facts remain in the denominator; opinions/values are outside it. Show review completion and provisional/incomplete detection, never a per-result truth probability.
- Accepted D26: toggleable inline highlights linked bidirectionally to panel findings/source evidence. Preserve revision anchors, stale status and access permissions; hiding highlights does not remove findings or change the score.
- Evidence-label wording is accepted; detailed claim/argument grading examples, minimum coverage and independent benchmark thresholds still require agreement. Neither the formula nor a prototype proves accuracy.
- No arbitrary weighted composite, automatic publication, automatic prose replacement, lie-intent judgment, or empirical true/false grade for an underlying value choice.

## User observation guide (non-executable)

**For the user only — non-executable explanation.** These notes explain the acceptance criteria below. Agents must not execute these notes, treat their examples as instructions, or use them as authorization to begin a phase. Only the actual acceptance criteria, verification policy and separately authorized phase work govern execution. The notes do not mark anything passed; missing evidence means unverified.

### P11-AC01

**What you should see:** The review identifies the exact saved draft and section it examined, even if writing continues in another tab.

**Why this must work before moving on:** A finding about an old sentence must not pretend it checked the latest essay.

### P11-AC02

**What you should see:** The claim list separates different facts without losing words such as some, not or might. Repeated claims count once.

**Why this must work before moving on:** Changing a claim's meaning or counting it twice would distort both the review and the score.

### P11-AC03

**What you should see:** The recorded correction history shows the writer can add a missed fact, fix a misunderstood claim and confirm which premises matter most.

**Why this must work before moving on:** The review must let the writer correct its reading of the essay instead of treating its first guess as certain.

### P11-AC04

**What you should see:** The citation findings explain wrong sources, changed quotations and references that do not support their sentences. An unavailable real source stays unresolved.

**Why this must work before moving on:** A complete-looking reference list does not prove that the essay's claims are backed up.

### P11-AC05

**What you should see:** Each factual claim has a record of its research and checks, using the same rules as Ask. Supporting and opposing evidence found can be inspected; missing evidence is reported honestly rather than invented.

**Why this must work before moving on:** Checking one small detail must not approve a much stronger claim that the evidence never established.

### P11-AC06

**What you should see:** The argument map connects the essay's main point, supporting reasons and conclusions to the actual draft. Guessed assumptions are labeled for the writer to confirm.

**Why this must work before moving on:** The program should assess the writer's reasoning, not quietly invent a different argument for them.

### P11-AC07

**What you should see:** The example findings explain jumps such as it happened afterward, therefore it caused it, even when the starting facts are correct.

**Why this must work before moving on:** True starting facts do not always justify the conclusion drawn from them.

### P11-AC08

**What you should see:** Findings use the six agreed evidence labels and explain why each applies. Waiting, paused or stale findings stay separate from completed evidence judgments.

**Why this must work before moving on:** A missing answer or credible disagreement must not be mislabeled false, and a paused job has not finished judging the claim.

### P11-AC09

**What you should see:** The score evidence shows six supported facts out of ten as 60% supported, with eight of ten reviewed when two remain unreviewed. Pending facts stay counted; empty or unfinished claim lists are labeled honestly.

**Why this must work before moving on:** Counting only finished claims could make an incomplete review look stronger than it is.

### P11-AC10

**What you should see:** The report shows factual support and the main conclusion separately, keeping an unsupported central premise visible even when many background facts pass.

**Why this must work before moving on:** A large pile of correct details must not hide the missing reason the essay's main conclusion needs.

### P11-AC11

**What you should see:** A half-written argument is marked provisional, while factual claims inside opinions or value arguments still receive their appropriate checks.

**Why this must work before moving on:** Unfinished writing is not automatically false, and a value choice is not an ordinary fact to prove.

### P11-AC12

**What you should see:** The recorded edit marks affected findings and dependent conclusions stale, including conclusions whose own words did not change.

**Why this must work before moving on:** Changing a supporting reason can change the conclusion's standing even when its sentence stays the same.

### P11-AC13

**What you should see:** The writing record distinguishes accepting, editing, dismissing and personally reviewing a finding. The essay changes only through the writer's deliberate choice.

**Why this must work before moving on:** The reviewer must not take over the essay or erase a failed check merely because its warning was dismissed.

### P11-AC14

**What you should see:** The access report denies another writer's draft, claim map, findings, score and background results. Admin evidence viewing stays within the accepted boundary.

**Why this must work before moving on:** An essay review can reveal your whole line of thought and needs the same privacy as the draft.

### P11-AC15

**What you should see:** A separate human-reviewed essay assessment covers missed claims, reasoning, main-premise problems and score calculations, using the agreed passing rules.

**Why this must work before moving on:** Passing Ask's research assessment does not prove the program can understand or score a whole essay accurately.

### P11-AC16

**What you should see:** The saved review reopens the same run after page closure, waits for free quota and keeps old results tied to their original draft. Pending facts do not gain support while work is paused.

**Why this must work before moving on:** Background progress must not change the meaning of the score or silently review the wrong version.

### P11-AC17

**What you should see:** The recorded interface connects a highlighted sentence to its finding and back again. Hiding highlights preserves writing and findings, while changed text gets a stale marker instead of a misplaced approval.

**Why this must work before moving on:** You need to see exactly which words a finding concerns without turning private review marks into essay text.

## Acceptance criteria

- [ ] **P11-AC01 — Stable review input:** a run records the exact document revision, selected section/whole-essay scope, context, policy versions, and allowed source scope. Concurrent editing cannot silently substitute a different draft.
- [ ] **P11-AC02 — Meaning-preserving decomposition:** multi-part factual sentences split into distinct propositions without losing qualifications or context. Repeated wording of the same claim does not inflate independent support counts.
- [ ] **P11-AC03 — Writer correction:** the user can add missed claims, correct ambiguous decomposition, classify nonfactual material, and confirm critical dependencies. Changes to the ledger and denominator remain auditable.
- [ ] **P11-AC04 — Existing citations:** source identity, locator, exact quotation/context, and claim support are checked first. Orphaned references, wrong-source citations, and unsupported wording are identified; an inaccessible genuine source remains unresolved rather than automatically fake.
- [ ] **P11-AC05 — Shared evidence engine:** each factual claim uses permitted retrieval, counterresearch, hard checks, semantic support assessment, and final finding validation. A supported minor detail cannot stand in for a broader causal or universal claim.
- [ ] **P11-AC06 — Argument reconstruction:** thesis/premise/conclusion links retain draft anchors; inferred assumptions are labeled as reconstructions until confirmed. Original conclusions need not already appear in a source, but their evidence and inferential bridge are assessed.
- [ ] **P11-AC07 — Reasoning checks:** seeded causal leaps, changed scope, hidden premises, circularity, and irrelevant evidence are flagged even when individual premises are factually supported. Findings explain the evidence gap and proposed qualification.
- [ ] **P11-AC08 — Accepted evidence labels:** apply Supported, Partly supported, Disputed, Contradicted, Insufficient evidence and Cannot assess under the agreed grading examples. Supported requires current mandatory checks; Contradicted needs sufficiently strong scope-matched counterevidence after support is weighed, while credible unresolved conflict is Disputed. Insufficient evidence is limited to the searched scope; Cannot assess records missing essential context/access/verifiability. Pending/Paused/Cancelled/Stale are separate workflow states. No-result searches, opinions or personal intent cannot automatically become false verdicts.
- [ ] **P11-AC09 — Accepted arithmetic:** fully supported / all detected distinct factual claims matches the corrected scope ledger, including pending/unresolved/skipped facts in the denominator and excluding opinions/values. Show review completion, not verified-truth coverage. Six supported, two contradicted and two unreviewed gives 60% supported and 8/10 reviewed, provisional. Cancellation cannot inflate the score by dropping unfinished facts. A completed zero-fact ledger is not applicable; incomplete detection stays explicitly incomplete.
- [ ] **P11-AC10 — Separate conclusion assessment:** display the factual-support percentage and main-conclusion assessment as distinct outputs. A failed/unresolved critical premise or inference remains prominent and prevents an unqualified well-substantiated conclusion, even when background support is high. Insufficient review coverage prevents a confident overall assessment; no single blended number replaces the two required outputs.
- [ ] **P11-AC11 — Partial drafts:** an unfinished argument or planned research is pending/provisional, not false. Normative/theological positions receive appropriate factual-premise/attribution checks without pretending the value choice has empirical verification.
- [ ] **P11-AC12 — Revision invalidation:** changing a claim, citation, source version, confirmed premise, or policy invalidates affected findings and dependent conclusions. Old reviews remain attached to their original revision; unchanged conclusion wording does not preserve a stale dependency verdict.
- [ ] **P11-AC13 — Writer control:** findings never rewrite the draft automatically. Accept/edit/dismiss/personally-reviewed actions are distinct; dismissing or overriding does not turn failed evidence into verified evidence or erase audit history.
- [ ] **P11-AC14 — A/B/admin isolation:** B cannot access A's draft snapshots, claim map, findings, evidence, score, job events, cache, retries/cancellations, or suggested edits through substituted IDs. Authorized admin inspection is audited; research context follows D06.
- [ ] **P11-AC15 — Separate essay benchmark:** independent humans assess claim detection/classification, evidence verdicts, argument reconstruction/inference findings, critical-thesis gates, and score/coverage arithmetic on held-out essays. Every D16 threshold/sample rule passes; Ask performance is not substituted.
- [ ] **P11-AC16 — Bounded durable operation:** section/whole-essay review survives page closure/session expiry; free-quota exhaustion persists waiting state and resumes when available under D17's limits/cancellation/authorization checks. Returning reopens the same owned run/revision/results without duplicate active review or a paid fallback. A draft edited while away leaves old results visibly tied to the reviewed revision; suspension/source revocation blocks unauthorized work/delivery. Report deadline/partial failures; pending, skipped and failed claims stay visible in score inputs rather than becoming supported during a pause.
- [ ] **P11-AC17 — Linked toggleable highlights:** clicking an inline highlight opens its finding and authorized supporting/opposing evidence; choosing a finding navigates/focuses the correct span. Hiding highlights preserves panel access, document/caret and score. Multi-part/overlapping findings remain distinguishable with non-color labels and keyboard access. Edits, deletion and revision/source changes stale affected highlights/dependent findings rather than retaining verified styling or misplacing anchors. Derived private decorations are not authored prose or automatically included in public snapshots/default essay exports.

## Verification and evidence

| Method | Required evidence | What it establishes |
|---|---|---|
| Deterministic scoring/revision fixtures | Correct counts, zero-fact case, repeated facts, skipped/pending facts, edited dependencies | Arithmetic, state and invalidation rules |
| Human-labeled draft fixtures | Complete/partial essays across intended subjects; corrected claims and argument maps | Known expected detection, factual and inferential outcomes |
| Controlled live integrated review | Saved draft, real source checks, final findings, errors, latency and cost | Actual orchestration/provider behavior for the selected essays |
| Independent held-out essay assessment | Frozen D16 rubric, adjudicated labels, agreement/disagreement and threshold report | Measured essay-review performance within tested scope |
| Browser and A/B/admin tests | Anchored findings, edit/stale behavior, rejected cross-user requests/jobs/caches | Usability, revision fidelity, and access enforcement |

Atomic-claim and mixed-verifiability research offers evaluation precedents, not proof of this product's accuracy. [FActScore](https://arxiv.org/abs/2305.14251), [VeriScore](https://aclanthology.org/2024.findings-emnlp.552/).

An overall essay assessment considers both factual and inferential dependencies. Keep the distribution, coverage, and critical issues visible beside any number. No live essay benchmark or score validity is claimed by this plan.

### Required fixture manifest

- A high-count supported background section with an unsupported central premise or causal inference.
- A partial normative argument with checkable factual premises and explicitly pending research.
- Repeated/multi-part claims, wrong citations, credible conflict, no factual claims, and a missed claim added by the writer.
- A premise edit invalidating an unchanged conclusion, plus A/B/admin review/job/cache access cases.

## Failure and rollback

If the benchmark or rubric fails, withhold the accepted essay-score presentation and show only clearly unaccepted development findings. Diagnose against development fixtures; do not tune against the held-out evaluation and report it as independent.

Cancel/disable a faulty review generation without changing the draft. Preserve prior revision/audit records, mark incompatible results stale, and retain the accepted Ask service only within its validated scope. Retention changes require D19.

## Exit evidence and handoff

- [ ] Attach the claim/argument benchmark, human adjudication, score/coverage verification, critical-dependency cases, access checks, live usage, and recovery evidence.
- [ ] An independent reviewer challenges missed claims, misleadingly high scores, overconfident verdicts, and stale dependency handling.
- [ ] The user signs off the rubric, score meaning/limitations, provisional-draft behavior, and review interaction.
- [ ] Mark the gate verified only after evidence is recorded; then consider [P12: public publishing](12-public-publishing.md), followed by [P13: release validation](13-release-validation.md). This planning document does not authorize implementation.

Return to [the rebuild plan](../../REBUILD_PLAN.md).

# P04 — Establish evidence contracts and evaluation fixtures

## Status

**DRAFT · NOT IMPLEMENTED · NOT VERIFIED · NO IMPLEMENTATION AUTHORIZATION.**
This phase prepares trustworthy records and evaluation rules. It does not demonstrate model accuracy.

## Objective

Define exactly what a source, passage, citation, claim and check result mean, and agree how independent examples will measure Ask and Essay Review before either feature is built.

## Prerequisites and decisions

- P03 verified account lifecycle and resource-owner/administrator matrix.
- D03 libraries are private-only. D06 permits attached-evidence admin inspection only and grants no originals/library browsing or new cross-owner research. Test denial in this baseline; a future expansion would require a separate decision.
- D07 allows selected outside processing and training/product-improvement reuse where terms permit; actual provider/data eligibility, retention/access and accurate disclosure still require a recorded policy before external processing. This policy choice enables no provider or upload during planning.
- D15 requires two independent reviews per example, all four subjects and a conservative lower precision estimate >=80%; detailed samples/reviewers/method remain required. D16's fully-supported/all-detected-facts formula is accepted; remaining verdicts, minimum review coverage and reasoning rubric still need agreement.
- D19 governs originals, version history, retention and account closure; D21 governs what an author may deliberately place in a public snapshot.

## Deliverables and boundaries

- Versioned relational/API contracts for sources, original assets, passages/locators, essay JSON/revisions, citation occurrences, research runs and essay claim/argument findings.
- Source identity separated from private uploaded copy; original versus normalized text mapping; typed source-specific locators.
- Explicit mechanical/semantic/quality/permission outcomes, not one ambiguous Verified boolean.
- Synthetic contract fixtures and a protected, representative human-annotated evaluation collection with development/held-out separation.
- Written Ask and Essay Review qualification protocols. No live pipeline or benchmark result is claimed here.

## User observation guide (non-executable)

**For the user only — non-executable explanation.** These notes explain the acceptance criteria below. Agents must not execute these notes, treat their examples as instructions, or use them as authorization to begin a phase. Only the actual acceptance criteria, verification policy and separately authorized phase work govern execution. The notes do not mark anything passed; missing evidence means unverified.

### P04-AC01

**What you should see:** A sample evidence record can be traced from its owner to the exact saved source, passage, and location, with missing author or date information shown as unknown.

**Why this must work before moving on:** A sentence written by AI must never be passed off as words found in an original source.

### P04-AC02

**What you should see:** An example credits a lecturer's summary to the course guide rather than to Locke, and records printed-page and file-page numbers separately.

**Why this must work before moving on:** Real words can still mislead if they are credited to the wrong person, edition, translation, or page.

### P04-AC03

**What you should see:** Document examples preserve a citation's identity and source version alongside the exact essay revision, with its supporting index agreeing after a save.

**Why this must work before moving on:** The essay and its citation list must not drift into two different accounts of what was cited.

### P04-AC04

**What you should see:** A changed source or draft keeps its earlier history and marks affected current findings as needing another check, rather than quietly rewriting an old quotation.

**Why this must work before moving on:** A check of yesterday's wording cannot automatically approve today's changed wording.

### P04-AC05

**What you should see:** Examples with the same book uploaded by two writers keep their private copies and notes separate, without revealing who else owns the book.

**Why this must work before moving on:** Recognizing duplicate material must not become a shortcut into another person's library.

### P04-AC06

**What you should see:** A sample result separately shows whether the source exists, the quote matches, the attribution is right, and the evidence supports, limits, or contradicts the claim.

**Why this must work before moving on:** Finding an exact quotation does not by itself establish that the author's claim is true.

### P04-AC07

**What you should see:** Before testing, the plan says which examples count, how many are needed and when testing ends. It leaves room for uncertainty, so a result of exactly 80 correct out of 100 would not automatically establish the required 80% lower estimate; those numbers are an illustration, not the chosen test size.

**Why this must work before moving on:** Choosing easier examples after seeing failures could make a weak system look accurate.

### P04-AC08

**What you should see:** Each official example has two separately recorded first judgments, made without the other reviewer's answer or the machine's verdict, followed by an explanation of disagreements.

**Why this must work before moving on:** Independent checking reduces copying and anchoring, although agreement alone still cannot prove a claim true.

### P04-AC09

**What you should see:** The example list includes science, politics, religion, and philosophy, several source formats, and difficult cases such as false quotes, conflicting evidence, and unanswered questions.

**Why this must work before moving on:** Good results on one easy subject or format cannot stand in for evidence across the intended uses.

### P04-AC10

**What you should see:** Records distinguish practice examples from protected final-evaluation examples and keep closely related sources or claims from leaking across that split.

**Why this must work before moving on:** A system repeatedly tuned on the final examples may merely learn those examples rather than handle unfamiliar questions well.

### P04-AC11

**What you should see:** The essay rubric explains which statements count as facts, how repeated facts and unfinished reviews are handled, and why opinions and the argument's conclusion are treated separately.

**Why this must work before moving on:** An essay percentage needs a clear counting rule, and an unchecked fact must not disappear just to improve the score.

### P04-AC12

**What you should see:** A prepared example with six supported, two contradicted, and two unreviewed facts reports 60% support and eight of ten reviewed, while keeping the result provisional.

**Why this must work before moving on:** Known examples can expose counting mistakes, but correct arithmetic does not prove that AI judged the underlying facts correctly.

### P04-AC13

**What you should see:** A check receipt identifies the exact draft, evidence, rules, model, and provider-data policy used, and a changed draft or source makes incompatible receipts out of date.

**Why this must work before moving on:** You need to know what was checked and under which permissions; permission for provider reuse is not permission to spend money or access another user's data.

### P04-AC14

**What you should see:** Invalid, removed, outdated, or another owner's passage references are refused before their text reaches a model or reader, and instructions inside a source cannot grant powers or scores.

**Why this must work before moving on:** Documents are evidence to inspect, not instructions allowed to control the application.

### P04-AC15

**What you should see:** Reports still say NOT RUN for actual Ask and essay-review qualification, even after sample records, human labels, and arithmetic examples are prepared.

**Why this must work before moving on:** Preparing a fair evaluation is necessary, but it is not evidence that the future research system has passed it.

## Acceptance criteria

- [ ] **P04-AC01 — Provenance chain:** every candidate evidence record resolves to owner, source version, original asset/capture, passage/span and locator; absent metadata remains unknown. AI-written text cannot masquerade as an original passage.
- [ ] **P04-AC02 — Source fidelity:** a course guide describing Locke is attributed to that guide and lecturer, not represented as Locke's own words; edition/translation and PDF printed/physical page differences are representable.
- [ ] **P04-AC03 — Canonical document:** structured essay JSON and immutable revisions are authoritative; a derived citation-occurrence index updates transactionally, with occurrence/node identities, intended claim relationships and source versions preserved.
- [ ] **P04-AC04 — Version lifecycle:** corrected metadata, re-extraction, replacement files, withdrawn sources and changed drafts preserve historical provenance and stale affected current findings; no silent historical quote rewrite is permitted.
- [ ] **P04-AC05 — Private boundaries:** two users uploading the same ISBN/bytes cannot discover each other's holdings or merge private metadata; nested IDs, deduplication, fixtures and audit follow P03/D06. Future publication is an explicit separate snapshot contract.
- [ ] **P04-AC06 — Check vocabulary:** source-exists, quotation-matches, attribution/locator, support/qualification/contradiction, source reliability, inaccessible and unresolved are separate states with evidence and reasons. A quote match alone cannot produce a truth verdict.
- [ ] **P04-AC07 — Ask protocol complete:** record D15's label rubric, subject/source strata, minimum evaluated/accepted counts, interval method/confidence level implementing lower-estimate >=80%, useful coverage/abstention minimum and hard-error policy before qualification. Freeze sampling/stopping rules and account for dependent examples; no post-hoc easier cases or repeated peeking to manufacture a pass. Acceptance of broad policy alone cannot pass this complete-protocol gate.
- [ ] **P04-AC08 — Two independent labels:** each official example receives two initial source-grounded labels with the other's labels and machine confidence/acceptance verdict withheld. Preserve independent judgments, apply documented adjudication and record ambiguity; an LLM's answer or reviewer vote alone is not ground truth. Use only authorized fixtures; no production-library access is granted to reviewers.
- [ ] **P04-AC09 — Representative cases:** fixtures cover science, politics, religion and philosophy across EPUBs, the available Great Courses-style PDF and web captures, including conflicting/context-dependent evidence, nonexistent citations, modified quotes, prompt injection, inaccessible text, translated material and no-answer questions. Predeclare stratum counts/reports/gates so an aggregate cannot claim an untested/failed subject qualified.
- [ ] **P04-AC10 — Evaluation separation:** development and held-out examples are grouped by source/claim family to reduce leakage; access to private originals is controlled, versions/hashes are recorded, and the same holdout is not repeatedly tuned against.
- [ ] **P04-AC11 — Essay protocol separate:** apply the accepted formula, separate conclusion assessment and six evidence labels within a defined claim/argument rubric. Settle detection/classification, source checking, duplicates, reasoning dependencies, minimum coverage and partial drafts. Pending/unresolved/skipped facts stay in the denominator; opinions/values are outside it and unknown is not false. Final evidence labels are distinct from workflow/stale status; completed zero-fact detection is N/A, incomplete detection is not.
- [ ] **P04-AC12 — Fixture arithmetic:** 6 supported + 2 contradicted + 2 unreviewed yields 60% supported and 8/10 review completion, provisional. Exercise duplicates, opinions/values, qualified/disputed/unresolved/skipped facts, cancellation and an unsupported central conclusion amid supported background. Completed zero-fact ledgers yield not applicable; incomplete detection cannot claim no factual content. This proves arithmetic/state handling only, not semantic review accuracy.
- [ ] **P04-AC13 — Auditable receipts:** record actor/owner, exact input revision, scopes, sources, model/check versions, selected provider/data-use policy version (including permitted reuse), final-output fingerprint and reasons for acceptance/abstention. Provider input eligibility and truthful disclosure are distinct from source-verification status; allowing reuse neither enables billing nor changes foreign-owner permissions. Changed text/evidence invalidates incompatible receipts.
- [ ] **P04-AC14 — Validation failures:** unknown, foreign-owner, malformed, stale or deleted IDs fail before context assembly/rendering; source content cannot assign roles, scores, tool permissions or verification results.
- [ ] **P04-AC15 — No premature qualification:** all benchmark reports are labeled NOT RUN until actual P10/P11 runs; sample annotations and arithmetic tests do not enable vetted Ask insertion or a calibrated essay truth score.

## Verification evidence

| Method | Required record | Limit |
|---|---|---|
| Independent source annotation | Protected originals, locator examples, reviewer labels and adjudication | A finite evaluation corpus, not universal ground truth |
| Schema/unit contracts | Valid/invalid records, quote-span mappings and known score arithmetic | Does not establish extraction/model accuracy |
| Isolated Postgres/API | Ownership, versioning, citation-index transaction and stale-state cases | No Pinecone/LLM claim while those integrations are absent |
| Protocol review | Explicit D15/D16 choices and frozen evaluation manifest | P10/P11 must still execute and qualify |

## Failure, recovery and exit

Ambiguous provenance, cross-owner deduplication, unapproved evaluation definitions or unavailable independent labels block exit. Repair contracts/fixtures while preserving original bytes and prior annotations. No private material goes to an external provider without D07.

- [ ] Applicable contract/security tests pass and required D06/D07/D15/D16/D19 choices are recorded.
- [ ] Independent evidence/evaluation review resolves material gaps; user accepts the rubric and honest limits.
- [ ] Evaluation fixtures remain protected and the actual product qualification remains NOT RUN.

Next: [P05 — Dashboard and editor](05-dashboard-and-editor.md).

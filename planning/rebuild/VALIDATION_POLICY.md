# Verification and phase-exit policy

Policy framework accepted November 3, 2026. **Requirements and planned methods, not passed implementation results.** P00 design checks/sign-off are complete; detailed D15/D16 protocols still must be settled and executed before research/essay qualification.

## Status and evidence rules

Each phase starts NOT STARTED / NOT VERIFIED. Planning review may be completed without implying implementation acceptance. Implementation requires later explicit authorization. A dependent phase starts only after prerequisite criteria have recorded evidence, independent review and user acceptance.

Current scope under D08/D17 is local development with no paid services. Record evidence separately as actual local service, actual approved free provider, mocked fixture, or future hosted requirement. P03 now requires an actual local SMTP-capture journey; external inbox delivery is explicitly deferred to P14. P12's anonymous interface is tested locally; P13 accepts only the integrated local configuration. No deferred hosting requirement is marked passed or silently treated as production evidence.

Real Pinecone/web/model integration and P10/P11 qualification remain required where specified. Free quota limits or an underperforming model keep those gates unverified; do not lower the accuracy floor, purchase capacity or advance via an unapproved dependency change. The [local development profile](LOCAL_DEVELOPMENT.md) defines the boundary.

| Evidence type | What it can establish | What it cannot establish |
|---|---|---|
| Document/static review | Requirements, design consistency, source-code findings | Runtime permissions, delivered email, provider behavior or measured research accuracy |
| Unit/contract tests with fakes | Deterministic logic, validation, ownership rules and failure paths under controlled responses | Real external service execution, extraction quality, indexing visibility or provider costs |
| Isolated DB/HTTP integration | Real schema/transactions, queries, CSRF/session and endpoint behavior against dedicated fixtures | Real external delivery or LLM reliability when those parts are mocked |
| Real worker/storage/provider tests | Actual queue execution, authorized file delivery, embedding/index/retrieval or email outcomes | Generalized factual accuracy without an independent evaluation set |
| Browser/user acceptance | Editing, selection, undo, save/reload, role-specific journeys, accessibility and visual behavior | Backend ownership if tests only hide buttons, or broad correctness from one happy path |
| Held-out human-adjudicated evaluation | Measured error/precision/coverage for the tested configuration and source distribution | An individual result's truth probability or universal future accuracy |

Use a new explicit test database and isolated storage/index namespaces. Before destructive test setup, guards must reject production, retired-legacy (MySQL or `retired/` paths) and unexpected targets. Never run the retired legacy tests or migrations. The only authorized operation on the legacy database is P01's confirmed, drop-only removal of that database under D27. Provider/email/index tests require a controlled target and bounded budget agreed for that phase.

## User explanations are non-executable

Each phase includes a **User observation guide (non-executable)** with one entry per numbered acceptance criterion. Its simple-language notes explain what the user should see in recorded evidence and why that check matters before dependent work begins. They describe expected behavior, not completed tests.

**Agent boundary:** do not execute the guide, turn its examples into commands or tasks, or treat reading it as permission to implement, test, alter data, contact providers or advance a phase. The actual acceptance criteria and this policy govern verification only within separately authorized phase work. Explanations cannot replace, weaken or add a pass rule; an apparent disagreement requires reconciliation against the normative criterion and recorded user decisions.

A user can compare each numbered criterion and its explanation with the phase's recorded evidence. An absent report, a checkbox without evidence or an unavailable required check remains unverified. A mock or local demonstration supports only the scope it actually exercised. User acceptance is recorded after the required evidence and independent review; observing the notes alone does not complete a phase.

## Mandatory checks on each new resource surface

Use anonymous, pending, approved-not-activated, rejected, suspended, active user A, active user B and authorized admin fixtures. Cover reads and writes, list/search/count/pagination, nested references, files/previews/readers, exports, jobs/progress/retries/cancellation, caches and streamed status. Include negative B-ID access from A, forged owner/role parameters, suspension/revocation during queued work and authorized admin access according to the accepted matrix.

Apply this matrix as each surface is introduced. P03 cannot claim future essay/vector endpoints are proven before they exist. P12 adds anonymous reading of deliberately published snapshots only; it must deny private-draft, profile, library and research access. P13 must reconcile the complete implemented matrix, including suspension/publication under D22.

## Source and answer gate

- Source identity, version, permitted passage ID, locator and required quote-span checks must pass before normal vetted use. Unknown or fabricated IDs and unmatched quotations block, regardless of aggregate model score.
- A matching quotation is not proof of semantic support or source reliability. Show separate support/contradiction/qualification/context and access/quality outcomes.
- Inspect counterevidence without manufacturing equal credibility. A source saying a false thing can still be accurately quoted as an attributed statement; the intended use must remain explicit.
- Recheck the actual final answer after editing. Any factual clause added during synthesis/repair must receive the same audit. Limit repair attempts; unresolved results remain unresolved.
- No unchecked streamed prose or unqualified green verification badge. Progress can be shown; failed material cannot become vetted because a user copied it or a model voted for it.
- User-written ordinary text and unverified manual references can remain editable, but cannot be mislabeled verified or silently counted as passed.

## Operational meaning of the user's 80% minimum

Accepted evaluation unit under D15: an **accepted claim–evidence relationship** offered for ready-to-use Ask research, including its intended supporting, qualifying or challenging use. Independent human reviewers judge whether the source identity, attribution, passage and relationship are acceptable under the rubric.

Accepted-result precision = human-accepted relationships / all relationships the system accepted. This measures the correctness of accepted results, not the share of all questions answered. [Precision definition](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.precision_score.html).

Accepted measurement and qualification rule: two independent human reviewers assess system-accepted claim/citation pairs, and the **conservative uncertainty-adjusted lower estimate of precision must reach 80%**. Initial tests cover science, politics, religion and philosophy. Exact samples, interval method/confidence level and coverage rules remain open under D15; no current implementation or benchmark demonstrates qualification. Model self-confidence, retrieval similarity, five agents agreeing, or eight passed checklist items out of ten do not satisfy the requirement.

### Concrete explanation for D15 — hypothetical, not a result

Imagine a fictional town. The writer claims, “The railway caused the town to grow.” A genuine source says only, “The population grew after the railway opened.” The source and quotation can be real and exact while failing to establish causation. That passage supports the narrower statement about sequence; presenting it as proof of cause is a misleading accepted claim/citation relationship.

For an illustrative test, independent human reviewers inspect 100 claim/citation pairs the system already offered as usable, using original sources and agreed rules. If 90 are appropriate and 10 are misleading false acceptances, observed accepted-result precision is 90/100 = 90%. This does not mean each citation has a demonstrated 90% probability of truth; ten accepted results were still wrong. The number 100 is an example, not an approved sample size.

That percentage alone cannot qualify the system. Fabricated quotes or unauthorized evidence block independently, while sample adequacy, uncertainty, source/subject coverage and useful answer coverage also need agreed rules. A 70/100 outcome fails the user's 80% minimum outright. No hypothetical tally changes the strict live-result checks or produces a passed phase gate.

Humans evaluate qualification samples during development/release and after material model/pipeline changes; this is not a requirement to manually approve every live Ask. Live research uses the automated source/quote/context/challenge/final-output checks, with original evidence available for the user to inspect. The user accepted this measurement after the explanation, then chose two independent reviews per example and the stronger lower-estimate rule. Actual reviewer identities, sample counts and adjudication details remain D15 choices; no qualification result exists.

Before the qualification run, D15/P04 must fix:

1. Human label rubric and ambiguous-case handling under the accepted two-reviewer process. Each reviewer initially judges the claim, original evidence/context and intended relationship independently, without the other's labels or machine confidence/acceptance verdict. Preserve initial labels and disagreements, then document adjudication rather than replacing them with a vote. Reviewer access is limited to authorized test fixtures.
2. Representative science/politics/religion/philosophy cases, including EPUB, course-PDF, web, counterevidence, inaccessible-source, fabricated-reference and adversarial inputs. Group splits by work/source family and claim family to reduce leakage; define minimum coverage and reporting/gates for each relevant stratum before testing. An aggregate cannot label an untested/failed subject qualified.
3. Minimum evaluated and accepted counts per important source/subject stratum, sample/uncertainty method and interval reporting. The accepted rule requires the conservative lower estimate, rather than only observed precision, to meet 80%. NIST describes confidence-bound methods for proportions; select a method/confidence level appropriate to actual sampling, including dependence among claims sharing a source/question. Do not treat overlapping chunks as independent examples or a finite test interval as a guarantee outside its tested scope. Freeze sampling/stopping rules before evaluation; do not add easier examples or repeatedly peek until a bound passes. [NIST confidence intervals](https://www.itl.nist.gov/div898/handbook/prc/section2/prc241.htm).
4. Minimum useful answer/retrieval coverage and acceptable abstention so rejecting every case cannot pass. Zero accepted results is no evidence of qualification.
5. Separate limits for identity/quote failures, misleading support, missed contradictions, false rejection and inaccessible sources. Accepted fabricated quotes or unauthorized evidence exposure are hard failures that block qualification; correctly rejecting an adversarial fake is expected behavior, not such a failure.
6. A fixed configuration and held-out set that is not repeatedly tuned until it passes. Tuning uses separate development examples.

Report the actual denominator, accepted count, errors, unknowns, coverage, intervals, subgroup results, configuration versions and costs. If evidence is too small or unrepresentative, the honest result is NOT YET QUALIFIED. Do not quietly lower the floor or redefine the metric to pass.

## Essay-review validation and score contract

P11 has its own human-reviewed dataset: claim detection, fact/interpretation classification, source relationships, missing assumptions, premise-to-conclusion links, critical dependencies and partial-draft behavior. Ask precision does not establish an essay-veracity percentage.

Accepted D16 report and formula: fully supported distinct factual claims / ALL detected distinct factual claims in the corrected scope ledger × 100, plus a separate conclusion assessment. Keep qualified/disputed/contradicted/unresolved/pending/skipped facts in the denominator and out of the fully-supported numerator. Duplicates count once; opinions/values are separate; unknown is not false. Display reviewed-count/total as review completion, not proof of truth. Six supported, two contradicted and two unreviewed means 60% supported so far and 8/10 review completion.

Partial or cancelled work remains provisional and cannot drop pending facts to inflate the score. If claim detection itself is unfinished, label the scope/denominator incomplete; this percentage describes detected claims, not a promise every essay assertion was found. A completed zero-factual-claim ledger yields not applicable, never 100%; an unfinished empty ledger is not evidence of no factual content. User corrections and category changes remain auditable. Verdict wording is accepted; minimum coverage and detailed grading/argument rubric still require decisions.

Accepted individual-claim labels, with detailed grading examples still required before qualification:

| Verdict | Meaning within the inspected evidence/scope | Fully supported credit |
|---|---|---|
| Supported | Claim as stated passes mandatory checks and is adequately supported in context | Yes, for a current final factual finding |
| Partly supported | Evidence supports only part or a narrower/qualified version | No |
| Disputed | Credible, applicable support and opposition remain unresolved after comparison | No |
| Contradicted | Sufficiently strong scope-matched counterevidence contradicts the claim after supporting material is weighed | No |
| Insufficient evidence | Neither adequate support nor contradiction was established within the searched scope | No |
| Cannot assess | Essential context/access/method is unavailable or the assertion is outside what this review can verify | No |

Only factual claims enter the denominator; opinions/values are outside it. A factual personal-experience assertion is not automatically an opinion merely because external proof is unavailable. Pending, paused, cancelled and stale are workflow/currentness states, not substitute verdicts. Waiting for quota is not a completed Cannot assess result. Stale findings cannot retain current supported credit or verified-looking highlights; original historical reviews remain attached to their reviewed revision. These labels describe evidence assessment, not intent to deceive or a per-claim truth probability.

Overall conclusion assessment follows critical evidence and reasoning dependencies. A central unsupported or contradicted premise cannot be averaged away by correct background facts. Partial drafts remain provisional. A future weighted 0–100 composite needs an accepted formula and benchmark; no automatic truth probability is promised.

Store the exact reviewed revision, source versions, methods/policy/model versions and decision inputs. Edit/retrieval/source changes stale affected findings and dependent conclusions. Re-run qualification after changes with a plausible effect on reliability; do not reuse an unrelated model's score.

## Exit evidence record required for every phase

The eventual phase evidence record must include: phase ID, approved scope/decisions, commit/build identity, exact test commands/configuration, isolated resources used, expected versus observed results, fake versus live boundaries, relevant test reports/screenshots/benchmark artifacts, failed/skipped checks, known limitations, rollback result, independent reviewer disposition and the user's acceptance/hold decision.

P00 records actual design/document evidence and explicit user acceptance in its phase file. Do not create passed implementation/provider/benchmark evidence before execution. Future records can live under `planning/rebuild/evidence/` once real evidence exists. Keep private bodies, credentials, activation links and personal source files out of shared reports; sanitized IDs and fixtures are preferable.

## Stop conditions

Stop the dependent work when ownership leaks, source/quote integrity failures, missing account-state checks, silent data loss, unsafe test targets, a failed quality floor or an unresolved required decision is found. Preserve evidence and current data, fix the problem within the authorized phase, rerun affected checks and obtain review. Difficulty or a failing test is not permission to bypass a gate.

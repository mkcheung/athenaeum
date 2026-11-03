# P00 — Agree the scope and architecture

## Status

**COMPLETE — DESIGN/PLANNING ONLY · ACCEPTED NOVEMBER 3, 2026 · NO APPLICATION IMPLEMENTATION AUTHORIZATION.**
This phase produced the agreed architecture baseline. Checked items below establish design/document acceptance only; no runtime feature, provider, research accuracy or backup has been verified.

**Post-acceptance amendment (round 13, November 3):** the user replaced the sibling-repository and legacy-preservation decisions with an in-place rebuild (legacy files to `retired/`), no legacy import, and a dump-free drop of the legacy MySQL database. See [DECISIONS.md](DECISIONS.md#thirteenth-round-answers--november-3-2026-post-acceptance-amendment). The P00 evidence below is a record as of acceptance and is not rewritten; where it mentions preserving legacy data or a separate repository, round 13 governs.

## Objective

Turn the discussion into a consistent, reviewable contract: what we are building, who can access it, what verification means, and which decisions belong to later phases.

## Prerequisites and decisions

- Read the three original reviews and [source reconciliation](SOURCE_RECONCILIATION.md).
- Treat the latest user answers as authoritative; preserve earlier proposals as historical records.
- D00/D01/D02/D03/D20 and foundational D23/D25 choices must be accepted or explicitly revised for architecture sign-off; D24 must be resolved before the job contract is implemented.
- Later decisions may remain open with an owner and a required-before gate. No unresolved choice is silently implemented.
- Latest D08/D17 scope is local development with zero paid services. P13 is local acceptance; P14 hosted launch/cutover is future/deferred. Existing quality/ownership gates still apply locally, and deferred requirements remain unverified.
- Interview rounds may be reordered to settle the next phase's prerequisites; their order is not a requirement to settle every future detail now.

## Deliverables and boundaries

- [Decision register](DECISIONS.md), [architecture](ARCHITECTURE.md), [verification policy](VALIDATION_POLICY.md), and [interview](INTERVIEW.md).
- [Accepted local baseline v1](ARCHITECTURE_BASELINE.md), including R01–R14 traceability and named later-phase decisions. Accepted November 3; it carries no application implementation authorization.
- Phase files P00–P14 with objectives, dependencies, acceptance cases, evidence requirements and stop conditions.
- A feature/permission matrix distinguishing private drafts, published snapshots, private libraries, owner actions and administrative inspection/suspension.
- Django/React/Postgres/Pinecone suitability analysis, including private storage, queue/workers, email and citation processing.
- No package installation, new application, migrations, database changes, ingestion, external account changes or deployment.

## User observation guide (non-executable)

**For the user only — non-executable explanation.** These notes explain the acceptance criteria below. Agents must not execute these notes, treat their examples as instructions, or use them as authorization to begin a phase. Only the actual acceptance criteria, verification policy and separately authorized phase work govern execution. The notes do not mark anything passed; missing evidence means unverified.

This phase checks the plan on paper. Its checked boxes do not mean the application has been built or tested.

### P00-AC01

**What you should see:** Each agreed requirement has an address in the plan: where it will be built and which later check will show it works. This includes publishing chosen essays while keeping libraries private.

**Why this must work before moving on:** A requirement without a planned home or check is easy to forget.

### P00-AC02

**What you should see:** The comparison document points out where old reviews and newer decisions disagree, and explains which decision now applies. The original reviews are still there.

**Why this must work before moving on:** Otherwise, two agents could follow different plans and build incompatible things.

### P00-AC03

**What you should see:** A permissions chart says what an author, admin and public reader may see or change. Any unanswered permission question names the phase that must settle it.

**Why this must work before moving on:** Privacy rules need to be clear before anyone builds the doors to your writing and books.

### P00-AC04

**What you should see:** The plan explains each tool's job, what still needs testing and the alternatives. PostgreSQL keeps the official records; Pinecone helps find passages and can be rebuilt from those records.

**Why this must work before moving on:** A search index should not become the only place your evidence or access rules survive.

### P00-AC05

**What you should see:** Ask checks the assistant's answer to your question. Review checks the claims and reasoning in your essay; both show supporting and challenging evidence.

**Why this must work before moving on:** A good answer to one question does not establish that every claim in an essay has been checked.

### P00-AC06

**What you should see:** The plan explains how two people check whether accepted citations really fit their claims. Even after allowing for uncertainty in the test, its lower estimate must reach 80%; some failures block release by themselves, and detailed test rules remain to decide.

**Why this must work before moving on:** An AI's confidence or a real-looking citation must not be sold to you as a proven chance of truth.

### P00-AC07

**What you should see:** Every later phase has numbered checks, evidence requirements and a stop rule. Reports will distinguish a pretend service response from a real service and from a person's evidence review.

**Why this must work before moving on:** A checklist is useful only when a result can show whether the promised behavior actually happened.

### P00-AC08

**What you should see:** Your answers have dates and links to affected phases. Unanswered questions stay open with a point at which they must be answered.

**Why this must work before moving on:** The plan must follow your choices, without treating silence as agreement.

### P00-AC09

**What you should see:** Before-and-after file fingerprints match for the original reviews, four mockups and two already-edited code/test files. The work added planning documents only.

**Why this must work before moving on:** Planning the replacement must preserve the work you already have; matching fingerprints do not prove there is a restorable data backup.

### P00-AC10

**What you should see:** Separate reviewers recorded problems or confirmed the plan, and each important problem has a correction or a named later decision gate.

**Why this must work before moving on:** Another reader can notice a privacy hole or an impossible promise that the writer of the plan missed.

### P00-AC11

**What you should see:** Your November 3 acceptance of the local architecture is recorded, together with its planning-only limit.

**Why this must work before moving on:** Agreeing to the design establishes the starting plan; building it still needs separate authorization.

## Acceptance criteria

- [x] **P00-AC01 — Requirements traced:** every confirmed requirement R01–R14 maps to an architecture component and at least one later acceptance case; optional publishing and private-library boundaries reflect the user's interview answers.
- [x] **P00-AC02 — Contradictions resolved:** single-owner assumptions, public legacy routes, Laravel/pgvector proposals, unsupported citation overrides and historical counts are reconciled explicitly; old reviews remain intact.
- [x] **P00-AC03 — Access model agreed:** user/admin/public permissions distinguish reading, writing, publishing, account management, suspension and raw-library access; any remaining scope is identified as a blocking decision at its phase.
- [x] **P00-AC04 — Stack assessed:** responsibilities, missing services, compatibility work and alternatives are explained; Pinecone is a derived index and PostgreSQL holds authoritative evidence and permissions.
- [x] **P00-AC05 — Ask distinct from Review:** the accepted interview/baseline distinguishes assistant-answer verification from review of the user's draft, including counterevidence/source inspection for each.
- [x] **P00-AC06 — Accuracy stated honestly:** preserve the accepted two-reviewer lower-estimate >=80% qualification rule, uncertainty/abstention and independent hard failures; it is not an individual truth guarantee. D15/D16 retain unresolved protocol/rubric details at their later gates.
- [x] **P00-AC07 — Phase gates concrete:** every implementation phase has unchecked, observable criteria and evidence methods; simulated tests, live integration and human quality assessment are not interchangeable.
- [x] **P00-AC08 — Decision process agreed:** accepted interview answers are recorded with date and affected phases; open decisions have a required-before gate, and silence is never recorded as approval.
- [x] **P00-AC09 — Preservation verified:** original reviews, four mockups and two preexisting modified application/test files match their recorded before/after hashes; only planning Markdown was authored.
- [x] **P00-AC10 — Independent review:** independent reviews checked security boundaries, evidence/scoring claims, phase ordering and source fidelity; material findings were corrected or assigned a named future gate.
- [x] **P00-AC11 — User acceptance:** the user explicitly selected “Accept the local architecture design baseline (Recommended)” on November 3. Application implementation remains unauthorized.

## Verification evidence

| Method | Evidence needed | Limit |
|---|---|---|
| Read-only repository review | Exact files/lines supporting legacy findings and unverified historical claims | Does not prove current runtime or database behavior |
| Primary documentation review | Links and dated compatibility assumptions | Exact dependency combinations still require P02 execution |
| Document checks | Existing links, unique acceptance IDs, dependency order and unmodified-source hashes | Establishes document integrity, not product functionality |
| Independent design review | Findings, corrections and remaining decision IDs | Not an executed security or research benchmark |
| Interview acceptance | Explicit user answers and scope sign-off | Does not authorize code, spending or cutover |

### Recorded design evidence — November 3

- Repository identity: branch `establishUnitTests`, commit `d497937`; planning files remain untracked, and existing source/test edits are preserved. No application build or runtime test was performed for P00.
- Scope/authority/quality evidence: [accepted baseline v1](ARCHITECTURE_BASELINE.md), its R01–R14 acceptance mapping, [decisions](DECISIONS.md) and all twelve interview rounds.
- Historical contradictions/static repository findings: [SOURCE_RECONCILIATION.md](SOURCE_RECONCILIATION.md); original reviews remain unchanged. Compatibility, actual dataset counts and runtime security stay unverified until their phases.
- Document checks: 23 Markdown files, 15 sequential phase files, 217 unique numbered acceptance cases, existing local links and valid baseline-to-case references. Only P00's 11 design cases are checked; the other 206 remain unchecked.
- Preservation: SHA-256 comparison to the planning-start manifest matches the three original reviews, four existing design HTML files and two preexisting edited source/test files. This is not a data backup or restore rehearsal.
- Independent reviewers: `/root/plan_research_verification` and `/root/plan_migration_ux` reported no material baseline contradictions. The optional overall-stack approval clarification was incorporated before user review; earlier audit corrections are reflected in the plan.
- User disposition: explicit acceptance of the consolidated local architecture. No application code, package install, new repository, account setting, paid API call, database test/migration, ingestion or deployment was performed.

## Stop conditions and exit

P00's foundational design choices are accepted. A later material architecture change reopens the affected design/decision review; phase-specific details keep their named gates. Do not implement around an unanswered required decision or interpret design acceptance as implementation authority.

- [x] Required P00 decisions and criteria have design evidence; no application feature is marked passed.
- [x] Independent design review and explicit user architecture acceptance are recorded.
- [x] P01 was the next planned phase at acceptance and none of its actions was authorized by this design acceptance. *(Historical: P01 was later executed on November 3 under separate authorization; see [the P01 execution record](evidence/P01-execution-record.md).)*

Next: [P01 — Legacy retirement](01-legacy-retirement.md).

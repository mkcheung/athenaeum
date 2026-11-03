# Athenaeum rebuild: planning entry point

Started November 2; consolidated November 3, 2026. **Planning only. No application implementation is authorized by these files.**

Current position: **P00 design is COMPLETE and ACCEPTED, November 3, 2026. P01–P13 remain NOT STARTED / NOT VERIFIED; P14 hosted launch remains FUTURE / DEFERRED.** Phase-specific decisions are resolved at their named gates. No application feature, runtime or research accuracy is verified by design acceptance.

**Accepted design: [local architecture baseline v1](planning/rebuild/ARCHITECTURE_BASELINE.md).** It gathers interview decisions, authority boundaries, requirement-to-acceptance mapping and later gates. The user accepted it as planning only; application implementation remains unauthorized. **Round 13 amendment (November 3):** build in this repository, with legacy files moved to `retired/`, no legacy import, and the legacy MySQL database dropped without a fresh dump ([details](planning/rebuild/DECISIONS.md#thirteenth-round-answers--november-3-2026-post-acceptance-amendment)).

**Current scope: local development with no paid services. Hosting and internet launch are deferred.** Real free-tier services may be used after their account/privacy/limit checks during authorized implementation. Quotas or model limitations cannot trigger paid upgrades or weaken the accepted accuracy requirements. See [the local/free development profile](planning/rebuild/LOCAL_DEVELOPMENT.md).

## What we are planning

A multiuser writing and research application with an owner dashboard, a structured essay editor, Ask/Sources/Review, EPUB/PDF ingestion, combined private-library/web research, vetted citation insertion, and review of the user's facts and reasoning. Authors may deliberately publish selected essays for public search and reading without a login.

The accepted application access model is foundational: registration needs admin approval and subsequent email activation; private work is visible through the app only to its owner and authorized admins. Admins manage/suspend users and inspect essays/research/profiles without editing/deleting another author's writing. Libraries are private-only. Other users/anonymous readers receive only explicitly published essay snapshots. External processing/reuse follows D07 and its provider/data restrictions.

Latest interview decisions: admin login is password-only initially; admins may inspect attached evidence but cannot browse/download entire private libraries or original files. The user accepts selected outside AI services processing text needed for indexing, Ask and Essay Review. Specific providers, permitted data fields and retention/training settings remain to be selected; planning-only restrictions still apply.

The initial architecture is one modular Django backend with local background workers, designed for eventual personal/invited use of roughly 25 writers. Browser closure does not cancel jobs; processing continues while local services/computer run and recovers after restart. Saved runs/results reopen after authentication. Exact concurrency and free-service choices remain to verify; hosted capacity is deferred.

The rebuild happens in this repository. P01 moves every legacy Laravel file into `retired/` (tracked files via `git mv`, so history follows), drops the legacy MySQL database without a fresh dump after an execution-time confirmation, and imports no legacy data. The new app is built at the root with its own local PostgreSQL database. Nothing has been moved or dropped yet. Original assets use a real local S3-compatible object service initially. EPUB/selectable-text PDF ingestion detects unsupported scans and runs no OCR; incomplete extraction is not automatically searchable. No independent backup destination is currently available, so the one-hour device/disk-loss recovery target remains unverified pending destination/scope and restore evidence. Hosting remains deferred; exact local paths/services and file limits are open.

Free-quota exhaustion pauses research and resumes when quota becomes available, preserving cancellation, authorization, staleness and deadline checks. The user now permits training/product-improvement reuse where applicable terms permit. Actual provider/data eligibility, retention/access and accurate future-user disclosures still require design; this does not change app privacy, enable a provider or authorize paid usage.

The writing workspace uses a calm canvas with a collapsible/resizable Ask/Sources/Review side panel. First-release exports include Word/DOCX, PDF and a portable structured backup. MLA is the default citation style, with APA and Chicago available per essay; exact style versions, export engines and final mobile/visual details remain to be settled and verified.

Ask performs thorough research by default with further investigation available. Essay factual support is fully supported distinct factual claims / all detected distinct factual claims, including pending/unresolved/skipped facts but excluding opinions/values; show review completion/provisional state and a separate conclusion assessment. Toggleable inline highlights link both ways to panel findings/evidence and become stale when affected text/evidence changes. Research qualification still requires two independent reviewers, all four subjects and a conservative lower precision estimate >=80%; exact benchmark/coverage rules and operating limits remain open. No accuracy test or implementation gate has passed.

## Are the proposed technologies appropriate?

| Component | Assessment | Responsibility |
|---|---|---|
| Django / Python | Selected backend organization; exact versions/compatibility still to verify | Accounts, permissions, essay/source services, ingestion and research orchestration |
| React / TypeScript | React frontend baseline; Tiptap's free core is selected, runtime/packages still to verify | Dashboard, structured editor, custom citations/highlights, Ask/Sources/Review |
| PostgreSQL | Recommended authoritative store | Users/roles, essays/revisions, source metadata and passage text, citations, runs, findings, audit and job state |
| Pinecone | Viable preferred retrieval service; RAG does not require it specifically | A rebuildable search index derived from authorized source passages; not the sole copy of evidence or permissions |
| Private object storage | Required; local S3-compatible service initially | Original books/PDFs, captures and extraction artifacts; remote provider later |
| Durable queue and workers | Required locally | Ingestion, research/review and approval messages; sleep/restart recovery tested |
| Email service | Local SMTP capture now; external delivery later | Real activation/password workflow locally, with production deliverability deferred |
| Citation processor | Also required | CSL-based citation and bibliography formatting from actual metadata |

Django's Tasks API does not include production execution workers. An actual queue/backend and worker process must be selected and verified. [Django Tasks](https://docs.djangoproject.com/en/6.1/topics/tasks/).

Pinecone supports tenant isolation using server-selected namespaces. The application must still enforce permissions in PostgreSQL, including when resolving returned passage IDs. [Pinecone multitenancy](https://docs.pinecone.io/guides/index-data/implement-multitenancy).

Do not add pgvector as a second vector system merely because an older review recommended it. PostgreSQL keyword search can complement Pinecone semantic retrieval without duplicating vector infrastructure.

## Read these planning files first

1. [Decisions and confirmed requirements](planning/rebuild/DECISIONS.md).
2. [Architecture and authority boundaries](planning/rebuild/ARCHITECTURE.md).
3. [Contradictions and superseded proposals](planning/rebuild/SOURCE_RECONCILIATION.md).
4. [Verification and phase-exit policy](planning/rebuild/VALIDATION_POLICY.md).
5. [Interview sequence](planning/rebuild/INTERVIEW.md).
6. [Local/free development and evidence boundaries](planning/rebuild/LOCAL_DEVELOPMENT.md).

The [accepted baseline summary](planning/rebuild/ARCHITECTURE_BASELINE.md) is the compact design record; the files above supply detailed contracts and deferred decisions.

The original [PROJECT_REVIEW.md](PROJECT_REVIEW.md), [RESEARCH_WRITING_REDESIGN.md](RESEARCH_WRITING_REDESIGN.md), and [VERIFICATION_DESIGN.md](VERIFICATION_DESIGN.md) remain preserved references. The latest user instructions and accepted decisions take precedence over their superseded assumptions. This new plan does not silently rewrite their historical findings.

## Incremental phases

Each file has an objective, dependencies, acceptance criteria, evidence and an exit decision. P00's 11 design-only cases are checked; all implementation cases remain unchecked. Read in order and do not begin dependent work with an unresolved prerequisite or without the applicable work authorization.

| Phase | Objective | Current state |
|---|---|---|
| [P00 — Scope and decisions](planning/rebuild/00-scope-and-decisions.md) | Agree architecture and verification policy; record design evidence and user sign-off | COMPLETE — DESIGN ONLY |
| [P01 — Legacy retirement](planning/rebuild/01-legacy-retirement.md) | Move the legacy code into `retired/`, drop the legacy MySQL database and leave the root ready for the new app | NOT STARTED |
| [P02 — Isolated foundation](planning/rebuild/02-isolated-foundation.md) | Establish a compatible new stack and isolated services/test harness | NOT STARTED |
| [P03 — Accounts and RBAC](planning/rebuild/03-accounts-and-rbac.md) | Prove approval/activation and admin/user access boundaries | NOT STARTED |
| [P04 — Evidence contracts and benchmarks](planning/rebuild/04-evidence-contracts-and-benchmarks.md) | Define versioned evidence and human-reviewed evaluation fixtures | NOT STARTED |
| [P05 — Dashboard and editor](planning/rebuild/05-dashboard-and-editor.md) | Create, resume and reliably edit an owner's essays | NOT STARTED |
| [P06 — Citations and portability](planning/rebuild/06-citations-and-portability.md) | Preserve structured citations and deterministic bibliography rendering | NOT STARTED |
| [P07 — Document ingestion](planning/rebuild/07-document-ingestion.md) | Turn EPUBs/PDFs into inspectable, correctly located private passages | NOT STARTED |
| [P08 — Pinecone and private retrieval](planning/rebuild/08-pinecone-and-private-retrieval.md) | Index and retrieve only authorized current passages | NOT STARTED |
| [P09 — Web and combined evidence](planning/rebuild/09-web-and-combined-evidence.md) | Combine library and fetched web evidence without losing provenance | NOT STARTED |
| [P10 — Ask and verification](planning/rebuild/10-ask-and-verification.md) | Run bounded research/challenge/check/edit/final-validation and qualify vetted results | NOT STARTED |
| [P11 — Essay review and scoring](planning/rebuild/11-essay-review-and-scoring.md) | Review the user's claims and argument, with tested scoring and revision tracking | NOT STARTED |
| [P12 — Public publishing](planning/rebuild/12-public-publishing.md) | Publish selected essay snapshots for public search/read without exposing private work | NOT STARTED |
| [P13 — Local integrated acceptance](planning/rebuild/13-release-validation.md) | Verify the complete local workflow, real free integrations, quality and recovery | NOT STARTED |
| [P14 — Future launch and deployment](planning/rebuild/14-launch-and-deployment.md) | Qualify hosted services and deploy recoverably after a later launch decision | FUTURE / DEFERRED |

Quality work starts at P04. P10 has its own Ask qualification gate; P11 has a separate essay-review gate, both still required locally. P13 is local integration acceptance; P14 holds future hosted requirements. Mocked/skipped provider checks or free-quota failures cannot become passed gates.

## Reading the acceptance criteria

Every phase has numbered acceptance criteria (ACs), a verification-evidence table and an exit gate. Each also has a **User observation guide (non-executable)**: one plain-language explanation per AC of what you should see in the evidence and why it matters before moving on. These notes are for you to read; agents must not execute them or treat examples as permission to start work. The actual ACs and [verification policy](planning/rebuild/VALIDATION_POLICY.md) remain the rules for separately authorized work.

Compare the explanation and actual criterion with the recorded results, screenshots or review reports listed for that phase. Missing evidence stays unverified; a checked box by itself is not proof. P00's checks concern the agreed design only. All later implementation checks retain their existing unverified/deferred status.

## How we will work together

- Interview in small rounds, normally three related decisions at a time.
- Record your answers as decisions; proposals remain explicitly provisional until accepted.
- Explain tradeoffs before asking you to choose. Do not assume that silence or elapsed time accepts a recommendation.
- Resolve the decisions required by a phase before implementing it. Later optional details can remain deferred.
- When you authorize implementation, work on one phase, collect its evidence, obtain an independent review, and present the concrete result for your acceptance before advancing.
- A failed criterion stays failed; an unavailable check stays unverified. Neither becomes passed merely because a document says it should work.
- Preserve unrelated work. Retirement moves legacy code into `retired/`; the only authorized data disposal is P01's confirmed drop of the legacy MySQL database (D27). Git history, `retired/` and the 2022 dumps are not erased.

## What has actually been done

The requested documents, manifests/test configuration, relevant code and design examples were reviewed. Primary documentation was checked for Django/DRF, Pinecone, free search/model options and local storage/mail candidates. Parallel audits covered ownership, retrieval/verification, UX, free-tier boundaries and local-versus-launch acceptance. Only planning Markdown files were authored; command-path inspection did not establish installed versions, running services or model quality.

No application source changes, package installation, app launch, migrations, database tests, live ingestion, Pinecone operations, paid model calls, emails or deployment occurred. The earlier uncommitted edits in `app/Models/Category.php` and `tests/Feature/PostTest.php` were discarded outside the planning work at 10:43 on November 3; both files now match commit `d497937`. If they are restored before P01, P01 settles how they move into `retired/`. Legacy database counts and branch/data compatibility claims stay historical and unverified, since no legacy data will be migrated.

Document-only checks found 23 Markdown files, 15 sequential phases and 217 distinct numbered acceptance cases: 11 completed P00 design cases and 206 unchecked implementation cases. Local links/case IDs and requirement mappings were checked; preserved original-file hashes match. Independent reviews corrected permissions, score meaning, readers, isolation, recovery, exports and local-versus-hosted qualification. These checks and explicit user acceptance complete P00 only; no implementation/accuracy gate passed. After the round 13 revision, the 23 files hold 207 active cases: the 11 P00 design cases plus 196 unchecked implementation cases. P01 now has 10 cases, and 9 P14 migration/retirement cases are withdrawn with their IDs kept.

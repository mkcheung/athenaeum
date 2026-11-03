# P08 — Pinecone and private-library retrieval

Status: **DRAFT · NOT IMPLEMENTED · NOT VERIFIED · NO APPLICATION IMPLEMENTATION AUTHORIZATION**

## Objective

Find useful passages in each user's permitted library using keyword and semantic retrieval. PostgreSQL remains authoritative for passage text, source versions, and permissions; Pinecone is a rebuildable search index.

## Prerequisites and decisions

- Complete and verify [P07: document ingestion](07-document-ingestion.md), including independent review and user signoff.
- D03 is accepted: libraries are private only. D06 permits attached-evidence admin inspection but denies original/library browsing; new cross-owner research remains undecided/denied. Resolve D07 provider privacy, D09 workers/storage, D10 compatibility, D11 Pinecone mode/embedding configuration, D12 limits, D17 budgets, and D19 retention in [DECISIONS.md](DECISIONS.md).
- Apply [ARCHITECTURE.md](ARCHITECTURE.md) and [VALIDATION_POLICY.md](VALIDATION_POLICY.md). Admin inspection authority does not silently authorize mixing everyone's library into any user's research context.
- D01/D21 owner publication exposes the essay and bibliography only; library search/originals/extra chunks remain private. D02 disallows admin edits/deletion of author content; D22 suspension does not revoke published snapshots.
- Choose a separate development/test project/index identity before any later provider operation; verify existing resources before writing. No existing index or namespace may be repurposed by assumption.
- D17 requires actual confirmed free-tier use only. A permitted Pinecone Starter run can satisfy real integration; a local fake cannot. Exhausted quotas leave work pending/unverified and cannot authorize upgrades or deletion of unrelated indexes. See [LOCAL_DEVELOPMENT.md](LOCAL_DEVELOPMENT.md).

## Deliverables and exclusions

- A provider adapter with server-selected index/namespace, stable passage IDs, source-version/generation metadata, and recorded embedding model/dimensions/metric.
- PostgreSQL keyword search and compatible semantic retrieval, with an explicit fusion/reranking policy and recoverable original context.
- Private namespaces per user/library under accepted D03; no shared or curated-library fan-out.
- Current Pinecone documentation recommends per-tenant namespaces for serverless isolation. Namespace choice must still be derived from server authorization. [Multitenancy guidance](https://docs.pinecone.io/guides/index-data/implement-multitenancy).
- Current documentation distinguishes document indexes and vector-record indexes. Document schemas are fixed at creation; select and pin the mode/API in the compatibility assessment rather than copying an older example. [Data modeling](https://docs.pinecone.io/guides/index-data/data-modeling).
- No autonomous answer generation, checked citation badge, shared-user discovery, or paid provider operations in this planning step.

## User observation guide (non-executable)

**For the user only — non-executable explanation.** These notes explain the acceptance criteria below. Agents must not execute these notes, treat their examples as instructions, or use them as authorization to begin a phase. Only the actual acceptance criteria, verification policy and separately authorized phase work govern execution. The notes do not mark anything passed; missing evidence means unverified.

### P08-AC01

**What you should see:** The setup record matches the approved Pinecone location and search settings. A mismatch produces a clear stop message.

**Why this must work before moving on:** Sending search data to the wrong place or using mismatched settings can break search or expose material.

### P08-AC02

**What you should see:** The recorded requests show the server chooses each writer's private search area. A changed owner or area name does not unlock another library.

**Why this must work before moving on:** A label sent from the browser must not decide whose books can be searched.

### P08-AC03

**What you should see:** The evidence shows every search hit is checked against the main records before its words appear. Incomplete, removed or no-longer-permitted passages are excluded.

**Why this must work before moving on:** An old search entry must not bring back material that is private or not ready.

### P08-AC04

**What you should see:** Each search entry points to a known saved passage and the correct book copy. Unknown entries or incompatible search settings are rejected.

**Why this must work before moving on:** Search results need real source records behind them before they can become evidence.

### P08-AC05

**What you should see:** The indexing record shows the new passages can actually be found before the book is called searchable. Delayed work remains visibly waiting.

**Why this must work before moving on:** Pinecone accepting an upload does not prove its search can see the new material yet.

### P08-AC06

**What you should see:** The comparison report lists expected passages and what keyword, meaning-based and combined searches found, including misses and opposing passages.

**Why this must work before moving on:** Search must find useful material in the agreed examples rather than merely return something.

### P08-AC07

**What you should see:** The combined results remove repeated overlapping passages and open the correct nearby text. The report explains how the different searches were combined.

**Why this must work before moving on:** Repeated text and unrelated ranking numbers must not make weak evidence look stronger.

### P08-AC08

**What you should see:** The replacement record shows a new search copy is checked before it takes over. A failed replacement leaves the earlier search and existing citations intact.

**Why this must work before moving on:** Changing how search works must not silently break quotations or remove a working library.

### P08-AC09

**What you should see:** The recorded size-limit and service-failure examples show bounded retries, clear unfinished states and no duplicate active entries.

**Why this must work before moving on:** A temporary failure must not create endless work or pretend indexing finished.

### P08-AC10

**What you should see:** The access report denies another writer's results, saved previews and background work. Admin evidence viewing stays inside its approved boundary.

**Why this must work before moving on:** Private search needs protection everywhere, including progress screens and saved answers.

### P08-AC11

**What you should see:** The revocation record shows a removed permission stops the passage appearing, even while its old Pinecone entry remains. Retained citation records follow the agreed policy.

**Why this must work before moving on:** Slow cleanup in a search service must not keep a private passage accessible.

### P08-AC12

**What you should see:** The outage example keeps writing and permitted saved-source viewing available. Any approved keyword-only search clearly describes its smaller search scope.

**Why this must work before moving on:** A search outage should not stop your writing or produce a false claim that full research succeeded.

### P08-AC13

**What you should see:** The recovery records show interrupted handoffs between the main database and Pinecone resume without losing saved work or activating duplicate copies.

**Why this must work before moving on:** The two stores may finish at different times, so a crash must not leave a false ready state.

## Acceptance criteria

- [ ] **P08-AC01 — Resource preflight:** the configured index host, environment, API/index mode, dimensions, metric, embedding configuration, and allowed namespaces match the recorded plan. A mismatch stops indexing/querying with an actionable error.
- [ ] **P08-AC02 — Server-derived scope:** user A cannot choose B's namespace or expand source permissions through query parameters, metadata filters, passage IDs, or a forged owner. Missing scope fails closed.
- [ ] **P08-AC03 — PostgreSQL reauthorization and readiness:** candidate IDs resolve against active, research-eligible source generations and current permissions before text enters a model, browser, reranker or cache. Revoked/staged/deleted, scan-only or incomplete/needs-attention candidates are rejected even if vectors remain visible; a partial index is not authorized by a client flag or successful upsert.
- [ ] **P08-AC04 — Index provenance:** every indexed chunk maps to an authoritative passage/source version and embedding generation. Unknown IDs, wrong dimensions, incompatible query embeddings, and orphaned records cannot become evidence.
- [ ] **P08-AC05 — Visibility gate:** a successful upsert alone does not mark a source searchable. Bounded freshness checks verify that the intended generation is query-visible; timeout remains pending/failed rather than showing a false ready state.
- [ ] **P08-AC06 — Retrieval quality:** the frozen fixture questions find their manually labeled relevant passages within agreed top-k/recall limits, including exact names, quotations, synonyms, and opposing passages. Report keyword, semantic, and combined results separately.
- [ ] **P08-AC07 — Fusion and context:** the agreed method combines candidate ranks without treating unrelated raw scores as equivalent. Duplicate overlap is consolidated, and selected passages recover the correct surrounding original context.
- [ ] **P08-AC08 — Reindexing:** a changed parser/chunker/embedding configuration creates a deliberate new generation. Only a verified generation activates; a failed migration leaves the previous accepted generation usable and historical citations unchanged.
- [ ] **P08-AC09 — Rate/size failures:** request batching respects current count/byte limits. Quota, rate, timeout, partial write, and provider errors receive bounded retries and explicit incomplete status, without duplicate active records.
- [ ] **P08-AC10 — A/B/admin isolation:** list/search/fetch/progress/retry/cancel endpoints and caches reject B's access to A's data. Admin searches require the explicit authorized context and audit record; private-user context is never widened automatically.
- [ ] **P08-AC11 — Revocation and retention:** loss of access prevents context assembly and result display immediately through PostgreSQL checks. Eventual vector removal cannot preserve access; removal/retention of cited originals follows D19 rather than a cascade shortcut.
- [ ] **P08-AC12 — Outage behavior:** writing and stored-source inspection remain usable during Pinecone failure. A documented keyword-only fallback, if approved, identifies its reduced search scope; it cannot pretend semantic research succeeded.
- [ ] **P08-AC13 — Crash reconciliation:** injected crashes after PostgreSQL commit but before index publication, and after remote upsert but before local acknowledgement, replay safely. Reconciliation neither loses committed work nor activates an unconfirmed generation; stable IDs prevent duplicate active passages/generations.

## Verification and evidence

| Method | Required evidence | What it establishes |
|---|---|---|
| Adapter mocks/local fixtures | Invalid scope/dimension/ID, timeout, partial-write, stale candidate, and retry cases | Contract and failure behavior; no proof of Pinecone integration |
| Real controlled Pinecone run | Resource preflight, upsert/query visibility evidence, permitted/revoked namespace tests, usage | Actual selected API/index/SDK behavior for the fixture corpus |
| Human-labeled retrieval evaluation | Frozen questions, expected passages, per-channel recall/rank results and omissions | Retrieval usefulness; relevance alone does not establish claim support |
| A/B/admin integration tests | Denied endpoints/jobs/cache/context cases; authorized admin audit | Ownership enforcement through the full retrieval path |
| Recovery demonstration | Generation switch, failed reindex, restored prior generation, outage UI, and both cross-store crash windows | Rebuild, reconciliation, and fallback behavior |

Pinecone is eventually consistent; its documentation describes freshness checks including log sequence numbers. Validate the mechanism for the pinned API rather than relying on a fixed sleep. [Data freshness](https://docs.pinecone.io/guides/index-data/check-data-freshness).

Current operation limits include request/result/metadata bounds; namespace capacity varies by plan. Record checked limits during the authorized integration work. [Operation limits](https://docs.pinecone.io/reference/api/database-limits/operation-limits), [object limits](https://docs.pinecone.io/reference/api/database-limits/object-limits).

Live runs require the approved privacy configuration, exact isolated resources, and a bounded D17 budget. No benchmark result, resource creation, or provider call is claimed here.

### Required fixture manifest

- Labeled relevant and opposing passages with exact-term and paraphrased queries.
- A/B namespaces, an unauthorized namespace request, a revoked source, and an orphan/staged candidate.
- Incompatible embedding dimensions/configuration, delayed visibility, and rate/quota failures.
- A failed replacement generation with a still-usable prior generation and historical citations.
- Crashes between PostgreSQL commit/index publication and remote upsert/local acknowledgement, followed by repeated replay and readiness checks.

## Failure and rollback

Disable the affected index generation and keep its failure visible. Rollback selects the last accepted generation or an explicitly labeled keyword-only path. PostgreSQL passages and original assets remain available under their existing permissions.

Rebuild from authoritative storage; never infer passage text or ownership from surviving vectors. Retire only identified test/staging resources under the approved retention process, preserving unrelated indexes and user data.

## Exit evidence and handoff

- [ ] Attach resource/configuration records, retrieval evaluation, real visibility evidence, access tests, usage, and rollback results.
- [ ] An independent reviewer attempts namespace/ID substitution and checks permission revocation before model-context assembly.
- [ ] The user signs off retrieval quality, source visibility, provider disclosure, and measured operating limits.
- [ ] Mark the gate verified only after evidence is recorded; then authorize P09 separately. This planning document does not authorize implementation.

Return to [the rebuild plan](../../REBUILD_PLAN.md).

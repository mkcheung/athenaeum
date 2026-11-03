# Source reconciliation and contradictions

November 2, 2026. Static review only. This file identifies what is carried forward, superseded, unverified or still awaiting a decision.

## Precedence

Apply the latest user requirements first, then accepted entries in [DECISIONS.md](DECISIONS.md), then this rebuild architecture/phase bundle. Older reviews remain evidence and historical context. Do not revive an old recommendation merely because it has an exact package version or detailed schema.

| Existing proposal or finding | Source | Resolution |
|---|---|---|
| Laravel/Inertia rebuild | `PROJECT_REVIEW.md` sections 7.10 and 8 | Superseded by preferred Django/Python + React planning baseline D00; preserve intended security behaviors, not PHP controllers |
| PostgreSQL/pgvector as vector destination | `PROJECT_REVIEW.md` 7.7; `RESEARCH_WRITING_REDESIGN.md` 7 | Pinecone is now preferred for derived semantic search. PostgreSQL remains authoritative; do not assume two vector engines |
| AI optional near the end | `PROJECT_REVIEW.md` 7.8 and 8.2 | Superseded: combined library/web Ask with mandatory verification is core |
| Immediate hosting/paid-service selection | Earlier rebuild interview proposals | Superseded by round 9: local development and confirmed free tiers only; local object storage/mail capture exercise workflows. P13 is local acceptance; P14 hosted launch remains future/unverified. This does not waive real free-provider or human quality gates |
| One owner, multi-author roles deferred | `RESEARCH_WRITING_REDESIGN.md` Keep/replace/defer | Superseded: approved multiuser accounts, admins and ownership isolation begin in the foundation |
| Public essays/public readers in the foundation | Both earlier reviews | D01 accepted: private drafts plus deliberate owner publication and no-login public search/read. P12 adds a separate published-snapshot boundary; legacy broad public routes remain rejected |
| Admin role scope | Prior role seeds and general admin references | D02 accepted: manage/suspend accounts and inspect essays/research/profiles; no editing/deleting other authors' writing. Original-library access and admin research scope remain D06 |
| Optional shared/admin-curated library | Earlier architecture alternatives | D03 accepted: private libraries only. Public essay publication does not publish a library |
| Immediate registration/login | Legacy JWT controller; no approval design in initial reviews | Replace with admin approval then email activation; no normal access before both conditions |
| “Only” three books/1,217 highlights worth keeping | `PROJECT_REVIEW.md` summary, data inventory and carry-over section | Moot after round 13: D18 starts empty and D27 drops the legacy database, so no carry-over set is selected. The counts remain historical/unverified |
| Database dump matches `develop`, checked-out branch lacks features | `PROJECT_REVIEW.md` 3.2 | Moot after round 13: no legacy data is migrated, so the dump/branch compatibility is not verified. The 2022 dumps are kept unchanged in `retired/dbBackups/` |
| New sibling folder/separate repository | Round 8 D08 | Superseded by round 13: build at this repository's root with legacy files in `retired/` |
| Preserve all legacy data until a migration scope is approved | Original R02, earlier P01/P14 | Superseded by round 13: legacy code is kept in `retired/`; the legacy MySQL database is dropped without a fresh dump (D27) |
| Public author/user routes and action-only permissions | Legacy `routes/api.php`, controllers and middleware | Do not carry forward. Private operations require owner/authorized-admin checks; new public routes read only deliberately published snapshots and approved metadata |
| Global source/hash/identifier deduplication | `PROJECT_REVIEW.md` 7.2 | Must not merge private copies/permissions or reveal another user's holdings. Scope deduplication or separate bibliographic identity from private assets |
| Exact source/quote match as verification | Existing verification proposal | Keep, but it establishes captured-text identity rather than factual truth; semantic/context/counterevidence checks remain necessary |
| Manual use of failed evidence | `VERIFICATION_DESIGN.md` strict-mode overrides | A user can type ordinary text, but normal vetted Ask insertion stays blocked. An override cannot create a verified result; policy details D20 |
| 80% confidence/accuracy | Latest user clarification after the existing verification document | No demonstrated result exists. Propose accepted-pair precision and held-out human review in D15/P04/P10; exact measurement awaits acceptance. A model score or Pinecone similarity is not proof |
| One 0–100 essay truth probability | Earlier discussion of scoring | Use transparent support/coverage metrics and critical-argument rules first. Any composite needs D16, an explicit formula and separate human validation |
| Latest model IDs, package versions, CVEs, prices and effort estimates | `PROJECT_REVIEW.md` dated October 24 | Historical. Recheck compatible supported choices during P02; no timeline or accuracy promise is adopted |
| HTML examples show a working editor/AI | `design-explorations/*.html` | False inference: these are scripted design studies. They do not establish Tiptap integration, persistence, live research, or verification |

## Static evidence from the current repository

- Branch `establishUnitTests`, commit `d497937`; pre-existing edits in `app/Models/Category.php` and `tests/Feature/PostTest.php`; planning/design files were already untracked.
- `NewPost.js:306` saves `quill.getText()`; `:224–242` inserts citation strings derived from the displayed DOM. The adjacent-panel idea survives; document/citation persistence must change.
- `BookController.php:65–73` puts Kindle locations into `page`; `BookCitationList.js:53–55` labels them pages. No migration remains (D18), but the new app must still keep locator types distinct.
- `routes/api.php` and `app/Http/Kernel.php:42–46` do not make the API group globally authenticated. `PostController.php:190–201` returns a post without the new ownership policy; its update path accepts submitted owner information and performs unsafe file reads/writes.
- `database/migrations/2022_03_03_045235_add_image_to_post.php` contains MySQL-specific SQL. Port the intended domain model rather than replaying legacy migrations into PostgreSQL.
- `phpunit.xml` comments out isolated SQLite settings. Feature tests were not run; they must not be pointed at a development/legacy database as a shortcut.
- The Quiet Study, Research Desk, Fieldnotes and animated walkthrough HTML contain prewritten article/answer text and local DOM changes. Visual selection D14 remains open.

These file paths describe the tree before P01; after retirement they sit under `retired/`.

No `.env`, database backup contents or live accounts were inspected. (Round 13 read only the `DB_CONNECTION=mysql` line of `.env` to identify the engine.) No runtime exploit attempt, legacy test suite, package install, migration or paid API run was performed.

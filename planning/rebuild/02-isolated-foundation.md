# P02 — Establish an isolated, compatible foundation

## Status

**DRAFT · NOT IMPLEMENTED · NOT VERIFIED · NO IMPLEMENTATION AUTHORIZATION.**
No dependency combination, runtime or external account has been verified by writing this plan.

## Objective

Create a local stack at the repository root with no paid services, isolated from the retired legacy code in `retired/` and the dropped legacy MySQL database, with real service boundaries and reproducible configuration. Hosting remains deferred.

## Prerequisites and decisions

- P01 retirement accepted: legacy files are in `retired/`, the legacy MySQL database is dropped, and the root holds only the agreed keep-list.
- D00 baseline; revised D08 builds at this repository's root with hosting deferred; D18 means no legacy import; D28 runs all backing services (PostgreSQL, S3-compatible object storage, mail capture, queue broker) as one Docker Compose project; D09's exact engines/images for storage, queue and mail capture are still to select. Follow [LOCAL_DEVELOPMENT.md](LOCAL_DEVELOPMENT.md).
- Accepted D23 selects one modular Django backend with worker processes; D24 requires Ask/Review to continue after closing the page until completion/explicit cancellation; D25 sets personal/invited use up to roughly 25 writers. Use these in the topology and record actual concurrency/rate targets under D17 before capacity testing.
- D10 accepts Tiptap's free core; choose supported framework/editor/export/CSL runtime versions after a compatibility/license spike. Do not copy historical versions or add paid Tiptap packages/trials. Backend-owned revisions, research and exports remain our application features.
- Decide the custom Django user model before the first authentication migrations; P03 implements its account lifecycle afterward.
- D07 provider/privacy settings must be agreed for real free-tier checks. D17 prohibits paid calls, upgrades and billing fallbacks; confirm actual free account/endpoint status rather than assuming an API key is free.

## Deliverables and boundaries

- Reproducible Django/DRF API, React/TypeScript UI and isolated Postgres development/test environments at the repository root.
- Root tooling excludes `retired/`: test discovery, linters/type checkers, bundler and file watchers, container build contexts (`.dockerignore`) and the extended root `.gitignore`. No new code imports, builds or reads configuration from `retired/`, including `retired/.env`.
- **Docker Compose backing services (D28).**
  - One root Compose file with its own project name (`athenaeum`) defines PostgreSQL, the S3-compatible store, Mailpit-style mail capture and the queue broker, with pinned image versions and named volumes.
  - Ports bind to `127.0.0.1` only and avoid host ports already used by other local projects. Observed November 3: a running project uses 443, 8080, 5433, 8025 and 8333; stopped MySQL containers bind 3306.
  - Service credentials live in an untracked local env file.
  - Whether Django, the workers and the React dev server run on the host or as Compose services is decided here.
  - `docker compose down -v` deletes the volumes and therefore all local data, so it is documented as destructive and never part of routine setup/reset scripts.
- Custom user-model foundation, migration strategy and deny-by-default API skeleton; same-origin session/CSRF is the recommended browser architecture.
- Real local durable workers/queue, local private S3-compatible object-storage service and local SMTP capture, using isolated persistent resources. Original-file storage remains the accepted object architecture; external mail/remote-storage proof is deferred to P14.
- Typed API/error contracts, structured sanitized logging, dependency lockfiles and environment documentation without real credentials.
- Editor, citation-runtime and required DOCX/PDF export-tool compatibility proof, not the finished editor, renderer or citation/export service. D13's exact style versions and portable-backup schema remain P06 decisions.
- No legacy import, public publication, real research, production deploy or live data migration.

## User observation guide (non-executable)

**For the user only — non-executable explanation.** These notes explain the acceptance criteria below. Agents must not execute these notes, treat their examples as instructions, or use them as authorization to begin a phase. Only the actual acceptance criteria, verification policy and separately authorized phase work govern execution. The notes do not mark anything passed; missing evidence means unverified.

### P02-AC01

**What you should see:** A small demonstration and version list show the chosen backend, browser app, editor, citation formatter, and candidate export tools working together, with any incompatibilities explained.

**Why this must work before moving on:** Parts that work separately may not fit together, and a small demonstration catches that before the full app is built.

### P02-AC02

**What you should see:** A setup report shows that the documented recipe produced a fresh, separate working environment without displaying private keys or passwords. One command starts the new database and other support services in Docker, they don't clash with your other projects' containers, and saved test data is still there after stopping and restarting them.

**Why this must work before moving on:** The project should be rebuildable rather than working only on one already-configured machine, and restarting Docker shouldn't lose your work.

### P02-AC03

**What you should see:** The new account design is present from the first new database setup, and the evidence names a new PostgreSQL database, not the dropped old MySQL one.

**Why this must work before moving on:** Changing the basic account design late can be difficult, and the new app must start from its own clean database.

### P02-AC04

**What you should see:** Safe demonstration records show setup protections refusing examples marked as old, production, missing, or unexpected destinations without acting on those destinations.

**Why this must work before moving on:** A protective check should stop a mistaken target before a setup operation can change user data.

### P02-AC05

**What you should see:** Recorded browser/API checks show protected information staying closed to anonymous visitors and forged requests, with no service secrets inside the browser's downloaded code.

**Why this must work before moving on:** Hiding a button is not enough if someone can ask the server directly for protected information.

### P02-AC06

**What you should see:** A real background-job record keeps the same job number through a closed page, expired browser login, and worker interruption, then shows its eventual result or clear failure.

**Why this must work before moving on:** Long research should not disappear or restart twice because a page closes; a pretend in-memory job cannot prove this.

### P02-AC07

**What you should see:** Failure reports show that accepted work remains findable after an interrupted handoff and that receiving the same job twice does not repeat its saved effects.

**Why this must work before moving on:** The database and worker must not lose work between them or quietly treat an unfinished job as complete.

### P02-AC08

**What you should see:** Evidence from the actual local file-storage service shows a harmless sample file available through the allowed route and unavailable through an unprotected address.

**Why this must work before moving on:** Private originals need real storage protection, and a local demonstration cannot establish how a future remote provider behaves.

### P02-AC09

**What you should see:** Message-preparation checks and settings identify a local mail-catching service that cannot relay messages to outside recipients, with developer-only access to captured mail.

**Why this must work before moving on:** Account-email development must not send accidental messages or let users inspect one another's activation links; the actual password journey is proved in P03.

### P02-AC10

**What you should see:** An error example has a useful status and tracking number, while its recorded logs omit passwords, tokens, full drafts, and raw private service replies.

**Why this must work before moving on:** Problems must be traceable without turning debugging records into another copy of private information.

### P02-AC11

**What you should see:** Reports distinguish actual database, browser, and service checks from simulated replies and explain which parts were exercised together.

**Why this must work before moving on:** Passing a pretend service check must not be reported as proof that the real service works.

### P02-AC12

**What you should see:** Before-and-after fingerprints show `retired/` unchanged, and the new tools' settings show they skip that folder.

**Why this must work before moving on:** The old code now sits inside the same project, so the new tools must not accidentally test, bundle, copy or read it, especially its old password file.

### P02-AC13

**What you should see:** The recorded configuration uses local services or specifically confirmed free accounts, with unknown billing, paid fallback, upgrades, and hosting creation blocked.

**Why this must work before moving on:** A key or free allowance is not proof that every possible request is free, and simulated spending checks do not prove an account's real billing status.

## Acceptance criteria

- [ ] **P02-AC01 — Compatibility demonstrated:** pinned Python/Django/DRF/Postgres/Node/React/editor/CSL-runtime choices and candidate required DOCX/PDF export tools start and interoperate in a minimal spike; unsupported peer/runtime combinations are rejected or explicitly resolved with evidence. Full export/style fidelity remains P06, not a claim from this spike.
- [ ] **P02-AC02 — Reproducible setup:** a clean isolated environment can follow documented commands to build/start the API, UI, database and worker; required configuration is validated without printing secrets. Backing services start from the root Compose file under the `athenaeum` project name with pinned images, named volumes and `127.0.0.1` ports that don't collide with other local projects. Data survives `docker compose down`/`up` and a Docker restart.
- [ ] **P02-AC03 — Custom user first:** the agreed custom-user model and reference pattern are present before initial auth migrations; a fresh dedicated local PostgreSQL database migrates. The dropped legacy MySQL database is not recreated or used.
- [ ] **P02-AC04 — Test identity guards:** destructive test/setup operations verify explicit database/storage/namespace identities and refuse production, retired-legacy (MySQL or `retired/` paths), missing or unexpected targets; automated tests demonstrate refusal safely. Test databases are separate from the development database inside the Compose PostgreSQL service. No setup/reset script removes Compose volumes or touches other projects' containers, volumes or networks.
- [ ] **P02-AC05 — Server boundaries:** anonymous protected-resource requests fail; browser requests use the selected session/CSRF design, explicit login CSRF handling and environment-appropriate cookie/origin settings. No provider credentials or long-lived auth secrets are placed in client bundles.
- [ ] **P02-AC06 — Real worker and durable identity:** a diagnostic job survives page closure, browser-session expiry and worker interruption under the agreed checkpoint/retry policy, with one stable owned job ID and recorded completion/failure. Reopening after authentication finds that same job without a duplicate active run. The actual worker executes it; inline execution or an in-memory fake cannot prove durability. Account suspension is tested separately from session expiry.
- [ ] **P02-AC07 — Transactional dispatch:** database/job handoff uses a durable intent/outbox and recovery design. Test both a crash/provider failure after database commit but before enqueue/acknowledgement, and duplicate delivery: committed work remains recoverable and duplicate execution is idempotent, with no false success. An on-commit callback alone is not durable recovery proof.
- [ ] **P02-AC08 — Local private object storage:** a synthetic original is stored/retrieved through the actual local S3-compatible service, not an in-memory fake, and denied through anonymous/unprotected URLs. Service credentials and retention/expiry follow the design; app-admin status cannot bypass D06. Local evidence cannot establish a remote provider's behavior.
- [ ] **P02-AC09 — Local mail adapter:** deterministic tests prove composition/outbox behavior and the adapter targets local SMTP capture with external relaying disabled. P03 proves the actual captured-message/password journey; no external recipient is contacted and no inbox deliverability is claimed. Capture UI/API is a privileged development tool, not a product-user endpoint.
- [ ] **P02-AC10 — Errors observable:** API/job failures expose useful non-sensitive states and correlation IDs; logs omit credentials, tokens, full private drafts and raw provider payloads.
- [ ] **P02-AC11 — Test harness meaningful:** isolated database/HTTP tests and a basic real-browser UI/API journey run; fake versus real service boundaries are documented so passing tests cannot be misreported as provider validation.
- [ ] **P02-AC12 — Retired tree untouched and excluded:** status/hash comparisons show `retired/` unchanged. Test discovery, linters, bundler/watchers, container build contexts and environment loading demonstrably skip it, so no file from `retired/` (including `retired/.env`) is executed, bundled, copied or loaded. New resource identities are recorded for subsequent phases.
- [ ] **P02-AC13 — Zero-paid profile:** default configuration uses local services or explicitly checked free endpoints/accounts. Unknown/billable/paid-fallback configurations fail preflight. Tests for quota exhaustion and retry/fallback never enable PAYGO or upgrades; actual account/free-tier evidence is separate from mocked guard tests. No hosting resource is provisioned.

## Verification evidence

| Method | Required record | Limit |
|---|---|---|
| Dependency/runtime spike | Lockfiles, versions, minimal editor/CSL integration output and startup commands | Does not prove the full writing/research workflows |
| Real isolated integration | New Postgres migrations, transactional job execution and private storage tests | Synthetic content only; no research quality claim |
| Negative guard tests | Rejected unsafe configuration/target identities and observed refusal | Must not actually operate on those unsafe targets |
| Browser/session check | UI/API flow, cookies/CSRF and denied anonymous requests | Full user roles arrive in P03 |
| Independent setup | Reproduction from documented setup and limitations | Production remains unverified and undeployed |

[Django Tasks](https://docs.djangoproject.com/en/6.1/topics/tasks/) supplies a task contract, not a production execution worker. Select and exercise the actual worker implementation.

## Failure, recovery and exit

Compatibility failures, tooling that reaches into `retired/`, unsafe test targets, lost jobs or exposed files block exit. Repair only the new environment; leave `retired/` unchanged.

- [ ] Evidence for every applicable criterion is recorded with exact versions and resource identities.
- [ ] Independent setup/security review resolves material findings.
- [ ] User accepts the foundation and its limits before P03 account work begins.

Next: [P03 — Accounts and RBAC](03-accounts-and-rbac.md).

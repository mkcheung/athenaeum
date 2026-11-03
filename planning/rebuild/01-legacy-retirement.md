# P01 — Retire the legacy code in place and scrap the legacy database

## Status

**EXECUTED NOVEMBER 3, 2026 · MOVE STAGED, NOT COMMITTED · AWAITING INDEPENDENT REVIEW AND USER ACCEPTANCE.**
Round 13 replaced the earlier preservation/sibling-repository plan with this in-place retirement. The user authorized execution (`/goal`) and confirmed the exact drop in-session. Evidence: [P01 execution record](evidence/P01-execution-record.md). The phase's own checks were run by the executing agent, not an independent reviewer.

## Objective

Set the legacy Laravel application aside inside this repository, drop its MySQL database, and leave the repository root ready for the new application, without losing Git history, leaking secrets or touching anything outside the agreed targets.

## Prerequisites and decisions

- P00 acceptance and explicit user authorization for this phase's concrete operations.
- Revised D08: build the new application at this repository's root (`/Users/marscheung/PhpAndJsProjects/athenaeum`); move every existing legacy file into `retired/` in the same repository.
- D18: start empty. No legacy users, essays, sources, quotes, categories or images will be imported into the new app; `retired/` is reference material only.
- D27: drop the legacy MySQL database, tables and all, **without taking a fresh dump**. The user accepted that legacy data not already in the March/April 2022 dumps is permanently lost. The new app uses a fresh local PostgreSQL database in P02 (D00 unchanged).
- Settled November 3 (round 13 follow-up):
  - **Working branch:** a new branch, `rebuild`, created from the `establishUnitTests` HEAD so the latest legacy commits stay in history. All P01 work happens there.
  - **Planning files:** `planning/`, `REBUILD_PLAN.md`, the three reviews and `design-explorations/` are committed on `rebuild`.
  - **Legacy MySQL database:** after the tables are gone, the database itself is dropped too. Nothing of it remains on the MySQL server.
- **The two formerly uncommitted legacy edits** (`app/Models/Category.php`, `tests/Feature/PostTest.php`) were discarded outside the planning work at 10:43 on November 3; both files now match commit `d497937`. Nothing remains to carry. If they are restored before execution, the user chooses whether to commit them first or carry them uncommitted into `retired/`; they are never silently committed, reverted or discarded by P01 work.

## Deliverables and boundaries

1. **Target record.** Repository path, branch/commit, the keep-list and move-list, and the legacy database identity read from the legacy configuration without printing usernames or passwords. Observed November 3: database `journeyman` on the native (non-Docker) MySQL 8.0.13 server installed at `/usr/local/mysql`, data directory `/usr/local/mysql/data`, reached via `localhost` (local socket). Last writes July 23, 2023. The server was stopped at that time.
   - **Server identity check.** Three stopped Docker MySQL containers from other projects (`library-api-db-1`, `library-mysql`, `sql-course`) also bind host port 3306. Before the drop, the open connection must report version 8.0.13 and data directory `/usr/local/mysql/data`; any other answer means the wrong server and stops the phase.
   - **Same-server databases that stay:** `journeyman2`, `blog`, `company_db`, `epetition`, `Goblog`, `hotel`, `joes2pros`, `laravel8`, `laravel_parking_app`, `practice_db`, `todo`, plus MySQL's system schemas.
   - **Server state.** If the native server must be started for the drop, return it to its prior state (stopped) afterwards.
   - **As executed.** The launchd service was crash-looping and could not be started (no sudo). The same 8.0.13 binary was run once as the data owner, socket-only with a private short socket, and shut down cleanly after the drop. The launchd service was not touched. Details in the execution record.
2. **Disposal record.** The legacy database's table names and row counts, and nothing else: no row contents, credentials or private text. It documents what was discarded; it is not a backup.
3. **Confirmation and drop.** The exact database and table list are presented for the user's confirmation at execution time. Then that one database is dropped (`DROP DATABASE` on the confirmed name), which removes all its tables. Drop before moving files so the legacy configuration resolves from its original location. If the legacy app's MySQL account lacks permission to drop a database, stop and ask the user which account to use; never guess or reuse other credentials.
4. **Move.** Tracked files move with `git mv`, so history follows them; ignored/untracked legacy files (`.env`, `vendor/`, `node_modules/`, `dbBackups/`, `storage/` contents, caches) move as plain files. The legacy `.gitignore` moves to `retired/.gitignore`, where its rules keep applying to the retired tree, and a minimal new root `.gitignore` covers `.env` files, `.DS_Store`, `/.idea`, `/.vscode`, and defensively `/node_modules`, `/vendor`, `/dbBackups`, `*.sql` and `*.log` until P02 extends it.
5. **Root keep-list.** After the move the root holds only `.git/`, the new `.gitignore`, `retired/`, `planning/`, `REBUILD_PLAN.md`, `PROJECT_REVIEW.md`, `RESEARCH_WRITING_REDESIGN.md`, `VERIFICATION_DESIGN.md` and `design-explorations/`.
6. **Handoff to P02.** The root is the new application location; `retired/` must be excluded from new tooling; no legacy import will occur.

Out of scope: deleting any file (including the 2022 dumps, `vendor/` or `node_modules/`), dropping any other database (including the similarly named `journeyman2`), uninstalling the native MySQL server, touching any Docker container, running the legacy app or its test suite from `retired/`, or creating the new application.

## User observation guide (non-executable)

**For the user only — non-executable explanation.** These notes explain the acceptance criteria below. Agents must not execute these notes, treat their examples as instructions, or use them as authorization to begin a phase. Only the actual acceptance criteria, verification policy and separately authorized phase work govern execution. The notes do not mark anything passed; missing evidence means unverified.

### P01-AC01

**What you should see:** A short record naming this project folder, the branch, exactly which files stay and which move, and that `journeyman` on the Mac's own MySQL server is the one database being dropped, without showing its password. It also shows a check proving the connection reached that server and not one of the other projects' Docker MySQL containers.

**Why this must work before moving on:** Several MySQL servers on this Mac can answer on the same port, and the real server also holds other projects' databases, including one with a similar name.

### P01-AC02

**What you should see:** The work happens on the new `rebuild` branch with the planning files already saved, and any unfinished edits present at that time are handled the way you chose. Nothing is quietly saved into history or thrown away.

**Why this must work before moving on:** Unfinished work is still yours, even when the code it belongs to is being retired.

### P01-AC03

**What you should see:** A before-and-after list of the old files with matching sizes and fingerprints, now under `retired/`, and the old files' history still visible in Git.

**Why this must work before moving on:** "Set aside" should mean "moved intact," not "partly copied."

### P01-AC04

**What you should see:** The top-level folder contains only `retired/`, the planning documents and the design studies, and the planning links still open.

**Why this must work before moving on:** The new app needs a clean starting place that doesn't mix with the old one.

### P01-AC05

**What you should see:** A check showing that the old password file, database dumps and downloaded packages are still hidden from Git after the move.

**Why this must work before moving on:** Moving a file can accidentally make a secret visible to Git, and a committed secret is hard to take back.

### P01-AC06

**What you should see:** A list of the old database's tables and how many rows each had, with no actual content.

**Why this must work before moving on:** After the drop this list is the only record of what was discarded. It cannot bring anything back.

### P01-AC07

**What you should see:** Right before the drop, you are shown the exact database and tables and asked to confirm. The drop happens only after you say yes.

**Why this must work before moving on:** Dropping without a dump is permanent; the decision in the plan is not the same as approving the actual action.

### P01-AC08

**What you should see:** A check showing the old database no longer exists, and that every other database on the same server is still present.

**Why this must work before moving on:** Only the intended database should change; nothing else on your computer should be affected.

### P01-AC09

**What you should see:** Confirmation that nothing recreated the old database or its tables and that MySQL itself is still installed.

**Why this must work before moving on:** Some reset commands rebuild the old tables right after deleting them, which would defeat the purpose.

### P01-AC10

**What you should see:** A closing note: the two 2022 database dumps are still in `retired/dbBackups/` unchanged, nothing else was deleted, and P02 knows where to build and what to ignore.

**Why this must work before moving on:** The old dumps are now the only copy of any legacy data, and the next phase needs clear boundaries.

## Acceptance criteria

- [x] **P01-AC01 — Exact targets and server identity:** the record names the literal repository path, branch/commit, keep-list, move-list and legacy database identity (connection type, host, port, database name `journeyman`), with no credentials printed. Before any drop, the live connection reports the native server's `@@version` (8.0.13) and `@@datadir` (`/usr/local/mysql/data`). A non-local host, a different server (such as a Docker MySQL container on port 3306), an unexpected database name or an ambiguous path stops the phase before any move or drop.
- [x] **P01-AC02 — Branch and uncommitted work honored:** retirement runs on the `rebuild` branch, which contains the `establishUnitTests` history and the committed planning files. Any uncommitted changes present at execution (the earlier `Category.php`/`PostTest.php` edits are gone unless restored) end up exactly as the user chose; P01 work never silently commits, reverts or discards them.
- [ ] **P01-AC03 — History-preserving move:** tracked legacy files move by `git mv`, and history follows the move: staged renames of sampled files show R100 before the commit, and `git log --follow` traces them into `retired/` after the commit (it cannot show anything across an uncommitted move). A before/after manifest (relative path, size, SHA-256) of the whole legacy tree, ignored files included, matches with only the `retired/` prefix added. *Status: manifest match and R100 renames verified; the `git log --follow` check awaits the commit.*
- [x] **P01-AC04 — Clean root:** the root holds only the agreed keep-list. Relative links in `REBUILD_PLAN.md` and `planning/` still resolve.
- [x] **P01-AC05 — Secrets and dumps stay ignored:** `git check-ignore` confirms that `retired/.env`, `retired/dbBackups/*`, `retired/vendor/` and `retired/node_modules/` are ignored. No secret or dump appears in `git status`, a staged change or a commit. Reports never print `.env` contents.
- [x] **P01-AC06 — Disposal record:** before the drop, table names and row counts of the exact target are recorded, with no row contents, credentials or private text, and labeled as a disposal record rather than a backup.
- [x] **P01-AC07 — Execution-time confirmation:** the exact database identity, table list and drop operation are presented and the user explicitly confirms in the same session before execution. D27 alone is not that confirmation.
- [x] **P01-AC08 — Exact-target drop:** only the confirmed database is dropped, with all its tables including `migrations`. A post-check shows it is absent from `SHOW DATABASES`, and the server's other databases (including `journeyman2`) are unchanged before and after.
- [x] **P01-AC09 — Drop-only operation:** the operation used cannot recreate the database or its tables (`DROP DATABASE` on the confirmed name; never `migrate:fresh`, `migrate:refresh`, seeders or anything that runs legacy migrations). The native MySQL server stays installed and is returned to its prior state (stopped; its launchd service remains broken and was not repaired); no other MySQL user or setting and no Docker container is changed.
- [x] **P01-AC10 — No further destruction and handoff:** the 2022 dumps are present in `retired/dbBackups/` with unchanged hashes. Nothing outside the agreed move and drop was deleted or reset. P02 receives the root location, the `retired/` exclusion requirement and D18's no-import scope.

## Verification evidence

| Method | Required record | Limit |
|---|---|---|
| Read-only target inspection | Path, branch/commit, `git status` summary, keep/move lists, sanitized database identity | Establishes targets only |
| Manifest comparison | Before/after path/hash lists, staged R100 renames, and `git log --follow` samples after the commit | Does not prove the legacy app still runs from `retired/`; that is not required |
| Ignore checks | `git check-ignore` output and a clean `git status` for secrets/dumps | Covers the listed paths only |
| Disposal record | Table names and row counts | Not a backup; nothing is recoverable from it |
| Drop verification | User confirmation, operation used, before/after database list showing only the target removed | Applies to the confirmed target only |

Never print `.env`, database credentials, row contents or dump bodies. Do not run the legacy test suite: its isolated database settings are commented out.

## Failure, recovery and exit

A mismatched manifest, a newly unignored secret, an unexpected database target or a drop that touches anything else stops the phase. File-move problems can be reversed with Git and the manifest. **A completed drop cannot be undone:** data after April 2022 is gone by the user's decision, and the 2022 dumps are the only remaining copy of earlier data.

- [ ] Every criterion has actual evidence and discrepancies are resolved. *(AC01–AC02 and AC04–AC10 have evidence; AC03 awaits the commit.)*
- [ ] The user accepts the retirement and the drop result.
- [ ] P02 receives the root location, the `retired/` exclusion rule and the no-import scope.

Next: [P02 — Isolated foundation](02-isolated-foundation.md).

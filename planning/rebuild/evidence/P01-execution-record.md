# P01 execution record: legacy retirement

Executed November 3, 2026 on branch `rebuild` (base commit `3af4fe9`). This records what was done and observed. It contains no credentials, no row contents and no private text. **It is a disposal record, not a backup.** The user accepted P01 on November 3, 2026, after the commit (`8bbb15a`).

**Self-attestation caveat.** The server-identity check (version and data directory compared before the drop) and the user's confirmation happened inside the executing session and were not captured as separate artifacts. An independent review on November 3 confirmed the resulting filesystem and database state, the staged renames, the ignore rules and the dump hashes, but cannot re-verify those two in-process steps.

## Targets (P01-AC01)

| Item | Observed |
|---|---|
| Repository | `/Users/marscheung/PhpAndJsProjects/athenaeum`, branch `rebuild`, clean working tree at start |
| Database | `journeyman` on the native (non-Docker) MySQL server at `/usr/local/mysql` |
| Server identity check | The live connection reported `@@version` = `8.0.13` and `@@datadir` = `/usr/local/mysql/data/`; the command aborted unless both matched exactly |
| Connection | Unix socket only (`--skip-networking`), so no Docker MySQL container on port 3306 could be reached |
| Account | The legacy app's configured account, which holds DROP permission |

**Server start procedure.** The launchd service `com.oracle.oss.mysql.mysqld` could not start: it was in a crash loop (28,000+ spawn attempts, last exit code 1, no log lines since December 2022). It runs as `_mysql`, and every file in the data directory is owned by the user with group `_mysql` read-only, which probably explains the loop. This was not investigated further or changed. Instead, the same `mysqld` 8.0.13 binary was run once as the data owner with a private socket and no network port, then shut down cleanly. The launchd service was not modified and is in the same state as before: still crash-looping ("spawn scheduled"), so **the native MySQL server will not come up normally until that service is repaired**. The cause above is a hypothesis, not verified. The first attempt aborted before serving because the scratchpad socket path exceeded the OS limit; the second used a short socket in `/tmp`, since removed.

**Footprint on the shared data directory.** Starting and stopping the server ran InnoDB crash recovery (normal after an unclean prior shutdown), created binlog files `000093` and `000094`, and rewrote the InnoDB system files. No other database's directory changed.

## Disposal record (P01-AC06)

Tables and exact row counts of `journeyman` immediately before the drop:

| Table | Rows | Table | Rows |
|---|---:|---|---:|
| books | 13 | permissions | 28 |
| categories | 10 | personal_access_tokens | 0 |
| chapters | 18 | post_tag | 10 |
| citations | 1211 | posts | 61 |
| comments | 4 | replies | 6 |
| failed_jobs | 0 | role_has_permissions | 41 |
| migrations | 21 | roles | 3 |
| model_has_permissions | 0 | tags | 7 |
| model_has_roles | 5 | users | 4 |
| password_resets | 0 | | |

19 tables, 1,442 rows in total. The only remaining copies of any `journeyman` data are the stale March and April 2022 dumps in `retired/dbBackups/`. Data written after April 2022 (the data files were last changed July 23, 2023) is permanently gone, as D27 accepted.

## Drop (P01-AC07 to AC09)

- **Confirmation (AC07).** The user was shown the exact server, database, 19-table list with counts, the absence of a current dump, and the databases that would stay. They selected "Yes, drop journeyman" in this session before the command ran.
- **Operation (AC09).** A single `DROP DATABASE journeyman`. No migrate, refresh, seed or test command ran. MySQL stays installed and is stopped. No other user, setting or Docker container was changed.
- **Result (AC08).** Database list before: `blog, company_db, epetition, Goblog, hotel, information_schema, joes2pros, journeyman, journeyman2, laravel8, laravel_parking_app, mysql, performance_schema, practice_db, sys, todo`. After: the same without `journeyman`. A diff showed exactly one line removed. `journeyman2` still has its 11 tables. The `journeyman` data folder no longer exists.

## Move (P01-AC03, AC04)

- **Method.** `git mv` for every top-level entry holding tracked files; plain `mv` for entries that were entirely ignored (`.env`, `vendor/`, `node_modules/`, `dbBackups/`, caches, `.DS_Store`).
- **Manifest.** Before the move, 53,504 legacy files were hashed (path and SHA-256; most are in `node_modules/` at 45,566 and `vendor/` at 7,495). After the move the same 53,504 files hash identically under `retired/`. The manifest SHA-256 is `96ef38b5b146d287f7c4f0ae57380cdf04459b792b6c8b3aeba67aa67661f89b` (kept in the session scratchpad, not committed, because it lists ignored secret-bearing paths).
- **Staged result.** 185 pure renames (all R100, similarity 100%), a modified root `.gitignore`, and an added `retired/.gitignore` (the legacy rules). Committed afterwards as `8bbb15a`.
- **Root.** `.git`, `.gitignore`, `design-explorations/`, `planning/`, `PROJECT_REVIEW.md`, `REBUILD_PLAN.md`, `RESEARCH_WRITING_REDESIGN.md`, `retired/`, `VERIFICATION_DESIGN.md`. All relative links in `REBUILD_PLAN.md` and `planning/` resolve (0 broken).
- **History.** Before the commit, staged R100 renames and a throwaway unreferenced commit object showed history following the move. After commit `8bbb15a`, `git log --follow` on `retired/app/Models/Category.php`, `retired/routes/api.php`, `retired/resources/js/components/Home/Dashboard.js` and `retired/composer.json` traces through 3, 16, 12 and 4 commits, including those from before the move.

## Secrets and dumps (P01-AC05)

`git check-ignore` confirmed these are ignored: `retired/.env`, both files in `retired/dbBackups/`, `retired/vendor/`, `retired/node_modules/`, `retired/storage/logs/laravel.log`, root `.env` and `.DS_Store`. The staged change set contains no `.env`, dump, `vendor/`, `node_modules/` or log file; the one pattern hit was the tracked placeholder `retired/storage/framework/sessions/.gitignore`.

## Dumps and handoff (P01-AC10)

SHA-256 before and after the move, unchanged:

- `dbBackups/jm04042022.sql`: `28c787ae0d90abddb3b122e3acc0c03a3784fc8ab28ba1fce876db465fe3e2de`
- `dbBackups/journeyman03122022.sql`: `cb7e883ead22fc212c1372f28f657dff017104df214c8203bf12618c43731f1f`

Nothing else was deleted. P02 receives: the root as the new application location, the requirement that all new tooling exclude `retired/`, and D18's no-import scope.

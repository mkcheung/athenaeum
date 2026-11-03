# P14 — Future launch qualification and deployment

## Status

**DRAFT · FUTURE / DEFERRED · NOT IMPLEMENTED · NOT VERIFIED · NO IMPLEMENTATION AUTHORIZATION.**
The current decision is local development only, with zero paid usage until a later launch decision. No hosting, deployment or deletion is authorized here. Accepting P13 locally does not pass this phase.

Round 13 (November 3, 2026) removed legacy migration and legacy-runtime retirement from this phase. D18 starts the new app empty, and P01 retires the legacy code in place. Former criteria P14-AC01–AC07, AC10 and AC12 are withdrawn; their IDs are kept so earlier references stay traceable.

## Objective

After a separately agreed launch scope, qualify the selected hosted configuration and deploy it with a tested recovery path. Local service evidence is carried forward only within its demonstrated limits.

## Prerequisites and decisions

- Later explicit user acceptance of launch scope and authorization for the exact hosted staging/testing operations, targets and budget. Hosting/provider selection and any paid usage are still deferred; no accounts or resources are created by this plan.
- P13's accepted local configuration, with actual external integration and P10/P11 qualification evidence. A pending local gate is not a production exemption.
- D08/D09/D10 identify selected hosting, HTTPS origins, workers, email and remote private object storage with pinned compatible versions.
- D04/D05/D19 govern invitations/activation, account state, credentials, retention, backup locations, failure domains and restoration. Keep the accepted at-most-one-hour recovery-point target; define production recovery-time and workload/capacity expectations before measuring them.
- D07/D11/D15/D16/D17 cover launch provider data/settings, Pinecone mode/configuration, evaluation freshness, quotas and operating costs. Launch budget/pricing/auto-upgrade behavior needs its own accepted limits.
- D21/D22 govern publication.
- **Open at launch:** whether essays/sources written in the local app should carry into the hosted launch. D18 covers only legacy data. If local content must move, that transfer needs its own decision and acceptance criteria then; it is not assumed here.

## Deliverables and boundaries

- Actual hosted HTTPS/session/security, selected remote email/object-storage and worker qualification, with local-versus-hosted differences recorded.
- Production-scope recovery/capacity and affected research/essay requalification; local SMTP capture, local object storage and localhost anonymous reading are not production evidence.
- Exact deployment checklist, health criteria, rollback triggers, recovery instructions and protected snapshots.
- No legacy import, no legacy-runtime shutdown (none exists after P01) and no deletion of `retired/` or its Git history.

## User observation guide (non-executable)

**For the user only — non-executable explanation.** These notes explain the acceptance criteria below. Agents must not execute these notes, treat their examples as instructions, or use them as authorization to begin a phase. Only the actual acceptance criteria, verification policy and separately authorized phase work govern execution. The notes do not mark anything passed; missing evidence means unverified.

P14 is future and deferred. The observations below describe evidence to inspect only after separate launch decisions and authorization; they do not begin a deployment.

### P14-AC08

**What you should see:** A future recovery rehearsal restores matching writing and files, accounts for essays written after launch, and explains how much work could actually be recovered, rather than just showing an hourly schedule.

**Why this must work before moving on:** A way back must protect new writing, not merely restore an older release.

### P14-AC09

**What you should see:** The future approval packet spells out the exact deployment and switch actions, their targets, timing, checks and recovery path, and waits for your explicit approval.

**Why this must work before moving on:** Design approval and a successful rehearsal are not permission to change a running service.

### P14-AC11

**What you should see:** After an authorized deployment, recorded journeys work through the real hosted sign-in, editor, research, references and public pages, with a clear recovery decision if something fails.

**Why this must work before moving on:** Success on the Mac alone does not show that the launched version behaves correctly.

### P14-AC13

**What you should see:** The future handoff lists actual changes, check results, protected recovery locations, operating notes and remaining limits; it grants no later deletion permission.

**Why this must work before moving on:** You need a usable record of what changed and how to recover, not just a message saying the launch is finished.

### P14-AC14

**What you should see:** Future hosted evidence shows the actual secure web address, sign-in protections and permitted guest/user/admin views, including protected downloads, rather than reusing only local screenshots.

**Why this must work before moving on:** A real internet-facing setup has its own boundaries that local success cannot establish.

### P14-AC15

**What you should see:** Future records show controlled messages reaching real mailboxes and private files staying protected in the selected remote storage, with the actual hosted background worker involved.

**Why this must work before moving on:** Local captured email and local file storage do not prove that the later outside services work safely.

### P14-AC16

**What you should see:** The future restore report compares saved work and files with a recorded failure time, measures whether loss stays within one hour for the claimed failures, and uses an independent copy for whole-device loss.

**Why this must work before moving on:** An hourly schedule or another folder on the same Mac cannot establish recovery after losing that Mac; missing destinations or restore evidence stay unverified.

### P14-AC17

**What you should see:** The future launch record identifies any changed model, source-search method or processing settings and includes the affected real checks and independent human assessments.

**Why this must work before moving on:** A new setup cannot borrow another setup's accuracy result, and no score guarantees that an individual citation is true.

### P14-AC18

**What you should see:** Future measurements show the agreed number of simultaneous jobs/readers, waiting times and costs on the chosen hosting plan, including safe handling of limits without unapproved upgrades.

**Why this must work before moving on:** Twenty-five registered writers do not prove that twenty-five searches can run at once or that a different hosting plan will perform the same way.

## Acceptance criteria

Withdrawn by round 13 (D18 start empty; legacy retirement moved to P01): P14-AC01 exact migration scope, AC02 import rehearsal, AC03 content preservation, AC04 legacy locator honesty, AC05 imported-account isolation, AC06 imported-essay privacy, AC07 migration reconciliation, AC10 controlled transfer and AC12 legacy-runtime retirement. They are not "passed"; they no longer apply. If a local-to-hosted content transfer is later approved, it gets new criteria.

- [ ] **P14-AC08 — Restore and rollback rehearsed:** a consistent hosted database/asset set and necessary configuration can restore under the approved recovery policy, including required independent copies. Rollback to a previous release covers writes made after launch through an agreed pause/export/reconciliation plan, with no silent loss of newly authored essays; an hourly backup schedule alone is not proof of the one-hour recovery-point target.
- [ ] **P14-AC09 — Concrete deployment approval:** after rehearsal, present exact deployment/switch actions, targets, time window, health checks and recovery path for explicit user approval before executing consequential production changes.
- [ ] **P14-AC11 — Post-deployment verification:** account activation/password setup/login, author dashboard/editing, citations, qualified research/review and eligible public pages work against the exact hosted configuration. Test production HTTPS/browser/email/storage boundaries rather than replaying only local fixtures; privacy and quality regressions trigger the agreed rollback.
- [ ] **P14-AC13 — Handoff:** the user receives exact changes, verification results, protected backup locations, operational instructions, outstanding limits and demonstrated recovery steps. Any later deletion requires its own exact-target request and safety review.
- [ ] **P14-AC14 — Hosted HTTPS and permissions:** independently exercise the selected hosted origins, TLS, proxy/session/cookie/CSRF configuration, public/private routes and A/B/admin/account-state matrix. Source readers, URL fetchers, caches/downloads and logs remain safe under real deployment configuration; localhost checks cannot substitute.
- [ ] **P14-AC15 — Remote service qualification:** controlled real mailbox recipients receive activation/password messages through the selected production email path, with failed delivery/retry tested safely. Selected remote private object storage enforces application/service permissions, authorized delivery, expiry/revocation and no-public-originals rules; workers execute on the chosen host. Local capture/object-storage results remain local evidence.
- [ ] **P14-AC16 — Production recovery target:** restore mutually consistent database records, original assets and necessary keys/configuration into a fresh isolated target. Compare the newest recoverable checkpoint with a recorded incident point and demonstrate at-most-one-hour saved-work loss for every claimed failure scope. Whole-device loss requires copies outside that device; broader failure-domain claims require corresponding independent copies/tests. Record missed backups, freshness monitoring and measured restore time; unchosen locations/scopes or unperformed restores stay NOT VERIFIED.
- [ ] **P14-AC17 — Qualification after environment changes:** record hosted model/prompt/tool/parser/retrieval/index/privacy settings against P13's qualified configuration. Rerun affected real integrations and independent P10/P11 evaluations when a change can affect reliability; retain all accepted precision/coverage/hard-error rules. A different model selected for cost or quota reasons cannot inherit another configuration's score.
- [ ] **P14-AC18 — Hosted capacity and cost:** agree and measure concurrent jobs, anonymous readers, document/library workload, latency, resource limits and quotas on the chosen hosting tier within the launch budget. Validate exhaustion/recovery and absence of unauthorized paid upgrades; roughly 25 registered writers is not evidence of 25 simultaneous jobs or hosted capacity. Free-tier measurements do not establish an untested paid tier, or vice versa.

## Verification evidence

| Method | Required record | Limit |
|---|---|---|
| Recovery rehearsal | Measured restore/rollback, including post-deployment write handling | A documented but unexecuted recovery plan is unverified |
| Hosted browser/security review | Exact host/origins/versions, TLS/session/CSRF, complete actor matrix and private/public delivery evidence | Local browser success does not qualify the hosted environment |
| Actual remote services | Controlled mailbox delivery/failure, remote object-store access/revocation and hosted worker execution | Chosen deployed services only; local substitutes remain separately labeled |
| Recovery/capacity qualification | DB/asset checkpoint reconciliation, independent-copy restore, measured loss/time, backup alerts and approved load/cost results | Only tested failure scopes, configuration and hosting limits |
| Affected quality requalification | Configuration comparison and required real P10/P11 reruns with independent human evaluation | No inherited accuracy from an untested model/pipeline |
| Production acceptance | Exact approval, operations performed, health/privacy checks and user disposition | No broad deletion or future deploy authorization |

## Failure, recovery and exit

Failed hosted/recovery/quality qualification, unauthorized cost or missing launch approval stops the launch. Preserve evidence, inspect differences and repeat the affected rehearsal. If an approved deployment fails, use the tested rollback and preserve new writes. Remaining local-only is an accepted scope boundary, not evidence that this future phase passed.

- [ ] Explicit launch authorization and all applicable hosted service/security/recovery/capacity/quality gates have actual evidence; deferred checks have not been relabeled passed.
- [ ] The user approves the concrete deployment; actual post-deployment checks and recovery availability are recorded.

There is no automatic cleanup/deletion phase. Further work starts from the accepted release and newly identified needs.

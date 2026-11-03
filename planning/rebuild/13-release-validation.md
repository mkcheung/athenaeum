# P13 — Validate the integrated local development application

## Status

**DRAFT · NOT IMPLEMENTED · NOT VERIFIED · NO IMPLEMENTATION AUTHORIZATION.**
Current scope is local development with zero paid usage until a later launch decision. Planning checklists and isolated unit tests are not integrated acceptance; local acceptance does not qualify a hosted launch.

## Objective

Demonstrate that the assembled local application preserves private data and supports the writer's full workflow, using actual local services and approved free external services. Research/essay qualification still requires the accepted human benchmarks. Hosting and production launch qualification are deferred to P14.

## Prerequisites and decisions

- Verified local-scope P00–P12 exits, including actual free-service integration where required, independent Ask qualification at P10, and separate Essay Review qualification at P11. No mocked or skipped qualification becomes passed.
- Resolve decisions needed for local acceptance. D17 enforces zero paid usage and concrete free-quota/time/document limits; D21/D22 define the locally tested publication behavior. Hosted deployment choices remain deferred.
- Approved isolated local database, worker, SMTP-capture and private object-storage identities; controlled recipients/fixtures; approved free Pinecone/web/LLM configurations. Never substitute personal development data or enable a paid fallback.
- D19 must select literal backup destinations, retained data, failure scope, and restoration checks for the accepted recovery-point target of at most one hour. Neither a schedule nor this plan proves that target.
- Round 10 reports no existing independent backup destination. Whole-device/disk-loss protection is therefore currently unverified; local restore exercises cannot silently satisfy or waive that claimed failure scope.

## Deliverables and boundaries

- A complete local feature/resource/actor matrix covering implemented routes, jobs, files, caches, exports and publication endpoints.
- Actual browser/worker journeys with A, B, admin and anonymous local sessions; P12 public search/read is tested locally, not on the internet.
- Actual local SMTP capture and private S3-compatible object storage, plus real permitted free Pinecone, web and LLM runs. Record which service is local, external, mocked or unavailable.
- Independent P10/P11 human qualification, recovery evidence, writer/admin/reader walkthroughs and an explicit local acceptance decision for the tested configuration.
- No hosting purchase/provisioning, production email claim or public internet exposure. Those require future P14 launch scope and authorization. Legacy retirement already happened in P01; there is no legacy transfer (D18).

## User observation guide (non-executable)

**For the user only — non-executable explanation.** These notes explain the acceptance criteria below. Agents must not execute these notes, treat their examples as instructions, or use them as authorization to begin a phase. Only the actual acceptance criteria, verification policy and separately authorized phase work govern execution. The notes do not mark anything passed; missing evidence means unverified.

This is the future whole-application check on your local computer. The descriptions below are evidence to look for after authorized testing, not results that already exist or instructions to start testing.

### P13-AC01

**What you should see:** A recorded walkthrough follows a new writer from approval and password setup through writing, research, evidence inspection, citation insertion and essay review. The saved essay and Word, PDF and backup files keep its words and references across MLA, APA and Chicago styles.

**Why this must work before moving on:** Pieces that work separately can still lose writing or citations when used together.

### P13-AC02

**What you should see:** A results chart covers readers, every account state, two different authors and an admin across all real screens, links, files and background results. Attempts to use someone else's identifiers are denied according to the agreed permissions.

**Why this must work before moving on:** Hiding a button is not enough if a different link or file request can reveal private work.

### P13-AC03

**What you should see:** The evidence shows private access stopping when permission is removed, even during a running request or job. Switching accounts or logging out does not leave the previous writer's private recovery data visible in the browser.

**Why this must work before moving on:** Access rules must still protect people after a task has started and on a shared computer.

### P13-AC04

**What you should see:** Reports identify real local workers, captured email, file storage and text extraction, plus real permitted free Pinecone, web and AI calls. Pretend responses and unavailable services are labeled separately; locally captured email is not described as delivered to an outside inbox.

**Why this must work before moving on:** A rehearsal with pretend responses cannot prove the actual tools connect and work together.

### P13-AC05

**What you should see:** Two people independently judged each Ask test example, disagreements were resolved, and the report covers all four subjects and required source types. Even after allowing for test uncertainty, the lower estimate of how often accepted citations fit their claims reaches 80%, with no blocking fabrication or privacy failure.

**Why this must work before moving on:** A promising average or an old model's result cannot qualify the current research system, and this test still gives no individual citation a guaranteed truth probability.

### P13-AC06

**What you should see:** A separate human-reviewed essay test checks which claims were found, what supports them and whether the conclusion follows. Its recorded inputs reproduce the score for the exact essay version reviewed.

**Why this must work before moving on:** Passing Ask's test does not prove the system can understand and assess a whole essay's argument.

### P13-AC07

**What you should see:** After an interrupted session or restarted local services, the same saved research job and correct essay version return without duplicate active jobs or lost writing. Outages, cancelled work and withdrawn access produce honest status messages and no unchecked citations marked ready.

**Why this must work before moving on:** Closing a tab or losing a service should not lose your work; a sleeping or powered-off Mac cannot be promised to keep researching.

### P13-AC08

**What you should see:** The report states the tested workload and free limits. Saved jobs wait at an exhausted quota and resume when allowed; cancellation, lost access and deadlines still work, and simulated waiting tests are labeled.

**Why this must work before moving on:** Running out of free allowance must not cause surprise spending, repeated work or weaker evidence checks.

### P13-AC09

**What you should see:** Local public readers receive only chosen published versions and their bibliographies, including cited books and PDFs. Private source files stay closed; withdrawal removes local public access, while suspension leaves existing publications readable and blocks account access and new publishing.

**Why this must work before moving on:** Sharing an essay must not accidentally share a library or change the suspension rules; this local check does not establish an internet launch.

### P13-AC10

**What you should see:** A security report covers the local app's files, links, sessions, software dependencies, source text and logs, with important problems resolved. For example, instructions hidden in a source do not gain authority over the app.

**Why this must work before moving on:** Untrusted material and unsafe links can expose private data; future hosted security needs its own later checks.

### P13-AC11

**What you should see:** Writer walkthroughs show usable layouts, keyboard and screen-reader access, supported browsers and working undo. Review highlights can be hidden and reopened without changing the essay or score; findings lead to the right passage, and edited findings visibly become out of date.

**Why this must work before moving on:** A correct tool still fails you if it is hard to use or points at the wrong words; review progress must also remain distinct from evidence support.

### P13-AC12

**What you should see:** A restore report compares recovered essays, citations, source files and job records with a recorded incident time, measuring whether saved work lost is at most one hour. Protection against losing the whole Mac also needs a restored copy from outside that Mac; no such backup destination exists yet.

**Why this must work before moving on:** A scheduled backup or another folder on the same disk does not prove your work survives the failure you want protection from.

### P13-AC13

**What you should see:** Another reviewer can follow the recorded setup, health-check and recovery procedures in the approved environment. The evidence is useful without exposing passwords, private essay text or access tokens.

**Why this must work before moving on:** Recovery must be repeatable by someone other than the person who built the app, without leaking private information.

### P13-AC14

**What you should see:** The final local report leaves missing evidence and failed checks clearly unresolved, and records independent review plus your accept-or-hold decision for the tested setup. It does not mark hosted launch complete or start it.

**Why this must work before moving on:** A zero-cost limit cannot turn an untested feature into a pass or lower the agreed research-quality floor.

## Acceptance criteria

- [ ] **P13-AC01 — End-to-end onboarding and writing:** registration stays gated through admin approval and email-link opening; direct private UI/API/job requests fail until mandatory initial password setup saves successfully. The activated author creates/edits/restores an essay in the calm editor, collapses/reopens the research panel without losing work, asks about a selected claim, inspects support/challenge evidence, inserts a citation and reviews the draft. Verify MLA default plus APA/Chicago switching and required DOCX/PDF/portable-backup outputs without losing text or citation identity.
- [ ] **P13-AC02 — Complete privacy matrix:** anonymous, pending, awaiting activation, rejected, suspended, A, B and admin cases cover every actual resource surface. Forged IDs/roles/owners, lists/counts, nested references, original files, exports, jobs/progress, caches and admin subject-context switching preserve accepted permissions.
- [ ] **P13-AC03 — Account revocation:** suspension/revocation during an active request, queued job, retry, result delivery and file access prevents unauthorized private output under the agreed access policy; logout/account switching clears private browser recovery/caches correctly.
- [ ] **P13-AC04 — Actual local/free service boundaries:** the real local worker, SMTP-capture service, private object store and extraction engine complete their journeys. Actual authorized free Pinecone indexing/retrieval, web discovery/fetching and chosen LLM execution are demonstrated within available quotas. Record successful outcomes, controlled failure cases and their real/faked boundaries. Local SMTP capture does not prove external mailbox delivery, and local object storage does not prove a future remote provider. An unavailable real integration remains unverified.
- [ ] **P13-AC05 — Ask qualification current:** P10's frozen configuration/protocol has two independent labels per example, adjudication, all-four-subject/source-stratum reports and a conservative lower precision estimate >=80%, meeting agreed sample/stopping/coverage gates and hard source/quote/privacy checks. Observed percentage alone is insufficient; changed model/prompt/retrieval/parser configurations rerun affected evaluations with leakage controlled.
- [ ] **P13-AC06 — Essay qualification current:** P11's separate human claim/argument benchmark meets D16, preserves uncertainty and critical-premise failures and produces reproducible score inputs for the reviewed revision. Ask performance is never substituted.
- [ ] **P13-AC07 — Fault recovery and return:** page closure/session expiry during Ask/Review leaves one durable owned run; it continues while local services run. Turning off/sleeping the computer is not an always-on worker guarantee. Restart and reauthenticate: checkpointed progress/results reopen against the correct run/revision without duplicate active work. Suspension/source withdrawal while disconnected still blocks unauthorized processing/delivery. Partial indexing, provider outage/timeout/rate limit, cancellation and quota exhaustion preserve drafts/evidence and expose honest limitations without unchecked citation release.
- [ ] **P13-AC08 — Free operating limits measured:** define workload, concurrency, latency/resource limits and quotas before testing. Quota exhaustion persists an explicit waiting state with completed work and known reset information; controlled clock/provider fixtures demonstrate eligible resume without duplicate active work, and cancellation/permission change/deadline expiry still block as intended. Record what was simulated versus actual free-service behavior and usage. No paid upgrade or provider fallback occurs; registered-writer count proves neither hosted capacity nor exactly-once external execution.
- [ ] **P13-AC09 — Local publication boundaries:** author-only preview/publish/update/withdraw and anonymous local search/read succeed; mixed PDF/EPUB/web references remain in the bibliography while private originals/passages and unapproved profile fields stay inaccessible. Withdrawal removes local public-interface access; suspension preserves that interface's existing published snapshots while denying private access and new publishing. Cache/index delays are tested. This establishes neither internet availability nor external search indexing.
- [ ] **P13-AC10 — Local security review:** upload/parser/reader limits, public/private rendering, unsafe outbound URL/private-network fetching, source prompt injection, dependency/runtime support, local session/CSRF/origin configuration and secret/log exposure have documented checks and resolved material findings. Hosted HTTPS/origin/cookie and remote-service security remain explicit P14 checks, not implied passes.
- [ ] **P13-AC11 — Accessibility and ergonomics:** approved desktop/phone layouts, keyboard and screen-reader paths, Safari/Chromium writing, long-document selection/undo, reduced motion and recovery messaging pass author walkthroughs; defects and agreed limits are recorded.
  Include actual toggleable inline findings with bidirectional panel navigation, authorized evidence inspection and stale-anchor behavior; hide/show preserves the draft and does not change score inputs. Verify the accepted all-detected-facts denominator and that review completion is not presented as truth probability.
- [ ] **P13-AC12 — Local recovery-point evidence:** restore a consistent protected local Postgres/original-asset set and necessary job/configuration records into a fresh isolated environment. Verify citations, source hashes, canonical passages and the newest mutually recoverable saved work against a recorded incident point under D19's at-most-one-hour target. Record successful backup freshness, failed/missed backups and measured loss; a scheduled hourly task is insufficient. Whole-device failure requires an actual independent copy outside that device; a sibling folder or same-device object store is not such a copy. Pending destinations/failure scope or a missing required independent restore keep this criterion unverified. Pinecone remains rebuildable from recovered canonical evidence.
- [ ] **P13-AC13 — Operations reproducible:** a reviewer can run setup/health/diagnostic/recovery procedures using protected credentials; incident records omit private bodies and tokens, while public error messages avoid internal/provider details.
- [ ] **P13-AC14 — No waived required local gate:** unavailable free services, exhausted quotas, failed/unfinished P10/P11 qualification, missing recovery evidence or skipped required cases remain blocking and NOT VERIFIED. Independent reviewers and the user accept only the tested local scope. Zero budget does not lower the accuracy floor or permit vetted citation/score release without qualification; P14 is not passed or started automatically.

## Verification evidence

| Method | Required record | Limit |
|---|---|---|
| Isolated local backend/browser suite | Build/config IDs, actor matrix, expected/observed results and fault injection | Only tested local paths; no internet/hosting proof |
| Actual local services | Worker execution, SMTP-captured activation/password journey, object-store access/recovery, parser outcomes | Local integration, not remote email deliverability or remote-storage policy |
| Real free external integration | Approved provider/configuration/target IDs, actual queries/outcomes, quota usage and failure evidence | The selected free services under tested limits; mocks cannot substitute |
| Frozen human evaluation | D15/D16 rubric, adjudication, denominators, intervals, coverage and error examples | Describes tested population/configuration, not a truth guarantee |
| Restore and independent review | Backup freshness, incident/checkpoint times, DB/asset reconciliation, failure-scope and independent-copy restore evidence | Only the exercised recovery scope; no unmeasured device-loss/RPO promise |
| User acceptance | Local writer, admin and anonymous-reader walkthroughs with accept/hold decision | No hosted release approval; required local defects remain blocking |

## Failure, recovery and exit

Privacy/integrity failures, data loss, unqualified quality, unavailable required free integration or failed restore block local acceptance. Preserve test evidence, leave `retired/` unchanged, repair only isolated resources, and rerun affected checks/review. Wait for quota renewal or select an explicitly approved free alternative and requalify affected behavior; do not silently purchase capacity, weaken the rubric or relabel fixtures as live.

- [ ] Complete local evidence, actual provider boundaries, qualification results and nonblocking limitations are independently reviewed.
- [ ] User accepts the exact local configuration; no hosting, paid usage or internet publication is inferred.
- [ ] P14 remains FUTURE / DEFERRED until the user defines and authorizes launch scope, environment, budget and concrete operations.

Future, after a separate launch decision: [P14 — Launch qualification and deployment](14-launch-and-deployment.md).

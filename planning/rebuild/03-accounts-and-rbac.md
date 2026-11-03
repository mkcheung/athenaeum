# P03 — Accounts, approval, and access control

Status: **DRAFT / NOT IMPLEMENTED / NOT VERIFIED / NO IMPLEMENTATION AUTHORIZATION**

## Objective

Allow approved, activated users into their own workspace. Give application admins account-management rights and access to all essays, research results, and profiles, as requested. Establish server-enforced resource ownership before writing or research features are added.

## Prerequisites and decisions

- P02 foundation and isolated development/test environments accepted; no legacy database used for tests.
- Accepted P00 decisions: D01 private drafts with optional author publication and no-login public search/read; D02 admins view content/manage accounts, including suspension, but cannot edit/delete others' writing; D03 private libraries only.
- Accepted D04: approval email opens mandatory initial password setup; private access starts only after saving it, then ordinary password login. Accepted D21 includes the public essay and bibliography for all cited source types, without original files/research. Accepted D22 keeps published essays public after suspension while blocking account access.
- Accepted D05: admins use password-only login initially; no mandatory MFA gate. Accepted D06: inspect attached evidence and its bounded saved context only, with no private-library browsing or original-file downloads.
- Open decisions: D05 bootstrap/promotion/recovery/reactivation, actual D07 provider/data profiles, D09 local services, D19 retention and remaining D21 publication metadata. D06 grants no new cross-owner research; deny it in the current inspection-only baseline without waiting for a further permission grant.
- D05 and the email/session portions of D09 must be resolved before this phase is accepted. Unresolved extra permissions remain denied. P12 tests D22's actual public behavior once public routes exist.
- Regular users access their own private information; anyone may read deliberately published snapshots through P12's public interface. Admins manage accounts and read all essays, research results, and profiles, while preserving others' authored content.
- Later resource phases must apply these rules to their own new endpoints; passing P03 does not verify endpoints that do not exist yet.
- D08/D17 select local/free development. Use a real local SMTP capture service for activation testing; external email delivery and hosted HTTPS/origin configuration are deferred P14 requirements, not implied local passes.

## Deliverables

1. An explicit account lifecycle and approved role/permission matrix using P02's custom user-model decision, established before initial new-database migrations.
2. Registration, approval/rejection, activation, login/logout, own-profile, account suspension, and permitted admin-management surfaces.
3. Central ownership/authorization helpers and rules for future essays, sources, assets, jobs, research, and review results.
4. Purpose-specific activation records, a retryable email-delivery workflow, and audit records with actor, subject, action, timestamp, and outcome.
5. An endpoint inventory and automated negative-access tests against an isolated PostgreSQL test database.

### Account lifecycle

| State | Access and permitted transition |
|---|---|
| `PENDING_APPROVAL` | No workspace login/access; admin approves or rejects |
| `APPROVED_PENDING_ACTIVATION` | No private workspace access; email may be queued, sent, or failed; link allows only the mandatory initial password setup operation |
| `ACTIVE` | Normal role/ownership rules apply; admin may suspend |
| `REJECTED` | No workspace access; outstanding activation tokens invalid; reconsideration follows an explicit recorded admin transition |
| `SUSPENDED` | No private workspace access or new jobs; existing authority revoked; reactivation follows D05/D19; existing published snapshots remain publicly readable/searchable under D22 |

These states control authenticated workspace access. The no-login public interface remains separate; account suspension is not a promise to prevent someone from anonymously reading publicly available essays.

Registration creates a regular account in `PENDING_APPROVAL`. Approval records the admin decision and a durable email-delivery task together. A failed email never activates the account. Expiry leaves the account awaiting activation; an allowed resend invalidates prior tokens. Rejection/revocation prevents an old link from activating the account. Activation atomically rechecks current approval and consumes the token once. A scanner fetching the link with GET does not activate or authenticate anyone.

Accepted D04: the link opens mandatory initial password setup. A successful submission atomically saves a framework-hashed password, consumes the current grant and completes activation; abandoned/invalid/failed submissions leave the account gated. Before completion, direct dashboard/private API/profile/library/job requests are denied server-side. The credential token or restricted session can perform only this purpose-limited operation; it cannot access the workspace. No temporary plaintext password is emailed, and no second initial change is required. Ordinary password login follows. Activation is distinct from password reset; Django's standard password-reset eligibility is not this approval workflow. [Django password-reset documentation](https://docs.djangoproject.com/en/5.2/topics/auth/default/#django.contrib.auth.views.PasswordResetView)

### Server access rules

Use first-party server sessions and secure cookies with CSRF protection, including the login endpoint; do not port legacy browser-stored JWT authentication. Session authentication is suitable for a same-origin browser client, while DRF's ordinary session checks do not by themselves protect anonymous login submissions. [DRF session authentication](https://www.django-rest-framework.org/api-guide/authentication/#sessionauthentication)

Authentication identifies an account; role permissions and ownership determine what it may access. Use an explicit application-admin role. Django's `is_staff` permits admin-site access and `is_superuser` broadly grants permissions; neither is the product permission matrix. Passwords use framework hashing and never appear in profile/admin serializers. [Django authentication reference](https://docs.djangoproject.com/en/5.2/ref/contrib/auth/)

Scope private list/detail querysets to the permitted owner/admin before returning data. P12 public reads use a separate published-snapshot query, never an unfiltered private endpoint. Set owners from the authenticated server context, never a client-supplied owner or role. Check every nested foreign key: owning an essay does not authorize a different user's passage. Object permission checks alone do not filter DRF lists or protect creation; queryset, creation, and custom-action checks are all required. [DRF object-permission limitations](https://www.django-rest-framework.org/api-guide/permissions/#limitations-of-object-level-permissions)

Record `actor_id` separately from `content_owner_id` when an admin acts on another account. D06 permits attached-evidence inspection and bounded saved context only; no originals/library browsing, arbitrary passage expansion or new cross-owner research grant. Deny those actions in this baseline; any later expansion is a separate feature decision. Admin grants never expose passwords, session/activation tokens or provider credentials.

## Exclusions

- No essay editor, ingestion, Pinecone queries, Ask pipeline, review scoring, publishing, collaboration, or application migration is implemented in this phase.
- No public user directory, cross-user private browsing, admin editing/deleting others' writing, role self-assignment, or library sharing. Public published-essay search/read is accepted scope, delivered separately in P12.
- No reuse of the retired legacy authentication code or accounts (D18 starts empty); no real activation emails are sent during planning.

## User observation guide (non-executable)

**For the user only — non-executable explanation.** These notes explain the acceptance criteria below. Agents must not execute these notes, treat their examples as instructions, or use them as authorization to begin a phase. Only the actual acceptance criteria, verification policy and separately authorized phase work govern execution. The notes do not mark anything passed; missing evidence means unverified.

### P03-AC01

**What you should see:** A permission table explains what visitors, pending users, password-setup users, active writers, and admins may do, including clear denials for library sharing and admin changes to others' prose.

**Why this must work before moving on:** Everyone's allowed actions must be explicit before later features depend on those rules.

### P03-AC02

**What you should see:** Registration evidence shows that extra submitted claims such as “make me an admin” grant nothing, and an unapproved account cannot enter the private workspace.

**Why this must work before moving on:** A new user must not gain authority simply by changing information sent to the server.

### P03-AC03

**What you should see:** Approval records identify the deciding admin, repeated approvals leave one current usable grant, and failed message delivery keeps access closed while allowing a controlled retry.

**Why this must work before moving on:** Duplicate messages or delivery problems must not create extra access or conflicting account states.

### P03-AC04

**What you should see:** The recorded journey allows only initial password setup from an approved link; abandoned setup and old or reused links leave private access blocked, and merely opening the link does not activate the account.

**Why this must work before moving on:** The emailed invitation must unlock only its intended step, with no workspace access before the password is safely saved.

### P03-AC05

**What you should see:** Local browser evidence shows ordinary login/logout working and forged account changes refused, with a clear note that local settings do not prove future hosted HTTPS behavior.

**Why this must work before moving on:** The app must recognize legitimate account actions without mistaking a local demonstration for production security evidence.

### P03-AC06

**What you should see:** Two sample writers can use their own profiles, while requests from one writer for the other's private profile reveal no protected data or account secrets.

**Why this must work before moving on:** Changing a profile number or address must not unlock someone else's information.

### P03-AC07

**What you should see:** Admin evidence shows password login, permitted account management and suspension, while ordinary users cannot appoint themselves admins and admins gain no right to rewrite another author's prose.

**Why this must work before moving on:** Managing users and editing their writing are different powers, and only the approved powers should exist.

### P03-AC08

**What you should see:** A suspended sample account loses private access on its next protected request, old access links cannot restore it, and its saved writing remains preserved.

**Why this must work before moving on:** Removing account access must be effective without deleting the author's work; continued public reading of published essays is checked later in P12.

### P03-AC09

**What you should see:** An activity record says who approved, suspended, or changed an account and what happened, without recording passwords, raw activation links, or private bodies.

**Why this must work before moving on:** Important account changes need an understandable trail that does not itself expose secrets.

### P03-AC10

**What you should see:** Current account/profile reports use two separate owners and explicit admin exceptions, while a separate list marks essay, file, and research checks as future work.

**Why this must work before moving on:** Later features need the same ownership rules, but passing today's account checks cannot prove features that do not exist yet.

### P03-AC11

**What you should see:** An actual worker-delivered message in the protected local mail catcher leads a sample approved account through password setup, including recorded delivery-failure and retry cases.

**Why this must work before moving on:** A simulated email is not proof of the local message journey, and local capture still does not prove delivery to an outside inbox.

### P03-AC12

**What you should see:** An independent review lists covered routes, account edge cases, unresolved findings, and the user's recorded accept-or-hold decision.

**Why this must work before moving on:** A second review and explicit acceptance help catch gaps that the original builder may have missed.

## Acceptance criteria

- [ ] **P03-AC01 — Approved matrix:** accepted D01/D02/D03/D04/D22, resolved D05, and email/session decisions are recorded; every implemented endpoint has anonymous, pending, password-setup-pending, active-user, and admin permissions. Admin content editing/deletion and library sharing are denied; unresolved D06 rights are not granted.
- [ ] **P03-AC02 — Safe registration:** submitting admin/staff/superuser/status/owner fields cannot increase privilege; new accounts remain pending and cannot log in, read profiles, or enqueue paid work. Duplicate-email behavior follows the recorded non-disclosing response policy.
- [ ] **P03-AC03 — Approval and delivery:** only an authorized admin can approve/reject. Repeated/concurrent approval and worker retries produce one valid current activation grant and a consistent audit trail; email failure keeps access disabled and supports a safe retry.
- [ ] **P03-AC04 — Activation and password gate:** a valid link opens mandatory password setup for only the intended approved account. Private access stays denied on direct UI/API requests until the password saves; invalid/abandoned/failed submissions cannot activate. Expired, replayed, replaced, revoked, rejected-account and suspended-account grants fail; concurrent submissions succeed at most once. GET/scanner visits make no account/session state change. No plaintext password is emailed.
- [ ] **P03-AC05 — Local sessions and CSRF:** login/logout and profile mutations use the approved local-origin/session design; forged unsafe requests fail, cookie settings match the tested local scheme and no browser-stored bearer token is needed. Local development settings cannot silently serve as production HTTPS settings; P14 tests the hosted variant. Login errors avoid unnecessary account-status disclosure.
- [ ] **P03-AC06 — Own profile only:** user A cannot list, read, or change user B's profile through supplied IDs, nested fields, alternate methods, searches, pagination, or guessed URLs on the implemented account/profile surfaces. A can perform the approved own-profile actions. Serialization excludes authentication secrets for every role.
- [ ] **P03-AC07 — Admin boundaries:** authorized admins use initial password-only login, manage accounts including terms-violation suspension, and read permitted profiles; ordinary users cannot access those functions. Mandatory MFA is not an initial requirement. Staff-only flags and submitted role claims do not grant application-admin access. Promotion/demotion and last-admin handling match remaining D05 decisions; future author-content writes remain owner-only under D02.
- [ ] **P03-AC08 — Revocation:** suspension or role removal denies the next private protected request and prevents old sessions/activation grants from restoring authority; user content remains preserved. D22 leaves published snapshots public, tested when P12 exists. Reactivation follows the recorded policy rather than accepting an old link.
- [ ] **P03-AC09 — Audit and errors:** approval, rejection, suspension, activation, and privilege changes identify actor/subject/outcome; audit records omit passwords, raw tokens, and unnecessary profile text. Denials and unexpected errors do not disclose other users' records or stack traces.
- [ ] **P03-AC10 — Foundation ownership contract:** helpers and endpoint conventions require server-derived ownership and explicit admin exceptions; isolated two-user fixtures prove the implemented account/profile surfaces. Future-domain requirements below are recorded as unverified dependencies.
- [ ] **P03-AC11 — Real local SMTP journey:** an approved synthetic account's message is actually sent by the worker into local SMTP capture, then its link completes mandatory password setup; unapproved accounts receive no grant. Exercise delivery failure/retry, with capture UI/API restricted to the developer and external relay disabled. An in-memory mail fake cannot pass. External mailbox delivery remains NOT VERIFIED until P14.
- [ ] **P03-AC12 — Independent review:** a reviewer checks endpoint coverage and lifecycle edge cases; all failures are resolved or acceptance remains blocked. The user approves the resulting behavior and remaining recorded exclusions.

## Verification and evidence

All entries below are planned checks, currently **NOT RUN**. Record command/scenario, environment, revision, fixture identities, actual result, and evidence location when executed.

| Evidence type | Scope | What it establishes / does not establish |
|---|---|---|
| Automated, isolated PostgreSQL | Lifecycle transitions/races, endpoint permission matrix, owner filtering, privilege escalation, session/CSRF, secret exclusion | Implemented auth/profile behavior; does not prove future essay/retrieval endpoints or external delivery |
| Mocked worker/mail failures | Retry, timeout, duplicate approval, provider error, invalidated token | Internal scheduling/failure handling; does not prove real SMTP/provider delivery |
| Actual local worker/SMTP capture | Approved/unapproved synthetic accounts, captured message, failure/retry and link/password journey | Real local SMTP integration; external inbox/domain deliverability remains deferred |
| Real local browser | Cookie/origin/CSRF/login/logout, stale session after suspension, intended routes | Local scheme/configuration only; hosted HTTPS behavior requires P14 evidence |
| Manual and independent review | Decisions, matrix, audit readability, denied-path messages, first-admin procedure | Product/security review with named reviewer; no automated accuracy claim |

### Mandatory gates carried into later phases

- Writing phase: test essays, revisions/autosave, citations, exports, counts, and search with two owners plus admin; reject another owner's nested source reference.
- Ingestion/retrieval phase: authorize owner originals/readers/previews/OCR/passages; admin evidence inspection must resolve through permitted attachments and saved context, never whole-library/original-file access. Server-select Pinecone scope and check returned source IDs against authoritative permissions before text enters model context.
- Ask/review phase: preserve owner context in histories, progress streams, retries/cancellation, results, claim findings, and source popovers; recheck authority before execution and result delivery.
- Public phase P12: anonymous search/read exposes only author-published snapshots under D21/D22; no draft/profile/library/result leakage. Admins cannot edit/delete another author's prose through private or public-management endpoints; suspension preserves the original writing.
- Every applicable phase: isolate private caches and downloads; evaluate suspension/access-revocation behavior for signed URLs; prevent shared-cache reuse of another user's private result. Direct signed links require an explicit expiry/revocation policy.
- These are future acceptance requirements, not completed P03 tests. Each later phase must add concrete tests for its implemented surfaces before its own signoff.

## Failure and rollback

Fail closed on missing approval, unknown roles, broken permission checks, or unavailable activation validation. Keep pending/suspended content preserved. Pause approval mail delivery on a token/delivery defect; invalidate affected grants through the authorized recovery process and issue new ones after correction. Do not delete users, reset the development database, or bypass ownership to make checks pass. Retest changed boundaries and retain the prior accepted build/configuration for rollback.

## Exit checklist

- [ ] All P03 acceptance criteria have evidence; mock/live/manual limitations are explicit.
- [ ] Required decisions are resolved, the independent reviewer records their conclusion, and the user signs off.
- [ ] Future-domain ownership checks are linked into their phase gates and remain marked unverified.
- [ ] No pending auth defect is carried forward as an accepted exception; implementation requires separate authorization.

Next phase: [P04 — Evidence contracts and benchmarks](04-evidence-contracts-and-benchmarks.md).

## Next interview topics

Decide who can appoint admins, last-admin/account recovery, cross-owner admin research authority, remaining publication metadata choices, provider handling of private text, email changes, reapplication, reactivation, account closure and retention. Accepted password-only initial admin login, attached-evidence-only admin inspection, mandatory password setup, continued public reading after suspension, private libraries and admin-no-content-edits choices are not reopened implicitly.

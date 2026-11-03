# P12 — Publish selected essays without exposing private work

## Status

**DRAFT · NOT IMPLEMENTED · NOT VERIFIED · NO IMPLEMENTATION AUTHORIZATION.**
The user requested optional publishing and a public reading/search interface. No essay is public by default.
Current scope is local/free development: anonymous browser sessions test that interface on localhost. No internet hosting, external search indexing or real public exposure occurs; hosted launch qualification is deferred to P14.

## Objective

Let an author deliberately publish a readable, searchable version of an essay while keeping drafts, research results, profiles and uploaded libraries private.

## Prerequisites and decisions

- P03–P11 have verified exits; publication consumes the established document, citation and review contracts.
- D01 accepted: private drafts with optional author-controlled publication and unauthenticated public search/read.
- D02 accepted: admins manage accounts and inspect content, but cannot edit/delete another author's writing.
- D03 accepted: uploaded libraries are private-only.
- D21 accepts essay plus bibliography including all actually cited ingested PDF/EPUB and other source types, with available public links; raw originals, extra private chunks and research remain private. Byline/indexing and any public review-report display still need decisions.
- D22 accepts keeping existing published essays readable/searchable after suspension; private workspace access and new owner actions are blocked. D05 defines account reinstatement.
- D19 must define withdrawal, revision history, cached copies and public snapshot retention.
- D16 must settle whether public pages show any review report; a draft's score is never automatically a public endorsement.

## Deliverables and boundaries

- Owner-only Publish / Update publication / Withdraw with an explicit public preview and a separate immutable published snapshot.
- Public landing/search/read interface indexed from eligible published snapshots, not from private essay tables or research runs.
- Publication metadata/bibliography allowlist; independent public serialization, rendering and authorization.
- Clear publication date/version and source/access limitations. Search-engine indexing is a separate D21 choice.
- No comments, ratings, visitor accounts, public profile directory or public research/library search without another decision.

## User observation guide (non-executable)

**For the user only — non-executable explanation.** These notes explain the acceptance criteria below. Agents must not execute these notes, treat their examples as instructions, or use them as authorization to begin a phase. Only the actual acceptance criteria, verification policy and separately authorized phase work govern execution. The notes do not mark anything passed; missing evidence means unverified.

All publication observations here refer to future, separately authorized local examples; no internet publication is performed by these notes.

### P12-AC01

**What you should see:** A recorded local guest view cannot find a newly created draft in reading pages, search results or counts.

**Why this must work before moving on:** Writing something new must not accidentally share it with other readers.

### P12-AC02

**What you should see:** The local permission record shows only the active author able to publish, update or withdraw that essay; admin inspection does not allow those changes.

**Why this must work before moving on:** Looking after accounts must not let an admin speak or publish on somebody else's behalf.

### P12-AC03

**What you should see:** The recorded publication preview matches the saved version shown to local readers; later private edits leave that published copy unchanged until an explicit update.

**Why this must work before moving on:** The author must control which version readers see.

### P12-AC04

**What you should see:** An anonymous local browser can search and read eligible published examples, while private and withdrawn titles stay out of results and totals.

**Why this must work before moving on:** Discovery should reveal shared writing without giving clues about private writing; this phase does not put anything on the internet.

### P12-AC05

**What you should see:** The local reader sees the essay, bibliography and available public links, while originals, private research notes, review highlights and account details remain unavailable.

**Why this must work before moving on:** Sharing an essay must not open the author's entire research desk or private bookshelf.

### P12-AC06

**What you should see:** A mixed-source example includes every cited book, course PDF, e-book and web source using its real details; unused research and extra private passages are absent.

**Why this must work before moving on:** The bibliography should credit what the essay actually uses without publishing the hidden research behind it.

### P12-AC07

**What you should see:** An unavailable private book still has an honest bibliographic reference or access-limited message; it does not offer a private reader or pretend a visitor checked the passage.

**Why this must work before moving on:** A citation can help identify a work without granting access to the author's own copy.

### P12-AC08

**What you should see:** A recorded withdrawal removes the example from local reading, search and stored previews, even while an older search update is still waiting.

**Why this must work before moving on:** The app must honor the author's withdrawal rather than keep serving an old public copy.

### P12-AC09

**What you should see:** A suspended example account loses private access and new writing actions, but guests can still read its already published local essays; withdrawn essays stay withdrawn after reinstatement.

**Why this must work before moving on:** Suspending an account must follow the agreed rule instead of silently deleting or republishing its writing.

### P12-AC10

**What you should see:** Recorded overlapping updates keep the newer accepted publication; suspension before a new publication finishes blocks that new action while earlier publications remain readable.

**Why this must work before moving on:** A slow or old request must not undo a newer decision or sneak past a changed account state.

### P12-AC11

**What you should see:** The local public-view evidence shows readable keyboard/mobile pages and harmless handling of dangerous essay or reference content, without private-file requests.

**Why this must work before moving on:** A shared reading page must be usable and must not expose the private app behind it.

### P12-AC12

**What you should see:** An author can share ordinary unverified prose without the page claiming AI certification; any separately approved review label identifies the exact assessed version and its limits.

**Why this must work before moving on:** Publishing is the author's choice, not proof that the essay is true or that every sentence passed review.

### P12-AC13

**What you should see:** The publication explanation says future internet readers may keep copies and outside search engines may retain material; it makes no promise to erase copies elsewhere.

**Why this must work before moving on:** The author needs to understand withdrawal's real limits before an eventual internet launch; local examples are not that launch.

## Acceptance criteria

- [ ] **P12-AC01 — Private default:** creating or editing an essay never publishes it; anonymous visitors and unrelated users cannot retrieve drafts through IDs, search, counts, previews, feeds, metadata or export endpoints.
- [ ] **P12-AC02 — Explicit author action:** only the active owner can publish/update/withdraw their essay; admin content-inspection powers and forged owner IDs cannot publish or rewrite it on their behalf.
- [ ] **P12-AC03 — Preview and snapshot:** publication shows exactly what becomes public, captures a specific saved revision, and records intentional confirmation. Later private edits leave that snapshot unchanged until explicit Update publication.
- [ ] **P12-AC04 — Public discovery:** anonymous visitors can search and read only currently eligible published snapshots, with safe titles/snippets and agreed byline metadata. Pagination/counts reveal no private or withdrawn items.
- [ ] **P12-AC05 — Library/review privacy:** public readers receive the essay, bibliography and available public links; originals, extra passages, private popovers, raw run IDs, review history/highlights, account details and signed downloads remain inaccessible. Private review decorations/findings are not serialized as public author text; any public review report requires the separate D21 decision.
- [ ] **P12-AC06 — Complete references and intentional quotations:** bibliography includes cited ingested PDFs/EPUBs/course guides alongside web/book/article sources using original metadata and genuine locators under the chosen style. Unused research is excluded. Quoted text intentionally included in the published prose is visible as prose; publication never silently appends its underlying private chunk or grants file access.
- [ ] **P12-AC07 — Source limits honest:** citation links open public websites or show an agreed bibliographic/access-limited state; unavailable private-source readers never leak data or claim that visitors independently verified the passage.
- [ ] **P12-AC08 — Withdrawal and search:** withdrawing a publication removes public app reading/search/snippets/cache access according to the recorded policy; a pending index update cannot serve a revoked snapshot because public delivery rechecks current eligibility.
- [ ] **P12-AC09 — Suspension:** login/private API/job access is revoked under P03, while already published essays stay publicly readable/searchable under D22. Test anonymous and signed-in public reading, in-flight search/read and reinstatement; withdrawn work stays withdrawn. No admin edit/delete is substituted for suspension.
- [ ] **P12-AC10 — Concurrent actions:** stale publish/update/withdraw requests and queued search indexing cannot replace a newer accepted snapshot or reactivate a withdrawn one. Suspend the author between initial authorization and publication commit/queued completion: the new owner action must fail against current account state, while earlier published snapshots remain public. Actor, revision, visibility generation and audit are retained.
- [ ] **P12-AC11 — Safe public rendering:** hostile essay markup, CSL metadata, links and embedded content cannot run scripts, make private-resource fetches or bypass the public field allowlist; keyboard/mobile reading and search meet the agreed accessibility review.
- [ ] **P12-AC12 — No false certification:** publication is not blocked or endorsed merely because an author has ordinary unverified text; any displayed review labels use the exact reviewed snapshot and qualified policy, explain limits and become stale on relevant change.
- [ ] **P12-AC13 — Honest withdrawal limits:** UI explains before publishing that readers can retain copies and external caches/search engines may persist content; do not promise deletion from third-party copies the app does not control.

## Verification evidence

| Method | Required record | Limit |
|---|---|---|
| Isolated API/database tests | Complete anonymous/A/B/admin/state matrix, snapshot/serializer tests and publish races | UI-hidden buttons alone cannot establish privacy |
| Real browser | Author preview/publish/edit/update/withdraw and anonymous search/read in separate sessions | Test-owned synthetic essays only |
| Storage/index/cache tests | Unauthorized original requests denied, delayed invalidation, stale public eligibility cases | Does not erase external copies |
| Independent review/UAT | Public/private field audit, accessibility and author walkthrough | No general certification of published claims |

## Failure, recovery and exit

Any draft/library/profile leak blocks publication rollout. Disable public delivery, preserve snapshots and source data, correct access/serialization/index policy and reproduce denied cases before re-enabling. Recovery never requires deleting the author's work.

- [ ] All publication/privacy criteria pass with actual evidence and all remaining D21 choices resolved; accepted D22 is enforced.
- [ ] Independent review and owner/public-reader walkthrough are accepted by the user.
- [ ] No existing private essay is silently published during rollout or import.

Next: [P13 — Release validation](13-release-validation.md).

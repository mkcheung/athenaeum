# Architecture interview

Updated November 3, 2026. **Rounds 1–12 recorded; consolidated local baseline v1 ACCEPTED; P00 design complete.** See [DECISIONS.md](DECISIONS.md). Later details are resolved at their named phase gates. Application implementation remains unauthorized.

## Working agreement

Explain choices in plain language, usually ask three related questions, record the answers, revise affected drafts and identify the next smallest decision. The user may ask questions or change direction before choosing. Silence does not approve a recommendation. Resolve required decisions before the affected phase, rather than implementing an assumption and asking afterward. Reorder later discussion groups when needed for the next gate, particularly early workspace/provider/runtime decisions for P01/P02.

## Round 1 — visibility and authority

1. D01: Are all essays private to owner/admin in the first release, or can authors deliberately publish selected work?
2. D02: Do admins view other users' content and manage accounts, or can they also edit/delete authored content?
3. D03: Are libraries private only, shared admin-curated only, or private plus shared?

Accepted answers: private drafts with optional author-controlled publication and no-login public search/read; admins inspect/manage/suspend but do not edit/delete others' writing; private libraries only. Exact answers and phase impacts are in the decision register.

## Round 2 — activation and publication boundaries (answered)

- D04: Does the approval email let the user set an initial password, confirm a password already chosen at signup, or serve as passwordless login? Recommend initial password setup through activation, then normal login.
- D21: Public essay+bibliography/public links only, or additionally author-selected evidence excerpts? Underlying uploaded libraries remain private in either case.
- D22: The question offered hiding publications versus preserving public reading during suspension. The user chose continued public reading; the earlier hiding recommendation is superseded.

Accepted answers: mandatory initial password setup through the activation link before any private access, clarified as one setup step; public essay plus bibliography including every actually cited PDF/EPUB/course/book/web source and available links, without original files/extra chunks; published essays stay publicly readable/searchable after account suspension. The earlier hiding recommendation is rejected. Remaining D21 byline/indexing/report subchoices remain open.

## Round 3 — administrative privacy and external processing (answered)

- D06 accepted: admins inspect attached evidence only; no whole-library browsing/downloads. Permissions bind to the authorized attachment/saved context, not arbitrary passage IDs. New research in another user's library is ungranted and denied in this baseline; a future request to expand that role is a separate decision.
- D07 accepted after explanation: selected outside AI services may process text needed for indexing, Ask and Essay Review. The user answered yes after the private bookshelf/external helper explanation. Choose actual providers, per-service inputs, index storage contents and retention/training settings later; do not reopen general cloud acceptance or start live processing during planning.
- D05 accepted: password-only admin login initially. Mandatory admin MFA is not part of initial acceptance; the previous recommendation is superseded.

Additional decisions before affected phases: D05 first admin, promotion/demotion, account recovery, reactivation, email change and rejection/reapplication; D12 numeric limits and mixed-page policy (no first-release OCR is now accepted); D19 account closure. Discuss in small follow-up groups rather than assuming answers.

## Round 4 — system structure and workload (answered)

- D23: One Django backend divided into accounts/essays/sources/research, with background workers, or separately deployed application/research services? Explain that the agent roles can be stages within one system. Recommend the modular backend initially; service separation adds deployment/coordination work.
- D24: If the writer closes the page, should Ask/Review continue until completion or explicit cancellation, or stop when they leave? Recommend durable jobs with returnable progress/results; navigation and cancellation are separate actions under that choice.
- D25: Is the initial audience personal/small invited group, growing writing community or larger service? Ask about registered writers separately from public readers. Translate the answer into concurrency/rate assumptions and measured D17/P13 targets later.

Accepted: one modular Django backend with worker processes; Ask/Review continues after closing the page until finished or explicitly cancelled; initial personal/invited audience of up to roughly 25 writers. Persist and resume the same owned run; do not infer simultaneous-job capacity or public-reader load from the writer count. Budgets, failure handling and account/source revocation still apply.

## Round 5 — writing experience (answered)

- D14: Calm editor with collapsible/resizable research side panel (recommended Quiet Study / Research Desk combination), permanent equal split, or focus-first research overlay? Confirm mobile/accessibility details afterward.
- D13 exports: Word/DOCX + PDF + portable backup (recommended), PDF + backup with Word later, or portable backup only initially? Export fidelity covers content/citations, not exact Word page layout.
- D13 styles: MLA default with APA/Chicago available per essay (recommended), MLA-only initially, or Chicago default with MLA/APA options? One document style formats each source type appropriately.

Accepted: calm writing canvas with collapsible/resizable Ask/Sources/Review panel; first-release DOCX, PDF and portable backup; MLA default with APA/Chicago available per essay. Follow-up before affected phases: D19 archive, restore, source replacement and retention; D13 exact CSL versions/Chicago variant and backup schema; D14 keyboard/mobile and final visual behavior. Preserve mixed-source citation identity when switching styles/exporting; no promise of exact Word pagination.

## Round 6 — verification and scoring (answered)

- D16 report: separate factual-support percentage and conclusion assessment (recommended), one overall rating with counts/warnings, or claim/conclusion findings without a percentage? Explain why supported background facts cannot conceal an unsupported central premise.
- D15 measurement: may independent human review of accepted claim/citation pairs measure the 80% floor, or should we first explain with a concrete example? This is population test performance, not a proven per-citation probability. Exact sample, uncertainty and coverage requirements remain a follow-up gate.
- D17 depth: thorough research by default with further investigation available (recommended), or a smaller initial search with Go deeper? Every mode keeps mandatory source/quote/support/counterevidence checks and needs its own applicable quality evidence; time/cost limits still need agreement.

Accepted: factual-support percentage separate from conclusion assessment; thorough research by default with further investigation available; after the concrete example, independent human review of system-accepted claim/citation pairs measures the 80% floor. Distinguish observed sample performance, live automated checks and unknown individual truth probability. The illustrative 100-result tally is not an approved sample size or an executed benchmark.

## Round 7 — detailed qualification rules (answered)

- D15 reviewer process: two independent people review each example (recommended), one main reviewer with a second auditing a subset/difficult cases, or estimate workload before choosing? Only explicitly authorized test material is available to reviewers; this does not grant production-library access.
- D15 subject coverage: science, politics, religion and philosophy initially (recommended), or qualify a smaller set first? Both include EPUB/course-PDF/web and contradictory/unanswerable/adversarial examples.
- D15 pass rule: require a conservative uncertainty-adjusted lower estimate to reach 80% (recommended), or use observed precision >=80% while reporting uncertainty? Explain that exactly 80/100 does not establish the stronger rule; larger samples alone do not make a result exactly at the floor pass a nonzero-margin interval.

Accepted: two independent reviewers for each example; science/politics/religion/philosophy coverage; conservative uncertainty-adjusted lower estimate must reach 80%. Follow-up before P04/P10/P11: actual reviewers, detailed sample/stratum sizes and interval method/confidence level, fixed sampling/stopping/adjudication rules, useful answer coverage, precise claim/argument verdicts and score formula, unfinished/normative writing, spending/latency/concurrency, bounded repairs and D20 release qualification. No sample count or confidence level has been chosen.

## Round 8 — rebuild, original-file storage and scans (answered)

- D08 (superseded in round 13 by an in-place rebuild): New sibling folder/separate repository (recommended) or a separate Git worktree sharing existing history? Preserve the current directory and all edits in either case. Choose exact paths during P01; no folder/repository is created now.
- D09: Private object storage for original EPUB/PDF files (recommended), provider selected later, or private application-server disk initially? Explain that external storage holds original files while product permissions remain owner/private and attached-evidence-only for admins. This is distinct from Pinecone's search index.
- D12: EPUB/selectable-text PDFs first with explicit scan detection (recommended), or include scanned-PDF OCR and extra original-image verification in the first release? OCR means reading letters from page images; no OCR engine or provider is selected by this question.

Accepted: new sibling folder/separate repository (superseded in round 13); private object storage with provider chosen later; EPUB/selectable-text PDFs initially, with scans detected and unsupported. Preserve incomplete extraction without calling it complete or indexing it automatically. Follow-up: exact workspace/hosting, storage/queue/email providers, runtime/package choices, Pinecone configuration, file/page/size limits and any explicitly approved mixed-page policy. No folder/repository/provider resource is created.

## Round 9 — hosting, operating budget and recovery (answered)

- D08: managed hosting for app/workers/database (recommended), a controlled server/VPS, or compare hosting options first? This chooses an operations direction, not a provider or deployment.
- D17: what monthly running-cost target/range should guide the pilot, including hosting, AI/search, Pinecone and private storage? Free-text answer; the user may request light/moderate/heavy usage estimates before choosing. No unmeasured workload price or spending authority is inferred.
- D19: aim to lose at most roughly one hour of saved changes after a serious failure (recommended), accept up to roughly one day initially, or explain recovery before choosing? This is a recovery-point target, distinct from autosave or time to restore; services and restore tests must substantiate it.

Accepted correction: local development only, hosting deferred; stay within local/zero-cost services and free tiers until release; target no more than roughly one hour of saved changes lost after a serious failure. Do not keep asking for hosting selection or a paid monthly budget during the local stage. Verify free provider limits/privacy and actual integrations without promising unlimited use or lowering the quality floor. A backup schedule is not restore evidence.

## Round 10 — free quotas, independent backups and private AI data (answered)

- D17: pause/resume research when free quota resets (recommended), or stop with an explanation and manual retry? Neither permits paid upgrade or weaker checks; limits/cancellation still apply.
- D19: is an external drive, NAS or another existing no-extra-cost independent backup destination available? Free text. No copy/configuration now. Same-Mac copies cannot establish whole-device/disk-loss recovery.
- D07: exclude training reuse of private passages/drafts (recommended), allow reuse for free access, or explain the tradeoff? Free service terms differ; general cloud-processing consent is not assumed training consent. Retention and other access remain separate provider checks.

Accepted: pause/resume on free-quota reset under existing limits/cancellation/permissions; no independent backup destination is available; after the explanation, allow training/product-improvement reuse where applicable terms permit. The earlier no-training recommendation was not chosen. Preserve provider input restrictions, retention/access review, accurate future-user disclosure and the zero-paid constraint. Device/disk-loss recovery remains unverified; no backup service is bought/configured.

## Round 11 — essay-score denominator and finding navigation (answered)

- D16: for 10 distinct factual claims with 6 supported, 2 contradicted and 2 not reviewed, report 60% supported out of all 10 (recommended), or 75% supported out of the 8 reviewed? Both show 8/10 review coverage and provisional status; unchecked is not false, opinions/values are outside this factual count and the conclusion assessment remains separate. Exact category/denominator rules are recorded after the answer, not inferred now.
- D26: toggleable inline highlights linked to Review-panel findings/evidence (recommended), or panel-only findings with click-to-passage navigation? Both preserve the draft, source inspection and revision-bound anchors.

Accepted: fully supported / all detected distinct factual claims, including pending/unresolved/skipped; review completion shown separately and provisional when unfinished; conclusion assessed separately. Six supported + two contradicted + two unreviewed means 60% supported, 8/10 reviewed. Unreviewed is not false. Accepted D26 adds toggleable bidirectional inline highlights and Review-panel navigation, with private revision-bound findings.

## Round 12 — editor foundation and claim labels (answered)

- D10: use Tiptap's free open-source core (recommended) with our own citation nodes, review decorations, Django research/revisions/exports, or compare free editor options first? No paid platform/AI/history/conversion or trial features; exact versions/compatibility still P02.
- D16 wording: evidence labels Supported / Partly supported / Disputed / Contradicted / Insufficient evidence / Cannot assess (recommended), or familiar fact-check labels True / Mostly true / Mixed / Mostly false / False / Unverified? Either needs the same sources, reasoning, uncertainty and agreed rubric; absent evidence is not false and opinions/values are not empirically true/false-scored.

Accepted: Tiptap's free open-source core, plus evidence-based individual-claim labels. Paid Tiptap dependencies are outside the zero-cost profile. Separate final claim verdicts from workflow/stale states and preserve all source/quote/context checks. Exact versions, rubric thresholds and coverage rules remain future phase requirements.

## Consolidated design review

The consolidated review question was asked November 3. The user answered **“Accept the local architecture design baseline (Recommended).”** [Baseline v1](ARCHITECTURE_BASELINE.md) and P00's design-only evidence/sign-off are complete. No application implementation, package installation, repository creation, paid service or deployment is authorized, and no runtime/accuracy gate passed. Remaining phase-specific choices retain their required-before gates; P01 is next planned and not started.

Local model availability/hardware suitability, actual free-service accounts, sample/usage limits, backup path/failure scope, retention and restore time remain required before their phase gates.

## Round 13 — workspace and legacy data (post-acceptance amendment, November 3)

The user questioned the sibling-repository path and redirected the plan. Asked: (1) PostgreSQL vs. reusing the MySQL engine, (2) dump before dropping, (3) legacy import ever. Accepted: build in this repository with legacy files in `retired/` (revised D08); keep PostgreSQL and drop the legacy MySQL database with no dump (D27); start empty (D18). The user still has no backup location and prefers to defer it (D19 unchanged). Follow-up answered the same day: new `rebuild` branch, planning files committed, and the MySQL database itself dropped (not just emptied). The two uncommitted legacy edits were discarded outside the planning work at 10:43 on November 3; both files now match commit `d497937`, so nothing remains to carry unless they are restored. Second follow-up: the legacy database is confirmed native (not Docker). The user chose to drop only `journeyman`, to run all backing services in one Docker Compose project (D28), and to create it in P02.

## Later rounds — local operations and launch

- D09/D10/D11: local service compatibility, free-provider/privacy preflights, embedding/index configuration and measured resource/quota limits. Hosting/provider-paid tiers stay deferred until a later release request.
- D18: resolved in round 13: start empty, no legacy import.
- P14 (launch time only): whether content written in the local app carries into a hosted launch.

Publication follow-up before P12: D21 byline identity, external search-engine indexing, withdrawal limits, and whether any review findings are public under D16. Public search/read does not assume comments or ratings.

## After each round

- [ ] Record exact answers and rationale with decision IDs.
- [ ] Update the affected architecture, phase criteria and unresolved items.
- [ ] Check that changes do not grant unintended cross-user access or weaken verification.
- [ ] Tell the user what is settled and why it changes the design; ask the next focused decision group while design work remains, rather than stopping at an acknowledgement.
- [ ] Keep implementation NOT AUTHORIZED until the user explicitly requests it for the agreed phase.

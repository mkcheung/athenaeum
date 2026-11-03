# P06 — Structured citations and portable essays

## Status

**DRAFT · NOT IMPLEMENTED · NOT VERIFIED · NO IMPLEMENTATION AUTHORIZATION.**
This file specifies future work. No citation engine, export integration, or verified Ask capability is established.

## Objective

Allow a writer to inspect a known source, insert a durable citation or quotation, and export the essay with its references.
Use manual sources and controlled evidence fixtures to prove the citation chain before Ask is connected.
Formatting a citation must never imply that the source or associated claim has been verified.

## Prerequisites and decisions

- P04 source/version/passage/citation-occurrence and permission contracts have verified exit evidence.
- P05 structured editor, revisions, save recovery, selection behavior, and ownership have verified exit evidence.
- P03 authorization rules apply to every source, nested reference, original asset, and export introduced here.
- D01 is accepted: private drafts plus author-controlled publishing and public no-login search/read. This phase's preview/export stays private; public delivery belongs to P12.
- D02 is accepted: admins view content/manage accounts and may suspend users, but cannot edit/delete another user's writings.
- D03 is accepted: libraries are private-only; shared-library or cross-user discovery is excluded.
- D06 permits attached-evidence inspection with bounded saved context, but no originals/library browsing/downloads or new cross-owner research. These ungranted actions are denied in this baseline.
- D10 must validate the exact editor, CSL processor, rendering runtime, and dependency compatibility.
- D13 accepts first-release DOCX, PDF and portable backup; MLA default with APA/Chicago available per essay; bibliography includes every actually cited source type. Select exact CSL versions/Chicago variant, formatting processor, backup schema and detailed fidelity expectations before implementation.
- D19 must settle retention of source versions, citation snapshots, exports, and deleted/replaced originals.
- Use one selected citation style per essay; that style handles books, articles, course guides, and web pages.

## Deliverables and exclusions

- Manual source metadata entry/confirmation using CSL-JSON, with honest incomplete fields and typed locators.
- Inline citation and quote nodes with stable occurrence IDs linked to permitted source/version/passage records.
- An evidence inspector showing original passage/context, attribution, source details, locator, and check states.
- A relational citation index derived transactionally from the authoritative editor document.
- One agreed formatting engine/configuration for private preview and all required exports, including bibliography generation and per-essay MLA/APA/Chicago switching.
- Explicit copy modes and structured insertion; DOCX, PDF and a versioned portable backup preserving structured document/citation records. Markdown/CSL-JSON/HTML may be components of the backup/rendering design, not replacements for the required Word/PDF outputs.
- Ordinary author-entered references may remain unverified, clearly labeled. They cannot acquire vetted Ask status.
- Exclude live research, agent vetting, automated support judgments, essay scoring, publishing, and reference-manager sync.
- P10 evaluation and verification gates must pass before any result is labeled or inserted as a vetted Ask result.
- Exclude exact Word pagination, tracked changes, collaborative editing, Word reference-manager fields and DOCX import/round-trip editing. DOCX export with text/citation/bibliography fidelity is required; portable-backup restore behavior must be specified separately under D13/D19.

## User observation guide (non-executable)

**For the user only — non-executable explanation.** These notes explain the acceptance criteria below. Agents must not execute these notes, treat their examples as instructions, or use them as authorization to begin a phase. Only the actual acceptance criteria, verification policy and separately authorized phase work govern execution. The notes do not mark anything passed; missing evidence means unverified.

### P06-AC01

**What you should see:** A manual book example keeps its known author and edition while leaving a missing date clearly unknown.

**Why this must work before moving on:** A neatly formatted reference must not fill gaps with invented facts.

### P06-AC02

**What you should see:** An example can show file page 12 and printed page 4 separately; an e-book chapter or Kindle location keeps its real kind of reference.

**Why this must work before moving on:** Readers need an honest way to find the passage, rather than a made-up page.

### P06-AC03

**What you should see:** A citation appears where the writer chose and still points to the same work, edition and passage after reopening.

**Why this must work before moving on:** A reference must stay connected to the evidence it was meant to identify.

### P06-AC04

**What you should see:** A quotation matches the captured source words, while an explanation or paraphrase is clearly presented as different wording.

**Why this must work before moving on:** Words written by the helper or the author must not be passed off as somebody else's exact quotation.

### P06-AC05

**What you should see:** A shortened or bracketed quotation keeps its original available and shows that the displayed version was deliberately changed.

**Why this must work before moving on:** Readers need to tell an exact quotation from an edited one.

### P06-AC06

**What you should see:** The citation view reveals its source, edition, real location, available surrounding passage and separate check limits, then returns focus to the citation.

**Why this must work before moving on:** You should be able to inspect why a reference belongs there without losing your writing position.

### P06-AC07

**What you should see:** The copy choices clearly distinguish quotation plus citation, paraphrase plus citation and a bibliography entry; plain pasted text makes no checked or automatic-link promise.

**Why this must work before moving on:** Copying words is different from inserting a connected reference that the app can keep track of.

### P06-AC08

**What you should see:** The recorded save-failure example leaves the essay and its reference list on the same saved version; rebuilding the list produces references matching that essay.

**Why this must work before moving on:** The writing and the app's reference list must not disagree about what was cited.

### P06-AC09

**What you should see:** Reordering or undoing citations keeps the right note numbers and bibliography; cited books, PDFs and e-books appear, unused research stays out, and no chunk number is called a book.

**Why this must work before moving on:** The bibliography should describe the sources actually used, even after the essay changes.

### P06-AC10

**What you should see:** The same mixed-source example can switch from MLA to APA or the agreed Chicago style without changing the quotation, source identity or actual check status.

**Why this must work before moving on:** Changing the clothes of a citation must not change its evidence or make it more verified.

### P06-AC11

**What you should see:** The private preview and exported versions show equivalent citations, note numbering and references from the same saved essay, even if page layouts differ.

**Why this must work before moving on:** What you download must still mean what you saw in the editor.

### P06-AC12

**What you should see:** The recorded Word/PDF examples retain the text and references, and a separate backup-copy check rebuilds the connected essay records without granting new access or fresh checked status.

**Why this must work before moving on:** Portable writing needs its source relationships, while copying a backup must not invent permissions or validation.

### P06-AC13

**What you should see:** A corrected edition or replacement source is identified as a change; earlier citation evidence stays identifiable and affected current checks become out of date.

**Why this must work before moving on:** Fixing a source today must not quietly rewrite what an earlier essay actually used.

### P06-AC14

**What you should see:** Manual and old references keep an unresolved or unverified label even when their punctuation looks perfect.

**Why this must work before moving on:** Citation formatting and practice examples do not establish that a claim is supported or that the Ask accuracy gate passed.

### P06-AC15

**What you should see:** The permission record shows Bob unable to inspect, insert or export Alice's private source through altered reference details.

**Why this must work before moving on:** Owning an essay must not give someone access to another person's bookshelf.

### P06-AC16

**What you should see:** An admin can inspect an attached passage and its saved surrounding text, but the recorded boundaries deny whole-book access, neighboring passages and changes to another writer's essay.

**Why this must work before moving on:** The agreed evidence window must not turn into a doorway through someone's whole private library.

### P06-AC17

**What you should see:** Private file and export-delivery records show that unapproved accounts cannot obtain originals, finished downloads or stored previews, including through old delivery links.

**Why this must work before moving on:** A protected writing page is not private if its downloadable copies are left open.

### P06-AC18

**What you should see:** A missing or unavailable reference stays visibly unresolved instead of being replaced with a plausible-looking different source or quotation.

**Why this must work before moving on:** An honest gap is safer than evidence the app guessed into existence.

### P06-AC19

**What you should see:** The safe-output report shows harmful source titles, links or passage content remaining harmless or being rejected in the page and exports.

**Why this must work before moving on:** A source's words should be evidence, not instructions that can take over a document or app.

### P06-AC20

**What you should see:** The writer's chosen insertion is undoable, keeps nearby prose intact and returns to the expected typing position; recorded keyboard/mobile controls remain usable.

**Why this must work before moving on:** Research should help the writer make a deliberate change rather than take control of the essay.

### P06-AC21

**What you should see:** Recorded views of actual multi-page Word and PDF outputs show all three styles with readable prose, quotations, notes where applicable and a complete bibliography, without clipping.

**Why this must work before moving on:** A file downloading successfully does not show that its pages are complete or readable.

## Acceptance criteria

- [ ] **P06-AC01 — Source identity:** a writer can create/edit a permitted manual source with source type, creators, edition/translation, identifiers, and available dates; absent fields remain absent/unknown rather than being invented.
- [ ] **P06-AC02 — Locator honesty:** PDF physical page and printed label remain distinguishable; EPUB chapter/section locators and manually entered Kindle locations never become invented printed pages.
- [ ] **P06-AC03 — Inline citation:** Insert citation creates one stable occurrence pointing to the selected source/version and chosen locator at the preserved editor position; save/reload retains that identity and reference.
- [ ] **P06-AC04 — Quotation:** Insert quote uses captured passage text with its attribution and citation; an AI explanation or writer paraphrase cannot silently become a verbatim quotation.
- [ ] **P06-AC05 — Deliberate alterations:** editing quoted text or applying ellipses/brackets preserves the original and records the displayed alteration; the result is never presented as an unchanged exact match without the applicable checks.
- [ ] **P06-AC06 — Inspection:** activating a citation reveals the exact linked source version, locator, passage/context when available, access limits, and separate manual/check states; closing returns focus to the citation.
- [ ] **P06-AC07 — Copy versus insert:** copy quote + citation, paraphrase + citation, and bibliography entry produce distinct labeled content; plain copied text does not claim durable source linkage, automatic bibliography inclusion, or vetted status.
- [ ] **P06-AC08 — Transactional index:** saving the editor document atomically updates its citation index; a failed transaction leaves both unchanged, and index repair/rebuild derives the same occurrences from the saved document.
- [ ] **P06-AC09 — Editing lifecycle and complete references:** citation reorder, duplicate, delete, undo/redo, and paste maintain valid unique occurrence identities; bibliography inclusion/order and footnote numbering update under the selected style without orphaned references. Every actually cited ingested PDF/EPUB/course guide or other source appears; unused research is excluded, and vector chunk IDs are not presented as bibliographic sources.
- [ ] **P06-AC10 — Style context and switching:** MLA is the default; an author can select APA or the agreed Chicago variant for an essay. Each handles a mixed book/course-guide/EPUB/PDF/article/web fixture, repeated citations, author disambiguation, missing metadata and locator changes. Switching styles preserves source/span/locator identity, quote text and actual check status.
- [ ] **P06-AC11 — Shared rendering:** private preview and each selected export use the same saved document, source metadata snapshots, style version, and formatting rules; repeated rendering produces equivalent citation meaning and numbering.
- [ ] **P06-AC12 — Export completeness:** DOCX, PDF and portable backup are each exercised on the same mixed-source essay in the selected style. Word/PDF preserve text, citation meaning/numbering, bibliography, Unicode and genuine locators. The versioned backup preserves validated structured essay/citation/source records and can reconstruct them in an isolated format round-trip check without relying on PDF/DOCX text extraction. Exported/imported record IDs or user-supplied check states cannot grant foreign-owner access or fresh verification. Original private files/research history stay excluded unless explicitly selected under D19.
- [ ] **P06-AC13 — Version changes:** correcting source metadata or replacing a source file cannot silently rewrite historical citation evidence; affected current uses disclose the change and invalidate incompatible review/check states.
- [ ] **P06-AC14 — Unverified references:** manual references display their actual unresolved status; fixture success or correct CSL output cannot produce a vetted Ask badge, semantic-support verdict, or an 80% accuracy claim.
- [ ] **P06-AC15 — Cross-owner protection:** user B cannot read, insert, copy, export, or inspect A's sources/passages by substituting IDs, editing document JSON, or requesting nested references/downloads; checks apply before rendering or job context assembly.
- [ ] **P06-AC16 — Admin boundary:** an authorized admin can inspect attached essay/research evidence and its saved bounded context with audit records. Substituting a passage ID, expanding neighboring chunks, listing sources or fetching original EPUB/PDF files cannot escape that attachment grant. Admins cannot browse/download whole private libraries, edit/delete another user's writings or perform ungranted source modifications.
- [ ] **P06-AC17 — Storage and delivery:** anonymous/other-user requests cannot obtain private originals, generated export jobs, completed downloads, or cached previews; expiring delivery mechanisms follow the approved access/retention design.
- [ ] **P06-AC18 — Invalid evidence:** unknown/deleted/inaccessible source or passage IDs produce a visible unresolved reference and block false verified output; they never resolve to a different source or guessed quotation.
- [ ] **P06-AC19 — Rendering safety:** hostile source titles, metadata, links, and passage text cannot execute scripts or escape supported export structures; quoted meaning is not silently changed by sanitization.
- [ ] **P06-AC20 — Writer control:** insertion is explicit and undoable, returns the caret predictably, and does not replace surrounding prose; source/style actions remain keyboard-operable and accessible at agreed mobile widths.
- [ ] **P06-AC21 — Export rendering across styles:** exercise DOCX and PDF for MLA, APA and the agreed Chicago variant. Inspect actual rendered multi-page fixtures for missing/clipped prose, quote alterations, wrapping, applicable notes and bibliography. Downloads and extracted-text checks alone cannot pass this case; discrepancies are recorded and resolved.

## Verification and required evidence

| Layer | Required evidence | What it establishes |
|---|---|---|
| Manual/design | D10/D13 choices, metadata/locator examples, version/retention policy, inspected reference outputs | Agreed behavior and independently checked formatting expectations |
| Unit/fixture | Mixed-source CSL cases, exact text spans, node identity, escaping, index derivation, copy modes | Deterministic handling of controlled inputs; no source-truth guarantee |
| Isolated integration | Real application + isolated Postgres + chosen CSL runtime: atomic save/index, denied nested references, private export jobs | Persistence, rendering integration, and tested authorization boundaries |
| Browser | Select/inspect/insert/undo/save/reload/style/export flow; malformed document IDs; keyboard/mobile checks | Actual editor interactions and delivery behavior |
| Independent manual review | Compare citations/quotes against originals/style examples; inspect rendered DOCX/PDF in all three styles for text, wrapping, applicable notes and bibliography | Source fidelity, style and visible output evidence; successful download/text extraction alone is insufficient |
| External research services | Not needed here; any metadata lookup is separately identified and its failures preserved | No proof of live Ask, semantic verification, or provider accuracy |

Use separately owned synthetic users and representative Unicode/multi-source fixtures in isolated resources.
Record document/source/style versions, exact expected output, observed differences, test commands/build, and evidence paths.
An export download alone does not prove citation correctness, source access control, or completeness.

## Failure, repair, and rollback

- Cross-user reference leakage, changed quotation meaning, silent source remapping, or mismatched document/index blocks exit.
- Preserve the last valid document and source snapshots; quarantine malformed imports/documents for explicit correction.
- Failed formatting/export leaves the draft editable and reports an actionable error; do not invent fallback metadata.
- Rebuild derived citation indexes from valid document JSON; retain recoverable before/after records for migrations.
- Leave `retired/` and historical planning material unchanged; no public cutover or deletion is authorized here.

## Exit record

- [ ] Every applicable criterion has reproducible evidence, including denied cross-owner rendering/export/storage cases.
- [ ] An independent reviewer reproduces quotation fidelity, citation round-trips, index atomicity, and authorization cases.
- [ ] D13 style/export expectations and any remaining fidelity limits are approved by the user.
- [ ] User accepts the inspect/copy/insert/export workflow; decision/evidence links and explicit phase sign-off are recorded.
- [ ] No fixture/manual citation has been promoted to vetted Ask status; P10 remains a separate mandatory gate.
- [ ] Status changes only after implementation evidence and review exist; this document grants no implementation authorization.

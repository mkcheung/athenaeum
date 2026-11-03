# P07 — Private document ingestion and original-source navigation

Status: **DRAFT · NOT IMPLEMENTED · NOT VERIFIED · NO APPLICATION IMPLEMENTATION AUTHORIZATION**

## Objective

Turn an uploaded EPUB or PDF into a private, versioned source with inspectable passages and honest locators. Preserve the original file and distinguish extraction quality, retrieval readiness, and citation readiness.

## Prerequisites and decisions

- Complete and verify [P04: evidence contracts and benchmarks](04-evidence-contracts-and-benchmarks.md) and [P06: citations and portability](06-citations-and-portability.md), including independent review and user signoff.
- D03 is accepted: libraries are private only. D06 allows admin inspection of attached evidence only and denies whole-library/original-file access. Resolve D07 provider privacy, D09 storage/queue, D10 runtime/parser compatibility, D12 supported formats/limits, D17 budgets, and D19 retention in [DECISIONS.md](DECISIONS.md).
- Apply [ARCHITECTURE.md](ARCHITECTURE.md) and [VALIDATION_POLICY.md](VALIDATION_POLICY.md). D02 permits admin viewing/account management/suspension, not editing or deleting author content; new cross-owner research authority remains undecided/denied under D06.
- Accepted D01/D21 permit owner publication of an essay and bibliography using all cited source types. That does not publish original books/PDFs, extra chunks, or research history. D22 keeps published snapshots readable after account suspension.
- D12 accepts EPUBs/selectable-text PDFs and excludes OCR ingestion from the first release. Detect scans and report them unsupported. Exact numeric limits and mixed-page/partial-index policy remain to be agreed; incomplete sources default to needs-attention and are not automatically indexed.

## Deliverables and exclusions

- Private original assets; upload, extraction, metadata-review, indexing-handoff, failed, cancelled, and needs-attention states.
- Immutable source versions containing file hash, extraction configuration/version, raw text, normalized search text, and reversible span mappings.
- Edition/translation metadata, EPUB chapter/internal anchors, PDF file-page and printed-label mappings, surrounding context, original-source readers and per-page/section extraction-coverage manifests.
- Idempotent imports and recoverable generation replacement; no automatic erasure of existing sources.
- Docling is a candidate: its documentation lists PDF and EPUB, while its document model supplies page/bounding-box/character-span provenance. These capabilities require representative-file validation; they do not establish correct printed-page labels. [Supported formats](https://docling-project.github.io/docling/usage/supported_formats/), [document model](https://docling-project.github.io/docling/reference/docling_document/).
- No first-release OCR backend; parser configuration must not silently enable it on detected scan pages. No embedding uploads, provider calls, OCR installation or ingestion occur while this file is a plan. Pinecone integration belongs to P08.

## User observation guide (non-executable)

**For the user only — non-executable explanation.** These notes explain the acceptance criteria below. Agents must not execute these notes, treat their examples as instructions, or use them as authorization to begin a phase. Only the actual acceptance criteria, verification policy and separately authorized phase work govern execution. The notes do not mark anything passed; missing evidence means unverified.

### P07-AC01

**What you should see:** The recorded account examples show each writer's own files. Admins see only attached evidence, without opening whole books or changing the writer's work.

**Why this must work before moving on:** Uploading a book must not hand someone else the keys to your library.

### P07-AC02

**What you should see:** The upload report explains rejected files and limits. Scanned pages are marked unsupported, and the report shows no picture-to-text reading was started.

**Why this must work before moving on:** An unreadable or unsafe file must not sneak through as a successfully read book.

### P07-AC03

**What you should see:** The evidence keeps the original file, its owner and edition details, and a separate cleaned copy used for searching.

**Why this must work before moving on:** Cleaning text for search must not change the words you later quote.

### P07-AC04

**What you should see:** Recorded PDF examples open the right sheet and distinguish the page printed on it from its position in the file. Missing page labels stay unknown.

**Why this must work before moving on:** A reader must be able to find the exact place behind a quotation.

### P07-AC05

**What you should see:** The saved e-book example returns to the correct book copy and chapter after reopening. It shows no made-up printed page.

**Why this must work before moving on:** A useful e-book citation must lead somewhere real even when the book has no fixed pages.

### P07-AC06

**What you should see:** The source details show confirmed information and visible gaps. A course teacher's explanation names that teacher rather than pretending the philosopher said it.

**Why this must work before moving on:** A real passage can still mislead if it names the wrong speaker, edition or date.

### P07-AC07

**What you should see:** The page report identifies read text, blank pages and important missing text, including scanned middle pages. An incomplete book waits for attention instead of entering research.

**Why this must work before moving on:** Finding a few readable words must not make the program pretend it read the entire book.

### P07-AC08

**What you should see:** The saved passage opens its exact original location and nearby sentences. The recorded insertion example neither loses words nor repeats the quote.

**Why this must work before moving on:** Every quotation needs a trail back to its source, not a loose piece of text.

### P07-AC09

**What you should see:** The repeated-upload record shows one active copy of the same import. Another writer's matching file reveals none of your private details.

**Why this must work before moving on:** A retry should not fill your library with duplicates or reveal someone else's books.

### P07-AC10

**What you should see:** Recorded failures keep the original file and explain where work stopped. A failed replacement leaves the earlier usable copy available.

**Why this must work before moving on:** A broken import must not destroy a book that was already working.

### P07-AC11

**What you should see:** The access report shows another writer cannot see your upload progress, errors or previews. Permission is checked again before private results appear.

**Why this must work before moving on:** Even a progress message or saved preview can reveal private information.

### P07-AC12

**What you should see:** The screen examples distinguish missing text, waiting for review, searchable material and pending citation checks. An incomplete replacement cannot label itself ready.

**Why this must work before moving on:** Finished uploading is different from being fully read, searchable or ready to cite.

### P07-AC13

**What you should see:** The reader-safety report shows harmful book features and hidden outside requests were blocked without exposing files or account information.

**Why this must work before moving on:** Opening a source should let you read it, not let the document control your account.

## Acceptance criteria

- [ ] **P07-AC01 — Upload ownership:** user A can upload and inspect A's permitted file. User B cannot list, fetch, replace, preview, or start a job for it by substituting IDs, paths, or request ownership fields. An admin may inspect evidence already attached to permitted essays/research, with audit, but cannot browse/read/download A's original library files or expand an attachment grant into arbitrary passages. Admins cannot edit or delete author content.
- [ ] **P07-AC02 — Upload limits and OCR exclusion:** files outside the agreed MIME/signature, size, page, extraction-time or archive-expansion limits receive a specific failure. An EPUB archive cannot escape its extraction area; embedded instructions grant no tools/actions. Scanned/image-only input receives the agreed unsupported/needs-attention state, and no OCR backend is invoked.
- [ ] **P07-AC03 — Preserved identity:** the original bytes/hash, ownership, source version, edition/translator where applicable, and parser configuration remain retrievable. Normalized text never overwrites the original text or image.
- [ ] **P07-AC04 — PDF locators:** sampled course-guide passages open the correct physical page and display the separately confirmed printed label. Front matter, cross-page quotations, caption-adjacent prose, and missing labels produce correct ranges or explicit unknowns.
- [ ] **P07-AC05 — EPUB locators:** a passage opens the correct source version and chapter/internal anchor after save/reload. A book without genuine print pagination receives no invented page number.
- [ ] **P07-AC06 — Metadata and attribution:** missing title/author/date/edition remains unresolved until confirmed. PDF creation time is not silently publication time; an instructor's explanation of Locke is attributed to the instructor, not presented as Locke's retrieved words.
- [ ] **P07-AC07 — Extraction coverage:** per-page/section manifests distinguish extracted text, blank/decorative content, substantive image-only content and ambiguity. Test selectable covers/footers with scanned middle pages and image-based tables; some text or a faulty preexisting text layer cannot establish full coverage. Preserve original page numbering and partial output for owner inspection, disclose gaps and keep the source needs-attention/ineligible for automatic indexing. A later partial-index policy needs explicit agreement; no missing text is invented or silently ignored.
- [ ] **P07-AC08 — Passage traceability:** every passage resolves to its exact source version, original spans, locator, and recoverable surrounding context. Splitting/overlap neither drops text silently nor duplicates a quote during insertion.
- [ ] **P07-AC09 — Idempotency:** repeating the same permitted import or retrying an interrupted stage creates no duplicate active source generation/passages. A different user's identical upload reveals no private metadata or import history.
- [ ] **P07-AC10 — Failure recovery:** parser failure, timeout, worker restart, or cancellation leaves explicit progress and a recoverable original. A failed replacement does not deactivate the prior accepted generation.
- [ ] **P07-AC11 — Queue/cache isolation:** B cannot observe A's job progress, extraction errors, cached snippets, previews, or signed-file access. Permission is rechecked when a queued task starts and before private output is released.
- [ ] **P07-AC12 — Honest readiness:** task completion means neither complete text coverage, vector visibility nor evidence verification. The UI distinguishes unsupported scan/incomplete extraction, metadata/quality review, ready for indexing, searchable and citation checks pending. Incomplete new generations cannot replace the previous accepted generation or become searchable by a forged client-ready flag.
- [ ] **P07-AC13 — Safe original readers:** malicious EPUB/PDF scripts, event handlers, executable links, and embedded external requests cannot execute, fetch private resources, or disclose document/session data. Opening a source does not expose unauthenticated asset URLs or publish surrounding chunks.

## Verification and evidence

| Method | Required evidence | What it establishes |
|---|---|---|
| Automated local fixtures | EPUB/PDF fixture manifest; hash/span/locator comparisons; malformed/archive-limit cases | Deterministic parsing and state behavior for those files |
| Real local parser run | Pinned no-OCR configuration; representative EPUB/course PDF plus detected unsupported scan/mixed-page cases; errors and timing | Actual text extraction and honest scan/coverage handling, rather than a mocked converter |
| Manual original comparison | Page/chapter samples, coverage manifest and screenshots; metadata and reading-order/missing-text findings | Whether sampled text/attribution/coverage match original material |
| Automated A/B/admin tests | Denied file/job/cache/preview cases, audited attached-evidence viewing, and denied admin original/library access | Access enforcement across the newly added surfaces |
| Reader security tests | Malicious EPUB/PDF content, unsafe links, and embedded-network-request fixtures | Original readers preserve the application's security boundary |
| Worker integration | Interrupted/retried/cancelled job evidence in an isolated environment | Actual queue recovery; an immediate/dummy backend is insufficient |

Use an isolated test database and private fixture storage. Originals supplied for testing stay local unless the user approves a provider/privacy choice and the later execution budget. No current document has passed these checks.

### Required fixture manifest

- One primary-text EPUB with chapter anchors and known edition/translation metadata.
- The supplied course guide, including front matter, a cross-page passage, and caption-adjacent text.
- A scanned PDF, selectable cover/footer with scanned middle pages, blank/decorative pages and image-based table: unsupported/needs-attention without OCR or false complete status.
- An encrypted/unsupported or malformed file with an honest failure.
- Separate A/B copies, permitted admin attached-evidence inspection and denied admin original/library access, including interrupted/repeated imports.
- EPUB/PDF scripts, event handlers, unsafe link schemes, and embedded external requests exercised in the original readers.

## Failure and rollback

Keep failed/staged generations unavailable to research. Retain the previous active version until replacement acceptance succeeds. Retrying uses the existing job/import identity; an operator can inspect the failure without exposing document text to another user.

Rollback restores the prior active-generation pointer and search eligibility; it does not erase original assets, authored essays, or historical citation evidence. Any eventual deletion must follow the approved retention policy and identify the exact affected records/assets.

## Exit evidence and handoff

- [ ] Attach the completed acceptance matrix, fixture/sample manifest, parser/worker results, permission evidence, known limitations, and recovery demonstration.
- [ ] An independent reviewer checks originals against passages and audits ownership at upload, worker, reader, and cache boundaries.
- [ ] The user reviews supported-format limits and signs off the demonstrated ingestion workflow.
- [ ] Mark the gate verified only after evidence is recorded; then authorize P08 separately. This planning document does not authorize implementation.

Return to [the rebuild plan](../../REBUILD_PLAN.md).

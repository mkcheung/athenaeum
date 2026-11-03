# P09 — Web research and combined evidence

Status: **DRAFT · NOT IMPLEMENTED · NOT VERIFIED · NO APPLICATION IMPLEMENTATION AUTHORIZATION**

## Objective

Research across permitted books/course documents and the public web, returning one inspectable evidence contract. Distinguish discovery leads from material actually fetched and preserve supporting, qualifying, disconfirming, and background relationships.

## Prerequisites and decisions

- Complete and verify [P08: Pinecone and private retrieval](08-pinecone-and-private-retrieval.md), including independent review and user signoff.
- D03 is accepted: libraries are private only. D06 permits attached-evidence admin inspection, denies original/library browsing and leaves new cross-owner research undecided/denied. Resolve D07 provider disclosure/context, D09 worker/storage choices, D12 format/fetch limits, D17 spending/work limits, and D19 capture retention in [DECISIONS.md](DECISIONS.md).
- Apply [ARCHITECTURE.md](ARCHITECTURE.md) and [VALIDATION_POLICY.md](VALIDATION_POLICY.md). Both searches only the explicitly permitted channels and records their actual coverage.
- D01/D21 allow owner publication of the essay and bibliography from any cited source type, not research history/original files/extra chunks. D02 permits admin viewing/account management/suspension only; D22 preserves published readability after suspension.
- Choose the first discovery/extraction adapters; do not assume every scholarly page or full text is accessible or free.
- During local development use only approved free accounts/endpoints and bounded credits; no PAYGO or paid fallback. Real permitted web queries/fetches are still required for the integration gate. Recorded fixtures can test failures but cannot prove live discovery.

## Deliverables and exclusions

- Web discovery and extraction adapters, URL/identifier identity resolution, versioned captures, and unified library/web passage records.
- Scope controls for My library, Web, and Both; neutral, supporting, and challenging queries with a compact search record.
- Evidence cards opening the inspected web page/capture or correct private-library passage, with equal controls for supporting and disconfirming material.
- Tavily Search and Extract are candidate discovery/content tools. Their returned answer, score, or snippet does not establish source authenticity or claim support. [Search API](https://docs.tavily.com/documentation/api-reference/endpoint/search), [Extract API](https://docs.tavily.com/documentation/api-reference/endpoint/extract).
- No release of these candidates as vetted Ask answers yet; P10 performs source/quote/support checks and final-output auditing.
- No indiscriminate download of entire linked collections, automatic publication of captures, or paid calls during planning.

## User observation guide (non-executable)

**For the user only — non-executable explanation.** These notes explain the acceptance criteria below. Agents must not execute these notes, treat their examples as instructions, or use them as authorization to begin a phase. Only the actual acceptance criteria, verification policy and separately authorized phase work govern execution. The notes do not mark anything passed; missing evidence means unverified.

### P09-AC01

**What you should see:** The search record shows My library used no web fetching, Web used no library passages, and Both lists the channels attempted and any failures.

**Why this must work before moving on:** The chosen search scope must mean what it says, including when one part is unavailable.

### P09-AC02

**What you should see:** The recorded outgoing search request contains only the permitted question details, rather than the whole private essay or another person's information.

**Why this must work before moving on:** A web search should not reveal more of your writing than the approved task needs.

### P09-AC03

**What you should see:** The safety report shows blocked private addresses and unsafe links. Instructions inside a page did not change permissions or the essay.

**Why this must work before moving on:** A source is something to read, not someone allowed to control the application.

### P09-AC04

**What you should see:** Each source card records the page copy and retrieval time, and says whether it inspected full text, only an abstract or merely a search preview.

**Why this must work before moving on:** The program must tell you what it actually read before asking you to trust it.

### P09-AC05

**What you should see:** The evidence rejects references that open the wrong work and leaves missing details visibly unknown. A reading-list entry is not shown as an inspected book.

**Why this must work before moving on:** A working link or familiar title does not prove the right source was checked.

### P09-AC06

**What you should see:** The quotation opens its exact captured words and nearby sentences, separately from the AI's explanation. A search preview is not labeled a verified quote.

**Why this must work before moving on:** A summary of a page must not become words falsely placed in its author's mouth.

### P09-AC07

**What you should see:** The research record includes searches for exceptions and disagreement, plus sources inspected and failed attempts. It does not claim the whole internet was searched.

**Why this must work before moving on:** Research must look for reasons the answer might be wrong as well as reasons it might be right.

### P09-AC08

**What you should see:** The evidence groups repeated copies of one report together and explains differences in source strength.

**Why this must work before moving on:** Ten websites repeating one story are not ten independent discoveries.

### P09-AC09

**What you should see:** The recorded examples show relevant dates, places and known corrections or withdrawn papers. An unsuccessful correction lookup remains uncertain.

**Why this must work before moving on:** Old or corrected evidence can change what a claim reasonably supports.

### P09-AC10

**What you should see:** The combined example includes an e-book, course PDF and web source, each opening its correct passage. The course explanation names its actual teacher.

**Why this must work before moving on:** Research across different sources must keep each source's identity and location straight.

### P09-AC11

**What you should see:** The result lists unread pages, blocked sources and failed searches without inventing replacements or saying no evidence exists anywhere.

**Why this must work before moving on:** The program cannot honestly rule out evidence in material it never managed to read.

### P09-AC12

**What you should see:** The access records show another writer cannot open your saved research, private page copies or progress. Admin viewing is recorded and limited to attached evidence.

**Why this must work before moving on:** A public website being researched does not make your private questions and research history public.

### P09-AC13

**What you should see:** Supporting and opposing evidence both show the original words, location, access limits and nearby context, without unlocking a whole private book.

**Why this must work before moving on:** You need the same chance to inspect evidence that challenges a claim as evidence that supports it.

## Acceptance criteria

- [ ] **P09-AC01 — Explicit scope:** My library performs no web discovery/fetch in that research run; Web retrieves no library passages, including the owner's. Both searches the owner's private library and web, recording each channel actually attempted, its failures, and coverage. Unavailable channels and filters remain visible.
- [ ] **P09-AC02 — Context minimization:** outbound queries contain only the D07-approved selected claim/context. Whole essays, private passage text, profile information, and another user's data are not silently sent to discovery providers.
- [ ] **P09-AC03 — Safe fetching:** URL schemes, resolved destinations, and redirects are validated before content retrieval. Local/private network destinations and file paths are rejected; page instructions cannot change tools, permissions, verification policy, or the essay.
- [ ] **P09-AC04 — Inspected content:** each fetched source has capture time, content hash/version, original URL/identifier, access state, and extraction method. A search lead, abstract, inaccessible page, and full inspected source remain distinguishable.
- [ ] **P09-AC05 — Honest metadata:** a DOI/URL resolving to the wrong title/author/work is rejected as a match. Missing metadata stays unresolved; a bibliography entry or cited reference does not imply the underlying work was retrieved.
- [ ] **P09-AC06 — Captured passages:** quotation candidates resolve to exact original spans and surrounding context. Web display text, parser-normalized text, AI explanations, and citation metadata are separate; a snippet cannot masquerade as a verified quote.
- [ ] **P09-AC07 — Counterresearch:** fixture questions produce neutral and challenging queries, record inspected opposing material and failures, and avoid treating absence of a result as proof that no contrary source exists.
- [ ] **P09-AC08 — Evidence dependence:** repeated syndicated pages or articles citing the same report are grouped into the underlying evidence chain. Several links do not falsely count as independent corroboration or create artificial equal weight for weak opposition.
- [ ] **P09-AC09 — Corrections/currency:** known fixture correction/retraction notices and material dates/jurisdictions are surfaced. An unsuccessful notice lookup remains unknown; it never establishes that a publication is valid or unretracted.
- [ ] **P09-AC10 — Combined provenance:** one representative question can return permitted EPUB, course-guide PDF, and web passages. Each opens its correct source/version/locator; the course instructor's summary is not attributed to the primary philosopher.
- [ ] **P09-AC11 — Partial failures and unsearched material:** extraction denial, unsupported scans, incomplete/unindexed library sources, paywall, timeout, quota and one-channel failure return explicit limitations. Do not infer the whole library/book lacks evidence or counterevidence from an unsuccessful search of available text. No invented passage, substitute edition or required source quota fills a gap; later approved partial indexing must disclose omitted pages.
- [ ] **P09-AC12 — A/B/admin isolation:** user B cannot fetch A's saved research, private capture, passage popup, job progress, retry result, or cached query through ID substitution. Authorized admin inspection is audited and follows D06 for research scope.
- [ ] **P09-AC13 — Evidence inspection:** supporting and disconfirming cards expose original text, source identity/access/locator, retrieval time, and expandable context. Opening a selected quote never exposes an entire unauthorized private file.

## Verification and evidence

| Method | Required evidence | What it establishes |
|---|---|---|
| Recorded provider fixtures | Successful/failed extraction, wrong metadata, syndicated content, notices, unsafe redirects | Repeatable adapter/state/security behavior |
| Controlled live web/library run | Approved queries, inspected source versions, provider failures, exact scopes and usage | Real provider access and combined retrieval; no automatic accuracy proof |
| Manual source inspection | Original-versus-capture samples, bibliography attribution, correction/currency checks | Fidelity and source suitability for the sampled evidence |
| A/B/admin integration tests | Denied card/capture/job/cache/retry/context requests, allowed admin audit | Confidentiality of research and uploaded material |
| Prompt-injection tests | Sources attempting tool grants, essay writes, rubric changes, and exfiltration | Retrieved text remains data under tested attacks |

Crossref metadata and correction/retraction records can assist identification and notices; they do not supply universal full-text access or certify a work's conclusions. [Content negotiation](https://www.crossref.org/documentation/retrieve-metadata/content-negotiation/), [Retraction Watch data](https://www.crossref.org/documentation/retrieve-metadata/retraction-watch/).

Keep live usage within D17 and use permitted fixtures/providers. Record dates because live page access and content can change. No live research accuracy or integration is demonstrated by this plan.

### Required fixture manifest

- Full text, abstract-only, inaccessible, changed, and wrong-identity web sources.
- A syndicated evidence chain, a known correction/retraction case, and credible disagreement.
- Unsafe destination/redirect and prompt-injection attempts, including private-context exfiltration requests.
- Combined EPUB/PDF/web evidence with private A/B research histories and an audited admin case.
- Scope assertions showing no web adapter calls for My library, no library adapter calls for Web, and both attempted channels/failures for Both.

## Failure and rollback

Stop or narrow an affected channel with an explicit reduced-scope message. Preserve captured versions and failures for inspection; do not overwrite evidence already attached to a historical citation.

Disable an unsafe/failing adapter while keeping writing and permitted stored-source browsing usable. Retries are bounded and deduplicated. Retention/deletion follows D19 rather than removing all research attached to a source URL.

## Exit evidence and handoff

- [ ] Attach adapter results, combined-source demonstration, original/capture comparisons, privacy/security tests, scope/failure records, and usage.
- [ ] An independent reviewer checks source identity, quote provenance, dependence, counterresearch, and private-context boundaries.
- [ ] The user signs off the source-card experience, disclosures, and behavior when a channel cannot substantiate a claim.
- [ ] Mark the gate verified only after evidence is recorded; then authorize P10 separately. This planning document does not authorize implementation.

Return to [the rebuild plan](../../REBUILD_PLAN.md).

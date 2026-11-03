# Local development with no paid services

November 2, 2026. **DRAFT · PLANNING ONLY · NOTHING INSTALLED OR QUALIFIED.**

## Accepted scope

D08/D17 now require local application development and no paid service usage until the user requests release. Build at this repository's root with the legacy tree in `retired/` (revised D08). Keep the modular Django/React design, PostgreSQL authority, Pinecone retrieval target, private object storage, background jobs and all quality/privacy requirements. No hosting account or deployment is needed now.

“Local” describes where the application runs. Selected free cloud services remain external; D07 now permits task processing and training/product-improvement reuse where applicable terms permit. This is not blanket permission for every recipient, restricted input or account setting. Private books/drafts use checked service/data profiles and accurate disclosures. Local anonymous-browser publication tests do not publish essays on the internet.

## Proposed development components

| Component | Local/free approach | Evidence boundary |
|---|---|---|
| React + Django API | Local processes or an isolated local container environment | Real UI/API flows; no hosted availability claim |
| PostgreSQL | Dedicated local development and test databases | Real transactions/ownership/revisions; the dropped legacy MySQL database is not reused (D27) |
| Queue/workers | Actual local durable worker and chosen queue backend | Real persistence/restart behavior; not an inline fake |
| Original-file storage | Real local S3-compatible object service, engine pinned after P02 compatibility checks | Accepted object architecture tested locally; no remote-provider integration claim |
| Approval/activation mail | Local SMTP capture, such as Mailpit, with external relay disabled | Real worker/SMTP/message/link/password journey; external inbox delivery remains unverified |
| EPUB/PDF extraction | Local text extraction; no OCR in initial scope | Actual file/span/page coverage, not a mocked parser |
| Pinecone | Confirmed free Starter account/index within isolated permitted resources | Real embeddings/index/query/freshness only when actually exercised |
| Web research | Approved free discovery/extraction quota plus inspected public pages | Real retrieval within quota; recorded responses alone are fixtures |
| Answer/check models | A suitable approved free API; local models are an alternative pending hardware/configuration/quality checks | No chosen model is assumed to meet the accuracy gate |
| Exports | Local DOCX/PDF rendering and structured backup generation | Actual rendered checks in all selected styles |

Accepted D10 selects Tiptap's free MIT core, with our own citation/review UI, PostgreSQL revisions and server exports. Paid Tiptap AI/comments/history/conversion or expiring trials are not dependencies. Verify actual pinned package/extension licenses and runtime compatibility before claiming the editor works. [Tiptap OSS scope](https://tiptap.dev/open-source-to-platform).

SeaweedFS's Apache-licensed open-source edition documents a single-node local S3 endpoint and is a candidate, not an installed choice. Use authenticated/local-only endpoints and isolated persistent paths, rather than copying permissive example defaults. [Official project](https://github.com/seaweedfs/seaweedfs).

Mailpit provides a local SMTP server, captured-mail UI and integration API. It does not prove real mailbox deliverability. [Mailpit documentation](https://mailpit.axllent.org/docs/).

## Free-service research snapshot, not a capacity promise

Checked November 2, 2026. Recheck actual plan/account/model limits before authorized use; shared account usage can consume quotas outside this app.

- **Pinecone Starter:** published free allowances include 2 GB and bounded index/namespace/read/write/embedding quotas. This permits a real small-corpus integration attempt, not unlimited personal libraries or proven 25-writer throughput. Preserve existing indexes; a full free account is not permission to delete unrelated data. [Pricing](https://www.pinecone.io/pricing/), [monthly limits](https://docs.pinecone.io/reference/api/database-limits/rate-limits), [object/backup limits](https://docs.pinecone.io/reference/api/database-limits/object-limits).
- **Tavily free Researcher tier:** 1,000 monthly credits, no card required; search/extraction depth changes credit use. Keep paid/PAYGO/auto-refill disabled; a development key has different limits from paid production access. Minimize queries rather than sending whole private drafts to search. [Pricing](https://www.tavily.com/pricing), [credit costs](https://docs.tavily.com/documentation/api-credits), [rate limits](https://docs.tavily.com/documentation/rate-limits), [privacy](https://www.tavily.com/privacy).
- **Groq Free:** real inference is possible under model/organization-specific request/token quotas; verify the actual account is free and paid upgrade is disabled. Review data controls, reliability/abuse retention and available zero-retention settings before private use. No particular model/context limit or 80% qualification is assumed. [Rate limits](https://console.groq.com/docs/rate-limits), [billing](https://console.groq.com/docs/billing-faqs), [data controls](https://console.groq.com/docs/your-data), [service agreement](https://console.groq.com/docs/legal/services-agreement).
- **Gemini unpaid APIs:** free generation/embedding options exist, with applicable terms permitting product improvement/human review and restricting sensitive/confidential/personal submissions. D07 now permits reuse in principle, but does not waive those input restrictions or automatically make every draft eligible. Check actual service/account/region and proposed data; appropriate public/synthetic fixtures remain an option. [Pricing](https://ai.google.dev/gemini-api/docs/pricing), [billing](https://ai.google.dev/gemini-api/docs/billing), [data terms](https://ai.google.dev/gemini-api/terms).

These are researched candidates, not selected accounts or enabled adapters. Do not add billing, purchase credits, enable paid fallback or create expiring paid trials. If a free service cannot meet the selected privacy/quality or usage requirements, keep that integration unqualified and present the limitation; do not silently weaken requirements or replace Pinecone with another engine.

## Free-tier controls

- Check actual free-plan/account status and allowed endpoint/model before use; an application flag alone is not evidence that the provider will not bill.
- Persist request/token/credit usage and bounded per-run/account work limits. Concurrency/retries must respect provider quotas and current input/source/account permissions.
- Accepted D17 pauses research when free quota is exhausted and resumes when quota becomes available. Persist waiting state, finished stages and provider reset information when known; do not invent reset times or retry in a tight loop. Resume rechecks cancellation, permissions, input/source staleness and remaining limits. A deadline can end waiting with an honest limit outcome, never paid fallback or false verification.
- No provider keys in the browser, exports or general logs. A synthetic fixture run does not authorize sending every private library or essay.
- Budgeting, caching or local fallback cannot skip source/quote/context/challenge/final-output gates. A different model/configuration needs applicable qualification evidence.

## What can pass locally, and what stays deferred

P02–P12 local requirements can be exercised with real local services plus permitted real free-tier integrations. P03 uses captured local SMTP delivery; P08 still needs actual Pinecone visibility/retrieval; P09 needs real permitted discovery/fetching. P10/P11 still require their actual human-reviewed quality gates. Quota exhaustion or an underperforming free model does not turn an unperformed/failed gate into a pass.

P13 is complete **local** integrated acceptance of that exact configuration. Future hosted HTTPS/security, external mailbox delivery, chosen remote object-provider behavior, internet exposure and hosted capacity remain explicit unverified launch gates in P14. No local browser screenshot can establish them.

Keep the user's prerequisite policy: verify every applicable current-phase criterion before advancing. If constraints prevent an essential gate, report what remains unverified; any proposal to split/reorder development and qualification needs explicit agreement before changing dependencies. Independent work within the authorized phase may continue.

## Background work on a development computer

Closing the browser does not cancel saved jobs. Processing continues while the local computer and services run. Sleep/shutdown can pause execution; durable jobs must resume or report a recoverable failure after restart. Do not promise cloud-style continuous execution from a powered-off laptop or change device sleep settings to achieve it.

Read-only inspection found an ARM64 environment and command paths for Docker, Ollama, uv, Python, Node and psql. Versions, active servers, downloaded models, available RAM and sustained model performance are unverified. No command presence is proof of compatibility or an installed usable model; nothing was launched or installed.

## One-hour recovery-point target

D19 accepts no more than about one hour of lost saved changes after a serious failure. The user currently reports no independent backup destination. Define failure scope and choose a no-extra-cost destination before claiming protection; none is configured by this plan. Same-computer snapshots can support some application/database recovery but cannot protect against losing that computer/disk. A code-only Git repository or surviving Pinecone vectors cannot reconstruct canonical essays/database/original assets. Device/disk-loss recovery remains NOT VERIFIED; the target is not silently reduced.

Back up canonical PostgreSQL records, original object versions, required recovery configuration and a consistent manifest. Derived Pinecone vectors may be rebuilt; Pinecone Starter's lack of native backups does not justify losing canonical evidence. Track the age of the last successful recoverable copy and failed/missed backups; an hourly schedule alone does not prove the target. Demonstrate restore into fresh isolated targets, including document/citation/source consistency. Restoration time and retention are separate open decisions.

No backup destination, schedule, copy, provider account, model download, service process or application implementation has been created by this plan.

## Training reuse — conditionally accepted

Think of sending a draft to a tutor. Permission one is “Read this and help me improve it now.” Permission two is “Reuse this material to improve your teaching for future students.” After this explanation, the user accepted both processing and reuse where applicable terms permit. This broadens eligible free options; it does not require enabling optional training or selecting any particular service.

No-training terms restrict use for general model training/fine-tuning, but do not alone promise no retention, no logs, no human access or no external processing. Product improvement can also include evaluation and human annotation; inspect actual terms rather than treating every use as identical. Reuse does not mean the essay is automatically publicly published or certainly reproduced in another user's answer.

As checked November 2, Groq's agreement excludes input/output model training or fine-tuning absent explicit customer permission, while its data controls separately describe retention exceptions/settings. Gemini's unpaid terms can allow submitted content and responses to improve products/ML technology and permit human reviewers; applicability depends on the service/account/region. Do not infer every submission is actually trained on or that generic cloud consent accepts these extra uses. [Groq agreement](https://console.groq.com/docs/legal/services-agreement), [Groq data controls](https://console.groq.com/docs/your-data), [Gemini terms](https://aistudio.google.com/docs/terms).

Accepted D07: allow training/product-improvement reuse where applicable terms permit, superseding the earlier no-training recommendation. Continue to check input eligibility, necessary data, rights/authorization, retention and access conditions. Provide accurate processing/reuse disclosure to future users rather than assuming they personally accepted the owner's design decision. Application privacy/RBAC and the $0 constraint remain unchanged; no provider, optional data-sharing setting or account is enabled by this plan.

# Nigeria AI Scaling Hub (NAISH) — Project Briefing for Documentation App Design

**Purpose of this document:** A comprehensive, source-grounded reference describing the Nigeria AI Scaling Hub so that an AI system can design a documentation application covering the full picture — infrastructure, use cases, governance, the advisory record, and stakeholders. All figures and claims below are drawn from the NAISH project files (the UduTech–Kasi RFP response, the three LBS use-case summaries, and DSN advisory memos INFRA-001, -002, -003). Where a figure is an assumption or estimate rather than a confirmed value, it is flagged as such.

---

## 1. What NAISH Is

The Nigeria AI Scaling Hub (NAISH) is a national AI infrastructure initiative to deploy and operate a single high-performance GPU compute node providing shared GPU access for AI startups, researchers, and priority national use cases. The node is to be hosted at the Galaxy Backbone (GBB) Data Centre in Abuja.

Key framing facts an app should surface:

- **Sponsoring context:** Federal Ministry of Communications, Innovation & Digital Economy (FMCIDE) is the client/partner; Lagos Business School (LBS) is the requesting party for the advisory workstream; Data Science Nigeria (DSN) provides technical infrastructure advisory.
- **Core asset:** One node containing 8× NVIDIA H200 SXM5 GPUs.
- **Purpose:** Shared compute access supporting a portfolio of seven priority use cases plus broader startup/researcher access, under a governed multi-tenant model.
- **Hosting site:** GBB Data Centre, Abuja (physical hosting, power, cooling, network).
- **Procurement reference for the GPU node:** NAISH/INFRA/GPU-2026-02, proposed by the UduTech–Kasi Cloud Consortium.

---

## 2. Hardware — The Compute Node

The proposed platform is the **Supermicro SYS-821GE-TNHR**. An app documenting infrastructure should treat these as the canonical hardware facts:

| Component | Specification |
|---|---|
| GPU | 8× NVIDIA H200 SXM5, 141 GB HBM3e per GPU, 700 W TDP, NVLink/NVSwitch full-mesh fabric, 900 GB/s GPU-to-GPU bandwidth |
| Total GPU memory | 1,128 GB HBM3e (8 × 141 GB) |
| GPU baseboard | NVIDIA HGX (DELTA-NEXT) — single baseboard; 4× NVSwitch chips forming a full-mesh fabric over NVLink 4.0 |
| CPU | Dual Intel Xeon Platinum 8570, 56 cores / 112 threads each, 350 W TDP, PCIe 5.0 |
| System memory | 2 TB DDR5-6400 ECC RDIMM (32 × 64 GB) |
| Local storage | 1.92 TB NVMe (OS, mirrored) + 7.6 TB NVMe scratch (4× 1.9 TB U.3) |
| Networking | NVIDIA ConnectX-7 VPI, 2× 200 GbE (InfiniBand/Ethernet); 2× 10 GbE management |
| Power draw | Peak 10.2 kW; 6× 3,000 W redundant (4+2) Titanium PSUs |
| Thermal | Max heat output ~38,557 BTU/hr; airflow requirement ~1,105 CFM |
| Form factor | 8U chassis (14" H × 17.2" W × 33.2" D; gross 225 lbs / 102.1 kg); compatible with GBB 48U racks; requires 2× 15 kW PDUs with metering |
| Management | IPMI, Redfish, Prometheus/Telegraf-compatible telemetry |

**Architecture note the app should preserve:** The node uses the **SXM5** form factor (not PCIe). SXM5 GPUs sit on a dedicated HGX baseboard with NVLink/NVSwitch, giving full-mesh 900 GB/s interconnect suited to multi-GPU training and multi-GPU inference. A PCIe variant would be limited to ~64 GB/s over the host bus and lacks native NVSwitch. The **HGX single-baseboard constraint is a hard technical boundary** — the eight GPUs are one indivisible baseboard, not separable cards.

**Baseline software stack (vendor-supplied):** Ubuntu 22.04 LTS / RHEL 9, NVIDIA drivers + CUDA 12.x, cuDNN, NCCL, Docker/Podman, NVIDIA Container Toolkit, pre-built PyTorch & TensorFlow images.

**Optional orchestration:** The vendor offers the **Africa GPU Hub (AGH)** orchestration layer for multi-user enablement, job scheduling, model registry, usage metering, and billing integration.

---

## 3. Software / Platform Stack

Two layers should be documented — the DSN-selected open-source stack and the optional vendor platform.

**DSN open-source stack:** Kubernetes (container orchestration), Volcano and Kueue (batch scheduling / queueing), NVIDIA Device Plugin with time-slicing (sub-GPU allocation), JupyterHub (user notebooks), vLLM (LLM inference serving with continuous batching), MLflow (experiment/model tracking), MinIO (S3-compatible object storage, deployed on-node), Keycloak (identity/access), and Prometheus + Grafana + DCGM Exporter (monitoring).

**AGH orchestration (optional, vendor):** DSN's advisory position (INFRA-002) is to adopt AGH as the primary platform *subject to agreement on cost and licence terms*, because building and maintaining a fully custom multi-component stack carries significant engineering overhead. vLLM and Kubernetes remain compatible with and complementary to AGH. Before adoption, NAISH should obtain full disclosure of AGH licensing, support obligations, and any data-residency/sovereignty implications for Nigerian proprietary data.

**Serving and scheduling conventions the app should reflect:**
- Inference workloads are **time-sliced** on GPU partitions (sub-GPU allocation).
- Training/fine-tuning jobs run in **scheduled windows** via Volcano/Kueue, ideally off-peak.
- Persistent data lives in **MinIO on the node**, with per-training-window staging (load dataset → run → archive) rather than holding all datasets resident, since the 7.6 TB scratch is finite.

---

## 4. Priority Use Cases

Seven priority use cases have been mapped to the node. An app should be able to present each with its sector, model profile, GPU intensity, and Hub role.

### 4.1 AI-Enabled Agricultural Advisory
Multilingual chatbot (WhatsApp, Telegram, IVR) for ~38 million smallholder farmers, in Hausa/Yoruba/Igbo. Target model: **N-ATLaS-LLM 8B** (open-source Nigerian-language model). FarmerChat pilot completed in Delta State under the LIFE-ND Project. Inference VRAM ~16 GB at FP16 (~9 GB at INT8). GPU intensity: **moderate** — 1 GPU inference (time-sliced) + 1 GPU scheduled for fine-tuning windows.

### 4.2 AI-Based Oral Reading Fluency (ORF) Assessment
Reading-fluency assessment in local languages for ~86 million early-grade learners. Primary workload: ASR (Whisper-large-v3, ~1.5 GB VRAM) plus a lightweight scoring/feedback LLM; ~8–15 GB per active pipeline. Typically batch/asynchronous. GPU intensity: **moderate**; benefits from CPU threads for audio pre-processing.

### 4.3 AI-Based Liquidity Management for Agents
Forecasting cash/e-float needs for ~2 million mobile-money agents. Core models are lightweight (LSTM/XGBoost/time-series); optional LLM chatbot adds advisory-style inference. GPU intensity: **low** (<1 GPU, time-sliced); primary need is high-bandwidth networking and CPU/data-pipeline capacity.

### 4.4 Self-CAIRE — Digital Health Coaching
LLM-powered health coach in the mDoc "Kem" platform for maternal health and chronic disease, via WhatsApp and voice, with a vision to serve 150,000+ members (current pilot ~300 women). Assumed model: a 7–13B (cited up to ~33B) instruction-tuned open-source model replacing the current GPT-4 dependency; 14–28 GB VRAM at FP16 (9–14 GB at INT8). **Highest safety criticality** — clinical fine-tuning, RLHF/DPO alignment, and safety evaluation are non-negotiable pre-deployment gates. GPU intensity: **moderate–high**; 1 GPU inference (time-sliced) + 1 GPU scheduled for clinical fine-tuning.

### 4.5 AI Point-of-Care Ultrasound (AI POCUS)
Portable handheld ultrasound with AI interpretation for frontline workers. Edge inference runs on the device (Lumify/Android); the **Hub's role is model training/fine-tuning** on Nigerian datasets plus a cloud API for higher-complexity cases. GPU intensity: **high (training)** — 1–2 GPUs in batch training windows only (not a persistent reservation); NVLink multi-GPU training is directly applicable. Primary constraint is dataset availability, not compute.

### 4.6 Malaria Intervention Allocation Copilot (ChatMRPT)
Decision-support for malaria programme managers across a 218M at-risk population. Hybrid: geospatial ML (gradient boosting, spatial regression) + a conversational LLM layer (7–8B, ~16–20 GB VRAM). Low user concurrency (<50). GPU intensity: **low–moderate**; heavier load is CPU/data-pipeline work well-served by 2 TB RAM and 112 threads.

### 4.7 AI-Enabled Health Record Digitisation
OCR + NLP conversion of paper records across ~31,000–33,000 facilities into DHIS2/EHR-compatible formats. Models: TrOCR/PaddleOCR-class OCR + lightweight NLP extraction. Throughput-bound batch workload (an H200 processes thousands of pages/hour). GPU intensity: **moderate (throughput)** — 1 GPU, batch-scheduled. Dominant costs are data logistics and storage, not compute.

**Consolidated demand map (from INFRA-002):** all seven fit in *pilot* configuration simultaneously; simultaneous *production-scale* deployment across all would approach node capacity, so phased rollout via the scheduler is recommended.

---

## 5. Compute Budget & Capacity (from INFRA-003)

Estimates are in H200 GPU-hours, assuming 70% effective utilisation, LoRA/QLoRA for LLM fine-tuning, and vLLM continuous batching. The three costed use cases:

| Use Case | Yr 1 (GPU-hrs) | Yr 2 | Yr 3 | 3-Year Total |
|---|---|---|---|---|
| Agricultural Advisory | ~8,436 | ~10,680 | ~10,680 | ~29,796 |
| Health Record Digitisation | ~178 | ~9,180 | ~16,740 | ~26,098 |
| Self-CAIRE Health Coaching | ~9,272 | ~9,452 | ~9,452 | ~28,176 |
| **Combined** | **~17,886** | **~29,312** | **~36,872** | **~84,070** |

**Capacity headline:** Against total node capacity of 8 GPUs × 3 years × 8,760 hrs × 70% utilisation ≈ **147,168 effective GPU-hours**, these three use cases consume roughly **57%** over three years, leaving meaningful headroom (~43%) for the remaining four use cases. This must not be overstated — the headroom depends on the workload-governance framework being in place.

**Why GPU-hour totals converge:** inference workloads run perpetually, so a time-sliced 1-GPU allocation produces a structurally static annual GPU-hour figure regardless of user growth within the target base; additional users raise concurrency within the vLLM batch, not total GPU-hours.

**Indicative cloud comparison rates used:** ~$5.00/GPU-hour (specialised cloud tier; Lambda Labs $4.99, Crusoe $4.29); hyperscaler ceiling $10.00–$10.60/GPU-hour. Sub-20B inference is costed on a *blended* rate reflecting the fractional GPU slice actually used, not a flat full-GPU rate.

---

## 6. Deployment, Delivery & Acceptance (from the RFP response)

**Vendor/consortium:** UduTech (technical advisory, orchestration) + Kasi Cloud (Supermicro partner; importation, logistics, on-ground engineering).

**Timeline:** Hardware to Lagos 12–20 weeks; to GBB 3–7 days; installation/commissioning/acceptance 7–14 days; software + load testing 7–14 days; training/acceptance and handover a few days. Total ~16–26 weeks. 3-day mobilisation to GBB upon award.

**Acceptance test plan (RFP §7):** hardware delivery acceptance; GPU benchmark (ResNet50 + transformer micro-benchmarks, ≥90% of vendor baseline, no thermal throttling); CPU throughput (60-min sustained); end-to-end pipeline (ingest→preprocess→train→infer within SLA); power/thermal stress (2-hr sustained + UPS switchover); network/cross-site orchestration; scheduler integration (Slurm/K8s/AGH + preemption); telemetry.

**Warranty & support:** 36-month OEM warranty + local vendor warranty; local spares buffer (DIMMs, drives, PSU, fans, NIC); SLA — Sev 1 (node down): 2 hr response / 4 hr remote diagnosis / 24 hr on-site; Sev 2: 8 hr / 24 hr / 72 hr. Quarterly firmware updates, monthly security patches.

**Commercial summary (indicative, from RFP):** hardware $551,200; logistics $138,430; installation $25,200; 36-month NOC & on-site support $361,680; cloud software Tier 1 $90,000 / Tier 2 $156,000. Total contract value ~$1,166,510 (Tier 1) or ~$1,232,510 (Tier 2). Payment: 30% mobilisation, 40% on delivery to GBB, 30% on installation/acceptance/handover. *These are vendor-proposed figures, not finalised contract values.*

**Compliance claims (vendor):** NDPA-compliant; SOC2/ISO27001 mapping near completion; alignment with GBB physical/network security.

---

## 7. Governance, Risks & Dependencies

Cross-cutting items an app should treat as first-class governance content:

- **Workload governance framework** — quota policies, priority tiers, and scheduling rules must be formalised *before* any use case enters production. This is the recurring critical dependency across memos.
- **Formal GPU workload calendar** — training/fine-tuning scheduled in off-peak inference windows.
- **Clinical safety gate (Self-CAIRE)** — clinical fine-tuning + safety evaluation (est. ~210 GPU-hours pre-deployment) is a non-negotiable prerequisite.
- **Phased facility onboarding (Health Records)** — full national backlog could reach ~310,000+ GPU-hours and exceed single-node capacity without phasing.
- **GBB physical readiness** — power and cooling readiness for the full 10.2 kW peak draw is a live dependency; GBB remediation (tracked as R1–R4 findings) is not yet confirmed complete.
- **Data availability** — the primary constraint for AI POCUS and Health Record Digitisation is datasets, not compute.
- **Usage-baseline correction** — the earlier "2 sessions/user/month" figure understated production demand; planning should use realistic concurrency (DSN suggests 500–1,000 concurrent sessions for agricultural advisory at national pilot scale as a baseline).
- **Hosting options under economic analysis** — three models: (1) full deployment at GBB, (2) a hybrid/split model, (3) a commercial data centre. The hybrid model is **two independent parallel servers, not a distributed cluster**, constrained by the HGX single-baseboard boundary; the intent is to fold external GPUs back into GBB once R1–R4 remediation is confirmed. GBB's mandate status is framed diplomatically as a *strategic alignment* consideration in external documents.

---

## 8. The DSN Advisory Record

An app should be able to browse the advisory series as a structured, versioned record. Each memo follows the DSN house style (metadata table → numbered sections → risk register → dual signature: Ahmad Ibrahim Ismail as author/AI-DPI Lead, Olubayo Adekanmbi as CEO/approver).

| Ref | Title | Requesting Party | Focus |
|---|---|---|---|
| DSN-ADV-INFRA-001 | Technical Validation of DDI Inference Cost Analysis (Agricultural Advisory) | LBS (Dr. Raymond Onuoha) | Validates N-ATLaS-LLM 8B choice, concurrency & session assumptions, deployment architecture, missing training workloads, GPU-hour demand |
| DSN-ADV-INFRA-002 | GPU Specification Analysis & Use Case Demand Report | LBS (Dr. Raymond Onuoha) | Hardware spec analysis; SXM5 rationale; all seven use cases mapped; storage/orchestration/networking recommendations |
| DSN-ADV-INFRA-003 | Compute Budget Estimates for Top Priority Use Cases | LBS (Dr. Raymond Onuoha) | GPU-hour + storage + cloud-cost budgets across three priority use cases; capacity headroom analysis |
| DSN-ADV-INFRA-004 | Technical Advisory Memo (qualitative hosting-risk assessment) | LBS follow-up brief | Risk assessment across three hosting options; hybrid transition plan for folding external GPUs back into GBB post-remediation |

A related **Data Centre Hosting Brief and RFQ** (Ref: NAISH/INFRA/HOST-2026-01) exists for soliciting competitive facility-hosting quotes. A **CAPEX/OPEX economic-comparison workbook** across the three hosting models is in progress, pending GBB remediation cost lines and confirmed market rates.

---

## 9. Stakeholder Directory

| Entity / Person | Role |
|---|---|
| FMCIDE | Federal ministry; client/partner for NAISH |
| Data Science Nigeria (DSN) | Technical infrastructure advisory |
| Ahmad Ibrahim Ismail | AI-DPI Lead, DSN — advisory author |
| Olubayo Adekanmbi | CEO, DSN — memo approver |
| Lagos Business School (LBS) | Requesting party for the advisory workstream |
| Dr. Raymond Onuoha | LBS — primary requester of advisory memos |
| Galaxy Backbone (GBB) | Physical hosting provider, Abuja |
| UduTech–Kasi Cloud Consortium | GPU hardware vendor (Ref: NAISH/INFRA/GPU-2026-02) |
| NCAIR | Technical sign-off authority per RFP |
| Use-case implementers | e.g., mDoc (Self-CAIRE), Digital Green (agri advisory), TARL/Pratham (ORF) |

---

## 10. Suggested Documentation-App Information Architecture

For an AI designing the app, a natural top-level structure that maps to the content above:

1. **Overview** — what NAISH is, mission, hosting, stakeholders (§1, §9).
2. **Infrastructure** — hardware specs, architecture notes, software stack, HGX/SXM5 constraints (§2, §3).
3. **Use Cases** — a card/detail view per priority use case with model, VRAM, GPU intensity, Hub role (§4).
4. **Capacity & Compute Budget** — GPU-hour tables, capacity/headroom, cloud comparisons (§5).
5. **Deployment** — timeline, acceptance tests, warranty/SLA, commercials (§6).
6. **Governance & Risk** — workload governance, scheduling calendar, safety gates, dependencies, hosting-options analysis (§7).
7. **Advisory Record** — searchable/versioned memo library with metadata and cross-references (§8).
8. **Glossary / Reference** — models, acronyms (NAISH, GBB, HGX, AGH, DHIS2, NDPA, vLLM, DCGM, etc.).

**Content principles the app should encode:** source fidelity (every figure traceable to a source document; no unanchored numbers); clear labelling of *confirmed* vs *assumed/estimated* values; the hybrid model shown as two independent parallel servers rather than a cluster; and the HGX single-baseboard constraint flagged wherever GPU splitting is discussed.

---

*This briefing consolidates information from the NAISH project files as of the advisory series through INFRA-004. Contract values, cloud rates, and GBB remediation cost lines remain indicative or pending confirmation and should be labelled as such in any app that surfaces them.*

<!--
  SOURCE-OF-TRUTH CONTEXT FILE for the /interview-me chatbot.
  The Edge Function fetches this file at request time and feeds it to the model
  as grounding context. Edit this file (and push) to update what the bot knows —
  no redeploy of the function needed.

  RULES FOR EDITING THIS FILE:
  - Only put things here that are TRUE and that you'd be comfortable a recruiter
    reading verbatim. The system prompt instructs the model to use ONLY this file.
  - Sections marked [DRAFT — REPLACE WITH YOUR OWN WORDS] are scaffolding pulled
    from your resume bullets. They are factually grounded but the *framing* is
    Claude's interpretation, not your voice — rewrite them so the bot sounds like
    you, especially anything about goals, motivations, or opinions.
-->

# About Tushar Chawla

## Current Role
Software Senior Engineer at Boomi (formerly Dell Boomi) — Platform Architecture
Services team. Aug 2019 – Present, West Chester, Pennsylvania.

## Skills
- **Languages:** Java, Python, JavaScript, SQL, Bash, HTML, CSS
- **Platforms/Infra:** AWS (ECS, EC2, Transit Gateway, KMS, Secrets Manager,
  Timestream, S3, Lambda), Elasticsearch/OpenSearch, Solace, Terraform, Ansible,
  Docker, Bazel
- **Frameworks/Tooling:** Spring Boot, Hibernate/JPA, Vert.x, Maven, Harness CI/CD,
  New Relic, PagerDuty, GraphQL
- **Domains:** backend microservices, cloud infrastructure & networking,
  security/compliance remediation, observability & SRE, messaging/eventing systems

## Resume — Work History

### Boomi (formerly Dell Boomi) — Software Senior Engineer
**Aug 2019 – Present, West Chester, PA**

Platform & Backend Engineering
- Built a service to measure and record customer usage on the Boomi Platform for
  improved billing structure and business profitability
- Reduced development time 10x via a common configuration-validation module that
  eliminated duplication across multiple microservices
- Reduced developer time/input by 95% in service recovery by automating the
  customized reprocessing of failed documents
- Engineered Java microservices across their full lifecycle (design, build,
  deploy, operate) for Trackdoc, Metering, Execution History, JobService, and
  Assure on the Platform Architecture Services team
- Owned recurring JobService monthly release builds for 5+ years as standing
  release-engineering owner
- Upgraded services from Java 8 → Java 11 (Corretto), replaced WebClient with
  Java 11 HttpClient, migrated Hibernate XML mappings (HBM) → JPA annotations

Messaging & Eventing
- Restructured Boomi Bus client/tester into a multi-module Maven layout, migrated
  credentials to AWS Parameter Store, validated >60,000-message throughput
- Led Solace broker platform work: large-scale broker stand-ups, prod-clone/DR
  replication, EKS 1.28 upgrades, production failover rehearsals
- Enabled the AI Agent Registry Service on Boomi Bus (Parameter Store keys,
  Timestream metrics tables, cross-environment connectivity/config)
- Added queue-management tooling to Boomi Bus (queue-clear capability, broker
  upgrade automation)

Cloud Infrastructure & Networking (AWS)
- Go-to engineer for Transit Gateway connectivity across dozens of cross-account/
  cross-region setups; authored region-peering Ansible playbooks and built CIDR
  conflict pre-validation tooling that prevented routing outages in production
- Implemented ECS/EC2 autoscaling and spot-instance right-sizing; managed monthly
  AMI upgrade cycles for fleet currency and patch compliance
- Built Elasticsearch/OpenSearch snapshot, retention, and DR automation via
  scheduled Lambda functions and ISM rollover policies — reduced customer
  downtime to under 4 hours in DR scenarios
- Deployed Atom Message Proxy (AMP) autoscaling with a dedicated ECS capacity
  provider, polling-fallback safety threshold, and PC4 production deployment

Security & Compliance
- Remediated critical vulnerabilities across Snyk, FedRAMP, and CSPM — including
  Spring RCE, CSRF, path-traversal, command-injection, root-user-in-ECS, and JWT
  auth enforcement — keeping the platform in continuous compliance
- Delivered AWS KMS / Secrets Management capabilities: region-aware container
  secrets, KMS key generate/access interface, refreshSecretsManager API
- Led IDOR and session-context hardening of platform resources in the 2026
  security initiative; wrapped legacy handlers in proper authorization context
- Completed Crowdstrike endpoint security agent rollout across the Solace EC2
  fleet; enforced Vault audit-log alerting across platform services
- Enforced JWT authentication on Trackdoc services; added serviceTransactionId
  tracing and validation hardening to prevent unauthorized document access

Observability & Reliability (SRE)
- Migrated service logging/metrics to New Relic; upgraded the NR agent to 8.25.0
  fleet-wide; built exception-count and call-site dashboards for incident triage
- Authored alerting and operational runbooks (PagerDuty, queue-depth, health
  checks, heap/JVM); diagnosed incidents including memory exhaustion, GOAWAY
  errors, and autoscaling anomalies
- Enabled S3 encryption-at-rest across assure, execution-history, metering, and
  ops data buckets

DevOps / CI-CD
- Migrated and validated Harness CI/CD pipelines for Trackdoc, Boomi Bus,
  TD-Ingestion, and GraphQL-United
- Automated cloud infrastructure with Ansible (Transit Gateway, Elasticsearch,
  Solace provisioning); replaced manual config generation with a Bazel-driven
  configgen pipeline
- Evaluated Spinnaker UI for CD as Tushar's first project at Boomi (2019);
  influenced the team's CD tooling decision

Collaboration & Growth
- Onboarded and mentored India and Integration teammates (local service setup,
  architecture walkthroughs, pair-debugging race conditions)
- Promoted to Software Senior Engineer; completed AI enablement, Boomi Product,
  and Claude Code training tracks
- Owned the Dell → Boomi rebranding Epic (2021) — purged legacy Dell references
  from email templates, copyright headers, and repositories platform-wide

### Drexel University — Software Developer (iCommons)
**Jan 2016 – Jun 2019**
- Released an Android app (based on Gabriela Marcu's published research) that
  gamifies medication intake via smart reminder notifications and leaderboard points
- Architected, developed, and tested iCommons's work/time-tracking application —
  mobile, backend, and QR-code system — to increase employee accountability
- Built an online class-interaction tool that streamlined sign-ins and increased
  participation in classes, seminars, and conferences

### Susquehanna International Group, LLP (SIG) — Software Developer
**Apr–Sep 2018, Apr–Sep 2019, Bala Cynwyd, PA**
- Built a configurable email-monitoring system that made incident-acknowledgment
  time instantaneous by paging developers from alert-triggered emails
- Designed and implemented a real-time trade-statistics view, saving thousands of
  man-hours and improving traders' profit/loss analysis accuracy
- Developed an internal CRM for derivative pricing, letting traders configure
  pricing schemes
- Built a web app visualizing data flow for expected price calculation of equities

### Projects & Awards
- **FlickDeals** (Drexel Senior Design) — Led a team of five to ship a
  cross-platform (iOS/Android) app connecting local businesses with nearby deals
- **Busbuddy** (Philly Codefest 2016, Top 10) — Real-time shuttle tracker with a
  location-aware "when to leave" alert system
- **iFamily Alexa App** (Philly Codefest 2017, Two Sponsor Awards) — Alexa app
  aggregating family updates from social media, Google Calendar, and location

---

## Project Stories (STAR format)

### Story 1 — Catching network conflicts before they cause outages (Transit Gateway)
- **Situation:** Boomi's platform required dozens of cross-account, cross-region
  AWS Transit Gateway connections linking services to the messaging bus. Address
  range (CIDR) conflicts between environments could silently cause routing
  outages once deployed to production.
- **Task:** As the team's go-to engineer for this connectivity, prevent those
  conflicts from ever reaching production.
- **Action:** Authored region-peering Ansible playbooks to standardize setup, and
  built CIDR conflict pre-validation tooling that checked proposed network ranges
  against existing allocations *before* provisioning.
- **Result:** The tooling caught conflicts proactively across dozens of TGW
  setups and prevented routing outages in production — turning a recurring
  source of incidents into a solved problem.

### Story 2 — Cutting service-recovery toil by 95% (failed-document automation)
- **Situation:** Recovering failed documents on the Boomi platform required a
  developer to manually diagnose the failure, customize a retry, and re-trigger
  processing — every time.
- **Task:** Remove that manual burden so the team could spend less time on
  repetitive recovery work.
- **Action:** Built an automated pipeline that handled the customized
  reprocessing of failed documents end-to-end — diagnosis through retry —
  without requiring manual developer intervention.
- **Result:** Reduced developer time and input on service recovery by 95%,
  freeing the team to spend that time on feature work instead of firefighting.

### Story 3 — Building an AI Anomaly Detection system (proudest work)
- **Situation:** Diagnosing production anomalies across Boomi's platform services
  was a slow, manual process — engineers had to comb through logs and manually
  cross-reference known bugs and documentation to piece together root causes.
- **Task:** Build something that could automate that triage and put the team's
  accumulated institutional knowledge to work at incident time.
- **Action:** Built an AI-powered anomaly detection system that ingests service
  logs, identifies anomalies, and cross-references existing bug documentation to
  surface targeted fix suggestions and configuration changes automatically.
- **Result:** Turned hours of manual log investigation into an automated,
  knowledge-driven triage workflow — making the team's collective debugging
  experience available on demand. The project Tushar is most proud of at Boomi.

### Story 4 — Leading platform security hardening (IDOR / session-context, 2026)
- **Situation:** Several legacy platform resource handlers lacked proper
  authorization context, creating IDOR (Insecure Direct Object Reference) risk —
  a real security exposure flagged as part of a 2026 platform security initiative.
- **Task:** Lead the effort to harden these resources without breaking the
  services that depended on them.
- **Action:** Wrapped legacy handlers in proper session/authorization context,
  audited and removed deprecated data structures that had masked the gap, and
  drove the work as the named owner of that piece of the initiative.
- **Result:** Closed a real IDOR exposure across platform resources and left the
  codebase in a more defensible, auditable state — on top of a broader security
  track record (Snyk/FedRAMP/CSPM remediation, JWT enforcement, KMS/secrets
  delivery) that's kept the platform in continuous compliance.

---

## Background — Career Goals & Work Style

Tushar is a backend/platform engineer with 6+ years at Boomi spanning Java
microservices, AWS cloud infrastructure, security remediation, and SRE/observability
work. Recurring threads in his work: owning ambiguous, cross-team infrastructure
problems end-to-end (networking, messaging platforms, security hardening),
building tooling that prevents problems proactively rather than reacting to them,
and mentoring teammates along the way.

What drives him is getting to use new technology to automate things and make
people's work a little easier — finding the thing that costs a team real time or
headaches and building something that fixes it. He gets genuinely motivated when
he's learning a new stack and applying it to a real problem. He's looking for a
role where he can be challenged, stay excited about what he's building, and be
compensated fairly for the experience and skills he brings.

---

## FAQ

**What's your strongest project or piece of work?**
The project Tushar is most proud of at work is an AI Anomaly Detection system he
built that can parse through service logs, detect anomalies, and cross-reference
existing bug documentation to surface targeted fix suggestions and configuration
changes — essentially turning the team's accumulated knowledge about known issues
into an automated triage tool. Outside of work, he also built a full inventory
management system from scratch for his parents' liquor store: no spec, no team,
just a real problem and a working solution he's genuinely proud of.

**What tools/technologies do you use day to day?**
Java (8→17), Spring Boot, AWS (ECS, Transit Gateway, KMS, Secrets Manager,
OpenSearch, Lambda, Timestream), Terraform/Ansible, Maven, New Relic, Harness
CI/CD, and Solace/messaging systems — see the Skills section above for the
full list.

**What are you looking for in your next role?**
A role that challenges him and keeps him learning — ideally with a modern tech
stack where he gets to use new technology to automate things and solve real
problems. He wants to be excited about the work, have meaningful ownership over
what he's building, and be compensated fairly for his skills and experience.
The throughline: building things that make someone's day a little easier, one
step at a time.

**Why are you considering a move from Boomi?**
Tushar is ready for his next challenge. After 6+ years at Boomi he's grown a
lot, but he's motivated by learning and by getting genuinely excited about what
he's building — and he's looking for a role where a new tech stack, a harder
problem, or a faster-moving environment gives him that next gear. He's also at a
point in his career where he wants compensation that reflects the experience and
skills he's built up.

**What's a weakness or area you're working on?**
Tushar's real weakness is undercommunication — he can get heads-down on a
problem and forget to keep peers fully in the loop, which has occasionally led
to misalignment on the team. Documentation falls in the same bucket: it hasn't
historically been his strong suit. He's been actively working on both — in the
past year he's written significantly more documentation than in any prior year,
and he's more deliberate now about surfacing progress and blockers to teammates
before they become problems.

**How can someone get in touch with you directly?**
Email: chawla.tushar5@gmail.com · LinkedIn: linkedin.com/in/chawlatushar5 ·
GitHub: github.com/chawlatushar5 · Resume: available for download from this site.

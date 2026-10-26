# SONTAN ROKKHA — Complete Product, Engineering & AI-Agent Build Blueprint

**Document 01 of 02** · Version 1.0 · Research checked: **19 October 2026**  
**Product:** Sontan Rokkha / সন্তান রক্ষা · **Category:** Transparent, parent-managed family safety and digital wellbeing  
**Reference product:** AirDroid Parental Control ([product site](https://www.airdroid.com/parental-control/), [Google Play listing](https://play.google.com/store/apps/details?id=com.sand.airdroidkidp&hl=en))  
**Companion document:** `Sontan_Rokkha_02_Figma_AI_Neumorphism_Parent_Friendly_UX_Master_Prompt.md`

> **Primary mandate:** Build an original, reliable, production-grade parental-control platform with feature coverage inspired by AirDroid, but **not** a visual or code clone. Child safeguarding, transparency, applicable law, and OS/store rules take precedence over identical feature behavior. Do not simulate an unsupported capability or claim an untested feature is “working.”

---

## 0. Decisions that make this blueprint executable

This brief assumes (rather than requires the founder to answer immediately):

- **Initial market:** Bangladesh-first with an international-ready architecture; **Bangla and English** from day one. Additional locales later.
- **Personas:** an adult parent/guardian (primary account), a supervised child/teen (companion device), a permitted co-guardian, a support/admin operator with **no default access to child surveillance data**.
- **Initial device targets:** parent on Android and iOS; supervised Android device first; supervised iOS device in a subsequent entitlement-gated track. Parent web console and internal operations console can follow.
- **Launch strategy:** a dependable family-safety **MVP**, then advanced features in staged releases. “Complete platform” means foundations, explicit future modules, interfaces, tests, flags and release gates, **not** pretending OS-blocked features can ship unchanged.
- **Business model hypothesis:** ad-free freemium + family subscription. Validate pricing locally instead of inventing current market pricing.
- **Proposed stack:** Flutter 3.x / Dart for parent app; native Kotlin + Jetpack Compose for Android child companion; native Swift + SwiftUI + Apple Screen Time frameworks for iOS child track; NestJS / TypeScript + PostgreSQL + Redis + object storage for backend; Next.js for optional web/admin; Firebase Cloud Messaging and APNs for delivery. Versions must be pinned to currently compatible stable releases by the build agent at implementation time.
- **Store reality:** Target **Android API 36+** for new/update submissions under Google Play’s rules effective **31 August 2026**, subject to checking latest requirements at submission. iOS controls require Apple’s Family Controls entitlement approval. **No store approval is guaranteed.**

### 0.1 Ethical product posture / non-negotiables

1. The app must be visibly installed, identifiable, and disclosed to the supervised device user. **No secret surveillance, concealed icon, stealth location tracking, covert microphone/camera activation, call interception, keylogging, exploit, privilege escalation, rooting/jailbreak, OS-warning bypass or hidden APK delivery.**
2. Only parent/guardian-to-minor supervision is in scope. Do not market for spouses, partners, coworkers or other adults.
3. Design age-appropriate transparency: explain **what the parent can see**, **when**, **why**, and **how to request a change**. Teens receive more privacy-preserving defaults.
4. Every sensitive feature requires a documented legal/policy basis, feature-specific disclosure, appropriate authorization, on-device visibility and revocation pathway. Permissions are requested **just in time**, never as one blanket page.
5. Keep SOS, emergency contacts, emergency dialing, critical communications and age-appropriate safety functions available during restrictions wherever the OS permits. Never promise OS-level emergency-call interception.
6. Collect less: summaries instead of raw messages/screenshots; process sensitive material on-device when possible; encrypt, minimize retention, respect deletion.
7. Do not reproduce AirDroid branding, exact artwork, screenshots, copy or proprietary implementations. Use AirDroid only as a **functional benchmark**.

---

## 1. Research-grounded competitor inventory

AirDroid’s October 2026 product site lists Android-oriented live screen mirroring, remote camera, ambient audio, notification sync, social-content detection, image detection, calls/SMS, AI chat monitoring, web filtering, app limits, downtime, location/route history/geofences, SOS, driving safety, usage reports, alerts and family chat. The store description additionally advertises battery monitoring and family-device pairing. Its own compatibility table shows **different Android and iOS coverage**, not feature parity. [R1][R2]

### 1.1 Feature feasibility matrix — **Sontan Rokkha**

Legend: **BUILD** = implement with ordinary documented capabilities; **PERMISSION** = requires user/granted special access and can degrade; **REVIEW** = store entitlement/approval and/or API/region/OEM constraints; **REDESIGN** = offer a safer transparent substitute, not identical behavior; **NOT PROMISED** = do not claim general availability.

| Competitor-like capability | Android child plan | iOS child plan | Product decision / limitation |
|---|---|---|---|
| Parent dashboard / multi-child switch | BUILD | BUILD | One view per child, last sync and capability status |
| Parent-child binding code / QR | BUILD | BUILD | Short-lived, one-time, guardian authenticated; approve on child device |
| Location now / last known | PERMISSION + REVIEW | PERMISSION + REVIEW | Never label stale location “live”; OS and Families rules gate launch |
| Arrival/departure safe places | PERMISSION + REVIEW | PERMISSION + REVIEW | Geofences are best effort; meaningful radius and debounce |
| Route history | PERMISSION + REVIEW | PERMISSION + REVIEW | Off by default; short retention; pause visibility; avoid excessive polling |
| SOS / family check-in | BUILD | BUILD | Foreground child-initiated, multiple delivery fallbacks; emergency dialer |
| Device battery / connection status | BUILD | BUILD (available data only) | Estimated battery and freshness, not guaranteed instant |
| App usage summary | PERMISSION | REVIEW | Android UsageStats; Apple Device Activity privacy limits |
| Daily app limits, downtime, focus | PERMISSION + REVIEW | REVIEW | Local policy engine; Apple FamilyControls / ManagedSettings |
| App allow/block list | PERMISSION + REVIEW | REVIEW | Scope-limited; not universal system-level control on consumer Android |
| “Instant” pause | PERMISSION + REVIEW | REVIEW | Foreground effective after sync; offline command queued; allow essentials |
| App installs / removal events | PERMISSION + REVIEW | REVIEW / limited | Respect package visibility; some events limited by platform |
| Web categories, deny/allow list | PERMISSION + REVIEW | REVIEW | Optional, disclosed VpnService/DNS on Android; shield tokens on iOS |
| Browser history | REVIEW / optional | REVIEW / limited | Browser/extension-supported only; never invent universal visibility |
| Notification-based safety alerts | PERMISSION + REVIEW | NOT PROMISED | Opt-in NotificationListenerService; redact, filter, 48h maximum raw TTL |
| Bullying/scam/inappropriate signals | REVIEW / optional | REVIEW / optional | On-device signals, confidence + false-positive review; no universal chat access |
| Calls and SMS content / log | **NOT PROMISED** | **NOT PROMISED** | Google restricted SMS/call-log policy; no evasion via Accessibility |
| Live screen viewing | REDESIGN / REVIEW | NOT PROMISED | Child-initiated, visible per-session MediaProjection + explicit OS consent |
| Remote camera / one-way audio | REDESIGN | NOT PROMISED | **Visible, child-accepted family safety check-in only**; no covert access |
| Gallery image scanning | REVIEW / opt-in | REVIEW / opt-in | User-selected content or permitted on-device safety review; no hidden sweep |
| AI-chat monitoring across other apps | NOT PROMISED | NOT PROMISED | No universal access to third-party encrypted conversations |
| Driving safety | REVIEW / later | REVIEW / later | Opt-in activity-based safety reminders only; validate detection accuracy |
| Private family chat | BUILD | BUILD | Only linked family members, anti-abuse report and delete options |
| Co-guardian invitation | BUILD | BUILD | Different roles and explicit approval; auditable access |
| Weekly report / routines / tips | BUILD | BUILD | No judgmental child-scoring or manipulative guilt |
| Paywall/subscription | BUILD | BUILD | Billing compliance, fair trial and purchase restoration |

**Critical compliance caveat:** Google Play’s Families policy explicitly states that **apps solely targeting children may not request location permission or collect precise location**. A companion installed on a child’s device and seeking precise location requires a **formal product classification/policy/legal review before any Play Store submission**. Do **not** assume a parent authorization flow overrides this restriction; do **not** misdeclare the intended audience to evade it. If approval is uncertain, launch the otherwise compliant screen-time/SOS offering without the affected location collection until the distribution strategy is cleared. [R3]

### 1.2 Competitive differentiation (original design)

- A calmer **“What matters today?”** dashboard, with 1–3 actionable items, not a surveillance control room.
- **Transparent Family Agreement**: parents choose expectations, child sees them in simple language; show when a rule was changed and why.
- **Permission & Reliability Center**: traffic-light statuses with “Fix on child’s phone” walkthrough, last-updated timestamp, per-device OEM limitations.
- **Request More Time** loop, with optional reason, push notification, quick approve/decline, automatic expiry and no humiliation.
- **Bangla-first microcopy**, low-end Android performance and low-data operation, tolerant of intermittent connectivity.
- **Privacy tiers by age**: protect younger children through stronger boundaries; move toward autonomy for teens with alerts/summary rather than raw feeds.
- **No ads and no sale of child data**, simple data export and deletion.

---

## 2. Scope, outcomes and definition of success

### 2.1 Main jobs to be done

**Parent:** “I want to know my child is safe, set clear digital routines and deal with real risks in fewer taps without becoming a technical expert.”

**Child:** “I need understandable limits, reassurance that SOS will work and a respectful way to ask for more time or correct an inaccurate rule.”

**Co-guardian:** “I can help with safety according to permissions, without accessing everything the primary parent sees.”

### 2.2 Release phases

| Phase | Shipping scope | Entry / exit gate |
|---|---|---|
| **P0 — Feasibility & policy** | Store-policy dossier, app identities, data inventory, parental authority flow, Android/iOS API proof-of-concepts, threat model, design tokens | Legal/policy review of location + child-audience restrictions; test each privileged API on physical phones |
| **P1 — Trustworthy MVP** | Adult account, role-bound family, child pairing, child disclosure, dashboard, device status, SOS, check-in, family chat, notifications, battery, local policy engine framework, settings/privacy/deletion, admin audit, bilingual UX | Security, permissions, offline, accessibility and release tests pass |
| **P2 — Digital wellbeing** | Usage summaries, daily limits, bedtime/school/focus schedules, app groups, requests, exceptions, weekly insights, Android scoped enforcement | Permission/Accessibility/usage-feature approvals where required; OEM tested |
| **P3 — Location safety** | Last-known location, safe zones, route-history opt-in, arrivals/departures | **Only after** child-targeted Play policy, privacy and location permission/distribution approval |
| **P4 — Online safety** | Domain allow/deny lists, category filtering via compliant stack, approved notification alerts, on-device risk signal tests, safe browsing reminders | VPN/Accessibility/package visibility declarations and privacy review; no unsupported chat interception |
| **P5 — iOS child + advanced** | Swift FamilyControls, DeviceActivity, ManagedSettings, parity-aware parent UI, optional child-approved live assist sessions, family web portal | Apple entitlement approval and per-feature OS/store review |

**Do not release a skeleton as if P1–P5 are complete.** Ship only capability-tested features and list “planned/unsupported” states clearly. P0 risk may force reordering; maintain a feature flag and release decision record per capability.

### 2.3 Product metrics (goals, not invented current measurements)

- Pairing success: target **≥90%** of eligible, supported devices in guided onboarding tests.
- New-parent success: parent creates bedtime rule and receives acknowledgement in **≤3 minutes** in moderated usability sessions.
- Safety message: target push acknowledgement **≤30 seconds** on healthy connected test devices (measure p50/p95, never guarantee delivery).
- Rule sync: p95 server-to-child **≤10 seconds** while foreground/online; longer when OEM battery restrictions apply.
- No false “live” claims: **100%** location and control cards show accurate freshness and pending/failed states.
- Zero unreviewed high-risk permissions in production. Zero unauthorized cross-family data disclosures.
- UX accessibility: WCAG 2.2 AA-inspired checks, ≥4.5:1 normal text; 200% font-scale QA and screen-reader testing.

---

## 3. Information architecture and complete screen roster

**Parent mobile navigation:** Home / Location / Rules / Alerts / Family. Profile/Settings accessible from the Home header; each child has its own context and controls. Show Location tab only when legally and technically available, otherwise a documented alternative “Check-ins.”

**Parent screens** (every screen also has loading, no-data, offline, permission-denied and error states):

1. Welcome, choose language, value proposition, privacy promises.
2. Parent registration/login (email/password and approved SSO), email verification, MFA, recovery.
3. Explain parent role and authority; create family; add child profile/age band (avoid full DOB unless required).
4. Pair child instructions, QR / numeric short-lived code, expiry and resend, troubleshooting.
5. “Child connected” celebration and permission health checklist.
6. Home multi-child overview, child switcher, individual status hero, quick safety action.
7. Child overview detail, quick controls, recent activity, status freshness and emergency action.
8. Location overview/map, privacy controls, location-freshness error states, last-known detail.
9. Geofence list, add/edit home/school zone, arrival alerts, history and permission rationale.
10. Routines overview, daily screen time, app usage, app detail, app category groups.
11. Daily limit editor, weekly schedule builder, downtime, focus mode, essential-app allowlist.
12. Rule preview, confirm, command pending, applied/failed details, undo/exception.
13. Requests inbox, approve once, approve for time, decline with optional kind explanation.
14. Alerts inbox with severity and type filters, alert detail, detection context and false positive.
15. Family chat, contact guardians, child check-ins/SOS events and delivery status.
16. Family accounts, co-guardian invite/manage/revoke, security history.
17. Device management, battery/network, permissions health, fix-it walkthrough, re-pair.
18. Privacy center (data categories, retention, opt-ins), export, unpair, account deletion.
19. Subscription/pricing/free trial/payment restore (only once product rules finalized).
20. Help/FAQ, report issue, diagnostic export with sensitive-data redaction.

**Child companion screens:** explicit disclosure, choose language, enter pairing code and device confirmation, safety overview (“Your family can see…”), permission education/hand-off, permission health, current rules, blocked-by-rule explanation, request more time, SOS, check-in, family chat, privacy and sharing visibility, pause/revoke controls as permitted, help, unpair support.

**Admin/operator console:** aggregate health and release metrics, app versions, support tickets with masked identifiers, feature flags, consent audit ledger, deletion jobs, abuse handling; **no default viewer for raw location, microphone, notification bodies or child chat**. Sensitive support actions require approval + time-bound audited access where legally justified.

---

## 4. User journeys and lifecycle state machines

### 4.1 Setup and binding

1. Parent creates verified adult account → creates household → selects “Add child” → sees what each capability needs, not a blanket permissions request.
2. Server creates one-use enrollment token scoped to family/child; short expiry (recommend 10 min), cryptographically random; display QR + human entry code and countdown.
3. Child app opens **visible** onboarding, describes supervision and who can access information; approved adult completes setup with child involved in an age-appropriate manner.
4. Child app sends code and device attestation where available → server validates token/TTL/redeemed status, signed-in parent, challenge binding, device identity; issues rotating device credentials securely.
5. Parent sees verification word / device name; child sees parent identity and monitoring categories; both agree to pairing as legally required.
6. Scope permissions in contextual order; each step explains need, data flow, how to disable, “Not now,” and impact of refusal.
7. End at Device Health: `connected`, `paired_pending_permission`, `offline`, `restricted`, `action_needed`, `revoked`, `unpaired`.

**Security cases:** 5 failed code attempts → rate limit; replay code → reject; family change → re-verify; lost parent session → invalidate invitations; child reset/reinstall → re-enroll with adult authorization; co-guardian cannot silently pair new devices.

### 4.2 Rule update / request loop

Parent creates rule → server stores versioned desired state → child receives FCM/websocket wake-up (never as sole source of truth) → child fetches signed, authorized policy → validates freshness/version → persists local rules atomically → applies permitted control or records inability → returns ack / effective state → parent receives `Pending`, `Applied`, `Partially Applied`, `Could Not Apply` and “why”. On offline devices, local previously acknowledged schedules continue; updates wait for sync. Do not show “blocked now” before actual child acknowledgement.

Child requests extension → server creates request with expiry / safety limits → parent notification → parent approves or declines → versioned temporary policy exception with audit → child applies exception → expire deterministically, regardless of backend reconnect.

### 4.3 Location / geofence loop (post-policy approval only)

Child opts into appropriately disclosed location capability as legally required → local location updates via documented APIs respecting Android background policy → limited-rate reporting / accuracy field / timestamp → parent sees latest **timestamped** point and uncertainty; zones produce deduplicated entry/exit events with dwell time/hysteresis and clear “not guaranteed” language. No indefinite continuous high-frequency tracking.

### 4.4 SOS loop

Child holds SOS 2 seconds → sees countdown and cancel → attempts backend high-priority event + push to linked guardians; UI shows delivered / not confirmed; offers OS dialer for emergency contact and offline emergency instructions. Never rely on cloud or permission grant as sole emergency channel. Notify parent with child/device identity and last-known position **only if legitimately available**. Log acknowledgements; support accidental-SOS dismissal.

---

## 5. Technical architecture

```text
Parent Flutter (Android / iOS)             Optional Parent Web / Admin (Next.js)
            | TLS/HTTPS + Auth JWT                           |
            +---------------------+--------------------------+
                                  |
                      API Gateway / NestJS modular API
          +-------------+------------+-------------+--------------+
          | Auth/Family | Device     | Policies    | Safety       |
          | & RBAC      | Enrollment | & Requests  | & Check-ins  |
          +-------------+------------+-------------+--------------+
          | Notification & Events    | Billing     | Audit        |
          +--------------------------+-------------+--------------+
                    |            |          |            |
                PostgreSQL      Redis      FCM/APNs     Encrypted object store
                    |                          |
       Android child Kotlin + Room <----------+  iOS child Swift + extensions
          (local policy executor)               (Apple family entitlements)
```

- **Backend:** NestJS monorepo modules rather than premature microservices. OpenAPI 3.1, generated typed clients, schema migrations, distributed job workers, transaction outbox and idempotency.
- **Relational store:** PostgreSQL with composite family/tenant scope, partial indexes, row level security where appropriate, soft-deletion only where necessary; use explicit deletion cascade workflow.
- **Device cache:** Android Room + SQLCipher/Keystore-backed secrets as appropriate; encrypted DataStore settings; iOS Keychain + App Group storage with minimal content.
- **Push:** FCM/APNs for hints/alerts; API remains source of truth. Push tokens rotated; no sensitive message text in locked-screen notifications by default.
- **Realtime:** WebSockets/SSE for current state; always fall back to polling and local policy enforcement.
- **Maps:** provider abstraction (Google Maps/Mapbox/OSM-licensed option), map API key restricted; map alone must not receive persistent identifying child data unnecessary for rendering.
- **Notifications:** non-critical queued and batched; SOS high-priority with ack and escalation options.
- **Storage:** only if truly needed; never default store raw screen, audio, full messages. Define max object size and TTL.
- **Observability:** OpenTelemetry traces, structured logs scrubbed for PII, crash reporting approved for child-directed context, dashboards by app/OEM/version.
- **Payments:** Google Play Billing/Apple In-App Purchase via verified server receipts where required; webhook event idempotency, billing grace states and restore.
- **Infrastructure:** Docker, Terraform, CI/CD, staging+prod isolation, managed secrets/KMS, separate VPC/network segmentation, backups and recovery drills.

### 5.1 Suggested repository tree

```text
sontan-rokkha/
  README.md  docs/  LICENSE  .github/workflows/
  apps/
    parent_flutter/            # Flutter clean-architecture feature modules
    child_android/             # native Kotlin/Compose, local controls and consent UI
    child_ios/                 # SwiftUI + ScreenTime extensions (gated)
    parent_web/                # Next.js (optional)
    ops_admin/                 # next-stage backoffice
  services/
    api/                       # NestJS modules: auth, families, enrollments, policies...
    worker/                    # notifications, retention, reports
  packages/
    api_contracts/             # OpenAPI + generated DTOs
    design_tokens/             # Figma ↔ Flutter/web token exports
    i18n/                      # en/bn strings, placeholders, locale QA
    policy_rules/              # shared rule schema/test fixtures
  infra/                       # Docker, IaC, CI, monitoring, deploy
  tests/
    contracts/ e2e/ security/ compliance/ performance/ accessibility/
  assets/brand/                # original assets; no competitor assets
```

### 5.2 Domain modules and core objects

| Module | Main entities | Critical invariants |
|---|---|---|
| Identity | `users`, `sessions`, `mfa_factors` | Parent verified and MFA for sensitive role changes |
| Household | `families`, `family_members`, `guardians`, `child_profiles` | Parent/guardian claim verified, family isolation |
| Enrollment | `pairing_codes`, `devices`, `device_keys`, `consent_records` | Single-use short expiry, child disclosure, revoke immediately |
| Control | `policies`, `policy_versions`, `policy_targets`, `command_outbox`, `command_acks` | Version monotonic, local ack reflects effective status |
| Activity | `usage_daily`, `usage_per_app`, `device_heartbeats` | Minimize per-app records; redact / TTL |
| Safety | `checkins`, `sos_events`, `locations`, `geofences`, `geofence_events` | Location tables disabled until policy gate; timestamp+accuracy |
| Social | `family_conversations`, `family_messages` | Only family membership; no stranger discovery |
| Decisions | `time_requests`, `temporary_exceptions`, `alerts`, `alert_receipts` | Expiry, audit, idempotent approve |
| Governance | `consents`, `access_audit`, `privacy_requests`, `deletion_jobs` | Data subject flows and reviewer logs |
| Commerce | `entitlements`, `subscriptions`, `billing_events` | Server-side validation; no client-paid flag trust |

Recommended DB fields (example—not the whole schema):

```sql
CREATE TABLE families (
  id uuid PRIMARY KEY,
  display_name text NOT NULL,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE devices (
  id uuid PRIMARY KEY,
  family_id uuid NOT NULL REFERENCES families(id),
  child_profile_id uuid NOT NULL,
  platform text NOT NULL CHECK (platform IN ('android','ios')),
  installation_public_key text NOT NULL,
  capability_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
  last_seen_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE policies (
  id uuid PRIMARY KEY,
  family_id uuid NOT NULL REFERENCES families(id),
  device_id uuid NOT NULL REFERENCES devices(id),
  version bigint NOT NULL CHECK (version > 0),
  rules_json jsonb NOT NULL,
  updated_by uuid NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(device_id, version)
);
CREATE TABLE command_acks (
  id uuid PRIMARY KEY,
  device_id uuid NOT NULL REFERENCES devices(id),
  policy_version bigint NOT NULL,
  command_id uuid NOT NULL UNIQUE,
  status text NOT NULL CHECK (status IN ('applied','partial','failed')),
  reason_codes text[] NOT NULL DEFAULT '{}',
  acknowledged_at timestamptz NOT NULL
);
```

All sensitive tables require tenant-scope predicates and audit controls; above SQL omits secondary indexes, FKs and access policies for brevity. Never use an insecure globally incrementing ID for device pairing.

### 5.3 Minimum API contract (version `/v1`)

| Method | Endpoint | Responsibility |
|---|---|---|
| POST | `/auth/register`, `/auth/login`, `/auth/refresh`, `/auth/logout` | verified adult auth / token rotation |
| POST | `/families` | create household |
| GET | `/families/:id/children` | parent-scoped children |
| POST | `/children` | register child profile |
| POST | `/pairings` | short-lived code; parent only |
| POST | `/pairings/redeem` | prove possession, bind child device |
| POST | `/devices/:id/consent` | permission/consent audit snapshot |
| GET | `/devices/:id/capabilities` | truthful effective capabilities |
| GET | `/devices/:id/status` | last seen, battery, permission health |
| GET/PUT | `/devices/:id/policy` | ETag/If-Match and versioned rule state |
| POST | `/devices/:id/acks` | device reports applied version/reasons |
| POST | `/devices/:id/requests` | more-time request |
| POST | `/requests/:id/decision` | guardian approves/declines, idempotent |
| POST | `/devices/:id/checkins` | child-owned status check-in |
| POST | `/devices/:id/sos` | child-owned SOS; rate-limited abuse controls |
| GET | `/devices/:id/usage?range=` | minimized usage aggregates |
| GET | `/devices/:id/locations/latest` | only when legal gate + consent active |
| POST | `/devices/:id/locations` | gated child GPS report |
| CRUD | `/devices/:id/geofences` | gated zones |
| GET/POST | `/families/:id/messages` | only linked guardians/child |
| GET/PATCH | `/alerts`, `/alerts/:id` | receipt/ack + filters |
| GET | `/me/privacy/export` | portable export job |
| DELETE | `/me` | legal deletion workflow + audit |

**Contract rules:** JWT short lifetime, refresh-token rotation, device asymmetric credentials, RBAC on every resolver, family scoping and explicit feature entitlement, request IDs, deterministic errors and retry hints, no raw sensitive contents in URL/query parameters, schema validation, request rate limits, pagination, ETag and idempotency keys for writes. Return machine-readable `unsupported`, `permission_denied`, `policy_review_pending`, `offline`, `stale`, `awaiting_device_ack` states.

### 5.4 Policy engine model and conflict resolution

```json
{
  "version": 18,
  "timezone": "Asia/Dhaka",
  "activeFrom": "2026-10-20T00:00:00+06:00",
  "rules": [
    {"id":"bedtime-1","type":"downtime","days":[0,1,2,3,4,5,6],"from":"21:30","until":"06:30","exemptions":["emergency","family_chat"]},
    {"id":"games-1","type":"daily_app_category_limit","category":"games","minutes":60},
    {"id":"education-1","type":"allow_category","category":"education"}
  ],
  "extensions": []
}
```

- Time rules are locally evaluated; timezone + DST-safe intervals (even though Bangladesh currently has no DST); clock-drift and timezone-change handling tested.
- Precedence: **emergency/system essential > child safety access > legal/platform restrictions > guardian-approved one-time exception > explicit allowlist > downtime > category/app limit > default allow**. Record conflicts with explanation.
- Server “desired policy” is **not** device “effective policy.” Device returns applied subset and standardized failure reasons.
- No accidental blanket lockouts. Protect OS settings needed for safety and basic communication; validate platform-specific allowlists carefully.
- Local event aggregation and encrypted offline queue; cap queue length, delete oldest low-risk events first, prioritize SOS/control receipts.

---

## 6. Android engineering implementation: native child companion

### 6.1 Permissions — narrowly tailored, never bundled

| Feature | Android capability | Consent/restriction |
|---|---|---|
| Usage history | `UsageStatsManager` with `PACKAGE_USAGE_STATS` access through Settings | Special access; show manual instruction + verified state; sampling intervals and OEM caveats |
| App enforcement | scoped `AccessibilityService` only if genuinely necessary and Play-approved; optional OS-managed APIs where available | Separate prominent disclosure, Accessibility declaration; **do not** claim `isAccessibilityTool=true` unless genuinely disability-facing; must not circumvent platform privacy |
| Installed apps | scoped package `<queries>` first; `QUERY_ALL_PACKAGES` only after approved purpose/declaration | Sensitive installed inventory; permission can be rejected |
| Notifications risk hints | `NotificationListenerService` granted in Settings | On by explicit opt-in; redact OTPs, intimate content, banking and private info; don't promise encrypted chat reading |
| Web restrictions | opt-in `VpnService` or approved DNS/local classification | Mandatory VPN declaration, disclosure, encryption and graceful coexistence with existing VPNs; no HTTPS interception or TLS MITM |
| Safety location | Fused Location Provider/geofencing + foreground/background permissions as legitimately approved | **Do not implement in production until Play Families classification/location restriction reviewed and cleared** |
| SOS | local UI, push via FCM, Android `ACTION_DIAL` for contacts | No call-log / SMS-reading permission |
| Visible screen-sharing | `MediaProjectionManager` user prompt per session; foreground service `mediaProjection` where required | **Child-initiated, consented single session**; Android 14+ requires fresh consent each session; never stealth mirror |
| Family video/audio check-in | user-visible in-app WebRTC call with runtime mic/camera | Foreground and active child acceptance; OS camera/mic indicators; no ambient covert listening |
| Device status | `BatteryManager`, connectivity APIs; scheduled WorkManager | Battery optimizations can delay updates; “last seen” is not “online now” |

### 6.2 Android-specific OS reality

- Starting camera/microphone foreground services from the background is restricted, notably on Android 14+. A parent push notification does **not** silently grant child device camera/mic access. [R6]
- MediaProjection on Android 14+ requires device consent **for each capture session**; cannot reuse capture tokens. [R7]
- Accessibility has strong Play restrictions. It must not bypass OS security prompts or be used for unrelated app spying. Prefer usage APIs for usage data and narrowly scoped intervention only when reviewed. [R8]
- Background tasks may be delayed or terminated by OEM restrictions; do not ask parents to disable system security safeguards as a hidden prerequisite. Provide candid diagnostics.
- Android package visibility, VPN, notification-listening and location capabilities each carry policy/declaration obligations; document every Play Console form and demo video. [R9][R10][R11]
- Cross-device communication occurs only over HTTPS and authenticated channels. No default open local TCP ports, accessibility-driven “remote control,” insecure ADB tricks or device admin coercion.

### 6.3 Feature implementation contracts

**Usage accounting:** Query coarse usage in bounded windows; compute per-app daily aggregates on child device; handle app switching, timezone midnight, reboot, multi-window and missing access. Display total only if accounting confidence is acceptable.

**Enforcement:** Rule engine publishes a friendly, locally rendered shield when an approved approach can actually respond to foreground app events. Never label ordinary foreground app navigation as foolproof OS blocking. Add `enforcement_quality` (`strong`, `best_effort`, `unavailable`) and user-visible explanation. Device owner mode is **not** presumed available to ordinary family phones.

**Web filtering:** start with an optional limited DNS/domain approach, not a universal content inspection promise. Filter by host/category where observable, avoid logging full URLs unless justified, preserve TLS confidentiality, validate collision with work/school VPNs and encrypted DNS/private DNS constraints.

**Safety notification insights:** install allowlist per app; user chooses categories; on-device scanner recognizes signal patterns, stores hashed or minimally redacted evidence, sends *category + confidence + safe explanation* not full text by default. Reject sensitive banking/OTP/password data; TTL ≤48h if any temporary notification content must be retained; opt out/delete immediately. AI classifier is advisory, never a disciplinary verdict. Avoid classifying or profiling protected characteristics.

**Family communication:** child can message only approved family members; searchable stranger chat is out of scope; send receipts and abuse reporting. Push content hidden on lock screen by default.

---

## 7. iOS supervised-device engineering: separate, realistic track

- Build native iOS child target with **FamilyControls**, **DeviceActivity**, **ManagedSettings** and relevant extensions (`DeviceActivityMonitor`, `ShieldConfiguration`, `ShieldAction`). Do not try to replicate Android Accessibility/VPN tricks on iOS.
- Apply for Apple’s **Family Controls entitlement** before release. For child Family Sharing authorization, an approved parent/guardian in the same Family Sharing group is required; enrollment must follow Apple sheets and rules. [R12]
- Rules can use app/site tokens and device activity thresholds/schedules. Opaque activity tokens preserve privacy; the parent UI must not assume a universal list of actual third-party app names or full browsing history. [R13][R14]
- Location, when allowed, uses Core Location and separate opt-in with platform review. Do **not** claim arbitrary third-party app notifications, encrypted chat, camera access or screen mirroring can be retrieved from another iPhone.
- iOS build can start when entitlement is requested, but do not promise the shipping feature until **approval and device tests**.

---

## 8. Safety, privacy, governance and security requirements

### 8.1 Legal/store signoff checklist — blocking before launch

- [ ] Independent counsel/product-policy review on Google Play Families **child-targeted precise-location restriction** and the legitimate scope of the supervised companion. Avoid audience misdeclaration. [R3]
- [ ] Google Play child-monitoring metadata `android:value="child_monitoring"` in applicable child-monitoring manifests, store listing monitoring disclosure, visible app icon and persistent notification when monitoring according to applicable Play rule; verify scope for each artifact. [R4]
- [ ] App target API requirement (Android 16/API 36+ for ordinary new/update submissions as of Oct 2026) verified immediately before release. [R5]
- [ ] Accessibility (if requested) Play declaration, demonstration video, narrow use, up-front affirmative permission. [R8]
- [ ] VpnService (if included) disclosure and Play declaration, encrypted traffic, no monetization or interception. [R10]
- [ ] `QUERY_ALL_PACKAGES` only with explicit core use justification, review and approval. [R11]
- [ ] Background location (if approved) disclosure, declaration, benefit, in-app and Store listing alignment. [R15]
- [ ] Do **not** use `READ_SMS` / `READ_CALL_LOG` without a policy-approved restricted-use case; default solution excludes both. [R16]
- [ ] Apple FamilyControls entitlement approval and accurate age-appropriate data practices. [R12]
- [ ] Verify applicable law: Bangladesh privacy and child protection, COPPA for U.S. child data where relevant, GDPR/UK GDPR where relevant, and age-of-consent rules; have counsel sign off. Do not claim compliance solely from implementing a checklist.
- [ ] Store metadata, Privacy Policy, Terms, deletion webpage, Data Safety, analytics SDK declarations and accurate reviewer demo/test account prepared.

### 8.2 Data classification, defaults and retention proposal

| Data class | Collection default | Draft retention / handling |
|---|---|---|
| Parent identity/email | Necessary for account | Until verified deletion/legitimate obligations |
| Child first name / age band | Minimum necessary | Until child profile deletion |
| Device credentials | Necessary for pairing | Rotated; revoke instantly, destroy on unpair |
| Aggregate app usage | Optional for parental control | Rolling **30 days**; exportable / configurable |
| App list | Only if permitted/needed | Current snapshot, no advertising profile |
| Current/last-known location | **Off pending compliance gate** | Short-lived; avoid indefinite precise history |
| Historical route points | **Off pending compliance gate** | Suggested **7 days** default, adjustable shorter |
| Notification risk content | Off by default | On-device preferred; temporary raw data auto-expire **≤48h** |
| Family messages | Family-controlled | Until user/family deletion; implement configurable retention |
| SOS/check-in | Child-initiated | Short, justified safety audit TTL |
| Audit logs | Required access records, not child contents | 90 days proposed, legal review |
| Analytics/crash reports | Privacy-preserving opt in where required | Aggregate, identifier-minimized, separate consent |

All TTLs are **proposals** requiring legal signoff, not statements of legal requirements. Design self-service delete, export, unlink and consent change propagation. No data sale, behavioral advertising, third-party trackers in child app, or default training of AI on children’s contents.

### 8.3 Security controls

- TLS 1.3 where supported, secure certificate validation; secrets in platform secure stores and managed KMS, never plain SharedPreferences / hardcoded API credentials.
- Password hashing with Argon2id or managed identity service; refresh token rotation, replay detection, step-up auth for device removal, co-guardian permissions and exports.
- Minimize identities; parent-created child profile without child email; verified family linking; split adult/child token scopes.
- Explicit RBAC: primary guardian, co-guardian (configurable rights), child (own device/check-ins/requests), service, support operator. Enforce resource-level and field-level access on **server**, not only UI.
- Device attestation/integrity signals supplement, **not replace**, credential authentication. Detect cloned device tokens, stale/revoked consent.
- Audit who viewed sensitive child data, exact timestamp and policy justification. User-facing “Who can see this?” page.
- Rate limits for OTP, binding, SOS abuse, requests and message sends; suspicious login notifications; prevent family IDOR/BOLA.
- Encrypt backups, least privilege for DB/queue/object storage, no raw content in exceptions/logs, secret scanning, dependency audit, mobile penetration testing.
- Incident response: severity, user notification, containment, deletion verification, support controls, restoration drills, independent security review.
- **Abuse defenses:** prevent coercive covert onboarding, allow youth to see monitoring notice, refuse adult-to-adult tracking, report misuse, safe unpair/help guidance where lawful, and prompt re-verification on suspicious access.

---

## 9. Internationalization and Bangladesh-first support

- Localization keys, not string concatenation. Provide **native Bangla** and English strings and QA with real Bangla typography (`Noto Sans Bengali` or appropriately licensed alternatives) and Latin UI text (`Inter` or system fonts).
- Set locale at first launch; Android/iOS per-app language support where practical. Dynamic text sizing; ensure long Bangla labels do not overflow. Use Unicode normalization; watch Bangla punctuation and pluralization.
- Default timezone Asia/Dhaka only when inferred/selected; store UTC timestamps and per-family IANA timezone. Parents traveling abroad should not change bedtime unintentionally.
- Support low RAM devices, unstable networks, low battery and limited data; avoid constant high-frequency GPS or video feeds. Cache dashboard and local rules, queue writes with bounded retry/backoff.
- Marketing and UX language: “Peace of mind through clear family rules,” not “spy secretly.” Avoid shame, red panic UI, public child scoreboards and intrusive screenshots.

---

## 10. Figma, design system and design-to-code contract

The sister Figma document is the **single UI source of truth**. Engineering must ingest its token names, Figma frame IDs/links, variants and interaction states before implementing visual screens. Core mapping:

| Design component | Flutter equivalent | Android child | iOS child |
|---|---|---|---|
| `SR/Button/Primary` | `SrPrimaryButton` | `SRPrimaryButton()` Compose | `SRPrimaryButton` SwiftUI |
| `SR/Card/Raised` | `SrNeumorphicCard` | `SRRaisedCard()` | `SRRaisedCard` |
| `SR/Card/Inset` | `SrInsetPanel` | `SRInsetPanel()` | `SRInsetPanel` |
| `SR/State/Capability` | `CapabilityStatus` widget | permissions health row | entitlement status row |
| `SR/Rule/Schedule` | `WeeklyScheduleEditor` | read-only rule list | Apple schedule control |
| `SR/Alert/Item` | `AlertListTile` | SOS alert details | alert details |
| `SR/Status/Freshness` | `FreshnessChip` | heartbeat status | device status |

Treat **soft neumorphism as layered surfaces, not an excuse for invisible controls**. Inactive/default/pressed/danger/status cannot be indicated by shadow alone. Respect user OS reduce-motion and accessibility preferences.

---

## 11. Engineering work packages / backlog

### EPIC A — Foundation (A01–A10)
A01 monorepo + lint / formatting; A02 reproducible containers and local seeds; A03 auth sessions + MFA; A04 role and family endpoints; A05 signed device enrollment; A06 translations + error dictionary; A07 telemetry redaction and audit; A08 feature-flag service; A09 automated backups; A10 CI contract and security tests.

### EPIC B — Parent experience (B01–B12)
B01 onboarding; B02 pairing; B03 multi-child switch; B04 overview; B05 capability health; B06 rule scheduling; B07 app-usage charts; B08 requests; B09 alerts; B10 family chat; B11 privacy/account; B12 billing and entitlements.

### EPIC C — Android child (C01–C12)
C01 visible onboarding; C02 verify pairing; C03 secure local policy cache; C04 usage access; C05 policy eval + acknowledgment; C06 rule explanation screen; C07 child requests; C08 SOS/check-in; C09 message inbox; C10 battery/heartbeat; C11 permission center; C12 physical device + OEM compatibility tests.

### EPIC D — Gated advanced features (D01–D10)
D01 location legal/store feasibility; D02 only-after-approval geofences; D03 optional VPN filter; D04 permission-tested notification insights; D05 on-device classifier false-positive UX; D06 child-initiated screen assistance; D07 child-accepted A/V check-in; D08 iOS entitlement + extensions; D09 admin privacy controls; D10 post-launch retention and trust center.

Every ticket must include `acceptance_criteria`, `API_contract`, `permission_gate`, `child_visibility`, `offline_behavior`, `negative_tests`, `telemetry`, `Figma_frame` and `release_flag`. Never implement an advanced ticket by simply displaying a mock switch.

---

## 12. Test matrix and release-quality gates

**Physical-device coverage:** Android API 29/31/33/34/35/36 as currently supported; real-world Samsung One UI, Xiaomi/Redmi, Oppo/Realme, Vivo, Pixel; low-memory device, tablets and poor Wi-Fi/cellular. Test no-device-support fallback and OEM restriction guidance. iOS latest supported major + previous two, different Family Sharing states and authorization denials.

**High-priority test cases (must be automated where possible):**

1. Parent verifies account; anonymous child cannot create adult-managed household.
2. Enrollment code expires, cannot be reused, is rate-limited, and cannot attach to wrong household.
3. Child sees monitoring identity and category disclosures **before collection begins**.
4. Parent sees accurate capability-unavailable states; no silent access attempts after refusal.
5. Two families using guessed UUIDs cannot access or mutate each other’s records (IDOR tests).
6. Parent revokes co-guardian; old tokens immediately lose child access.
7. Child offlines during rule update; parent sees pending, local old policy remains functional.
8. Duplicate/reordered rule messages never regress local version.
9. App usage resets correctly at child-local midnight and after reboot; no negative time.
10. Daily limit boundary and cross-midnight bedtime schedule enforced where OS permits.
11. Time extension expires while the child device is offline.
12. Emergency dialer and SOS flow are not blocked by the app’s own rules.
13. FCM token rotation / lost push → reconciliation from authoritative API.
14. Low battery, approximate location, disabled GPS, lost network, mock location and stale route labeled correctly.
15. Geofence false positives, GPS jitter, entry/exit hysteresis and delay (if location gated-in).
16. Play background-location/Accessibility/VPN/notification/installed-app declarations match shipped functionality.
17. Android 14+ MediaProjection requests consent every new session; denial ends cleanly.
18. No background camera/mic starts, no covert recording, child can end live session.
19. All content-classifier alerts support false positive and have confidence/limited evidence.
20. Disconnect/unpair revokes device certs, clears queue and server visibility as required.
21. Account export includes only authorized household data, excludes other families.
22. Data deletion removes eligible data and queue/object backups according to published policy.
23. Billing purchase, restoration, cancellation, family entitlement downgrade, refund/webhook replay.
24. Accessibility: TalkBack/VoiceOver, high text scales, keyboard navigation, ≥4.5:1 text, no color-only state.
25. Bangla strings test on 360dp phones and 200% text scale; no clipped critical actions.
26. Threat tests: token replay, brute-force pairing, SSRF via user URLs, request signature forgery, SQL injection, queue replay.
27. Performance: cold start, ANR, memory, battery drain, network use, idle service stability and alert p95.
28. Child-targeting and location-policy gate approved in writing **before enabling precise location in Play release**.
29. Privacy policy / Data Safety / child store declarations / consent screenshots match every shipped build.
30. Zero “100% guaranteed protection” or “always live” wording in UX and marketing.

### Release gates

**Gate 0:** Legal/policy review and technical feasibility matrix signed.  
**Gate 1:** Security threat model + independent penetration tests.  
**Gate 2:** Functional e2e on real Android OEMs and approved iOS entitlement paths.  
**Gate 3:** Figma fidelity + accessibility + bilingual content audits.  
**Gate 4:** Play/App Store declaration/demo bundle approved; internal/closed testing and bug triage.  
**Gate 5:** Staged rollout 5% → 20% → 100%, pause on ANRs, crash spikes, pairing failures, privacy incidents, or unreliable controls.

---

## 13. Delivery output required of the coding AI agent

**Deliver a real repository** (not just prose): runnable client app(s), child companion, API/service source, infrastructure examples, seeded safe demo data, integration tests, design token ingestion and readme. At minimum include:

- Bootstrapped workspace and verified build commands for every implemented target.
- Android `Manifest.xml` and relevant iOS entitlement templates with **only required permissions**; clear docs for platform approval.
- Database migrations, diagrams, OpenAPI spec, Postman/Bruno requests, RBAC tests.
- Real backend/state wiring; no hardcoded “live” status, fake maps or decorative nonworking control switches.
- `.env.example` (never live secrets), setup scripts, emulator guide, physical-device guidance.
- Consent tracking + retention/deletion jobs, safety/misuse reporting and audit dashboard.
- Acceptance checklist with evidence for each capability (`implemented`, `permission-gated`, `store-review`, `unsupported`, `planned`).
- CI logs / local test results and an explicit unfinished work list. If a capability is blocked, disable its CTA with reason and route to permitted alternatives rather than fake success.

### 13.1 Suggested build order for an autonomous agent

1. Inspect requirements and create compliance/capability registry + engineering decision log.
2. Initialize repo, docs, local Docker/PostgreSQL/Redis, lint/test/typecheck, secrets skeleton.
3. Implement auth, family RBAC, enrollment tokens, device registration + revocation; security tests **first**.
4. Implement Flutter parent onboarding and Kotlin child onboarding with bilateral disclosure.
5. Implement local policy engine and authoritative ack protocol with online/offline tests.
6. Build parent device and rule dashboard with real backend state; bilingual i18n.
7. Implement SOS/check-ins and family communications; run negative tests.
8. Add usage and scoped controls **after** permission proof-of-concept and Play declaration feasibility.
9. Add safety location/web/content tracks **only** after dedicated approval gates; feature flags off by default.
10. Add native iOS supervised track only after Apple entitlement feasibility; use accurate capability parity UI.
11. Run load, privacy, security, accessibility, physical OEM QA; produce store submission checklists.

---

# 14. COPY/PASTE — MASTER PROMPT FOR A CODING AI AGENT

> Copy everything between the `BEGIN` and `END` separators into a capable coding agent **along with both Sontan Rokkha Markdown files**. The prompt assumes no existing codebase; if code exists, audit it before modifying anything.

**BEGIN SONTAN ROKKHA BUILD AGENT PROMPT**

You are the principal product engineer, privacy/security architect, Android/iOS platform specialist, staff mobile engineer and delivery lead for **SONTAN ROKKHA (সন্তান রক্ষা)**, an original, premium, beginner-friendly family safety and parental digital wellbeing platform.

## Mission
Implement the product specified in this Markdown document and the companion Figma AI UI/UX specification. Benchmark AirDroid Parental Control for **feature breadth**, but use original code, branding, IA and visuals. Build working, testable software and production-oriented architecture. Do not claim impossible OS functionality, use stealth monitoring, bypass Play/App Store restrictions or copy competitor assets.

## Mandatory rules
1. **Truthful feasibility:** Start with a capability matrix for Android child/iOS child/parent clients. Every feature must be marked `implemented`, `permission-dependent`, `review-blocked`, `redesigned`, `unsupported`, or `planned` with source evidence.
2. **Compliance blockers:** Treat the Google Play Families child-targeted precision-location restriction, child-monitoring metadata/persistent notice, Accessibility policy, VPN declaration, background location review, SMS/Call Log restrictions, Google Play API target, Apple FamilyControls entitlement and child data law as genuine release gates. Do not misrepresent audience or permissions.
3. **Child visibility:** Companion icon and monitoring notice are clear. Show what is shared, with whom, when, and by what authority. Camera/mic only as a visible, child-accepted in-app family call; screen-sharing only child-initiated with OS permission each session. Never implement secret recording, spying or hidden remote access.
4. **Use real business logic:** Every button, toggle, form, pairing flow, request, rule and status uses real state/network/local persistence where implemented. No fake success, phantom lock, misleading “online/live” markers, silent error handling or static placeholders passed as a working feature.
5. **Privacy by design:** Collect minimal children’s data, encrypt sensitive storage, implement family RBAC + auth + revoke + audit + export/delete + TTLs, no child-data advertising or training, use safe defaults for teenagers.
6. **Design:** Follow sibling Figma design tokens/component names. Soft raised/inset neumorphism is allowed only with sufficient text contrast, explicit status and visible focus/pressed states. Full Bangla/English, low-bandwidth/offline, responsive device support.
7. **Full-stack quality:** Type-safe contracts, migrations, unit/integration/e2e tests, CI, lint, dependency scanning, structured errors, retry/idempotency, feature flags, real-device testing plan and honest deployment docs.
8. **Work incrementally without asking repetitive questions:** Assume the decisions in section 0 unless a genuine legal/account/certificate blocker requires owner action. At each milestone, record verifiable commands, files changed, test outputs and unresolved gates. Do not silently drop requirements.

## Target architecture
Parent Flutter/Dart; Android child Kotlin/Jetpack Compose; iOS child Swift/SwiftUI plus FamilyControls/ManagedSettings/DeviceActivity extensions when authorized; NestJS/TypeScript modular monolith; PostgreSQL; Redis; encrypted minimal object storage; FCM/APNs; Next.js optional parent web/admin. Use latest *compatible stable* package versions, pin them in lockfiles and check target API requirements. Keep secrets in `.env.example` placeholders and managed secret stores, not code.

## Implementation process
**Step 0**: Read both docs; make `docs/IMPLEMENTATION_STATUS.md`, `docs/FEATURE_CAPABILITY_MATRIX.md`, `docs/STORE_POLICY_GATE.md`, `docs/SECURITY_THREAT_MODEL.md`, `docs/DECISIONS.md`. Distinguish proposed from proven capabilities.
**Step 1**: Monorepo, Docker/dev compose, test infra, DB and migrations, OpenAPI, auth/RBAC/tenant isolation, audit/consent and pairing token lifecycle.
**Step 2**: Complete the parent’s primary onboarding/home/family/device-health and child onboarding/current-rules/check-in/SOS interfaces with API-backed state, first in English then Bangla, using the Figma frame hierarchy.
**Step 3**: Implement monotonic policy versions, local offline policy engine, deterministic exception and request loop, `desired` vs `effective` states, policy conflict tests and pushed updates with fallback reconciliation.
**Step 4**: Integrate Android usage metrics and feasible limited enforcement behind appropriately declared permissions; demonstrate actual behavior on a non-rooted physical Android device. If a permission is unavailable, show a recovery UI rather than pretend.
**Step 5**: Implement child-friendly family chat, secure alerts, device health and report views; mock only external map/billing services behind explicit `Demo` flags, never production status. Add external provider integrations after proper credentials.
**Step 6**: Only after policy clearance, enable child GPS/geofence, filtered network categories, notification-safety alerts and iOS Screen Time. Do not shortcut pending approvals; document blockers and leave feature gates off.
**Step 7**: Run all 30 release test cases plus data deletion, SDK disclosure, multilingual accessibility tests. Add CI workflows, secure deployment and store checklists, test/demo credentials with no real child data.

## Output standard and definition of done
- Produce the repository, source files, configuration and scripts, migration history, build instructions, and proof of test/build execution, not just a “future roadmap.”
- For each shipped feature record: screen routes, APIs, DB tables, permission flows, error/empty/offline states, test IDs, Figma component references, security/audit implications.
- Document backend and mobile build commands, minimum supported OS, target API, needed Apple entitlement/Play declarations, push setup and first-time local setup.
- No 100% protection guarantee and no silent claim of store approval. Features blocked by policy must be visibly inactive with honest explanation.
- After every milestone, run format + lint + unit tests + integration tests + build where tools allow, fix failures before advancing. Deliver concise evidence-based status.
- For all screen designs use original Sontan Rokkha look and Bangla/English UX. Respect child autonomy and reduce parental anxiety.

**Success criterion:** a parent can set up a real visible child companion, create a family rule, see its actual applied/pending result, receive child check-ins/SOS, manage authorized family access and delete/export data. Any advanced feature must work on supported OS devices **with lawful approvals** or remain clearly disabled. The production release contains no fake functionality, policy evasion, hidden spying, or copied competitor UI/assets.

**END SONTAN ROKKHA BUILD AGENT PROMPT**

---

## 15. Reference library (official primary sources)

- **[R1] AirDroid Parental Control product feature inventory and Android/iOS compatibility:** https://www.airdroid.com/parental-control/
- **[R2] AirDroid Google Play listing and current advertised claims:** https://play.google.com/store/apps/details?id=com.sand.airdroidkidp&hl=en
- **[R3] Google Play Families policy and child-targeted precise-location rule:** https://support.google.com/googleplay/android-developer/answer/9893335
- **[R4] Google Play `isMonitoringTool=child_monitoring`:** https://support.google.com/googleplay/android-developer/answer/12955211
- **[R5] Google Play 2026 target API (Android 16/API 36):** https://support.google.com/googleplay/android-developer/answer/11926878
- **[R6] Android background foreground-service camera/mic limits:** https://developer.android.com/develop/background-work/services/fgs/restrictions-bg-start
- **[R7] Android MediaProjection per-session consent:** https://developer.android.com/media/grow/media-projection
- **[R8] Google Play AccessibilityService policy:** https://support.google.com/googleplay/android-developer/answer/10964491
- **[R9] Android UsageStatsManager:** https://developer.android.com/reference/android/app/usage/UsageStatsManager
- **[R10] Google Play VpnService policy:** https://support.google.com/googleplay/android-developer/answer/12564964
- **[R11] Google Play QUERY_ALL_PACKAGES permission:** https://support.google.com/googleplay/android-developer/answer/10158779
- **[R12] Apple FamilyControls entitlement/authorization:** https://developer.apple.com/documentation/familycontrols
- **[R13] Apple DeviceActivity:** https://developer.apple.com/documentation/deviceactivity
- **[R14] Apple ManagedSettings shields:** https://developer.apple.com/documentation/managedsettings/shieldsettings
- **[R15] Google Play background location rules:** https://support.google.com/googleplay/android-developer/answer/9799150
- **[R16] Google Play SMS / Call Log limitations:** https://support.google.com/googleplay/android-developer/answer/10208820
- **[R17] Prominent in-app disclosure/consent:** https://support.google.com/googleplay/android-developer/answer/11150561
- **[R18] Google Play monitoring-app / stalkerware policy:** https://support.google.com/googleplay/android-developer/answer/9888380
- **[R19] Google Play notification access API:** https://developer.android.com/reference/android/service/notification/NotificationListenerService
- **[R20] W3C WCAG 2.2 text contrast:** https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

**Research limitation:** This is a documented public-feature and policy assessment, **not** a reverse-engineered audit of AirDroid’s private code or an OS-by-OS runtime proof of every advertised function. Store policies, entitlements and APIs may change; re-verify official guidance before implementation and submission. Engineering schedules and retention targets are proposed goals, not certified guarantees.

# SONTAN ROKKHA — Figma AI Master Specification
## Original Soft Neumorphism Design System + Beginner-Friendly Parent / Child UX

**Document 02 of 02** · Version 1.0 · **19 October 2026**  
**Brand:** Sontan Rokkha (সন্তান রক্ষা)  
**Deliverable:** **Fully editable Figma design system and high-fidelity parent/child app prototype**, with component variants, responsive layouts, accessible UX copy, bilingual coverage, safe flows and developer handoff.  
**Engineering companion:** `Sontan_Rokkha_01_App_Build_Plan_AI_Agent_Master_Prompt.md`

> **Creative brief:** Design the most reassuring, approachable, premium-feeling family safety app for nontechnical parents. It can be as functional as an advanced parental-control competitor but must **look and feel original**. The core visual language is **accessible soft neumorphism**: light tactile panels, subtly raised cards and inset controls, restrained gradient accents, purposeful whitespace and legible typography. Do not recreate AirDroid’s screen composition, art, copy or iconography. **Comfort + clarity beat decorative shadows.**

---

# PART A — Product and behavior specification

## 1. Product promise and audience

**Tagline (English):** *Care, with clarity.*  
**Tagline (Bangla):** *ভালোবাসায় সুরক্ষা, বিশ্বাসে স্বাধীনতা।*

### Adult personas

**Maya, 38 — time-poor parent:** Needs to check her child’s connection, acknowledge a check-in and set a bedtime rule in under a minute; values a calm design more than graphs.

**Rahim, 47 — first-time smartphone parent:** Reads Bangla comfortably, is hesitant with technical permissions, needs plain wording, clear action labels, large touch targets and undo support.

**Nila, 33 — co-guardian:** Helps manage family routines but should only see the permissions granted by the primary guardian.

**Ayan, 11 — supervised child (fictional persona):** Wants to know exactly what is visible and why an app was paused; can request more time or send SOS without embarrassment. Use fictional names and synthetic data only; no actual minor photos by default.

### Non-negotiable experience principles

1. **One clear primary action per screen.** Every parent can answer “What should I tap next?” in five seconds.
2. **Explain before requiring.** Permission cards say why the access matters, what can be seen, and how to turn it off.
3. **Do not overpromise safety.** “Last updated 7 minutes ago” is never presented as “Live.”
4. **No shame, guilt or panic.** “You have a new request” instead of “Your child is disobeying”; severity is evidence-based.
5. **Child rights / agency.** The companion shows an always-accessible “What my family can see” and “Ask for more time.”
6. **No surprise surveillance.** Any live screen/camera/audio interaction must have an explicit child-side acceptance and active indicator. No hidden recording controls in designs.
7. **Strong accessibility.** Use 4.5:1 normal text contrast (3:1 for large text, 3:1 for important controls); shadows never convey meaning alone.
8. **Bangla and English feel native.** Layout must grow for long Bengali strings and 200% font scale.
9. **Support low-bandwidth & older devices.** Avoid dense dashboards, gigantic images, heavy animations and auto-playing media.
10. **Truthful feature availability.** Each sensitive feature has `Available`, `Setup needed`, `Review unavailable`, `Offline`, `Outdated`, `Not supported` UX.
11. **Avoid addictive dashboards.** No excessive refresh spinners, red dots or sensational scores.
12. **Never conceal control.** No UI patterns that disguise monitoring or coerce a child to permit camera/mic.

---

## 2. Positioning against the benchmark

AirDroid advertises remote media, app usage/limits, safe browsing, notification-based alerts, GPS/geofences, reports, SOS and family communication, with capability differences between Android and iOS. Create the **information architecture and visible states** for similarly broad product categories, **not** an exact visual copy. Access to calls/SMS, encrypted conversations, arbitrary remote camera/audio and iOS third-party screens **must not be represented as universally available**. Design permitted alternatives such as family check-ins, explicit child-accepted assist calls and source-limited risk insights.

**Design focus:**

- Home: answer **Is everything okay? What needs attention? What can I do?**
- Location or check-ins: honest freshness, child-safe permissions, optional location only after legal/store review.
- Rules: make a healthy routine in three simple steps.
- Alerts: separate real safety events, routine updates and device issues to reduce alert fatigue.
- Family: trust, consent, conversations, guardians and support.

**Capability note:** The engineering blueprint identifies a **blocking Google Play Families policy issue for child-targeted precise location**. In Figma, include location screens as **conditional, gated future designs**, but do not make them appear enabled in the default launch prototype. The shipping-home prototype should show a friendly **Check-ins** card as a reliable alternative until release compliance approval. Where permission or OS support is unavailable, render accurate explanation instead of a pretend map. Google policy and OS decisions require real review, not visual assumptions.

---

# PART B — Visual design system

## 3. Art direction: **“Soft Guardian”**

Imagine a family wellness device: a soft winter-morning background, airy raised porcelain panels, tactile but accessible buttons, deep ink typography, optimistic muted teal-blue, mint reassurance and warm coral highlights. Unlike traditional exaggerated skeuomorphism, use **micro-elevation + generous contrast**. Neumorphism is primarily for surfaces and touch affordance; high-density data remains flat and readable.

### Mood board keywords

Calm / protective / human / warm / softly futuristic / editorial simplicity / Scandinavian serenity / low cognitive load / healthy boundaries / helpful device / soft tactile surfaces / premium mobile banking clarity.

**Avoid:** copied AirDroid layouts, surveillance-camera dashboards, neon cyberpunk, overused lavender-only palettes, childish rainbow primary colors, giant gradients behind text, exaggerated cartoon children, glossy 3D buttons everywhere, low-contrast gray-on-gray, frantic animation, red ambient dashboard glows and realistic photos of identifiable minors.

## 4. Color variables — original identity

Create Figma variables for each color token; support **Light** and **Dark** modes. These are suggested design values; run actual contrast tests against final rendered backgrounds and revise token values as needed.

| Semantic token | Light hex | Dark hex | Use |
|---|---|---|---|
| `color/surface/canvas` | `#EDF3F6` | `#131F29` | Full app background |
| `color/surface/card` | `#EFF5F8` | `#21323D` | Raised cards |
| `color/surface/inner` | `#E5EDF2` | `#172732` | Inset wells |
| `color/surface/white` | `#FFFFFF` | `#2D414D` | High-contrast field surfaces |
| `color/text/primary` | `#172B3A` | `#F2F7F8` | Headings, values |
| `color/text/secondary` | `#40586B` | `#C3D4DD` | Supporting content |
| `color/text/muted` | `#5B7180` | `#AFC0CA` | Metadata (verify contrast) |
| `color/action/primary` | `#1C5A70` | `#7FD5CE` | Button/background on light; text/icon on dark |
| `color/action/primaryText` | `#FFFFFF` | `#10282C` | Contrast on primary action |
| `color/action/soft` | `#D8EBE9` | `#264D4E` | Accent container |
| `color/state/success` | `#176652` | `#8EE0C5` | Safe/connected (with text/icon) |
| `color/state/warning` | `#955716` | `#FFCE8A` | Needs attention (with text/icon) |
| `color/state/danger` | `#9B3946` | `#FFA8AC` | SOS/danger (with text/icon) |
| `color/state/info` | `#275C98` | `#A4CCFF` | Information/offline hint |
| `color/accent/coral` | `#D97759` | `#FFB59B` | Small decorative highlights; not body text |
| `color/accent/mint` | `#BFE7D9` | `#335B52` | Soft positive background |
| `color/divider` | `#CFDAE1` | `#415560` | Lines / boundaries |
| `color/focus` | `#175EAB` | `#B8DFFF` | Strong focus ring |
| `color/scrim` | `#152631` at 50% | `#050D13` at 65% | Modal backdrop |

**Use accent sparingly:** 70% canvas/light panels; 20% surface/text/structure; 10% brand/state. Danger red is reserved for actual urgent events, destructive confirmations and emergencies. **Never use a soft shadow as the only cue for a disabled button.**

### 4.1 Gradient tokens

- `gradient/hero`: from `#D7F2ED` (0%) to `#E7F1FA` (100%), 135°; keep text on a separately contrast-checked layer.
- `gradient/accent`: from `#1C5A70` to `#217E7B`, 135°, for limited large primary CTA areas with white text after testing.
- `gradient/quiet`: `#EFF6F8` to `#EAF1F7`, for decorative empty/hero surfaces only.

## 5. Neumorphic geometry and effect styles

### 5.1 Elevation / shadow tokens (LIGHT)

Figma Effects support multiple shadows. Treat values below as art direction, not an inflexible constraint on accessibility:

| Effect token | Figma layer effects | Use |
|---|---|---|
| `shadow/raised/sm` | Outer drop: x +3, y +4, blur 10, spread 0, `#A8BAC7` @26%; highlight: x −3, y −3, blur 8, spread 0, `#FFFFFF` @94% | Toggle well, icon plate, compact card |
| `shadow/raised/md` | Outer +6,+8, blur 20, `#A5B9C5` @28%; highlight −6,−6, blur 16, `#FFFFFF` @98% | Home hero, large content card |
| `shadow/inset` | Inner +3,+4, blur 7, `#B2C6D2` @38%; inner −3,−3, blur 8, `#FFFFFF` @92% | Search, input, pressed segmented control |
| `shadow/float` | Outer 0,+10, blur 28, `#668294` @20% | Bottom bar sheet, modal |
| `shadow/none` | none; solid 1px border and contrast state | Accessibility/compact tables |

### 5.2 Dark mode elevation

**Do not simply reverse white highlights into pure black.** Use subtle surfaces, `#07111A` shadows @25–35%, pale cool-blue top-edge sheen @8–14%, and explicit 1px boundaries. Disable decorative inner shadow where dark-mode contrast becomes muddy.

### 5.3 Geometry and sizing

- Spacing scale (`dp` / px in Figma): **4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64**.
- Corner radii: **12** (chips/small), **16** (fields), **20** (medium cards), **24** (hero), **28** (bottom sheets), **999** (pills/avatars).
- Touchable hit area: **48 × 48dp minimum target** for app controls; enlarge critical actions to 56dp height. Accessible alternatives allowed by platform guidelines.
- Standard screen margins: 20 on 393px phone; 16 on 360px; 24 on tablet content columns.
- Parent screen body width: full with 20px gutters; max text/card reading width ~640 on tablet; tablet can use split panes.
- Elevation hierarchy: 1 hero + max 3 secondary raised surfaces per first viewport. **No nested raised-card labyrinth.**
- Bottom navigation: 5 items where space allows; no microscopic labels; for 360px width use concise labels and adapt indicator widths.
- Icon sizes: 18 small, 20 default, 24 nav, 32 hero, 40 decorative.
- Illustration style: original minimal protective arcs, connected hands/dots, gentle organic shapes; flat duotone vector, not stock photos.

## 6. Typography system

Use `Inter`/system sans for Latin and `Noto Sans Bengali` or appropriately licensed Bangla typeface for Bengali; ensure font availability in implementation (do **not** embed or redistribute proprietary font files). Create Figma text styles with **dynamic type metadata** and language-aware line-height. All labels are real editable text, never flattened into images.

| Style token | Desktop / mobile | Weight | Use |
|---|---|---|---|
| `type/display` | 34/40 (mobile: 30/36) | 700 | Big onboarding headline |
| `type/h1` | 28/36 | 700 | Screen title |
| `type/h2` | 22/30 | 650/700 | Card section title |
| `type/h3` | 18/26 | 650 | Card heading |
| `type/body/lg` | 16/25 | 500 | Primary descriptions |
| `type/body/md` | 15/24 | 400/500 | List rows, paragraphs |
| `type/body/sm` | 14/22 | 400/600 | Supporting text |
| `type/label` | 14/20 | 650 | Buttons, form labels |
| `type/caption` | 12–13/18–20 | 500 | Timestamps / nonessential metadata |
| `type/metric` | 30/36 | 700 | Today’s usage/battery counters |

Rule: small captions are never the sole location of critical status or instructions; provide a readable label and test with 200% text scaling. In Bangla, use safe line heights ~1.5 and reserve flexible row height for ligatures and matras. Avoid all caps.

## 7. Iconography, illustration and data visualizations

- Use a consistent 24px outlined icon family (e.g., Lucide) or original matching SVG icons, **not** copied competitor assets.
- Icons must be accompanied by accessible labels for core navigation: Home, Check-ins/Location, Rules, Alerts, Family.
- Suggested brand glyph: two asymmetrical shelter arcs forming an abstract heart around a small center dot. **Do not** use a police badge, CCTV or large eye motif.
- Progress rings use both **number + explanatory label** (“58 of 90 minutes used”), never color or circular fill alone.
- Show only 1–2 simple charts per screen. Progress bar for daily allowance; compact horizontal bars for most-used apps; 7-day bar trend. Avoid unreadable radar charts, multi-pie charts, map heat trails of minors and mood tracking.
- Child avatars: stylized letter avatars or neutral original illustrations; photos optional and **off by default**.
- Motion: 120–180ms hover/press, 180–240ms route transitions, spring easing only for nonessential flourish; reduce-motion option removes bounce/parallax.

---

# PART C — Editable Figma file blueprint

## 8. Required Figma page and component organization

Create **one Figma Design file**, not a single flattened poster. Use named Pages:

```text
00 • START HERE / Cover + documentation
01 • BRAND / Logo, voice, colors, typography, elevation
02 • VARIABLES / Semantic tokens (Light/Dark)
03 • COMPONENTS / Buttons, cards, controls, navigation, alerts
04 • PARENT · ONBOARDING / All roles and permissions
05 • PARENT · HOME & DEVICE / Dashboard, child switch, health
06 • PARENT · CHECK-INS & LOCATION / With approval-gated map variants
07 • PARENT · RULES & USAGE / Time, downtime, focus, app controls
08 • PARENT · ALERTS & FAMILY / Notifications, messages, co-guardian
09 • PARENT · SETTINGS / Billing, privacy, account, help
10 • CHILD COMPANION / Disclosure, rules, requests, SOS
11 • SYSTEM STATES / Error, disabled, empty, offline, permissions
12 • RESPONSIVE / Small mobile, tablet, dark mode
13 • PROTOTYPES / Linked journeys & edge cases
14 • HANDOFF / Spec, API-state mapping, annotations, QA
```

- Use **Auto Layout** for headers, lists, forms, cards, buttons and screen bodies; avoid fixed-text frames that clip Bangla.
- Use **components, instances, variants, variables and consistent naming**. Use constraints for mobile/device safe areas.
- Generate icons/brand shapes as **vectors** and UI elements as editable frames/text, not a single raster screenshot.
- Every high-priority action is clickable within the Figma prototype and has a clear destination/state.
- Include frame notes documenting **what the UI actually depends on in the backend** and **whether this feature is allowed on this OS**.

## 9. Master UI component inventory (build first)

| Component set and variants | Contents / behavior |
|---|---|
| `SR/Button/Primary` | default / pressed / disabled / loading / focus, sizes M 48 and L 56, icon start/end |
| `SR/Button/Secondary` | default / pressed / disabled / danger / focus |
| `SR/Button/Text` | inline action, hover, focus, disabled |
| `SR/IconButton` | circular raised button, tooltip, selected, destructive |
| `SR/Card/Raised` | compact / standard / hero; light / dark; optional top border |
| `SR/Card/Inset` | search field base, progress metrics, scheduling controls |
| `SR/Navigation/Bottom` | 5 destinations, active / inactive / badge count; 360px variant |
| `SR/Header/TopBar` | back / title / avatar / settings / child switcher variants |
| `SR/Avatar/Child` | initials / illustration, size 36 / 44 / 56, privacy-safe |
| `SR/Chip/Status` | Connected / Offline / Last seen / Needs setup / Unsupported / Pending |
| `SR/Chip/Filter` | active, inactive, disabled |
| `SR/Progress/ScreenTime` | value/limit, percent, accessible legend, exceeded |
| `SR/Stat/Metric` | metric, unit, freshness, comparison optional |
| `SR/Row/Setting` | icon, title, help text, trailing control and status |
| `SR/Row/Device` | name, battery, network, last seen, health issue |
| `SR/Row/AppUsage` | app symbol/name, progress, time, limit, status |
| `SR/Row/Alert` | category, short reason, timestamp, severity, unread |
| `SR/Row/Guardian` | name, role, permissions, pending invitation |
| `SR/Control/Toggle` | off / on / disabled / pending, **contrasting track+thumb+text** |
| `SR/Control/Segmented` | daily/weekly, Today/7 days; raised outer/inset selected |
| `SR/Control/StepSlider` | discrete steps, numeric display and preset chips |
| `SR/Form/TextField` | default, focused, error, success, disabled, helper, password |
| `SR/Form/Select` | searchable options, bottom sheet presentation |
| `SR/Form/CodeInput` | pairing numeric code, focus, invalid, expired |
| `SR/Form/QRFrame` | camera placeholder, manual code alternative, accessibility |
| `SR/Schedule/DayPill` | selected/unselected/disabled day |
| `SR/Schedule/TimeRange` | start/end, conflict, overlap, overnight representation |
| `SR/Modal/Confirm` | friendly title, plain consequences, cancel first if destructive |
| `SR/Modal/BottomSheet` | snap heights, drag handle, safe area, keyboard |
| `SR/Banner/Info` | info / warning / success / urgent, no color-only status |
| `SR/Banner/Permission` | feature, risk, device step, why, action and “Not now” |
| `SR/Status/Sync` | Applied / Pending / Partial / Failed / Stale, last checked |
| `SR/State/Empty` | relevant vector illustration, title, next-step CTA |
| `SR/State/Error` | what happened, what still works, retry/help |
| `SR/Toast` | undo where safe, success/info/failure, 4–6s with accessibility |
| `SR/Alert/SOS` | urgent but readable, acknowledge, call/check-in controls |
| `SR/Chat/Bubble` | sent/received, delivery, timestamp, attachment gated |
| `SR/Map/Marker` | location accuracy, last seen, geofence circle, no surprise live |
| `SR/Tab/Capability` | full / limited / unsupported / requires approval |
| `SR/Sheet/Request` | reason, expiry, decision buttons and confirmation |
| `SR/Disclosure/Feature` | what/why/who/sees/retention/permission, link to privacy |

**Component requirements:** interactive state annotations + Figma component properties (`label`, `icon`, `state`, `severity`, `platform`, `isLoading`, `freshness`). Document contrast, min tap size, shadows and Figma variable bindings. Every component must work in **light and dark**; no orphaned unlabeled icons.

---

# PART D — Detailed frame-by-frame screen requirements

## 10. Parent onboarding screens (`P-01` to `P-12`)

| ID | Frame | Detailed design brief / primary action |
|---|---|---|
| **P-01** | Splash / language | Brand mark, `Sontan Rokkha`, select বাংলা / English as visible equal options, `Continue` |
| **P-02** | Value intro 1 | “Stay connected, without constant checking”; 3 pillars: Check-ins / Healthy routines / Clear alerts |
| **P-03** | Value intro 2 | Privacy agreement: “Your child can see what is shared”; `I understand` |
| **P-04** | Sign in | Email/passkey or password, create account, prominent accessibility/focus/error states, forgot password |
| **P-05** | Adult verification | Email verified + identity / guardian responsibility explanation, no unnecessary government ID collection |
| **P-06** | Create family | Household display name, friendly step indicator `Step 1 of 3`, optional avatar |
| **P-07** | Add child profile | First name/nickname, simple age band selector (6–9, 10–12, 13–17), avatar initials, helpful privacy note |
| **P-08** | Pairing guide | Side-by-side simple illustration of parent phone / child phone, two steps, clear “Use the child’s device” |
| **P-09** | Pairing code | Large 6–8 digit sample, QR optional, expiration timer, copy/share code, accessible manual alternative |
| **P-10** | Pairing progress | Waiting / child confirming / permission steps / connected, retry/resend, never imply collection yet |
| **P-11** | Capability setup center | 4–6 per-feature checklist cards: “Ready,” “Needs setup,” “Unavailable” with explanations, no permission coercion |
| **P-12** | First success / first task | Warm, restrained celebratory icon, “Ayan’s device is linked”; CTA “Set a bedtime routine,” secondary “Go home” |

**Design notes:** each screen 1 primary CTA, visible back button, no forced giant four-page carousel, “Skip for now” where legal, at most ~80 words of explanatory content per regular phone viewport. Use low-key progress, no CAPTCHA-like aesthetic. For every permission step include a side-sheet with `Why this permission? / What information is sent? / Can I change it later?`.

## 11. Parent Home & Device (`P-13` to `P-22`)

| ID | Frame | Required layout and interaction |
|---|---|---|
| **P-13** | Home / one child / healthy | Top: greeting “Good evening” and child switch; status hero; clear “Last synced 2 min ago”; 3 cards **Today’s balance**, **Check-ins**, **Quick rules**; 1 optional tip |
| **P-14** | Home / two children | Horizontal small child selector with names, no child photos needed, each status/freshness; selected child content updates |
| **P-15** | Home / needs action | Top non-alarming “One thing needs attention” + permission card; avoid flooding page with red warnings |
| **P-16** | Home / offline | Offline banner, last successful sync, locally active rules summary, “How to reconnect” secondary CTA |
| **P-17** | Child detail | Summary, today’s screen time, check-in, routine state, last alerts, permission status, device shortcut |
| **P-18** | Device & battery | Device model, OS, `43% battery`, last seen, connectivity, background restrictions explanation, precise statuses |
| **P-19** | Permission health | Checklists: notifications, usage, controls, location **only when allowed**; status + `Fix` tutorial action |
| **P-20** | Permission help / Android | Simple annotated device settings steps (illustrative, not copied OS screenshot); return from Settings and re-check |
| **P-21** | Child quick actions | “Send a check-in request,” “Ask how they’re doing,” “Review rules”; no remote camera/audio stealth CTA |
| **P-22** | Child unavailable details | Device offline, permission denied or platform unsupported explained; what still works and next step |

### P-13 home composition — exact hierarchy to convey to Figma AI

```text
┌─────────────────────────────────────────┐
│ Good evening              [Settings]    │
│ Your family is connected                │
│ [Ayan • 11 ▼]   [Mira • 8]              │
├─────────────────────────────────────────┤
│ [soft raised hero]                      │
│  ● Ayan's phone                         │
│  Connected • Last sync 2 min ago        │
│  [Message]        [Check-in]            │
├─────────────────────────────────────────┤
│ Today                                   │
│ [Usage 58 of 90 min] [Battery 43%]      │
│                                         │
│ Your routines                           │
│ [Bedtime • Starts 9:30 PM] [Edit]       │
│                                         │
│ 1 useful update                         │
│ [Time request — Review]                 │
├─────────────────────────────────────────┤
│ Home    Check-ins    Rules   Alerts Family│
└─────────────────────────────────────────┘
```

Use this only as an **information hierarchy**, not a literal wireframe to reproduce pixel-for-pixel. Negative space is important. Avoid multiple redundant chips; key metric cards must be tappable with a visible affordance.

## 12. Check-ins / Location conditional screens (`P-23` to `P-31`)

**Regulatory behavior:** In default launch prototype, bottom tab label **“Check-ins”**; after permitted legal/OS review the tab can switch to **“Location”** or “Places,” with an explanation. Never imply that parent-initiated live tracking works where a location permission is absent or policy prohibits it.

| ID | Screen | Content and states |
|---|---|---|
| **P-23** | Check-ins (default) | “Know when they’re okay.” Last voluntary check-in, gentle “Request check-in” CTA, history of time-stamped messages |
| **P-24** | Request a check-in | Send request / add message optional, estimated delivery caveat, cancel, notification delivery state |
| **P-25** | Check-in received | “Ayan checked in at 4:12 PM”; timestamp and optional child-entered message; no implied GPS unless enabled |
| **P-26** | Location introduction (gated) | Purpose, who can view, precision/retention, child/device settings, prominent legal/permission gate note |
| **P-27** | Location enabled (gated) | Map with last-known pin, visible **accuracy radius**, “Updated 8 min ago,” refresh with pending state, no auto continuous animation |
| **P-28** | Location unavailable | Empty permission gate, review unavailable/child permission off/device offline as separate variants |
| **P-29** | Places / zones (gated) | Safe places list, e.g. Home / School, geofence enabled state; no real precise addresses in sample |
| **P-30** | Add safe place (gated) | Search/select hypothetical place, adjust radius, name and entry/exit toggles, preview uncertainty and battery tradeoff |
| **P-31** | Route history (gated) | Dots/segments by time only with clear explicit opt-in, freshness and deletion control, “No history retained” state |

No live predator-like map, exhaustive trail replay by default, or hidden tracking option. All maps are fictional and have a footer **“Illustration — map feature subject to approval.”** For handoff, link backend `featureFlags.childLocation` and device `capabilities.backgroundLocation`.

## 13. Rules / digital habits (`P-32` to `P-45`)

| ID | Screen | Layout & functionality |
|---|---|---|
| **P-32** | Rules overview | Large `Today 58/90 min` ring + “Works on Ayan’s phone” status, three simple routines, “Add a rule” CTA |
| **P-33** | Simple wizard step 1 | Which routine? **Bedtime / School / Daily limit / Focus** cards with a one-line description |
| **P-34** | Wizard step 2 | Weekday pills + clock/time range + clear overnight preview; “Every school night 9:30 PM–6:30 AM” |
| **P-35** | Wizard step 3 | Allowed essentials summary, preview real outcome, confirm `Save rule` (loading / error variants) |
| **P-36** | Rule sync pending | “Rule saved; waiting for child’s phone” with honest pending status, retry help; never “Done” before effective ack |
| **P-37** | Rule applied | Positive confirmation, “Applied at 8:52 PM”, edit/undo; network freshness and exception notes |
| **P-38** | Rule partial/failed | Plain text reason and next step (“Usage access needs setup”), device health deep link |
| **P-39** | Daily limit editor | Stepper and numeric input, presets 30/60/90/120 min, editable days, preview progress / apply |
| **P-40** | App usage | 7-day mini bar trend, top apps list with names/icons, status of usage permission; no false data |
| **P-41** | App detail & limit | App name, used today, limit, group, pause/allow only if OS supports; explanation |
| **P-42** | Downtime | Calm weekly calendar, time spans, holiday exceptions; edit and disabled control states |
| **P-43** | Focus mode | “Time to focus” plan with apps exempted, school time preset, allow communication |
| **P-44** | Child asks for time | Parent sheet shows child request + duration + reason + `Approve 15 min` / `Decline` / `Discuss` |
| **P-45** | Decision confirmation | Approve result → `Waiting for device` → `Applied` with expiry time, or kind decline with message |

### Rules: explicit product behavior mapping

- `Tap bedtime` → choose schedule → change days → select overnight time → review essentials → confirm → show server saved/pending → child ack → applied.
- `Save failed` → preserve form state and display Retry, no erased inputs.
- `Device offline` → save desired state and warn “Will apply after the phone reconnects,” but also explain that **current already-applied local rules remain**.
- `Unsupported` → view educational card, do not expose enabled-looking block toggle.
- `Over-limit` → show concrete explanation, not only a red ring.
- `Emergency` → show essential allowlist, not an option to block emergency dialing.

## 14. Alerts & family (`P-46` to `P-57`)

| ID | Screen | Design behavior |
|---|---|---|
| **P-46** | Alerts inbox | Tabs **Safety / Requests / Device**, severity with icon+label, latest first, unread state |
| **P-47** | Routine alert detail | Event title, time, child, explanation, what to do; family-friendly calm tone |
| **P-48** | Safety risk advisory | Context-limited notice, confidence language (“This may need a conversation”), child privacy note, false-positive feedback |
| **P-49** | SOS event / parent | Distinct urgent but calm layout, child name, timestamp, delivery status, `Call child` / `Message` / `Acknowledge` |
| **P-50** | Alert preference | Per-category settings, quiet hours for routine alerts (SOS exempt as applicable), summary frequency |
| **P-51** | Family hub | Cards: Family messages / Guardian access / Child profiles / Privacy commitments |
| **P-52** | Family chat | Friendly bubbles, sender identity, delivered timestamps, supported emoji, no unknown-contact discovery |
| **P-53** | Guardian list | Primary parent / co-guardian list, role, permissions, invite action |
| **P-54** | Co-guardian invite | Email invitation, per-role rights (view / manage / billing), clear safeguards, expire / revoke |
| **P-55** | Access details | What each guardian can view, last access and revoke action with step-up auth note |
| **P-56** | Family agreement | Parent shares family routines as friendly cards; child acknowledgment, copyable agreement |
| **P-57** | Safety help & report | How to discuss rules, report account misuse, contact support; no hidden actions |

**Notification copy:** keep titles short and factual. Default notification preview hides sensitive child contents. All notifications link to a permission-scoped app detail screen instead of exposing complete context from a lock screen.

## 15. Parent account, privacy, billing and help (`P-58` to `P-67`)

| ID | Screen | Mandatory details |
|---|---|---|
| **P-58** | Settings landing | Account / Language / Notifications / Family access / Permissions / Privacy / Subscription / Help |
| **P-59** | Privacy center | “You are in control of what is shared”; simple data category cards, retention and on/off options where allowed |
| **P-60** | Access log | “Who viewed a child’s information?” parent/co-guardian and time; no secret support access |
| **P-61** | Export/delete data | Export button, requested/pending/ready/error; Delete account with explicit irreversible consequence |
| **P-62** | Unpair device | Remove device, what stops, which data remains/deletes, secure parent re-authentication |
| **P-63** | Subscription plans | Free vs Family/Plus hypothetical tier grid; **do not invent actual prices**, include `Pricing to be finalized` |
| **P-64** | Trial/paywall disclosure | Transparent billing terms placeholder, renewal, restore purchases, cancel pathway |
| **P-65** | Language & accessibility | Bangla/English, high contrast, reduce motion, large text, screen reader notes |
| **P-66** | Help center | Searchable common tasks, 3-step tutorials, device manufacturer tips, support contact |
| **P-67** | Security / MFA | Sign-in methods, device sessions, MFA, sign out everywhere; no exposing credentials |

## 16. Child companion screens (`C-01` to `C-16`)

Child app is **visible and friendly**, a distinct simplified design variation: softer mint accent, same brand/system, larger typography, fewer settings and no spy-like control aesthetics.

| ID | Frame | Mandatory content and actions |
|---|---|---|
| **C-01** | Welcome | “This helps your family stay connected.” `Get started`, choose language |
| **C-02** | Monitoring explanation | Four large cards: rules / check-ins / device status / optional safety features; visible **who can see what** |
| **C-03** | Pair code | Short code input, show adult/family identity, expiration and error |
| **C-04** | Pair confirmation | Plain explanation “You’re connecting this phone to Maya’s family”; affirmative continue |
| **C-05** | Permission explainer | One feature at a time, data use, “Not now”, OS Settings return path; no coercion |
| **C-06** | Setup done | “Your family is linked” status, simple 2-card explanation |
| **C-07** | Child home | “You’re all set” + Today’s remaining time + next routine + 2 CTAs `Request time` / `Check in` |
| **C-08** | My family can see | Current data categories, why, guardian names, timestamps and pause/revoke path where permitted |
| **C-09** | My rules | “Bedtime starts 9:30 PM,” allowed essentials, clear read-only rule descriptions |
| **C-10** | Friendly app restriction | “Game time has finished for today.” Remaining schedule / `Ask for 15 more minutes` / safe essential actions |
| **C-11** | Time request | Choose 5/15/30 minutes, optional reason, send, pending/approved/declined |
| **C-12** | Check-in | Large `I'm okay` button, optional short message, send status, offline fallback |
| **C-13** | SOS | Large high-contrast emergency button, hold-to-send, countdown, cancel, offline instructions and dialer |
| **C-14** | Family chat | Approved family contacts only, secure message, privacy/abuse report |
| **C-15** | Consent / visibility | “Screen sharing requires me to start and approve every time”; mic/camera only in accepted family call; clear active indicators |
| **C-16** | Help / device disconnected | Permission issue and honest step-by-step fix; family unpair and support visibility |

**Child microcopy style:** no “punishment,” “caught,” “violation,” “surveillance,” “bad behavior.” Use “Time is up,” “Your family’s plan,” “You can ask,” and “Who sees this?”

## 17. Required global and edge-state frames (`S-01` to `S-18`)

These may be componentized as variants or full frames but must exist and be labeled for QA.

| ID | Required state | Design must communicate |
|---|---|---|
| S-01 | Skeleton loading | non-jumping layout, reduced motion |
| S-02 | Empty home/no child | add child prompt with setup benefit |
| S-03 | No alerts | “Nothing needs attention” (not fake “100% safe”) |
| S-04 | No usage data | access not provided vs no activity distinction |
| S-05 | Network offline | latest cache visible, which actions are pending |
| S-06 | Child device offline | last seen + troubleshooting |
| S-07 | Location stale | explicit last-known timestamp and accuracy |
| S-08 | Feature under policy review | safe alternative check-in and no “enable now” CTA |
| S-09 | OS unsupported | clear platform-specific explanation, no broken toggle |
| S-10 | Permission denied | what stops, how to grant later, accept “Not now” |
| S-11 | Rule update pending | no fake success state |
| S-12 | Rule partially applied | list which parts worked vs didn't |
| S-13 | Rule conflict | why two intervals overlap and one-tap resolve |
| S-14 | Pairing expired/invalid | regenerate new code, preserve progress |
| S-15 | Request already decided | prevent duplicate action; show decision timestamp |
| S-16 | Error and retry | descriptive message, persistent form state, recovery |
| S-17 | Data export/delete pending | progress, completion confirmation, support path |
| S-18 | High-contrast / large text | flat accessible component fallback with 200% text |

---

# PART E — Example content, UX copy and localization

## 18. Copywriting: actual parent-friendly Bangla / English examples

| Key / location | English | Bangla |
|---|---|---|
| `home.hello` | Good evening | শুভ সন্ধ্যা |
| `home.connected` | Ayan’s phone is connected | আয়ানের ফোন সংযুক্ত আছে |
| `home.lastSync` | Last synced 2 minutes ago | ২ মিনিট আগে সর্বশেষ সংযুক্ত হয়েছে |
| `home.oneAction` | One thing needs your attention | একটি বিষয় দেখে নেওয়া প্রয়োজন |
| `home.offline` | Ayan’s phone is offline. Your last saved rules may still be active. | আয়ানের ফোন এখন অফলাইনে। আগে চালু করা নিয়মগুলো কার্যকর থাকতে পারে। |
| `usage.today` | Used 58 of 90 minutes today | আজ ৯০ মিনিটের মধ্যে ৫৮ মিনিট ব্যবহার হয়েছে |
| `rules.add` | Add a family rule | পরিবারের জন্য নতুন নিয়ম যোগ করুন |
| `rules.bedtime` | Bedtime starts at 9:30 PM | রাত ৯:৩০টায় ঘুমের সময় শুরু |
| `rules.pending` | Saved. Waiting for Ayan’s phone to confirm. | সংরক্ষিত হয়েছে। আয়ানের ফোন থেকে নিশ্চিত হওয়ার অপেক্ষায়। |
| `rules.applied` | This rule is active on Ayan’s phone. | নিয়মটি আয়ানের ফোনে চালু আছে। |
| `rules.failed` | We couldn’t apply this rule yet. | নিয়মটি এখনো চালু করা যায়নি। |
| `requests.moreTime` | Ayan asked for 15 more minutes | আয়ান আরও ১৫ মিনিট সময় চেয়েছে |
| `requests.approve` | Allow 15 minutes | আরও ১৫ মিনিট দিন |
| `requests.decline` | Not this time | এবার নয় |
| `checkin.request` | Ask for a check-in | খোঁজ নেওয়ার অনুরোধ পাঠান |
| `checkin.received` | Ayan checked in at 4:12 PM | আয়ান বিকেল ৪:১২টায় খোঁজ জানিয়েছে |
| `safety.sos` | SOS alert from Ayan | আয়ানের জরুরি সাহায্যের সংকেত |
| `privacy.heading` | What my family can see | আমার পরিবার কী দেখতে পারে |
| `privacy.permission` | This permission is optional. You can change it later. | এই অনুমতি ঐচ্ছিক। পরে চাইলে বদলাতে পারবেন। |
| `location.lastKnown` | Last known location — not live | সর্বশেষ জানা অবস্থান — সরাসরি নয় |
| `status.unsupported` | Not available on this device | এই ডিভাইসে সুবিধাটি পাওয়া যাচ্ছে না |
| `status.reviewBlocked` | This feature is not available yet | সুবিধাটি এখনো চালু করা হয়নি |
| `time.finished` | Your game time is finished for today | আজকের খেলার সময় শেষ হয়েছে |
| `time.ask` | Ask for more time | আরও সময়ের অনুরোধ করুন |
| `family.invite` | Invite a guardian | আরেকজন অভিভাবককে যুক্ত করুন |
| `privacy.delete` | Delete family data | পরিবারের তথ্য মুছে দিন |

**Bangla QA notes:** use `আয়ান` as a test placeholder, not a brand-owned dataset. Verify matras and ligatures. Mixed English app names/units may remain Latin if localized alternatives reduce recognizability. Time formats: user's chosen 12/24-hour setting and locale-consistent digits. Translation is a starting proposal to review with a native Bangla editor before release.

### 18.1 Microcopy rules

- `status`: “Connected,” “Last seen…” and “Needs setup” describe observable device state. Never substitute “Safe” for “Connected.”
- `permission`: “To show screen-time summaries, Android needs Usage Access. This shows app usage times, not your messages.” (Confirm actual collection scope.)
- `pending`: “We saved your change. It will take effect after the child’s phone confirms it.”
- `risk`: “A notification may contain upsetting language. This is an estimate and may be wrong. Talk with your child.”
- `subscription`: “You can review or cancel from your store subscription settings” where applicable.
- `child`: use respectful direct language, never scare or shame.

---

# PART F — Main prototype user journeys

## 19. Prototype interaction map

**Prototype flow A — First-time parent, 2–3 minutes ideal target**  
`P-01 → P-02 → P-03 → P-04 → P-06 → P-07 → P-08 → P-09 → P-10 → P-11 → P-12 → P-13`. Use Figma links, not a series of static drawings. The parent can backtrack without losing nickname or setup progress.

**Prototype flow B — Child authorization**  
`C-01 → C-02 → C-03 → C-04 → C-05 → C-06 → C-07 → C-08`. Denied permission routes to `C-16` and still allows core low-permission functions.

**Prototype flow C — Bedtime**  
`P-13 → P-32 → P-33 → P-34 → P-35 → P-36 → P-37` with alternative branch `P-38` and `S-13`. Show an actual selected weekday and overnight time.

**Prototype flow D — More time**  
`C-07 → C-11 → P-46 (request tab) → P-44 → P-45 → C-11 (approved)`; include declined and already-expired alternatives.

**Prototype flow E — SOS**  
`C-07 → C-13 (hold, cancel/send) → P-49 → P-52` with offline alternative. Make the call/dialer action obvious; prototype may show explanation sheet, not pretend to dial from Figma.

**Prototype flow F — Check-in**  
`P-23 → P-24 → C-12 → P-25` (simulate notifications). Include offline/pending and child-declined/ignored request states without guilting the child.

**Prototype flow G — Fix a permission**  
`P-15 → P-19 → P-20 → P-19 (verified)` or `S-10`. Show reason why it matters, exact OS step and return status. Do not fake a live OS settings screen.

**Prototype flow H — Privacy / revoke**  
`P-58 → P-59 → P-60 → P-62 → Confirm + adult re-auth mock → P-13 empty/other-child`. Child counterpart updates to unpaired state.

**Prototype flow I — Gated location**  
`P-23 → P-26 (policy review state) → P-28`; demonstrate alternative only. Separate **non-default future approved preview** `P-27 → P-29 → P-30 → P-31`. Label it **conditional, not shipping**.

### Prototype expectations

- Figma click/hover/press state feedback for all CTA, radio, tab, toggle, segmented and bottom-nav components.
- Native transitions should feel calm and short. Use **Smart Animate** only between structurally compatible frames.
- Include overlays for approval, warning, detailed permission rationale and request decision.
- All navigation has back/close paths, escape/no-action, and returning child selection state.
- Break circular prototypes intentionally with a designated Finish/Back to Home path.

---

# PART G — Responsiveness, dark mode and accessibility

## 20. Frames and viewport coverage

Design the following *minimum* master frames, then generate size variations:

| Target | Frame sizes / behavior |
|---|---|
| Compact Android phone | **360×800**, test smallest working layout, 16px gutters |
| Main Android phone | **393×852** or **412×915**, main reference, 20px gutters |
| iPhone | **390×844**, iOS safe areas and bottom navigation |
| Large phone | **430×932**, scalable rather than stretched |
| Tablet portrait | **768×1024**, split pane for rules and child selection |
| Tablet landscape | **1024×768**, max-width content + side navigation |
| Optional parent web | **1440×900**, separate design direction, no mobile 5-tab stretched to desktop |

**Figma Responsive page:** at least 1 full Home, 1 Rules and 1 child onboarding frame at 360px; Home/Rules at 768px; Home + two-column device info at 1024px; Home/Alerts/Privacy in dark mode. Generate one `200% text` stress-test frame and one `Reduced motion/High contrast` frame.

### 20.1 Design at real text scale

- No horizontal scroll for important screen information at 360px.
- Labels wrap rather than ellipsize for settings/critical statuses; scroll content vertically as needed.
- Minimum 48dp tappable controls; 56dp SOS and primary actions.
- Respect safe area, keyboard and screen-reader reading order; visually clear focus rings, selection, current tab, disabled contrast.
- For neumorphic buttons, show a **1.5–2px visible border or colored fill** around focus/active states so shadow failure cannot hide interactivity.
- Body text 15–16px; 12px only for nonessential secondary metadata (but still contrast compliant).
- 200% font scale: stack row cells vertically, move secondary controls below title, expand cards; no clipped SOS or delete controls.
- Dark mode uses muted elevation, not a dark gray soup. Provide flat high-contrast fallback where shadows reduce recognizability.

### 20.2 Accessibility QA checklist

- [ ] Normal text **≥4.5:1**, large text **≥3:1**, essential non-text controls **≥3:1** against adjacent surfaces; validate with a contrast tool and adjust tokens.
- [ ] No status represented by color alone; label + icon + descriptive sentence as needed.
- [ ] Prototyped keyboard navigation/read order consistent top-to-bottom.
- [ ] Visible focus and selected state on every interactive control.
- [ ] 48dp minimum intended hit zones across common actions.
- [ ] Child SOS action visually distinct; accidental SOS cancel is obvious yet not easily confused with send.
- [ ] All 360px/200% text critical flows usable.
- [ ] Dark mode states, disabled states and stale/pending states contrast tested.
- [ ] Animations support Reduce Motion; avoid flashing.
- [ ] Bangla typography manually inspected by a native reader.

---

# PART H — Design-to-engineering contract

## 21. Figma annotations: don't design a fake capability

For each frame, add a clearly styled annotation table outside the device canvas (or in `14 • HANDOFF`):

| Attribute | Example |
|---|---|
| `frame_id` | `P-36_RULE_PENDING` |
| `feature_key` | `screen_time_policy` |
| `audience` | `parent` |
| `os_support` | `android_child: permission-dependent`, `ios_child: entitlement-gated` |
| `backend_source` | `GET /v1/devices/:id/policy` |
| `api_state` | `desired_version > acknowledged_version` |
| `primary_action` | `Try again` / `View device health` |
| `empty_state` | `No rule created` |
| `offline_state` | `Waiting for reconnect` |
| `a11y` | `Announce pending, never say applied` |
| `translation_keys` | `rules.pending`, `rules.help` |
| `safety_policy` | `Visible to child; no stealth enforcement` |

### 21.1 Shared state taxonomy — must match API

```text
Resource loading:  idle | loading | ready | empty | error
Device connection: connected | recently_seen | offline | revoked
Permission:        granted | needs_action | denied | unsupported | review_blocked
Rule apply:        draft | saved_pending_ack | applied | partial | failed | expired
Request:           created | delivered | approved | declined | expired | cancelled
Location:          disabled_by_policy | permission_needed | updating | last_known | stale | unavailable
Account:           signed_out | awaiting_verification | enrolled | reauthentication_required
```

Never show `applied` UI for a backend `saved_pending_ack` status. Pairing expiry is a separate UI state. Report unsupported iOS capabilities through the same system rather than rendering dead controls.

### 21.2 Design tokens for Flutter / native implementation

Specify export-ready JSON semantics:

```json
{
  "color.surface.canvas": {"light":"#EDF3F6","dark":"#131F29"},
  "color.text.primary": {"light":"#172B3A","dark":"#F2F7F8"},
  "color.action.primary": {"light":"#1C5A70","dark":"#7FD5CE"},
  "radius.card": 20,
  "radius.hero": 24,
  "space.base": 4,
  "control.minimumTapTarget": 48,
  "motion.standardMs": 180
}
```

Use Figma variables and component aliases rather than keeping values only in a text note. Keep token names synchronized with engineer-facing types `SrPrimaryButton`, `SrNeumorphicCard`, `CapabilityStatus`, `WeeklyScheduleEditor`, etc.

---

# PART I — COPY/PASTE MASTER PROMPT FOR FIGMA AI

> **How to use:** Give the entire content of **this file** to the Figma AI design assistant, **plus the build-plan document** as functional context. If the tool cannot ingest a long prompt, start with the compact prompt below, then run the incremental subprompts in Section 23 **without replacing previous pages**.

## 22. One-shot Figma AI master prompt

**BEGIN FIGMA AI MASTER PROMPT**

You are a world-class senior mobile product designer, expert Figma design system architect, inclusive UX writer, design-to-development specialist and Bangla/English localization designer. Build a **fully editable high-fidelity Figma file** named **“Sontan Rokkha | Soft Guardian — Family Safety UI Kit & App”**. Do not deliver a flat image or a moodboard only.

### Objective
Create a parent-first parental control and family safety app called **Sontan Rokkha (সন্তান রক্ষা)**, inspired by the **breadth of features** found in advanced parental safety products, but with a completely **original** identity, information architecture and language. Parents should understand the Home screen within 5 seconds and complete a bedtime rule within 3 simple steps. Children must understand rules and monitoring with dignity. Use realistic but fictional family data.

### Visual system
Adopt **“Soft Guardian” accessible neumorphism**: airy blue-white background `#EDF3F6`, premium softly raised/inset panels, deep navy ink `#172B3A`, rich teal primary `#1C5A70`, soft mint `#BFE7D9`, minimal warm coral `#D97759`. Reference the full token tables above. Create editable **Light/Dark Figma variables**, shadows (outer and highlight), typography styles, radius and spacing variables, button states and clear focus/selected styling. Prefer **gentle tactical depth over blurry gray-on-gray text**. No visual copies of AirDroid.

Typography: Latin `Inter` or system sans, Bangla `Noto Sans Bengali` or suitably licensed font; adjustable, high-contrast. Normal text ≥4.5:1; controls and large text appropriate contrast. Minimum touch target 48dp, important primary actions 56dp. Use clean 24px outline vector icons, warm minimal vector illustration and no real children’s photos.

### Figma structure
Build Pages `00 START HERE`, `01 BRAND`, `02 VARIABLES`, `03 COMPONENTS`, `04 PARENT ONBOARDING`, `05 HOME & DEVICE`, `06 CHECK-INS & LOCATION`, `07 RULES & USAGE`, `08 ALERTS & FAMILY`, `09 SETTINGS`, `10 CHILD COMPANION`, `11 SYSTEM STATES`, `12 RESPONSIVE`, `13 PROTOTYPES`, `14 HANDOFF`. Use Auto Layout, variants, variables, named layers, editable text, constraints, accessible components and reusable instances.

### Components
Build the full component inventory in Section 9: buttons, icon buttons, raised/inset cards, top/bottom navigation, child selector, state chips, fields, code input, QR, day pills, schedule rows, check-in/SOS tiles, app usage bars, settings rows, alerts, privacy disclosures, guardian rows, permission status, bottom sheets, dialogs, loading/empty/error/offline states, message bubbles, rule pending/applied states. Document variants light/dark/pressed/disabled/loading/error/focus and conditional feature availability.

### Parent screens
Create high-fidelity editable frames for **P-01 to P-67**, exactly using the screen names/content/flows in Sections 10–15. Prioritize P-13 Home, P-19 Permission Center, P-23 Check-ins, P-32 Rules, P-34 Schedule Wizard, P-36 Pending, P-44 Request, P-46 Alerts, P-49 SOS, P-51 Family, P-59 Privacy. Include all the explicit permission, offline, partial, expired and unsupported scenarios. Offer a 5-tab bottom navigation `Home / Check-ins / Rules / Alerts / Family`, user-friendly child switch, with clear Status + Last synced time. Do not overload Home with charts or create features that claim to be “live” without evidence.

### Child screens
Create high-fidelity editable frames **C-01 to C-16** from Section 16. Prioritize simple visible onboarding, `What my family can see`, current rules, friendly blocked screen, request more time, large SOS hold action, manual check-in and family chat. Child tone is respectful and non-punitive.

### System and responsive
Create variants **S-01 to S-18** from Section 17. Show compact 360×800 and main 393×852 Android, iPhone 390×844, tablet 768×1024 and selected dark-mode variants. Test 200% text and long Bangla translations. Components must expand instead of clipping.

### Important limits — must be reflected visually
The current default concept is **Check-ins** instead of always-on live child location. **Precise GPS map/geofence/history is conditional** because Play policy and child-targeting restrictions require approval; show conditional future-location screens but keep them labeled and gated. App blocking/usage is permission-dependent. iOS child limits use Apple FamilyControls and may be unavailable pending entitlement. No covert mic/camera, hidden screens, SMS intercept, secret monitoring, third-party encrypted chat reading or universal “always on” promises. Any screen help or video is **child-initiated and explicitly accepted**, with prominent live indicator and Stop action. No unlabeled privileged controls.

### Prototype links
Wire journeys A–I from Section 19: onboarding, child pairing, bedtime set/save/ack/fail, time request/approval, child SOS→parent, check-in, permission fix, privacy/revoke and legally gated-location fallback. Build usable interactions rather than static empty links. Include Back and error-recovery paths.

### Content and brand
Use original Sontan Rokkha wordmark and abstract shelter-heart logo. Use fictional family Maya, Ayan (11), Mira (8), and anonymous sample device names. Default parent Home “Good evening”, status “Ayan’s phone is connected”, Usage “58 of 90 minutes today”, battery “43%”, bedtime “9:30 PM”. Use exact Bangla/English example phrases from Section 18 where applicable. Every parent-facing feature is understandable to a nontechnical adult. No guilt or alarm fatigue.

### What you must deliver
1. Fully editable original **Figma design file** with organized pages/Auto Layout/variables/components/variants.
2. Parent and child high-fidelity screens with accurate screen names/IDs and content.
3. Wire-linked interactive prototypes for key complete journeys and failures.
4. Light/Dark and small-device responsive samples, Bangla variants and 200% text test.
5. Handoff table for APIs, states, permission gating and developer component names.
6. A UI quality-review checklist listing unresolved issues. **Do not claim policy approval or runtime capability.**

**Quality bar:** Feels like an original, calm premium mobile app; is visually convincing enough for a product pitch **and** technically specific enough for engineers to implement. Neumorphism aids tactile hierarchy but never harms readability, child dignity or usability. Build faithfully from this specification.

**END FIGMA AI MASTER PROMPT**

---

# PART J — Sequential Figma AI prompts for tools with context limits

## 23. Run these eight prompts in order (do not overwrite earlier work)

**Prompt 1 — Foundations and brand**

> In the existing `Sontan Rokkha | Soft Guardian` Figma file, create pages 00–02 only: cover, original shelter-heart brand glyph, light/dark semantic color variables, typography, spacing, radii, shadow effects and accessible contrast samples. Use Sections 3–7 as the system. Do not create random mockups yet; create reusable foundations.

**Prompt 2 — Component library**

> Continue the same file; add page 03 with every `SR/*` component and variants from Section 9. Use Auto Layout + Figma variables and documented keyboard/focus, loading, disabled, selected and dark mode behaviors. Include button 48/56dp targets, cards raised/inset, status chips, forms, navigation, permission disclosures, alert, SOS and error states. Do not rasterize.

**Prompt 3 — Parent onboarding and home**

> Keep the existing foundation and components unchanged. Create editable screens P-01–P-22 on pages 04–05, using component instances and actual copy. Concentrate on effortless parent onboarding, secure device binding, clear permission health and the P-13 calm Home layout. Include offline, no-device and multi-child variations. Link initial navigation.

**Prompt 4 — Check-ins and permission-gated location**

> In page 06 create P-23–P-31. The **default** Check-ins journey is functional in prototype and uses explicit timestamps. Location/geofences/route history screens are future conditional with “subject to policy and permission approval” annotation. Make the unavailability and help states beautiful and truthful, never fake an always-on live map.

**Prompt 5 — Rules and usage**

> On page 07 create P-32–P-45: daily usage, weekly rules, school focus, bedtime wizard, essential-app exemptions, child request approval and all pending/applied/partial/offline states. Show exact three-step flow and linked Figma prototype. Designed for first-time smartphone parents and readable Bangla.

**Prompt 6 — Alerts, family, settings**

> On pages 08–09 create P-46–P-67 with calm categorized alerts, SOS detail, private family chat, role-scoped co-guardian access, family agreement, privacy center, consent history, export/delete, account safety, help and honest billing placeholders. Follow same neumorphic design system; avoid visually red-alerting ordinary events.

**Prompt 7 — Child app and system states**

> Create C-01–C-16 and S-01–S-18 on pages 10–11. Child experience must clearly say what monitoring happens, who is responsible, and how to request more time or get emergency help. Include large SOS hold-to-send/cancel, friendly time-exhausted text, offline and denial variants, and no covert-control affordances.

**Prompt 8 — Responsive, localization, prototype and QA**

> Create pages 12–14: 360px, 393px, iPhone, 768px, dark mode, 200% font and Bangla variants. Wire complete journeys A–I, add backend/capability state annotations and developer mapping. Audit contrast (normal text ≥4.5:1), tap areas ≥48dp, overflow, consistent shadows, child visibility and truthful disabled/unsupported features. Add an issue list with concrete fixes.

---

# PART K — QA, user testing and handoff

## 24. Real-parent usability scenarios to validate

Run moderated tests with 5–8 participants in each target language where feasible. No claims of real study results until tested. Ask participants to perform the following without coaching:

1. **“Your child’s phone has not synced recently; is everything okay?”** Participant should identify timestamp/offline reason without mistaking it for live supervision.
2. **“Make games unavailable after 9:30 PM on school nights.”** Participant should complete bedtime routine via 3-step rule flow.
3. **“Ayan asks for 15 extra minutes.”** Participant should approve/decline and understand whether it actually applied.
4. **“Get a check-in from your child.”** Participant should send a polite request and understand it does not reveal GPS coordinates unless legitimately enabled.
5. **“Your child’s phone needs Usage Access; fix it.”** Participant should understand the why, identify which phone, and come back to confirmation.
6. **“Show exactly what Ayan knows you can see.”** Participant should find child transparency page from Parent Privacy/Family.
7. **“Your child sends SOS.”** Participant should see who needs attention, timestamp, and how to contact/acknowledge without a confusing control panel.
8. **“Invite a co-guardian but restrict what they may view.”** Participant should find roles, control rights and revocation.
9. **“Delete a child’s stored route history.”** If location gate approved, user should find it and understand retention; otherwise recognize it is unavailable.
10. **“Use the app in Bangla with large text.”** No overflow, English-only critical buttons or unreadable icon labels.

**Illustrative pass criteria:** task success ≥90% for high-frequency onboarding/rule tasks, high comprehension of status and permissions, no critical accessibility failures, no participant falsely believing offline/stale location is live. These are proposed targets; document real observed results once a study exists.

## 25. Figma quality and engineering handoff checklist

- [ ] 15 page groups exist with clear naming and cover/index.
- [ ] Foundations/variables/colors/text/elevation documented, light+dark linked to components.
- [ ] All component sets built as editable Figma variants with Auto Layout.
- [ ] Core P-01–P-67 frames created as editable elements, with P-13, P-32, P-46, P-49 polished.
- [ ] C-01–C-16 and S-01–S-18 completed.
- [ ] Compact phone, standard phone, tablet, dark and long-text examples created.
- [ ] All 9 user journeys are connected, including back/empty/denied/offline paths.
- [ ] Screen-time controls show actual states and fresh/queued/failed distinctions.
- [ ] Conditional location features labeled future/approval-gated; default Check-ins flow clearly implemented.
- [ ] No covert camera, mic, hidden screen, adult stalking or secret third-party chat access controls.
- [ ] Light and dark contrast checked with actual luminance tool, not just visual guessing.
- [ ] Every safety-critical icon has text, 48dp target, focus state and reading order.
- [ ] Bangla copy editor review complete; translation keys exported.
- [ ] Dev handoff includes component names, design tokens, user journeys, feature flags, API states and unresolved questions.
- [ ] Reviewer can navigate and understand app without the designer being present.

## 26. Sources and factual constraints

References are for understanding **feature categories, platform restrictions and accessibility**, not for copying artwork or layouts:

- AirDroid product features and Android/iOS comparison: https://www.airdroid.com/parental-control/
- AirDroid Play Store listing: https://play.google.com/store/apps/details?id=com.sand.airdroidkidp&hl=en
- Google Play child monitoring disclosure: https://support.google.com/googleplay/android-developer/answer/12955211
- Google Play Families policy and child-targeted location restrictions: https://support.google.com/googleplay/android-developer/answer/9893335
- Android screen sharing requires per-session consent: https://developer.android.com/media/grow/media-projection
- Android camera/microphone foreground service limits: https://developer.android.com/develop/background-work/services/fgs/restrictions-bg-start
- Apple Family Controls entitlement and authorization: https://developer.apple.com/documentation/familycontrols
- Apple ManagedSettings / DeviceActivity: https://developer.apple.com/documentation/managedsettings/shieldsettings and https://developer.apple.com/documentation/deviceactivity
- W3C WCAG 2.2 contrast fundamentals: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

**Research and design limitation:** This document is a detailed **Figma generation specification**, not an already-generated Figma file. Exact visual results, component completeness and real click-through behavior depend on the Figma tool used and human/design QA. A mockup cannot prove operating-system permission availability, approved data collection or working enforcement.

---

**Final creative standard:** Sontan Rokkha should feel like a supportive family companion, not a spying tool. Each screen must answer **What is happening? How recent is the information? What can I do? What will my child see?** clearly and kindly. Every raised surface has a function, every action has a visible result, and every unavailable capability is explained without deception.

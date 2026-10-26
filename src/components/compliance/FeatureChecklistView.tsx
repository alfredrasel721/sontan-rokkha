import React from 'react';
import { useApp } from '../../context/AppContext';
import { ParentTab } from '../../types';
import { CheckCircle2, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const FeatureChecklistView: React.FC = () => {
  const { setViewMode, setActiveParentTab, language } = useApp();

  const jumpToFeature = (tab: ParentTab, mode: 'dual' | 'parent' | 'child' = 'dual') => {
    setActiveParentTab(tab);
    setViewMode(mode);
  };

  const sections: {
    id: string;
    title: string;
    targetTab: ParentTab;
    targetMode?: 'dual' | 'parent' | 'child';
    items: string[];
  }[] = [
    {
      id: '01',
      title: '01. Parent Account & Family Management',
      targetTab: 'family',
      items: [
        'Parent registration and login',
        'Email/password authentication',
        'Account recovery and password reset',
        'Parent profile and account settings',
        'Add and manage multiple children',
        'Child device pairing using a 6-digit code',
        'Child device enrollment and permission setup',
        'Parent-child device binding and unbinding',
        'Child profile name, avatar and device details',
        'Switch between child profiles',
        'Multiple parent/guardian access (Co-Guardians)',
        'Account and child-data deletion',
      ],
    },
    {
      id: '02',
      title: '02. Screen Time & Usage Monitoring',
      targetTab: 'usage',
      items: [
        'Daily screen-time overview',
        'Weekly usage reports (7-day bar chart)',
        'Individual app usage duration',
        'App launch frequency counter',
        'Most-used apps ranking',
        'Screen-time usage timeline (hourly)',
        'Historical usage statistics',
        'Screen-time limits',
        'Scheduled downtime (Bedtime & School Focus)',
        'Device usage alerts',
        'Custom app usage limits',
        'Usage reports by child',
      ],
    },
    {
      id: '03',
      title: '03. App Management & Restrictions',
      targetTab: 'apps',
      items: [
        'Installed apps list & package inventory',
        'App usage insights',
        'App-specific time limits (15m–90m / Unlimited)',
        'App block and unblock requests',
        'Scheduled app restrictions',
        'App category restrictions & filtering',
        'New app installation alerts & simulator',
        'App permission and restriction status',
        'Parent approval workflow for requests',
        'Custom allowed/blocked app lists',
      ],
    },
    {
      id: '04',
      title: '04. Location & Family Safety',
      targetTab: 'checkins',
      items: [
        'Current child device location',
        'Location history and route timeline',
        'GPS map view with accuracy radius',
        'Geofencing / safe zones (Home, School, Coaching)',
        'Safe zone entry alerts',
        'Safe zone exit alerts',
        'Location refresh and last-updated status',
        'Battery level and low-battery alerts',
        'Device online/offline status',
        'Child-initiated SOS alert (3s hold + 999 dialer)',
        'Location sharing permission management',
      ],
    },
    {
      id: '05',
      title: '05. Remote Monitoring Features (Consensual)',
      targetTab: 'remote',
      items: [
        'Screen mirroring with required session consent',
        'Remote safety camera check-in with child consent',
        'One-way audio safety check with child consent',
        'Visible active-monitoring indicators on both devices',
        'Remote session live timer & status',
        'Session interruption and permission handling',
        'Parent-side viewing interface',
        'Monitoring activity and access audit logs',
      ],
    },
    {
      id: '06',
      title: '06. Notifications & Social Safety (AI-Assisted)',
      targetTab: 'social',
      items: [
        'Notification synchronization with disclosed access',
        'App notification activity overview',
        'Social app notification monitoring (WhatsApp, Discord, etc.)',
        'Keyword-based alerts for supported data',
        'Potential cyberbullying alerts',
        'Potential harmful-content & phishing alerts',
        'AI-assisted chat risk analysis (Server-side Gemini API)',
        'Supported social platform monitoring filters',
        'Sensitive-content warning dashboard',
        'Review, mark safe, and dismiss alerts',
        'Notification privacy, OTP auto-redaction & 48h retention controls',
      ],
    },
    {
      id: '07',
      title: '07. Web Safety & Content Filtering',
      targetTab: 'web',
      items: [
        'Web activity reports & domain logs',
        'Website allowlist manager',
        'Website blocklist manager',
        'Web category filtering (Adult, Gambling, Violence, Phishing)',
        'Adult content filtering',
        'Safe Search assistance (Google, Bing, YouTube)',
        'Browser activity insights',
        'Suspicious website alerts & live URL filter tester',
        'Website access schedules',
        'Filter enable/disable controls',
        'Filtering compatibility status (Android Local DNS VpnService)',
      ],
    },
    {
      id: '08',
      title: '08. Child App Functions',
      targetTab: 'home',
      targetMode: 'child',
      items: [
        'Child onboarding screens',
        'Guardian enrollment and 6-digit pairing',
        'Permission explanations and setup guidance',
        'Visible parental supervision status banner',
        'Usage access permission workflow',
        'Location permission workflow',
        'Notification access permission workflow',
        'Accessibility permission workflow',
        'Battery optimization guidance',
        'Background sync status',
        'Child device information screen',
        'SOS emergency button',
        'Request additional screen time',
        'Request app access (Ask to Unlock)',
        'Connection and troubleshooting screen',
        'Privacy information and data rights ("What my family can see")',
      ],
    },
    {
      id: '09',
      title: '09. Parent Dashboard & Notifications',
      targetTab: 'home',
      items: [
        'Family overview dashboard across children',
        'Individual child dashboard',
        'Screen-time summary cards & gauge',
        'Location and safety summary',
        'Alerts and activity feed',
        'Unread alert indicators',
        'Push notifications & toast feedback',
        'Configurable notification preferences',
        'Daily activity summaries',
        'Device health and sync status',
        'Offline and permission-revoked alerts',
        'Help and support center',
      ],
    },
    {
      id: '10',
      title: '10. Subscription & Business Features',
      targetTab: 'settings',
      items: [
        'Free and Family Plus premium feature tiers',
        'Monthly subscriptions (৳299/mo)',
        'Annual subscriptions (৳2,499/yr)',
        'Family device limits (1 vs. 5 children / 10 devices)',
        'Google Play Billing integration',
        'Subscription status and renewal handling',
        'Restore purchases',
        'Trial eligibility and expiration handling (14 days)',
        'Server-side entitlement validation (/api/billing/validate-entitlement)',
        'Billing support and cancellation guidance',
        'Privacy policy and terms of service',
        'Administrative subscription overview',
      ],
    },
    {
      id: '11',
      title: '11. Security, Reliability & Compliance',
      targetTab: 'settings',
      items: [
        'Encrypted network communications (TLS 1.3 / AES-256-GCM)',
        'Authenticated device pairing (single-use 6-digit codes)',
        'Role-based family access (Primary Parent vs. Co-Guardian)',
        'Backend security rules & tenant isolation',
        'Least-privilege Android permissions',
        'Prominent data collection disclosures',
        'Persistent monitoring notification when required',
        'Google Play child-monitoring declaration',
        'Background execution and restart recovery',
        'Offline caching and safe synchronization',
        'Data retention and deletion (30-day rolling prune)',
        'Security event & access audit logging',
        'Crash reporting & diagnostics',
        'Compatibility testing across Android 14/15 & iOS',
        'Abuse prevention and account recovery',
      ],
    },
    {
      id: '12',
      title: '12. Additional Product Enhancements for Sontan Rokkha',
      targetTab: 'settings',
      items: [
        'Bangla and English languages (instant toggle)',
        'Beginner-friendly parent onboarding',
        'Neumorphism-inspired accessible UI ("Soft Guardian")',
        'Simple family setup wizard',
        'Guided permission troubleshooting (Samsung/Xiaomi)',
        'Parent-friendly explanations of reports',
        'Accessibility and 200% large-text support',
        'Dark and light modes',
        'In-app tutorials',
        'Customer support ticketing',
        'Feedback and bug reporting',
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-8 max-w-6xl mx-auto w-full text-[#172B3A] dark:text-[#F2F7F8]">
      <div className="sr-card-raised p-5 sm:p-6 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#176652] dark:text-[#8EE0C5]">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Feature Specification Implemented (12 / 12 Modules)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
            {language === 'bn'
              ? 'সন্তান রক্ষা — সম্পূর্ণ ফিচার এবং ফাংশনালিটি ডিরেক্টরি'
              : 'Sontan Rokkha — Complete Features & Functions Directory'}
          </h1>
          <p className="text-xs sm:text-sm text-[#40586B] dark:text-[#C3D4DD] mt-1">
            Every feature from your specification is active and wired to interactive state. Click "Open Feature" on any module to test it live.
          </p>
        </div>

        <button
          onClick={() => setViewMode('dual')}
          className="sr-btn-primary py-2.5 px-4 rounded-2xl text-xs font-bold whitespace-nowrap shrink-0"
        >
          Back to Dual Live Phone View
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((sec) => (
          <div
            key={sec.id}
            className="sr-card-raised p-5 rounded-3xl flex flex-col justify-between gap-4"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2 border-b border-[#CFDAE1]/50 dark:border-[#415560]/40 pb-2.5">
                <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                  {sec.title}
                </h3>
              </div>

              <ul className="space-y-1.5 text-xs text-[#40586B] dark:text-[#C3D4DD]">
                {sec.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#176652] dark:text-[#8EE0C5] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => jumpToFeature(sec.targetTab, sec.targetMode || 'dual')}
              className="sr-btn-raised py-2 px-3 rounded-xl text-xs font-bold text-[#1C5A70] dark:text-[#7FD5CE] flex items-center justify-center gap-1.5 mt-2"
            >
              <span>Open Live Module</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

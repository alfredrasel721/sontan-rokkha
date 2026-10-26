import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../i18n/translations';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Layers,
  Smartphone,
  ExternalLink,
  Info,
} from 'lucide-react';

export const ComplianceDocsView: React.FC = () => {
  const { language } = useApp();
  const [activeDoc, setActiveDoc] = useState<'matrix' | 'policy' | 'security' | 'tokens'>('matrix');

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-8 max-w-4xl mx-auto w-full text-[#172B3A] dark:text-[#F2F7F8]">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1C5A70] dark:text-[#7FD5CE]">
          <FileText className="w-4 h-4" />
          <span>Step 0 Engineering & Policy Registry</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
          Sontan Rokkha (সন্তান রক্ষা) Compliance & Architecture
        </h1>
        <p className="text-xs sm:text-sm text-[#40586B] dark:text-[#C3D4DD] mt-1">
          Research-grounded, parent-managed family safety system adhering to Google Play Families policy, child dignity, and accessible soft neumorphism.
        </p>
      </div>

      {/* Doc selector tabs */}
      <div className="flex p-1.5 rounded-2xl bg-[#E5EDF2] dark:bg-[#172732] sr-card-inset overflow-x-auto scrollbar-none">
        {[
          { id: 'matrix' as const, label: 'Feature Capability Matrix' },
          { id: 'policy' as const, label: 'Play Store Policy Dossier' },
          { id: 'security' as const, label: 'Threat Model & RBAC' },
          { id: 'tokens' as const, label: 'Figma Tokens & Design' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveDoc(tab.id)}
            className={`flex-1 min-w-[150px] py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
              activeDoc === tab.id
                ? 'bg-[#EFF5F8] dark:bg-[#21323D] text-[#1C5A70] dark:text-[#7FD5CE] shadow-sm'
                : 'text-[#5B7180] dark:text-[#AFC0CA]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Feature Feasibility Matrix */}
      {activeDoc === 'matrix' && (
        <div className="sr-card-raised p-5 sm:p-6 rounded-3xl flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#172B3A] dark:text-[#F2F7F8]">
              Feasibility & Platform Capability Matrix
            </h3>
            <span className="text-xs px-2.5 py-1 rounded-xl bg-[#D8EBE9] dark:bg-[#264D4E] text-[#176652] dark:text-[#8EE0C5] font-semibold">
              Research checked: Oct 2026
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#CFDAE1] dark:border-[#415560] text-[#5B7180] dark:text-[#AFC0CA]">
                  <th className="py-2.5 px-3">Capability</th>
                  <th className="py-2.5 px-3">Android Child Plan</th>
                  <th className="py-2.5 px-3">iOS Child Plan</th>
                  <th className="py-2.5 px-3">Architectural & Store Constraint</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CFDAE1]/40 dark:divide-[#415560]/30">
                {[
                  {
                    name: 'Parent dashboard & multi-child switch',
                    android: 'BUILD',
                    ios: 'BUILD',
                    note: 'Full state sync, freshness indicators, never label stale data "live".',
                  },
                  {
                    name: 'Transparent Check-ins',
                    android: 'BUILD',
                    ios: 'BUILD',
                    note: 'Voluntary child check-in with battery, location label & mood.',
                  },
                  {
                    name: 'Precise GPS Map & Safe Zones',
                    android: 'POLICY GATED',
                    ios: 'POLICY GATED',
                    note: 'Google Play Families strictly restricts child-targeted continuous location.',
                  },
                  {
                    name: 'Bedtime Downtime & Focus',
                    android: 'BUILD + OVERLAY',
                    ios: 'ManagedSettings',
                    note: 'Friendly shield; essential 999 dialing and family chat NEVER locked.',
                  },
                  {
                    name: 'Daily App Usage Summary',
                    android: 'PACKAGE_USAGE_STATS',
                    ios: 'DeviceActivity',
                    note: 'Coarse on-device accounting; 30-day auto-pruning data retention.',
                  },
                  {
                    name: 'Child SOS Hold-to-Send (3s)',
                    android: 'BUILD (999 Dialer)',
                    ios: 'BUILD (Dialer)',
                    note: 'Direct OS emergency action; cancellation countdown; urgent alert dispatch.',
                  },
                  {
                    name: 'Live Screen Assist',
                    android: 'REDESIGN / PER-SESSION',
                    ios: 'NOT PROMISED',
                    note: 'Child-initiated single-session consent on Android 14+. No secret mirroring.',
                  },
                  {
                    name: 'Remote Covert Camera / Mic',
                    android: 'ETHICALLY FORBIDDEN',
                    ios: 'ETHICALLY FORBIDDEN',
                    note: 'Prohibited by OS and Google Play Stalkerware policy. Consensual video only.',
                  },
                  {
                    name: 'Calls & SMS Raw Interception',
                    android: 'NOT PROMISED',
                    ios: 'NOT PROMISED',
                    note: 'Google Play restricted SMS/call-log policy. Zero Accessibility evasion.',
                  },
                ].map((row) => (
                  <tr key={row.name} className="hover:bg-[#E5EDF2]/40 dark:hover:bg-[#172732]/40">
                    <td className="py-2.5 px-3 font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                      {row.name}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-semibold text-[#1C5A70] dark:text-[#7FD5CE]">
                        {row.android}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-semibold text-[#40586B] dark:text-[#C3D4DD]">
                        {row.ios}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-[#5B7180] dark:text-[#AFC0CA]">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Play Store Policy Dossier */}
      {activeDoc === 'policy' && (
        <div className="sr-card-raised p-5 sm:p-6 rounded-3xl flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#176652] dark:text-[#8EE0C5]" />
            <h3 className="text-base font-bold text-[#172B3A] dark:text-[#F2F7F8]">
              Google Play Families & Child Monitoring Policy Dossier
            </h3>
          </div>

          <div className="space-y-3 text-xs leading-relaxed">
            <div className="p-3.5 rounded-2xl bg-[#FFFBF5] dark:bg-[#2A231C] border border-[#955716]/40">
              <h4 className="font-bold text-[#955716] dark:text-[#FFCE8A]">
                1. Google Play Child-Targeted Precise Location Prohibition [R3]
              </h4>
              <p className="mt-1 text-[#40586B] dark:text-[#C3D4DD]">
                Google Play Families policy explicitly states that apps primarily targeting children may not request location permission or collect precise location. Therefore, continuous background tracking cannot be deployed casually under child audience declarations. Sontan Rokkha provides transparent, voluntary Check-ins as the compliant default.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#E5EDF2]/60 dark:bg-[#172732]/60">
              <h4 className="font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                2. Visible App & Monitoring Disclosure [R4, R18]
              </h4>
              <p className="mt-1 text-[#40586B] dark:text-[#C3D4DD]">
                The child companion is visibly installed, identifiable on the home screen, and presents a persistent notification during active monitoring with the manifest tag <code>android:value="child_monitoring"</code>. Stealth / concealed operation is strictly prohibited.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#E5EDF2]/60 dark:bg-[#172732]/60">
              <h4 className="font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                3. Target API Level & OS Restrictions [R5, R6, R7]
              </h4>
              <p className="mt-1 text-[#40586B] dark:text-[#C3D4DD]">
                Targets modern Android API 36+. Starting camera/microphone foreground services from the background is blocked on Android 14+. MediaProjection requires explicit user consent for each capture session.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Security Threat Model & RBAC */}
      {activeDoc === 'security' && (
        <div className="sr-card-raised p-5 sm:p-6 rounded-3xl flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Lock className="w-6 h-6 text-[#1C5A70] dark:text-[#7FD5CE]" />
            <h3 className="text-base font-bold text-[#172B3A] dark:text-[#F2F7F8]">
              Security Threat Model & Privacy Governance
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#E5EDF2]/60 dark:bg-[#172732]/60">
              <h4 className="font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                Tenant / Household Isolation (Anti-IDOR)
              </h4>
              <p className="mt-1 text-[#5B7180] dark:text-[#AFC0CA]">
                Every database query and API route validates <code>family_id</code> claims from verified adult tokens. No cross-household enumeration.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#E5EDF2]/60 dark:bg-[#172732]/60">
              <h4 className="font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                Short-Lived Cryptographic Pairing Tokens
              </h4>
              <p className="mt-1 text-[#5B7180] dark:text-[#AFC0CA]">
                Device pairing tokens expire in 10 minutes, single-use, rate-limited after 5 failed attempts, preventing replay attacks.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#E5EDF2]/60 dark:bg-[#172732]/60">
              <h4 className="font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                Zero Advertising & No Data Sale Pledge
              </h4>
              <p className="mt-1 text-[#5B7180] dark:text-[#AFC0CA]">
                Child content is never processed for ad personalization or third-party training. Rolling 30-day automatic pruning on screen statistics.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#E5EDF2]/60 dark:bg-[#172732]/60">
              <h4 className="font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                Audit Logging & Child Transparency
              </h4>
              <p className="mt-1 text-[#5B7180] dark:text-[#AFC0CA]">
                Timestamped logging of who accessed child metrics. Transparent "What my family can see" panel on companion app.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Figma Tokens & Design */}
      {activeDoc === 'tokens' && (
        <div className="sr-card-raised p-5 sm:p-6 rounded-3xl flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#1C5A70] dark:text-[#7FD5CE]" />
            <h3 className="text-base font-bold text-[#172B3A] dark:text-[#F2F7F8]">
              "Soft Guardian" Neumorphism Design Tokens
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <p className="text-[#40586B] dark:text-[#C3D4DD]">
              Built with generous contrast (≥4.5:1 normal text) and micro-elevation. Shadows are tactile cues, never the sole indicator of state.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-2xl bg-[#EDF3F6] border border-[#CFDAE1] text-[#172B3A]">
                <span className="font-bold block">Canvas</span>
                <span className="font-mono text-[10px]">#EDF3F6</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#EFF5F8] border border-[#CFDAE1] text-[#172B3A]">
                <span className="font-bold block">Raised Card</span>
                <span className="font-mono text-[10px]">#EFF5F8</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#1C5A70] text-white">
                <span className="font-bold block">Primary Teal</span>
                <span className="font-mono text-[10px]">#1C5A70</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#BFE7D9] text-[#176652]">
                <span className="font-bold block">Mint Accent</span>
                <span className="font-mono text-[10px]">#BFE7D9</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

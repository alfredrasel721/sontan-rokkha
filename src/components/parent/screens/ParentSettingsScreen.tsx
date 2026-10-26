import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { t } from '../../../i18n/translations';
import { SupportTicket } from '../../../types';
import {
  ShieldCheck,
  Lock,
  Download,
  Trash2,
  Clock,
  Eye,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  AlertCircle,
  User,
  CreditCard,
  Bell,
  LifeBuoy,
  KeyRound,
  LogOut,
  RefreshCw,
  Send,
  BookOpen,
} from 'lucide-react';

export const ParentSettingsScreen: React.FC = () => {
  const {
    language,
    parentUser,
    loginParent,
    registerParent,
    resetParentPassword,
    logoutParent,
    updateParentProfile,
    notificationPrefs,
    updateNotificationPrefs,
    upgradeSubscription,
    restorePurchases,
    deviceCapabilities,
    accessAuditLogs,
    supportTickets,
    createSupportTicket,
    exportFamilyData,
    deleteFamilyData,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'account' | 'billing' | 'notifications' | 'privacy' | 'support'>('account');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Auth form states
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'reset'>('login');
  const [authName, setAuthName] = useState(parentUser.name);
  const [authEmail, setAuthEmail] = useState(parentUser.email);
  const [authPhone, setAuthPhone] = useState(parentUser.phone);
  const [authPassword, setAuthPassword] = useState('••••••••••••');

  // Support ticket states
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState<SupportTicket['category']>('permission_help');
  const [ticketDesc, setTicketDesc] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      loginParent(authEmail, authPassword);
    } else if (authMode === 'register') {
      registerParent(authName, authEmail, authPhone);
    } else {
      resetParentPassword(authEmail);
    }
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketDesc.trim()) return;
    createSupportTicket(ticketSubject.trim(), ticketCategory, ticketDesc.trim());
    setTicketSubject('');
    setTicketDesc('');
  };

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 max-w-2xl mx-auto w-full">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#172B3A] dark:text-[#F2F7F8]">
          {language === 'bn'
            ? 'অভিভাবক অ্যাকাউন্ট, সাবস্ক্রিপশন, প্রাইভেসী ও সহায়তা'
            : 'Account, Billing, Notifications, Privacy & Support'}
        </h2>
        <p className="text-xs text-[#5B7180] dark:text-[#AFC0CA] mt-0.5">
          {language === 'bn'
            ? 'অ্যাকাউন্ট নিরাপত্তা, গুগল প্লে বিলিং, নোটিফিকেশন পছন্দ, ডেটা অধিকার এবং কাস্টমার সাপোর্ট'
            : 'Manage parent authentication, Google Play subscription, notification preferences, privacy controls, and support tickets'}
        </p>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex p-1 rounded-2xl bg-[#E5EDF2] dark:bg-[#172732] sr-card-inset overflow-x-auto scrollbar-none gap-1">
        {[
          { id: 'account' as const, labelEn: 'Account & Auth', labelBn: 'অ্যাকাউন্ট', icon: User },
          { id: 'billing' as const, labelEn: 'Subscription', labelBn: 'সাবস্ক্রিপশন', icon: CreditCard },
          { id: 'notifications' as const, labelEn: 'Notifications', labelBn: 'নোটিফিকেশন', icon: Bell },
          { id: 'privacy' as const, labelEn: 'Privacy & Health', labelBn: 'প্রাইভেসী', icon: ShieldCheck },
          { id: 'support' as const, labelEn: 'Help & Tickets', labelBn: 'সহায়তা ও টিউটোরিয়াল', icon: LifeBuoy },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? 'bg-[#EFF5F8] dark:bg-[#21323D] text-[#1C5A70] dark:text-[#7FD5CE] shadow-sm'
                  : 'text-[#5B7180] dark:text-[#AFC0CA]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? tab.labelBn : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PARENT ACCOUNT & AUTHENTICATION (Section 1) */}
      {activeTab === 'account' && (
        <div className="flex flex-col gap-4">
          <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#CFDAE1]/50 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#1C5A70] dark:bg-[#7FD5CE] text-white dark:text-[#10282C] flex items-center justify-center text-sm font-bold">
                  {parentUser.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                    {parentUser.name}
                  </h3>
                  <p className="text-xs text-[#5B7180] dark:text-[#AFC0CA]">
                    {parentUser.email} · {parentUser.phone}
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold text-[#176652] dark:text-[#8EE0C5]">
                {parentUser.isAuthenticated ? 'Signed In' : 'Signed Out'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-[#E5EDF2]/60 dark:bg-[#172732]/60 flex items-center justify-between">
                <span>Two-Factor Auth (MFA)</span>
                <button
                  onClick={() => updateParentProfile({ mfaEnabled: !parentUser.mfaEnabled })}
                  className={`px-2.5 py-1 rounded-lg font-bold ${
                    parentUser.mfaEnabled
                      ? 'bg-[#D8EBE9] dark:bg-[#264D4E] text-[#176652] dark:text-[#8EE0C5]'
                      : 'sr-card-inset text-[#5B7180]'
                  }`}
                >
                  {parentUser.mfaEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <div className="p-3 rounded-2xl bg-[#E5EDF2]/60 dark:bg-[#172732]/60 flex items-center justify-between">
                <span>Session Status</span>
                {parentUser.isAuthenticated ? (
                  <button
                    onClick={logoutParent}
                    className="text-[#9B3946] dark:text-[#FFA8AC] font-bold flex items-center gap-1 hover:underline"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <button
                    onClick={() => loginParent(parentUser.email)}
                    className="text-[#1C5A70] dark:text-[#7FD5CE] font-bold hover:underline"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Login / Registration / Password Recovery Simulator */}
          <form
            onSubmit={handleAuthSubmit}
            className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#1C5A70] dark:text-[#7FD5CE]" />
                <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                  {language === 'bn'
                    ? 'অভিভাবক লগইন, নিবন্ধন ও পাসওয়ার্ড রিসেট'
                    : 'Parent Registration, Login & Password Recovery'}
                </h3>
              </div>
              <div className="flex gap-1 text-xs">
                {(['login', 'register', 'reset'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setAuthMode(m)}
                    className={`px-2.5 py-1 rounded-lg font-semibold capitalize ${
                      authMode === m
                        ? 'bg-[#1C5A70] dark:bg-[#7FD5CE] text-white dark:text-[#10282C]'
                        : 'text-[#5B7180]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {authMode === 'register' && (
                <div>
                  <label className="font-semibold block mb-1">Full Name:</label>
                  <input
                    type="text"
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    className="w-full sr-card-inset p-2.5 rounded-xl"
                  />
                </div>
              )}
              <div>
                <label className="font-semibold block mb-1">Email Address:</label>
                <input
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full sr-card-inset p-2.5 rounded-xl"
                />
              </div>
              {authMode === 'register' && (
                <div>
                  <label className="font-semibold block mb-1">Phone Number:</label>
                  <input
                    type="text"
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value)}
                    className="w-full sr-card-inset p-2.5 rounded-xl"
                  />
                </div>
              )}
              {authMode !== 'reset' && (
                <div>
                  <label className="font-semibold block mb-1">Password:</label>
                  <input
                    type="password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full sr-card-inset p-2.5 rounded-xl"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="sr-btn-primary py-2.5 px-4 rounded-2xl text-xs font-bold self-start"
            >
              {authMode === 'login' && 'Authenticate & Sign In'}
              {authMode === 'register' && 'Register Parent Account'}
              {authMode === 'reset' && 'Send Password Reset Link'}
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: SUBSCRIPTION & GOOGLE PLAY BILLING (Section 10) */}
      {activeTab === 'billing' && (
        <div className="flex flex-col gap-4">
          <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1C5A70] dark:text-[#7FD5CE]">
                  Google Play Billing Entitlement
                </span>
                <h3 className="text-base font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                  Current Plan:{' '}
                  {parentUser.subscriptionTier === 'family_plus'
                    ? 'Sontan Rokkha Family Plus (Premium)'
                    : 'Sontan Rokkha Free Starter'}
                </h3>
                <p className="text-xs text-[#5B7180] dark:text-[#AFC0CA]">
                  Billing cycle: <span className="font-mono">{parentUser.billingCycle}</span> ·{' '}
                  Trial: <span className="font-mono">{parentUser.trialDaysLeft} days left</span> ·{' '}
                  Renews: <span className="font-mono">{parentUser.subscriptionRenewsAt}</span>
                </p>
              </div>
              <button
                onClick={restorePurchases}
                className="sr-btn-raised py-2 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restore Purchases</span>
              </button>
            </div>

            {/* Tier Comparison Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div
                className={`p-4 rounded-2xl flex flex-col justify-between gap-3 ${
                  parentUser.subscriptionTier === 'free'
                    ? 'sr-card-inset border-2 border-[#1C5A70]'
                    : 'bg-[#E5EDF2]/60 dark:bg-[#172732]/60'
                }`}
              >
                <div>
                  <h4 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                    Free Tier (For 1 Child)
                  </h4>
                  <p className="text-lg font-extrabold font-mono text-[#1C5A70] dark:text-[#7FD5CE] mt-0.5">
                    ৳0 / forever
                  </p>
                  <ul className="text-xs text-[#40586B] dark:text-[#C3D4DD] space-y-1 mt-2">
                    <li>· 1 child profile & 1 companion device</li>
                    <li>· Daily screen-time limits & bedtime downtime</li>
                    <li>· Emergency SOS & voluntary check-ins</li>
                  </ul>
                </div>
                <button
                  onClick={() => upgradeSubscription('free', 'monthly')}
                  className="sr-btn-raised py-2 rounded-xl text-xs font-bold"
                >
                  {parentUser.subscriptionTier === 'free' ? 'Current Tier' : 'Switch to Free'}
                </button>
              </div>

              <div
                className={`p-4 rounded-2xl flex flex-col justify-between gap-3 ${
                  parentUser.subscriptionTier === 'family_plus'
                    ? 'sr-card-inset border-2 border-[#1C5A70] dark:border-[#7FD5CE]'
                    : 'bg-[#E5EDF2]/60 dark:bg-[#172732]/60'
                }`}
              >
                <div>
                  <h4 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                    Family Plus (Up to 5 Children)
                  </h4>
                  <p className="text-lg font-extrabold font-mono text-[#1C5A70] dark:text-[#7FD5CE] mt-0.5">
                    ৳299/mo · ৳2,499/yr
                  </p>
                  <ul className="text-xs text-[#40586B] dark:text-[#C3D4DD] space-y-1 mt-2">
                    <li>· Up to 5 children & 10 devices + Co-guardians</li>
                    <li>· Safe Zones (Geofencing) & 7-day location timeline</li>
                    <li>· AI Social Notification Safety & Web DNS Shield</li>
                  </ul>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => upgradeSubscription('family_plus', 'monthly')}
                    className="flex-1 sr-btn-primary py-2 rounded-xl text-xs font-bold"
                  >
                    Monthly (৳299)
                  </button>
                  <button
                    onClick={() => upgradeSubscription('family_plus', 'annual')}
                    className="flex-1 sr-btn-primary py-2 rounded-xl text-xs font-bold"
                  >
                    Annual (৳2,499)
                  </button>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#E5EDF2]/60 dark:bg-[#172732]/60 text-[11px] text-[#5B7180] dark:text-[#AFC0CA]">
              <strong>Cancellation & Privacy Terms:</strong> Cancel anytime in Google Play Store &gt; Payments &amp; Subscriptions. Stopping a subscription never deletes your family safety data immediately, and SOS emergency features remain free forever.
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NOTIFICATION PREFERENCES (Section 9) */}
      {activeTab === 'notifications' && (
        <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
          <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
            {language === 'bn'
              ? 'পুশ নোটিফিকেশন ও অ্যালার্ট সেটিংস'
              : 'Configurable Notification Preferences'}
          </h3>

          <div className="divide-y divide-[#CFDAE1]/40 dark:divide-[#415560]/30 text-xs">
            {[
              {
                key: 'pushEnabled' as const,
                label: 'Instant Push Notifications (Requests, SOS, Alerts)',
                val: notificationPrefs.pushEnabled,
              },
              {
                key: 'emailSummaries' as const,
                label: 'Daily & Weekly Activity Summary Reports',
                val: notificationPrefs.emailSummaries,
              },
              {
                key: 'quietHoursEnabled' as const,
                label: `Parent Quiet Hours (${notificationPrefs.quietFrom} – ${notificationPrefs.quietUntil})`,
                val: notificationPrefs.quietHoursEnabled,
              },
              {
                key: 'sosOverrideQuietHours' as const,
                label: 'Emergency SOS Always Overrides Quiet Hours',
                val: notificationPrefs.sosOverrideQuietHours,
              },
              {
                key: 'newAppInstallAlerts' as const,
                label: 'New App Installation Alerts on Child Phone',
                val: notificationPrefs.newAppInstallAlerts,
              },
              {
                key: 'safeZoneAlerts' as const,
                label: 'Safe Zone Arrival & Exit Geofence Notifications',
                val: notificationPrefs.safeZoneAlerts,
              },
            ].map((item) => (
              <div key={item.key} className="py-3 flex items-center justify-between gap-2">
                <span className="font-medium text-[#172B3A] dark:text-[#F2F7F8]">{item.label}</span>
                <button
                  onClick={() => updateNotificationPrefs({ [item.key]: !item.val })}
                  className={`px-3 py-1 rounded-xl font-bold ${
                    item.val
                      ? 'bg-[#D8EBE9] dark:bg-[#264D4E] text-[#176652] dark:text-[#8EE0C5]'
                      : 'sr-card-inset text-[#5B7180]'
                  }`}
                >
                  {item.val ? 'ON' : 'OFF'}
                </button>
              </div>
            ))}

            <div className="py-3 flex items-center justify-between gap-2">
              <span className="font-medium text-[#172B3A] dark:text-[#F2F7F8]">
                Low-Battery Alert Threshold
              </span>
              <select
                value={notificationPrefs.lowBatteryAlertThreshold}
                onChange={(e) =>
                  updateNotificationPrefs({ lowBatteryAlertThreshold: Number(e.target.value) })
                }
                className="sr-card-inset px-2.5 py-1 rounded-xl font-mono font-bold"
              >
                <option value={15}>15%</option>
                <option value={20}>20%</option>
                <option value={30}>30%</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PRIVACY, SECURITY & DEVICE HEALTH (Section 11) */}
      {activeTab === 'privacy' && (
        <div className="flex flex-col gap-4">
          <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#CFDAE1]/50">
              <ShieldCheck className="w-5 h-5 text-[#176652] dark:text-[#8EE0C5]" />
              <h3 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                {t('privacy.noSell', language)} · TLS 1.3 & AES-256-GCM
              </h3>
            </div>

            <p className="text-xs text-[#40586B] dark:text-[#C3D4DD] leading-relaxed">
              {t('privacy.noSellDesc', language)}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <button
                onClick={exportFamilyData}
                className="flex-1 sr-btn-raised flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs font-bold text-[#1C5A70] dark:text-[#7FD5CE]"
              >
                <Download className="w-4 h-4" />
                <span>{t('privacy.export', language)}</span>
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex-1 sr-btn-raised flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs font-bold text-[#9B3946] dark:text-[#FFA8AC]"
              >
                <Trash2 className="w-4 h-4" />
                <span>{t('privacy.delete', language)}</span>
              </button>
            </div>
          </div>

          {/* Device Capabilities */}
          <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-[#5B7180] dark:text-[#AFC0CA]">
              {t('settings.deviceHealth', language)}
            </h3>
            <div className="space-y-2.5">
              {deviceCapabilities.map((cap) => (
                <div
                  key={cap.id}
                  className="p-3 rounded-2xl bg-[#E5EDF2]/60 dark:bg-[#172732]/60 flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                      {cap.titleKey}
                    </h4>
                    <span className="text-[11px] font-mono text-[#176652] dark:text-[#8EE0C5]">
                      {cap.status === 'granted' ? 'Granted' : 'Session Prompt'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#40586B] dark:text-[#C3D4DD]">
                    {cap.descriptionKey}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Access Audit Ledger */}
          <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#1C5A70] dark:text-[#7FD5CE]" />
              <h3 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                Security Event & Access Audit Log
              </h3>
            </div>
            <div className="space-y-2">
              {accessAuditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-2.5 rounded-xl bg-[#E5EDF2]/40 dark:bg-[#172732]/40 text-xs flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                      {log.guardianName}
                    </span>
                    <p className="text-[11px] text-[#5B7180] dark:text-[#AFC0CA]">
                      {log.action} ({log.dataCategory})
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-[#5B7180]">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: HELP, IN-APP TUTORIALS & SUPPORT TICKETING (Section 9 & 12) */}
      {activeTab === 'support' && (
        <div className="flex flex-col gap-4">
          {/* In-App Beginner Tutorials */}
          <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#1C5A70] dark:text-[#7FD5CE]" />
              <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                {language === 'bn'
                  ? 'সহজ ইন-অ্যাপ টিউটোরিয়াল ও গাইড'
                  : 'Beginner-Friendly In-App Tutorials'}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-[#E5EDF2]/60 dark:bg-[#172732]/60">
                <strong className="block text-[#172B3A] dark:text-[#F2F7F8]">
                  01. Family Setup Wizard
                </strong>
                <p className="text-[11px] text-[#5B7180] mt-1">
                  Add child profile in Family tab, copy the 6-digit code, and enter it on the Child Companion phone.
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-[#E5EDF2]/60 dark:bg-[#172732]/60">
                <strong className="block text-[#172B3A] dark:text-[#F2F7F8]">
                  02. Samsung & Xiaomi Sync
                </strong>
                <p className="text-[11px] text-[#5B7180] mt-1">
                  Set Battery to "Unrestricted" and lock Sontan Rokkha Companion in recent apps so bedtime rules run reliably.
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-[#E5EDF2]/60 dark:bg-[#172732]/60">
                <strong className="block text-[#172B3A] dark:text-[#F2F7F8]">
                  03. Understanding Reports
                </strong>
                <p className="text-[11px] text-[#5B7180] mt-1">
                  AI social warnings are conversation starters, not automatic punishments. Talk openly with your child.
                </p>
              </div>
            </div>
          </div>

          {/* Customer Support Ticketing & Bug Reporting */}
          <form
            onSubmit={handleCreateTicket}
            className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3"
          >
            <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
              {language === 'bn'
                ? 'কাস্টমার সাপোর্ট টিকিট ও বাগ রিপোর্ট'
                : 'Customer Support Ticketing & Bug Reporting'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <input
                type="text"
                required
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="Subject (e.g. Need help with Xiaomi permission)..."
                className="sr-card-inset px-3 py-2 rounded-xl"
              />
              <select
                value={ticketCategory}
                onChange={(e) => setTicketCategory(e.target.value as SupportTicket['category'])}
                className="sr-card-inset px-3 py-2 rounded-xl"
              >
                <option value="permission_help">Guided Permission Help</option>
                <option value="billing">Subscription & Billing</option>
                <option value="bug_report">Bug / Crash Report</option>
                <option value="feature_request">Feedback & Feature Request</option>
              </select>
            </div>

            <textarea
              rows={2}
              required
              value={ticketDesc}
              onChange={(e) => setTicketDesc(e.target.value)}
              placeholder="Describe your question, feedback, or issue..."
              className="sr-card-inset p-3 rounded-xl text-xs"
            />

            <button
              type="submit"
              className="sr-btn-primary py-2 px-4 rounded-xl text-xs font-bold self-start flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Support Ticket</span>
            </button>

            <div className="divide-y divide-[#CFDAE1]/40 pt-2">
              {supportTickets.map((tck) => (
                <div key={tck.id} className="py-2 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-[#1C5A70] dark:text-[#7FD5CE]">
                      {tck.id}
                    </span>{' '}
                    · <span className="font-bold">{tck.subject}</span>
                    <p className="text-[11px] text-[#5B7180]">{tck.description}</p>
                  </div>
                  <span className="text-[11px] font-bold uppercase text-[#176652] dark:text-[#8EE0C5]">
                    {tck.status}
                  </span>
                </div>
              ))}
            </div>
          </form>
        </div>
      )}

      {/* Delete Family Data Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-[#152631]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="sr-card-raised p-5 rounded-3xl max-w-md w-full bg-[#EFF5F8] dark:bg-[#21323D] shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#9B3946] dark:text-[#FFA8AC]">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-base font-bold">{t('privacy.delete', language)}</h3>
            </div>

            <p className="text-xs text-[#40586B] dark:text-[#C3D4DD] leading-relaxed">
              {t('privacy.deleteConfirm', language)}
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 sr-btn-raised py-2.5 rounded-2xl text-xs font-semibold text-[#5B7180]"
              >
                {t('common.cancel', language)}
              </button>
              <button
                onClick={() => {
                  deleteFamilyData();
                  setShowDeleteConfirm(false);
                }}
                className="flex-1 sr-btn-danger py-2.5 rounded-2xl text-xs font-bold"
              >
                {language === 'bn' ? 'হ্যাঁ, স্থায়ীভাবে মুছুন' : 'Yes, Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { t } from '../../i18n/translations';
import { Logo } from '../brand/Logo';
import { ChildPermissionsState } from '../../types';
import {
  Heart,
  Clock,
  Send,
  AlertCircle,
  ShieldCheck,
  Moon,
  MessageCircle,
  Lock,
  Unlock,
  PhoneCall,
  CheckCircle2,
  X,
  Smartphone,
  QrCode,
  Monitor,
  StopCircle,
  Grid,
  Sliders,
  Info,
  Wifi,
  RefreshCw,
} from 'lucide-react';

export const ChildCompanion: React.FC = () => {
  const {
    language,
    selectedChild,
    requestMoreTime,
    sendCheckInFromChild,
    triggerSos,
    activeSos,
    cancelSos,
    familyMessages,
    sendMessage,
    installedApps,
    requestAppAccessFromChild,
    bindChildDeviceWithCode,
    toggleChildPermission,
    remoteSession,
    respondToRemoteConsentOnChild,
    stopRemoteSession,
    refreshChildLocation,
  } = useApp();

  const [childTab, setChildTab] = useState<'home' | 'apps' | 'setup' | 'device'>('home');

  const [showTimeModal, setShowTimeModal] = useState(false);
  const [requestMinutes, setRequestMinutes] = useState(15);
  const [requestReason, setRequestReason] = useState('');

  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [checkInNote, setCheckInNote] = useState('');

  const [showWhatFamilySees, setShowWhatFamilySees] = useState(false);
  const [showSimulatedShield, setShowSimulatedShield] = useState(false);

  // Pairing Code Input state
  const [pairingInput, setPairingInput] = useState(selectedChild.pairingCode);

  // SOS 3-second Hold-to-Send state
  const [isHoldingSos, setIsHoldingSos] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(3);

  const [childChatText, setChildChatText] = useState('');

  const used = selectedChild.dailyUsageMinutes;
  const limit = selectedChild.dailyLimitMinutes;
  const remaining = Math.max(0, limit - used);
  const percentage = Math.min(100, Math.round((used / limit) * 100));

  const childDisplayName = language === 'bn' ? selectedChild.nickname : selectedChild.name;

  // Handle SOS hold countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHoldingSos && sosCountdown > 0) {
      timer = setTimeout(() => {
        setSosCountdown((prev) => prev - 1);
      }, 900);
    } else if (isHoldingSos && sosCountdown === 0) {
      setIsHoldingSos(false);
      setSosCountdown(3);
      triggerSos('999');
    }
    return () => clearTimeout(timer);
  }, [isHoldingSos, sosCountdown]);

  const handleSosPressStart = () => {
    setIsHoldingSos(true);
    setSosCountdown(3);
  };

  const handleSosPressEnd = () => {
    if (sosCountdown > 0) {
      setIsHoldingSos(false);
      setSosCountdown(3);
    }
  };

  const handleSendTimeRequest = (e: React.FormEvent) => {
    e.preventDefault();
    requestMoreTime(requestMinutes, requestReason);
    setShowTimeModal(false);
    setRequestReason('');
  };

  const handleSendCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    sendCheckInFromChild(checkInNote || undefined);
    setShowCheckInModal(false);
    setCheckInNote('');
  };

  const handleSendChildChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (childChatText.trim()) {
      sendMessage(childChatText, true);
      setChildChatText('');
    }
  };

  const handlePairSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bindChildDeviceWithCode(pairingInput);
  };

  const permissionItems: {
    key: keyof ChildPermissionsState;
    titleEn: string;
    titleBn: string;
    descEn: string;
    descBn: string;
  }[] = [
    {
      key: 'usageAccess',
      titleEn: 'Usage Access (PACKAGE_USAGE_STATS)',
      titleBn: 'অ্যাপ ব্যবহারের সময় গণনা (Usage Access)',
      descEn: 'Counts daily app minutes so your screen time ring stays accurate.',
      descBn: 'দৈনিক কোন অ্যাপ কত মিনিট চলছে তা হিসাব করে।',
    },
    {
      key: 'location',
      titleEn: 'Location & Safe Zones (FusedLocation)',
      titleBn: 'অবস্থান ও নিরাপদ স্থান (Location)',
      descEn: 'Shares your safe zone arrivals and voluntary check-ins with parents.',
      descBn: 'স্কুল বা বাসায় পৌঁছানোর তথ্য পরিবারকে জানায়।',
    },
    {
      key: 'notifications',
      titleEn: 'Notification Safety Shield',
      titleBn: 'নোটিফিকেশন সুরক্ষা (Notification Access)',
      descEn: 'Alerts parents only if bullying or scam links appear in social notifications.',
      descBn: 'ক্ষতিকর লিংক বা সাইবার বুলিং হলে অভিভাবককে সতর্ক করে।',
    },
    {
      key: 'accessibility',
      titleEn: 'Bedtime & App Shield (Accessibility)',
      titleBn: 'বেডটাইম ও অ্যাপ শিল্ড (Accessibility)',
      descEn: 'Pauses games at bedtime while keeping 999 emergency calls open.',
      descBn: 'ঘুমানোর সময়ে গেম বিরত রাখে কিন্তু জরুরি কল খোলা রাখে।',
    },
    {
      key: 'batteryUnrestricted',
      titleEn: 'Unrestricted Battery Sync',
      titleBn: 'আনরেস্ট্রিক্টেড ব্যাটারি সিঙ্ক',
      descEn: 'Prevents phone from putting Sontan Rokkha to sleep during background sync.',
      descBn: 'ব্যাকগ্রাউন্ডে সময়মতো রুটিন সিঙ্ক সচল রাখে।',
    },
  ];

  return (
    <div className="flex flex-col gap-3.5 p-4 max-w-sm mx-auto w-full bg-[#EDF3F6] dark:bg-[#131F29] text-[#172B3A] dark:text-[#F2F7F8] min-h-full">
      {/* Persistent Visible Parental Supervision Notification Bar (Section 8 & 11) */}
      <div className="px-3 py-1.5 rounded-xl bg-[#D8EBE9] dark:bg-[#264D4E] text-[#176652] dark:text-[#8EE0C5] flex items-center justify-between text-[10px] font-bold">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span>
            {language === 'bn'
              ? 'সন্তান রক্ষা সুপারভিশন সক্রিয় (দৃশ্যমান)'
              : 'Sontan Rokkha Supervision Active (Visible)'}
          </span>
        </div>
        <button onClick={() => setShowWhatFamilySees(true)} className="underline">
          {language === 'bn' ? 'তথ্য' : 'Details'}
        </button>
      </div>

      {/* LIVE REMOTE MONITORING SESSION CONSENT / ACTIVE BANNER (Section 5) */}
      {remoteSession.status === 'requesting_consent' && (
        <div className="p-4 rounded-3xl bg-[#FFFBF5] dark:bg-[#2A231C] border-2 border-[#955716] shadow-lg flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#955716] dark:text-[#FFCE8A]">
            <Monitor className="w-4 h-4" />
            <span>
              {language === 'bn'
                ? 'অভিভাবক লাইভ সহায়তা সেশনের অনুরোধ করেছেন'
                : 'Parent Requested a Live Safety Session'}
            </span>
          </div>
          <p className="text-xs text-[#40586B] dark:text-[#C3D4DD]">
            {language === 'bn'
              ? `আপনার অভিভাবক (${remoteSession.type.replace(/_/g, ' ')}) শুরু করতে চান। আপনি কি সম্মতি দিচ্ছেন?`
              : `Your parent asked to start ${remoteSession.type.replace(
                  /_/g,
                  ' '
                )}. Do you consent to share right now?`}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => respondToRemoteConsentOnChild(true)}
              className="flex-1 sr-btn-primary py-2 rounded-xl text-xs font-bold"
            >
              {language === 'bn' ? 'সম্মতি দিন (Accept)' : 'Accept & Share'}
            </button>
            <button
              onClick={() => respondToRemoteConsentOnChild(false)}
              className="flex-1 sr-btn-raised py-2 rounded-xl text-xs font-semibold text-[#9B3946]"
            >
              {language === 'bn' ? 'প্রত্যাখ্যান' : 'Decline'}
            </button>
          </div>
        </div>
      )}

      {remoteSession.status === 'active' && (
        <div className="p-3.5 rounded-2xl bg-[#9B3946] text-white flex items-center justify-between gap-2 shadow-md">
          <div className="flex items-center gap-2 text-xs">
            <Monitor className="w-4 h-4 shrink-0" />
            <div>
              <strong className="block">
                LIVE: {remoteSession.type.replace(/_/g, ' ').toUpperCase()}
              </strong>
              <span className="text-[10px] opacity-90">
                Parent is viewing · {remoteSession.durationSeconds}s
              </span>
            </div>
          </div>
          <button
            onClick={() => stopRemoteSession('child')}
            className="px-2.5 py-1.5 rounded-xl bg-white text-[#9B3946] text-xs font-bold flex items-center gap-1 shrink-0"
          >
            <StopCircle className="w-3.5 h-3.5" />
            <span>Stop</span>
          </button>
        </div>
      )}

      {/* Child Header */}
      <div className="flex items-center justify-between">
        <Logo size={30} showText={false} />
        <div className="text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C5A70] dark:text-[#7FD5CE]">
            Child Companion · {selectedChild.isBound ? 'Bound' : 'Unbound'}
          </span>
          <h2 className="text-sm font-bold leading-tight">
            {t('child.allSet', language, { name: childDisplayName })}
          </h2>
        </div>
      </div>

      {/* Child Companion 4-Tab Switcher */}
      <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-[#E5EDF2] dark:bg-[#172732] sr-card-inset text-[11px] font-bold">
        {[
          { id: 'home' as const, labelEn: 'Home', labelBn: 'হোম' },
          { id: 'apps' as const, labelEn: 'My Apps', labelBn: 'অ্যাপস' },
          { id: 'setup' as const, labelEn: 'Setup', labelBn: 'সেটআপ' },
          { id: 'device' as const, labelEn: 'Device', labelBn: 'ডিভাইস' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setChildTab(tab.id)}
            className={`py-1.5 px-2 rounded-xl transition-all whitespace-nowrap ${
              childTab === tab.id
                ? 'bg-[#1C5A70] dark:bg-[#7FD5CE] text-white dark:text-[#10282C]'
                : 'text-[#5B7180] dark:text-[#AFC0CA]'
            }`}
          >
            {language === 'bn' ? tab.labelBn : tab.labelEn}
          </button>
        ))}
      </div>

      {/* CHILD TAB 1: HOME */}
      {childTab === 'home' && (
        <div className="flex flex-col gap-3.5">
          {/* Screen Time Allowance Progress Ring */}
          <div className="sr-card-raised p-4 rounded-3xl flex flex-col items-center gap-2.5 text-center">
            <span className="text-[11px] font-semibold text-[#5B7180] dark:text-[#AFC0CA]">
              {language === 'bn' ? 'আজকের ব্যবহারের সময়' : "Today's Screen Time"}
            </span>

            <div className="relative w-24 h-24 flex items-center justify-center rounded-full sr-card-inset">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#CFDAE1]/40 dark:text-[#415560]/30"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#1C5A70] dark:text-[#7FD5CE]"
                  strokeDasharray={`${percentage}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-lg font-bold font-mono">{remaining}</span>
                <span className="text-[9px] text-[#5B7180] dark:text-[#AFC0CA]">
                  {language === 'bn' ? 'মিনিট বাকি' : 'min left'}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#40586B] dark:text-[#C3D4DD]">
              {language === 'bn'
                ? `আজ ${limit} মিনিটের মধ্যে ${used} মিনিট ব্যবহার হয়েছে।`
                : `Used ${used} of ${limit} minutes today.`}
            </p>

            <div className="grid grid-cols-2 gap-2 w-full pt-1">
              <button
                onClick={() => setShowTimeModal(true)}
                className="sr-btn-primary py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{t('child.timeAsk', language)}</span>
              </button>
              <button
                onClick={() => setShowCheckInModal(true)}
                className="sr-btn-raised py-2.5 px-3 rounded-2xl text-xs font-bold text-[#176652] dark:text-[#8EE0C5] flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'খোঁজ জানান' : 'Check-in'}</span>
              </button>
            </div>
          </div>

          {/* Emergency SOS Section */}
          <div className="sr-card-raised p-4 rounded-3xl border border-[#9B3946]/30 flex flex-col items-center text-center gap-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#9B3946] dark:text-[#FFA8AC]">
              <AlertCircle className="w-4 h-4" />
              <span>{language === 'bn' ? 'জরুরি সাহায্য বোতাম (SOS)' : 'Safety SOS Button'}</span>
            </div>

            {activeSos ? (
              <div className="w-full bg-[#FFF5F5] dark:bg-[#3D1A1E] p-3 rounded-2xl border border-[#9B3946] flex flex-col gap-2">
                <span className="text-xs font-bold text-[#9B3946] dark:text-[#FFA8AC]">
                  {t('child.sosSent', language)}
                </span>
                <button
                  onClick={cancelSos}
                  className="sr-btn-raised py-1.5 px-3 rounded-xl text-xs font-semibold text-[#5B7180]"
                >
                  {t('child.sosCancel', language)}
                </button>
              </div>
            ) : (
              <button
                onMouseDown={handleSosPressStart}
                onMouseUp={handleSosPressEnd}
                onTouchStart={handleSosPressStart}
                onTouchEnd={handleSosPressEnd}
                className={`w-full py-3.5 px-4 rounded-2xl text-xs font-extrabold text-white transition-all select-none shadow-md ${
                  isHoldingSos ? 'bg-[#B84755] scale-98 shadow-inner' : 'sr-btn-danger'
                }`}
              >
                {isHoldingSos
                  ? t('child.sosHolding', language, { count: sosCountdown })
                  : t('child.sosButton', language)}
              </button>
            )}

            <a
              href="tel:999"
              className="w-full py-2 px-3 rounded-xl text-[11px] font-bold text-[#40586B] dark:text-[#C3D4DD] bg-[#E5EDF2] dark:bg-[#172732] flex items-center justify-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#176652]" />
              <span>{t('child.emergencyDial', language)}</span>
            </a>
          </div>

          {/* Quick Family Chat on Child Phone */}
          <div className="sr-card-raised p-3.5 rounded-3xl flex flex-col gap-2">
            <span className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8] flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-[#1C5A70]" />
              <span>{language === 'bn' ? 'পারিবারিক চ্যাট' : 'Message Parent'}</span>
            </span>
            <form onSubmit={handleSendChildChat} className="flex gap-1.5">
              <input
                type="text"
                value={childChatText}
                onChange={(e) => setChildChatText(e.target.value)}
                placeholder={language === 'bn' ? 'আম্মু/আব্বুকে মেসেজ দিন...' : 'Send a message to parent...'}
                className="flex-1 sr-card-inset px-3 py-1.5 rounded-xl text-xs"
              />
              <button
                type="submit"
                className="sr-btn-primary px-3 py-1.5 rounded-xl text-xs font-bold"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          <button
            onClick={() => setShowSimulatedShield(true)}
            className="text-[11px] text-[#5B7180] dark:text-[#AFC0CA] text-center hover:underline py-0.5"
          >
            {language === 'bn'
              ? '📱 দেখুন: সময় শেষ হলে App Shield কেমন দেখায়'
              : '📱 Preview: How App Shield looks when time is up'}
          </button>
        </div>
      )}

      {/* CHILD TAB 2: MY APPS & REQUEST APP ACCESS (Section 3 & 8) */}
      {childTab === 'apps' && (
        <div className="sr-card-raised p-4 rounded-3xl flex flex-col gap-3">
          <div>
            <h3 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
              {language === 'bn'
                ? 'আমার ফোনের অ্যাপস ও আনলক অনুরোধ'
                : 'My Apps & Request App Access'}
            </h3>
            <p className="text-[11px] text-[#5B7180] dark:text-[#AFC0CA]">
              {language === 'bn'
                ? 'ব্লক করা অ্যাপ ব্যবহারের জন্য অভিভাবকের কাছে অনুমতি চান'
                : 'Tap "Ask to Unlock" on any restricted app to request parent approval'}
            </p>
          </div>

          <div className="divide-y divide-[#CFDAE1]/40 dark:divide-[#415560]/30">
            {installedApps.map((app) => {
              const isRestricted = app.status === 'blocked' || app.status === 'pending_approval';
              return (
                <div key={app.id} className="py-2.5 flex items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                      {app.name}
                    </h4>
                    <p className="text-[10px] font-mono text-[#5B7180]">
                      {app.usedMinutesToday}m used ·{' '}
                      {app.dailyLimitMinutes ? `Limit ${app.dailyLimitMinutes}m` : 'No limit'}
                    </p>
                  </div>

                  {isRestricted ? (
                    <button
                      onClick={() =>
                        requestAppAccessFromChild(
                          app.id,
                          `Can I please use ${app.name} for 30 minutes?`
                        )
                      }
                      className="sr-btn-primary px-2.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1 shrink-0"
                    >
                      <Lock className="w-3 h-3" />
                      <span>{language === 'bn' ? 'অনুমতি চান' : 'Ask to Unlock'}</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-bold text-[#176652] dark:text-[#8EE0C5] flex items-center gap-1">
                      <Unlock className="w-3 h-3" />
                      <span>Active</span>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CHILD TAB 3: ONBOARDING, PAIRING & PERMISSIONS WORKFLOW (Section 1 & 8) */}
      {childTab === 'setup' && (
        <div className="flex flex-col gap-3.5">
          {/* Guardian Pairing Code Enrollment */}
          <form
            onSubmit={handlePairSubmit}
            className="sr-card-raised p-4 rounded-3xl flex flex-col gap-2.5"
          >
            <div className="flex items-center gap-2">
              <QrCode className="w-4 h-4 text-[#1C5A70] dark:text-[#7FD5CE]" />
              <h3 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                {language === 'bn'
                  ? 'অভিভাবক পেয়ারিং কোড সংযুক্তি'
                  : 'Guardian Enrollment & Pairing Code'}
              </h3>
            </div>
            <p className="text-[11px] text-[#5B7180]">
              Enter the 6-digit code from your parent's app to bind this device:
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pairingInput}
                onChange={(e) => setPairingInput(e.target.value)}
                className="flex-1 sr-card-inset px-3 py-1.5 rounded-xl text-xs font-mono font-bold tracking-widest text-center"
              />
              <button
                type="submit"
                className="sr-btn-primary px-3.5 py-1.5 rounded-xl text-xs font-bold"
              >
                {selectedChild.isBound ? 'Re-Verify' : 'Bind Phone'}
              </button>
            </div>
          </form>

          {/* Guided Android Permission Setup Workflow */}
          <div className="sr-card-raised p-4 rounded-3xl flex flex-col gap-2.5">
            <h3 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
              {language === 'bn'
                ? 'অ্যান্ড্রয়েড অনুমতি ও সেটআপ গাইড'
                : 'Child Permission Setup Workflow'}
            </h3>
            <div className="space-y-2">
              {permissionItems.map((perm) => {
                const isOn = selectedChild.permissions[perm.key];
                return (
                  <div
                    key={perm.key}
                    className="p-2.5 rounded-2xl bg-[#E5EDF2]/65 dark:bg-[#172732]/65 flex items-center justify-between gap-2"
                  >
                    <div>
                      <h4 className="text-[11px] font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                        {language === 'bn' ? perm.titleBn : perm.titleEn}
                      </h4>
                      <p className="text-[10px] text-[#5B7180] dark:text-[#AFC0CA]">
                        {language === 'bn' ? perm.descBn : perm.descEn}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleChildPermission(selectedChild.id, perm.key)}
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-bold shrink-0 ${
                        isOn
                          ? 'bg-[#176652] text-white'
                          : 'bg-[#955716] text-white'
                      }`}
                    >
                      {isOn ? 'Granted' : 'Grant'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* CHILD TAB 4: DEVICE INFO, TROUBLESHOOTING & PRIVACY RIGHTS (Section 8) */}
      {childTab === 'device' && (
        <div className="flex flex-col gap-3.5">
          <div className="sr-card-raised p-4 rounded-3xl flex flex-col gap-2.5 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[#172B3A] dark:text-[#F2F7F8] flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-[#1C5A70]" />
                <span>Child Device Information & Sync</span>
              </h3>
              <button
                onClick={refreshChildLocation}
                className="text-[11px] font-bold text-[#1C5A70] dark:text-[#7FD5CE] flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Sync Now</span>
              </button>
            </div>

            <div className="space-y-1.5 text-[11px] bg-[#E5EDF2]/60 dark:bg-[#172732]/60 p-3 rounded-2xl font-mono">
              <div>Model: {selectedChild.deviceModel}</div>
              <div>OS: {selectedChild.osVersion}</div>
              <div>Battery: {selectedChild.battery}%</div>
              <div>Connection: {selectedChild.isOnline ? 'Online (TLS 1.3)' : 'Offline Cache Mode'}</div>
              <div>Background Sync: {selectedChild.lastSyncMinutesAgo}m ago</div>
            </div>

            <button
              onClick={() => setShowWhatFamilySees(true)}
              className="sr-btn-raised py-2 px-3 rounded-xl text-xs font-bold text-[#1C5A70] dark:text-[#7FD5CE]"
            >
              {language === 'bn'
                ? 'প্রাইভেসী তথ্য: পরিবার কী দেখতে পায়?'
                : 'Privacy & Data Rights: What My Family Can See'}
            </button>
          </div>
        </div>
      )}

      {/* Time Extension Request Modal */}
      {showTimeModal && (
        <div className="fixed inset-0 z-50 bg-[#152631]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSendTimeRequest}
            className="sr-card-raised p-5 rounded-3xl max-w-xs w-full bg-[#EFF5F8] dark:bg-[#21323D] shadow-2xl flex flex-col gap-4"
          >
            <div className="flex items-center justify-between border-b border-[#CFDAE1]/50 pb-2">
              <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                {t('child.timeAsk', language)}
              </h3>
              <button
                type="button"
                onClick={() => setShowTimeModal(false)}
                className="text-[#5B7180]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold">
                {language === 'bn' ? 'কত মিনিট প্রয়োজন?' : 'How many minutes?'}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[5, 15, 30].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setRequestMinutes(m)}
                    className={`py-2 rounded-xl text-xs font-mono font-bold ${
                      requestMinutes === m
                        ? 'bg-[#1C5A70] dark:bg-[#7FD5CE] text-white dark:text-[#10282C]'
                        : 'sr-card-raised-sm'
                    }`}
                  >
                    +{m}m
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1">
                {language === 'bn' ? 'কারণ (ঐচ্ছিক):' : 'Reason (optional):'}
              </label>
              <textarea
                value={requestReason}
                onChange={(e) => setRequestReason(e.target.value)}
                placeholder={t('child.requestPlaceholder', language)}
                rows={2}
                className="w-full sr-card-inset p-2.5 rounded-xl text-xs text-[#172B3A] dark:text-[#F2F7F8]"
              />
            </div>

            <button
              type="submit"
              className="sr-btn-primary py-2.5 rounded-2xl text-xs font-bold"
            >
              {t('child.sendRequest', language, { minutes: requestMinutes })}
            </button>
          </form>
        </div>
      )}

      {/* Check-In Modal */}
      {showCheckInModal && (
        <div className="fixed inset-0 z-50 bg-[#152631]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSendCheckIn}
            className="sr-card-raised p-5 rounded-3xl max-w-xs w-full bg-[#EFF5F8] dark:bg-[#21323D] shadow-2xl flex flex-col gap-4"
          >
            <div className="flex items-center justify-between border-b border-[#CFDAE1]/50 pb-2">
              <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                {t('child.checkInButton', language)}
              </h3>
              <button
                type="button"
                onClick={() => setShowCheckInModal(false)}
                className="text-[#5B7180]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <input
              type="text"
              value={checkInNote}
              onChange={(e) => setCheckInNote(e.target.value)}
              placeholder={language === 'bn' ? 'যেমন: কোচিং-এ পৌঁছেছি' : 'e.g. Reached coaching safely'}
              className="w-full sr-card-inset p-2.5 rounded-xl text-xs text-[#172B3A] dark:text-[#F2F7F8]"
            />

            <button
              type="submit"
              className="sr-btn-primary py-2.5 rounded-2xl text-xs font-bold"
            >
              {language === 'bn' ? 'খোঁজ পাঠান (I am okay)' : "Send: I'm okay"}
            </button>
          </form>
        </div>
      )}

      {/* What My Family Can See Modal */}
      {showWhatFamilySees && (
        <div className="fixed inset-0 z-50 bg-[#152631]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="sr-card-raised p-5 rounded-3xl max-w-xs w-full bg-[#EFF5F8] dark:bg-[#21323D] shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#CFDAE1]/50 pb-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#176652] dark:text-[#8EE0C5]" />
                <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                  {t('child.whatFamilySees', language)}
                </h3>
              </div>
              <button onClick={() => setShowWhatFamilySees(false)} className="text-[#5B7180]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#D8EBE9]/50 dark:bg-[#264D4E]/30">
                <span className="font-bold text-[#176652] dark:text-[#8EE0C5]">
                  ✓ {language === 'bn' ? 'যা পরিবার দেখতে পায়:' : 'What family can see:'}
                </span>
                <ul className="list-disc list-inside mt-1 text-[11px] text-[#40586B] dark:text-[#C3D4DD] space-y-0.5">
                  <li>{language === 'bn' ? 'দৈনিক স্ক্রিন ও অ্যাপ ব্যবহারের সময়' : 'Screen time & installed apps list'}</li>
                  <li>{language === 'bn' ? 'নিরাপদ স্থান ও স্বেচ্ছায় পাঠানো খোঁজ' : 'Safe zones & voluntary check-ins'}</li>
                  <li>{language === 'bn' ? 'সম্মতি সাপেক্ষ লাইভ সহায়তা সেশন' : 'Consented remote safety sessions'}</li>
                </ul>
              </div>

              <div className="p-2.5 rounded-xl bg-[#FFF5F5] dark:bg-[#3D1A1E]">
                <span className="font-bold text-[#9B3946] dark:text-[#FFA8AC]">
                  ✕ {language === 'bn' ? 'যা কখনোই গোপনে হয় না:' : 'What NEVER happens secretly:'}
                </span>
                <ul className="list-disc list-inside mt-1 text-[11px] text-[#40586B] dark:text-[#C3D4DD] space-y-0.5">
                  <li>{language === 'bn' ? 'গোপন ক্যামেরা বা মাইক্রোফোন রেকর্ডিং' : 'Covert camera or mic recording'}</li>
                  <li>{language === 'bn' ? 'পাসওয়ার্ড বা ওটিপি সংগ্রহ' : 'Passwords or OTP codes (auto-masked)'}</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowWhatFamilySees(false)}
              className="sr-btn-raised py-2 rounded-xl text-xs font-bold text-center mt-1"
            >
              {language === 'bn' ? 'বুঝেছি' : 'Understood'}
            </button>
          </div>
        </div>
      )}

      {/* Simulated App Shield Modal */}
      {showSimulatedShield && (
        <div className="fixed inset-0 z-50 bg-[#152631]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="sr-card-raised p-6 rounded-3xl max-w-xs w-full bg-[#EFF5F8] dark:bg-[#21323D] shadow-2xl flex flex-col items-center text-center gap-4">
            <div className="p-3.5 rounded-full bg-[#D8EBE9] dark:bg-[#264D4E] text-[#1C5A70] dark:text-[#7FD5CE]">
              <Moon className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-base font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                {t('child.timeFinished', language)}
              </h3>
              <p className="text-xs text-[#5B7180] dark:text-[#AFC0CA] mt-1">
                {language === 'bn'
                  ? 'আজকের জন্য নির্ধারিত সময় শেষ হয়েছে। তবে জরুরি কল ও পারিবারিক চ্যাট সর্বদা খোলা থাকবে।'
                  : 'Your routine limit is reached. Emergency calls and family chat remain available.'}
              </p>
            </div>

            <div className="flex flex-col gap-2 w-full pt-1">
              <button
                onClick={() => {
                  setShowSimulatedShield(false);
                  setShowTimeModal(true);
                }}
                className="sr-btn-primary py-2.5 rounded-2xl text-xs font-bold"
              >
                {t('child.timeAsk', language)}
              </button>
              <button
                onClick={() => setShowSimulatedShield(false)}
                className="sr-btn-raised py-2.5 rounded-2xl text-xs font-semibold text-[#5B7180]"
              >
                {language === 'bn' ? 'শিল্ড বন্ধ করুন (Close Preview)' : 'Close Preview'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

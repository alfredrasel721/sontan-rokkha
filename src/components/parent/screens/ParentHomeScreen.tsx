import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { t } from '../../../i18n/translations';
import {
  Smartphone,
  BatteryCharging,
  Battery,
  Wifi,
  WifiOff,
  Clock,
  Moon,
  AlertCircle,
  MessageCircle,
  Send,
  ChevronRight,
  Info,
  X,
  BarChart3,
  Grid,
  Compass,
  Monitor,
  MessageSquareWarning,
  Globe,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

export const ParentHomeScreen: React.FC = () => {
  const {
    language,
    childrenList,
    selectedChild,
    setSelectedChildId,
    toggleChildOnlineStatus,
    updateChildBattery,
    policyRules,
    timeRequests,
    respondToTimeRequest,
    requestCheckInFromChild,
    setActiveParentTab,
    activeSos,
    acknowledgeSos,
    installedApps,
    socialNotifications,
    webActivityLogs,
    safeZones,
    remoteSession,
  } = useApp();

  const [showOptimizationGuide, setShowOptimizationGuide] = useState(false);

  const bedtimeRule = policyRules.find((r) => r.type === 'bedtime');
  const pendingRequests = timeRequests.filter(
    (r) => r.childId === selectedChild.id && r.status === 'pending'
  );

  const used = selectedChild.dailyUsageMinutes;
  const limit = selectedChild.dailyLimitMinutes;
  const remaining = Math.max(0, limit - used);
  const percentage = Math.min(100, Math.round((used / limit) * 100));

  const childDisplayName = language === 'bn' ? selectedChild.nickname : selectedChild.name;

  const pendingAppsCount = installedApps.filter((a) => a.status === 'pending_approval').length;
  const flaggedSocialCount = socialNotifications.filter((n) => n.riskLevel !== 'safe').length;
  const blockedWebCount = webActivityLogs.filter((w) => w.action === 'blocked').length;
  const activeZonesCount = safeZones.filter((z) => z.isActive).length;

  const revokedPermissions = Object.entries(selectedChild.permissions)
    .filter(([, granted]) => !granted)
    .map(([key]) => key);

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 max-w-2xl mx-auto w-full">
      {/* SOS Alert Banner if Active */}
      {activeSos && (
        <div className="sr-card-raised p-4 rounded-3xl border-2 border-[#9B3946] bg-[#FFF5F5] dark:bg-[#3D1A1E] flex flex-col gap-3 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-[#9B3946] text-white">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9B3946] dark:text-[#FFA8AC]">
                {t('safety.sosUrgent', language)}
              </span>
              <h3 className="text-base font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                {t('safety.sos', language, { name: childDisplayName })}
              </h3>
              <p className="text-xs text-[#40586B] dark:text-[#C3D4DD] mt-0.5">
                {t('safety.sosTime', language, { time: activeSos.timestamp })} · {activeSos.locationLabel}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-[#9B3946]/20">
            <a
              href="tel:999"
              className="flex-1 sr-btn-danger text-center py-2.5 px-3 rounded-2xl text-xs font-bold"
            >
              {t('safety.sosCall', language, { name: childDisplayName })} (999)
            </a>
            <button
              onClick={acknowledgeSos}
              className="flex-1 sr-btn-raised py-2.5 px-3 rounded-2xl text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]"
            >
              {t('safety.sosAcknowledge', language)}
            </button>
          </div>
        </div>
      )}

      {/* Family Overview Dashboard Strip (Section 9) */}
      <div className="sr-card-raised p-4 rounded-3xl flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
            {language === 'bn' ? 'পারিবারিক সারসংক্ষেপ (Family Overview)' : 'Family Overview Dashboard'}
          </span>
          <span className="text-[11px] text-[#5B7180] dark:text-[#AFC0CA]">
            {childrenList.length} {language === 'bn' ? 'জন সন্তান যুক্ত' : 'children enrolled'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {childrenList.map((child) => {
            const isSelected = child.id === selectedChild.id;
            return (
              <button
                key={child.id}
                onClick={() => setSelectedChildId(child.id)}
                className={`p-3 rounded-2xl text-left transition-all flex items-center justify-between gap-2 ${
                  isSelected
                    ? 'sr-card-inset border border-[#1C5A70]/50 dark:border-[#7FD5CE]/50'
                    : 'bg-[#E5EDF2]/60 dark:bg-[#172732]/60 hover:bg-[#E5EDF2]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-9 h-9 rounded-2xl flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: child.avatarColor }}
                  >
                    {child.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8] truncate">
                      {language === 'bn' ? child.nickname : child.name} · {child.age}y
                    </h4>
                    <p className="text-[11px] font-mono text-[#5B7180] dark:text-[#AFC0CA] truncate">
                      {child.dailyUsageMinutes}/{child.dailyLimitMinutes}m · {child.battery}%
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-lg shrink-0 ${
                    child.isOnline
                      ? 'text-[#176652] dark:text-[#8EE0C5]'
                      : 'text-[#955716] dark:text-[#FFCE8A]'
                  }`}
                >
                  {child.isOnline ? 'Online' : 'Offline'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Greeting & Individual Child Hero Status Card */}
      <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#D8EBE9] dark:bg-[#264D4E] text-[#1C5A70] dark:text-[#7FD5CE]">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] text-[#5B7180] dark:text-[#AFC0CA] font-medium">
                {t('home.hello', language)}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                {selectedChild.isOnline
                  ? t('home.connected', language, { name: childDisplayName })
                  : language === 'bn'
                  ? `${childDisplayName}-এর ফোন বর্তমানে অফলাইনে আছে`
                  : `${childDisplayName}'s phone is currently offline`}
              </h2>
              <p className="text-xs text-[#5B7180] dark:text-[#AFC0CA]">
                {selectedChild.deviceModel} · {selectedChild.osVersion} ·{' '}
                {t('home.lastSync', language, { time: `${selectedChild.lastSyncMinutesAgo}m` })}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1.5 rounded-2xl bg-[#E5EDF2] dark:bg-[#172732] text-[#40586B] dark:text-[#C3D4DD]">
              {selectedChild.isCharging ? (
                <BatteryCharging className="w-4 h-4 text-[#176652] dark:text-[#8EE0C5]" />
              ) : (
                <Battery
                  className={`w-4 h-4 ${
                    selectedChild.battery <= 20 ? 'text-[#9B3946]' : ''
                  }`}
                />
              )}
              <span>{selectedChild.battery}%</span>
              {selectedChild.isOnline ? (
                <Wifi className="w-3.5 h-3.5 ml-1 text-[#176652] dark:text-[#8EE0C5]" />
              ) : (
                <WifiOff className="w-3.5 h-3.5 ml-1 text-[#955716]" />
              )}
            </div>
          </div>
        </div>

        {/* Device Health & Simulation Controls (Online/Offline & Battery Alert Test) */}
        <div className="p-3 rounded-2xl bg-[#E5EDF2]/60 dark:bg-[#172732]/60 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#40586B] dark:text-[#C3D4DD]">
              {language === 'bn' ? 'ডিভাইস স্ট্যাটাস সিমুলেটর:' : 'Device Simulator:'}
            </span>
            <button
              onClick={() => toggleChildOnlineStatus(selectedChild.id)}
              className="sr-btn-raised px-2.5 py-1 rounded-xl text-[11px] font-bold text-[#1C5A70] dark:text-[#7FD5CE]"
            >
              {selectedChild.isOnline ? 'Set Offline' : 'Set Online'}
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[#5B7180]">Battery:</span>
            {[15, 43, 85].map((pct) => (
              <button
                key={pct}
                onClick={() => updateChildBattery(selectedChild.id, pct)}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-mono font-bold ${
                  selectedChild.battery === pct
                    ? 'bg-[#1C5A70] dark:bg-[#7FD5CE] text-white dark:text-[#10282C]'
                    : 'sr-card-raised-sm text-[#40586B]'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>

        {/* Quick Safety Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => requestCheckInFromChild(selectedChild.id)}
            className="sr-btn-raised flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs font-semibold text-[#1C5A70] dark:text-[#7FD5CE]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t('home.actionCheckIn', language)}</span>
          </button>
          <button
            onClick={() => setActiveParentTab('family')}
            className="sr-btn-raised flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs font-semibold text-[#40586B] dark:text-[#C3D4DD]"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{t('home.actionMessage', language)}</span>
          </button>
        </div>
      </div>

      {/* Offline or Permission-Revoked Alert Banner (Section 9) */}
      {(!selectedChild.isOnline || revokedPermissions.length > 0) && (
        <div className="sr-card-raised-sm p-3.5 rounded-2xl border border-[#955716]/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-[#955716] dark:text-[#FFCE8A] shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                {!selectedChild.isOnline
                  ? language === 'bn'
                    ? 'সন্তানের ডিভাইস অফলাইনে আছে'
                    : 'Child Device Offline Alert'
                  : language === 'bn'
                  ? `অনুমতি ও অপটিমাইজেশন মনোযোগ প্রয়োজন (${revokedPermissions.join(', ')})`
                  : `Permission / Battery Optimization Needs Attention (${revokedPermissions.join(', ')})`}
              </h4>
              <p className="text-xs text-[#5B7180] dark:text-[#AFC0CA] leading-tight">
                {t('home.permissionFixNotice', language)}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowOptimizationGuide(true)}
            className="text-xs font-bold text-[#1C5A70] dark:text-[#7FD5CE] whitespace-nowrap px-2.5 py-1 rounded-xl hover:underline shrink-0"
          >
            {t('home.permissionFixAction', language)}
          </button>
        </div>
      )}

      {/* Pending Time / App Requests Section */}
      {pendingRequests.length > 0 && (
        <div className="sr-card-raised p-4 rounded-3xl border border-[#1C5A70]/30 bg-[#F4F9FB] dark:bg-[#1A2D3A] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#1C5A70] dark:text-[#7FD5CE]" />
              <span className="text-xs font-bold text-[#1C5A70] dark:text-[#7FD5CE]">
                {t('home.usefulUpdate', language)} ({pendingRequests.length})
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#5B7180] dark:text-[#AFC0CA]">
              {pendingRequests[0].requestedAt}
            </span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
              {pendingRequests[0].requestType === 'app_unblock'
                ? `${childDisplayName} requested to unlock ${pendingRequests[0].appName}`
                : t('home.timeRequestPending', language, {
                    name: childDisplayName,
                    minutes: pendingRequests[0].requestedMinutes,
                  })}
            </h4>
            <p className="text-xs text-[#40586B] dark:text-[#C3D4DD] mt-0.5 italic">
              "{pendingRequests[0].reason}"
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => respondToTimeRequest(pendingRequests[0].id, true)}
              className="flex-1 sr-btn-primary py-2 px-3 rounded-xl text-xs font-bold"
            >
              {t('requests.approve', language, { minutes: pendingRequests[0].requestedMinutes })}
            </button>
            <button
              onClick={() => respondToTimeRequest(pendingRequests[0].id, false)}
              className="flex-1 sr-btn-raised py-2 px-3 rounded-xl text-xs font-semibold text-[#5B7180] hover:text-[#9B3946]"
            >
              {t('requests.decline', language)}
            </button>
          </div>
        </div>
      )}

      {/* Today's Screen Balance Card */}
      <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#5B7180] dark:text-[#AFC0CA]">
            {t('home.todayBalance', language)}
          </span>
          <button
            onClick={() => setActiveParentTab('usage')}
            className="text-xs font-bold text-[#1C5A70] dark:text-[#7FD5CE] flex items-center gap-1 hover:underline"
          >
            <span>{t('home.remaining', language, { remaining })}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center rounded-full sr-card-inset">
            <svg className="w-18 h-18 -rotate-90" viewBox="0 0 36 36">
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
              <span className="text-base font-bold font-mono text-[#172B3A] dark:text-[#F2F7F8]">
                {percentage}%
              </span>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-base font-bold text-[#172B3A] dark:text-[#F2F7F8]">
              {t('home.usageToday', language, { used, limit })}
            </h3>
            <p className="text-xs text-[#5B7180] dark:text-[#AFC0CA] mt-1 leading-snug">
              {language === 'bn'
                ? `বেডটাইম: ${bedtimeRule?.fromTime || '21:30'} · ইউটিউব কিডস ২৮ মি., ম্যাথ লীগ ১৮ মি.`
                : `Bedtime: ${bedtimeRule?.fromTime || '21:30'} · YouTube Kids 28m, Math League 18m`}
            </p>
          </div>
        </div>
      </div>

      {/* Daily Activity Summary & All Feature Modules Grid */}
      <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
            {language === 'bn'
              ? 'সকল সুরক্ষা মডিউল ও দৈনিক সারাংশ'
              : 'Protection Modules & Daily Activity Summary'}
          </h3>
          <span className="text-[11px] text-[#5B7180]">Tap any module</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {[
            {
              tab: 'usage' as const,
              titleEn: 'Screen Time & Reports',
              titleBn: 'স্ক্রিন টাইম ও রিপোর্ট',
              meta: `${used}m today · 7d chart`,
              icon: BarChart3,
            },
            {
              tab: 'apps' as const,
              titleEn: 'App Management',
              titleBn: 'অ্যাপ নিয়ন্ত্রণ',
              meta: `${installedApps.length} apps · ${pendingAppsCount} new`,
              icon: Grid,
            },
            {
              tab: 'checkins' as const,
              titleEn: 'GPS & Safe Zones',
              titleBn: 'অবস্থান ও জিওফেন্স',
              meta: `${activeZonesCount} active safe zones`,
              icon: Compass,
            },
            {
              tab: 'remote' as const,
              titleEn: 'Remote Monitoring',
              titleBn: 'রিমোট মনিটরিং',
              meta:
                remoteSession.status === 'active'
                  ? 'LIVE SESSION'
                  : 'Screen · Camera · Audio',
              icon: Monitor,
            },
            {
              tab: 'social' as const,
              titleEn: 'Social & AI Safety',
              titleBn: 'সোশ্যাল ও এআই ঝুঁকি',
              meta: `${flaggedSocialCount} flagged alerts`,
              icon: MessageSquareWarning,
            },
            {
              tab: 'web' as const,
              titleEn: 'Web Content Filter',
              titleBn: 'ওয়েব কন্টেন্ট ফিল্টার',
              meta: `${blockedWebCount} blocked · SafeSearch`,
              icon: Globe,
            },
          ].map((mod) => (
            <button
              key={mod.tab}
              onClick={() => setActiveParentTab(mod.tab)}
              className="p-3 rounded-2xl bg-[#E5EDF2]/65 dark:bg-[#172732]/65 hover:bg-[#D8EBE9]/60 dark:hover:bg-[#264D4E]/40 text-left transition-all flex flex-col justify-between gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-[#EFF5F8] dark:bg-[#21323D] text-[#1C5A70] dark:text-[#7FD5CE]">
                  <mod.icon className="w-4 h-4" />
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#5B7180]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                  {language === 'bn' ? mod.titleBn : mod.titleEn}
                </h4>
                <p className="text-[10px] font-mono text-[#5B7180] dark:text-[#AFC0CA] mt-0.5">
                  {mod.meta}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Samsung Background Optimization Guide Modal */}
      {showOptimizationGuide && (
        <div className="fixed inset-0 z-50 bg-[#152631]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="sr-card-raised p-5 rounded-3xl max-w-md w-full bg-[#EFF5F8] dark:bg-[#21323D] shadow-2xl flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-[#1C5A70] dark:text-[#7FD5CE]" />
                <h3 className="text-base font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                  {language === 'bn' ? 'ডিভাইস ব্যাটারি অপটিমাইজেশন সহায়তা' : 'Device Optimization Guide'}
                </h3>
              </div>
              <button
                onClick={() => setShowOptimizationGuide(false)}
                className="text-[#5B7180] hover:text-[#172B3A] dark:hover:text-[#F2F7F8]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#40586B] dark:text-[#C3D4DD] leading-relaxed">
              {language === 'bn'
                ? 'কিছু অ্যান্ড্রয়েড ব্র্যান্ড (যেমন: স্যামসাং, শাওমি) ব্যাকগ্রাউন্ড প্রসেস স্বয়ংক্রিয়ভাবে বন্ধ করে দেয়। রুটিন ও জরুরি সতর্কবার্তা সময়মতো কার্যকর রাখতে ৩টি সহজ পদক্ষেপ নিন:'
                : 'Certain Android manufacturers (Samsung One UI, Xiaomi MIUI) aggressively kill background processes. To ensure timely bedtime alerts:'}
            </p>

            <ol className="text-xs text-[#172B3A] dark:text-[#F2F7F8] space-y-2 list-decimal list-inside bg-[#E5EDF2] dark:bg-[#172732] p-3.5 rounded-2xl">
              <li>
                {language === 'bn'
                  ? 'সন্তানের ফোনে Settings > Apps > Sontan Rokkha Companion খুলুন'
                  : 'Open Settings > Apps > Sontan Rokkha Companion on child phone'}
              </li>
              <li>
                {language === 'bn'
                  ? 'Battery বিকল্পে গিয়ে "Unrestricted" নির্বাচন করুন'
                  : 'Select Battery > Choose "Unrestricted"'}
              </li>
              <li>
                {language === 'bn'
                  ? 'App Usage Access সক্রিয় আছে কি না নিশ্চিত করুন'
                  : 'Verify Usage Access permission is granted'}
              </li>
            </ol>

            <button
              onClick={() => setShowOptimizationGuide(false)}
              className="sr-btn-primary py-2.5 rounded-2xl text-xs font-bold text-center"
            >
              {language === 'bn' ? 'বুঝেছি, সম্পন্ন করেছি' : 'Got it, checked on phone'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

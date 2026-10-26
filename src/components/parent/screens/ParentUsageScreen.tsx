import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { t } from '../../../i18n/translations';
import { PolicyRule } from '../../../types';
import {
  Clock,
  Moon,
  BookOpen,
  Plus,
  CheckCircle2,
  Shield,
  BarChart3,
  Activity,
  X,
  ArrowUpRight,
} from 'lucide-react';

export const ParentUsageScreen: React.FC = () => {
  const {
    language,
    selectedChild,
    policyRules,
    policyVersion,
    createOrUpdateRule,
    deleteRule,
    installedApps,
    timeRequests,
    respondToTimeRequest,
    setActiveParentTab,
  } = useApp();

  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [newRuleType, setNewRuleType] = useState<PolicyRule['type']>('bedtime');
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const [fromTime, setFromTime] = useState('21:30');
  const [untilTime, setUntilTime] = useState('06:30');
  const [limitMinutes, setLimitMinutes] = useState(selectedChild.dailyLimitMinutes);

  const dayLabelsEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayLabelsBn = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];
  const dayLabels = language === 'bn' ? dayLabelsBn : dayLabelsEn;

  const childDisplayName = language === 'bn' ? selectedChild.nickname : selectedChild.name;
  const childApps = installedApps
    .filter((a) => a.childId === selectedChild.id || a.childId === 'child-ayan')
    .sort((a, b) => b.usedMinutesToday - a.usedMinutesToday);

  const pendingRequests = timeRequests.filter(
    (r) => r.childId === selectedChild.id && r.status === 'pending'
  );

  const weeklyTotal = selectedChild.weeklyUsageMinutes.reduce((acc, d) => acc + d.minutes, 0);
  const weeklyAvg = Math.round(weeklyTotal / 7);
  const maxWeeklyDay = Math.max(...selectedChild.weeklyUsageMinutes.map((d) => d.minutes), 120);

  const handleDayToggle = (dayIndex: number) => {
    if (selectedDays.includes(dayIndex)) {
      if (selectedDays.length > 1) {
        setSelectedDays(selectedDays.filter((d) => d !== dayIndex));
      }
    } else {
      setSelectedDays([...selectedDays, dayIndex].sort());
    }
  };

  const handleSaveRoutine = () => {
    let titleKey = 'rules.bedtime';
    if (newRuleType === 'daily_limit') titleKey = 'rules.dailyLimit';
    if (newRuleType === 'school_focus') titleKey = 'rules.schoolFocus';

    createOrUpdateRule({
      id: 'rule-' + Date.now(),
      type: newRuleType,
      titleKey,
      days: selectedDays,
      fromTime: newRuleType !== 'daily_limit' ? fromTime : undefined,
      untilTime: newRuleType !== 'daily_limit' ? untilTime : undefined,
      limitMinutes: newRuleType === 'daily_limit' ? limitMinutes : undefined,
      exemptions: ['Emergency (999)', 'Family Chat', 'School Portal'],
      isActive: true,
    });

    setShowWizard(false);
    setWizardStep(1);
  };

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 max-w-2xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#172B3A] dark:text-[#F2F7F8]">
            {language === 'bn' ? 'স্ক্রিন টাইম, ব্যবহার ও রুটিন' : 'Screen Time & Usage Analytics'}
          </h2>
          <p className="text-xs text-[#5B7180] dark:text-[#AFC0CA] mt-0.5">
            {language === 'bn'
              ? `${childDisplayName}-এর দৈনিক ও সাপ্তাহিক ব্যবহারের প্রতিবেদন এবং সময়সীমা`
              : `Daily overview, weekly reports, app launch frequency, and routines for ${childDisplayName}`}
          </p>
        </div>

        <button
          onClick={() => {
            setShowWizard(true);
            setWizardStep(1);
          }}
          className="sr-btn-primary flex items-center gap-1.5 py-2.5 px-3.5 rounded-2xl text-xs font-bold whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{t('rules.add', language)}</span>
        </button>
      </div>

      {/* Pending Time / App Requests Approval Box */}
      {pendingRequests.length > 0 && (
        <div className="sr-card-raised p-4 rounded-3xl border border-[#1C5A70]/30 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1C5A70] dark:text-[#7FD5CE]">
              {language === 'bn' ? 'অনুমোদনের অপেক্ষায় থাকা অনুরোধ' : 'Pending Child Requests'} ({pendingRequests.length})
            </span>
            <span className="text-xs text-[#5B7180] dark:text-[#AFC0CA] font-mono">
              {pendingRequests[0].requestedAt}
            </span>
          </div>
          {pendingRequests.map((req) => (
            <div
              key={req.id}
              className="p-3 rounded-2xl bg-[#E5EDF2]/60 dark:bg-[#172732]/60 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                  {req.requestType === 'app_unblock'
                    ? `${req.childName} requested access to ${req.appName}`
                    : `${req.childName} asked for +${req.requestedMinutes} min screen time`}
                </span>
              </div>
              <p className="text-xs text-[#40586B] dark:text-[#C3D4DD] italic">"{req.reason}"</p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => respondToTimeRequest(req.id, true)}
                  className="flex-1 sr-btn-primary py-2 px-3 rounded-xl text-xs font-bold"
                >
                  {language === 'bn' ? 'অনুমোদন করুন' : 'Approve Request'}
                </button>
                <button
                  onClick={() => respondToTimeRequest(req.id, false)}
                  className="flex-1 sr-btn-raised py-2 px-3 rounded-xl text-xs font-semibold text-[#5B7180]"
                >
                  {t('requests.decline', language)}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Daily Overview + Hourly Usage Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sr-card-raised p-4 rounded-3xl flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#5B7180] dark:text-[#AFC0CA]">
              {language === 'bn' ? 'আজকের মোট ব্যবহার' : 'Daily Screen-Time Overview'}
            </span>
            <Clock className="w-4 h-4 text-[#1C5A70] dark:text-[#7FD5CE]" />
          </div>
          <div>
            <div className="text-2xl font-extrabold font-mono text-[#172B3A] dark:text-[#F2F7F8]">
              {selectedChild.dailyUsageMinutes}m{' '}
              <span className="text-sm font-normal text-[#5B7180]">
                / {selectedChild.dailyLimitMinutes}m
              </span>
            </div>
            <p className="text-xs text-[#176652] dark:text-[#8EE0C5] mt-1 font-medium">
              {Math.max(0, selectedChild.dailyLimitMinutes - selectedChild.dailyUsageMinutes)}{' '}
              {language === 'bn' ? 'মিনিট অবশিষ্ট আছে' : 'minutes remaining today'}
            </p>
          </div>
          <div className="w-full h-2.5 rounded-full bg-[#E5EDF2] dark:bg-[#172732] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#1C5A70] dark:bg-[#7FD5CE]"
              style={{
                width: `${Math.min(
                  100,
                  Math.round((selectedChild.dailyUsageMinutes / selectedChild.dailyLimitMinutes) * 100)
                )}%`,
              }}
            />
          </div>
        </div>

        {/* Hourly Timeline */}
        <div className="sr-card-raised p-4 rounded-3xl flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#5B7180] dark:text-[#AFC0CA]">
              {language === 'bn' ? 'সময়ভিত্তিক ব্যবহার (Timeline)' : 'Hourly Usage Timeline'}
            </span>
            <Activity className="w-4 h-4 text-[#1C5A70] dark:text-[#7FD5CE]" />
          </div>
          <div className="flex items-end justify-between gap-2 h-20 pt-2">
            {selectedChild.hourlyUsageToday.map((slot) => (
              <div key={slot.hour} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-mono text-[#5B7180]">{slot.minutes}m</span>
                <div className="w-full bg-[#E5EDF2] dark:bg-[#172732] rounded-t-lg h-12 flex items-end overflow-hidden">
                  <div
                    className="w-full bg-[#217E7B] dark:bg-[#7FD5CE] rounded-t-lg"
                    style={{ height: `${Math.min(100, (slot.minutes / 25) * 100)}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-[#5B7180]">{slot.hour.slice(0, 2)}h</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7-Day Weekly Usage Report Chart */}
      <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8] flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#1C5A70] dark:text-[#7FD5CE]" />
              <span>{language === 'bn' ? 'সাপ্তাহিক ব্যবহারের প্রতিবেদন (৭ দিন)' : 'Weekly Usage Report (7 Days)'}</span>
            </h3>
            <p className="text-xs text-[#5B7180] dark:text-[#AFC0CA]">
              {language === 'bn'
                ? `সাপ্তাহিক মোট: ${weeklyTotal} মিনিট · দৈনিক গড়: ${weeklyAvg} মিনিট`
                : `Weekly Total: ${weeklyTotal} min · Daily Avg: ${weeklyAvg} min/day`}
            </p>
          </div>
          <span className="text-xs font-mono text-[#176652] dark:text-[#8EE0C5]">
            Limit: {selectedChild.dailyLimitMinutes}m
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 items-end h-32 pt-4 px-1">
          {selectedChild.weeklyUsageMinutes.map((item) => {
            const isOver = item.minutes > selectedChild.dailyLimitMinutes;
            const heightPct = Math.min(100, Math.round((item.minutes / maxWeeklyDay) * 100));
            return (
              <div key={item.dayEn} className="flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[10px] font-mono font-semibold text-[#40586B] dark:text-[#C3D4DD]">
                  {item.minutes}m
                </span>
                <div className="w-full max-w-[28px] h-20 bg-[#E5EDF2] dark:bg-[#172732] rounded-xl flex items-end overflow-hidden p-0.5">
                  <div
                    className={`w-full rounded-lg transition-all ${
                      isOver ? 'bg-[#D97759]' : 'bg-[#1C5A70] dark:bg-[#7FD5CE]'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className="text-[11px] font-semibold text-[#172B3A] dark:text-[#F2F7F8]">
                  {language === 'bn' ? item.dayBn : item.dayEn}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Most-Used Apps Ranking & Launch Frequency */}
      <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
            {language === 'bn'
              ? 'সর্বাধিক ব্যবহৃত অ্যাপ ও খোলার সংখ্যা (Launch Frequency)'
              : 'Most-Used Apps Ranking & Launch Frequency'}
          </h3>
          <button
            onClick={() => setActiveParentTab('apps')}
            className="text-xs font-bold text-[#1C5A70] dark:text-[#7FD5CE] flex items-center gap-1 hover:underline"
          >
            <span>{language === 'bn' ? 'অ্যাপ নিয়ন্ত্রণ' : 'Manage Apps'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-[#CFDAE1]/40 dark:divide-[#415560]/30">
          {childApps.map((app, index) => (
            <div key={app.id} className="py-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs font-mono font-bold text-[#5B7180] w-5">
                  #{index + 1}
                </span>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8] truncate">
                    {app.name}
                  </h4>
                  <p className="text-[11px] text-[#5B7180] dark:text-[#AFC0CA]">
                    {app.category} · {app.launchesToday} {language === 'bn' ? 'বার খোলা হয়েছে' : 'launches today'}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-mono font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                  {app.usedMinutesToday}m
                </span>
                {app.dailyLimitMinutes ? (
                  <span className="block text-[10px] font-mono text-[#5B7180]">
                    Limit: {app.dailyLimitMinutes}m
                  </span>
                ) : (
                  <span className="block text-[10px] text-[#176652] dark:text-[#8EE0C5]">
                    No limit
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Downtime & Screen-Time Rules */}
      <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#1C5A70] dark:text-[#7FD5CE]" />
            <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
              {language === 'bn' ? 'নির্ধারিত ডাউনটাইম ও স্ক্রিন রুটিন' : 'Scheduled Downtime & Screen-Time Rules'}
            </h3>
          </div>
          <span className="text-xs font-mono text-[#5B7180] dark:text-[#AFC0CA]">
            Policy v{policyVersion}
          </span>
        </div>

        <div className="space-y-2.5">
          {policyRules.map((rule) => {
            let Icon = Moon;
            if (rule.type === 'daily_limit') Icon = Clock;
            if (rule.type === 'school_focus') Icon = BookOpen;

            const isPending = rule.status === 'pending_ack';

            return (
              <div
                key={rule.id}
                className="p-3.5 rounded-2xl bg-[#E5EDF2]/60 dark:bg-[#172732]/60 flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-[#D8EBE9] dark:bg-[#264D4E] text-[#1C5A70] dark:text-[#7FD5CE]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                        {t(rule.titleKey, language)}
                      </h4>
                      <p className="text-[11px] font-mono text-[#5B7180] dark:text-[#AFC0CA]">
                        {rule.fromTime && rule.untilTime
                          ? `${rule.fromTime} – ${rule.untilTime}`
                          : `${rule.limitMinutes} min/day`}{' '}
                        · {rule.days.length === 7 ? 'Everyday' : `${rule.days.length} days/wk`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-[#176652] dark:text-[#8EE0C5] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isPending ? 'Syncing...' : 'Applied'}</span>
                    </span>
                    <button
                      onClick={() => deleteRule(rule.id)}
                      className="text-[11px] text-[#9B3946] dark:text-[#FFA8AC] hover:underline font-semibold ml-1"
                    >
                      {language === 'bn' ? 'মুছুন' : 'Remove'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3-Step Routine Wizard Modal */}
      {showWizard && (
        <div className="fixed inset-0 z-50 bg-[#152631]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="sr-card-raised p-5 rounded-3xl max-w-md w-full bg-[#EFF5F8] dark:bg-[#21323D] shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#CFDAE1]/50 dark:border-[#415560]/40 pb-3">
              <div>
                <span className="text-[11px] font-bold text-[#1C5A70] dark:text-[#7FD5CE]">
                  {wizardStep === 1 && t('rules.step1', language)}
                  {wizardStep === 2 && t('rules.step2', language)}
                  {wizardStep === 3 && t('rules.step3', language)}
                </span>
                <h3 className="text-base font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                  {t('rules.add', language)}
                </h3>
              </div>
              <button
                onClick={() => setShowWizard(false)}
                className="text-[#5B7180] hover:text-[#172B3A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {wizardStep === 1 && (
              <div className="flex flex-col gap-2.5">
                {[
                  {
                    type: 'bedtime' as const,
                    title: t('rules.bedtime', language),
                    desc: t('rules.bedtimeDesc', language),
                    icon: Moon,
                  },
                  {
                    type: 'daily_limit' as const,
                    title: t('rules.dailyLimit', language),
                    desc: t('rules.dailyLimitDesc', language),
                    icon: Clock,
                  },
                  {
                    type: 'school_focus' as const,
                    title: t('rules.schoolFocus', language),
                    desc: t('rules.schoolFocusDesc', language),
                    icon: BookOpen,
                  },
                ].map((item) => (
                  <button
                    key={item.type}
                    onClick={() => setNewRuleType(item.type)}
                    className={`p-3.5 rounded-2xl flex items-start gap-3 text-left transition-all ${
                      newRuleType === item.type
                        ? 'sr-card-inset border-2 border-[#1C5A70] dark:border-[#7FD5CE]'
                        : 'sr-card-raised-sm'
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-[#D8EBE9] dark:bg-[#264D4E] text-[#1C5A70] dark:text-[#7FD5CE]">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#5B7180] dark:text-[#AFC0CA] mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                ))}
                <button
                  onClick={() => setWizardStep(2)}
                  className="sr-btn-primary py-2.5 rounded-2xl text-xs font-bold mt-2"
                >
                  {language === 'bn' ? 'পরবর্তী ধাপ' : 'Next Step'}
                </button>
              </div>
            )}

            {wizardStep === 2 && (
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold">
                  {language === 'bn' ? 'দিন নির্বাচন করুন:' : 'Select Days:'}
                </span>
                <div className="grid grid-cols-7 gap-1.5">
                  {dayLabels.map((label, idx) => (
                    <button
                      key={label}
                      onClick={() => handleDayToggle(idx)}
                      className={`py-2 rounded-xl text-xs font-bold ${
                        selectedDays.includes(idx)
                          ? 'bg-[#1C5A70] dark:bg-[#7FD5CE] text-white dark:text-[#10282C]'
                          : 'sr-card-inset text-[#5B7180]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {newRuleType === 'daily_limit' ? (
                  <div className="grid grid-cols-4 gap-2 pt-2">
                    {[30, 60, 90, 120].map((m) => (
                      <button
                        key={m}
                        onClick={() => setLimitMinutes(m)}
                        className={`py-2 rounded-xl text-xs font-mono font-bold ${
                          limitMinutes === m
                            ? 'bg-[#1C5A70] dark:bg-[#7FD5CE] text-white dark:text-[#10282C]'
                            : 'sr-card-raised-sm'
                        }`}
                      >
                        {m}m
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-xs font-semibold block mb-1">Starts:</label>
                      <input
                        type="time"
                        value={fromTime}
                        onChange={(e) => setFromTime(e.target.value)}
                        className="w-full sr-card-inset p-2 rounded-xl text-xs font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold block mb-1">Ends:</label>
                      <input
                        type="time"
                        value={untilTime}
                        onChange={(e) => setUntilTime(e.target.value)}
                        className="w-full sr-card-inset p-2 rounded-xl text-xs font-mono font-bold"
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setWizardStep(1)}
                    className="flex-1 sr-btn-raised py-2.5 rounded-2xl text-xs font-semibold"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setWizardStep(3)}
                    className="flex-1 sr-btn-primary py-2.5 rounded-2xl text-xs font-bold"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {wizardStep === 3 && (
              <div className="flex flex-col gap-3">
                <div className="p-3 rounded-2xl bg-[#D8EBE9]/60 dark:bg-[#264D4E]/40 text-xs">
                  <strong className="block text-[#176652] dark:text-[#8EE0C5]">
                    {t('rules.essentialAllowlist', language)}
                  </strong>
                  <span className="text-[#40586B] dark:text-[#C3D4DD]">
                    {t('rules.essentialNotice', language)}
                  </span>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setWizardStep(2)}
                    className="flex-1 sr-btn-raised py-2.5 rounded-2xl text-xs font-semibold"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSaveRoutine}
                    className="flex-1 sr-btn-primary py-2.5 rounded-2xl text-xs font-bold"
                  >
                    {t('rules.saveWizard', language)}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

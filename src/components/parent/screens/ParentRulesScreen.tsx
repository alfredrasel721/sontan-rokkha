import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { t } from '../../../i18n/translations';
import { PolicyRule } from '../../../types';
import {
  Sliders,
  Moon,
  Clock,
  BookOpen,
  Plus,
  CheckCircle2,
  AlertCircle,
  Shield,
  Smartphone,
  ChevronRight,
  X,
  Sparkles,
} from 'lucide-react';

export const ParentRulesScreen: React.FC = () => {
  const {
    language,
    selectedChild,
    policyRules,
    policyVersion,
    createOrUpdateRule,
    deleteRule,
    timeRequests,
    respondToTimeRequest,
  } = useApp();

  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [newRuleType, setNewRuleType] = useState<PolicyRule['type']>('bedtime');
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const [fromTime, setFromTime] = useState('21:30');
  const [untilTime, setUntilTime] = useState('06:30');
  const [limitMinutes, setLimitMinutes] = useState(90);

  const dayLabelsEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayLabelsBn = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];
  const dayLabels = language === 'bn' ? dayLabelsBn : dayLabelsEn;

  const childDisplayName = language === 'bn' ? selectedChild.nickname : selectedChild.name;

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
    <div className="flex flex-col gap-4 p-4 sm:p-6 max-w-xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#172B3A] dark:text-[#F2F7F8]">
            {t('rules.title', language)}
          </h2>
          <p className="text-xs text-[#5B7180] dark:text-[#AFC0CA] mt-0.5">
            {t('rules.subtitle', language)}
          </p>
        </div>

        <button
          onClick={() => {
            setShowWizard(true);
            setWizardStep(1);
          }}
          className="sr-btn-primary flex items-center gap-1.5 py-2 px-3.5 rounded-2xl text-xs font-bold shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>{t('rules.add', language)}</span>
        </button>
      </div>

      {/* Policy Sync Header & Monotonic Version State P-36 */}
      <div className="sr-card-raised-sm p-3.5 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#1C5A70] dark:text-[#7FD5CE]" />
          <span className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
            {t('rules.activeOnDevice', language, { name: childDisplayName })}
          </span>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-[#E5EDF2] dark:bg-[#172732] text-[#40586B] dark:text-[#C3D4DD]">
          Policy v{policyVersion}
        </span>
      </div>

      {/* Active Rules List */}
      <div className="flex flex-col gap-3">
        {policyRules.map((rule) => {
          let Icon = Moon;
          if (rule.type === 'daily_limit') Icon = Clock;
          if (rule.type === 'school_focus') Icon = BookOpen;

          const isPending = rule.status === 'pending_ack';

          return (
            <div
              key={rule.id}
              className={`sr-card-raised p-4 rounded-3xl flex flex-col gap-2.5 transition-all ${
                isPending ? 'border-2 border-[#1C5A70]/50 animate-pulse' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-[#D8EBE9] dark:bg-[#264D4E] text-[#1C5A70] dark:text-[#7FD5CE]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                      {t(rule.titleKey, language)}
                    </h3>
                    <p className="text-xs text-[#5B7180] dark:text-[#AFC0CA]">
                      {rule.fromTime && rule.untilTime
                        ? `${rule.fromTime} — ${rule.untilTime}`
                        : `${rule.limitMinutes} ${language === 'bn' ? 'মিনিট' : 'minutes'}`}
                      {' • '}
                      {rule.days.length === 7
                        ? language === 'bn'
                          ? 'প্রতিদিন'
                          : 'Everyday'
                        : `${rule.days.length} ${language === 'bn' ? 'দিন' : 'days'}`}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-xl">
                  {isPending ? (
                    <span className="flex items-center gap-1 text-[#955716] dark:text-[#FFCE8A] bg-[#FFCE8A]/20 px-2 py-0.5 rounded-lg">
                      <span className="w-2 h-2 rounded-full bg-[#955716] animate-ping" />
                      <span>{language === 'bn' ? 'ফোনে পাঠানো হচ্ছে' : 'Syncing...'}</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[#176652] dark:text-[#8EE0C5] bg-[#D8EBE9] dark:bg-[#264D4E] px-2 py-0.5 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'চালু আছে' : 'Active'}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Exemptions summary */}
              <div className="text-[11px] text-[#5B7180] dark:text-[#AFC0CA] bg-[#E5EDF2]/60 dark:bg-[#172732]/60 p-2.5 rounded-xl flex items-center justify-between">
                <span>
                  {language === 'bn' ? 'উন্মুক্ত থাকবে: ' : 'Allowed essentials: '}
                  <strong className="text-[#172B3A] dark:text-[#F2F7F8]">
                    {rule.exemptions.join(', ')}
                  </strong>
                </span>
                <button
                  onClick={() => deleteRule(rule.id)}
                  className="text-[#9B3946] dark:text-[#FFA8AC] hover:underline font-semibold ml-2"
                >
                  {language === 'bn' ? 'মুছুন' : 'Remove'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Top App Usage Today Card P-40 */}
      <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-[#5B7180] dark:text-[#AFC0CA] uppercase tracking-wider">
          {t('rules.topApps', language, { name: childDisplayName })}
        </h3>

        <div className="space-y-2.5">
          {[
            { name: 'YouTube Kids', minutes: 28, max: 90, color: '#D97759', category: 'Entertainment' },
            { name: 'Math League BD', minutes: 18, max: 90, color: '#176652', category: 'Education' },
            { name: 'Chrome Browser', minutes: 12, max: 90, color: '#275C98', category: 'Research' },
          ].map((app) => (
            <div key={app.name} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs font-semibold text-[#172B3A] dark:text-[#F2F7F8]">
                <span>{app.name}</span>
                <span>{app.minutes} min</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#E5EDF2] dark:bg-[#172732] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(app.minutes / app.max) * 100}%`,
                    backgroundColor: app.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3-Step Routine Creation Wizard Modal P-33 to P-35 */}
      {showWizard && (
        <div className="fixed inset-0 z-50 bg-[#152631]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="sr-card-raised p-5 rounded-3xl max-w-md w-full bg-[#EFF5F8] dark:bg-[#21323D] shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#CFDAE1]/50 dark:border-[#415560]/40 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1C5A70] dark:text-[#7FD5CE]">
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
                className="text-[#5B7180] hover:text-[#172B3A] dark:hover:text-[#F2F7F8]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step 1: Choose Routine */}
            {wizardStep === 1 && (
              <div className="flex flex-col gap-3">
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
                        : 'sr-card-raised-sm hover:border-[#1C5A70]/30'
                    }`}
                  >
                    <div className="p-2.5 rounded-xl bg-[#D8EBE9] dark:bg-[#264D4E] text-[#1C5A70] dark:text-[#7FD5CE]">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#5B7180] dark:text-[#AFC0CA] mt-0.5 leading-snug">
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

            {/* Step 2: Days & Schedule */}
            {wizardStep === 2 && (
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold text-[#172B3A] dark:text-[#F2F7F8]">
                  {language === 'bn' ? 'সক্রিয় দিনসমূহ নির্বাচন করুন:' : 'Select Active Days:'}
                </span>

                {/* Day pills */}
                <div className="grid grid-cols-7 gap-1.5">
                  {dayLabels.map((label, idx) => {
                    const isSelected = selectedDays.includes(idx);
                    return (
                      <button
                        key={label}
                        onClick={() => handleDayToggle(idx)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all text-center ${
                          isSelected
                            ? 'bg-[#1C5A70] dark:bg-[#7FD5CE] text-white dark:text-[#10282C] shadow-sm'
                            : 'sr-card-inset text-[#5B7180]'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                {newRuleType === 'daily_limit' ? (
                  <div className="flex flex-col gap-2 pt-2">
                    <span className="text-xs font-semibold text-[#172B3A] dark:text-[#F2F7F8]">
                      {language === 'bn' ? 'দৈনিক সময়সীমা (মিনিট):' : 'Daily Allowance (minutes):'}
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {[30, 60, 90, 120].map((m) => (
                        <button
                          key={m}
                          onClick={() => setLimitMinutes(m)}
                          className={`py-2 rounded-xl text-xs font-bold ${
                            limitMinutes === m
                              ? 'bg-[#1C5A70] dark:bg-[#7FD5CE] text-white dark:text-[#10282C]'
                              : 'sr-card-raised-sm text-[#40586B] dark:text-[#C3D4DD]'
                          }`}
                        >
                          {m}m
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-[#172B3A] dark:text-[#F2F7F8] block mb-1">
                        {language === 'bn' ? 'শুরুর সময়:' : 'Starts at:'}
                      </label>
                      <input
                        type="time"
                        value={fromTime}
                        onChange={(e) => setFromTime(e.target.value)}
                        className="w-full sr-card-inset p-2 rounded-xl text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#172B3A] dark:text-[#F2F7F8] block mb-1">
                        {language === 'bn' ? 'শেষের সময়:' : 'Ends at:'}
                      </label>
                      <input
                        type="time"
                        value={untilTime}
                        onChange={(e) => setUntilTime(e.target.value)}
                        className="w-full sr-card-inset p-2 rounded-xl text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => setWizardStep(1)}
                    className="flex-1 sr-btn-raised py-2.5 rounded-2xl text-xs font-semibold text-[#5B7180]"
                  >
                    {language === 'bn' ? 'পেছনে' : 'Back'}
                  </button>
                  <button
                    onClick={() => setWizardStep(3)}
                    className="flex-1 sr-btn-primary py-2.5 rounded-2xl text-xs font-bold"
                  >
                    {language === 'bn' ? 'পরবর্তী ধাপ' : 'Next Step'}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Essentials & Confirm */}
            {wizardStep === 3 && (
              <div className="flex flex-col gap-3">
                <div className="p-3.5 rounded-2xl bg-[#D8EBE9]/60 dark:bg-[#264D4E]/40 border border-[#176652]/30 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#176652] dark:text-[#8EE0C5]" />
                    <h4 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                      {t('rules.essentialAllowlist', language)}
                    </h4>
                  </div>
                  <p className="text-[11px] text-[#40586B] dark:text-[#C3D4DD] leading-relaxed">
                    {t('rules.essentialNotice', language)}
                  </p>
                </div>

                <div className="p-3 rounded-2xl sr-card-inset text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#5B7180]">{language === 'bn' ? 'রুটিন:' : 'Routine:'}</span>
                    <strong className="text-[#172B3A] dark:text-[#F2F7F8]">
                      {newRuleType === 'bedtime' ? 'Bedtime Downtime' : newRuleType}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5B7180]">{language === 'bn' ? 'সক্রিয় দিন:' : 'Days:'}</span>
                    <strong className="text-[#172B3A] dark:text-[#F2F7F8]">
                      {selectedDays.length} days / week
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5B7180]">{language === 'bn' ? 'সময়সূচী:' : 'Schedule:'}</span>
                    <strong className="text-[#172B3A] dark:text-[#F2F7F8]">
                      {newRuleType === 'daily_limit' ? `${limitMinutes} min` : `${fromTime} - ${untilTime}`}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => setWizardStep(2)}
                    className="flex-1 sr-btn-raised py-2.5 rounded-2xl text-xs font-semibold text-[#5B7180]"
                  >
                    {language === 'bn' ? 'পেছনে' : 'Back'}
                  </button>
                  <button
                    onClick={handleSaveRoutine}
                    className="flex-1 sr-btn-primary py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t('rules.saveWizard', language)}</span>
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

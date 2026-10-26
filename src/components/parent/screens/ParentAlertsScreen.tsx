import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { t } from '../../../i18n/translations';
import {
  AlertCircle,
  Clock,
  Smartphone,
  PhoneCall,
  CheckCircle2,
  Trash2,
  ThumbsUp,
  ArrowUpRight,
} from 'lucide-react';

export const ParentAlertsScreen: React.FC = () => {
  const {
    language,
    selectedChild,
    alerts,
    markAlertAsRead,
    clearAlert,
    activeSos,
    acknowledgeSos,
    respondToTimeRequest,
    setActiveParentTab,
    addToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'safety' | 'request' | 'device'>('safety');

  const filteredAlerts = alerts.filter((a) => a.type === activeTab);
  const childDisplayName = language === 'bn' ? selectedChild.nickname : selectedChild.name;

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 max-w-2xl mx-auto w-full">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#172B3A] dark:text-[#F2F7F8]">
          {t('alerts.title', language)}
        </h2>
        <p className="text-xs text-[#5B7180] dark:text-[#AFC0CA] mt-0.5">
          {language === 'bn'
            ? 'অপ্রয়োজনীয় আতঙ্ক ছাড়াই সময়মতো জরুরি ও নিয়মিত আপডেট জানুন।'
            : 'Timely, evidence-based notifications and activity feed without anxiety fatigue.'}
        </p>
      </div>

      {/* SOS Alert Section if Active */}
      {activeSos && (
        <div className="sr-card-raised p-4 sm:p-5 rounded-3xl border-2 border-[#9B3946] bg-[#FFF5F5] dark:bg-[#3D1A1E] flex flex-col gap-3 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-2xl bg-[#9B3946] text-white">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9B3946] dark:text-[#FFA8AC]">
                {t('safety.sosUrgent', language)}
              </span>
              <h3 className="text-base font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                {t('safety.sos', language, { name: childDisplayName })}
              </h3>
              <p className="text-xs text-[#40586B] dark:text-[#C3D4DD] mt-0.5 leading-snug">
                {t('safety.sosTime', language, { time: activeSos.timestamp })} · {activeSos.locationLabel}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-[#9B3946]/20">
            <a
              href="tel:999"
              className="flex-1 sr-btn-danger text-center py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t('safety.sosCall', language, { name: childDisplayName })} (999)</span>
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

      {/* Categorized filter tabs */}
      <div className="flex p-1 rounded-2xl bg-[#E5EDF2] dark:bg-[#172732] sr-card-inset">
        <button
          onClick={() => setActiveTab('safety')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'safety'
              ? 'bg-[#EFF5F8] dark:bg-[#21323D] text-[#1C5A70] dark:text-[#7FD5CE] shadow-sm'
              : 'text-[#5B7180] dark:text-[#AFC0CA]'
          }`}
        >
          {t('alerts.tabSafety', language)}
        </button>
        <button
          onClick={() => setActiveTab('request')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'request'
              ? 'bg-[#EFF5F8] dark:bg-[#21323D] text-[#1C5A70] dark:text-[#7FD5CE] shadow-sm'
              : 'text-[#5B7180] dark:text-[#AFC0CA]'
          }`}
        >
          {t('alerts.tabRequests', language)}
        </button>
        <button
          onClick={() => setActiveTab('device')}
          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'device'
              ? 'bg-[#EFF5F8] dark:bg-[#21323D] text-[#1C5A70] dark:text-[#7FD5CE] shadow-sm'
              : 'text-[#5B7180] dark:text-[#AFC0CA]'
          }`}
        >
          {t('alerts.tabDevice', language)}
        </button>
      </div>

      {/* Alerts list */}
      <div className="flex flex-col gap-3">
        {filteredAlerts.length === 0 ? (
          <div className="sr-card-raised p-8 rounded-3xl flex flex-col items-center justify-center text-center gap-2">
            <div className="p-3 rounded-full bg-[#D8EBE9] dark:bg-[#264D4E] text-[#176652] dark:text-[#8EE0C5]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
              {t('alerts.empty', language)}
            </h4>
            <p className="text-xs text-[#5B7180] dark:text-[#AFC0CA] max-w-xs">
              {language === 'bn'
                ? 'সন্তানের ডিভাইস স্বাভাবিক নিয়মে চলছে এবং রুটিন সক্রিয় রয়েছে।'
                : "Your child's companion phone is running normally according to schedule."}
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => markAlertAsRead(alert.id)}
              className={`sr-card-raised p-4 rounded-3xl flex flex-col gap-2 transition-all ${
                !alert.isRead ? 'border border-[#1C5A70]/50 dark:border-[#7FD5CE]/50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`p-2 rounded-xl ${
                      alert.severity === 'urgent'
                        ? 'bg-[#9B3946]/10 text-[#9B3946]'
                        : alert.severity === 'warning'
                        ? 'bg-[#955716]/10 text-[#955716]'
                        : 'bg-[#1C5A70]/10 text-[#1C5A70] dark:text-[#7FD5CE]'
                    }`}
                  >
                    {alert.type === 'safety' ? (
                      <AlertCircle className="w-4 h-4" />
                    ) : alert.type === 'request' ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      <Smartphone className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                      {t(alert.titleKey, language, { name: childDisplayName })}
                    </h4>
                    <span className="text-[11px] font-mono text-[#5B7180] dark:text-[#AFC0CA]">
                      {alert.timestamp} · {alert.isRead ? 'Read' : 'Unread'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {alert.actionRoute && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markAlertAsRead(alert.id);
                        setActiveParentTab(alert.actionRoute!);
                      }}
                      className="text-xs font-bold text-[#1C5A70] dark:text-[#7FD5CE] flex items-center gap-0.5 px-2 py-1 hover:underline"
                    >
                      <span>Open</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearAlert(alert.id);
                    }}
                    className="text-[#5B7180] hover:text-[#9B3946] p-1"
                    title="Dismiss"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-[#40586B] dark:text-[#C3D4DD] leading-relaxed">
                {t(alert.descriptionKey, language, { name: childDisplayName })}
              </p>

              {/* If request alert, provide instant buttons */}
              {alert.type === 'request' && alert.metadata && alert.metadata.requestId && (
                <div className="flex items-center gap-2 pt-2 border-t border-[#CFDAE1]/40 dark:border-[#415560]/30">
                  <button
                    onClick={() => {
                      if (alert.metadata?.requestId) {
                        respondToTimeRequest(alert.metadata.requestId, true);
                        clearAlert(alert.id);
                      }
                    }}
                    className="flex-1 sr-btn-primary py-1.5 px-3 rounded-xl text-xs font-bold"
                  >
                    {t('requests.approve', language, { minutes: alert.metadata.minutes || 15 })}
                  </button>
                  <button
                    onClick={() => {
                      if (alert.metadata?.requestId) {
                        respondToTimeRequest(alert.metadata.requestId, false);
                        clearAlert(alert.id);
                      }
                    }}
                    className="flex-1 sr-btn-raised py-1.5 px-3 rounded-xl text-xs font-semibold text-[#5B7180]"
                  >
                    {t('requests.decline', language)}
                  </button>
                </div>
              )}

              {/* False positive button for risk advisories */}
              {alert.severity === 'warning' && (
                <div className="flex items-center justify-between pt-1 border-t border-[#CFDAE1]/30 text-[11px]">
                  <span className="text-[#5B7180] dark:text-[#AFC0CA]">
                    {language === 'bn' ? 'সতর্কতাটি সঠিক ছিল?' : 'Was this alert accurate?'}
                  </span>
                  <button
                    onClick={() => {
                      addToast('Feedback Saved', 'Thank you! System will calibrate sensitivity.', 'success');
                      clearAlert(alert.id);
                    }}
                    className="flex items-center gap-1 font-semibold text-[#1C5A70] dark:text-[#7FD5CE] hover:underline"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{language === 'bn' ? 'এটি নিরাপদ ছিল (False Alarm)' : 'False Positive'}</span>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Monitor,
  Camera,
  Mic,
  ShieldCheck,
  StopCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
} from 'lucide-react';

export const ParentRemoteScreen: React.FC = () => {
  const {
    language,
    selectedChild,
    remoteSession,
    remoteLogs,
    startRemoteSessionRequest,
    respondToRemoteConsentOnChild,
    stopRemoteSession,
  } = useApp();

  const childDisplayName = language === 'bn' ? selectedChild.nickname : selectedChild.name;

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 max-w-2xl mx-auto w-full">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#172B3A] dark:text-[#F2F7F8]">
          {language === 'bn'
            ? 'দূরবর্তী সহায়তা ও লাইভ সেশন (সম্মতি সাপেক্ষ)'
            : 'Remote Safety Assist & Live Viewing'}
        </h2>
        <p className="text-xs text-[#5B7180] dark:text-[#AFC0CA] mt-0.5">
          {language === 'bn'
            ? 'সন্তানের প্রত্যক্ষ সম্মতি ও দৃশ্যমান নির্দেশকসহ স্ক্রিন মিররিং, ক্যামেরা এবং অডিও চেক-ইন'
            : 'Session-consented screen mirroring, safety camera check-in, and audio assist with visible indicators'}
        </p>
      </div>

      {/* Mandatory Disclosure Banner */}
      <div className="sr-card-raised-sm p-3.5 rounded-2xl flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#176652] dark:text-[#8EE0C5] shrink-0 mt-0.5" />
        <p className="text-xs text-[#40586B] dark:text-[#C3D4DD] leading-relaxed">
          {language === 'bn'
            ? 'গোপনীয়তা সুরক্ষা: আধুনিক অ্যান্ড্রয়েড ১৪+ এবং আইনি নীতিমালা অনুযায়ী কোনো সেশন গোপনে চালু হয় না। অভিভাবক অনুরোধ পাঠালে সন্তানের স্ক্রিনে সম্মতির পপ-আপ যাবে এবং সেশন চলাকালে উভয় ফোনে লাল/সবুজ নির্দেশক দৃশ্যমান থাকবে।'
            : 'Ethical & OS Safeguard: Every remote session requires child-side session consent on Android 14+ and displays a persistent active-monitoring indicator on both devices.'}
        </p>
      </div>

      {/* 3 Remote Monitoring Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          {
            type: 'screen_mirror' as const,
            titleEn: 'Screen Mirroring',
            titleBn: 'স্ক্রিন মিররিং',
            descEn: 'View child screen with MediaProjection session consent',
            descBn: 'সন্তানের সম্মতিতে সরাসরি স্ক্রিন সহায়তা',
            icon: Monitor,
          },
          {
            type: 'safety_camera' as const,
            titleEn: 'Safety Camera Check',
            titleBn: 'ক্যামেরা নিরাপত্তা চেক',
            descEn: 'Consensual video surroundings check-in',
            descBn: 'দৃশ্যমান নির্দেশকসহ পরিবেশের ভিডিও চেক-ইন',
            icon: Camera,
          },
          {
            type: 'one_way_audio' as const,
            titleEn: 'Audio Safety Check',
            titleBn: 'অডিও নিরাপত্তা চেক',
            descEn: 'Disclosed ambient audio safety verification',
            descBn: 'সন্তানের অনুমোদিত অডিও নিরাপত্তা যাচাই',
            icon: Mic,
          },
        ].map((item) => {
          const isThisActive =
            remoteSession.status !== 'idle' &&
            remoteSession.status !== 'ended_by_child' &&
            remoteSession.type === item.type;

          return (
            <div
              key={item.type}
              className={`sr-card-raised p-4 rounded-3xl flex flex-col justify-between gap-3 ${
                isThisActive ? 'border-2 border-[#1C5A70] dark:border-[#7FD5CE]' : ''
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-2xl bg-[#D8EBE9] dark:bg-[#264D4E] text-[#1C5A70] dark:text-[#7FD5CE] flex items-center justify-center">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                  {language === 'bn' ? item.titleBn : item.titleEn}
                </h3>
                <p className="text-[11px] text-[#5B7180] dark:text-[#AFC0CA] leading-snug">
                  {language === 'bn' ? item.descBn : item.descEn}
                </p>
              </div>

              <button
                onClick={() => startRemoteSessionRequest(item.type)}
                disabled={remoteSession.status === 'active'}
                className="sr-btn-primary py-2 px-3 rounded-xl text-xs font-bold disabled:opacity-50"
              >
                {language === 'bn' ? 'অনুরোধ পাঠান' : 'Request Session'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Parent-Side Viewing Interface & Session Status */}
      <div className="sr-card-raised p-5 rounded-3xl flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#CFDAE1]/50 dark:border-[#415560]/40 pb-3">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#1C5A70] dark:text-[#7FD5CE]" />
            <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
              {language === 'bn' ? 'অভিভাবক ভিউয়িং ইন্টারফেস' : 'Parent-Side Viewing Interface'}
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-[#1C5A70] dark:text-[#7FD5CE]">
            Status: {remoteSession.status.toUpperCase().replace(/_/g, ' ')}
          </span>
        </div>

        {remoteSession.status === 'idle' && (
          <div className="py-10 text-center flex flex-col items-center gap-2 text-[#5B7180] dark:text-[#AFC0CA]">
            <Monitor className="w-8 h-8 opacity-50" />
            <p className="text-xs font-medium">
              {language === 'bn'
                ? 'বর্তমানে কোনো দূরবর্তী সেশন চালু নেই। ওপরের যেকোনো বিকল্প থেকে অনুরোধ পাঠান।'
                : 'No active remote session. Select a tool above to send a session consent prompt to the child phone.'}
            </p>
          </div>
        )}

        {remoteSession.status === 'requesting_consent' && (
          <div className="p-6 rounded-2xl bg-[#E5EDF2] dark:bg-[#172732] flex flex-col items-center text-center gap-3">
            <Clock className="w-7 h-7 text-[#955716] dark:text-[#FFCE8A]" />
            <div>
              <h4 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                {language === 'bn'
                  ? `${childDisplayName}-এর ফোনে সম্মতির অপেক্ষায়...`
                  : `Waiting for ${childDisplayName} to accept on Companion Phone...`}
              </h4>
              <p className="text-xs text-[#5B7180] dark:text-[#AFC0CA] mt-1">
                {language === 'bn'
                  ? 'ডুয়াল ভিউতে ডানপাশের চাইল্ড ফোনে দেখুন অথবা নিচের কুইক টেস্ট বাটন চাপুন:'
                  : 'Accept on the Child Companion phone, or simulate child consent directly below:'}
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => respondToRemoteConsentOnChild(true)}
                className="sr-btn-primary py-2 px-4 rounded-xl text-xs font-bold"
              >
                {language === 'bn' ? 'সন্তানের সম্মতি সিমুলেট করুন (Accept)' : 'Simulate Child Accept'}
              </button>
              <button
                onClick={() => stopRemoteSession('parent')}
                className="sr-btn-raised py-2 px-4 rounded-xl text-xs font-semibold text-[#5B7180]"
              >
                {language === 'bn' ? 'বাতিল' : 'Cancel Request'}
              </button>
            </div>
          </div>
        )}

        {remoteSession.status === 'active' && (
          <div className="p-5 rounded-2xl bg-[#131F29] text-white flex flex-col gap-4 border border-[#7FD5CE]/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#9B3946] text-[10px] font-bold uppercase tracking-wider">
                  LIVE · VISIBLE TO CHILD
                </span>
                <span className="text-xs font-semibold">
                  {remoteSession.type === 'screen_mirror' && 'Screen Mirroring (MediaProjection)'}
                  {remoteSession.type === 'safety_camera' && 'Safety Camera Check-in'}
                  {remoteSession.type === 'one_way_audio' && 'Audio Safety Check-in'}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#7FD5CE]">
                {formatTimer(remoteSession.durationSeconds)}
              </span>
            </div>

            {/* Simulated Live Feed Canvas */}
            <div className="h-44 rounded-xl bg-[#1A2D3A] border border-white/10 flex flex-col items-center justify-center p-4 text-center gap-2">
              {remoteSession.type === 'screen_mirror' && (
                <>
                  <Monitor className="w-8 h-8 text-[#7FD5CE]" />
                  <p className="text-xs font-bold">
                    {childDisplayName}'s Active Screen: Math League BD (Homework Module)
                  </p>
                  <p className="text-[11px] text-[#C3D4DD]">
                    Resolution: 1080×2400 · 15 fps · OS Persistent Notification Active
                  </p>
                </>
              )}
              {remoteSession.type === 'safety_camera' && (
                <>
                  <Camera className="w-8 h-8 text-[#8EE0C5]" />
                  <p className="text-xs font-bold">
                    {childDisplayName}'s Front Camera Check-in: Study Desk / Classroom
                  </p>
                  <p className="text-[11px] text-[#C3D4DD]">
                    Android Green Camera Privacy Indicator ON · Child Can Stop Anytime
                  </p>
                </>
              )}
              {remoteSession.type === 'one_way_audio' && (
                <>
                  <Mic className="w-8 h-8 text-[#FFCE8A]" />
                  <p className="text-xs font-bold">
                    Ambient Audio Stream Active — Calm Classroom / Home Environment
                  </p>
                  <div className="flex items-center gap-1 h-6">
                    {[40, 75, 55, 90, 60, 80, 45, 70, 50].map((v, i) => (
                      <div
                        key={i}
                        className="w-1.5 bg-[#7FD5CE] rounded-full"
                        style={{ height: `${v}%` }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#C3D4DD]">
                Started at {remoteSession.startedAt} · Consent verified
              </span>
              <button
                onClick={() => stopRemoteSession('parent')}
                className="sr-btn-danger py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <StopCircle className="w-4 h-4" />
                <span>{language === 'bn' ? 'সেশন সমাপ্ত করুন' : 'End Live Session'}</span>
              </button>
            </div>
          </div>
        )}

        {remoteSession.status === 'ended_by_child' && (
          <div className="p-4 rounded-2xl bg-[#FFFBF5] dark:bg-[#2A231C] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs">
              <AlertCircle className="w-5 h-5 text-[#955716] dark:text-[#FFCE8A]" />
              <span>
                {language === 'bn'
                  ? `${childDisplayName} সেশনটি সমাপ্ত বা প্রত্যাখ্যান করেছে।`
                  : `${childDisplayName} ended or declined the remote session.`}
              </span>
            </div>
            <button
              onClick={() => stopRemoteSession('parent')}
              className="text-xs font-bold text-[#1C5A70] dark:text-[#7FD5CE]"
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Monitoring Activity & Access Logs */}
      <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
        <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
          {language === 'bn'
            ? 'দূরবর্তী মনিটরিং অ্যাক্সেস লগ (Audit Trail)'
            : 'Monitoring Activity & Access Logs'}
        </h3>

        <div className="divide-y divide-[#CFDAE1]/40 dark:divide-[#415560]/30">
          {remoteLogs.map((log) => (
            <div key={log.id} className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                  {log.type.replace(/_/g, ' ').toUpperCase()}
                </span>
                <p className="text-[11px] text-[#5B7180] dark:text-[#AFC0CA]">
                  By {log.guardianName} · Duration: <span className="font-mono">{log.duration}</span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-[#5B7180] block">{log.timestamp}</span>
                {log.childConsentVerified && (
                  <span className="text-[10px] text-[#176652] dark:text-[#8EE0C5] font-semibold flex items-center justify-end gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Child Consented</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

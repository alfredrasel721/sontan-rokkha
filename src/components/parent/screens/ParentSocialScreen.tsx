import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { SocialNotificationItem } from '../../../types';
import {
  MessageSquareWarning,
  ShieldAlert,
  Plus,
  X,
  CheckCircle2,
  Lock,
  Send,
  ThumbsUp,
} from 'lucide-react';

export const ParentSocialScreen: React.FC = () => {
  const {
    language,
    selectedChild,
    socialNotifications,
    keywordWatchlist,
    addKeywordToWatchlist,
    removeKeywordFromWatchlist,
    analyzeSocialMessageWithAI,
    isAnalyzingSocial,
    dismissSocialNotification,
    notificationRetentionHours,
    setNotificationRetentionHours,
    redactOtpAndBanking,
    setRedactOtpAndBanking,
    addToast,
  } = useApp();

  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [newKeyword, setNewKeyword] = useState('');

  // AI Test Scanner state
  const [testApp, setTestApp] = useState<SocialNotificationItem['appName']>('WhatsApp');
  const [testSender, setTestSender] = useState('GamingFriend_07');
  const [testSnippet, setTestSnippet] = useState('');

  const platforms = ['All', 'WhatsApp', 'Messenger Kids', 'Discord', 'YouTube', 'Instagram Teen'];
  const childDisplayName = language === 'bn' ? selectedChild.nickname : selectedChild.name;

  const filteredNotifs = socialNotifications.filter(
    (n) => selectedPlatform === 'All' || n.appName === selectedPlatform
  );

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.trim()) return;
    addKeywordToWatchlist(newKeyword);
    setNewKeyword('');
  };

  const handleRunAiAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testSnippet.trim()) return;
    await analyzeSocialMessageWithAI(testApp, testSender, testSnippet);
    setTestSnippet('');
  };

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 max-w-2xl mx-auto w-full">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#172B3A] dark:text-[#F2F7F8]">
          {language === 'bn'
            ? 'নোটিফিকেশন ও সোশ্যাল সেফটি (এআই ঝুঁকি বিশ্লেষণ)'
            : 'Notifications & Social Safety (AI Risk Analysis)'}
        </h2>
        <p className="text-xs text-[#5B7180] dark:text-[#AFC0CA] mt-0.5">
          {language === 'bn'
            ? `${childDisplayName}-এর অনুমোদিত সোশ্যাল অ্যাপের সাইবার বুলিং, ফিশিং ও সংবেদনশীল বার্তার সতর্কতা`
            : `Disclosed notification sync, keyword watchlist, cyberbullying detection, and Gemini AI risk analysis for ${childDisplayName}`}
        </p>
      </div>

      {/* Supported Social Platforms Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {platforms.map((p) => (
          <button
            key={p}
            onClick={() => setSelectedPlatform(p)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
              selectedPlatform === p
                ? 'bg-[#1C5A70] dark:bg-[#7FD5CE] text-white dark:text-[#10282C]'
                : 'sr-card-raised-sm text-[#40586B] dark:text-[#C3D4DD]'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Live AI Chat & Notification Safety Scanner */}
      <form
        onSubmit={handleRunAiAnalysis}
        className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquareWarning className="w-4 h-4 text-[#1C5A70] dark:text-[#7FD5CE]" />
            <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
              {language === 'bn'
                ? 'এআই চ্যাট ও নোটিফিকেশন ঝুঁকি পরীক্ষক'
                : 'AI-Assisted Notification Risk Analyzer'}
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#5B7180]">
            OTP Auto-Redaction: {redactOtpAndBanking ? 'ON' : 'OFF'}
          </span>
        </div>

        {/* Preset Scenario Buttons */}
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => {
              setTestApp('WhatsApp');
              setTestSender('Classmate_Group');
              setTestSnippet('You are so stupid, nobody wants you in our school group loser!');
            }}
            className="sr-btn-raised px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[#9B3946] dark:text-[#FFA8AC]"
          >
            + Cyberbullying Sample
          </button>
          <button
            type="button"
            onClick={() => {
              setTestApp('Discord');
              setTestSender('FreeGiftBot');
              setTestSnippet('Claim 5000 free Robux prize! Send your password and OTP 849201 now.');
            }}
            className="sr-btn-raised px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[#955716] dark:text-[#FFCE8A]"
          >
            + Phishing & OTP Sample
          </button>
          <button
            type="button"
            onClick={() => {
              setTestApp('Instagram Teen');
              setTestSender('UnknownUser_X');
              setTestSnippet('Meet me alone after coaching class and dont tell your parents secret.');
            }}
            className="sr-btn-raised px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[#9B3946] dark:text-[#FFA8AC]"
          >
            + Stranger Risk Sample
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <select
            value={testApp}
            onChange={(e) => setTestApp(e.target.value as SocialNotificationItem['appName'])}
            className="sr-card-inset px-3 py-2 rounded-xl text-xs text-[#172B3A] dark:text-[#F2F7F8]"
          >
            <option value="WhatsApp">WhatsApp</option>
            <option value="Messenger Kids">Messenger Kids</option>
            <option value="Discord">Discord</option>
            <option value="YouTube">YouTube</option>
            <option value="Instagram Teen">Instagram Teen</option>
          </select>
          <input
            type="text"
            value={testSender}
            onChange={(e) => setTestSender(e.target.value)}
            placeholder="Sender name..."
            className="sr-card-inset px-3 py-2 rounded-xl text-xs text-[#172B3A] dark:text-[#F2F7F8]"
          />
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={testSnippet}
            onChange={(e) => setTestSnippet(e.target.value)}
            placeholder={
              language === 'bn'
                ? 'পরীক্ষা করার জন্য যেকোনো নোটিফিকেশন টেক্সট লিখুন...'
                : 'Enter notification snippet to analyze for cyberbullying, scam, or safety risk...'
            }
            className="flex-1 sr-card-inset px-3.5 py-2.5 rounded-xl text-xs text-[#172B3A] dark:text-[#F2F7F8]"
          />
          <button
            type="submit"
            disabled={isAnalyzingSocial || !testSnippet.trim()}
            className="sr-btn-primary px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap disabled:opacity-50 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isAnalyzingSocial ? 'Analyzing...' : 'Scan with AI'}</span>
          </button>
        </div>
      </form>

      {/* Sensitive-Content Warning Dashboard */}
      <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
            {language === 'bn'
              ? `সংবেদনশীল বার্তা ও সতর্কতা ড্যাশবোর্ড (${filteredNotifs.length})`
              : `Sensitive-Content Warning Dashboard (${filteredNotifs.length})`}
          </h3>
          <span className="text-[11px] text-[#5B7180]">Advisory signals only</span>
        </div>

        {filteredNotifs.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#5B7180]">
            No flagged notifications for {selectedPlatform}.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifs.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-[#E5EDF2]/65 dark:bg-[#172732]/65 flex flex-col gap-2.5 border border-[#CFDAE1]/60 dark:border-[#415560]/40"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                        {item.appName} · {item.sender}
                      </span>
                      <span className="text-[#5B7180] font-mono text-[11px]">
                        · {item.timestamp}
                      </span>
                    </div>
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider ${
                        item.riskLevel === 'high'
                          ? 'text-[#9B3946] dark:text-[#FFA8AC]'
                          : item.riskLevel === 'medium'
                          ? 'text-[#955716] dark:text-[#FFCE8A]'
                          : 'text-[#176652] dark:text-[#8EE0C5]'
                      }`}
                    >
                      {item.riskCategory.replace(/_/g, ' ')} · {item.confidence}% confidence
                    </span>
                  </div>

                  <button
                    onClick={() => dismissSocialNotification(item.id)}
                    className="text-[#5B7180] hover:text-[#9B3946] p-1"
                    title="Dismiss Alert"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Redacted Notification Snippet */}
                <div className="p-2.5 rounded-xl bg-[#EFF5F8] dark:bg-[#21323D] text-xs font-mono text-[#172B3A] dark:text-[#F2F7F8]">
                  "{item.snippet}"
                </div>

                {/* AI Explanation & Supportive Conversation Starter */}
                <div className="text-xs text-[#40586B] dark:text-[#C3D4DD] space-y-1">
                  <p>
                    <strong>{language === 'bn' ? 'এআই বিশ্লেষণ: ' : 'AI Insight: '}</strong>
                    {language === 'bn' ? item.aiExplanationBn : item.aiExplanationEn}
                  </p>
                  <p className="text-[#1C5A70] dark:text-[#7FD5CE] font-medium">
                    <strong>{language === 'bn' ? 'পরামর্শকৃত কথোপকথন: ' : 'Suggested Conversation: '}</strong>
                    "{language === 'bn' ? item.conversationStarterBn : item.conversationStarterEn}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#CFDAE1]/40 dark:border-[#415560]/30 text-[11px]">
                  <span className="text-[#5B7180]">
                    {item.matchedKeyword ? `Matched keyword: "${item.matchedKeyword}"` : 'AI Context Detection'}
                  </span>
                  <button
                    onClick={() => {
                      addToast('Marked False Positive', 'Classifier sensitivity updated.', 'success');
                      dismissSocialNotification(item.id);
                    }}
                    className="flex items-center gap-1 font-semibold text-[#1C5A70] dark:text-[#7FD5CE] hover:underline"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{language === 'bn' ? 'এটি নিরাপদ (Dismiss)' : 'Mark Safe / Dismiss'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Keyword-Based Alerts Watchlist + Privacy Retention Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sr-card-raised p-4 rounded-3xl flex flex-col gap-3">
          <h3 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
            {language === 'bn' ? 'সতর্কতা কিওয়ার্ড তালিকা (Watchlist)' : 'Keyword-Based Alert Watchlist'}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {keywordWatchlist.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#E5EDF2] dark:bg-[#172732] text-xs text-[#172B3A] dark:text-[#F2F7F8]"
              >
                <span>{kw}</span>
                <button
                  onClick={() => removeKeywordFromWatchlist(kw)}
                  className="text-[#5B7180] hover:text-[#9B3946]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <form onSubmit={handleAddKeyword} className="flex gap-1.5 mt-auto pt-1">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder="Add keyword..."
              className="flex-1 sr-card-inset px-2.5 py-1.5 rounded-xl text-xs"
            />
            <button
              type="submit"
              className="sr-btn-primary px-3 py-1.5 rounded-xl text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Notification Privacy & Retention Controls */}
        <div className="sr-card-raised p-4 rounded-3xl flex flex-col justify-between gap-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#176652] dark:text-[#8EE0C5]" />
            <h3 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
              {language === 'bn' ? 'নোটিফিকেশন প্রাইভেসী ও রিটেনশন' : 'Notification Privacy & Retention'}
            </h3>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#40586B] dark:text-[#C3D4DD]">Auto-redact OTP & bank digits</span>
              <button
                onClick={() => setRedactOtpAndBanking(!redactOtpAndBanking)}
                className={`px-2.5 py-1 rounded-lg font-bold ${
                  redactOtpAndBanking
                    ? 'bg-[#D8EBE9] dark:bg-[#264D4E] text-[#176652] dark:text-[#8EE0C5]'
                    : 'sr-card-inset text-[#5B7180]'
                }`}
              >
                {redactOtpAndBanking ? 'Enabled' : 'Off'}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#40586B] dark:text-[#C3D4DD]">Max raw TTL auto-expiry</span>
              <select
                value={notificationRetentionHours}
                onChange={(e) => setNotificationRetentionHours(Number(e.target.value))}
                className="sr-card-inset px-2 py-1 rounded-lg font-mono font-bold text-xs"
              >
                <option value={24}>24 Hours</option>
                <option value={48}>48 Hours (Max)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

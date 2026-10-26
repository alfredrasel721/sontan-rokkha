import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Globe,
  ShieldCheck,
  ShieldAlert,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  Search,
} from 'lucide-react';

export const ParentWebScreen: React.FC = () => {
  const {
    language,
    selectedChild,
    webFilterEnabled,
    setWebFilterEnabled,
    safeSearchEnabled,
    setSafeSearchEnabled,
    webCategories,
    toggleWebCategory,
    webSites,
    addWebSiteRule,
    removeWebSiteRule,
    webActivityLogs,
    simulateChildWebsiteVisit,
  } = useApp();

  const [newDomain, setNewDomain] = useState('');
  const [newListType, setNewListType] = useState<'allow' | 'block'>('block');
  const [testUrl, setTestUrl] = useState('');
  const [lastTestResult, setLastTestResult] = useState<{
    action: 'allowed' | 'blocked';
    reason: string;
  } | null>(null);

  const childDisplayName = language === 'bn' ? selectedChild.nickname : selectedChild.name;

  const handleAddSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain.trim()) return;
    addWebSiteRule(newDomain, newListType);
    setNewDomain('');
  };

  const handleTestVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testUrl.trim()) return;
    const res = simulateChildWebsiteVisit(testUrl);
    setLastTestResult(res);
  };

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 max-w-2xl mx-auto w-full">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#172B3A] dark:text-[#F2F7F8]">
          {language === 'bn' ? 'ওয়েব নিরাপত্তা ও কন্টেন্ট ফিল্টারিং' : 'Web Safety & Content Filtering'}
        </h2>
        <p className="text-xs text-[#5B7180] dark:text-[#AFC0CA] mt-0.5">
          {language === 'bn'
            ? `${childDisplayName}-এর ব্রাউজার সুরক্ষা, অ্যাডাল্ট ফিল্টার, অ্যালাউলিস্ট/ব্লকলিস্ট এবং ওয়েব রিপোর্ট`
            : `SafeSearch enforcement, category filtering, custom allow/block lists, and browser insights for ${childDisplayName}`}
        </p>
      </div>

      {/* Master Filter Controls & Compatibility Status */}
      <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-[#D8EBE9] dark:bg-[#264D4E] text-[#1C5A70] dark:text-[#7FD5CE]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                {language === 'bn'
                  ? 'নিরাপদ ডিএনএস ও ওয়েব শিল্ড (VpnService)'
                  : 'Safe DNS & Web Shield Status'}
              </h3>
              <p className="text-[11px] text-[#5B7180] dark:text-[#AFC0CA]">
                Compatibility: Android Local DNS VpnService · Chrome & System Browsers
              </p>
            </div>
          </div>

          <button
            onClick={() => setWebFilterEnabled(!webFilterEnabled)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold ${
              webFilterEnabled
                ? 'bg-[#176652] text-white'
                : 'sr-card-inset text-[#5B7180]'
            }`}
          >
            {webFilterEnabled
              ? language === 'bn'
                ? 'সক্রিয় (Enabled)'
                : 'Filter ON'
              : language === 'bn'
              ? 'বন্ধ (Off)'
              : 'Filter OFF'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-[#CFDAE1]/40 dark:border-[#415560]/30 text-xs">
          <div className="p-3 rounded-2xl bg-[#E5EDF2]/60 dark:bg-[#172732]/60 flex items-center justify-between">
            <div>
              <span className="font-bold block text-[#172B3A] dark:text-[#F2F7F8]">
                SafeSearch Enforcement
              </span>
              <span className="text-[11px] text-[#5B7180]">Google, Bing & YouTube Restricted</span>
            </div>
            <button
              onClick={() => setSafeSearchEnabled(!safeSearchEnabled)}
              className={`px-2.5 py-1 rounded-lg font-bold ${
                safeSearchEnabled
                  ? 'bg-[#D8EBE9] dark:bg-[#264D4E] text-[#176652] dark:text-[#8EE0C5]'
                  : 'sr-card-inset text-[#5B7180]'
              }`}
            >
              {safeSearchEnabled ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-[#E5EDF2]/60 dark:bg-[#172732]/60 flex items-center justify-between">
            <div>
              <span className="font-bold block text-[#172B3A] dark:text-[#F2F7F8]">
                School Hours Web Schedule
              </span>
              <span className="text-[11px] font-mono text-[#5B7180]">08:00 – 14:00 (Edu Only)</span>
            </div>
            <span className="text-[11px] font-bold text-[#176652] dark:text-[#8EE0C5]">Active</span>
          </div>
        </div>
      </div>

      {/* Web Category Filtering */}
      <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
        <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
          {language === 'bn' ? 'ওয়েব ক্যাটাগরি ফিল্টারিং' : 'Web Category Filtering'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {webCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-3 rounded-2xl bg-[#E5EDF2]/60 dark:bg-[#172732]/60 flex items-center justify-between gap-2"
            >
              <span className="text-xs font-semibold text-[#172B3A] dark:text-[#F2F7F8]">
                {language === 'bn' ? cat.nameBn : cat.nameEn}
              </span>
              <button
                onClick={() => toggleWebCategory(cat.id)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold shrink-0 ${
                  cat.isBlocked
                    ? 'bg-[#9B3946] text-white'
                    : 'bg-[#D8EBE9] dark:bg-[#264D4E] text-[#176652] dark:text-[#8EE0C5]'
                }`}
              >
                {cat.isBlocked
                  ? language === 'bn'
                    ? 'ব্লকড'
                    : 'Blocked'
                  : language === 'bn'
                  ? 'অনুমোদিত'
                  : 'Allowed'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Website Allowlist & Blocklist Manager */}
      <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
        <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
          {language === 'bn'
            ? 'কাস্টম ওয়েবসাইট অ্যালাউলিস্ট ও ব্লকলিস্ট'
            : 'Custom Website Allowlist & Blocklist'}
        </h3>

        <form onSubmit={handleAddSite} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            placeholder="e.g. khanacademy.org or badsite.xyz"
            className="flex-1 sr-card-inset px-3.5 py-2 rounded-xl text-xs text-[#172B3A] dark:text-[#F2F7F8]"
          />
          <select
            value={newListType}
            onChange={(e) => setNewListType(e.target.value as 'allow' | 'block')}
            className="sr-card-inset px-3 py-2 rounded-xl text-xs font-semibold"
          >
            <option value="block">Block Website</option>
            <option value="allow">Allow Website</option>
          </select>
          <button
            type="submit"
            disabled={!newDomain.trim()}
            className="sr-btn-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 disabled:opacity-50"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Rule</span>
          </button>
        </form>

        <div className="divide-y divide-[#CFDAE1]/40 dark:divide-[#415560]/30 pt-1">
          {webSites.map((site) => (
            <div key={site.id} className="py-2 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {site.listType === 'allow' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#176652] dark:text-[#8EE0C5]" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-[#9B3946] dark:text-[#FFA8AC]" />
                )}
                <span className="font-mono font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                  {site.domain}
                </span>
                <span className="text-[11px] text-[#5B7180]">
                  · {site.listType === 'allow' ? 'Allowlisted' : 'Blocklisted'}
                </span>
              </div>
              <button
                onClick={() => removeWebSiteRule(site.id)}
                className="text-[#5B7180] hover:text-[#9B3946] p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Live Child Browser Filter Tester */}
      <form
        onSubmit={handleTestVisit}
        className="sr-card-raised p-4 rounded-3xl flex flex-col gap-2.5"
      >
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-[#1C5A70] dark:text-[#7FD5CE]" />
          <h3 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
            {language === 'bn'
              ? 'পরীক্ষা করুন: সন্তানের ব্রাউজারে ওয়েবসাইট ভিজিট সিমুলেটর'
              : 'Test Web Filter: Simulate Child Visiting a Website'}
          </h3>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={testUrl}
            onChange={(e) => setTestUrl(e.target.value)}
            placeholder="Try: casino-bet.com, free-robux-hack.xyz, or 10minuteschool.com"
            className="flex-1 sr-card-inset px-3 py-2 rounded-xl text-xs text-[#172B3A] dark:text-[#F2F7F8]"
          />
          <button
            type="submit"
            disabled={!testUrl.trim()}
            className="sr-btn-primary px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap disabled:opacity-50"
          >
            Test URL
          </button>
        </div>
        {lastTestResult && (
          <div
            className={`p-2.5 rounded-xl text-xs font-medium flex items-center gap-2 ${
              lastTestResult.action === 'blocked'
                ? 'bg-[#FFF5F5] dark:bg-[#3D1A1E] text-[#9B3946] dark:text-[#FFA8AC]'
                : 'bg-[#D8EBE9]/60 dark:bg-[#264D4E]/40 text-[#176652] dark:text-[#8EE0C5]'
            }`}
          >
            {lastTestResult.action === 'blocked' ? (
              <ShieldAlert className="w-4 h-4 shrink-0" />
            ) : (
              <ShieldCheck className="w-4 h-4 shrink-0" />
            )}
            <span>
              <strong>{lastTestResult.action.toUpperCase()}:</strong> {lastTestResult.reason}
            </span>
          </div>
        )}
      </form>

      {/* Browser Activity Insights & Suspicious Website Alerts */}
      <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
        <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
          {language === 'bn'
            ? 'ব্রাউজার অ্যাক্টিভিটি ও সন্দেহজনক ওয়েবসাইট লগ'
            : 'Browser Activity Insights & Blocked Attempts'}
        </h3>

        <div className="divide-y divide-[#CFDAE1]/40 dark:divide-[#415560]/30">
          {webActivityLogs.map((log) => (
            <div key={log.id} className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <span className="font-mono font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                  {log.domain}
                </span>
                <p className="text-[11px] text-[#5B7180] dark:text-[#AFC0CA]">
                  {log.category} · {log.browser} · {log.timestamp}
                </p>
              </div>
              <span
                className={`text-[11px] font-bold uppercase ${
                  log.action === 'blocked'
                    ? 'text-[#9B3946] dark:text-[#FFA8AC]'
                    : 'text-[#176652] dark:text-[#8EE0C5]'
                }`}
              >
                {log.action}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

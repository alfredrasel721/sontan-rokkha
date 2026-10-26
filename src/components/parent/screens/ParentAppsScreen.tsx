import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { InstalledApp } from '../../../types';
import {
  Search,
  Lock,
  Unlock,
  Clock,
  PlusCircle,
  CheckCircle2,
  XCircle,
  Sliders,
  Smartphone,
} from 'lucide-react';

export const ParentAppsScreen: React.FC = () => {
  const {
    language,
    selectedChild,
    installedApps,
    updateAppStatus,
    updateAppLimit,
    simulateNewAppInstall,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [newAppName, setNewAppName] = useState('');
  const [newAppCat, setNewAppCat] = useState<InstalledApp['category']>('Games');
  const [editingAppId, setEditingAppId] = useState<string | null>(null);

  const categories = ['All', 'Games', 'Entertainment', 'Social', 'Education', 'Browser'];
  const childDisplayName = language === 'bn' ? selectedChild.nickname : selectedChild.name;

  const filteredApps = installedApps.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.packageName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'All' || app.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const pendingInstallApps = installedApps.filter((a) => a.status === 'pending_approval');

  const handleSimulateInstall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppName.trim()) return;
    simulateNewAppInstall(newAppName.trim(), newAppCat);
    setNewAppName('');
  };

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 max-w-2xl mx-auto w-full">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#172B3A] dark:text-[#F2F7F8]">
          {language === 'bn' ? 'অ্যাপ ব্যবস্থাপনা ও নিয়ন্ত্রণ' : 'App Management & Restrictions'}
        </h2>
        <p className="text-xs text-[#5B7180] dark:text-[#AFC0CA] mt-0.5">
          {language === 'bn'
            ? `${childDisplayName}-এর ইনস্টল করা অ্যাপ, সময়সীমা, ব্লক এবং নতুন অ্যাপ অনুমোদন`
            : `Installed apps inventory, custom time limits, category restrictions, and new install approvals for ${childDisplayName}`}
        </p>
      </div>

      {/* New App Installation Alert Banner */}
      {pendingInstallApps.length > 0 && (
        <div className="sr-card-raised p-4 rounded-3xl border border-[#955716]/40 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#955716] dark:text-[#FFCE8A]">
              {language === 'bn'
                ? `নতুন অ্যাপ ইনস্টল সতর্কতা (${pendingInstallApps.length})`
                : `New App Installation Alerts (${pendingInstallApps.length})`}
            </span>
          </div>
          {pendingInstallApps.map((app) => (
            <div
              key={app.id}
              className="p-3 rounded-2xl bg-[#E5EDF2]/70 dark:bg-[#172732]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <h4 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                  {app.name} <span className="font-normal text-[#5B7180]">· {app.category}</span>
                </h4>
                <p className="text-[11px] font-mono text-[#5B7180] dark:text-[#AFC0CA]">
                  {app.packageName} · Installed {app.installedAt}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => updateAppStatus(app.id, 'allowed')}
                  className="sr-btn-primary py-1.5 px-3 rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'অনুমোদন' : 'Approve'}</span>
                </button>
                <button
                  onClick={() => updateAppStatus(app.id, 'blocked')}
                  className="sr-btn-danger py-1.5 px-3 rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'ব্লক' : 'Block'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Search & Category Filter */}
      <div className="flex flex-col gap-2.5">
        <div className="relative">
          <Search className="w-4 h-4 text-[#5B7180] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'bn'
                ? 'অ্যাপের নাম বা প্যাকেজ খুঁজুন...'
                : 'Search installed apps or package name...'
            }
            className="w-full sr-card-inset pl-10 pr-4 py-2.5 rounded-2xl text-xs text-[#172B3A] dark:text-[#F2F7F8] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                categoryFilter === cat
                  ? 'bg-[#1C5A70] dark:bg-[#7FD5CE] text-white dark:text-[#10282C]'
                  : 'sr-card-raised-sm text-[#40586B] dark:text-[#C3D4DD]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Installed Apps Inventory List */}
      <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
            {language === 'bn' ? 'ইনস্টল করা অ্যাপ তালিকা' : 'Installed Apps Inventory'} ({filteredApps.length})
          </span>
          <span className="text-[11px] text-[#5B7180]">
            {language === 'bn' ? 'ট্যাপ করে সময়সীমা বা ব্লক পরিবর্তন করুন' : 'Tap controls to block or set custom limits'}
          </span>
        </div>

        <div className="divide-y divide-[#CFDAE1]/40 dark:divide-[#415560]/30">
          {filteredApps.map((app) => {
            const isBlocked = app.status === 'blocked';
            const isEditing = editingAppId === app.id;

            return (
              <div key={app.id} className="py-3 flex flex-col gap-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                        isBlocked
                          ? 'bg-[#9B3946]/15 text-[#9B3946] dark:text-[#FFA8AC]'
                          : 'bg-[#D8EBE9] dark:bg-[#264D4E] text-[#1C5A70] dark:text-[#7FD5CE]'
                      }`}
                    >
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8] truncate">
                          {app.name}
                        </h4>
                        <span className="text-[11px] text-[#5B7180] dark:text-[#AFC0CA]">
                          · {app.category}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-[#5B7180] dark:text-[#AFC0CA]">
                        {app.usedMinutesToday}m today · {app.launchesToday} launches
                        {app.dailyLimitMinutes ? ` · Limit: ${app.dailyLimitMinutes}m` : ' · Unlimited'}
                      </p>
                      {app.scheduledRestriction && (
                        <p className="text-[10px] text-[#955716] dark:text-[#FFCE8A]">
                          Schedule: {app.scheduledRestriction}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quick Action Controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setEditingAppId(isEditing ? null : app.id)}
                      className="sr-btn-raised p-2 rounded-xl text-xs text-[#40586B] dark:text-[#C3D4DD]"
                      title="Set App Time Limit"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() =>
                        updateAppStatus(app.id, isBlocked ? 'allowed' : 'blocked')
                      }
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 whitespace-nowrap ${
                        isBlocked
                          ? 'bg-[#9B3946] text-white'
                          : 'sr-btn-raised text-[#176652] dark:text-[#8EE0C5]'
                      }`}
                    >
                      {isBlocked ? (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>{language === 'bn' ? 'ব্লকড' : 'Blocked'}</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="w-3.5 h-3.5" />
                          <span>{language === 'bn' ? 'অনুমোদিত' : 'Allowed'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Expandable Custom App Limit & Schedule Editor */}
                {isEditing && (
                  <div className="p-3 rounded-2xl bg-[#E5EDF2]/70 dark:bg-[#172732]/70 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#172B3A] dark:text-[#F2F7F8] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#1C5A70]" />
                        <span>{language === 'bn' ? 'দৈনিক অ্যাপ সময়সীমা:' : 'Custom Daily App Limit:'}</span>
                      </span>
                      <span className="font-mono text-[#5B7180]">
                        {app.dailyLimitMinutes ? `${app.dailyLimitMinutes} min` : 'No Limit'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[15, 30, 45, 60, 90].map((mins) => (
                        <button
                          key={mins}
                          onClick={() => updateAppLimit(app.id, mins)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                            app.dailyLimitMinutes === mins
                              ? 'bg-[#1C5A70] dark:bg-[#7FD5CE] text-white dark:text-[#10282C]'
                              : 'sr-card-raised-sm text-[#40586B]'
                          }`}
                        >
                          {mins}m
                        </button>
                      ))}
                      <button
                        onClick={() => updateAppLimit(app.id, null)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          app.dailyLimitMinutes === null
                            ? 'bg-[#176652] text-white'
                            : 'sr-card-raised-sm text-[#40586B]'
                        }`}
                      >
                        Unlimited
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulate New App Installation on Child Device */}
      <form
        onSubmit={handleSimulateInstall}
        className="sr-card-raised p-4 rounded-3xl flex flex-col gap-3"
      >
        <div className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4 text-[#1C5A70] dark:text-[#7FD5CE]" />
          <h3 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
            {language === 'bn'
              ? 'পরীক্ষা করুন: সন্তানের ফোনে নতুন অ্যাপ ইনস্টল সিমুলেটর'
              : 'Test Feature: Simulate New App Installation on Child Phone'}
          </h3>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newAppName}
            onChange={(e) => setNewAppName(e.target.value)}
            placeholder="e.g. TikTok, Clash Royale, Discord..."
            className="flex-1 sr-card-inset px-3 py-2 rounded-xl text-xs text-[#172B3A] dark:text-[#F2F7F8]"
          />
          <select
            value={newAppCat}
            onChange={(e) => setNewAppCat(e.target.value as InstalledApp['category'])}
            className="sr-card-inset px-3 py-2 rounded-xl text-xs text-[#172B3A] dark:text-[#F2F7F8]"
          >
            <option value="Games">Games</option>
            <option value="Social">Social</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Education">Education</option>
          </select>
          <button
            type="submit"
            disabled={!newAppName.trim()}
            className="sr-btn-primary px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap disabled:opacity-50"
          >
            {language === 'bn' ? 'ইনস্টল সিমুলেট করুন' : 'Simulate Install'}
          </button>
        </div>
      </form>
    </div>
  );
};

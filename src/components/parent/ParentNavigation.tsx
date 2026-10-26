import React from 'react';
import { useApp } from '../../context/AppContext';
import { ParentTab } from '../../types';
import {
  Home,
  BarChart3,
  Grid,
  Compass,
  Monitor,
  MessageSquareWarning,
  Globe,
  Bell,
  Users,
  Settings,
} from 'lucide-react';

export const ParentNavigation: React.FC = () => {
  const {
    activeParentTab,
    setActiveParentTab,
    language,
    alerts,
    activeSos,
    installedApps,
    remoteSession,
  } = useApp();

  const unreadAlerts = alerts.filter((a) => !a.isRead).length;
  const pendingApps = installedApps.filter((a) => a.status === 'pending_approval').length;

  interface NavTabItem {
    id: ParentTab;
    labelEn: string;
    labelBn: string;
    icon: any;
    badge?: string | number | null;
    isUrgent?: boolean;
  }

  const tabs: NavTabItem[] = [
    { id: 'home', labelEn: 'Home', labelBn: 'হোম', icon: Home },
    { id: 'usage', labelEn: 'Screen Time', labelBn: 'সময় ও রুটিন', icon: BarChart3 },
    {
      id: 'apps',
      labelEn: 'Apps',
      labelBn: 'অ্যাপস',
      icon: Grid,
      badge: pendingApps > 0 ? pendingApps : null,
    },
    { id: 'checkins', labelEn: 'Location', labelBn: 'অবস্থান', icon: Compass },
    {
      id: 'remote',
      labelEn: 'Remote',
      labelBn: 'রিমোট',
      icon: Monitor,
      badge: remoteSession.status === 'active' ? 'LIVE' : remoteSession.status === 'requesting_consent' ? '1' : null,
      isUrgent: remoteSession.status === 'active',
    },
    { id: 'social', labelEn: 'Social AI', labelBn: 'সোশ্যাল এআই', icon: MessageSquareWarning },
    { id: 'web', labelEn: 'Web Filter', labelBn: 'ওয়েব ফিল্টার', icon: Globe },
    {
      id: 'alerts',
      labelEn: 'Alerts',
      labelBn: 'সতর্কতা',
      icon: Bell,
      badge: activeSos ? 'SOS' : unreadAlerts > 0 ? unreadAlerts : null,
      isUrgent: Boolean(activeSos),
    },
    { id: 'family', labelEn: 'Family', labelBn: 'পরিবার', icon: Users },
    { id: 'settings', labelEn: 'Account', labelBn: 'অ্যাকাউন্ট', icon: Settings },
  ];

  return (
    <nav className="w-full bg-[#EDF3F6] dark:bg-[#131F29] border-t border-[#CFDAE1]/60 dark:border-[#415560]/40 px-2 py-1.5">
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeParentTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveParentTab(tab.id)}
              className={`relative flex flex-col items-center justify-center gap-1 py-1.5 px-2.5 rounded-2xl transition-all min-w-[58px] min-h-[46px] shrink-0 whitespace-nowrap ${
                isActive
                  ? 'sr-card-inset text-[#1C5A70] dark:text-[#7FD5CE] font-semibold'
                  : 'text-[#5B7180] dark:text-[#AFC0CA] hover:text-[#172B3A] dark:hover:text-[#F2F7F8]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                {tab.badge && (
                  <span
                    className={`absolute -top-1.5 -right-2.5 px-1 py-0.2 rounded-full text-[9px] font-bold leading-tight font-mono ${
                      tab.isUrgent
                        ? 'bg-[#9B3946] text-white'
                        : 'bg-[#1C5A70] dark:bg-[#7FD5CE] text-white dark:text-[#10282C]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight leading-none">
                {language === 'bn' ? tab.labelBn : tab.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

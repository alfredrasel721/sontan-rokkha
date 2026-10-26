import React from 'react';
import { useApp } from '../../context/AppContext';
import { ParentHeader } from '../parent/ParentHeader';
import { ParentNavigation } from '../parent/ParentNavigation';
import { ParentHomeScreen } from '../parent/screens/ParentHomeScreen';
import { ParentUsageScreen } from '../parent/screens/ParentUsageScreen';
import { ParentAppsScreen } from '../parent/screens/ParentAppsScreen';
import { ParentCheckinsScreen } from '../parent/screens/ParentCheckinsScreen';
import { ParentRemoteScreen } from '../parent/screens/ParentRemoteScreen';
import { ParentSocialScreen } from '../parent/screens/ParentSocialScreen';
import { ParentWebScreen } from '../parent/screens/ParentWebScreen';
import { ParentAlertsScreen } from '../parent/screens/ParentAlertsScreen';
import { ParentFamilyScreen } from '../parent/screens/ParentFamilyScreen';
import { ParentSettingsScreen } from '../parent/screens/ParentSettingsScreen';
import { ChildCompanion } from '../child/ChildCompanion';
import { ComplianceDocsView } from '../compliance/ComplianceDocsView';
import { FeatureChecklistView } from '../compliance/FeatureChecklistView';
import { Smartphone, Split, BookOpen, ListChecks, ShieldCheck } from 'lucide-react';

export const DualDeviceView: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    activeParentTab,
    selectedChild,
    textScale,
  } = useApp();

  const renderParentContent = () => {
    switch (activeParentTab) {
      case 'home':
        return <ParentHomeScreen />;
      case 'usage':
        return <ParentUsageScreen />;
      case 'apps':
        return <ParentAppsScreen />;
      case 'checkins':
        return <ParentCheckinsScreen />;
      case 'remote':
        return <ParentRemoteScreen />;
      case 'social':
        return <ParentSocialScreen />;
      case 'web':
        return <ParentWebScreen />;
      case 'alerts':
        return <ParentAlertsScreen />;
      case 'family':
        return <ParentFamilyScreen />;
      case 'settings':
        return <ParentSettingsScreen />;
      default:
        return <ParentHomeScreen />;
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#EDF3F6] dark:bg-[#131F29] ${
        textScale === 'large_200' ? 'text-lg' : ''
      }`}
    >
      {/* Top Device & Architecture Switcher Bar */}
      <div className="w-full bg-[#E5EDF2] dark:bg-[#172732] border-b border-[#CFDAE1]/60 dark:border-[#415560]/40 px-3 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C5A70] dark:text-[#7FD5CE]">
            <ShieldCheck className="w-4 h-4" />
            <span>Sontan Rokkha (সন্তান রক্ষা) — Family Safety & Digital Wellbeing</span>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#EFF5F8] dark:bg-[#21323D] sr-card-inset text-xs font-semibold overflow-x-auto scrollbar-none">
            <button
              onClick={() => setViewMode('dual')}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg transition-all whitespace-nowrap shrink-0 ${
                viewMode === 'dual'
                  ? 'bg-[#1C5A70] dark:bg-[#7FD5CE] text-white dark:text-[#10282C] shadow-sm'
                  : 'text-[#5B7180] dark:text-[#AFC0CA]'
              }`}
            >
              <Split className="w-3.5 h-3.5" />
              <span>Dual Live Sync</span>
            </button>

            <button
              onClick={() => setViewMode('parent')}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg transition-all whitespace-nowrap shrink-0 ${
                viewMode === 'parent'
                  ? 'bg-[#1C5A70] dark:bg-[#7FD5CE] text-white dark:text-[#10282C] shadow-sm'
                  : 'text-[#5B7180] dark:text-[#AFC0CA]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Parent App</span>
            </button>

            <button
              onClick={() => setViewMode('child')}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg transition-all whitespace-nowrap shrink-0 ${
                viewMode === 'child'
                  ? 'bg-[#1C5A70] dark:bg-[#7FD5CE] text-white dark:text-[#10282C] shadow-sm'
                  : 'text-[#5B7180] dark:text-[#AFC0CA]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-[#176652]" />
              <span>Child Companion</span>
            </button>

            <button
              onClick={() => setViewMode('checklist')}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg transition-all whitespace-nowrap shrink-0 ${
                viewMode === 'checklist'
                  ? 'bg-[#1C5A70] dark:bg-[#7FD5CE] text-white dark:text-[#10282C] shadow-sm'
                  : 'text-[#5B7180] dark:text-[#AFC0CA]'
              }`}
            >
              <ListChecks className="w-3.5 h-3.5" />
              <span>All 12 Feature Modules</span>
            </button>

            <button
              onClick={() => setViewMode('docs')}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg transition-all whitespace-nowrap shrink-0 ${
                viewMode === 'docs'
                  ? 'bg-[#1C5A70] dark:bg-[#7FD5CE] text-white dark:text-[#10282C] shadow-sm'
                  : 'text-[#5B7180] dark:text-[#AFC0CA]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Compliance & Docs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="flex-1 flex items-center justify-center p-2 sm:p-6 overflow-x-auto">
        {/* VIEW 1: Dual Device Split Screen */}
        {viewMode === 'dual' && (
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 sm:gap-10 w-full max-w-7xl py-2">
            {/* Phone 1: Parent App */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1C5A70] dark:text-[#7FD5CE]">
                Parent Phone (Maya's Dashboard)
              </span>
              <div
                className="w-[385px] sm:w-[440px] h-[810px] rounded-[42px] p-3 bg-[#E5EDF2] dark:bg-[#172732] shadow-2xl border-4 border-[#CFDAE1] dark:border-[#415560] flex flex-col overflow-hidden relative"
                style={{
                  boxShadow:
                    '0 24px 60px rgba(0,0,0,0.22), inset 0 2px 4px rgba(255,255,255,0.4)',
                }}
              >
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#CFDAE1] dark:bg-[#415560] rounded-full z-30" />

                <div className="flex-1 flex flex-col bg-[#EDF3F6] dark:bg-[#131F29] rounded-[34px] overflow-hidden pt-4">
                  <ParentHeader />
                  <div className="flex-1 overflow-y-auto pb-4 scrollbar-none">
                    {renderParentContent()}
                  </div>
                  <ParentNavigation />
                </div>
              </div>
            </div>

            {/* Phone 2: Child Companion Phone */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#176652] dark:text-[#8EE0C5]">
                Child Companion ({selectedChild.name}'s {selectedChild.deviceModel})
              </span>
              <div
                className="w-[385px] sm:w-[410px] h-[810px] rounded-[42px] p-3 bg-[#D8EBE9] dark:bg-[#1A2D3A] shadow-2xl border-4 border-[#BFE7D9] dark:border-[#264D4E] flex flex-col overflow-hidden relative"
                style={{
                  boxShadow:
                    '0 24px 60px rgba(0,0,0,0.22), inset 0 2px 4px rgba(255,255,255,0.4)',
                }}
              >
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#BFE7D9] dark:bg-[#264D4E] rounded-full z-30" />

                <div className="flex-1 flex flex-col bg-[#EDF3F6] dark:bg-[#131F29] rounded-[34px] overflow-hidden pt-4">
                  <div className="flex-1 overflow-y-auto scrollbar-none">
                    <ChildCompanion />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Parent Only */}
        {viewMode === 'parent' && (
          <div className="w-full max-w-2xl mx-auto flex flex-col rounded-3xl overflow-hidden bg-[#EDF3F6] dark:bg-[#131F29] shadow-xl border border-[#CFDAE1]/60 dark:border-[#415560]/40 my-2 min-h-[760px]">
            <ParentHeader />
            <div className="flex-1 overflow-y-auto pb-4">{renderParentContent()}</div>
            <ParentNavigation />
          </div>
        )}

        {/* VIEW 3: Child Only */}
        {viewMode === 'child' && (
          <div className="w-full max-w-sm mx-auto flex flex-col rounded-3xl overflow-hidden bg-[#EDF3F6] dark:bg-[#131F29] shadow-xl border border-[#BFE7D9]/80 dark:border-[#264D4E] my-2 min-h-[760px]">
            <ChildCompanion />
          </div>
        )}

        {/* VIEW 4: All 12 Feature Modules Checklist */}
        {viewMode === 'checklist' && (
          <div className="w-full">
            <FeatureChecklistView />
          </div>
        )}

        {/* VIEW 5: Compliance & Architecture Documentation */}
        {viewMode === 'docs' && (
          <div className="w-full">
            <ComplianceDocsView />
          </div>
        )}
      </div>
    </div>
  );
};

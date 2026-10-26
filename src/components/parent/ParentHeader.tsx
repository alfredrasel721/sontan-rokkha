import React from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../brand/Logo';
import { t } from '../../i18n/translations';
import { Moon, Sun, Type, Settings, ShieldCheck, Plus } from 'lucide-react';

export const ParentHeader: React.FC = () => {
  const {
    language,
    setLanguage,
    isDarkMode,
    toggleDarkMode,
    textScale,
    setTextScale,
    childrenList,
    selectedChildId,
    setSelectedChildId,
    setActiveParentTab,
    activeParentTab,
  } = useApp();

  return (
    <header className="w-full bg-[#EDF3F6] dark:bg-[#131F29] border-b border-[#CFDAE1]/60 dark:border-[#415560]/40 px-4 py-3 sm:px-6 transition-colors">
      <div className="max-w-4xl mx-auto flex flex-col gap-3">
        {/* Top row: Brand & Global Utility Controls */}
        <div className="flex items-center justify-between">
          <Logo size={34} />

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
              className="sr-btn-raised flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-[#172B3A] dark:text-[#F2F7F8] hover:border-[#1C5A70]/40"
              title="Toggle language / ভাষা পরিবর্তন"
            >
              <span className="text-[#1C5A70] dark:text-[#7FD5CE] font-bold">
                {language === 'bn' ? 'বাংলা' : 'EN'}
              </span>
              <span className="text-[10px] text-[#5B7180] dark:text-[#AFC0CA]">
                ({language === 'bn' ? 'English' : 'বাংলা'})
              </span>
            </button>

            {/* Text Scale (200% Accessibility test mode) */}
            <button
              onClick={() => setTextScale(textScale === 'normal' ? 'large_200' : 'normal')}
              className={`sr-btn-raised p-2 rounded-xl text-xs font-semibold ${
                textScale === 'large_200'
                  ? 'bg-[#D8EBE9] dark:bg-[#264D4E] text-[#1C5A70] dark:text-[#7FD5CE] border-[#1C5A70]/60'
                  : 'text-[#40586B] dark:text-[#C3D4DD]'
              }`}
              title="Toggle Large Text / 200% Accessibility Scale"
              aria-label="Text Scaling"
            >
              <Type className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="sr-btn-raised p-2 rounded-xl text-[#40586B] dark:text-[#C3D4DD] hover:text-[#172B3A] dark:hover:text-[#F2F7F8]"
              title="Toggle Dark / Light mode"
              aria-label="Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-[#FFCE8A]" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Settings shortcut */}
            <button
              onClick={() => setActiveParentTab('settings')}
              className={`sr-btn-raised p-2 rounded-xl ${
                activeParentTab === 'settings'
                  ? 'bg-[#D8EBE9] dark:bg-[#264D4E] text-[#1C5A70] dark:text-[#7FD5CE]'
                  : 'text-[#40586B] dark:text-[#C3D4DD]'
              }`}
              title={t('nav.settings', language)}
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom row: Child Switcher & Status Bar */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#CFDAE1]/40 dark:border-[#415560]/30">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
            {childrenList.map((child) => {
              const isSelected = child.id === selectedChildId;
              return (
                <button
                  key={child.id}
                  onClick={() => setSelectedChildId(child.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-[#1C5A70] dark:bg-[#7FD5CE] text-white dark:text-[#10282C] shadow-sm font-semibold'
                      : 'sr-card-raised-sm text-[#40586B] dark:text-[#C3D4DD] hover:text-[#172B3A] dark:hover:text-[#F2F7F8]'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      child.isOnline ? 'bg-[#176652] dark:bg-[#8EE0C5]' : 'bg-[#5B7180]'
                    }`}
                  />
                  <span>
                    {language === 'bn' ? child.nickname : child.name} • {child.age}
                  </span>
                </button>
              );
            })}

            <button
              onClick={() => setActiveParentTab('family')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-2xl text-xs font-medium text-[#40586B] dark:text-[#AFC0CA] hover:bg-[#E5EDF2] dark:hover:bg-[#172732]"
              title="Add Child"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'নতুন শিশু' : 'Add Child'}</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#5B7180] dark:text-[#AFC0CA]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#176652] dark:text-[#8EE0C5]" />
            <span>{language === 'bn' ? 'স্বচ্ছ সুরক্ষা সক্রিয়' : 'Protected'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

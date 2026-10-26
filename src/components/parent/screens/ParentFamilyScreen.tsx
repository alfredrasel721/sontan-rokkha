import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { t } from '../../../i18n/translations';
import { CoGuardian } from '../../../types';
import {
  MessageCircle,
  UserPlus,
  Send,
  Heart,
  CheckCircle2,
  Lock,
  X,
  QrCode,
  RefreshCw,
  Link2,
  Unlink,
  Smartphone,
  Plus,
} from 'lucide-react';

export const ParentFamilyScreen: React.FC = () => {
  const {
    language,
    childrenList,
    selectedChild,
    setSelectedChildId,
    addChildProfile,
    generateNewPairingCode,
    bindChildDeviceWithCode,
    unbindChildDevice,
    familyMessages,
    sendMessage,
    coGuardians,
    inviteCoGuardian,
    revokeCoGuardian,
  } = useApp();

  const [chatInput, setChatInput] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [invitePerms, setInvitePerms] = useState<CoGuardian['permissions']>('view_activity');

  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [childName, setChildName] = useState('');
  const [childNick, setChildNick] = useState('');
  const [childAge, setChildAge] = useState(10);
  const [childModel, setChildModel] = useState('Samsung Galaxy A25');
  const [childPlatform, setChildPlatform] = useState<'android' | 'ios'>('android');

  const [showPairingModal, setShowPairingModal] = useState(false);

  const childDisplayName = language === 'bn' ? selectedChild.nickname : selectedChild.name;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      sendMessage(chatInput, false);
      setChatInput('');
    }
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteName.trim() && inviteEmail.trim()) {
      inviteCoGuardian(inviteName.trim(), inviteEmail.trim(), invitePerms);
      setShowInviteModal(false);
      setInviteName('');
      setInviteEmail('');
    }
  };

  const handleAddChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName.trim()) return;
    addChildProfile(childName.trim(), childNick.trim() || childName.trim(), childAge, childModel, childPlatform);
    setChildName('');
    setChildNick('');
    setShowAddChildModal(false);
  };

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 max-w-2xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#172B3A] dark:text-[#F2F7F8]">
            {t('family.title', language)}
          </h2>
          <p className="text-xs text-[#5B7180] dark:text-[#AFC0CA] mt-0.5">
            {t('family.subtitle', language)}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowAddChildModal(true)}
            className="sr-btn-primary flex items-center gap-1.5 py-2 px-3 rounded-2xl text-xs font-bold whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'সন্তান যোগ করুন' : 'Add Child'}</span>
          </button>
          <button
            onClick={() => setShowInviteModal(true)}
            className="sr-btn-raised flex items-center gap-1.5 py-2 px-3 rounded-2xl text-xs font-semibold text-[#1C5A70] dark:text-[#7FD5CE] whitespace-nowrap"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{t('family.invite', language)}</span>
          </button>
        </div>
      </div>

      {/* Child Profiles & Device Binding / Pairing Management */}
      <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
            {language === 'bn'
              ? `সন্তানদের প্রোফাইল ও ডিভাইস পেয়ারিং (${childrenList.length})`
              : `Children Profiles & Device Binding (${childrenList.length})`}
          </h3>
          <button
            onClick={() => setShowPairingModal(true)}
            className="text-xs font-bold text-[#1C5A70] dark:text-[#7FD5CE] flex items-center gap-1 hover:underline"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'পেয়ারিং কোড দেখুন' : 'Pairing Code / QR'}</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {childrenList.map((child) => (
            <div
              key={child.id}
              onClick={() => setSelectedChildId(child.id)}
              className={`p-3.5 rounded-2xl cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                child.id === selectedChild.id
                  ? 'sr-card-inset border border-[#1C5A70]/40'
                  : 'bg-[#E5EDF2]/60 dark:bg-[#172732]/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: child.avatarColor }}
                >
                  {child.avatarInitials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                      {child.name} ({child.nickname}) · Age {child.age}
                    </h4>
                    <span className="text-[11px] font-mono text-[#5B7180]">
                      Code: {child.pairingCode}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5B7180] dark:text-[#AFC0CA]">
                    {child.deviceModel} · {child.osVersion} ·{' '}
                    {child.isBound ? 'Bound & Enrolled' : 'Unbound'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                {child.isBound ? (
                  <button
                    onClick={() => unbindChildDevice(child.id)}
                    className="sr-btn-raised px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-[#9B3946] dark:text-[#FFA8AC] flex items-center gap-1"
                  >
                    <Unlink className="w-3 h-3" />
                    <span>{language === 'bn' ? 'আনবাইন্ড' : 'Unbind Device'}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => bindChildDeviceWithCode(child.pairingCode)}
                    className="sr-btn-primary px-2.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1"
                  >
                    <Link2 className="w-3 h-3" />
                    <span>{language === 'bn' ? 'পুনরায় যুক্ত করুন' : 'Re-Bind Device'}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Private Family Chat Card */}
      <div className="sr-card-raised p-4 rounded-3xl flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#CFDAE1]/50 dark:border-[#415560]/40">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-[#1C5A70] dark:text-[#7FD5CE]" />
            <h3 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
              {t('family.chatTitle', language)}
            </h3>
          </div>
          <span className="flex items-center gap-1 text-[11px] text-[#5B7180] dark:text-[#AFC0CA]">
            <Lock className="w-3 h-3 text-[#176652] dark:text-[#8EE0C5]" />
            <span>{language === 'bn' ? 'কেবল পরিবার' : 'Family only'}</span>
          </span>
        </div>

        <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
          {familyMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.isChild ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-xs ${
                  msg.isChild
                    ? 'bg-[#E5EDF2] dark:bg-[#172732] text-[#172B3A] dark:text-[#F2F7F8] rounded-tl-sm'
                    : 'bg-[#1C5A70] dark:bg-[#7FD5CE] text-white dark:text-[#10282C] rounded-tr-sm shadow-sm'
                }`}
              >
                <div className="flex items-baseline justify-between gap-3 text-[10px] opacity-80 mb-0.5">
                  <span className="font-bold">{msg.senderName}</span>
                  <span className="font-mono">{msg.timestamp}</span>
                </div>
                <p className="leading-snug">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="flex gap-2 pt-1">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={t('family.chatPlaceholder', language)}
            className="flex-1 sr-card-inset px-3.5 py-2.5 rounded-2xl text-xs text-[#172B3A] dark:text-[#F2F7F8] placeholder-[#5B7180] focus:outline-none"
          />
          <button
            type="submit"
            disabled={!chatInput.trim()}
            className="sr-btn-primary px-3.5 py-2.5 rounded-2xl text-xs font-bold disabled:opacity-50 flex items-center justify-center"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Authorized Guardians List */}
      <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-[#5B7180] dark:text-[#AFC0CA]">
          {t('family.guardians', language)} ({coGuardians.length})
        </h3>

        <div className="space-y-2">
          {coGuardians.map((guardian) => (
            <div
              key={guardian.id}
              className="p-3 rounded-2xl bg-[#E5EDF2]/60 dark:bg-[#172732]/60 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#1C5A70] dark:bg-[#7FD5CE] text-white dark:text-[#10282C] flex items-center justify-center text-xs font-bold shrink-0">
                  {guardian.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8] truncate">
                    {guardian.name}
                  </h4>
                  <p className="text-[11px] text-[#5B7180] dark:text-[#AFC0CA] truncate">
                    {guardian.email} ·{' '}
                    {guardian.role === 'primary'
                      ? t('family.primaryParent', language)
                      : `${t('family.coGuardian', language)} (${guardian.permissions.replace('_', ' ')})`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-semibold text-[#176652] dark:text-[#8EE0C5]">
                  {guardian.status === 'active' ? 'Active' : 'Invited'}
                </span>
                {guardian.role !== 'primary' && (
                  <button
                    onClick={() => revokeCoGuardian(guardian.id)}
                    className="text-[11px] text-[#9B3946] dark:text-[#FFA8AC] hover:underline font-semibold"
                  >
                    Revoke
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transparent Family Agreement Card */}
      <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-[#D97759]" />
          <h3 className="text-xs font-bold text-[#1C5A70] dark:text-[#7FD5CE]">
            {t('family.agreementTitle', language)}
          </h3>
        </div>
        <p className="text-xs text-[#172B3A] dark:text-[#F2F7F8] leading-relaxed">
          "{t('family.agreementText', language)}"
        </p>
        <div className="flex items-center gap-2 pt-1 text-[11px] text-[#176652] dark:text-[#8EE0C5] font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>
            {language === 'bn'
              ? `মায়া (অভিভাবক) ও ${childDisplayName} যৌথভাবে সম্মত হয়েছে`
              : `Agreed by Maya (Parent) and ${childDisplayName}`}
          </span>
        </div>
      </div>

      {/* Add Child Modal */}
      {showAddChildModal && (
        <div className="fixed inset-0 z-50 bg-[#152631]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleAddChild}
            className="sr-card-raised p-5 rounded-3xl max-w-md w-full bg-[#EFF5F8] dark:bg-[#21323D] shadow-2xl flex flex-col gap-4"
          >
            <div className="flex items-center justify-between border-b border-[#CFDAE1]/50 pb-3">
              <h3 className="text-base font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                {language === 'bn' ? 'নতুন সন্তান প্রোফাইল যোগ করুন' : 'Add Child Profile & Generate Pairing Code'}
              </h3>
              <button
                type="button"
                onClick={() => setShowAddChildModal(false)}
                className="text-[#5B7180]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Child Name (English):</label>
                  <input
                    type="text"
                    required
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="e.g. Zayan"
                    className="w-full sr-card-inset p-2.5 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Bangla Nickname:</label>
                  <input
                    type="text"
                    value={childNick}
                    onChange={(e) => setChildNick(e.target.value)}
                    placeholder="যেমন: জায়ান"
                    className="w-full sr-card-inset p-2.5 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Age (6–17):</label>
                  <input
                    type="number"
                    min={5}
                    max={17}
                    value={childAge}
                    onChange={(e) => setChildAge(Number(e.target.value))}
                    className="w-full sr-card-inset p-2.5 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Platform:</label>
                  <select
                    value={childPlatform}
                    onChange={(e) => setChildPlatform(e.target.value as 'android' | 'ios')}
                    className="w-full sr-card-inset p-2.5 rounded-xl"
                  >
                    <option value="android">Android Companion</option>
                    <option value="ios">iOS (FamilyControls)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Device Model:</label>
                <input
                  type="text"
                  value={childModel}
                  onChange={(e) => setChildModel(e.target.value)}
                  className="w-full sr-card-inset p-2.5 rounded-xl"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddChildModal(false)}
                className="flex-1 sr-btn-raised py-2.5 rounded-2xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 sr-btn-primary py-2.5 rounded-2xl text-xs font-bold"
              >
                Create Profile & Pairing Code
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Pairing Code & QR Enrollment Modal */}
      {showPairingModal && (
        <div className="fixed inset-0 z-50 bg-[#152631]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="sr-card-raised p-5 rounded-3xl max-w-sm w-full bg-[#EFF5F8] dark:bg-[#21323D] shadow-2xl flex flex-col items-center text-center gap-4">
            <div className="w-full flex items-center justify-between border-b border-[#CFDAE1]/50 pb-2">
              <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                {language === 'bn' ? 'ডিভাইস পেয়ারিং কোড (১০ মিনিট)' : 'Child Device Pairing Code'}
              </h3>
              <button onClick={() => setShowPairingModal(false)} className="text-[#5B7180]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-3xl sr-card-inset flex flex-col items-center gap-2 w-full">
              <QrCode className="w-20 h-20 text-[#1C5A70] dark:text-[#7FD5CE]" />
              <span className="text-2xl font-extrabold font-mono tracking-widest text-[#172B3A] dark:text-[#F2F7F8]">
                {selectedChild.pairingCode}
              </span>
              <span className="text-[11px] text-[#5B7180]">
                Enter this 6-digit code in the Sontan Rokkha Child Companion app on{' '}
                {selectedChild.name}'s phone.
              </span>
            </div>

            <div className="flex gap-2 w-full">
              <button
                onClick={() => generateNewPairingCode(selectedChild.id)}
                className="flex-1 sr-btn-raised py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Regenerate</span>
              </button>
              <button
                onClick={() => setShowPairingModal(false)}
                className="flex-1 sr-btn-primary py-2 px-3 rounded-xl text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Co-Guardian Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-[#152631]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleInvite}
            className="sr-card-raised p-5 rounded-3xl max-w-md w-full bg-[#EFF5F8] dark:bg-[#21323D] shadow-2xl flex flex-col gap-4"
          >
            <div className="flex items-center justify-between border-b border-[#CFDAE1]/50 dark:border-[#415560]/40 pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#1C5A70] dark:text-[#7FD5CE]" />
                <h3 className="text-base font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                  {t('family.invite', language)}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="text-[#5B7180]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Guardian's Name:</label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Tariq Rahman"
                  className="w-full sr-card-inset p-2.5 rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Email Address:</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="tariq@gmail.com"
                  className="w-full sr-card-inset p-2.5 rounded-xl"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Permission Tier:</label>
                <select
                  value={invitePerms}
                  onChange={(e) => setInvitePerms(e.target.value as any)}
                  className="w-full sr-card-inset p-2.5 rounded-xl"
                >
                  <option value="view_activity">View Activity & Check-ins</option>
                  <option value="manage_rules">Manage Rules & Extension Requests</option>
                  <option value="emergency_only">Emergency & SOS Only</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="flex-1 sr-btn-raised py-2.5 rounded-2xl text-xs font-semibold text-[#5B7180]"
              >
                {t('common.cancel', language)}
              </button>
              <button
                type="submit"
                className="flex-1 sr-btn-primary py-2.5 rounded-2xl text-xs font-bold"
              >
                {language === 'bn' ? 'আমন্ত্রণ পাঠান' : 'Send Invitation'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

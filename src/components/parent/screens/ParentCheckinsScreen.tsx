import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { t } from '../../../i18n/translations';
import {
  MapPin,
  Send,
  Battery,
  Building,
  Home,
  CheckCircle2,
  Navigation,
  RefreshCw,
  Plus,
  Trash2,
  LogIn,
  LogOut,
  Clock,
  X,
} from 'lucide-react';

export const ParentCheckinsScreen: React.FC = () => {
  const {
    language,
    selectedChild,
    checkInEvents,
    requestCheckInFromChild,
    safeZones,
    locationHistory,
    addSafeZone,
    toggleSafeZone,
    deleteSafeZone,
    simulateZoneTransition,
    refreshChildLocation,
    toggleChildPermission,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'map_zones' | 'history' | 'checkins'>('map_zones');
  const [showAddZone, setShowAddZone] = useState(false);
  const [zoneNameEn, setZoneNameEn] = useState('');
  const [zoneAddress, setZoneAddress] = useState('');
  const [zoneRadius, setZoneRadius] = useState(250);

  const childDisplayName = language === 'bn' ? selectedChild.nickname : selectedChild.name;

  const handleAddZone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zoneNameEn.trim()) return;
    addSafeZone(zoneNameEn.trim(), zoneNameEn.trim(), zoneAddress.trim() || 'Dhaka, Bangladesh', zoneRadius);
    setZoneNameEn('');
    setZoneAddress('');
    setShowAddZone(false);
  };

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 max-w-2xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#172B3A] dark:text-[#F2F7F8]">
            {language === 'bn' ? 'অবস্থান, জিওফেন্স ও খোঁজ-খবর' : 'Location, Safe Zones & Check-ins'}
          </h2>
          <p className="text-xs text-[#5B7180] dark:text-[#AFC0CA] mt-0.5">
            {language === 'bn'
              ? `${childDisplayName}-এর বর্তমান অবস্থান, নিরাপদ স্থান (Geofencing), এবং অবস্থান ইতিহাস`
              : `GPS map view, safe zone arrival/departure alerts, route history, and check-ins for ${childDisplayName}`}
          </p>
        </div>

        <button
          onClick={refreshChildLocation}
          className="sr-btn-raised flex items-center gap-1.5 py-2 px-3 rounded-2xl text-xs font-bold text-[#1C5A70] dark:text-[#7FD5CE] whitespace-nowrap shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'রিফ্রেশ' : 'Refresh GPS'}</span>
        </button>
      </div>

      {/* Sub-navigation tabs */}
      <div className="flex p-1 rounded-2xl bg-[#E5EDF2] dark:bg-[#172732] sr-card-inset">
        <button
          onClick={() => setActiveSubTab('map_zones')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'map_zones'
              ? 'bg-[#EFF5F8] dark:bg-[#21323D] text-[#1C5A70] dark:text-[#7FD5CE] shadow-sm'
              : 'text-[#5B7180] dark:text-[#AFC0CA]'
          }`}
        >
          {language === 'bn' ? 'জিপিএস ম্যাপ ও নিরাপদ স্থান' : 'GPS Map & Safe Zones'}
        </button>
        <button
          onClick={() => setActiveSubTab('history')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'history'
              ? 'bg-[#EFF5F8] dark:bg-[#21323D] text-[#1C5A70] dark:text-[#7FD5CE] shadow-sm'
              : 'text-[#5B7180] dark:text-[#AFC0CA]'
          }`}
        >
          {language === 'bn' ? 'অবস্থান ইতিহাস (Timeline)' : 'Location History'}
        </button>
        <button
          onClick={() => setActiveSubTab('checkins')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'checkins'
              ? 'bg-[#EFF5F8] dark:bg-[#21323D] text-[#1C5A70] dark:text-[#7FD5CE] shadow-sm'
              : 'text-[#5B7180] dark:text-[#AFC0CA]'
          }`}
        >
          {language === 'bn' ? 'খোঁজ-খবর' : 'Check-ins'}
        </button>
      </div>

      {/* Tab 1: GPS Map & Safe Zones (Geofencing) */}
      {activeSubTab === 'map_zones' && (
        <div className="flex flex-col gap-4">
          {/* Interactive Map Card */}
          <div className="sr-card-raised p-4 rounded-3xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#1C5A70] dark:text-[#7FD5CE]" />
                <span className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                  {selectedChild.permissions.location
                    ? `${childDisplayName}: Banani Block D, Dhaka`
                    : language === 'bn'
                    ? 'অবস্থান অনুমতি বন্ধ আছে'
                    : 'Location Sharing Paused'}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#5B7180] dark:text-[#AFC0CA]">
                {selectedChild.lastSyncMinutesAgo === 0
                  ? 'Updated just now (±14m)'
                  : `Updated ${selectedChild.lastSyncMinutesAgo}m ago (±18m)`}
              </span>
            </div>

            <div className="relative w-full h-60 rounded-2xl overflow-hidden bg-[#D8E6EC] dark:bg-[#182A36] border border-[#CFDAE1]/60 dark:border-[#415560]/40 flex items-center justify-center">
              <svg
                className="absolute inset-0 w-full h-full opacity-40 dark:opacity-20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#40586B" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <path
                  d="M 0 110 Q 160 70 320 130 T 640 95"
                  fill="none"
                  stroke="#1C5A70"
                  strokeWidth="4"
                />
                <path d="M 90 0 L 115 300" fill="none" stroke="#CFDAE1" strokeWidth="3" />
                <path d="M 270 0 L 250 300" fill="none" stroke="#CFDAE1" strokeWidth="3" />
              </svg>

              {/* Accuracy Radius Circle */}
              <div className="absolute w-28 h-28 rounded-full bg-[#1C5A70]/15 dark:bg-[#7FD5CE]/15 border border-[#1C5A70]/40 dark:border-[#7FD5CE]/40" />

              {/* Child Pin */}
              <div className="relative flex flex-col items-center">
                <div className="p-2.5 rounded-full bg-[#1C5A70] dark:bg-[#7FD5CE] text-white dark:text-[#10282C] shadow-lg">
                  <Navigation className="w-4 h-4 fill-current rotate-45" />
                </div>
                <span className="mt-1 px-2 py-0.5 rounded-md bg-[#172B3A] text-white text-[10px] font-bold shadow">
                  {childDisplayName} · {selectedChild.battery}%
                </span>
              </div>

              {/* Safe Zone Pins */}
              <div className="absolute top-6 left-8 flex flex-col items-center">
                <div className="p-1.5 rounded-full bg-[#176652] text-white shadow">
                  <Home className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-semibold text-[#172B3A] dark:text-white bg-white/85 dark:bg-black/60 px-1.5 rounded mt-0.5">
                  Home (200m)
                </span>
              </div>

              <div className="absolute bottom-6 right-10 flex flex-col items-center">
                <div className="p-1.5 rounded-full bg-[#275C98] text-white shadow">
                  <Building className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-semibold text-[#172B3A] dark:text-white bg-white/85 dark:bg-black/60 px-1.5 rounded mt-0.5">
                  School (300m)
                </span>
              </div>
            </div>

            {/* Location Permission Quick Toggle */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-[#5B7180] dark:text-[#AFC0CA]">
                {language === 'bn'
                  ? 'অবস্থান শেয়ারিং ও জিওফেন্সিং অনুমতি:'
                  : 'Location Sharing Permission Status:'}
              </span>
              <button
                onClick={() => toggleChildPermission(selectedChild.id, 'location')}
                className={`px-3 py-1 rounded-xl font-bold ${
                  selectedChild.permissions.location
                    ? 'bg-[#D8EBE9] dark:bg-[#264D4E] text-[#176652] dark:text-[#8EE0C5]'
                    : 'bg-[#9B3946]/20 text-[#9B3946]'
                }`}
              >
                {selectedChild.permissions.location ? 'Granted (Active)' : 'Paused'}
              </button>
            </div>
          </div>

          {/* Safe Zones / Geofences List + Entry/Exit Simulator */}
          <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                {t('location.safeZones', language)} ({safeZones.length})
              </h3>
              <button
                onClick={() => setShowAddZone(true)}
                className="sr-btn-primary py-1.5 px-3 rounded-xl text-xs font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'নতুন স্থান' : 'Add Safe Zone'}</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {safeZones.map((zone) => (
                <div
                  key={zone.id}
                  className="p-3.5 rounded-2xl bg-[#E5EDF2]/60 dark:bg-[#172732]/60 flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                          {language === 'bn' ? zone.nameBn : zone.nameEn}
                        </h4>
                        <span className="text-[11px] font-mono text-[#5B7180]">
                          · {zone.radiusMeters}m
                        </span>
                      </div>
                      <p className="text-[11px] text-[#5B7180] dark:text-[#AFC0CA]">
                        {zone.address} ·{' '}
                        {zone.isChildInside
                          ? language === 'bn'
                            ? 'সন্তান ভেতরে আছে'
                            : 'Child currently inside'
                          : language === 'bn'
                          ? 'বাইরে আছে'
                          : 'Outside zone'}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => toggleSafeZone(zone.id)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                          zone.isActive
                            ? 'bg-[#D8EBE9] dark:bg-[#264D4E] text-[#176652] dark:text-[#8EE0C5]'
                            : 'sr-card-inset text-[#5B7180]'
                        }`}
                      >
                        {zone.isActive ? 'Active' : 'Off'}
                      </button>
                      <button
                        onClick={() => deleteSafeZone(zone.id)}
                        className="p-1.5 text-[#5B7180] hover:text-[#9B3946]"
                        title="Delete Safe Zone"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Test Entry / Exit Alert Buttons */}
                  <div className="flex items-center gap-2 pt-1 border-t border-[#CFDAE1]/40 dark:border-[#415560]/30">
                    <span className="text-[10px] text-[#5B7180]">
                      {language === 'bn' ? 'অ্যালার্ট টেস্ট:' : 'Simulate Geofence:'}
                    </span>
                    <button
                      onClick={() => simulateZoneTransition(zone.id, 'entry')}
                      className="sr-btn-raised px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[#176652] dark:text-[#8EE0C5] flex items-center gap-1"
                    >
                      <LogIn className="w-3 h-3" />
                      <span>{language === 'bn' ? 'প্রবেশ (Entry Alert)' : 'Trigger Entry Alert'}</span>
                    </button>
                    <button
                      onClick={() => simulateZoneTransition(zone.id, 'exit')}
                      className="sr-btn-raised px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[#955716] dark:text-[#FFCE8A] flex items-center gap-1"
                    >
                      <LogOut className="w-3 h-3" />
                      <span>{language === 'bn' ? 'প্রস্থান (Exit Alert)' : 'Trigger Exit Alert'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Location History & Timeline */}
      {activeSubTab === 'history' && (
        <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#1C5A70] dark:text-[#7FD5CE]" />
              <span>
                {language === 'bn'
                  ? `${childDisplayName}-এর অবস্থান ইতিহাস ও রুট টাইমলাইন`
                  : `Location History & Timeline (${childDisplayName})`}
              </span>
            </h3>
            <span className="text-[11px] text-[#5B7180]">7-day auto-prune</span>
          </div>

          <div className="space-y-3">
            {locationHistory.map((pt) => (
              <div
                key={pt.id}
                className="p-3.5 rounded-2xl bg-[#E5EDF2]/60 dark:bg-[#172732]/60 flex items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-xl mt-0.5 ${
                      pt.eventType === 'entry'
                        ? 'bg-[#D8EBE9] dark:bg-[#264D4E] text-[#176652] dark:text-[#8EE0C5]'
                        : 'bg-[#FFCE8A]/20 text-[#955716] dark:text-[#FFCE8A]'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                      {language === 'bn' ? pt.placeNameBn : pt.placeNameEn}
                    </h4>
                    <p className="text-[11px] font-mono text-[#5B7180] dark:text-[#AFC0CA]">
                      {pt.time} · Accuracy ±{pt.accuracyMeters}m · Battery {pt.batteryLevel}%
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold uppercase text-[#5B7180]">
                  {pt.eventType}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Voluntary Check-ins */}
      {activeSubTab === 'checkins' && (
        <div className="flex flex-col gap-4">
          <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#D8EBE9] dark:bg-[#264D4E] text-[#1C5A70] dark:text-[#7FD5CE]">
                <Send className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                  {t('checkin.request', language)}
                </h3>
                <p className="text-xs text-[#5B7180] dark:text-[#AFC0CA]">
                  {language === 'bn'
                    ? `${childDisplayName}-এর ফোনে খোঁজ নেওয়ার মৃদু অনুরোধ পাঠান।`
                    : `Sends a polite prompt asking ${childDisplayName} to tap "I'm okay".`}
                </p>
              </div>
            </div>

            <button
              onClick={() => requestCheckInFromChild(selectedChild.id)}
              className="sr-btn-primary py-2.5 px-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t('checkin.request', language)}</span>
            </button>
          </div>

          <div className="sr-card-raised p-4 sm:p-5 rounded-3xl flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#CFDAE1]/50 dark:border-[#415560]/40">
              <span className="text-xs font-semibold text-[#5B7180] dark:text-[#AFC0CA]">
                {t('checkin.recentHistory', language)}
              </span>
              <span className="text-xs font-semibold text-[#176652] dark:text-[#8EE0C5] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'স্বেচ্ছায় পাঠানো' : 'Voluntary'}</span>
              </span>
            </div>

            <div className="space-y-3">
              {checkInEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3.5 rounded-2xl bg-[#E5EDF2]/60 dark:bg-[#172732]/60 flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                      {t('checkin.received', language, {
                        name: childDisplayName,
                        time: event.timestamp,
                      })}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[#5B7180] dark:text-[#AFC0CA]">
                      <Battery className="w-3.5 h-3.5" />
                      <span>{event.batteryAtCheckIn}%</span>
                    </span>
                  </div>
                  <p className="text-xs text-[#40586B] dark:text-[#C3D4DD] font-medium">
                    "{event.message}"
                  </p>
                  {event.locationLabel && (
                    <div className="flex items-center gap-1 text-[11px] text-[#5B7180] dark:text-[#AFC0CA]">
                      <MapPin className="w-3 h-3 text-[#1C5A70] dark:text-[#7FD5CE]" />
                      <span>{event.locationLabel}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Safe Zone Modal */}
      {showAddZone && (
        <div className="fixed inset-0 z-50 bg-[#152631]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleAddZone}
            className="sr-card-raised p-5 rounded-3xl max-w-md w-full bg-[#EFF5F8] dark:bg-[#21323D] shadow-2xl flex flex-col gap-4"
          >
            <div className="flex items-center justify-between border-b border-[#CFDAE1]/50 pb-3">
              <h3 className="text-base font-bold text-[#172B3A] dark:text-[#F2F7F8]">
                {language === 'bn' ? 'নতুন নিরাপদ স্থান যোগ করুন' : 'Add New Safe Zone (Geofence)'}
              </h3>
              <button
                type="button"
                onClick={() => setShowAddZone(false)}
                className="text-[#5B7180]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Place Name:</label>
                <input
                  type="text"
                  required
                  value={zoneNameEn}
                  onChange={(e) => setZoneNameEn(e.target.value)}
                  placeholder="e.g. Grandparents House / Sports Club"
                  className="w-full sr-card-inset p-2.5 rounded-xl"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Address / Area:</label>
                <input
                  type="text"
                  value={zoneAddress}
                  onChange={(e) => setZoneAddress(e.target.value)}
                  placeholder="e.g. Gulshan 2, Dhaka"
                  className="w-full sr-card-inset p-2.5 rounded-xl"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">
                  Radius: <span className="font-mono">{zoneRadius} meters</span>
                </label>
                <input
                  type="range"
                  min={100}
                  max={1000}
                  step={50}
                  value={zoneRadius}
                  onChange={(e) => setZoneRadius(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddZone(false)}
                className="flex-1 sr-btn-raised py-2.5 rounded-2xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 sr-btn-primary py-2.5 rounded-2xl text-xs font-bold"
              >
                Save Safe Zone
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

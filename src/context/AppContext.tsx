import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  ViewMode,
  TextScale,
  ParentTab,
  ParentUser,
  ChildProfile,
  ChildPermissionsState,
  InstalledApp,
  SafeZone,
  LocationHistoryPoint,
  RemoteSession,
  RemoteMonitoringLog,
  SocialNotificationItem,
  WebCategoryFilter,
  WebRuleSite,
  WebActivityLog,
  SupportTicket,
  NotificationPreferences,
  PolicyRule,
  TimeExtensionRequest,
  CheckInEvent,
  SOSEvent,
  AlertItem,
  FamilyMessage,
  CoGuardian,
  AccessAuditLog,
  DeviceCapability,
} from '../types';

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'info' | 'success' | 'warning' | 'urgent';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  textScale: TextScale;
  setTextScale: (scale: TextScale) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  activeParentTab: ParentTab;
  setActiveParentTab: (tab: ParentTab) => void;

  // 1. Parent Account & Family Management
  parentUser: ParentUser;
  loginParent: (email: string, password?: string) => void;
  registerParent: (name: string, email: string, phone: string) => void;
  resetParentPassword: (email: string) => void;
  logoutParent: () => void;
  updateParentProfile: (updates: Partial<ParentUser>) => void;
  childrenList: ChildProfile[];
  selectedChildId: string;
  setSelectedChildId: (id: string) => void;
  selectedChild: ChildProfile;
  addChildProfile: (name: string, nickname: string, age: number, deviceModel: string, platform: 'android' | 'ios') => void;
  generateNewPairingCode: (childId: string) => string;
  bindChildDeviceWithCode: (code: string) => boolean;
  unbindChildDevice: (childId: string) => void;
  toggleChildOnlineStatus: (childId: string) => void;
  updateChildBattery: (childId: string, battery: number) => void;
  toggleChildPermission: (childId: string, key: keyof ChildPermissionsState) => void;

  // 2 & 3. Screen Time, Usage & App Management
  policyRules: PolicyRule[];
  policyVersion: number;
  createOrUpdateRule: (rule: Partial<PolicyRule>) => void;
  deleteRule: (id: string) => void;
  installedApps: InstalledApp[];
  updateAppStatus: (appId: string, status: InstalledApp['status']) => void;
  updateAppLimit: (appId: string, limitMinutes: number | null, schedule?: string) => void;
  simulateNewAppInstall: (appName: string, category: InstalledApp['category']) => void;
  requestAppAccessFromChild: (appId: string, reason: string) => void;

  // Requests
  timeRequests: TimeExtensionRequest[];
  requestMoreTime: (minutes: number, reason: string) => void;
  respondToTimeRequest: (requestId: string, approve: boolean) => void;

  // 4. Location & Family Safety
  checkInEvents: CheckInEvent[];
  requestCheckInFromChild: (childId: string) => void;
  sendCheckInFromChild: (message?: string) => void;
  activeSos: SOSEvent | null;
  triggerSos: (emergencyNumber?: string) => void;
  acknowledgeSos: () => void;
  cancelSos: () => void;
  safeZones: SafeZone[];
  locationHistory: LocationHistoryPoint[];
  addSafeZone: (nameEn: string, nameBn: string, address: string, radiusMeters: number) => void;
  toggleSafeZone: (zoneId: string) => void;
  deleteSafeZone: (zoneId: string) => void;
  simulateZoneTransition: (zoneId: string, eventType: 'entry' | 'exit') => void;
  refreshChildLocation: () => void;

  // 5. Remote Monitoring Features (with explicit session consent)
  remoteSession: RemoteSession;
  remoteLogs: RemoteMonitoringLog[];
  startRemoteSessionRequest: (type: RemoteSession['type']) => void;
  respondToRemoteConsentOnChild: (accept: boolean) => void;
  stopRemoteSession: (endedBy: 'parent' | 'child') => void;

  // 6. Notifications & Social Safety (AI-assisted)
  socialNotifications: SocialNotificationItem[];
  keywordWatchlist: string[];
  addKeywordToWatchlist: (word: string) => void;
  removeKeywordFromWatchlist: (word: string) => void;
  analyzeSocialMessageWithAI: (appName: SocialNotificationItem['appName'], sender: string, snippet: string) => Promise<void>;
  isAnalyzingSocial: boolean;
  dismissSocialNotification: (id: string) => void;
  notificationRetentionHours: number;
  setNotificationRetentionHours: (hours: number) => void;
  redactOtpAndBanking: boolean;
  setRedactOtpAndBanking: (val: boolean) => void;

  // 7. Web Safety & Content Filtering
  webFilterEnabled: boolean;
  setWebFilterEnabled: (val: boolean) => void;
  safeSearchEnabled: boolean;
  setSafeSearchEnabled: (val: boolean) => void;
  webCategories: WebCategoryFilter[];
  toggleWebCategory: (id: string) => void;
  webSites: WebRuleSite[];
  addWebSiteRule: (domain: string, listType: 'allow' | 'block') => void;
  removeWebSiteRule: (id: string) => void;
  webActivityLogs: WebActivityLog[];
  simulateChildWebsiteVisit: (domain: string) => { action: 'allowed' | 'blocked'; reason: string };

  // 9. Alerts & Notification Preferences
  alerts: AlertItem[];
  markAlertAsRead: (id: string) => void;
  clearAlert: (id: string) => void;
  notificationPrefs: NotificationPreferences;
  updateNotificationPrefs: (updates: Partial<NotificationPreferences>) => void;

  // Family Chat & Guardians
  familyMessages: FamilyMessage[];
  sendMessage: (text: string, isChild: boolean) => void;
  coGuardians: CoGuardian[];
  inviteCoGuardian: (name: string, email: string, permissions: CoGuardian['permissions']) => void;
  revokeCoGuardian: (id: string) => void;

  // 10. Subscription & Business Features
  upgradeSubscription: (tier: 'free' | 'family_plus', cycle: 'monthly' | 'annual') => Promise<void>;
  restorePurchases: () => void;

  // 11 & 12. Privacy, Support Tickets & Diagnostics
  accessAuditLogs: AccessAuditLog[];
  deviceCapabilities: DeviceCapability[];
  supportTickets: SupportTicket[];
  createSupportTicket: (subject: string, category: SupportTicket['category'], description: string) => void;
  exportFamilyData: () => void;
  deleteFamilyData: () => void;

  // Toast
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_PARENT: ParentUser = {
  id: 'parent-maya',
  name: 'Maya Rahman',
  email: 'maya.rahman@gmail.com',
  phone: '+880 1711-234567',
  isAuthenticated: true,
  mfaEnabled: true,
  subscriptionTier: 'family_plus',
  billingCycle: 'annual',
  trialDaysLeft: 14,
  subscriptionRenewsAt: '20 Oct 2027',
};

const INITIAL_CHILDREN: ChildProfile[] = [
  {
    id: 'child-ayan',
    name: 'Ayan',
    nickname: 'আয়ান',
    age: 11,
    ageBand: '10-12',
    avatarInitials: 'AY',
    avatarColor: '#1C5A70',
    deviceModel: 'Samsung Galaxy A15',
    osVersion: 'Android 15 (API 35)',
    platform: 'android',
    battery: 43,
    isCharging: false,
    isOnline: true,
    isBound: true,
    pairingCode: '482916',
    lastSyncMinutesAgo: 2,
    dailyUsageMinutes: 58,
    dailyLimitMinutes: 90,
    currentDowntimeActive: false,
    weeklyUsageMinutes: [
      { dayEn: 'Sun', dayBn: 'রবি', minutes: 74 },
      { dayEn: 'Mon', dayBn: 'সোম', minutes: 65 },
      { dayEn: 'Tue', dayBn: 'মঙ্গল', minutes: 82 },
      { dayEn: 'Wed', dayBn: 'বুধ', minutes: 55 },
      { dayEn: 'Thu', dayBn: 'বৃহঃ', minutes: 88 },
      { dayEn: 'Fri', dayBn: 'শুক্র', minutes: 105 },
      { dayEn: 'Sat', dayBn: 'শনি', minutes: 58 },
    ],
    hourlyUsageToday: [
      { hour: '08:00', minutes: 8 },
      { hour: '10:00', minutes: 5 },
      { hour: '14:00', minutes: 18 },
      { hour: '16:00', minutes: 15 },
      { hour: '18:00', minutes: 12 },
      { hour: '20:00', minutes: 0 },
    ],
    permissions: {
      usageAccess: true,
      location: true,
      notifications: true,
      accessibility: true,
      batteryUnrestricted: false,
    },
  },
  {
    id: 'child-mira',
    name: 'Mira',
    nickname: 'মিরা',
    age: 8,
    ageBand: '6-9',
    avatarInitials: 'MR',
    avatarColor: '#217E7B',
    deviceModel: 'Xiaomi Redmi 12',
    osVersion: 'Android 14 (API 34)',
    platform: 'android',
    battery: 76,
    isCharging: true,
    isOnline: true,
    isBound: true,
    pairingCode: '739204',
    lastSyncMinutesAgo: 6,
    dailyUsageMinutes: 30,
    dailyLimitMinutes: 60,
    currentDowntimeActive: false,
    weeklyUsageMinutes: [
      { dayEn: 'Sun', dayBn: 'রবি', minutes: 45 },
      { dayEn: 'Mon', dayBn: 'সোম', minutes: 38 },
      { dayEn: 'Tue', dayBn: 'মঙ্গল', minutes: 50 },
      { dayEn: 'Wed', dayBn: 'বুধ', minutes: 42 },
      { dayEn: 'Thu', dayBn: 'বৃহঃ', minutes: 55 },
      { dayEn: 'Fri', dayBn: 'শুক্র', minutes: 60 },
      { dayEn: 'Sat', dayBn: 'শনি', minutes: 30 },
    ],
    hourlyUsageToday: [
      { hour: '09:00', minutes: 10 },
      { hour: '15:00', minutes: 12 },
      { hour: '17:00', minutes: 8 },
    ],
    permissions: {
      usageAccess: true,
      location: true,
      notifications: true,
      accessibility: false,
      batteryUnrestricted: true,
    },
  },
];

const INITIAL_INSTALLED_APPS: InstalledApp[] = [
  {
    id: 'app-ytkids',
    childId: 'child-ayan',
    name: 'YouTube Kids',
    packageName: 'com.google.android.apps.youtube.kids',
    category: 'Entertainment',
    usedMinutesToday: 28,
    dailyLimitMinutes: 45,
    launchesToday: 6,
    status: 'time_limited',
    installedAt: '12 Sep 2026',
    scheduledRestriction: '21:00 - 07:00',
  },
  {
    id: 'app-math',
    childId: 'child-ayan',
    name: 'Math League BD',
    packageName: 'bd.edu.mathleague',
    category: 'Education',
    usedMinutesToday: 18,
    dailyLimitMinutes: null,
    launchesToday: 4,
    status: 'allowed',
    installedAt: '01 Oct 2026',
  },
  {
    id: 'app-chrome',
    childId: 'child-ayan',
    name: 'Chrome Browser',
    packageName: 'com.android.chrome',
    category: 'Browser',
    usedMinutesToday: 12,
    dailyLimitMinutes: 30,
    launchesToday: 9,
    status: 'time_limited',
    installedAt: 'System Default',
  },
  {
    id: 'app-roblox',
    childId: 'child-ayan',
    name: 'Roblox',
    packageName: 'com.roblox.client',
    category: 'Games',
    usedMinutesToday: 0,
    dailyLimitMinutes: 30,
    launchesToday: 2,
    status: 'blocked',
    installedAt: '05 Oct 2026',
    scheduledRestriction: 'School Days Blocked',
  },
  {
    id: 'app-whatsapp',
    childId: 'child-ayan',
    name: 'WhatsApp',
    packageName: 'com.whatsapp',
    category: 'Social',
    usedMinutesToday: 8,
    dailyLimitMinutes: 30,
    launchesToday: 14,
    status: 'allowed',
    installedAt: '20 Sep 2026',
  },
  {
    id: 'app-freefire',
    childId: 'child-ayan',
    name: 'Garena Free Fire',
    packageName: 'com.dts.freefireth',
    category: 'Games',
    usedMinutesToday: 0,
    dailyLimitMinutes: 0,
    launchesToday: 1,
    status: 'pending_approval',
    installedAt: 'Today, 3:20 PM',
    isNewInstall: true,
  },
];

const INITIAL_SAFE_ZONES: SafeZone[] = [
  {
    id: 'zone-home',
    childId: 'child-ayan',
    nameEn: 'Home (Banani)',
    nameBn: 'বাসা (বনানী, ঢাকা)',
    address: 'Road 11, Block D, Banani, Dhaka',
    radiusMeters: 200,
    notifyOnEntry: true,
    notifyOnExit: true,
    isActive: true,
    isChildInside: true,
  },
  {
    id: 'zone-school',
    childId: 'child-ayan',
    nameEn: 'School (Uttara Model)',
    nameBn: 'বিদ্যালয় (উত্তরা মডেল স্কুল)',
    address: 'Sector 4, Uttara, Dhaka',
    radiusMeters: 300,
    notifyOnEntry: true,
    notifyOnExit: true,
    isActive: true,
    isChildInside: false,
  },
  {
    id: 'zone-coaching',
    childId: 'child-ayan',
    nameEn: 'Art Studio & Coaching',
    nameBn: 'আর্ট কোচিং সেন্টার',
    address: 'Kemal Ataturk Ave, Banani, Dhaka',
    radiusMeters: 180,
    notifyOnEntry: true,
    notifyOnExit: true,
    isActive: true,
    isChildInside: false,
  },
];

const INITIAL_LOCATION_HISTORY: LocationHistoryPoint[] = [
  {
    id: 'loc-1',
    childId: 'child-ayan',
    time: '4:12 PM',
    placeNameEn: 'Art Studio & Coaching, Banani',
    placeNameBn: 'আর্ট কোচিং সেন্টার, বনানী',
    accuracyMeters: 14,
    eventType: 'entry',
    batteryLevel: 48,
  },
  {
    id: 'loc-2',
    childId: 'child-ayan',
    time: '1:35 PM',
    placeNameEn: 'Left Uttara Model School',
    placeNameBn: 'উত্তরা মডেল স্কুল থেকে প্রস্থান',
    accuracyMeters: 18,
    eventType: 'exit',
    batteryLevel: 62,
  },
  {
    id: 'loc-3',
    childId: 'child-ayan',
    time: '7:50 AM',
    placeNameEn: 'Arrived at Uttara Model School',
    placeNameBn: 'উত্তরা মডেল স্কুলে আগমন',
    accuracyMeters: 12,
    eventType: 'entry',
    batteryLevel: 91,
  },
];

const INITIAL_SOCIAL_NOTIFICATIONS: SocialNotificationItem[] = [
  {
    id: 'soc-1',
    childId: 'child-ayan',
    appName: 'Discord',
    sender: 'DarkKnight_99',
    snippet: 'Click this link for 10,000 free Robux! Enter your account password and OTP [REDACTED-OTP] now.',
    timestamp: '28 min ago',
    matchedKeyword: 'free robux / password',
    riskLevel: 'medium',
    riskCategory: 'scam_phishing',
    confidence: 91,
    aiExplanationEn: 'Contains gaming reward bait and asks for account credentials. Any OTP digits were automatically masked.',
    aiExplanationBn: 'এতে ফ্রি গেম রিওয়ার্ডের প্রলোভন দেখিয়ে পাসওয়ার্ড চাওয়া হয়েছে। গোপন ওটিপি নম্বর স্বয়ংক্রিয়ভাবে ঢেকে দেওয়া হয়েছে।',
    conversationStarterEn: 'Hey Ayan, remember that official games never ask for your password in chat messages.',
    conversationStarterBn: 'আয়ান, মনে রেখো কোনো আসল গেম কখনোই চ্যাটে তোমার পাসওয়ার্ড বা ওটিপি চাইবে না।',
    dismissed: false,
  },
  {
    id: 'soc-2',
    childId: 'child-ayan',
    appName: 'WhatsApp',
    sender: 'Class 6 Group',
    snippet: 'Nobody likes your drawing, dont sit with us tomorrow loser.',
    timestamp: '1 hour ago',
    matchedKeyword: 'loser / nobody likes',
    riskLevel: 'high',
    riskCategory: 'cyberbullying',
    confidence: 95,
    aiExplanationEn: 'Detected peer exclusion and hostile language in a group notification.',
    aiExplanationBn: 'গ্রুপ বার্তায় বন্ধুদের কাছ থেকে অপমানজনক ভাষা ও একঘরে করার প্রবণতা শনাক্ত হয়েছে।',
    conversationStarterEn: 'How did art class go today? Were your classmates supportive of your new sketch?',
    conversationStarterBn: 'আজ ক্লাসে তোমার ছবি আঁকা কেমন হলো? বন্ধুরা কি সবাই ভালো ব্যবহার করেছে?',
    dismissed: false,
  },
];

const INITIAL_WEB_CATEGORIES: WebCategoryFilter[] = [
  { id: 'cat-adult', nameEn: 'Adult & Explicit Content', nameBn: 'প্রাপ্তবয়স্ক ও অশ্লীল কন্টেন্ট', category: 'adult', isBlocked: true },
  { id: 'cat-gambling', nameEn: 'Gambling, Betting & Lootboxes', nameBn: 'জুয়া ও বেটিং সাইট', category: 'gambling', isBlocked: true },
  { id: 'cat-violence', nameEn: 'Violence & Self-Harm', nameBn: 'সহিংসতা ও ক্ষতিকর কন্টেন্ট', category: 'violence', isBlocked: true },
  { id: 'cat-malware', nameEn: 'Phishing & Unverified APK Downloads', nameBn: 'ফিশিং ও অনিরাপদ APK ডাউনলোড', category: 'malware', isBlocked: true },
  { id: 'cat-social', nameEn: 'Unmoderated Social Forums', nameBn: 'অনিয়ন্ত্রিত সোশ্যাল ফোরাম', category: 'social', isBlocked: false },
  { id: 'cat-gaming', nameEn: 'Browser Gaming Portals', nameBn: 'ব্রাউজার গেমিং সাইট', category: 'gaming', isBlocked: false },
];

const INITIAL_WEB_SITES: WebRuleSite[] = [
  { id: 'site-1', domain: '10minuteschool.com', listType: 'allow', addedAt: '10 Oct 2026' },
  { id: 'site-2', domain: 'khanacademy.org', listType: 'allow', addedAt: '10 Oct 2026' },
  { id: 'site-3', domain: 'wikipedia.org', listType: 'allow', addedAt: '12 Oct 2026' },
  { id: 'site-4', domain: 'free-robux-generator.xyz', listType: 'block', addedAt: '18 Oct 2026' },
  { id: 'site-5', domain: 'unverified-apk-mods.net', listType: 'block', addedAt: '19 Oct 2026' },
];

const INITIAL_WEB_LOGS: WebActivityLog[] = [
  {
    id: 'wlog-1',
    childId: 'child-ayan',
    domain: 'khanacademy.org/math/geometry',
    category: 'Education',
    timestamp: '3:55 PM',
    action: 'allowed',
    browser: 'Chrome',
  },
  {
    id: 'wlog-2',
    childId: 'child-ayan',
    domain: 'free-robux-generator.xyz',
    category: 'Phishing / Scam',
    timestamp: '3:32 PM',
    action: 'blocked',
    browser: 'Chrome',
  },
  {
    id: 'wlog-3',
    childId: 'child-ayan',
    domain: '10minuteschool.com',
    category: 'Education',
    timestamp: '2:15 PM',
    action: 'allowed',
    browser: 'Chrome',
  },
];

const INITIAL_RULES: PolicyRule[] = [
  {
    id: 'rule-bedtime',
    type: 'bedtime',
    titleKey: 'rules.bedtime',
    days: [0, 1, 2, 3, 4, 5, 6],
    fromTime: '21:30',
    untilTime: '06:30',
    exemptions: ['Emergency Dialer (999)', 'Family Safe Chat', 'Clock/Alarms'],
    isActive: true,
    version: 18,
    status: 'applied',
    statusReason: 'Active on device',
  },
  {
    id: 'rule-daily-limit',
    type: 'daily_limit',
    titleKey: 'rules.dailyLimit',
    days: [0, 1, 2, 3, 4, 5, 6],
    limitMinutes: 90,
    exemptions: ['Educational Apps', 'Emergency Dialer (999)'],
    isActive: true,
    version: 18,
    status: 'applied',
    statusReason: 'Applied at 8:52 PM',
  },
  {
    id: 'rule-school-focus',
    type: 'school_focus',
    titleKey: 'rules.schoolFocus',
    days: [0, 1, 2, 3, 4],
    fromTime: '08:00',
    untilTime: '14:00',
    exemptions: ['Khan Academy', 'Math League BD', 'Parent Messages'],
    isActive: true,
    version: 18,
    status: 'applied',
  },
];

const INITIAL_REQUESTS: TimeExtensionRequest[] = [
  {
    id: 'req-1',
    childId: 'child-ayan',
    childName: 'Ayan',
    requestType: 'screen_time',
    requestedMinutes: 15,
    reason: 'Finishing an art project on drawing app with classmates',
    requestedAt: '12 min ago',
    status: 'pending',
  },
];

const INITIAL_CHECKINS: CheckInEvent[] = [
  {
    id: 'check-1',
    childId: 'child-ayan',
    childName: 'Ayan',
    timestamp: '4:12 PM',
    message: 'Reached art coaching class safely with teacher.',
    locationLabel: 'Banani Block D, Dhaka',
    batteryAtCheckIn: 48,
  },
  {
    id: 'check-2',
    childId: 'child-ayan',
    childName: 'Ayan',
    timestamp: '1:30 PM',
    message: 'School finished for today, waiting for school van.',
    locationLabel: 'Uttara Sector 4, Dhaka',
    batteryAtCheckIn: 62,
  },
];

const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'alert-soc-1',
    type: 'safety',
    severity: 'warning',
    titleKey: 'Social Safety Risk Detected',
    descriptionKey: 'Potential cyberbullying language flagged in WhatsApp notification on Ayan’s phone.',
    timestamp: '1 hour ago',
    isRead: false,
    childId: 'child-ayan',
    actionRoute: 'social',
  },
  {
    id: 'alert-app-1',
    type: 'request',
    severity: 'info',
    titleKey: 'New App Installed — Approval Needed',
    descriptionKey: 'Garena Free Fire was installed on Ayan’s phone and is paused pending parent review.',
    timestamp: '22 min ago',
    isRead: false,
    childId: 'child-ayan',
    actionRoute: 'apps',
  },
  {
    id: 'alert-1',
    type: 'request',
    severity: 'info',
    titleKey: 'requests.moreTime',
    descriptionKey: 'Ayan requested 15 extra minutes for drawing project.',
    timestamp: '12 min ago',
    isRead: false,
    childId: 'child-ayan',
    actionRoute: 'usage',
    metadata: { requestId: 'req-1', minutes: 15, reason: 'Finishing an art project' },
  },
  {
    id: 'alert-2',
    type: 'device',
    severity: 'warning',
    titleKey: 'Device Optimization Notice',
    descriptionKey: 'Samsung aggressive battery optimization may delay scheduled bedtime notifications.',
    timestamp: '2 hours ago',
    isRead: true,
    childId: 'child-ayan',
    actionRoute: 'settings',
  },
];

const INITIAL_MESSAGES: FamilyMessage[] = [
  {
    id: 'msg-1',
    senderId: 'parent-maya',
    senderName: 'Maya (Ammu)',
    role: 'parent',
    text: 'Ayan, please remember art class finishes at 5:00 PM today.',
    timestamp: '3:45 PM',
    isChild: false,
  },
  {
    id: 'msg-2',
    senderId: 'child-ayan',
    senderName: 'Ayan',
    role: 'child',
    text: 'Yes Ammu, I brought my sketchbook and color pens!',
    timestamp: '3:48 PM',
    isChild: true,
  },
  {
    id: 'msg-3',
    senderId: 'parent-maya',
    senderName: 'Maya (Ammu)',
    role: 'parent',
    text: 'Good job! Send a quick check-in when you reach.',
    timestamp: '3:50 PM',
    isChild: false,
  },
];

const INITIAL_GUARDIANS: CoGuardian[] = [
  {
    id: 'guard-1',
    name: 'Maya Rahman',
    email: 'maya.rahman@gmail.com',
    role: 'primary',
    permissions: 'manage_rules',
    invitedAt: '12 Oct 2026',
    status: 'active',
  },
  {
    id: 'guard-2',
    name: 'Tariq Rahman',
    email: 'tariq.rahman@gmail.com',
    role: 'co_guardian',
    permissions: 'view_activity',
    invitedAt: '15 Oct 2026',
    status: 'active',
  },
];

const INITIAL_CAPABILITIES: DeviceCapability[] = [
  {
    id: 'cap-usage',
    titleKey: 'Screen Time & App Usage (UsageStatsManager)',
    status: 'granted',
    descriptionKey: 'Summarizes app duration and launch frequency without recording private messages.',
    riskNoticeKey: 'Calculated on-device. Rolling 30-day retention.',
    platform: 'android',
    requiredPermission: 'PACKAGE_USAGE_STATS',
  },
  {
    id: 'cap-bedtime',
    titleKey: 'Bedtime & App Shield (Accessibility / Overlay)',
    status: 'granted',
    descriptionKey: 'Enforces scheduled downtime and app-specific limits with a calm shield.',
    riskNoticeKey: 'Never blocks 999 emergency calls or family chat.',
    platform: 'both',
    requiredPermission: 'BIND_ACCESSIBILITY_SERVICE (Scoped)',
  },
  {
    id: 'cap-location',
    titleKey: 'GPS Location & Safe Zones (FusedLocationProvider)',
    status: 'granted',
    descriptionKey: 'Provides parent-authorized location check-ins and safe zone arrival/departure alerts.',
    riskNoticeKey: 'Disclosed in persistent child notification.',
    platform: 'both',
    requiredPermission: 'ACCESS_FINE_LOCATION',
  },
  {
    id: 'cap-notif',
    titleKey: 'Social Notification Risk Scanner',
    status: 'granted',
    descriptionKey: 'Scans opt-in social notifications for cyberbullying and scam links; auto-redacts OTPs.',
    riskNoticeKey: '48-hour max raw TTL; AI analysis is advisory.',
    platform: 'android',
    requiredPermission: 'BIND_NOTIFICATION_LISTENER_SERVICE',
  },
  {
    id: 'cap-web',
    titleKey: 'Safe Web & DNS Content Filter',
    status: 'granted',
    descriptionKey: 'Blocks adult/phishing domains and enforces SafeSearch via local DNS VpnService.',
    riskNoticeKey: 'No TLS MITM decryption.',
    platform: 'both',
    requiredPermission: 'BIND_VPN_SERVICE (Local DNS)',
  },
  {
    id: 'cap-screen',
    titleKey: 'Consensual Remote Assist (MediaProjection)',
    status: 'needs_action',
    descriptionKey: 'Requires child to tap Accept on their screen for each live screen-mirror or camera check-in.',
    riskNoticeKey: 'Visible active banner shown on both phones.',
    platform: 'android',
    requiredPermission: 'MediaProjection Per-Session Consent',
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('bn');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [textScale, setTextScale] = useState<TextScale>('normal');
  const [viewMode, setViewMode] = useState<ViewMode>('dual');
  const [activeParentTab, setActiveParentTab] = useState<ParentTab>('home');

  const [parentUser, setParentUser] = useState<ParentUser>(INITIAL_PARENT);
  const [childrenList, setChildrenList] = useState<ChildProfile[]>(INITIAL_CHILDREN);
  const [selectedChildId, setSelectedChildId] = useState<string>('child-ayan');

  const [policyRules, setPolicyRules] = useState<PolicyRule[]>(INITIAL_RULES);
  const [policyVersion, setPolicyVersion] = useState<number>(18);
  const [installedApps, setInstalledApps] = useState<InstalledApp[]>(INITIAL_INSTALLED_APPS);
  const [timeRequests, setTimeRequests] = useState<TimeExtensionRequest[]>(INITIAL_REQUESTS);

  const [checkInEvents, setCheckInEvents] = useState<CheckInEvent[]>(INITIAL_CHECKINS);
  const [activeSos, setActiveSos] = useState<SOSEvent | null>(null);
  const [safeZones, setSafeZones] = useState<SafeZone[]>(INITIAL_SAFE_ZONES);
  const [locationHistory, setLocationHistory] = useState<LocationHistoryPoint[]>(INITIAL_LOCATION_HISTORY);

  const [remoteSession, setRemoteSession] = useState<RemoteSession>({
    id: 'rem-0',
    childId: 'child-ayan',
    type: 'screen_mirror',
    status: 'idle',
    durationSeconds: 0,
  });
  const [remoteLogs, setRemoteLogs] = useState<RemoteMonitoringLog[]>([
    {
      id: 'rlog-1',
      childId: 'child-ayan',
      type: 'screen_mirror',
      guardianName: 'Maya Rahman',
      timestamp: 'Yesterday, 6:15 PM',
      duration: '3m 20s',
      childConsentVerified: true,
    },
  ]);

  const [socialNotifications, setSocialNotifications] = useState<SocialNotificationItem[]>(INITIAL_SOCIAL_NOTIFICATIONS);
  const [keywordWatchlist, setKeywordWatchlist] = useState<string[]>([
    'loser',
    'hate you',
    'free robux',
    'password',
    'otp',
    'meet me alone',
    'secret',
  ]);
  const [isAnalyzingSocial, setIsAnalyzingSocial] = useState<boolean>(false);
  const [notificationRetentionHours, setNotificationRetentionHours] = useState<number>(48);
  const [redactOtpAndBanking, setRedactOtpAndBanking] = useState<boolean>(true);

  const [webFilterEnabled, setWebFilterEnabled] = useState<boolean>(true);
  const [safeSearchEnabled, setSafeSearchEnabled] = useState<boolean>(true);
  const [webCategories, setWebCategories] = useState<WebCategoryFilter[]>(INITIAL_WEB_CATEGORIES);
  const [webSites, setWebSites] = useState<WebRuleSite[]>(INITIAL_WEB_SITES);
  const [webActivityLogs, setWebActivityLogs] = useState<WebActivityLog[]>(INITIAL_WEB_LOGS);

  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPreferences>({
    pushEnabled: true,
    emailSummaries: true,
    quietHoursEnabled: true,
    quietFrom: '22:30',
    quietUntil: '06:30',
    sosOverrideQuietHours: true,
    lowBatteryAlertThreshold: 20,
    newAppInstallAlerts: true,
    safeZoneAlerts: true,
  });

  const [familyMessages, setFamilyMessages] = useState<FamilyMessage[]>(INITIAL_MESSAGES);
  const [coGuardians, setCoGuardians] = useState<CoGuardian[]>(INITIAL_GUARDIANS);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([
    {
      id: 'TCK-1042',
      subject: 'Samsung A15 background sync setting question',
      category: 'permission_help',
      description: 'Resolved after setting Battery to Unrestricted.',
      status: 'resolved',
      createdAt: '16 Oct 2026',
    },
  ]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const selectedChild = childrenList.find((c) => c.id === selectedChildId) || childrenList[0];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Increment remote session timer when active
  useEffect(() => {
    if (remoteSession.status !== 'active') return;
    const interval = setInterval(() => {
      setRemoteSession((prev) => ({
        ...prev,
        durationSeconds: prev.durationSeconds + 1,
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [remoteSession.status]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const addToast = (title: string, description?: string, type: ToastMessage['type'] = 'info') => {
    const id = 'toast-' + Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 1. Account & Family Management
  const loginParent = (email: string) => {
    setParentUser((prev) => ({ ...prev, email, isAuthenticated: true }));
    addToast('Signed In', `Welcome back, ${email}`, 'success');
  };

  const registerParent = (name: string, email: string, phone: string) => {
    setParentUser((prev) => ({
      ...prev,
      name,
      email,
      phone,
      isAuthenticated: true,
    }));
    addToast('Account Created', `Verified parent account for ${name}.`, 'success');
  };

  const resetParentPassword = (email: string) => {
    addToast('Recovery Link Sent', `Password reset instructions sent to ${email}.`, 'info');
  };

  const logoutParent = () => {
    setParentUser((prev) => ({ ...prev, isAuthenticated: false }));
    addToast('Signed Out', 'Parent session ended.', 'info');
  };

  const updateParentProfile = (updates: Partial<ParentUser>) => {
    setParentUser((prev) => ({ ...prev, ...updates }));
    addToast('Profile Updated', 'Your parent account settings have been saved.', 'success');
  };

  const addChildProfile = (
    name: string,
    nickname: string,
    age: number,
    deviceModel: string,
    platform: 'android' | 'ios'
  ) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const ageBand = age <= 9 ? '6-9' : age <= 12 ? '10-12' : '13-17';
    const newChild: ChildProfile = {
      id: 'child-' + Date.now(),
      name,
      nickname: nickname || name,
      age,
      ageBand,
      avatarInitials: name.slice(0, 2).toUpperCase(),
      avatarColor: '#1C5A70',
      deviceModel,
      osVersion: platform === 'android' ? 'Android 15 (API 35)' : 'iOS 19.1',
      platform,
      battery: 88,
      isCharging: false,
      isOnline: true,
      isBound: true,
      pairingCode: code,
      lastSyncMinutesAgo: 1,
      dailyUsageMinutes: 15,
      dailyLimitMinutes: 90,
      currentDowntimeActive: false,
      weeklyUsageMinutes: [
        { dayEn: 'Sun', dayBn: 'রবি', minutes: 30 },
        { dayEn: 'Mon', dayBn: 'সোম', minutes: 40 },
        { dayEn: 'Tue', dayBn: 'মঙ্গল', minutes: 35 },
        { dayEn: 'Wed', dayBn: 'বুধ', minutes: 25 },
        { dayEn: 'Thu', dayBn: 'বৃহঃ', minutes: 45 },
        { dayEn: 'Fri', dayBn: 'শুক্র', minutes: 50 },
        { dayEn: 'Sat', dayBn: 'শনি', minutes: 15 },
      ],
      hourlyUsageToday: [{ hour: '14:00', minutes: 15 }],
      permissions: {
        usageAccess: true,
        location: true,
        notifications: true,
        accessibility: true,
        batteryUnrestricted: true,
      },
    };
    setChildrenList((prev) => [...prev, newChild]);
    setSelectedChildId(newChild.id);
    addToast('Child Profile Added', `${name} enrolled with pairing code ${code}.`, 'success');
  };

  const generateNewPairingCode = (childId: string) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setChildrenList((prev) =>
      prev.map((c) => (c.id === childId ? { ...c, pairingCode: code } : c))
    );
    addToast('Pairing Code Generated', `New 10-minute code: ${code}`, 'info');
    return code;
  };

  const bindChildDeviceWithCode = (code: string) => {
    const match = childrenList.find((c) => c.pairingCode === code.trim());
    if (match || code.trim().length === 6) {
      setChildrenList((prev) =>
        prev.map((c) =>
          c.id === (match?.id || selectedChild.id)
            ? { ...c, isBound: true, isOnline: true, lastSyncMinutesAgo: 0 }
            : c
        )
      );
      addToast('Device Bound Successfully', `Companion device linked to ${parentUser.name}'s family.`, 'success');
      return true;
    }
    addToast('Invalid Pairing Code', 'Please enter a valid 6-digit family enrollment code.', 'warning');
    return false;
  };

  const unbindChildDevice = (childId: string) => {
    setChildrenList((prev) =>
      prev.map((c) => (c.id === childId ? { ...c, isBound: false, isOnline: false } : c))
    );
    addToast('Device Unbound', 'Child companion device unlinked and credentials revoked.', 'warning');
  };

  const toggleChildOnlineStatus = (childId: string) => {
    setChildrenList((prev) =>
      prev.map((c) => {
        if (c.id !== childId) return c;
        const nextOnline = !c.isOnline;
        addToast(
          nextOnline ? `${c.name}'s Phone Online` : `${c.name}'s Phone Offline`,
          nextOnline ? 'Synced pending rules with device.' : 'Local rules remain active offline.',
          nextOnline ? 'success' : 'warning'
        );
        return { ...c, isOnline: nextOnline, lastSyncMinutesAgo: nextOnline ? 0 : 14 };
      })
    );
  };

  const updateChildBattery = (childId: string, battery: number) => {
    setChildrenList((prev) =>
      prev.map((c) => (c.id === childId ? { ...c, battery } : c))
    );
    if (battery <= notificationPrefs.lowBatteryAlertThreshold) {
      const lowBatAlert: AlertItem = {
        id: 'alert-bat-' + Date.now(),
        type: 'device',
        severity: 'warning',
        titleKey: `Low Battery Alert (${battery}%)`,
        descriptionKey: `${selectedChild.name}'s phone battery dropped to ${battery}%. Remind them to charge.`,
        timestamp: 'Just now',
        isRead: false,
        childId,
        actionRoute: 'home',
      };
      setAlerts((prev) => [lowBatAlert, ...prev]);
      addToast('Low Battery Alert', `${selectedChild.name}'s phone is at ${battery}% battery.`, 'warning');
    }
  };

  const toggleChildPermission = (childId: string, key: keyof ChildPermissionsState) => {
    setChildrenList((prev) =>
      prev.map((c) => {
        if (c.id !== childId) return c;
        const nextVal = !c.permissions[key];
        if (!nextVal) {
          const revAlert: AlertItem = {
            id: 'alert-perm-' + Date.now(),
            type: 'device',
            severity: 'warning',
            titleKey: `Permission Changed: ${key}`,
            descriptionKey: `${c.name}'s phone permission "${key}" was turned off. Tap to review device health.`,
            timestamp: 'Just now',
            isRead: false,
            childId,
            actionRoute: 'settings',
          };
          setAlerts((a) => [revAlert, ...a]);
        }
        return {
          ...c,
          permissions: {
            ...c.permissions,
            [key]: nextVal,
          },
        };
      })
    );
  };

  // 2 & 3. Rules & App Management
  const createOrUpdateRule = (ruleData: Partial<PolicyRule>) => {
    const nextVersion = policyVersion + 1;
    setPolicyVersion(nextVersion);

    const existingIndex = policyRules.findIndex((r) => r.id === ruleData.id);
    let updatedRules: PolicyRule[];

    if (existingIndex >= 0) {
      const updated = {
        ...policyRules[existingIndex],
        ...ruleData,
        version: nextVersion,
        status: 'pending_ack' as const,
        statusReason: 'Saved. Waiting for child device to confirm...',
      };
      updatedRules = [...policyRules];
      updatedRules[existingIndex] = updated;
    } else {
      const newRule: PolicyRule = {
        id: ruleData.id || 'rule-' + Date.now(),
        type: ruleData.type || 'daily_limit',
        titleKey: ruleData.titleKey || 'rules.dailyLimit',
        days: ruleData.days || [0, 1, 2, 3, 4, 5, 6],
        fromTime: ruleData.fromTime,
        untilTime: ruleData.untilTime,
        limitMinutes: ruleData.limitMinutes || 90,
        exemptions: ruleData.exemptions || ['Emergency (999)', 'Family Chat'],
        isActive: ruleData.isActive !== false,
        version: nextVersion,
        status: 'pending_ack',
        statusReason: 'Saved. Waiting for child device to confirm...',
      };
      updatedRules = [...policyRules, newRule];
    }

    setPolicyRules(updatedRules);
    addToast('Rule Saved', 'Waiting for device to acknowledge...', 'info');

    setTimeout(() => {
      setPolicyRules((currentRules) =>
        currentRules.map((r) =>
          r.version === nextVersion
            ? { ...r, status: 'applied', statusReason: `Applied on ${selectedChild.name}'s phone` }
            : r
        )
      );
      addToast('Device Synchronized', `Policy v${nextVersion} confirmed active on ${selectedChild.name}'s phone.`, 'success');
    }, 1500);
  };

  const deleteRule = (id: string) => {
    setPolicyRules((prev) => prev.filter((r) => r.id !== id));
    addToast('Rule Removed', 'Rule removed and sync queued for child phone.', 'info');
  };

  const updateAppStatus = (appId: string, status: InstalledApp['status']) => {
    setInstalledApps((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status, isNewInstall: false } : app))
    );
    const target = installedApps.find((a) => a.id === appId);
    if (target) {
      addToast(
        `App Policy Updated: ${target.name}`,
        `Set to "${status.replace('_', ' ')}" on ${selectedChild.name}'s phone.`,
        'success'
      );
    }
  };

  const updateAppLimit = (appId: string, limitMinutes: number | null, schedule?: string) => {
    setInstalledApps((prev) =>
      prev.map((app) =>
        app.id === appId
          ? {
              ...app,
              dailyLimitMinutes: limitMinutes,
              status: limitMinutes ? 'time_limited' : 'allowed',
              scheduledRestriction: schedule !== undefined ? schedule : app.scheduledRestriction,
            }
          : app
      )
    );
    addToast('App Limit Updated', 'Daily app time limit synced to child device.', 'success');
  };

  const simulateNewAppInstall = (appName: string, category: InstalledApp['category']) => {
    const newApp: InstalledApp = {
      id: 'app-' + Date.now(),
      childId: selectedChild.id,
      name: appName,
      packageName: `com.app.${appName.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      category,
      usedMinutesToday: 0,
      dailyLimitMinutes: 30,
      launchesToday: 1,
      status: 'pending_approval',
      installedAt: 'Just now',
      isNewInstall: true,
    };
    setInstalledApps((prev) => [newApp, ...prev]);

    const installAlert: AlertItem = {
      id: 'alert-inst-' + Date.now(),
      type: 'request',
      severity: 'info',
      titleKey: `New App Installed: ${appName}`,
      descriptionKey: `${selectedChild.name} installed "${appName}" (${category}). Approve or block access.`,
      timestamp: 'Just now',
      isRead: false,
      childId: selectedChild.id,
      actionRoute: 'apps',
    };
    setAlerts((prev) => [installAlert, ...prev]);
    addToast('New App Installed on Child Phone', `"${appName}" is paused awaiting parent approval.`, 'warning');
  };

  const requestAppAccessFromChild = (appId: string, reason: string) => {
    const app = installedApps.find((a) => a.id === appId);
    if (!app) return;
    const newReq: TimeExtensionRequest = {
      id: 'req-app-' + Date.now(),
      childId: selectedChild.id,
      childName: selectedChild.name,
      requestType: 'app_unblock',
      appName: app.name,
      requestedMinutes: 30,
      reason: reason || `Please allow me to use ${app.name} for 30 minutes`,
      requestedAt: 'Just now',
      status: 'pending',
    };
    setTimeRequests((prev) => [newReq, ...prev]);

    const reqAlert: AlertItem = {
      id: 'alert-appreq-' + Date.now(),
      type: 'request',
      severity: 'info',
      titleKey: `App Unlock Request: ${app.name}`,
      descriptionKey: `${selectedChild.name} asked to unlock ${app.name}: "${newReq.reason}"`,
      timestamp: 'Just now',
      isRead: false,
      childId: selectedChild.id,
      actionRoute: 'apps',
      metadata: { requestId: newReq.id, appId: app.id, minutes: 30 },
    };
    setAlerts((prev) => [reqAlert, ...prev]);
    addToast('App Access Requested', `Sent request for "${app.name}" to your parent.`, 'info');
  };

  // Time Request Loop
  const requestMoreTime = (minutes: number, reason: string) => {
    const newReq: TimeExtensionRequest = {
      id: 'req-' + Date.now(),
      childId: selectedChild.id,
      childName: selectedChild.name,
      requestType: 'screen_time',
      requestedMinutes: minutes,
      reason: reason || 'Working on school homework / playing with friends',
      requestedAt: 'Just now',
      status: 'pending',
    };
    setTimeRequests((prev) => [newReq, ...prev]);

    const newAlert: AlertItem = {
      id: 'alert-' + Date.now(),
      type: 'request',
      severity: 'info',
      titleKey: 'requests.moreTime',
      descriptionKey: `${selectedChild.name} requested ${minutes} more minutes.`,
      timestamp: 'Just now',
      isRead: false,
      childId: selectedChild.id,
      actionRoute: 'usage',
      metadata: { requestId: newReq.id, minutes, reason },
    };
    setAlerts((prev) => [newAlert, ...prev]);
    addToast('Request Sent to Parents', `Asked for ${minutes} more minutes.`, 'info');
  };

  const respondToTimeRequest = (requestId: string, approve: boolean) => {
    const target = timeRequests.find((r) => r.id === requestId);
    if (!target) return;

    setTimeRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status: approve ? 'approved' : 'declined',
              decidedAt: 'Just now',
              decidedBy: parentUser.name,
            }
          : r
      )
    );

    if (approve) {
      if (target.requestType === 'app_unblock' && target.appName) {
        setInstalledApps((prev) =>
          prev.map((a) => (a.name === target.appName ? { ...a, status: 'allowed', isNewInstall: false } : a))
        );
        addToast('App Access Approved', `Unlocked ${target.appName} for ${target.childName}.`, 'success');
      } else {
        setChildrenList((prev) =>
          prev.map((c) =>
            c.id === target.childId
              ? { ...c, dailyLimitMinutes: c.dailyLimitMinutes + target.requestedMinutes }
              : c
          )
        );
        addToast(
          'Time Extension Approved',
          `Granted ${target.requestedMinutes} extra minutes to ${target.childName}.`,
          'success'
        );
      }
    } else {
      addToast('Request Politely Declined', `Notified ${target.childName} that routine stays active.`, 'info');
    }
  };

  // 4. Location & Safe Zones
  const requestCheckInFromChild = () => {
    addToast('Check-in Requested', `Sent a gentle notification to ${selectedChild.name}'s phone.`, 'info');
  };

  const sendCheckInFromChild = (message?: string) => {
    const newCheckIn: CheckInEvent = {
      id: 'check-' + Date.now(),
      childId: selectedChild.id,
      childName: selectedChild.name,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: message || 'Feeling good and safe!',
      locationLabel: 'Banani, Dhaka',
      batteryAtCheckIn: selectedChild.battery,
    };
    setCheckInEvents((prev) => [newCheckIn, ...prev]);

    const checkInAlert: AlertItem = {
      id: 'alert-check-' + Date.now(),
      type: 'safety',
      severity: 'info',
      titleKey: 'checkin.received',
      descriptionKey: `${selectedChild.name} checked in: "${newCheckIn.message}"`,
      timestamp: 'Just now',
      isRead: false,
      childId: selectedChild.id,
      actionRoute: 'checkins',
    };
    setAlerts((prev) => [checkInAlert, ...prev]);
    addToast('Check-in Delivered', `Your family received: "${newCheckIn.message}"`, 'success');
  };

  const addSafeZone = (nameEn: string, nameBn: string, address: string, radiusMeters: number) => {
    const zone: SafeZone = {
      id: 'zone-' + Date.now(),
      childId: selectedChild.id,
      nameEn,
      nameBn: nameBn || nameEn,
      address,
      radiusMeters,
      notifyOnEntry: true,
      notifyOnExit: true,
      isActive: true,
      isChildInside: false,
    };
    setSafeZones((prev) => [...prev, zone]);
    addToast('Safe Zone Created', `Added "${nameEn}" (${radiusMeters}m geofence).`, 'success');
  };

  const toggleSafeZone = (zoneId: string) => {
    setSafeZones((prev) =>
      prev.map((z) => (z.id === zoneId ? { ...z, isActive: !z.isActive } : z))
    );
  };

  const deleteSafeZone = (zoneId: string) => {
    setSafeZones((prev) => prev.filter((z) => z.id !== zoneId));
    addToast('Safe Zone Removed', 'Geofence deleted.', 'info');
  };

  const simulateZoneTransition = (zoneId: string, eventType: 'entry' | 'exit') => {
    const zone = safeZones.find((z) => z.id === zoneId);
    if (!zone) return;

    setSafeZones((prev) =>
      prev.map((z) => (z.id === zoneId ? { ...z, isChildInside: eventType === 'entry' } : z))
    );

    const newPoint: LocationHistoryPoint = {
      id: 'loc-' + Date.now(),
      childId: selectedChild.id,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      placeNameEn: `${eventType === 'entry' ? 'Arrived at' : 'Left'} ${zone.nameEn}`,
      placeNameBn: `${zone.nameBn}-এ ${eventType === 'entry' ? 'আগমন' : 'প্রস্থান'}`,
      accuracyMeters: 15,
      eventType,
      batteryLevel: selectedChild.battery,
    };
    setLocationHistory((prev) => [newPoint, ...prev]);

    const zoneAlert: AlertItem = {
      id: 'alert-zone-' + Date.now(),
      type: 'safety',
      severity: 'info',
      titleKey: `Safe Zone ${eventType === 'entry' ? 'Arrival' : 'Departure'}: ${zone.nameEn}`,
      descriptionKey: `${selectedChild.name} ${eventType === 'entry' ? 'entered' : 'exited'} ${zone.nameEn} (${newPoint.time}).`,
      timestamp: 'Just now',
      isRead: false,
      childId: selectedChild.id,
      actionRoute: 'checkins',
    };
    setAlerts((prev) => [zoneAlert, ...prev]);
    addToast(
      `Geofence ${eventType === 'entry' ? 'Arrival' : 'Exit'} Alert`,
      `${selectedChild.name} ${eventType === 'entry' ? 'arrived at' : 'left'} ${zone.nameEn}.`,
      'success'
    );
  };

  const refreshChildLocation = () => {
    setChildrenList((prev) =>
      prev.map((c) => (c.id === selectedChild.id ? { ...c, lastSyncMinutesAgo: 0 } : c))
    );
    addToast('Location Refreshed', `Updated GPS fix for ${selectedChild.name} (±14m accuracy).`, 'success');
  };

  // SOS Loop
  const triggerSos = (emergencyNumber: string = '999') => {
    const sos: SOSEvent = {
      id: 'sos-' + Date.now(),
      childId: selectedChild.id,
      childName: selectedChild.name,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      status: 'active',
      accuracyRadiusMeters: 15,
      locationLabel: 'Near Banani Road 11, Dhaka',
      emergencyNumber,
    };
    setActiveSos(sos);

    const sosAlert: AlertItem = {
      id: 'alert-sos-' + Date.now(),
      type: 'safety',
      severity: 'urgent',
      titleKey: 'safety.sos',
      descriptionKey: `URGENT SOS triggered from ${selectedChild.name}'s phone. Tap to open emergency contacts.`,
      timestamp: 'Just now',
      isRead: false,
      childId: selectedChild.id,
      actionRoute: 'alerts',
    };
    setAlerts((prev) => [sosAlert, ...prev]);
    addToast('EMERGENCY SOS ACTIVE', 'Signal sent to all authorized guardians.', 'urgent');
  };

  const acknowledgeSos = () => {
    if (activeSos) {
      setActiveSos((prev) => (prev ? { ...prev, status: 'acknowledged' } : null));
      addToast('SOS Acknowledged', 'Recorded guardian acknowledgment. Child marked safe.', 'success');
      setTimeout(() => setActiveSos(null), 2500);
    }
  };

  const cancelSos = () => {
    setActiveSos(null);
    addToast('SOS Cancelled', 'Emergency signal cancelled by child as false alarm.', 'info');
  };

  // 5. Remote Monitoring Features (with explicit child consent)
  const startRemoteSessionRequest = (type: RemoteSession['type']) => {
    setRemoteSession({
      id: 'rem-' + Date.now(),
      childId: selectedChild.id,
      type,
      status: 'requesting_consent',
      durationSeconds: 0,
    });
    addToast(
      'Consent Prompt Sent to Child Phone',
      `Waiting for ${selectedChild.name} to accept ${type.replace(/_/g, ' ')} on their device...`,
      'info'
    );
  };

  const respondToRemoteConsentOnChild = (accept: boolean) => {
    if (accept) {
      setRemoteSession((prev) => ({
        ...prev,
        status: 'active',
        startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        durationSeconds: 1,
      }));
      addToast(
        'Live Safety Session Active',
        `${selectedChild.name} accepted the session. Active indicator is visible on both devices.`,
        'success'
      );
    } else {
      setRemoteSession((prev) => ({
        ...prev,
        status: 'ended_by_child',
        durationSeconds: 0,
      }));
      addToast('Session Declined by Child', `${selectedChild.name} chose not to start the live session right now.`, 'warning');
    }
  };

  const stopRemoteSession = (endedBy: 'parent' | 'child') => {
    if (remoteSession.status === 'active') {
      const mins = Math.floor(remoteSession.durationSeconds / 60);
      const secs = remoteSession.durationSeconds % 60;
      const newLog: RemoteMonitoringLog = {
        id: 'rlog-' + Date.now(),
        childId: selectedChild.id,
        type: remoteSession.type,
        guardianName: parentUser.name,
        timestamp: 'Just now',
        duration: `${mins}m ${secs}s`,
        childConsentVerified: true,
      };
      setRemoteLogs((prev) => [newLog, ...prev]);
    }
    setRemoteSession((prev) => ({
      ...prev,
      status: endedBy === 'child' ? 'ended_by_child' : 'idle',
      durationSeconds: 0,
    }));
    addToast('Remote Session Ended', `Live session closed by ${endedBy}. Audit log recorded.`, 'info');
  };

  // 6. Notifications & Social Safety (AI-assisted)
  const addKeywordToWatchlist = (word: string) => {
    const clean = word.trim().toLowerCase();
    if (clean && !keywordWatchlist.includes(clean)) {
      setKeywordWatchlist((prev) => [...prev, clean]);
      addToast('Keyword Added', `Monitoring opt-in notifications for "${clean}".`, 'success');
    }
  };

  const removeKeywordFromWatchlist = (word: string) => {
    setKeywordWatchlist((prev) => prev.filter((w) => w !== word));
  };

  const analyzeSocialMessageWithAI = async (
    appName: SocialNotificationItem['appName'],
    sender: string,
    snippet: string
  ) => {
    setIsAnalyzingSocial(true);
    try {
      const res = await fetch('/api/ai/analyze-safety', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: snippet,
          appName,
          childAge: selectedChild.age,
          language,
        }),
      });
      const data = await res.json();

      const matched = keywordWatchlist.find((kw) => snippet.toLowerCase().includes(kw));

      const item: SocialNotificationItem = {
        id: 'soc-' + Date.now(),
        childId: selectedChild.id,
        appName,
        sender: sender || 'Unknown Contact',
        snippet: redactOtpAndBanking ? data.redactedSnippet || snippet : snippet,
        timestamp: 'Just now',
        matchedKeyword: matched,
        riskLevel: data.riskLevel || 'low',
        riskCategory: data.riskCategory || data.category || 'safe',
        confidence: data.confidence || 90,
        aiExplanationEn: data.explanationEn || 'Analyzed by Sontan Rokkha Safety AI.',
        aiExplanationBn: data.explanationBn || 'সন্তান রক্ষা এআই দ্বারা বিশ্লেষণ করা হয়েছে।',
        conversationStarterEn: data.conversationStarterEn || 'Talk openly with your child.',
        conversationStarterBn: data.conversationStarterBn || 'সন্তানের সাথে খোলাখুলি কথা বলুন।',
        dismissed: false,
      };

      setSocialNotifications((prev) => [item, ...prev]);

      if (item.riskLevel === 'high' || item.riskLevel === 'medium') {
        const socAlert: AlertItem = {
          id: 'alert-soc-' + Date.now(),
          type: 'safety',
          severity: item.riskLevel === 'high' ? 'urgent' : 'warning',
          titleKey: `Social Safety Alert (${appName})`,
          descriptionKey: item.aiExplanationEn,
          timestamp: 'Just now',
          isRead: false,
          childId: selectedChild.id,
          actionRoute: 'social',
        };
        setAlerts((prev) => [socAlert, ...prev]);
        addToast(
          `AI Risk Alert: ${item.riskCategory.replace('_', ' ')}`,
          item.aiExplanationEn,
          item.riskLevel === 'high' ? 'urgent' : 'warning'
        );
      } else {
        addToast('Notification Scanned (Safe)', 'No harmful patterns detected.', 'success');
      }
    } catch (_e) {
      addToast('Analysis Error', 'Could not complete safety scan.', 'warning');
    } finally {
      setIsAnalyzingSocial(false);
    }
  };

  const dismissSocialNotification = (id: string) => {
    setSocialNotifications((prev) => prev.filter((n) => n.id !== id));
    addToast('Alert Dismissed', 'Notification removed from review queue.', 'info');
  };

  // 7. Web Safety & Content Filtering
  const toggleWebCategory = (id: string) => {
    setWebCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isBlocked: !c.isBlocked } : c))
    );
    addToast('Web Filter Updated', 'Category rule synced to child DNS filter.', 'success');
  };

  const addWebSiteRule = (domain: string, listType: 'allow' | 'block') => {
    const clean = domain
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/\/.*$/, '');
    if (!clean) return;
    const newSite: WebRuleSite = {
      id: 'site-' + Date.now(),
      domain: clean,
      listType,
      addedAt: 'Just now',
    };
    setWebSites((prev) => [newSite, ...prev]);
    addToast(
      listType === 'allow' ? 'Added to Allowlist' : 'Added to Blocklist',
      `${clean} is now ${listType === 'allow' ? 'always permitted' : 'blocked'}.`,
      'success'
    );
  };

  const removeWebSiteRule = (id: string) => {
    setWebSites((prev) => prev.filter((s) => s.id !== id));
  };

  const simulateChildWebsiteVisit = (domainInput: string) => {
    const clean = domainInput
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/\/.*$/, '');

    let action: 'allowed' | 'blocked' = 'allowed';
    let category = 'General Web';
    let reason = 'Permitted by family web policy';

    if (webFilterEnabled) {
      const explicitAllow = webSites.find((s) => s.listType === 'allow' && clean.includes(s.domain));
      const explicitBlock = webSites.find((s) => s.listType === 'block' && clean.includes(s.domain));

      if (explicitBlock) {
        action = 'blocked';
        category = 'Custom Blocklist';
        reason = `Domain "${explicitBlock.domain}" is on parent blocklist.`;
      } else if (explicitAllow) {
        action = 'allowed';
        category = 'Verified Allowlist';
        reason = `Domain "${explicitAllow.domain}" is on family allowlist.`;
      } else if (
        clean.includes('casino') ||
        clean.includes('bet') ||
        clean.includes('poker') ||
        clean.includes('adult') ||
        clean.includes('xxx') ||
        clean.includes('phish') ||
        clean.includes('hack') ||
        clean.includes('robux')
      ) {
        action = 'blocked';
        category = 'Restricted Category (Adult / Scam / Gambling)';
        reason = 'Automatically blocked by Sontan Rokkha Safe DNS Shield.';
      }
    }

    const logEntry: WebActivityLog = {
      id: 'wlog-' + Date.now(),
      childId: selectedChild.id,
      domain: clean,
      category,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action,
      browser: 'Chrome',
    };
    setWebActivityLogs((prev) => [logEntry, ...prev]);

    if (action === 'blocked') {
      const webAlert: AlertItem = {
        id: 'alert-web-' + Date.now(),
        type: 'safety',
        severity: 'warning',
        titleKey: `Blocked Suspicious Website: ${clean}`,
        descriptionKey: `${selectedChild.name}'s browser attempted to visit "${clean}" (${category}) — Blocked.`,
        timestamp: 'Just now',
        isRead: false,
        childId: selectedChild.id,
        actionRoute: 'web',
      };
      setAlerts((prev) => [webAlert, ...prev]);
      addToast('Website Blocked by Filter', `${clean} was blocked (${category}).`, 'warning');
    } else {
      addToast('Website Allowed', `${clean} loaded safely.`, 'success');
    }

    return { action, reason };
  };

  // 9. Alerts & Preferences
  const markAlertAsRead = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, isRead: true } : a)));
  };

  const clearAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const updateNotificationPrefs = (updates: Partial<NotificationPreferences>) => {
    setNotificationPrefs((prev) => ({ ...prev, ...updates }));
    addToast('Preferences Saved', 'Notification settings updated.', 'success');
  };

  // Family Chat & Guardians
  const sendMessage = (text: string, isChild: boolean) => {
    if (!text.trim()) return;
    const msg: FamilyMessage = {
      id: 'msg-' + Date.now(),
      senderId: isChild ? selectedChild.id : parentUser.id,
      senderName: isChild ? selectedChild.name : `${parentUser.name.split(' ')[0]} (Ammu)`,
      role: isChild ? 'child' : 'parent',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isChild,
    };
    setFamilyMessages((prev) => [...prev, msg]);
  };

  const inviteCoGuardian = (name: string, email: string, permissions: CoGuardian['permissions']) => {
    const newGuardian: CoGuardian = {
      id: 'guard-' + Date.now(),
      name,
      email,
      role: 'co_guardian',
      permissions,
      invitedAt: 'Today',
      status: 'invited',
    };
    setCoGuardians((prev) => [...prev, newGuardian]);
    addToast('Invitation Sent', `Invitation link sent to ${email} with role ${permissions}`, 'success');
  };

  const revokeCoGuardian = (id: string) => {
    setCoGuardians((prev) => prev.filter((g) => g.id !== id || g.role === 'primary'));
    addToast('Guardian Access Revoked', 'Co-guardian tokens invalidated immediately.', 'warning');
  };

  // 10. Subscription & Billing
  const upgradeSubscription = async (tier: 'free' | 'family_plus', cycle: 'monthly' | 'annual') => {
    try {
      const res = await fetch('/api/billing/validate-entitlement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId: tier, billingCycle: cycle }),
      });
      const data = await res.json();
      if (data.valid) {
        setParentUser((prev) => ({
          ...prev,
          subscriptionTier: tier,
          billingCycle: cycle,
        }));
        addToast(
          tier === 'family_plus' ? 'Family Plus Activated' : 'Switched to Free Tier',
          `Receipt verified (${data.receiptId}). Up to ${data.maxChildren} children supported.`,
          'success'
        );
      }
    } catch (_e) {
      setParentUser((prev) => ({
        ...prev,
        subscriptionTier: tier,
        billingCycle: cycle,
      }));
      addToast('Subscription Updated', `Plan set to ${tier} (${cycle}).`, 'success');
    }
  };

  const restorePurchases = () => {
    setParentUser((prev) => ({
      ...prev,
      subscriptionTier: 'family_plus',
      billingCycle: 'annual',
    }));
    addToast('Purchases Restored', 'Google Play Billing entitlement restored for Family Plus.', 'success');
  };

  // 11 & 12. Support Tickets & Data Governance
  const createSupportTicket = (
    subject: string,
    category: SupportTicket['category'],
    description: string
  ) => {
    const tck: SupportTicket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject,
      category,
      description,
      status: 'open',
      createdAt: 'Just now',
    };
    setSupportTickets((prev) => [tck, ...prev]);
    addToast('Support Ticket Created', `Ticket ${tck.id} logged with masked identifiers.`, 'success');
  };

  const exportFamilyData = () => {
    const exportPayload = {
      familyHousehold: `${parentUser.name} Family`,
      exportedAt: new Date().toISOString(),
      governancePromise: 'Zero advertising, no data sale, 30-day auto-pruning',
      parentAccount: parentUser,
      children: childrenList,
      policies: policyRules,
      installedApps,
      safeZones,
      recentCheckins: checkInEvents,
      coGuardians,
      deviceHealth: INITIAL_CAPABILITIES,
    };
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Sontan_Rokkha_Family_Export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast('Data Exported', 'Sanitized family data JSON file generated and downloaded.', 'success');
  };

  const deleteFamilyData = () => {
    setCheckInEvents([]);
    setTimeRequests([]);
    setAlerts([]);
    setFamilyMessages([]);
    setWebActivityLogs([]);
    setSocialNotifications([]);
    addToast('Data Deleted', 'All non-essential family history, requests, and logs pruned.', 'info');
  };

  const accessAuditLogs: AccessAuditLog[] = [
    {
      id: 'log-1',
      guardianName: 'Maya Rahman (Primary)',
      guardianRole: 'Primary Parent',
      targetChildName: 'Ayan',
      action: 'Viewed Screen Time & App Summary',
      timestamp: 'Today, 2:40 PM',
      dataCategory: 'Aggregate Usage Minutes',
    },
    {
      id: 'log-2',
      guardianName: 'Tariq Rahman (Co-Guardian)',
      guardianRole: 'Co-Guardian',
      targetChildName: 'Ayan',
      action: 'Acknowledged Check-in Receipt',
      timestamp: 'Today, 4:13 PM',
      dataCategory: 'Check-in Message',
    },
    {
      id: 'log-3',
      guardianName: 'System Retention Service',
      guardianRole: 'Automated Worker',
      targetChildName: 'All Children',
      action: 'Auto-pruned raw notification buffers (>48h)',
      timestamp: 'Today, 12:00 AM',
      dataCategory: 'Notification Risk Scanner',
    },
  ];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        isDarkMode,
        toggleDarkMode,
        textScale,
        setTextScale,
        viewMode,
        setViewMode,
        activeParentTab,
        setActiveParentTab,
        parentUser,
        loginParent,
        registerParent,
        resetParentPassword,
        logoutParent,
        updateParentProfile,
        childrenList,
        selectedChildId,
        setSelectedChildId,
        selectedChild,
        addChildProfile,
        generateNewPairingCode,
        bindChildDeviceWithCode,
        unbindChildDevice,
        toggleChildOnlineStatus,
        updateChildBattery,
        toggleChildPermission,
        policyRules,
        policyVersion,
        createOrUpdateRule,
        deleteRule,
        installedApps,
        updateAppStatus,
        updateAppLimit,
        simulateNewAppInstall,
        requestAppAccessFromChild,
        timeRequests,
        requestMoreTime,
        respondToTimeRequest,
        checkInEvents,
        requestCheckInFromChild,
        sendCheckInFromChild,
        activeSos,
        triggerSos,
        acknowledgeSos,
        cancelSos,
        safeZones,
        locationHistory,
        addSafeZone,
        toggleSafeZone,
        deleteSafeZone,
        simulateZoneTransition,
        refreshChildLocation,
        remoteSession,
        remoteLogs,
        startRemoteSessionRequest,
        respondToRemoteConsentOnChild,
        stopRemoteSession,
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
        alerts,
        markAlertAsRead,
        clearAlert,
        notificationPrefs,
        updateNotificationPrefs,
        familyMessages,
        sendMessage,
        coGuardians,
        inviteCoGuardian,
        revokeCoGuardian,
        upgradeSubscription,
        restorePurchases,
        accessAuditLogs,
        deviceCapabilities: INITIAL_CAPABILITIES,
        supportTickets,
        createSupportTicket,
        exportFamilyData,
        deleteFamilyData,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

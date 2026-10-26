export type Language = 'en' | 'bn';

export type ViewMode = 'dual' | 'parent' | 'child' | 'docs' | 'checklist';

export type TextScale = 'normal' | 'large_200';

export type ParentTab =
  | 'home'
  | 'usage'
  | 'apps'
  | 'checkins'
  | 'remote'
  | 'social'
  | 'web'
  | 'alerts'
  | 'family'
  | 'settings';

export interface ParentUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  isAuthenticated: boolean;
  mfaEnabled: boolean;
  subscriptionTier: 'free' | 'family_plus';
  billingCycle: 'monthly' | 'annual';
  trialDaysLeft: number;
  subscriptionRenewsAt: string;
}

export interface ChildPermissionsState {
  usageAccess: boolean;
  location: boolean;
  notifications: boolean;
  accessibility: boolean;
  batteryUnrestricted: boolean;
}

export interface ChildProfile {
  id: string;
  name: string;
  nickname: string;
  age: number;
  ageBand: '6-9' | '10-12' | '13-17';
  avatarInitials: string;
  avatarColor: string;
  deviceModel: string;
  osVersion: string;
  platform: 'android' | 'ios';
  battery: number;
  isCharging: boolean;
  isOnline: boolean;
  isBound: boolean;
  pairingCode: string;
  lastSyncMinutesAgo: number;
  dailyUsageMinutes: number;
  dailyLimitMinutes: number;
  currentDowntimeActive: boolean;
  weeklyUsageMinutes: { dayEn: string; dayBn: string; minutes: number }[];
  hourlyUsageToday: { hour: string; minutes: number }[];
  permissions: ChildPermissionsState;
}

export interface InstalledApp {
  id: string;
  childId: string;
  name: string;
  packageName: string;
  category: 'Education' | 'Entertainment' | 'Games' | 'Social' | 'Browser' | 'System';
  usedMinutesToday: number;
  dailyLimitMinutes: number | null;
  launchesToday: number;
  status: 'allowed' | 'blocked' | 'time_limited' | 'pending_approval';
  installedAt: string;
  isNewInstall?: boolean;
  scheduledRestriction?: string;
}

export interface SafeZone {
  id: string;
  childId: string;
  nameEn: string;
  nameBn: string;
  address: string;
  radiusMeters: number;
  notifyOnEntry: boolean;
  notifyOnExit: boolean;
  isActive: boolean;
  isChildInside: boolean;
}

export interface LocationHistoryPoint {
  id: string;
  childId: string;
  time: string;
  placeNameEn: string;
  placeNameBn: string;
  accuracyMeters: number;
  eventType: 'entry' | 'exit' | 'checkpoint';
  batteryLevel: number;
}

export interface RemoteSession {
  id: string;
  childId: string;
  type: 'screen_mirror' | 'safety_camera' | 'one_way_audio';
  status: 'idle' | 'requesting_consent' | 'active' | 'ended_by_child' | 'interrupted';
  startedAt?: string;
  durationSeconds: number;
}

export interface RemoteMonitoringLog {
  id: string;
  childId: string;
  type: 'screen_mirror' | 'safety_camera' | 'one_way_audio';
  guardianName: string;
  timestamp: string;
  duration: string;
  childConsentVerified: boolean;
}

export interface SocialNotificationItem {
  id: string;
  childId: string;
  appName: 'WhatsApp' | 'Messenger Kids' | 'YouTube' | 'Instagram Teen' | 'Discord';
  sender: string;
  snippet: string;
  timestamp: string;
  matchedKeyword?: string;
  riskLevel: 'safe' | 'low' | 'medium' | 'high';
  riskCategory: 'cyberbullying' | 'scam_phishing' | 'stranger_contact' | 'harmful_content' | 'safe';
  confidence: number;
  aiExplanationEn: string;
  aiExplanationBn: string;
  conversationStarterEn: string;
  conversationStarterBn: string;
  dismissed: boolean;
}

export interface WebCategoryFilter {
  id: string;
  nameEn: string;
  nameBn: string;
  category: 'adult' | 'gambling' | 'violence' | 'social' | 'gaming' | 'malware';
  isBlocked: boolean;
}

export interface WebRuleSite {
  id: string;
  domain: string;
  listType: 'allow' | 'block';
  addedAt: string;
}

export interface WebActivityLog {
  id: string;
  childId: string;
  domain: string;
  category: string;
  timestamp: string;
  action: 'allowed' | 'blocked';
  browser: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: 'permission_help' | 'billing' | 'bug_report' | 'feature_request';
  description: string;
  status: 'open' | 'resolved';
  createdAt: string;
}

export interface NotificationPreferences {
  pushEnabled: boolean;
  emailSummaries: boolean;
  quietHoursEnabled: boolean;
  quietFrom: string;
  quietUntil: string;
  sosOverrideQuietHours: boolean;
  lowBatteryAlertThreshold: number;
  newAppInstallAlerts: boolean;
  safeZoneAlerts: boolean;
}

export interface DeviceCapability {
  id: string;
  titleKey: string;
  status: 'granted' | 'needs_action' | 'unsupported' | 'review_blocked';
  descriptionKey: string;
  riskNoticeKey: string;
  platform: 'android' | 'ios' | 'both';
  requiredPermission: string;
}

export interface PolicyRule {
  id: string;
  type: 'bedtime' | 'daily_limit' | 'school_focus' | 'app_limit';
  titleKey: string;
  days: number[];
  fromTime?: string;
  untilTime?: string;
  limitMinutes?: number;
  exemptions: string[];
  isActive: boolean;
  version: number;
  status: 'applied' | 'pending_ack' | 'partial' | 'failed';
  statusReason?: string;
}

export interface TimeExtensionRequest {
  id: string;
  childId: string;
  childName: string;
  requestType?: 'screen_time' | 'app_unblock';
  appName?: string;
  requestedMinutes: number;
  reason: string;
  requestedAt: string;
  status: 'pending' | 'approved' | 'declined' | 'expired';
  decidedAt?: string;
  decidedBy?: string;
}

export interface CheckInEvent {
  id: string;
  childId: string;
  childName: string;
  timestamp: string;
  message: string;
  locationLabel?: string;
  batteryAtCheckIn: number;
  isSos?: boolean;
}

export interface SOSEvent {
  id: string;
  childId: string;
  childName: string;
  timestamp: string;
  status: 'active' | 'acknowledged' | 'cancelled';
  accuracyRadiusMeters: number;
  locationLabel: string;
  emergencyNumber: string;
}

export interface AlertItem {
  id: string;
  type: 'safety' | 'request' | 'device';
  severity: 'urgent' | 'warning' | 'info';
  titleKey: string;
  descriptionKey: string;
  timestamp: string;
  isRead: boolean;
  childId: string;
  actionRoute?: ParentTab;
  metadata?: Record<string, any>;
}

export interface FamilyMessage {
  id: string;
  senderId: string;
  senderName: string;
  role: 'parent' | 'child' | 'co_guardian';
  text: string;
  timestamp: string;
  isChild: boolean;
}

export interface CoGuardian {
  id: string;
  name: string;
  email: string;
  role: 'primary' | 'co_guardian';
  permissions: 'view_activity' | 'manage_rules' | 'view_checkins' | 'emergency_only';
  invitedAt: string;
  status: 'active' | 'invited';
}

export interface AccessAuditLog {
  id: string;
  guardianName: string;
  guardianRole: string;
  targetChildName: string;
  action: string;
  timestamp: string;
  dataCategory: string;
}

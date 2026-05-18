// SCREEN_STRUCTURE.md 기준 화면 route 이름

export const ROUTES = {
  // ── Auth / Onboarding ──────────────────────
  SPLASH: 'SplashScreen',
  LOGIN: 'LoginScreen',
  SIGN_UP: 'SignUpScreen',
  PERMISSION_GUIDE: 'PermissionGuideScreen',

  // ── Main Tab ───────────────────────────────
  MAIN_TAB: 'MainTab',
  HOME_TAB: 'HomeTab',
  SEARCH_TAB: 'SearchTab',
  PARKING_TAB: 'ParkingTab',
  PROVIDER_TAB: 'ProviderTab',
  MY_PAGE_TAB: 'MyPageTab',

  // ── Home Stack (U-01, U-02) ────────────────
  HOME_MAP: 'HomeMapScreen',
  PARKING_LIST: 'ParkingListScreen',

  // ── Search Stack (U-03, U-04) ──────────────
  DESTINATION_SEARCH: 'DestinationSearchScreen',
  RECOMMENDED_PARKING: 'RecommendedParkingScreen',

  // ── Parking Stack (U-05 ~ U-13) ───────────
  PARKING_DETAIL: 'ParkingDetailScreen',
  ROUTE_GUIDE: 'RouteGuideScreen',
  SOON_AVAILABLE: 'SoonAvailableScreen',
  PARKING_SESSION_START: 'ParkingSessionStartScreen',
  ACTIVE_PARKING_SESSION: 'ActiveParkingSessionScreen',
  PARKING_SESSION_END: 'ParkingSessionEndScreen',
  PAYMENT: 'PaymentScreen',
  PAYMENT_RESULT: 'PaymentResultScreen',
  PARKING_HISTORY: 'ParkingHistoryScreen',

  // ── Provider Stack (P-01 ~ P-11) ──────────
  PROVIDER_HOME: 'ProviderHomeScreen',
  PROVIDER_REGISTER: 'ProviderRegisterScreen',
  PARKING_LOT_CREATE: 'ParkingLotCreateScreen',
  PARKING_LOCATION_SELECT: 'ParkingLocationSelectScreen',
  PARKING_PHOTO_UPLOAD: 'ParkingPhotoUploadScreen',
  AVAILABILITY_SETTING: 'AvailabilitySettingScreen',
  PRICE_POLICY_SETTING: 'PricePolicySettingScreen',
  PARKING_LOT_PREVIEW: 'ParkingLotPreviewScreen',
  APPROVAL_STATUS: 'ApprovalStatusScreen',
  PROVIDER_USAGE_HISTORY: 'ProviderUsageHistoryScreen',
  SETTLEMENT: 'SettlementScreen',

  // ── MyPage Stack ───────────────────────────
  MY_PAGE: 'MyPageScreen',
  NOTIFICATION: 'NotificationScreen',

  // ── Modal Stack ────────────────────────────
  LOCATION_PERMISSION_MODAL: 'LocationPermissionModal',
  PARKING_FILTER_MODAL: 'ParkingFilterModal',
  SORT_OPTION_MODAL: 'SortOptionModal',
  EXPECTED_EXIT_TIME_MODAL: 'ExpectedExitTimeModal',
  NFC_SCAN_MODAL: 'NfcScanModal',
  PAYMENT_CONFIRM_MODAL: 'PaymentConfirmModal',
  REPORT_MODAL: 'ReportModal',
  ERROR_MODAL: 'ErrorModal',

  // ── Common ─────────────────────────────────
  ERROR: 'ErrorScreen',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RouteName = (typeof ROUTES)[RouteKey];

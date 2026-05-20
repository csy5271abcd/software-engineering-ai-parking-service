import type {NavigatorScreenParams} from '@react-navigation/native';

export type HomeStackParamList = {
  HomeMapScreen: undefined;
  DestinationSearchScreen: undefined;
  RecommendedParkingScreen: {destinationName: string; destinationSub?: string};
  ParkingDetailScreen: {parkingLotId: string};
  RouteScreen: {parkingLotId: string};
  ActiveSessionScreen: {parkingLotId: string; startedAt: string};
  PaymentScreen: {
    parkingLotId: string;
    startedAt: string;
    endedAt: string;
    durationMinutes: number;
    finalAmount: number;
  };
  PaymentResultScreen: {
    parkingLotId: string;
    startedAt: string;
    endedAt: string;
    durationMinutes: number;
    finalAmount: number;
    paymentMethod: string;
  };
};

export type SearchStackParamList = {
  SavedParkingScreen: undefined;
  DestinationSearchScreen: undefined;
  RecommendedParkingScreen: {
    destinationName: string;
    destinationSub?: string;
  };
  ParkingDetailScreen: {parkingLotId: string};
  SoonAvailableScreen: undefined;
  RouteScreen: {parkingLotId: string};
  ActiveSessionScreen: {parkingLotId: string; startedAt: string};
  PaymentScreen: {
    parkingLotId: string;
    startedAt: string;
    endedAt: string;
    durationMinutes: number;
    finalAmount: number;
  };
  PaymentResultScreen: {
    parkingLotId: string;
    startedAt: string;
    endedAt: string;
    durationMinutes: number;
    finalAmount: number;
    paymentMethod: string;
  };
};

export type ParkingStackParamList = {
  UsedHistoryScreen: undefined;
  ParkingListScreen: undefined;
  ParkingDetailScreen: {parkingLotId: string};
  SoonAvailableScreen: undefined;
  RouteScreen: {parkingLotId: string};
  ActiveSessionScreen: {parkingLotId: string; startedAt: string};
  PaymentScreen: {
    parkingLotId: string;
    startedAt: string;
    endedAt: string;
    durationMinutes: number;
    finalAmount: number;
  };
  PaymentResultScreen: {
    parkingLotId: string;
    startedAt: string;
    endedAt: string;
    durationMinutes: number;
    finalAmount: number;
    paymentMethod: string;
  };
};

export type ProviderStackParamList = {
  ProviderHomeScreen: undefined;
};

export type RecommendStackParamList = {
  RecommendationScreen: undefined;
  ParkingDetailScreen: {parkingLotId: string};
  RouteScreen: {parkingLotId: string};
  ActiveSessionScreen: {parkingLotId: string; startedAt: string};
  PaymentScreen: {
    parkingLotId: string;
    startedAt: string;
    endedAt: string;
    durationMinutes: number;
    finalAmount: number;
  };
  PaymentResultScreen: {
    parkingLotId: string;
    startedAt: string;
    endedAt: string;
    durationMinutes: number;
    finalAmount: number;
    paymentMethod: string;
  };
};

export type MyPageStackParamList = {
  MyPageScreen: undefined;
  ProviderDashboardScreen: undefined;
  ProviderRegisterWizardScreen: undefined;
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  SearchTab: NavigatorScreenParams<SearchStackParamList>;
  ParkingTab: NavigatorScreenParams<ParkingStackParamList>;
  RecommendTab: NavigatorScreenParams<RecommendStackParamList>;
  MyPageTab: NavigatorScreenParams<MyPageStackParamList>;
};

export type RootStackParamList = {
  SplashScreen: undefined;
  PermissionGuideScreen: undefined;
  MainTab: NavigatorScreenParams<MainTabParamList>;
};

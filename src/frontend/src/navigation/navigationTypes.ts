import type {NavigatorScreenParams} from '@react-navigation/native';

export type HomeStackParamList = {
  HomeMapScreen: undefined;
  DestinationSearchScreen: undefined;
  RecommendedParkingScreen: {destinationName: string; destinationSub?: string};
  ParkingDetailScreen: {parkingLotId: string};
  RouteScreen: {parkingLotId: string};
  ActiveSessionScreen: {parkingLotId: string};
  PaymentScreen: {parkingLotId: string};
  PaymentResultScreen: {parkingLotId: string};
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
  ActiveSessionScreen: {parkingLotId: string};
  PaymentScreen: {parkingLotId: string};
  PaymentResultScreen: {parkingLotId: string};
};

export type ParkingStackParamList = {
  UsedHistoryScreen: undefined;
  ParkingListScreen: undefined;
  ParkingDetailScreen: {parkingLotId: string};
  SoonAvailableScreen: undefined;
  RouteScreen: {parkingLotId: string};
  ActiveSessionScreen: {parkingLotId: string};
  PaymentScreen: {parkingLotId: string};
  PaymentResultScreen: {parkingLotId: string};
};

export type ProviderStackParamList = {
  ProviderHomeScreen: undefined;
};

export type RecommendStackParamList = {
  RecommendationScreen: undefined;
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

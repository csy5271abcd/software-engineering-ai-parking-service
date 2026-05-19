import type {NavigatorScreenParams} from '@react-navigation/native';

export type HomeStackParamList = {
  HomeMapScreen: undefined;
  ParkingDetailScreen: {parkingLotId: string};
};

export type SearchStackParamList = {
  DestinationSearchScreen: undefined;
  RecommendedParkingScreen: {
    destinationName: string;
    destinationSub?: string;
  };
};

export type ParkingStackParamList = {
  ParkingListScreen: undefined;
  ParkingDetailScreen: {parkingLotId: string};
  SoonAvailableScreen: undefined;
};

export type ProviderStackParamList = {
  ProviderHomeScreen: undefined;
};

export type RecommendStackParamList = {
  RecommendationScreen: undefined;
};

export type MyPageStackParamList = {
  MyPageScreen: undefined;
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

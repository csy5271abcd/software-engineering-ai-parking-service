export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface AddressInfo {
  roadAddress: string;
  jibunAddress?: string;
  detailAddress?: string;
  postalCode?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errorCode?: string;
}

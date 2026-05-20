import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  NaverMapMarkerOverlay,
  NaverMapView,
  type NaverMapViewRef,
} from '@mj-studio/react-native-naver-map';
import {PARKING_STATUS} from '../../constants/status';
import type {ParkingStatus} from '../../constants/status';
import type {ParkingLotDetail} from '../../types/parking';

// ── 위치 상수 ─────────────────────────────────────────────────────────────────
// 성수역 기준 mock 현재 위치
const MOCK_LOCATION = {latitude: 37.5444, longitude: 127.0567};
const INITIAL_ZOOM = 13;
const INITIAL_CAMERA = {
  latitude: MOCK_LOCATION.latitude,
  longitude: MOCK_LOCATION.longitude,
  zoom: INITIAL_ZOOM,
};

// ── 마커 색상 ─────────────────────────────────────────────────────────────────
type MarkerColor = {bg: string; border: string};

const STATUS_COLOR: Record<string, MarkerColor> = {
  [PARKING_STATUS.AVAILABLE]:      {bg: '#03AA5A', border: '#028F4B'},
  [PARKING_STATUS.SOON_AVAILABLE]: {bg: '#006CFF', border: '#0055CC'},
  [PARKING_STATUS.OCCUPIED]:       {bg: '#F5683C', border: '#D44E2A'},
  [PARKING_STATUS.FULL]:           {bg: '#FB5852', border: '#D43E38'},
  [PARKING_STATUS.INACTIVE]:       {bg: '#8B99AC', border: '#6B7C92'},
};

function getColor(status: ParkingStatus): MarkerColor {
  return STATUS_COLOR[status] ?? {bg: '#8B99AC', border: '#6B7C92'};
}

// ── 마커 크기 ─────────────────────────────────────────────────────────────────
const MARKER_SIZE = 40;
const MARKER_SIZE_SELECTED = 50;

// ── Public types ──────────────────────────────────────────────────────────────

export type SmartNaverMapViewRef = {
  moveToCurrentLocation: () => void;
};

type Props = {
  parkingLots: readonly ParkingLotDetail[];
  selectedParkingLotId?: string | null;
  onPressParkingLot: (parkingLotId: string) => void;
  onMapReady?: () => void;
};

// ── Component ─────────────────────────────────────────────────────────────────

export const SmartNaverMapView = forwardRef<SmartNaverMapViewRef, Props>(
  ({parkingLots, selectedParkingLotId, onPressParkingLot, onMapReady}, ref) => {
    const mapRef = useRef<NaverMapViewRef>(null);

    useImperativeHandle(ref, () => ({
      moveToCurrentLocation: () => {
        mapRef.current?.animateCameraTo({
          latitude: MOCK_LOCATION.latitude,
          longitude: MOCK_LOCATION.longitude,
          zoom: INITIAL_ZOOM,
          duration: 500,
        });
      },
    }));

    return (
      <NaverMapView
        ref={mapRef}
        style={styles.map}
        initialCamera={INITIAL_CAMERA}
        locationOverlay={{
          isVisible: true,
          position: MOCK_LOCATION,
        }}
        isShowCompass={false}
        isShowScaleBar={false}
        isShowZoomControls={false}
        isShowLocationButton={false}
        onInitialized={onMapReady}
      >
        {parkingLots.map(lot => {
          const isSelected = selectedParkingLotId === lot.id;
          const soonMin =
            lot.status === PARKING_STATUS.SOON_AVAILABLE && lot.expectedExitAt
              ? Math.max(
                  1,
                  Math.round(
                    (new Date(lot.expectedExitAt).getTime() - Date.now()) / 60000,
                  ),
                )
              : null;
          const isShared = lot.type === 'PRIVATE';
          const markerSize = isSelected ? MARKER_SIZE_SELECTED : MARKER_SIZE;
          const color = getColor(lot.status);
          // key 변경 시 native View가 재생성되어 마커 이미지를 다시 캡처함
          const viewKey = `${lot.id}/${isSelected}/${soonMin}/${lot.status}`;

          return (
            <NaverMapMarkerOverlay
              key={lot.id}
              latitude={lot.coordinates.latitude}
              longitude={lot.coordinates.longitude}
              onTap={() => onPressParkingLot(lot.id)}
              width={markerSize}
              height={markerSize}
              anchor={{x: 0.5, y: 0.5}}
              zIndex={isSelected ? 100 : 10}
            >
              <View
                key={viewKey}
                collapsable={false}
                style={[
                  styles.markerCircle,
                  {
                    width: markerSize,
                    height: markerSize,
                    borderRadius: markerSize / 2,
                    backgroundColor: color.bg,
                    borderColor: isSelected ? '#FFFFFF' : color.border,
                    borderWidth: isSelected ? 3 : 1.5,
                  },
                ]}
              >
                <Text style={styles.markerIcon}>{isShared ? '🏠' : 'P'}</Text>
                {soonMin !== null && (
                  <Text style={styles.soonText}>{soonMin}분</Text>
                )}
              </View>
            </NaverMapMarkerOverlay>
          );
        })}
      </NaverMapView>
    );
  },
);

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  map: {flex: 1},
  markerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerIcon: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    includeFontPadding: false,
    lineHeight: 17,
  },
  soonText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#FFFFFF',
    includeFontPadding: false,
    lineHeight: 10,
  },
});

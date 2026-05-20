import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  NaverMapMarkerOverlay,
  NaverMapView,
  type NaverMapViewRef,
} from '@mj-studio/react-native-naver-map';
import {PARKING_STATUS} from '../../constants/status';
import {
  ICON_SIZE,
  ICON_SIZE_SEL,
  OVERLAY_H,
  OVERLAY_H_SEL,
  OVERLAY_W_COMPACT,
  OVERLAY_W_COMPACT_SEL,
  OVERLAY_W_LABEL,
  OVERLAY_W_LABEL_SEL,
  PILL_H,
  PILL_H_SEL,
  TAIL_H,
  TAIL_H_SEL,
  TAIL_W,
  TAIL_W_SEL,
  getMarkerVisual,
} from '../../constants/mapMarker';

const CHIP_BG = '#FFFFFF';
import {AppIcon} from '../common/AppIcon';
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

// ── Individual lot marker (pill/badge) ───────────────────────────────────────

type LotMarkerProps = {
  lot: ParkingLotDetail;
  isSelected: boolean;
  onPress: (id: string) => void;
};

const LotMarker = React.memo(function LotMarker({
  lot,
  isSelected,
  onPress,
}: LotMarkerProps) {
  const isShared = lot.type === 'PRIVATE';
  const visual = getMarkerVisual(lot.status, isShared);
  const hasLabel = visual.label !== null;

  const pillH = isSelected ? PILL_H_SEL : PILL_H;
  const iconSz = isSelected ? ICON_SIZE_SEL : ICON_SIZE;
  const tailH = isSelected ? TAIL_H_SEL : TAIL_H;
  const tailW = isSelected ? TAIL_W_SEL : TAIL_W;
  const overlayW = isSelected
    ? hasLabel ? OVERLAY_W_LABEL_SEL : OVERLAY_W_COMPACT_SEL
    : hasLabel ? OVERLAY_W_LABEL : OVERLAY_W_COMPACT;
  const overlayH = isSelected ? OVERLAY_H_SEL : OVERLAY_H;
  // key change forces native view remount so the marker image is re-captured
  const viewKey = `${lot.id}/${isSelected}/${lot.status}`;
  const handleTap = useCallback(() => onPress(lot.id), [lot.id, onPress]);

  return (
    <NaverMapMarkerOverlay
      latitude={lot.coordinates.latitude}
      longitude={lot.coordinates.longitude}
      onTap={handleTap}
      width={overlayW}
      height={overlayH}
      anchor={{x: 0.5, y: 1.0}}
      zIndex={isSelected ? 100 : 10}
    >
      <View key={viewKey} collapsable={false} style={styles.markerRoot}>
        {/* Pill */}
        <View
          style={[
            styles.pill,
            {
              height: pillH,
              backgroundColor: CHIP_BG,
              borderColor: visual.color,
              borderWidth: isSelected ? 2.5 : 1.5,
            },
            isSelected && styles.pillSelected,
          ]}
        >
          <AppIcon
            name={visual.icon}
            size={iconSz}
            color={visual.color}
            strokeWidth={2.5}
          />
          {hasLabel && (
            <Text
              style={[
                styles.pillText,
                {fontSize: isSelected ? 12 : 11, color: visual.color},
              ]}
            >
              {visual.label}
            </Text>
          )}
        </View>

        {/* Tail triangle */}
        <View
          style={[
            styles.tail,
            {
              borderLeftWidth: tailW / 2,
              borderRightWidth: tailW / 2,
              borderTopWidth: tailH,
              borderTopColor: visual.color,
            },
          ]}
        />
      </View>
    </NaverMapMarkerOverlay>
  );
});

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
        {parkingLots.map(lot => (
          <LotMarker
            key={lot.id}
            lot={lot}
            isSelected={selectedParkingLotId === lot.id}
            onPress={onPressParkingLot}
          />
        ))}
      </NaverMapView>
    );
  },
);

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  map: {flex: 1},
  markerRoot: {
    alignItems: 'center',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    paddingHorizontal: 8,
    gap: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.18,
    shadowRadius: 3,
  },
  pillSelected: {
    elevation: 8,
    shadowOpacity: 0.32,
    shadowRadius: 6,
  },
  pillText: {
    fontWeight: '700',
    includeFontPadding: false,
    lineHeight: 16,
  },
  tail: {
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: 2,
  },
});

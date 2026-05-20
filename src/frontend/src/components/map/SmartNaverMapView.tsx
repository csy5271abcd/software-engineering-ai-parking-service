import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {
  NaverMapMarkerOverlay,
  NaverMapView,
  type NaverMapViewRef,
} from '@mj-studio/react-native-naver-map';
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
  TAIL_BASE_W,
  TAIL_BASE_W_SEL,
  TAIL_H,
  TAIL_H_SEL,
  getMarkerVisual,
} from '../../constants/mapMarker';
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

// ── Callout bubble SVG background ────────────────────────────────────────────
// Draws a single seamless speech-bubble outline: rounded pill + teardrop tail.

type CalloutBubbleProps = {
  width: number;
  height: number;
  pillH: number;
  tailH: number;
  tailBaseW: number;
  color: string;
  strokeWidth: number;
};

function CalloutBubble({
  width: W,
  height: H,
  pillH: pH,
  tailH: tH,
  tailBaseW: tW,
  color,
  strokeWidth: sw,
}: CalloutBubbleProps) {
  const cx = W / 2;
  const r = pH / 2; // full pill radius

  // Quadratic bezier tail: to place the actual curve tip at pH+tH,
  // the control point must be at pH + 2*tH (midpoint formula).
  const ctrlY = pH + 2 * tH;

  const d = [
    `M ${r} 0`,
    `L ${W - r} 0`,
    `Q ${W} 0 ${W} ${r}`,
    `L ${W} ${pH - r}`,
    `Q ${W} ${pH} ${W - r} ${pH}`,
    `L ${cx + tW / 2} ${pH}`,
    `Q ${cx} ${ctrlY} ${cx - tW / 2} ${pH}`,
    `L ${r} ${pH}`,
    `Q 0 ${pH} 0 ${pH - r}`,
    `L 0 ${r}`,
    `Q 0 0 ${r} 0`,
    'Z',
  ].join(' ');

  const half = sw / 2;
  return (
    <Svg
      width={W}
      height={H}
      viewBox={`${-half} ${-half} ${W + sw} ${H + sw}`}
      style={StyleSheet.absoluteFill}
    >
      <Path d={d} fill="#FFFFFF" stroke={color} strokeWidth={sw} />
    </Svg>
  );
}

// ── Individual lot marker ─────────────────────────────────────────────────────

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
  const tailBaseW = isSelected ? TAIL_BASE_W_SEL : TAIL_BASE_W;
  const bw = isSelected ? 2.5 : 1.5;
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
      <View
        key={viewKey}
        collapsable={false}
        style={[styles.markerRoot, {width: overlayW, height: overlayH}]}
      >
        {/* SVG callout: single seamless outline (no pill/tail seam) */}
        <CalloutBubble
          width={overlayW}
          height={overlayH}
          pillH={pillH}
          tailH={tailH}
          tailBaseW={tailBaseW}
          color={visual.color}
          strokeWidth={bw}
        />

        {/* Content layer: sits inside the pill area */}
        <View style={[styles.pillContent, {height: pillH}]}>
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
  pillContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 4,
  },
  pillText: {
    fontWeight: '700',
    includeFontPadding: false,
    lineHeight: 16,
  },
});

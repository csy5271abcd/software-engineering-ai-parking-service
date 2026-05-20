import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {
  NaverMapMarkerOverlay,
  NaverMapView,
  type NaverMapViewRef,
} from '@mj-studio/react-native-naver-map';
import {
  OUTER_D,
  OUTER_D_SEL,
  INNER_D,
  INNER_D_SEL,
  TAIL_H,
  TAIL_H_SEL,
  ICON_SIZE,
  ICON_SIZE_SEL,
  STROKE_W,
  STROKE_W_SEL,
  OVERLAY_W,
  OVERLAY_W_SEL,
  OVERLAY_H,
  OVERLAY_H_SEL,
  getMarkerVisual,
} from '../../constants/mapMarker';
import {AppIcon} from '../common/AppIcon';
import type {ParkingLotDetail} from '../../types/parking';

// ── 위치 상수 ─────────────────────────────────────────────────────────────────
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

// ── Pin-shaped SVG marker shell ───────────────────────────────────────────────

type PinBubbleProps = {
  overlayW: number;
  overlayH: number;
  outerD: number;
  tailH: number;
  color: string;
  strokeWidth: number;
};

function PinBubble({
  overlayW,
  overlayH,
  outerD,
  tailH,
  color,
  strokeWidth: sw,
}: PinBubbleProps) {
  const R = outerD / 2;
  const cx = overlayW / 2;
  const cy = R + 1; // 1px top buffer for stroke

  const tailAngle = 30 * (Math.PI / 180);
  const ax = R * Math.sin(tailAngle);
  const attachY = cy + R * Math.cos(tailAngle);
  const tipY = overlayH - 1; // 1px bottom buffer for stroke
  const midY = attachY + (tipY - attachY) * 0.5;

  const d = [
    `M ${cx + ax} ${attachY}`,
    `A ${R} ${R} 0 1 0 ${cx - ax} ${attachY}`,
    `Q ${cx - ax * 0.1} ${midY} ${cx} ${tipY}`,
    `Q ${cx + ax * 0.1} ${midY} ${cx + ax} ${attachY}`,
    'Z',
  ].join(' ');

  const half = sw / 2;
  return (
    <Svg
      width={overlayW}
      height={overlayH}
      viewBox={`${-half} ${-half} ${overlayW + sw} ${overlayH + sw}`}
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

  const outerD = isSelected ? OUTER_D_SEL : OUTER_D;
  const innerD = isSelected ? INNER_D_SEL : INNER_D;
  const iconSz = isSelected ? ICON_SIZE_SEL : ICON_SIZE;
  const tailH = isSelected ? TAIL_H_SEL : TAIL_H;
  const bw = isSelected ? STROKE_W_SEL : STROKE_W;
  const overlayW = isSelected ? OVERLAY_W_SEL : OVERLAY_W;
  const overlayH = isSelected ? OVERLAY_H_SEL : OVERLAY_H;

  const innerTop = (outerD - innerD) / 2 + 1;
  const innerLeft = (overlayW - innerD) / 2;

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
        style={{width: overlayW, height: overlayH}}
      >
        <PinBubble
          overlayW={overlayW}
          overlayH={overlayH}
          outerD={outerD}
          tailH={tailH}
          color={visual.color}
          strokeWidth={bw}
        />
        <View
          style={[
            styles.innerCircle,
            {
              top: innerTop,
              left: innerLeft,
              width: innerD,
              height: innerD,
              borderRadius: innerD / 2,
              backgroundColor: visual.color,
            },
          ]}
        >
          <AppIcon
            name={visual.icon}
            size={iconSz}
            color="#FFFFFF"
            strokeWidth={2.5}
          />
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
  innerCircle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

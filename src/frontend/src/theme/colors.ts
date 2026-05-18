// NAVER_MAP_STYLE_GUIDE.md 이미지에서 확인된 값 기준

const warmGray = {
  900: '#222225',
  700: '#373737',
  500: '#656565',
  300: '#939396',
  100: '#EDEDED',
} as const;

const green = {
  primary: '#03AA5A',
} as const;

const red = {
  warning: '#F61024',
  highlight: '#FF4043',
} as const;

const base = {
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const colors = {
  // ── Primitive ──────────────────────────────
  warmGray,
  green,
  red,
  base,

  // ── Semantic ───────────────────────────────
  background: {
    default: base.white,
    surface: base.white,
    overlay: 'rgba(0,0,0,0.4)',
  },

  text: {
    primary: warmGray[900],
    secondary: warmGray[500],
    disabled: warmGray[300],
    inverse: base.white,
  },

  border: {
    default: warmGray[100],
    strong: warmGray[300],
  },

  icon: {
    default: warmGray[700],
    muted: warmGray[300],
    inverse: base.white,
  },

  primary: {
    default: green.primary,
    text: base.white,
  },

  // ── Status ─────────────────────────────────
  status: {
    available: green.primary,
    soonAvailable: '#F5A623',       // 경고성 주황 (문서 미확인값, 최소 보조 토큰)
    occupied: warmGray[300],
    full: red.warning,
    inactive: warmGray[100],
    selected: green.primary,
    unknown: warmGray[300],
  },

  // ── Congestion ─────────────────────────────
  congestion: {
    low: green.primary,
    medium: '#F5A623',              // 보조 토큰 (이미지 미확인, 실무 최솟값)
    high: red.highlight,
    veryHigh: red.warning,
    unknown: warmGray[300],
  },
} as const;

export type Colors = typeof colors;

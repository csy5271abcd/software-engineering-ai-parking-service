// Foundation_Typo.png / Foundation_Typo_KR.png / Foundation_Typo_EN,NUM.png 기준
// 폰트 파일 설정은 별도 단계에서 진행한다.
// 한국어: Noto Sans KR, 영문/숫자: Pretendard (추후 폰트 설정 단계에서 적용)

import type {TextStyle} from 'react-native';

type TypographyToken = Pick<
  TextStyle,
  'fontSize' | 'fontWeight' | 'lineHeight'
>;

// ── Title 계층 (20pt → 12pt, 이미지 기준 범위) ──────────────
const title: Record<string, TypographyToken> = {
  xl: {fontSize: 20, fontWeight: '700', lineHeight: 28},
  lg: {fontSize: 18, fontWeight: '700', lineHeight: 26},
  md: {fontSize: 16, fontWeight: '600', lineHeight: 24},
  sm: {fontSize: 14, fontWeight: '600', lineHeight: 20},
  xs: {fontSize: 12, fontWeight: '600', lineHeight: 18},
};

// ── Body 계층 (16pt → 11pt, 이미지 기준 범위) ───────────────
const body: Record<string, TypographyToken> = {
  lg: {fontSize: 16, fontWeight: '400', lineHeight: 24},
  md: {fontSize: 14, fontWeight: '400', lineHeight: 22},
  sm: {fontSize: 13, fontWeight: '400', lineHeight: 20},
  xs: {fontSize: 12, fontWeight: '400', lineHeight: 18},
  xxs: {fontSize: 11, fontWeight: '400', lineHeight: 16},
};

// ── Caption ─────────────────────────────────────────────────
const caption: Record<string, TypographyToken> = {
  md: {fontSize: 12, fontWeight: '400', lineHeight: 16},
  sm: {fontSize: 11, fontWeight: '400', lineHeight: 14},
};

// ── Label (버튼, 배지, 탭 등 UI 요소) ─────────────────────
const label: Record<string, TypographyToken> = {
  lg: {fontSize: 16, fontWeight: '600', lineHeight: 22},
  md: {fontSize: 14, fontWeight: '600', lineHeight: 20},
  sm: {fontSize: 12, fontWeight: '500', lineHeight: 16},
};

// ── Numeric (Pretendard, 이미지 기준: num-title-30, num-caption-12) ──
const numeric: Record<string, TypographyToken> = {
  title: {fontSize: 30, fontWeight: '700', lineHeight: 38},
  caption: {fontSize: 12, fontWeight: '400', lineHeight: 16},
};

export const typography = {
  title,
  body,
  caption,
  label,
  numeric,
} as const;

export type Typography = typeof typography;

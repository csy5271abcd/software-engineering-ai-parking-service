// Foundation_Spacing.png 기준 — 2px 단위, 2~22px 범위

export const spacing = {
  xxs: 2,
  xs: 4,
  s1: 6,
  s2: 8,
  s3: 10,
  md: 12,
  m1: 14,
  m2: 16,
  m3: 18,
  lg: 20,
  xl: 22,

  // Layout margin aliases (Foundation_Layout.png 기준)
  screenNarrow: 12,
  screen: 16,
  screenWide: 18,
  gutter: 8,
} as const;

export type Spacing = typeof spacing;

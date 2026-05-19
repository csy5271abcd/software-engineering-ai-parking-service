// Figma Make (SmartParkReDesign) 디자인 토큰 — light mode only
// theme.css의 :root 섹션에서 추출, oklch → hex/rgba 변환 적용

export const tokens = {
  // ── Surface colors ──────────────────────────────────────────────
  background:     '#FFFFFF',
  surface:        '#FFFFFF',
  surfaceMuted:   '#F3F3F5',  // --input-background
  muted:          '#ECECF0',  // --muted
  accent:         '#E9EBEF',  // --accent

  // ── Text ────────────────────────────────────────────────────────
  foreground:      '#030213',  // --foreground (near-black)
  mutedForeground: '#717182',  // --muted-foreground
  textInverse:     '#FFFFFF',

  // ── SmartPark brand ─────────────────────────────────────────────
  brandBlue:   '#006CFF',
  brandGreen:  '#03AA5A',
  brandRed:    '#FB5852',
  brandOrange: '#F5683C',  // T.orange500 from tokens.jsx

  // ── Semantic ────────────────────────────────────────────────────
  primary:             '#030213',  // --primary (near-black)
  primaryForeground:   '#FFFFFF',
  secondary:           '#F0F1F5',  // --secondary (approx)
  secondaryForeground: '#030213',
  destructive:         '#D4183D',  // --destructive
  destructiveForeground: '#FFFFFF',

  // ── Borders ─────────────────────────────────────────────────────
  border:          'rgba(0, 0, 0, 0.09)',
  borderStroke:    '#E5EAF1',   // T.strokeCoolPrimary
  borderStrong:    '#CAD1DB',   // T.strokeCoolSecondary
  borderWeak:      '#F0F0F3',   // T.strokeCoolWeak (card inner dividers)

  // ── Backgrounds ──────────────────────────────────────────────────
  bgCool:          '#E5EAF1',   // T.bgCool
  bgCoolSecondary: '#F8F9FB',   // T.bgCoolSecondary
  bgCoolWeak:      '#F0F4FF',   // T.bgCoolWeak

  // ── Icon / text ───────────────────────────────────────────────────
  iconPrimary:    '#222225',
  iconTertiary:   '#4D5A6A',    // T.iconTertiary
  iconWeak:       '#CAD1DB',    // T.iconWeak
  textPrimary:    '#222225',    // T.textPrimary
  textSecondary:  '#4D5A6A',    // T.textSecondary
  textTertiary:   '#6B7C92',    // T.textTertiary
  textQuaternary: '#8B99AC',    // T.textQuaternary

  // ── Control ─────────────────────────────────────────────────────
  switchBg:        '#CBCED4',   // T.switchBg

  // ── Radius scale (base: 0.625rem = 10px) ──────────────────────
  // --radius-sm: 10-4 = 6px
  // --radius-md: 10-2 = 8px
  // --radius-lg: 10px
  // --radius-xl: 10+4 = 14px
  radiusSm: 6,
  radiusMd: 8,
  radiusLg: 10,
  radiusXl: 14,
  radius2xl: 20,
  radiusFull: 9999,
} as const;

export type Tokens = typeof tokens;

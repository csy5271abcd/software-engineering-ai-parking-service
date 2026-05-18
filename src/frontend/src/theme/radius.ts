// Foundation_Radius.png 기준

export const radius = {
  // ── Primitive scale ────────────────────────
  r4: 4,
  r6: 6,
  r8: 8,
  r12: 12,
  r14: 14,
  r18: 18,
  r20: 20,
  full: 9999,

  // ── Semantic aliases ───────────────────────
  chip: 8,
  card: 12,
  modal: 12,
  button: 8,
  pill: 18,
  bottomSheet: 20,   // BottomSheet 상단 모서리 (이미지 기준)
  searchBar: 20,     // SearchBar (이미지 기준)
} as const;

export type Radius = typeof radius;

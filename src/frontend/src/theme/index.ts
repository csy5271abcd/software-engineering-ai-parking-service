export {colors} from './colors';
export {spacing} from './spacing';
export {radius} from './radius';
export {typography} from './typography';
export {shadow} from './shadow';

export type {Colors} from './colors';
export type {Spacing} from './spacing';
export type {Radius} from './radius';
export type {Typography} from './typography';
export type {Shadow} from './shadow';

import {colors} from './colors';
import {spacing} from './spacing';
import {radius} from './radius';
import {typography} from './typography';
import {shadow} from './shadow';

export const theme = {
  colors,
  spacing,
  radius,
  typography,
  shadow,
} as const;

export type Theme = typeof theme;

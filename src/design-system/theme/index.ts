import { colors } from './colors';
import { spacing } from './spacing';
import { radii } from './radii';
import { shadows } from './shadows';
import { zIndex } from './zIndex';
import { breakpoints, media } from './breakpoints';
import { typography } from './typography';

export const theme = {
  colors,
  spacing,
  radii,
  shadows,
  zIndex,
  breakpoints,
  media,
  typography,
} as const;

export type Theme = typeof theme;

export { colors, spacing, radii, shadows, zIndex, breakpoints, media, typography };

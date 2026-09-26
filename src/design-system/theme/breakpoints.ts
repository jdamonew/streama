export const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const;

export type Breakpoints = typeof breakpoints;

export const media = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
} as const;

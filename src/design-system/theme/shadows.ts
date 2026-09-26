export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.06)',
  md: '0 4px 24px rgba(0, 0, 0, 0.08)',
  lg: '0 10px 40px rgba(0, 0, 0, 0.25)',
  psn: '11px 10px 10px rgba(0, 0, 0, 0.25);'
} as const;

export type Shadows = typeof shadows;

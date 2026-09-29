export const colors = {
  primary: '#5d2ad9',
  primaryDark: '#3a06bb',
  primaryHover: '#4338ca',
  primaryOpacityLow: '#f2ebfd',
  onPrimary: '#ffffff',

  secondary: '#e5e7eb',
  secondaryHover: '#d1d5db',
  onSecondary: '#1a1a1a',

  danger: '#ef4444',
  dangerHover: '#dc2626',
  onDanger: '#ffffff',

  online: '#00b44b',
  onlineHover: '#037934',
  onOnline: '#ffffff',

  live: '#ef4444',

  background: '#f4f5f7',
  surface: '#ffffff',

  border: '#d1d5db',
  borderLight: '#eeeeee',

  textPrimary: '#1a1a1a',
  textSecondary: '#6b7280',
  textMuted: '#9ca3af',
  textLink: '#4f46e5',
  textLinkClean: '#ffffff',

  overlay: 'rgba(26, 28, 32, 0.55)',
  overlayStrong: 'rgba(0, 0, 0, 0.75)',

  white: '#ffffff',
  whiteLowOpacity: '#ffffff29',
  black: '#000000',
} as const;

export type Colors = typeof colors;

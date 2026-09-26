export const typography = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontSizes: {
    xxs: '10px',
    xs: '12px',
    sm: '13px',
    md: '14px',
    lg: '16px',
    xl: '20px',
    xxl: '28px',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
} as const;

export type Typography = typeof typography;

export const zIndex = {
  base: 1,
  dropdown: 10,
  overlay: 40,
  modal: 50,
} as const;

export type ZIndex = typeof zIndex;

/**
 * Spacing & Layout System - Checkmind
 * Consistent spacing and layout tokens
 */

// Base Spacing Unit (4px)
const BASE_UNIT = 4;

// Spacing Scale (8px grid system)
export const Spacing = {
  none: 0,
  xs: BASE_UNIT * 1, // 4px
  sm: BASE_UNIT * 2, // 8px
  md: BASE_UNIT * 3, // 12px
  base: BASE_UNIT * 4, // 16px
  lg: BASE_UNIT * 5, // 20px
  xl: BASE_UNIT * 6, // 24px
  '2xl': BASE_UNIT * 8, // 32px
  '3xl': BASE_UNIT * 10, // 40px
  '4xl': BASE_UNIT * 12, // 48px
  '5xl': BASE_UNIT * 16, // 64px
  '6xl': BASE_UNIT * 20, // 80px
} as const;

// Border Radius
export const BorderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
} as const;

// Border Width
export const BorderWidth = {
  none: 0,
  thin: 1,
  base: 2,
  thick: 4,
} as const;

// Icon Sizes
export const IconSize = {
  xs: 16,
  sm: 20,
  base: 24,
  lg: 32,
  xl: 40,
  '2xl': 48,
  '3xl': 64,
} as const;

// Container Sizes
export const Container = {
  xs: 320,
  sm: 384,
  md: 448,
  lg: 512,
  xl: 576,
  '2xl': 672,
  full: '100%',
} as const;

// Z-Index Scale
export const ZIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  toast: 700,
  tooltip: 800,
} as const;

// Shadow Elevations
export const Shadow = {
  none: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
} as const;

// Opacity Scale
export const Opacity = {
  transparent: 0,
  subtle: 0.05,
  light: 0.1,
  medium: 0.5,
  heavy: 0.8,
  opaque: 1,
} as const;

// Layout Presets
export const Layout = {
  // Screen Padding
  screenPadding: {
    horizontal: Spacing.base,
    vertical: Spacing.lg,
  },

  // Card Padding
  cardPadding: {
    horizontal: Spacing.base,
    vertical: Spacing.base,
  },

  // Section Spacing
  sectionSpacing: Spacing['2xl'],

  // Item Spacing
  itemSpacing: Spacing.md,

  // Minimum Touch Target
  minTouchTarget: 44,

  // Safe Area Insets (for use with SafeAreaView)
  safeAreaInsets: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
} as const;

export default {
  Spacing,
  BorderRadius,
  BorderWidth,
  IconSize,
  Container,
  ZIndex,
  Shadow,
  Opacity,
  Layout,
};

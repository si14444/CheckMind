/**
 * Typography System - Checkmind
 * Clean, readable typography for mobile-first design
 */

import { Platform } from 'react-native';

// Font Families
export const FontFamily = {
  regular: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  medium: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
    default: 'System',
  }),
  bold: Platform.select({
    ios: 'System',
    android: 'Roboto-Bold',
    default: 'System',
  }),
} as const;

// Font Sizes
export const FontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
} as const;

// Line Heights
export const LineHeight = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
} as const;

// Font Weights
export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
} as const;

// Letter Spacing
export const LetterSpacing = {
  tighter: -0.5,
  tight: -0.25,
  normal: 0,
  wide: 0.25,
  wider: 0.5,
} as const;

// Typography Presets
export const Typography = {
  // Display Text (Hero sections)
  displayLarge: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['5xl'],
    lineHeight: FontSize['5xl'] * LineHeight.tight,
    fontWeight: FontWeight.bold,
    letterSpacing: LetterSpacing.tight,
  },
  displayMedium: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['4xl'],
    lineHeight: FontSize['4xl'] * LineHeight.tight,
    fontWeight: FontWeight.bold,
    letterSpacing: LetterSpacing.tight,
  },
  displaySmall: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['3xl'],
    lineHeight: FontSize['3xl'] * LineHeight.tight,
    fontWeight: FontWeight.bold,
    letterSpacing: LetterSpacing.normal,
  },

  // Headings
  h1: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['2xl'],
    lineHeight: FontSize['2xl'] * LineHeight.tight,
    fontWeight: FontWeight.bold,
    letterSpacing: LetterSpacing.normal,
  },
  h2: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.xl,
    lineHeight: FontSize.xl * LineHeight.tight,
    fontWeight: FontWeight.bold,
    letterSpacing: LetterSpacing.normal,
  },
  h3: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.lg,
    lineHeight: FontSize.lg * LineHeight.normal,
    fontWeight: FontWeight.semibold,
    letterSpacing: LetterSpacing.normal,
  },
  h4: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * LineHeight.normal,
    fontWeight: FontWeight.semibold,
    letterSpacing: LetterSpacing.normal,
  },

  // Body Text
  bodyLarge: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.lg,
    lineHeight: FontSize.lg * LineHeight.relaxed,
    fontWeight: FontWeight.regular,
    letterSpacing: LetterSpacing.normal,
  },
  body: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * LineHeight.relaxed,
    fontWeight: FontWeight.regular,
    letterSpacing: LetterSpacing.normal,
  },
  bodySmall: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * LineHeight.normal,
    fontWeight: FontWeight.regular,
    letterSpacing: LetterSpacing.normal,
  },

  // Labels & Captions
  label: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * LineHeight.normal,
    fontWeight: FontWeight.medium,
    letterSpacing: LetterSpacing.wide,
  },
  caption: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xs,
    lineHeight: FontSize.xs * LineHeight.normal,
    fontWeight: FontWeight.regular,
    letterSpacing: LetterSpacing.normal,
  },

  // Buttons
  button: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * LineHeight.tight,
    fontWeight: FontWeight.medium,
    letterSpacing: LetterSpacing.wide,
  },
  buttonSmall: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * LineHeight.tight,
    fontWeight: FontWeight.medium,
    letterSpacing: LetterSpacing.wide,
  },
} as const;

export default Typography;

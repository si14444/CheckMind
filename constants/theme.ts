/**
 * Checkmind Design System
 * Unified theme configuration
 *
 * Primary Color: #1E9E55 (Green)
 * Design Philosophy: Clean, white-focused minimal design
 */

import { Colors } from './Colors';
import Typography from './Typography';
import Spacing from './Spacing';

// Component Styles
export const ComponentStyles = {
  // Button Styles
  button: {
    primary: {
      backgroundColor: Colors.primary.main,
      color: Colors.primary.contrast,
      borderRadius: Spacing.BorderRadius.base,
      paddingVertical: Spacing.Spacing.md,
      paddingHorizontal: Spacing.Spacing.lg,
      ...Spacing.Shadow.sm,
    },
    secondary: {
      backgroundColor: Colors.background.primary,
      color: Colors.primary.main,
      borderRadius: Spacing.BorderRadius.base,
      paddingVertical: Spacing.Spacing.md,
      paddingHorizontal: Spacing.Spacing.lg,
      borderWidth: Spacing.BorderWidth.base,
      borderColor: Colors.primary.main,
      ...Spacing.Shadow.none,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: Colors.primary.main,
      borderRadius: Spacing.BorderRadius.base,
      paddingVertical: Spacing.Spacing.md,
      paddingHorizontal: Spacing.Spacing.lg,
      ...Spacing.Shadow.none,
    },
    disabled: {
      backgroundColor: Colors.neutral.gray200,
      color: Colors.neutral.gray500,
      borderRadius: Spacing.BorderRadius.base,
      paddingVertical: Spacing.Spacing.md,
      paddingHorizontal: Spacing.Spacing.lg,
      ...Spacing.Shadow.none,
    },
  },

  // Card Styles
  card: {
    default: {
      backgroundColor: Colors.background.primary,
      borderRadius: Spacing.BorderRadius.lg,
      padding: Spacing.Spacing.base,
      ...Spacing.Shadow.base,
    },
    elevated: {
      backgroundColor: Colors.background.primary,
      borderRadius: Spacing.BorderRadius.lg,
      padding: Spacing.Spacing.base,
      ...Spacing.Shadow.lg,
    },
    outlined: {
      backgroundColor: Colors.background.primary,
      borderRadius: Spacing.BorderRadius.lg,
      padding: Spacing.Spacing.base,
      borderWidth: Spacing.BorderWidth.thin,
      borderColor: Colors.border.main,
      ...Spacing.Shadow.none,
    },
  },

  // Input Styles
  input: {
    default: {
      backgroundColor: Colors.background.primary,
      borderRadius: Spacing.BorderRadius.base,
      paddingVertical: Spacing.Spacing.md,
      paddingHorizontal: Spacing.Spacing.base,
      borderWidth: Spacing.BorderWidth.thin,
      borderColor: Colors.border.main,
      color: Colors.text.primary,
      ...Typography.body,
    },
    focused: {
      borderColor: Colors.border.focus,
      borderWidth: Spacing.BorderWidth.base,
      ...Spacing.Shadow.sm,
    },
    error: {
      borderColor: Colors.semantic.error,
      borderWidth: Spacing.BorderWidth.base,
    },
    disabled: {
      backgroundColor: Colors.neutral.gray100,
      borderColor: Colors.border.light,
      color: Colors.text.tertiary,
    },
  },

  // Badge Styles
  badge: {
    success: {
      backgroundColor: Colors.semantic.success,
      color: Colors.neutral.white,
      borderRadius: Spacing.BorderRadius.full,
      paddingVertical: Spacing.Spacing.xs,
      paddingHorizontal: Spacing.Spacing.sm,
      ...Typography.caption,
    },
    warning: {
      backgroundColor: Colors.semantic.warning,
      color: Colors.neutral.white,
      borderRadius: Spacing.BorderRadius.full,
      paddingVertical: Spacing.Spacing.xs,
      paddingHorizontal: Spacing.Spacing.sm,
      ...Typography.caption,
    },
    error: {
      backgroundColor: Colors.semantic.error,
      color: Colors.neutral.white,
      borderRadius: Spacing.BorderRadius.full,
      paddingVertical: Spacing.Spacing.xs,
      paddingHorizontal: Spacing.Spacing.sm,
      ...Typography.caption,
    },
    info: {
      backgroundColor: Colors.semantic.info,
      color: Colors.neutral.white,
      borderRadius: Spacing.BorderRadius.full,
      paddingVertical: Spacing.Spacing.xs,
      paddingHorizontal: Spacing.Spacing.sm,
      ...Typography.caption,
    },
    neutral: {
      backgroundColor: Colors.neutral.gray200,
      color: Colors.text.primary,
      borderRadius: Spacing.BorderRadius.full,
      paddingVertical: Spacing.Spacing.xs,
      paddingHorizontal: Spacing.Spacing.sm,
      ...Typography.caption,
    },
  },

  // Divider Styles
  divider: {
    horizontal: {
      height: Spacing.BorderWidth.thin,
      backgroundColor: Colors.border.light,
      marginVertical: Spacing.Spacing.base,
    },
    vertical: {
      width: Spacing.BorderWidth.thin,
      backgroundColor: Colors.border.light,
      marginHorizontal: Spacing.Spacing.base,
    },
  },
} as const;

// Export unified theme
export const theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing.Spacing,
  borderRadius: Spacing.BorderRadius,
  borderWidth: Spacing.BorderWidth,
  iconSize: Spacing.IconSize,
  container: Spacing.Container,
  zIndex: Spacing.ZIndex,
  shadow: Spacing.Shadow,
  opacity: Spacing.Opacity,
  layout: Spacing.Layout,
  components: ComponentStyles,
} as const;

export default theme;

// Type exports for TypeScript
export type Theme = typeof theme;
export type ColorKey = keyof typeof Colors;
export type TypographyKey = keyof typeof Typography;
export type SpacingKey = keyof typeof Spacing.Spacing;

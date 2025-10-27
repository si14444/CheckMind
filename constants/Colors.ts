/**
 * Design System - Checkmind
 * Primary Color: #1E9E55 (Green)
 * Base: White-focused minimal design
 */

// Color Palette
export const Colors = {
  // Primary Colors
  primary: {
    main: "#86D7EE",
    sub: "#F29C62",
    light: "#4CAF77",
    dark: "#157A43",
    contrast: "#FFFFFF",
  },

  // Neutral Colors (White-based)
  neutral: {
    white: "#FFFFFF",
    gray50: "#FAFAFA",
    gray100: "#F5F5F5",
    gray200: "#EEEEEE",
    gray300: "#E0E0E0",
    gray400: "#BDBDBD",
    gray500: "#9E9E9E",
    gray600: "#757575",
    gray700: "#616161",
    gray800: "#424242",
    gray900: "#212121",
    black: "#000000",
  },

  // Semantic Colors
  semantic: {
    success: "#1E9E55",
    warning: "#FFA726",
    error: "#EF5350",
    info: "#42A5F5",
  },

  // Background Colors
  background: {
    primary: "#FFFFFF",
    secondary: "#FAFAFA",
    tertiary: "#F5F5F5",
    overlay: "rgba(0, 0, 0, 0.5)",
  },

  // Text Colors
  text: {
    primary: "#212121",
    secondary: "#616161",
    tertiary: "#9E9E9E",
    inverse: "#FFFFFF",
    link: "#1E9E55",
  },

  // Border Colors
  border: {
    light: "#F5F5F5",
    main: "#E0E0E0",
    dark: "#BDBDBD",
    focus: "#1E9E55",
  },
} as const;

// Theme Configuration
export default {
  light: {
    text: Colors.text.primary,
    background: Colors.background.primary,
    tint: Colors.primary.main,
    tabIconDefault: Colors.neutral.gray400,
    tabIconSelected: Colors.primary.main,
    border: Colors.border.main,
    card: Colors.background.primary,
  },
  dark: {
    text: Colors.text.inverse,
    background: Colors.neutral.gray900,
    tint: Colors.primary.light,
    tabIconDefault: Colors.neutral.gray500,
    tabIconSelected: Colors.primary.light,
    border: Colors.neutral.gray700,
    card: Colors.neutral.gray800,
  },
};

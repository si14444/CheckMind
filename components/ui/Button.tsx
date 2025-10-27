/**
 * Button Component
 * Reusable button with multiple variants following design system
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, BorderWidth, Shadow } from '@/constants';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  style,
  textStyle,
}: ButtonProps) {
  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[`${size}Size`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? Colors.primary.contrast : Colors.primary.main}
          size="small"
        />
      ) : (
        <>
          {icon && icon}
          <Text style={textStyles}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.base,
    gap: Spacing.sm,
  },

  // Variants
  primary: {
    backgroundColor: Colors.primary.main,
    ...Shadow.sm,
  },
  secondary: {
    backgroundColor: Colors.background.primary,
    borderWidth: BorderWidth.base,
    borderColor: Colors.primary.main,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: Colors.semantic.error,
    ...Shadow.sm,
  },

  // Sizes
  smallSize: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    minHeight: 36,
  },
  mediumSize: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    minHeight: 44,
  },
  largeSize: {
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.xl,
    minHeight: 52,
  },

  // Text
  text: {
    ...Typography.button,
    textAlign: 'center',
  },
  primaryText: {
    color: Colors.primary.contrast,
  },
  secondaryText: {
    color: Colors.primary.main,
  },
  ghostText: {
    color: Colors.primary.main,
  },
  dangerText: {
    color: Colors.neutral.white,
  },
  smallText: {
    ...Typography.buttonSmall,
  },
  mediumText: {
    ...Typography.button,
  },
  largeText: {
    ...Typography.button,
    fontSize: Typography.button.fontSize + 2,
  },

  // States
  disabled: {
    backgroundColor: Colors.neutral.gray200,
    borderColor: Colors.neutral.gray300,
    ...Shadow.none,
  },
  disabledText: {
    color: Colors.neutral.gray500,
  },
  fullWidth: {
    width: '100%',
  },
});

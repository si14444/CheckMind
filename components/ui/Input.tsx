/**
 * Input Component
 * Reusable text input with design system styling
 */

import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, BorderWidth, Shadow } from '@/constants';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  containerStyle?: ViewStyle;
}

export default function Input({
  label,
  error,
  helperText,
  containerStyle,
  style,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const inputStyles = [
    styles.input,
    isFocused && styles.focused,
    error && styles.error,
    props.editable === false && styles.disabled,
    style,
  ];

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        style={inputStyles}
        placeholderTextColor={Colors.text.tertiary}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
      {!error && helperText && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    ...Typography.label,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  input: {
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.base,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    borderWidth: BorderWidth.thin,
    borderColor: Colors.border.main,
    color: Colors.text.primary,
    ...Typography.body,
    minHeight: 44,
  },
  focused: {
    borderColor: Colors.border.focus,
    borderWidth: BorderWidth.base,
    ...Shadow.sm,
  },
  error: {
    borderColor: Colors.semantic.error,
    borderWidth: BorderWidth.base,
  },
  disabled: {
    backgroundColor: Colors.neutral.gray100,
    borderColor: Colors.border.light,
    color: Colors.text.tertiary,
  },
  errorText: {
    ...Typography.caption,
    color: Colors.semantic.error,
    marginTop: Spacing.xs,
  },
  helperText: {
    ...Typography.caption,
    color: Colors.text.tertiary,
    marginTop: Spacing.xs,
  },
});

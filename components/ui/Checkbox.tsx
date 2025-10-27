/**
 * Checkbox Component
 * Custom checkbox with design system styling
 */

import React from 'react';
import { Pressable, View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius, BorderWidth } from '@/constants';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
  style,
}: CheckboxProps) {
  return (
    <Pressable
      style={[styles.container, style]}
      onPress={() => !disabled && onChange(!checked)}
      disabled={disabled}
    >
      <View
        style={[
          styles.checkbox,
          checked && styles.checked,
          disabled && styles.disabled,
        ]}
      >
        {checked && (
          <Ionicons
            name="checkmark"
            size={18}
            color={disabled ? Colors.neutral.gray500 : Colors.primary.contrast}
          />
        )}
      </View>
      {label && (
        <Text
          style={[
            styles.label,
            checked && styles.labelChecked,
            disabled && styles.labelDisabled,
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.sm,
    borderWidth: BorderWidth.base,
    borderColor: Colors.border.dark,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: Colors.primary.main,
    borderColor: Colors.primary.main,
  },
  disabled: {
    backgroundColor: Colors.neutral.gray200,
    borderColor: Colors.neutral.gray300,
  },
  label: {
    ...Typography.body,
    color: Colors.text.primary,
    flex: 1,
  },
  labelChecked: {
    textDecorationLine: 'line-through',
    color: Colors.text.tertiary,
  },
  labelDisabled: {
    color: Colors.text.tertiary,
  },
});

/**
 * Card Component
 * Reusable card container with variants
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { Colors, Spacing, BorderRadius, BorderWidth, Shadow } from '@/constants';

type CardVariant = 'default' | 'elevated' | 'outlined';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  onPress?: () => void;
  style?: ViewStyle;
}

export default function Card({
  children,
  variant = 'default',
  onPress,
  style,
}: CardProps) {
  const cardStyles = [
    styles.card,
    styles[variant],
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        style={({ pressed }) => [
          ...cardStyles,
          pressed && styles.pressed,
        ]}
        onPress={onPress}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={cardStyles}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
  },
  default: {
    ...Shadow.base,
  },
  elevated: {
    ...Shadow.lg,
  },
  outlined: {
    borderWidth: BorderWidth.thin,
    borderColor: Colors.border.main,
    ...Shadow.none,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});

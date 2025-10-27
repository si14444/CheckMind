/**
 * FloatingActionButton Component
 * Floating action button for primary actions
 */

import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Shadow, ZIndex, BorderWidth } from '@/constants';

type FABVariant = 'primary' | 'secondary';

interface FloatingActionButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  variant?: FABVariant;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  style?: ViewStyle;
}

export default function FloatingActionButton({
  icon,
  onPress,
  variant = 'primary',
  position = 'bottom-right',
  style,
}: FloatingActionButtonProps) {
  const positionStyles = {
    'bottom-right': styles.bottomRight,
    'bottom-left': styles.bottomLeft,
    'bottom-center': styles.bottomCenter,
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.fab,
        styles[variant],
        positionStyles[position],
        pressed && styles.pressed,
        style,
      ]}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={24}
        color={variant === 'primary' ? Colors.primary.contrast : Colors.primary.main}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.lg,
    zIndex: ZIndex.fixed,
  },
  primary: {
    backgroundColor: Colors.primary.main,
  },
  secondary: {
    backgroundColor: Colors.background.primary,
    borderWidth: BorderWidth.base,
    borderColor: Colors.primary.main,
  },
  bottomRight: {
    bottom: Spacing['3xl'],
    right: Spacing.base,
  },
  bottomLeft: {
    bottom: Spacing['3xl'],
    left: Spacing.base,
  },
  bottomCenter: {
    bottom: Spacing['3xl'],
    alignSelf: 'center',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
});

/**
 * ChecklistCard Component
 * Card displaying checklist summary on main screen
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, BorderWidth, Shadow } from '@/constants';

interface ChecklistCardProps {
  id: string;
  title: string;
  totalItems: number;
  completedItems: number;
  onPress: () => void;
  onDelete?: () => void;
}

export default function ChecklistCard({
  title,
  totalItems,
  completedItems,
  onPress,
  onDelete,
}: ChecklistCardProps) {
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  const progressColor = progress === 100 ? Colors.semantic.success : Colors.primary.main;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        {/* Title and Delete Button */}
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          {onDelete && (
            <Pressable
              style={styles.deleteButton}
              onPress={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              hitSlop={8}
            >
              <Ionicons name="trash-outline" size={20} color={Colors.semantic.error} />
            </Pressable>
          )}
        </View>

        {/* Progress Info */}
        <View style={styles.progressInfo}>
          <View style={styles.statsRow}>
            <Ionicons name="checkmark-circle" size={16} color={progressColor} />
            <Text style={styles.statsText}>
              {completedItems} / {totalItems} 완료
            </Text>
          </View>
          <Text style={[styles.progressPercentage, { color: progressColor }]}>
            {Math.round(progress)}%
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${progress}%`, backgroundColor: progressColor },
            ]}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    ...Shadow.base,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  content: {
    gap: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  title: {
    ...Typography.h3,
    color: Colors.text.primary,
    flex: 1,
  },
  deleteButton: {
    padding: Spacing.xs,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statsText: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
  },
  progressPercentage: {
    ...Typography.label,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: BorderRadius.full,
  },
});

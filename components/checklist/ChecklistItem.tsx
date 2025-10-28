/**
 * ChecklistItem Component
 * Individual checklist item with checkbox and edit/delete functionality
 */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, BorderWidth, Shadow } from '@/constants';
import { Checkbox } from '@/components/ui';

interface ChecklistItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: () => void;
  onUpdate: (newText: string) => void;
  onDelete: () => void;
  deleteMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  index?: number;
}

export default function ChecklistItem({
  text,
  completed,
  onToggle,
  onUpdate,
  onDelete,
  deleteMode = false,
  isSelected = false,
  onSelect,
  index,
}: ChecklistItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSave = () => {
    const trimmedText = editText.trim();
    if (trimmedText) {
      onUpdate(trimmedText);
      setIsEditing(false);
    } else {
      Alert.alert('오류', '항목 내용을 입력해주세요.');
    }
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(text);
  };

  // Color palette for item indicators
  const colors = [
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#FFA07A', // Light Salmon
    '#98D8C8', // Mint
    '#F7DC6F', // Yellow
    '#BB8FCE', // Purple
    '#85C1E2', // Sky Blue
  ];

  const indicatorColor = index !== undefined ? colors[index % colors.length] : colors[0];

  return (
    <Pressable
      style={[
        styles.container,
        deleteMode && isSelected && styles.containerSelected,
      ]}
      onPress={deleteMode ? onSelect : undefined}
      disabled={!deleteMode}
    >
      {/* Color Indicator */}
      <View style={[styles.colorIndicator, { backgroundColor: indicatorColor }]} />

      {/* Item Number Badge */}
      {index !== undefined && !deleteMode && (
        <View style={[styles.numberBadge, { borderColor: indicatorColor }]}>
          <Text style={[styles.numberText, { color: indicatorColor }]}>
            {index + 1}
          </Text>
        </View>
      )}

      {/* Selection Checkbox (Delete Mode) or Regular Checkbox */}
      <View style={styles.checkboxContainer}>
        {deleteMode ? (
          <Checkbox
            checked={isSelected}
            onChange={onSelect || (() => {})}
          />
        ) : (
          <Checkbox
            checked={completed}
            onChange={onToggle}
            disabled={isEditing}
          />
        )}
      </View>

      {/* Text Content */}
      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            value={editText}
            onChangeText={setEditText}
            autoFocus
            multiline
            returnKeyType="done"
            onSubmitEditing={handleSave}
            blurOnSubmit
          />
          <View style={styles.editActions}>
            <Pressable
              style={[styles.actionButton, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Ionicons name="close" size={16} color={Colors.text.secondary} />
            </Pressable>
            <Pressable
              style={[styles.actionButton, styles.saveButton]}
              onPress={handleSave}
            >
              <Ionicons name="checkmark" size={16} color={Colors.primary.contrast} />
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.text,
              completed && styles.textCompleted,
            ]}
          >
            {text}
          </Text>

          {/* Edit Button (only when not in delete mode) */}
          {!deleteMode && (
            <Pressable
              style={styles.editButton}
              onPress={handleEdit}
              hitSlop={8}
            >
              <Ionicons name="pencil-outline" size={18} color={Colors.primary.main} />
            </Pressable>
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    paddingLeft: Spacing.xs,
    marginBottom: Spacing.md,
    gap: Spacing.md,
    ...Shadow.sm,
    borderWidth: BorderWidth.thin,
    borderColor: Colors.border.light,
    position: 'relative',
    overflow: 'hidden',
  },
  containerSelected: {
    backgroundColor: Colors.primary.light,
    borderColor: Colors.primary.main,
    borderWidth: 2,
  },
  colorIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  numberBadge: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.primary,
    marginLeft: Spacing.sm,
  },
  numberText: {
    ...Typography.bodySmall,
    fontWeight: '700',
    fontSize: 13,
  },
  checkboxContainer: {
    paddingTop: 2,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  text: {
    ...Typography.body,
    color: Colors.text.primary,
    flex: 1,
  },
  textCompleted: {
    opacity: 0.5,
    textDecorationLine: 'line-through',
  },
  editButton: {
    padding: Spacing.xs,
  },
  editContainer: {
    flex: 1,
    gap: Spacing.sm,
  },
  input: {
    ...Typography.body,
    color: Colors.text.primary,
    backgroundColor: Colors.background.secondary,
    borderRadius: BorderRadius.base,
    padding: Spacing.md,
    borderWidth: BorderWidth.base,
    borderColor: Colors.border.focus,
    minHeight: 60,
  },
  editActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    justifyContent: 'flex-end',
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.neutral.gray200,
  },
  saveButton: {
    backgroundColor: Colors.primary.main,
  },
});

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

  return (
    <Pressable
      style={[
        styles.container,
        deleteMode && isSelected && styles.containerSelected,
      ]}
      onPress={deleteMode ? onSelect : undefined}
      disabled={!deleteMode}
    >
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
    marginBottom: Spacing.md,
    gap: Spacing.md,
    ...Shadow.sm,
    borderWidth: BorderWidth.thin,
    borderColor: Colors.border.light,
  },
  containerSelected: {
    backgroundColor: Colors.primary.light,
    borderColor: Colors.primary.main,
    borderWidth: 2,
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

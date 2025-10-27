/**
 * ChecklistItem Component
 * Individual checklist item with checkbox and edit/delete functionality
 */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, BorderWidth } from '@/constants';
import { Checkbox } from '@/components/ui';

interface ChecklistItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: () => void;
  onUpdate: (newText: string) => void;
  onDelete: () => void;
}

export default function ChecklistItem({
  text,
  completed,
  onToggle,
  onUpdate,
  onDelete,
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

  const handleDelete = () => {
    Alert.alert(
      '항목 삭제',
      '이 항목을 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '삭제', style: 'destructive', onPress: onDelete },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Checkbox */}
      <View style={styles.checkboxContainer}>
        <Checkbox
          checked={completed}
          onChange={onToggle}
          disabled={isEditing}
        />
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
          <Pressable
            style={styles.textPressable}
            onPress={() => setIsEditing(true)}
          >
            <Text
              style={[
                styles.text,
                completed && styles.textCompleted,
              ]}
            >
              {text}
            </Text>
          </Pressable>

          {/* Delete Button */}
          <Pressable
            style={styles.deleteButton}
            onPress={handleDelete}
            hitSlop={8}
          >
            <Ionicons name="trash-outline" size={18} color={Colors.semantic.error} />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: Spacing.md,
    borderBottomWidth: BorderWidth.thin,
    borderBottomColor: Colors.border.light,
    gap: Spacing.md,
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
  textPressable: {
    flex: 1,
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
  deleteButton: {
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

/**
 * Checklist Detail Screen
 * Displays checklist items with add/edit/delete functionality
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  SafeAreaView,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, BorderWidth, Shadow } from '@/constants';
import { Input, Button } from '@/components/ui';
import { ChecklistItem } from '@/components/checklist';
import { useChecklists } from '@/contexts/ChecklistContext';

export default function ChecklistDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    getChecklist,
    updateChecklist,
    addItem,
    updateItem,
    deleteItem,
    toggleItem,
  } = useChecklists();

  const checklist = getChecklist(id || '');
  const [newItemText, setNewItemText] = useState('');
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  if (!checklist) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={Colors.text.tertiary} />
          <Text style={styles.errorText}>체크리스트를 찾을 수 없습니다</Text>
          <Button title="돌아가기" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  const handleToggleItem = async (itemId: string) => {
    if (!checklist) return;
    await toggleItem(checklist.id, itemId);
  };

  const handleUpdateItem = async (itemId: string, newText: string) => {
    if (!checklist) return;
    const success = await updateItem(checklist.id, itemId, { text: newText });
    if (!success) {
      Alert.alert('오류', '항목 수정에 실패했습니다.');
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!checklist) return;
    const success = await deleteItem(checklist.id, itemId);
    if (!success) {
      Alert.alert('오류', '항목 삭제에 실패했습니다.');
    }
  };

  const handleAddItem = async () => {
    if (!checklist) return;

    const trimmedText = newItemText.trim();
    if (!trimmedText) {
      Alert.alert('오류', '항목 내용을 입력해주세요.');
      return;
    }

    const newItem = await addItem(checklist.id, trimmedText);
    if (newItem) {
      setNewItemText('');
    } else {
      Alert.alert('오류', '항목 추가에 실패했습니다.');
    }
  };

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
    setSelectedItems(new Set());
  };

  const toggleItemSelection = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleDeleteSelected = async () => {
    if (!checklist || selectedItems.size === 0) return;

    Alert.alert(
      '항목 삭제',
      `${selectedItems.size}개의 항목을 삭제하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            for (const itemId of selectedItems) {
              await deleteItem(checklist.id, itemId);
            }
            setSelectedItems(new Set());
            setDeleteMode(false);
          },
        },
      ]
    );
  };

  const completedCount = checklist.items.filter((item) => item.completed).length;
  const totalCount = checklist.items.length;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Floating Back Button */}
        <Pressable
          style={styles.floatingBackButton}
          onPress={() => router.back()}
          hitSlop={8}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </Pressable>

        {/* Delete Mode Toggle Button */}
        <Pressable
          style={[
            styles.deleteToggleButton,
            deleteMode && styles.deleteToggleButtonActive,
          ]}
          onPress={toggleDeleteMode}
          hitSlop={8}
        >
          <Ionicons
            name={deleteMode ? 'close' : 'trash-outline'}
            size={20}
            color={deleteMode ? Colors.background.primary : Colors.semantic.error}
          />
        </Pressable>

        {/* Items List */}
        {checklist.items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="checkbox-outline" size={48} color={Colors.text.tertiary} />
            <Text style={styles.emptyText}>아직 항목이 없습니다</Text>
            <Text style={styles.emptySubtext}>
              아래에서 새로운 항목을 추가해보세요
            </Text>
          </View>
        ) : (
          <FlatList
            data={checklist.items}
            renderItem={({ item }) => (
              <ChecklistItem
                id={item.id}
                text={item.text}
                completed={item.completed}
                onToggle={() => handleToggleItem(item.id)}
                onUpdate={(newText) => handleUpdateItem(item.id, newText)}
                onDelete={() => handleDeleteItem(item.id)}
                deleteMode={deleteMode}
                isSelected={selectedItems.has(item.id)}
                onSelect={() => toggleItemSelection(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Add Item Input or Delete Button */}
        {deleteMode ? (
          <View style={styles.deleteButtonContainer}>
            <Button
              title={`선택된 항목 삭제 (${selectedItems.size})`}
              onPress={handleDeleteSelected}
              disabled={selectedItems.size === 0}
              style={styles.deleteButton}
            />
          </View>
        ) : (
          <View style={styles.addItemContainer}>
            <Input
              placeholder="새 항목 추가..."
              value={newItemText}
              onChangeText={setNewItemText}
              returnKeyType="done"
              onSubmitEditing={handleAddItem}
              style={styles.addItemInput}
            />
            <Button
              title="추가"
              onPress={handleAddItem}
              style={styles.addButton}
              disabled={!newItemText.trim()}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  keyboardView: {
    flex: 1,
  },
  floatingBackButton: {
    position: 'absolute',
    top: Spacing.base,
    left: Spacing.base,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.base,
  },
  deleteToggleButton: {
    position: 'absolute',
    top: Spacing.base,
    right: Spacing.base,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.base,
  },
  deleteToggleButtonActive: {
    backgroundColor: Colors.semantic.error,
  },
  listContent: {
    padding: Spacing.base,
    paddingTop: Spacing['3xl'],
    paddingBottom: Spacing['6xl'],
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing['2xl'],
    gap: Spacing.md,
  },
  emptyText: {
    ...Typography.h3,
    color: Colors.text.secondary,
  },
  emptySubtext: {
    ...Typography.body,
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
  addItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.md,
    padding: Spacing.base,
    backgroundColor: Colors.background.primary,
    borderTopWidth: BorderWidth.thin,
    borderTopColor: Colors.border.light,
    ...Shadow.base,
  },
  addItemInput: {
    flex: 1,
    marginBottom: 0,
  },
  addButton: {
    paddingHorizontal: Spacing.lg,
  },
  deleteButtonContainer: {
    padding: Spacing.base,
    backgroundColor: Colors.background.primary,
    borderTopWidth: BorderWidth.thin,
    borderTopColor: Colors.border.light,
    ...Shadow.base,
  },
  deleteButton: {
    backgroundColor: Colors.semantic.error,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing['2xl'],
    gap: Spacing.lg,
  },
  errorText: {
    ...Typography.h3,
    color: Colors.text.secondary,
  },
});

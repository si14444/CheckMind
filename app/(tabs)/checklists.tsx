/**
 * Main Screen - Checklist List
 * Displays all user checklists with add/AI generation buttons
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Modal,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius, BorderWidth, Shadow } from '@/constants';
import { FloatingActionButton, Input, Button } from '@/components/ui';
import { ChecklistCard } from '@/components/checklist';

// Temporary mock data - will be replaced with actual data management
interface Checklist {
  id: string;
  title: string;
  items: { id: string; text: string; completed: boolean }[];
}

export default function HomeScreen() {
  const router = useRouter();
  const [checklists, setChecklists] = useState<Checklist[]>([
    {
      id: '1',
      title: '일본 여행 준비물',
      items: [
        { id: '1-1', text: '여권', completed: true },
        { id: '1-2', text: '항공권', completed: true },
        { id: '1-3', text: '호텔 예약 확인증', completed: false },
        { id: '1-4', text: '여행자 보험', completed: false },
      ],
    },
    {
      id: '2',
      title: '이사 준비',
      items: [
        { id: '2-1', text: '이사 업체 예약', completed: true },
        { id: '2-2', text: '박스 구매', completed: false },
        { id: '2-3', text: '주소 변경', completed: false },
      ],
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [newChecklistTitle, setNewChecklistTitle] = useState('');

  const handleCreateChecklist = () => {
    const trimmedTitle = newChecklistTitle.trim();
    if (!trimmedTitle) {
      Alert.alert('오류', '체크리스트 제목을 입력해주세요.');
      return;
    }

    const newChecklist: Checklist = {
      id: Date.now().toString(),
      title: trimmedTitle,
      items: [],
    };

    setChecklists([newChecklist, ...checklists]);
    setNewChecklistTitle('');
    setShowCreateModal(false);

    // Navigate to detail screen
    // router.push(`/checklist/${newChecklist.id}`);
  };

  const handleDeleteChecklist = (id: string) => {
    Alert.alert(
      '체크리스트 삭제',
      '이 체크리스트를 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            setChecklists(checklists.filter((item) => item.id !== id));
          },
        },
      ]
    );
  };

  const renderChecklist = ({ item }: { item: Checklist }) => {
    const completedCount = item.items.filter((i) => i.completed).length;

    return (
      <ChecklistCard
        id={item.id}
        title={item.title}
        totalItems={item.items.length}
        completedItems={completedCount}
        onPress={() => {
          // Navigate to detail screen
          // router.push(`/checklist/${item.id}`);
          Alert.alert('알림', '상세 화면으로 이동 (구현 예정)');
        }}
        onDelete={() => handleDeleteChecklist(item.id)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>내 체크리스트</Text>
        <Text style={styles.headerSubtitle}>
          {checklists.length}개의 체크리스트
        </Text>
      </View>

      {/* Checklist List */}
      {checklists.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>아직 체크리스트가 없습니다</Text>
          <Text style={styles.emptySubtext}>
            + 버튼으로 새로운 체크리스트를 만들어보세요
          </Text>
        </View>
      ) : (
        <FlatList
          data={checklists}
          renderItem={renderChecklist}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Floating Action Buttons */}
      <FloatingActionButton
        icon="add"
        onPress={() => setShowCreateModal(true)}
        position="bottom-right"
      />

      <FloatingActionButton
        icon="sparkles"
        onPress={() => setShowAIModal(true)}
        variant="secondary"
        style={styles.aiFab}
      />

      {/* Create Checklist Modal */}
      <Modal
        visible={showCreateModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>새 체크리스트</Text>
            <Input
              placeholder="제목을 입력하세요"
              value={newChecklistTitle}
              onChangeText={setNewChecklistTitle}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={handleCreateChecklist}
            />
            <View style={styles.modalActions}>
              <Button
                title="취소"
                variant="ghost"
                onPress={() => {
                  setNewChecklistTitle('');
                  setShowCreateModal(false);
                }}
                style={styles.modalButton}
              />
              <Button
                title="생성"
                onPress={handleCreateChecklist}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* AI Modal - Placeholder */}
      <Modal
        visible={showAIModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAIModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>AI로 체크리스트 만들기</Text>
            <Text style={styles.aiSubtitle}>
              어떤 주제의 체크리스트를 만들어 드릴까요?
            </Text>
            <Input
              placeholder='예: "유럽 여행", "결혼 준비"'
              autoFocus
            />
            <View style={styles.modalActions}>
              <Button
                title="취소"
                variant="ghost"
                onPress={() => setShowAIModal(false)}
                style={styles.modalButton}
              />
              <Button
                title="생성하기"
                onPress={() => {
                  Alert.alert('알림', 'AI 기능은 추후 구현 예정입니다.');
                  setShowAIModal(false);
                }}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  header: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.base,
    backgroundColor: Colors.background.primary,
    borderBottomWidth: BorderWidth.thin,
    borderBottomColor: Colors.border.light,
  },
  headerTitle: {
    ...Typography.h1,
    color: Colors.text.primary,
  },
  headerSubtitle: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  listContent: {
    padding: Spacing.base,
    paddingBottom: Spacing['6xl'],
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing['2xl'],
  },
  emptyText: {
    ...Typography.h3,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },
  emptySubtext: {
    ...Typography.body,
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
  aiFab: {
    bottom: Spacing['3xl'] + 64 + Spacing.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.background.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.base,
  },
  modalContent: {
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    width: '100%',
    maxWidth: 400,
    ...Shadow.xl,
  },
  modalTitle: {
    ...Typography.h2,
    color: Colors.text.primary,
    marginBottom: Spacing.base,
  },
  aiSubtitle: {
    ...Typography.body,
    color: Colors.text.secondary,
    marginBottom: Spacing.base,
  },
  modalActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  modalButton: {
    flex: 1,
  },
});

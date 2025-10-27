/**
 * Home Screen - Enhanced Dashboard
 */

import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  SafeAreaView,
  Pressable,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '@/constants';

const mockData = {
  totalChecklists: 3,
  totalItems: 15,
  completedItems: 8,
  todayCompleted: 3,
};

export default function HomeScreen() {
  const router = useRouter();
  const progress = mockData.completedItems / mockData.totalItems;
  const progressPercent = Math.round(progress * 100);
  const remaining = mockData.totalItems - mockData.completedItems;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>안녕하세요! 👋</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
            })}
          </Text>
        </View>

        {/* Enhanced Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>오늘의 진행률</Text>
            <View style={styles.progressBadge}>
              <Ionicons name="trending-up" size={14} color={Colors.semantic.success} />
              <Text style={styles.progressBadgeText}>+{mockData.todayCompleted} 완료</Text>
            </View>
          </View>

          <View style={styles.progressContent}>
            {/* Progress Circle with Ring */}
            <View style={styles.progressRingContainer}>
              <View style={styles.progressRingBg} />
              <View
                style={[
                  styles.progressRing,
                  {
                    borderTopColor: Colors.primary.main,
                    borderRightColor: Colors.primary.main,
                    borderBottomColor: progress > 0.5 ? Colors.primary.main : Colors.neutral.gray200,
                    borderLeftColor: progress > 0.25 ? Colors.primary.main : Colors.neutral.gray200,
                    transform: [{ rotate: `${progress * 360}deg` }],
                  }
                ]}
              />
              <View style={styles.progressCircleInner}>
                <Text style={styles.progressPercent}>{progressPercent}%</Text>
                <Text style={styles.progressLabel}>달성</Text>
              </View>
            </View>

            {/* Stats */}
            <View style={styles.progressStats}>
              <View style={styles.statItem}>
                <View style={[styles.statIconBg, { backgroundColor: Colors.primary.light + '20' }]}>
                  <Ionicons name="checkmark-circle" size={20} color={Colors.primary.main} />
                </View>
                <Text style={styles.statValue}>{mockData.completedItems}</Text>
                <Text style={styles.statLabel}>완료</Text>
              </View>

              <View style={styles.statItem}>
                <View style={[styles.statIconBg, { backgroundColor: Colors.semantic.info + '20' }]}>
                  <Ionicons name="time-outline" size={20} color={Colors.semantic.info} />
                </View>
                <Text style={styles.statValue}>{remaining}</Text>
                <Text style={styles.statLabel}>남음</Text>
              </View>

              <View style={styles.statItem}>
                <View style={[styles.statIconBg, { backgroundColor: Colors.semantic.warning + '20' }]}>
                  <Ionicons name="list" size={20} color={Colors.semantic.warning} />
                </View>
                <Text style={styles.statValue}>{mockData.totalItems}</Text>
                <Text style={styles.statLabel}>전체</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>빠른 실행</Text>
          <View style={styles.actionGrid}>
            <Pressable
              style={({ pressed }) => [
                styles.actionCard,
                pressed && styles.actionCardPressed,
              ]}
              onPress={() => router.push('/checklists')}
            >
              <View style={[styles.actionIconGradient, styles.gradientPrimary]}>
                <Ionicons name="list" size={28} color={Colors.neutral.white} />
              </View>
              <Text style={styles.actionText}>모든 목록</Text>
              <Text style={styles.actionSubtext}>{mockData.totalChecklists}개</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.actionCard,
                pressed && styles.actionCardPressed,
              ]}
              onPress={() => {}}
            >
              <View style={[styles.actionIconGradient, styles.gradientInfo]}>
                <Ionicons name="add-circle" size={28} color={Colors.neutral.white} />
              </View>
              <Text style={styles.actionText}>새로 만들기</Text>
              <Text style={styles.actionSubtext}>빠른 생성</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.actionCard,
                pressed && styles.actionCardPressed,
              ]}
              onPress={() => {}}
            >
              <View style={[styles.actionIconGradient, styles.gradientWarning]}>
                <Ionicons name="sparkles" size={28} color={Colors.neutral.white} />
              </View>
              <Text style={styles.actionText}>AI 생성</Text>
              <Text style={styles.actionSubtext}>자동 완성</Text>
            </Pressable>
          </View>
        </View>

        {/* Enhanced Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>이번 주 통계</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={[styles.statCardIcon, { backgroundColor: Colors.primary.main + '15' }]}>
                <Ionicons name="calendar" size={28} color={Colors.primary.main} />
              </View>
              <Text style={styles.statCardValue}>{mockData.totalChecklists}</Text>
              <Text style={styles.statCardLabel}>활성 체크리스트</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statCardIcon, { backgroundColor: Colors.semantic.success + '15' }]}>
                <Ionicons name="checkmark-done" size={28} color={Colors.semantic.success} />
              </View>
              <Text style={styles.statCardValue}>{mockData.todayCompleted}</Text>
              <Text style={styles.statCardLabel}>오늘 완료</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  content: {
    padding: Spacing.base,
    paddingBottom: Spacing['3xl'],
  },

  // Header
  header: {
    marginBottom: Spacing['2xl'],
    paddingTop: Spacing.sm,
  },
  greeting: {
    ...Typography.displaySmall,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  date: {
    ...Typography.body,
    color: Colors.text.secondary,
  },

  // Progress Card
  progressCard: {
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing['2xl'],
    ...Shadow.lg,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  progressTitle: {
    ...Typography.h3,
    color: Colors.text.primary,
  },
  progressBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.semantic.success + '15',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  progressBadgeText: {
    ...Typography.caption,
    color: Colors.semantic.success,
    fontWeight: '600',
  },
  progressContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Progress Ring
  progressRingContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressRingBg: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: Colors.neutral.gray200,
  },
  progressRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderTopColor: Colors.primary.main,
    borderRightColor: Colors.primary.main,
    borderBottomColor: Colors.neutral.gray200,
    borderLeftColor: Colors.neutral.gray200,
  },
  progressCircleInner: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.base,
  },
  progressPercent: {
    ...Typography.displayMedium,
    color: Colors.neutral.white,
    fontWeight: '700',
  },
  progressLabel: {
    ...Typography.caption,
    color: Colors.neutral.white,
    opacity: 0.9,
  },

  // Progress Stats
  progressStats: {
    flexDirection: 'row',
    gap: Spacing.base,
    flex: 1,
    justifyContent: 'flex-end',
  },
  statItem: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    ...Typography.h2,
    color: Colors.text.primary,
    fontWeight: '700',
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },

  // Section
  section: {
    marginBottom: Spacing['2xl'],
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text.primary,
    marginBottom: Spacing.base,
  },

  // Action Grid
  actionGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  actionCard: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.sm,
    ...Shadow.md,
  },
  actionCardPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
  actionIconGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  gradientPrimary: {
    backgroundColor: Colors.primary.main,
  },
  gradientInfo: {
    backgroundColor: Colors.semantic.info,
  },
  gradientWarning: {
    backgroundColor: Colors.semantic.warning,
  },
  actionText: {
    ...Typography.label,
    color: Colors.text.primary,
    fontWeight: '600',
  },
  actionSubtext: {
    ...Typography.caption,
    color: Colors.text.tertiary,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.md,
    ...Shadow.base,
  },
  statCardIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statCardValue: {
    ...Typography.displayMedium,
    color: Colors.text.primary,
    fontWeight: '700',
  },
  statCardLabel: {
    ...Typography.bodySmall,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
});

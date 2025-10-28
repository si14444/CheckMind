/**
 * AsyncStorage Service
 * Handles data persistence for checklists using AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@checkmind:checklists';

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Checklist {
  id: string;
  title: string;
  items: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Load all checklists from storage
 */
export async function loadChecklists(): Promise<Checklist[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error loading checklists:', error);
    return [];
  }
}

/**
 * Save all checklists to storage
 */
export async function saveChecklists(checklists: Checklist[]): Promise<boolean> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(checklists));
    return true;
  } catch (error) {
    console.error('Error saving checklists:', error);
    return false;
  }
}

/**
 * Create a new checklist
 */
export async function createChecklist(title: string): Promise<Checklist | null> {
  try {
    const checklists = await loadChecklists();
    const now = new Date().toISOString();

    const newChecklist: Checklist = {
      id: Date.now().toString(),
      title,
      items: [],
      createdAt: now,
      updatedAt: now,
    };

    const updated = [newChecklist, ...checklists];
    const saved = await saveChecklists(updated);

    return saved ? newChecklist : null;
  } catch (error) {
    console.error('Error creating checklist:', error);
    return null;
  }
}

/**
 * Update an existing checklist
 */
export async function updateChecklist(
  id: string,
  updates: Partial<Omit<Checklist, 'id' | 'createdAt'>>
): Promise<boolean> {
  try {
    const checklists = await loadChecklists();
    const index = checklists.findIndex((c) => c.id === id);

    if (index === -1) {
      return false;
    }

    checklists[index] = {
      ...checklists[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return await saveChecklists(checklists);
  } catch (error) {
    console.error('Error updating checklist:', error);
    return false;
  }
}

/**
 * Delete a checklist
 */
export async function deleteChecklist(id: string): Promise<boolean> {
  try {
    const checklists = await loadChecklists();
    const filtered = checklists.filter((c) => c.id !== id);
    return await saveChecklists(filtered);
  } catch (error) {
    console.error('Error deleting checklist:', error);
    return false;
  }
}

/**
 * Get a single checklist by ID
 */
export async function getChecklist(id: string): Promise<Checklist | null> {
  try {
    const checklists = await loadChecklists();
    return checklists.find((c) => c.id === id) || null;
  } catch (error) {
    console.error('Error getting checklist:', error);
    return null;
  }
}

/**
 * Add an item to a checklist
 */
export async function addChecklistItem(
  checklistId: string,
  text: string
): Promise<ChecklistItem | null> {
  try {
    const checklists = await loadChecklists();
    const index = checklists.findIndex((c) => c.id === checklistId);

    if (index === -1) {
      return null;
    }

    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      text,
      completed: false,
    };

    checklists[index].items.push(newItem);
    checklists[index].updatedAt = new Date().toISOString();

    const saved = await saveChecklists(checklists);
    return saved ? newItem : null;
  } catch (error) {
    console.error('Error adding checklist item:', error);
    return null;
  }
}

/**
 * Update a checklist item
 */
export async function updateChecklistItem(
  checklistId: string,
  itemId: string,
  updates: Partial<Omit<ChecklistItem, 'id'>>
): Promise<boolean> {
  try {
    const checklists = await loadChecklists();
    const checklistIndex = checklists.findIndex((c) => c.id === checklistId);

    if (checklistIndex === -1) {
      return false;
    }

    const itemIndex = checklists[checklistIndex].items.findIndex((i) => i.id === itemId);

    if (itemIndex === -1) {
      return false;
    }

    checklists[checklistIndex].items[itemIndex] = {
      ...checklists[checklistIndex].items[itemIndex],
      ...updates,
    };
    checklists[checklistIndex].updatedAt = new Date().toISOString();

    return await saveChecklists(checklists);
  } catch (error) {
    console.error('Error updating checklist item:', error);
    return false;
  }
}

/**
 * Delete a checklist item
 */
export async function deleteChecklistItem(
  checklistId: string,
  itemId: string
): Promise<boolean> {
  try {
    const checklists = await loadChecklists();
    const checklistIndex = checklists.findIndex((c) => c.id === checklistId);

    if (checklistIndex === -1) {
      return false;
    }

    checklists[checklistIndex].items = checklists[checklistIndex].items.filter(
      (i) => i.id !== itemId
    );
    checklists[checklistIndex].updatedAt = new Date().toISOString();

    return await saveChecklists(checklists);
  } catch (error) {
    console.error('Error deleting checklist item:', error);
    return false;
  }
}

/**
 * Clear all data (useful for testing/debugging)
 */
export async function clearAllData(): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
}

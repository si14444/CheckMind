/**
 * Checklist Context
 * Provides global state management for checklists with AsyncStorage persistence
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Checklist,
  ChecklistItem,
  loadChecklists,
  saveChecklists,
  createChecklist as createChecklistService,
  updateChecklist as updateChecklistService,
  deleteChecklist as deleteChecklistService,
  addChecklistItem as addChecklistItemService,
  updateChecklistItem as updateChecklistItemService,
  deleteChecklistItem as deleteChecklistItemService,
} from '@/services/storage';

interface ChecklistContextType {
  checklists: Checklist[];
  loading: boolean;
  error: string | null;
  createChecklist: (title: string) => Promise<Checklist | null>;
  updateChecklist: (id: string, updates: Partial<Omit<Checklist, 'id' | 'createdAt'>>) => Promise<boolean>;
  deleteChecklist: (id: string) => Promise<boolean>;
  getChecklist: (id: string) => Checklist | null;
  addItem: (checklistId: string, text: string) => Promise<ChecklistItem | null>;
  updateItem: (checklistId: string, itemId: string, updates: Partial<Omit<ChecklistItem, 'id'>>) => Promise<boolean>;
  deleteItem: (checklistId: string, itemId: string) => Promise<boolean>;
  toggleItem: (checklistId: string, itemId: string) => Promise<boolean>;
  refreshChecklists: () => Promise<void>;
}

const ChecklistContext = createContext<ChecklistContextType | undefined>(undefined);

export function ChecklistProvider({ children }: { children: ReactNode }) {
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load checklists on mount
  useEffect(() => {
    loadChecklistsFromStorage();
  }, []);

  const loadChecklistsFromStorage = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await loadChecklists();
      setChecklists(data);
    } catch (err) {
      setError('Failed to load checklists');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const refreshChecklists = async () => {
    await loadChecklistsFromStorage();
  };

  const createChecklist = async (title: string): Promise<Checklist | null> => {
    try {
      const newChecklist = await createChecklistService(title);
      if (newChecklist) {
        setChecklists((prev) => [newChecklist, ...prev]);
      }
      return newChecklist;
    } catch (err) {
      console.error('Error creating checklist:', err);
      return null;
    }
  };

  const updateChecklist = async (
    id: string,
    updates: Partial<Omit<Checklist, 'id' | 'createdAt'>>
  ): Promise<boolean> => {
    try {
      const success = await updateChecklistService(id, updates);
      if (success) {
        setChecklists((prev) =>
          prev.map((c) =>
            c.id === id
              ? { ...c, ...updates, updatedAt: new Date().toISOString() }
              : c
          )
        );
      }
      return success;
    } catch (err) {
      console.error('Error updating checklist:', err);
      return false;
    }
  };

  const deleteChecklist = async (id: string): Promise<boolean> => {
    try {
      const success = await deleteChecklistService(id);
      if (success) {
        setChecklists((prev) => prev.filter((c) => c.id !== id));
      }
      return success;
    } catch (err) {
      console.error('Error deleting checklist:', err);
      return false;
    }
  };

  const getChecklist = (id: string): Checklist | null => {
    return checklists.find((c) => c.id === id) || null;
  };

  const addItem = async (
    checklistId: string,
    text: string
  ): Promise<ChecklistItem | null> => {
    try {
      const newItem = await addChecklistItemService(checklistId, text);
      if (newItem) {
        setChecklists((prev) =>
          prev.map((c) =>
            c.id === checklistId
              ? {
                  ...c,
                  items: [...c.items, newItem],
                  updatedAt: new Date().toISOString(),
                }
              : c
          )
        );
      }
      return newItem;
    } catch (err) {
      console.error('Error adding item:', err);
      return null;
    }
  };

  const updateItem = async (
    checklistId: string,
    itemId: string,
    updates: Partial<Omit<ChecklistItem, 'id'>>
  ): Promise<boolean> => {
    try {
      const success = await updateChecklistItemService(checklistId, itemId, updates);
      if (success) {
        setChecklists((prev) =>
          prev.map((c) =>
            c.id === checklistId
              ? {
                  ...c,
                  items: c.items.map((item) =>
                    item.id === itemId ? { ...item, ...updates } : item
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : c
          )
        );
      }
      return success;
    } catch (err) {
      console.error('Error updating item:', err);
      return false;
    }
  };

  const deleteItem = async (
    checklistId: string,
    itemId: string
  ): Promise<boolean> => {
    try {
      const success = await deleteChecklistItemService(checklistId, itemId);
      if (success) {
        setChecklists((prev) =>
          prev.map((c) =>
            c.id === checklistId
              ? {
                  ...c,
                  items: c.items.filter((item) => item.id !== itemId),
                  updatedAt: new Date().toISOString(),
                }
              : c
          )
        );
      }
      return success;
    } catch (err) {
      console.error('Error deleting item:', err);
      return false;
    }
  };

  const toggleItem = async (
    checklistId: string,
    itemId: string
  ): Promise<boolean> => {
    const checklist = checklists.find((c) => c.id === checklistId);
    if (!checklist) return false;

    const item = checklist.items.find((i) => i.id === itemId);
    if (!item) return false;

    return await updateItem(checklistId, itemId, { completed: !item.completed });
  };

  const value: ChecklistContextType = {
    checklists,
    loading,
    error,
    createChecklist,
    updateChecklist,
    deleteChecklist,
    getChecklist,
    addItem,
    updateItem,
    deleteItem,
    toggleItem,
    refreshChecklists,
  };

  return (
    <ChecklistContext.Provider value={value}>
      {children}
    </ChecklistContext.Provider>
  );
}

export function useChecklists() {
  const context = useContext(ChecklistContext);
  if (context === undefined) {
    throw new Error('useChecklists must be used within a ChecklistProvider');
  }
  return context;
}

import { useCallback, useState } from 'react';
import type { CalculatorConfig } from '../domain/types';
import { loadProfiles, saveProfiles } from '../storage';

/** Owns profile drafts, selection, and explicit persistence. */
export function useCalculatorProfiles() {
  const [initial] = useState(loadProfiles);
  const [profiles, setProfiles] = useState(initial.configs);
  const [activeId, setActiveId] = useState(initial.activeId);
  const [savedProfiles, setSavedProfiles] = useState(initial.configs);
  const [failedConfig, setFailedConfig] = useState<CalculatorConfig | null>(
    null,
  );
  const activeConfig =
    profiles.find((profile) => profile.id === activeId) ?? profiles[0];
  const savedProfile = savedProfiles.find((profile) => profile.id === activeId);
  const saveStatus: 'error' | 'saved' | 'unsaved' =
    failedConfig === activeConfig
      ? 'error'
      : JSON.stringify(activeConfig) === JSON.stringify(savedProfile)
        ? 'saved'
        : 'unsaved';

  const updateActive = useCallback(
    (patch: Partial<CalculatorConfig>) => {
      setProfiles((current) =>
        current.map((profile) =>
          profile.id === activeId ? { ...profile, ...patch } : profile,
        ),
      );
    },
    [activeId],
  );

  const saveCurrentProfile = () => {
    const nextSavedProfiles = savedProfile
      ? savedProfiles.map((profile) =>
          profile.id === activeId ? activeConfig : profile,
        )
      : [...savedProfiles, activeConfig];
    try {
      saveProfiles(nextSavedProfiles, activeId);
      setSavedProfiles(nextSavedProfiles);
      setFailedConfig(null);
    } catch {
      setFailedConfig(activeConfig);
    }
  };

  const addProfile = () => {
    const clone = { ...activeConfig, id: crypto.randomUUID() };
    setProfiles((current) => [...current, clone]);
    setActiveId(clone.id);
  };

  const deleteProfile = (id: string) => {
    if (profiles.length <= 1 || !profiles.some((profile) => profile.id === id))
      return;
    const remaining = profiles.filter((profile) => profile.id !== id);
    const deletedIndex = profiles.findIndex((profile) => profile.id === id);
    const nextActiveId =
      id === activeId
        ? remaining[Math.min(deletedIndex, remaining.length - 1)].id
        : activeId;
    const nextSavedProfiles = savedProfiles.filter(
      (profile) => profile.id !== id,
    );
    // Keep a stored profile if the remaining profiles are all new drafts.
    if (nextSavedProfiles.length === 0) {
      const nextProfile = remaining.find(
        (profile) => profile.id === nextActiveId,
      )!;
      nextSavedProfiles.push(nextProfile);
    }
    try {
      saveProfiles(nextSavedProfiles, nextActiveId);
      setProfiles(remaining);
      setSavedProfiles(nextSavedProfiles);
      setActiveId(nextActiveId);
      setFailedConfig(null);
    } catch {
      setFailedConfig(activeConfig);
    }
  };

  const renameProfile = (id: string, name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    setProfiles((current) =>
      current.map((profile) =>
        profile.id === id ? { ...profile, name: trimmedName } : profile,
      ),
    );
  };

  return {
    profiles,
    activeId,
    activeConfig,
    saveStatus,
    updateActive,
    saveCurrentProfile,
    addProfile,
    renameProfile,
    deleteProfile,
    selectProfile: setActiveId,
  };
}

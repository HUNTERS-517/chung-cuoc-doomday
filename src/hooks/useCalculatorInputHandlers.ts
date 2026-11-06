import { useState } from 'react';
import type { CalculatorConfig, NumericField } from '../domain/types';
import {
  applyParameterPatch,
  normalizeConfigField,
} from '../domain/validation';

/** Routes form edits into the shared config and surfaces the backup notice. */
export function useCalculatorInputHandlers(
  config: CalculatorConfig,
  updateConfig: (patch: Partial<CalculatorConfig>) => void,
) {
  const [showBackupNotice, setShowBackupNotice] = useState(false);

  const handleNumericChange = (field: NumericField, value: string) =>
    updateConfig({ [field]: value });

  const normalizeField = (field: NumericField) => {
    const { config: next, backupClamped } = normalizeConfigField(config, field);
    if (backupClamped) setShowBackupNotice(true);
    updateConfig(next);
  };

  const handleParameterChange = (patch: Partial<CalculatorConfig>) =>
    updateConfig(applyParameterPatch(config, patch));

  return {
    handleNumericChange,
    handleParameterChange,
    normalizeField,
    showBackupNotice,
    dismissBackupNotice: () => setShowBackupNotice(false),
  };
}

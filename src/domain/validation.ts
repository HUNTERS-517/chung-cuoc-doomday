import type { CalculatorConfig, NumericField } from './types';

export function parseNumericDraft(raw: string): number | null {
  const value = raw.trim();
  if (!/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(value)) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return null;
  const normalized = Math.max(0, Math.floor(parsed));
  return Number.isSafeInteger(normalized) ? normalized : null;
}

export function normalizeNumericInput(raw: string): string {
  const parsed = parseNumericDraft(raw);
  return parsed === null ? raw.trim() : String(parsed);
}

/**
 * Applies blur-time rules to one field: normalizes its text, caps guild level
 * at the max, and caps HP backup at the recovery limit.
 */
export function normalizeConfigField(
  config: CalculatorConfig,
  field: NumericField,
): { config: CalculatorConfig; backupClamped: boolean } {
  const next = { ...config, [field]: normalizeNumericInput(config[field]) };
  let backupClamped = false;
  if (field === 'guildLevel') {
    const level = parseNumericDraft(next.guildLevel);
    if (level !== null)
      next.guildLevel = String(Math.min(level, next.maxGuildLevel));
  }
  if (field === 'hpBackup' || field === 'recoveryLimit') {
    const backup = parseNumericDraft(next.hpBackup);
    const limit = parseNumericDraft(next.recoveryLimit);
    if (backup !== null && limit !== null && backup > limit) {
      next.hpBackup = String(limit);
      backupClamped = true;
    }
  }
  return { config: next, backupClamped };
}

/** Lowers the current guild level when a smaller max guild level is chosen. */
export function applyParameterPatch(
  config: CalculatorConfig,
  patch: Partial<CalculatorConfig>,
): Partial<CalculatorConfig> {
  const next = { ...patch };
  if (next.maxGuildLevel !== undefined) {
    const currentLevel = parseNumericDraft(config.guildLevel);
    if (currentLevel !== null && currentLevel > next.maxGuildLevel)
      next.guildLevel = String(next.maxGuildLevel);
  }
  return next;
}

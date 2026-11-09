import type { formulaMessages } from './formulas.i18n';

/** Formula-only text plus shared units / field labels from common messages. */
export type FormulaLabel =
  | keyof typeof formulaMessages
  | 'hours'
  | 'minutes'
  | 'days'
  | 'bottles'
  | 'recoveryLimit'
  | 'hpBackup'
  | 'hpRecoveryRate';

export interface FormulaFormat {
  formatNumber: (value: number | null) => string;
  label: (key: FormulaLabel) => string;
}

/** A calculated value and its explanation share the same input snapshot. */
export interface ResultWithFormula {
  readonly value: number | null;
  formatFormula: (context: FormulaFormat) => string;
}

export function createResultWithFormula(
  value: number | null,
  describe: (value: number | null, context: FormulaFormat) => string,
): ResultWithFormula {
  return { value, formatFormula: (context) => describe(value, context) };
}

export const MINUTES_PER_HOUR = 60;

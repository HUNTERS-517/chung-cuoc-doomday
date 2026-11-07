import {
  createResultWithFormula as resultWithFormula,
  MINUTES_PER_HOUR,
  type FormulaFormat,
} from '../resultWithFormula';

export function calculateRecoveryHp(totalMinutes: number | null, rate: number) {
  const hours =
    totalMinutes === null ? null : Math.floor(totalMinutes / MINUTES_PER_HOUR);
  const minutes =
    totalMinutes === null ? null : totalMinutes % MINUTES_PER_HOUR;
  const recoveryHpValue = totalMinutes === null ? null : totalMinutes * rate;
  const recoveryHpFormula = (
    value: number | null,
    { formatNumber: f, label: l }: FormulaFormat,
  ) =>
    `(${f(hours)} ${l('hours')} × ${f(MINUTES_PER_HOUR)} ${l('minutes')}/${l('hours')} + ${f(minutes)} ${l('minutes')}) × ${f(rate)} HP/${l('minutes')} = ${f(value)} HP`;

  return resultWithFormula(recoveryHpValue, recoveryHpFormula);
}

export function calculateResetHp(
  days: number | null,
  resetPerDay: number | null,
) {
  const resetHpValue =
    days === null || resetPerDay === null ? null : days * resetPerDay;
  const resetHpFormula = (
    value: number | null,
    { formatNumber: f, label: l }: FormulaFormat,
  ) =>
    `${f(days)} ${l('days')} × ${f(resetPerDay)} HP/${l('days')} = ${f(value)} HP`;

  return resultWithFormula(resetHpValue, resetHpFormula);
}

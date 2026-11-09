import { MINUTES_PER_HOUR } from '../../domain/resultWithFormula';
import type { CalculatorConfig } from '../../domain/types';
import type { useGuideFocusHint } from '../Guide';

/** Props shared by the editable sections of the parameter panel. */
export interface SectionProps {
  onChange: (patch: Partial<CalculatorConfig>) => void;
  /** Spread on a field wrapper to show its guide hint while focused. */
  bindHint: ReturnType<typeof useGuideFocusHint>['bind'];
}

/** Splits a minute count into whole hours and the remaining minutes. */
export function splitMinutes(total: number | null) {
  if (total === null) return { hours: null, minutes: null };
  return {
    hours: Math.floor(total / MINUTES_PER_HOUR),
    minutes: total % MINUTES_PER_HOUR,
  };
}

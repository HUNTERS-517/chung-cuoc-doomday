import type { CalculatorConfig } from './types';

export const DEFAULT_END_DATE = '2026-10-18';
export const RECOVERY_RATE_OPTIONS = [320] as const;

export function createDefaultFormValue(
  id: string = crypto.randomUUID(),
): CalculatorConfig {
  return {
    id,
    name: '',
    currentMerit: '965686',
    maxHpReset: '237478',
    currentHp: '114790',
    hpBackup: '324118',
    currentBottles: '5300',
    recoveryLimit: '949912',
    guildLevel: '40',
    maxGuildLevel: 40,
    endDate: DEFAULT_END_DATE,
    recoveryRate: 320,
    buyPackage249: true,
    buyDailyDiamonds: true,
  };
}

/** Starter profiles shown when nothing is saved yet. */
export function createDefaultProfiles(): CalculatorConfig[] {
  return [
    {
      ...createDefaultFormValue(),
      name: 'Vòng Loại',
      endDate: '2026-11-04',
      guildLevel: '27',
      maxGuildLevel: 27,
    },
    {
      ...createDefaultFormValue(),
      name: 'Vòng Chính',
      endDate: '2026-11-08',
      guildLevel: '0',
      currentMerit: '0',
      hpBackup: '0',
      currentBottles: '0',
      currentHp: '237479',
    },
  ];
}

import { describe, expect, it } from 'vitest';
import { createDefaultFormValue } from './defaultFormValue';
import { applyParameterPatch, normalizeConfigField } from './validation';

const createTestConfig = () => ({
  ...createDefaultFormValue('test'),
  hpBackup: '100',
  recoveryLimit: '500',
  guildLevel: '20',
  maxGuildLevel: 27 as const,
});

describe('normalizeConfigField', () => {
  it('normalizes the field text', () => {
    const config = { ...createTestConfig(), currentHp: ' 12.7 ' };
    expect(normalizeConfigField(config, 'currentHp').config.currentHp).toBe(
      '12',
    );
  });

  it('caps guild level at the max guild level', () => {
    const config = { ...createTestConfig(), guildLevel: '35' };
    expect(normalizeConfigField(config, 'guildLevel').config.guildLevel).toBe(
      '27',
    );
  });

  it.each(['hpBackup', 'recoveryLimit'] as const)(
    'caps HP backup at the recovery limit on %s blur',
    (field) => {
      const config = { ...createTestConfig(), hpBackup: '900' };
      const result = normalizeConfigField(config, field);
      expect(result.config.hpBackup).toBe('500');
      expect(result.backupClamped).toBe(true);
    },
  );

  it('leaves a valid backup alone', () => {
    const result = normalizeConfigField(createTestConfig(), 'hpBackup');
    expect(result.config.hpBackup).toBe('100');
    expect(result.backupClamped).toBe(false);
  });

  it('skips the cap while either value is unparsable', () => {
    const config = {
      ...createTestConfig(),
      hpBackup: '900',
      recoveryLimit: 'x',
    };
    expect(normalizeConfigField(config, 'hpBackup').backupClamped).toBe(false);
  });
});

describe('applyParameterPatch', () => {
  it('lowers guild level when the max drops below it', () => {
    const config = {
      ...createTestConfig(),
      maxGuildLevel: 40 as const,
      guildLevel: '35',
    };
    expect(applyParameterPatch(config, { maxGuildLevel: 27 })).toEqual({
      maxGuildLevel: 27,
      guildLevel: '27',
    });
  });

  it('passes other patches through unchanged', () => {
    expect(
      applyParameterPatch(createTestConfig(), { recoveryRate: 300 }),
    ).toEqual({
      recoveryRate: 300,
    });
  });
});

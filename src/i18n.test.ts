import { describe, expect, it } from 'vitest';
import { messageSources } from './i18n';

describe('i18n message sources', () => {
  it('never defines the same key in two sources', () => {
    const seen = new Set<string>();
    const duplicates: string[] = [];
    for (const source of messageSources) {
      for (const key of Object.keys(source)) {
        if (seen.has(key)) duplicates.push(key);
        seen.add(key);
      }
    }
    expect(duplicates).toEqual([]);
  });
});

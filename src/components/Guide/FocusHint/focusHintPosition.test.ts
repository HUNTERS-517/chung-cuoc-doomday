import { describe, expect, it } from 'vitest';
import { focusHintPosition } from './focusHintPosition';

describe('focus hint placement', () => {
  const size = { width: 300, height: 250 };

  it('moves above the input when the keyboard reduces the visual viewport', () => {
    const target = { top: 350, bottom: 400, left: 20 };
    const viewport = { top: 0, left: 0, width: 390, height: 800 };
    expect(focusHintPosition(target, viewport, size).top).toBe(408);
    const position = focusHintPosition(
      target,
      { ...viewport, height: 460 },
      size,
    );
    expect(position.visible).toBe(true);
    expect(position.top + position.height).toBe(target.top - 8);
  });

  it('accounts for viewport panning and constrains the hint to the larger gap', () => {
    const viewport = { top: 200, left: 30, width: 390, height: 300 };
    const target = { top: 330, bottom: 380, left: 350 };
    const position = focusHintPosition(target, viewport, size);
    expect(position).toEqual({
      left: 108,
      top: 212,
      height: 110,
      visible: true,
    });
    expect(position.top + position.height).toBeLessThan(target.top);
  });

  it('hides the hint when there is too little space or the input is offscreen', () => {
    const viewport = { top: 0, left: 0, width: 390, height: 140 };
    expect(
      focusHintPosition({ top: 50, bottom: 100, left: 20 }, viewport, size)
        .visible,
    ).toBe(false);
    expect(
      focusHintPosition({ top: -10, bottom: 40, left: 20 }, viewport, size)
        .visible,
    ).toBe(false);
  });
});

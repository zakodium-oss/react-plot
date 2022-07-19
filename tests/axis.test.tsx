import { test, expect } from '@playwright/experimental-ct-react';

import { Axis, Plot } from '../src';

import { DEFAULT_PLOT_CONFIG } from './utils';

test.describe('Axis', () => {
  test('invalid axes', async ({ mount }) => {
    await expect(async () => {
      await mount(
        <Plot {...DEFAULT_PLOT_CONFIG}>
          <Axis position="bottom" />
          <Axis position="bottom" />
        </Plot>,
      );
    }).rejects.toThrow('Plot can only have one bottom axis');
  });
});

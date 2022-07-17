import { test, expect } from '@playwright/experimental-ct-react';

import { Plot, ScatterSeries } from '../src';

import { DEFAULT_PLOT_CONFIG, data } from './utils';

test.describe('Plot', () => {
  test('simple', async ({ mount }) => {
    const component = await mount(
      <Plot {...DEFAULT_PLOT_CONFIG}>
        <ScatterSeries data={data} />
      </Plot>,
    );
    const Markers = component.locator('_react=ScatterSeries >> Circle');
    const xAxis = component.locator('_react=Axis[position="bottom"]');
    const yAxis = component.locator('_react=Axis[position="left"]');
    await expect(Markers).toHaveCount(data.length);
    await expect(xAxis).toBeEnabled();
    await expect(yAxis).toBeEnabled();
  });
});

import { test, expect } from '@playwright/experimental-ct-react';

import { Annotations, Plot, ScatterSeries } from '../src';
import { Line } from '../src/components/Annotations/Line';

import { DEFAULT_PLOT_CONFIG, data } from './utils';

test.describe('Plot', () => {
  test('simple', async ({ mount }) => {
    const component = await mount(
      <Plot {...DEFAULT_PLOT_CONFIG}>
        <ScatterSeries data={data} />
      </Plot>,
    );
    const markers = component.locator('_react=ScatterSeries >> Circle');
    const xAxis = component.locator('_react=Axis[position="bottom"]');
    const yAxis = component.locator('_react=Axis[position="left"]');
    await expect(markers).toHaveCount(data.length);
    await expect(xAxis).toBeEnabled();
    await expect(yAxis).toBeEnabled();
  });
  test('annotations', async ({ mount }) => {
    const component = await mount(
      <Plot {...DEFAULT_PLOT_CONFIG}>
        <ScatterSeries data={data} />
        <Annotations>
          <Line x1="0" x2="3" y1="0" y2="4" color="red" />
        </Annotations>
      </Plot>,
    );
    const line = component.locator(
      'line[stroke="red"][x1="0"][x2="3"][y1="0"][y2="4"]',
    );
    await expect(line).toBeEnabled();
  });
});

/* eslint-disable jest/no-standalone-expect */
import { test, expect } from '@playwright/experimental-ct-react';

import { LineSeries, Plot } from '../src';

import { DEFAULT_PLOT_CONFIG, data } from './utils';

test.describe('Plot', () => {
  test('default', async ({ mount }) => {
    const component = await mount(
      <Plot {...DEFAULT_PLOT_CONFIG}>
        <LineSeries data={data} />
      </Plot>,
    );
    const xAxis = component.locator('_react=Axis[position="bottom"]');
    const yAxis = component.locator('_react=Axis[position="left"]');
    await expect(xAxis).toBeEnabled();
    await expect(yAxis).toBeEnabled();
  });
});

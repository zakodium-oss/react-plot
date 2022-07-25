import { test, expect } from '@playwright/experimental-ct-react';

import { Annotations, Plot } from '../src';
import { Arrow } from '../src/components/Annotations/Arrow';
import { Circle } from '../src/components/Annotations/Circle';
import { Line } from '../src/components/Annotations/Line';

import { DEFAULT_PLOT_CONFIG, getInfraredSeries } from './utils';

test.describe('Annotations test', () => {
  test('all annotations', async ({ mount }) => {
    const plot = await mount(
      <Plot {...DEFAULT_PLOT_CONFIG}>
        {getInfraredSeries()}

        <Annotations>
          <Arrow x1="0" x2="3" y1="0" y2="4" color="red" />
          <Line x1="0" x2="3" y1="0" y2="4" color="red" />
          <Circle x="0" y="3" r="2" color="red" />
        </Annotations>
      </Plot>,
    );
    const arrow = plot.locator('_react=Arrow');
    const line = plot.locator('_react=Line');
    const circle = plot.locator('_react=Circle');
    await expect(arrow).toBeVisible();
    await expect(line).toBeVisible();
    await expect(circle).toBeVisible();
  });
});

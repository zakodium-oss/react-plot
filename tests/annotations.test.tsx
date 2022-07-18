import { test, expect } from '@playwright/experimental-ct-react';

import { Annotations, Plot, ScatterSeries } from '../src';
import { Arrow } from '../src/components/Annotations/Arrow';

import { DEFAULT_PLOT_CONFIG, data } from './utils';

test.describe('Annotations', () => {
  test('arrow', async ({ mount }) => {
    const component = await mount(
      <Plot {...DEFAULT_PLOT_CONFIG}>
        <ScatterSeries data={data} />
        <Annotations>
          <Arrow x1="0" x2="3" y1="0" y2="4" color="red" />
        </Annotations>
      </Plot>,
    );
    const arrowLine = component.locator(
      '_react=Arrow >> line[stroke="red"][x1="0"][x2="3"][y1="0"][y2="4"]',
    );
    await expect(arrowLine).toBeEnabled();
  });
});

import { test, expect } from '@playwright/experimental-ct-react';

import { Axis, ParallelAxis } from '../src';

import { InfraredPlotTest } from './utils';

test.describe('Axis tests', () => {
  test('all valid axes', async ({ mount }) => {
    const plot = await mount(
      <InfraredPlotTest>
        <Axis position="bottom" />
        <Axis position="left" />
        <Axis position="top" />
        <Axis position="right" />
      </InfraredPlotTest>,
    );
    const axes = plot.locator('_react=Axis');
    await expect(axes).toHaveCount(4);
  });
  test('invalid axes', async ({ mount }) => {
    await expect(async () => {
      await mount(
        <InfraredPlotTest>
          <Axis position="bottom" />
          <Axis position="bottom" />
        </InfraredPlotTest>,
      );
    }).rejects.toThrow('Plot can only have one bottom axis');
  });
  test('parallel axis', async ({ mount }) => {
    const plot = await mount(
      <InfraredPlotTest>
        <Axis id="x" position="bottom" label="X" />
        <Axis id="y" position="left" label="Y" />
        <ParallelAxis id="x" />
      </InfraredPlotTest>,
    );
    const horizontalAxes = plot.locator('_react=HorizontalAxis');
    await expect(horizontalAxes).toHaveCount(2);
  });
  test('axis scale', async ({ mount }) => {
    const linear = await mount(
      <InfraredPlotTest>
        <Axis
          position="bottom"
          scale="linear"
          paddingEnd="10%"
          paddingStart="10%"
        />
      </InfraredPlotTest>,
    );
    const defaultAxis = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000].join(
      '',
    );
    await expect(linear.locator('_react=Axis[scale="linear"]')).toHaveText(
      defaultAxis,
    );

    const log = await mount(
      <InfraredPlotTest>
        <Axis
          position="bottom"
          scale="log"
          paddingEnd="10%"
          paddingStart="10%"
        />
      </InfraredPlotTest>,
    );
    const logAxis = [1000].join('');
    await expect(log.locator('_react=Axis[scale="log"]')).toHaveText(logAxis);
    const time = await mount(
      <InfraredPlotTest>
        <Axis
          position="bottom"
          scale="time"
          paddingEnd="10%"
          paddingStart="10%"
        />
      </InfraredPlotTest>,
    );
    const timeAxis = ['.500:01', '.500:02', '.500:03', '.500:04'].join('');
    await expect(time.locator('_react=Axis[scale="time"]')).toHaveText(
      timeAxis,
    );
  });
});

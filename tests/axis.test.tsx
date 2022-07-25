import { test, expect } from '@playwright/experimental-ct-react';

import { Axis, Plot } from '../src';

import { DEFAULT_PLOT_CONFIG, getInfraredSeries } from './utils';

test.describe('Axis tests', () => {
  test('all valid axes', async ({ mount }) => {
    const plot = await mount(
      <Plot {...DEFAULT_PLOT_CONFIG}>
        {getInfraredSeries()}
        <Axis position="bottom" />
        <Axis position="left" />
        <Axis position="top" />
        <Axis position="right" />
      </Plot>,
    );
    const axes = plot.locator('_react=Axis');
    await expect(axes).toHaveCount(4);
  });
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
  test('axis scale', async ({ mount }) => {
    const defaultScale = await mount(
      <Plot {...DEFAULT_PLOT_CONFIG}>{getInfraredSeries()}</Plot>,
    );
    const linear = await mount(
      <Plot {...DEFAULT_PLOT_CONFIG}>
        {getInfraredSeries()}
        <Axis
          position="bottom"
          scale="linear"
          paddingEnd="10%"
          paddingStart="10%"
        />
      </Plot>,
    );
    expect(defaultScale).toStrictEqual(linear);
    const defaultAxis = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000].join(
      '',
    );
    await expect(linear.locator('_react=Axis[scale="linear"]')).toHaveText(
      defaultAxis,
    );

    const log = await mount(
      <Plot {...DEFAULT_PLOT_CONFIG}>
        {getInfraredSeries()}
        <Axis
          position="bottom"
          scale="log"
          paddingEnd="10%"
          paddingStart="10%"
        />
      </Plot>,
    );
    const logAxis = [1000].join('');
    await expect(log.locator('_react=Axis[scale="log"]')).toHaveText(logAxis);
    const time = await mount(
      <Plot {...DEFAULT_PLOT_CONFIG}>
        {getInfraredSeries()}
        <Axis
          position="bottom"
          scale="time"
          paddingEnd="10%"
          paddingStart="10%"
        />
      </Plot>,
    );
    const timeAxis = ['.500:01', '.500:02', '.500:03', '.500:04'].join('');
    await expect(time.locator('_react=Axis[scale="time"]')).toHaveText(
      timeAxis,
    );
  });
});

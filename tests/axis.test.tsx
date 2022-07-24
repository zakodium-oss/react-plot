import { test, expect } from '@playwright/experimental-ct-react';

import { Axis, LineSeries, Plot, ScatterSeries } from '../src';

import { DEFAULT_PLOT_CONFIG, largeData, data } from './utils';

test.describe('Axis', () => {
  test('all valid axes', async ({ mount }) => {
    const plot = await mount(
      <Plot {...DEFAULT_PLOT_CONFIG}>
        <ScatterSeries data={data} />
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
      <Plot {...DEFAULT_PLOT_CONFIG}>
        <LineSeries data={largeData} />
      </Plot>,
    );
    const linear = await mount(
      <Plot {...DEFAULT_PLOT_CONFIG}>
        <LineSeries data={largeData} />
        <Axis
          position="bottom"
          scale="linear"
          paddingEnd="10%"
          paddingStart="10%"
        />
      </Plot>,
    );
    expect(defaultScale).toStrictEqual(linear);
    const defaultAxis = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110].join('');
    await expect(linear.locator('_react=Axis[scale="linear"]')).toHaveText(
      defaultAxis,
    );

    const log = await mount(
      <Plot {...DEFAULT_PLOT_CONFIG}>
        <LineSeries data={largeData} />
        <Axis
          position="bottom"
          scale="log"
          paddingEnd="10%"
          paddingStart="10%"
        />
      </Plot>,
    );
    const logAxis = [10, 100].join('');
    await expect(log.locator('_react=Axis[scale="log"]')).toHaveText(logAxis);
    const time = await mount(
      <Plot {...DEFAULT_PLOT_CONFIG}>
        <LineSeries data={largeData} />
        <Axis
          position="bottom"
          scale="time"
          paddingEnd="10%"
          paddingStart="10%"
        />
      </Plot>,
    );
    const timeAxis = [
      '.010',
      '.020',
      '.030',
      '.040',
      '.050',
      '.060',
      '.070',
      '.080',
      '.090',
      '.100',
      '.110',
    ].join('');
    await expect(time.locator('_react=Axis[scale="time"]')).toHaveText(
      timeAxis,
    );
  });
});

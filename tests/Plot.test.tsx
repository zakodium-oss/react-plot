import { test, expect } from '@playwright/experimental-ct-react';

import {
  Annotations,
  Axis,
  BarSeries,
  FunctionSeries,
  Heading,
  Legend,
  LineSeries,
  Plot,
  RangeSeries,
  ScatterSeries,
} from '../src';
import { Line } from '../src/components/Annotations/Line';

import { DEFAULT_PLOT_CONFIG, data, rangeData } from './utils';

test.describe('Plot', () => {
  test('default Plot children', async ({ mount }) => {
    const plot = await mount(
      <Plot {...DEFAULT_PLOT_CONFIG}>
        <ScatterSeries data={data} />
      </Plot>,
    );
    const markers = plot.locator('_react=ScatterSeries >> Circle');
    const xAxis = plot.locator('_react=Axis[position="bottom"]');
    const yAxis = plot.locator('_react=Axis[position="left"]');
    await expect(markers).toHaveCount(data.length);
    await expect(xAxis).toBeEnabled();
    await expect(yAxis).toBeEnabled();
  });
  test('Plot children', async ({ mount }) => {
    const plot = await mount(
      <Plot {...DEFAULT_PLOT_CONFIG}>
        <ScatterSeries data={data} label="scatter" />
        <LineSeries data={data} label="line" />
        <BarSeries data={data} label="bar" />
        <FunctionSeries getY={(x) => x} label="function" />
        <RangeSeries data={rangeData} label="range" />
        <Heading title="heading" />
        <Legend />
        <Axis position="bottom" />
        <Axis position="left" />
        <Annotations>
          <Line x1="0" x2="3" y1="0" y2="4" />
        </Annotations>
      </Plot>,
    );
    await expect(plot.locator('_react=Axis')).toHaveCount(2);
    await expect(plot.locator('_react=Heading')).toHaveText('heading');
    // todo: must have bar series
    await expect(plot.locator('_react=Legend')).toHaveText(
      'scatterlinefunctionrange',
    );
  });
});

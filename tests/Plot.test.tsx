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

import {
  DEFAULT_PLOT_CONFIG,
  data,
  rangeData,
  getInfraredSeries,
} from './utils';

test.describe('Plot tests', () => {
  test('empty plot', async ({ mount }) => {
    const plot = await mount(
      <Plot {...DEFAULT_PLOT_CONFIG}>
        <Axis position="bottom" />
        <Axis position="left" />
      </Plot>,
    );
    await expect(plot).toBeEmpty();
    await expect(plot.locator('_react=Axis')).toHaveCount(0);
  });
  test('default Plot children with series', async ({ mount }) => {
    const plot = await mount(
      <Plot {...DEFAULT_PLOT_CONFIG}>{getInfraredSeries()}</Plot>,
    );
    const series = plot.locator('_react=ScatterSeries');
    const xAxis = plot.locator('_react=Axis[position="bottom"]');
    const yAxis = plot.locator('_react=Axis[position="left"]');
    await expect(series).toBeEnabled();
    await expect(xAxis).toBeEnabled();
    await expect(yAxis).toBeEnabled();
  });
  test('valid plot children', async ({ mount }) => {
    const plot = await mount(
      <Plot {...DEFAULT_PLOT_CONFIG}>
        <ScatterSeries data={data} label="Scatter" />
        <LineSeries data={data} label="Line" />
        <BarSeries data={data} label="Bar" />
        <FunctionSeries getY={(x) => x} label="Function" />
        <RangeSeries data={rangeData} label="Range" />
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
    await expect(plot.locator('_react=Legend')).toHaveText(
      'BarScatterLineFunctionRange',
    );
    await expect(
      plot.locator('_react=ScatterSeries[label="Scatter"] >> circle'),
    ).toHaveCount(data.length);
    await expect(
      plot.locator('_react=LineSeries[label="Line"] >> path'),
    ).toBeEnabled();
    await expect(
      plot.locator('_react=FunctionSeries[label="Function"] >> path'),
    ).toBeEnabled();
    await expect(
      plot.locator('_react=RangeSeries[label="Range"]'),
    ).toBeEnabled();
    await expect(plot.locator('_react=BarSeries >> line')).toHaveCount(
      data.length,
    );
    await expect(
      plot.locator('_react=Annotations >> _react=Line'),
    ).toBeEnabled();
  });
  test('invalid plot child', async ({ mount }) => {
    await expect(async () => {
      await mount(
        <Plot {...DEFAULT_PLOT_CONFIG}>
          <div>invalid child</div>
        </Plot>,
      );
    }).rejects.toThrow('invalid plot child');
  });
  test('plot height and width', async ({ mount }) => {
    const plot = await mount(
      <Plot {...DEFAULT_PLOT_CONFIG}>{getInfraredSeries()}</Plot>,
    );
    expect(await plot.evaluate((node) => node.clientWidth)).toBe(
      DEFAULT_PLOT_CONFIG.width,
    );
    expect(await plot.evaluate((node) => node.clientHeight)).toBe(
      DEFAULT_PLOT_CONFIG.height,
    );
  });
});

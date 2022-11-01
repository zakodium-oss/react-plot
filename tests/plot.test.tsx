import { test, expect } from '@playwright/experimental-ct-react';

import {
  Annotations,
  Axis,
  BarSeries,
  Heading,
  Legend,
  LineSeries,
  Plot,
  RangeSeries,
  ScatterSeries,
} from '../src';
import { Line } from '../src/components/Annotations/Line';

import { InfraredPlotTest } from './utils';

const DEFAULT_PLOT_CONFIG = {
  width: 900,
  height: 540,
};
const data = [
  {
    x: 0,
    y: 10,
  },
  {
    x: 1,
    y: 12,
  },
  {
    x: 2,
    y: 14,
  },
  {
    x: 3,
    y: 16,
  },
  {
    x: 4,
    y: 18,
  },
];

const rangeData = [
  {
    x: 1,
    y1: -3,
    y2: 4,
  },
  {
    x: 2,
    y1: -2,
    y2: 5,
  },
  {
    x: 3,
    y1: 2,
    y2: 10,
  },
  {
    x: 4,
    y1: 7,
    y2: 16,
  },
  {
    x: 5,
    y1: 12,
    y2: 22,
  },
];

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
  const plot = await mount(<InfraredPlotTest />);
  const series = plot.locator('_react=ScatterSeries');
  const xAxis = plot.locator('_react=Axis[position="bottom"]');
  const yAxis = plot.locator('_react=Axis[position="left"]');
  await expect(series).toBeVisible();
  await expect(xAxis).toBeVisible();
  await expect(yAxis).toBeVisible();
});

test('valid plot children', async ({ mount }) => {
  const plot = await mount(
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <ScatterSeries data={data} label="Scatter" />
      <LineSeries data={data} label="Line" />
      <BarSeries data={data} label="Bar" />
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
  await expect(plot.locator('_react=Legend')).toHaveText('ScatterLineBarRange');
  await expect(
    plot.locator('_react=ScatterSeries[label="Scatter"] >> circle'),
  ).toHaveCount(data.length);
  await expect(
    plot.locator('_react=LineSeries[label="Line"] >> path'),
  ).toBeVisible();
  await expect(plot.locator('_react=RangeSeries[label="Range"]')).toBeVisible();
  await expect(plot.locator('_react=BarSeries >> line')).toHaveCount(
    data.length,
  );
  await expect(plot.locator('_react=Annotations >> _react=Line')).toBeVisible();
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
  const plot = await mount(<InfraredPlotTest />);
  expect(await plot.evaluate((node) => node.clientWidth)).toBe(
    DEFAULT_PLOT_CONFIG.width,
  );
  expect(await plot.evaluate((node) => node.clientHeight)).toBe(
    DEFAULT_PLOT_CONFIG.height,
  );
});

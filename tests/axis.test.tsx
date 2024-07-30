import { expect, test } from '@playwright/experimental-ct-react';

import { Axis, LineSeries, ParallelAxis } from '../src';
import { TestErrorBoundary } from '../stories/utils';

import { DefaultPlotTest, InfraredPlotTest } from './utils';

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
  const result = await mount(
    <TestErrorBoundary>
      <InfraredPlotTest>
        <Axis position="bottom" />
        <Axis position="bottom" />
      </InfraredPlotTest>
    </TestErrorBoundary>,
  );
  await expect(result).toContainText('Plot can only have one bottom axis');
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

test('axis scale linear', async ({ mount }) => {
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
  const defaultAxis = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000].join('');
  await expect(linear.locator('_react=Axis[scale="linear"]')).toHaveText(
    defaultAxis,
  );
});

test('axis scale log', async ({ mount }) => {
  const log = await mount(
    <InfraredPlotTest>
      <Axis position="bottom" scale="log" paddingEnd="10%" paddingStart="10%" />
    </InfraredPlotTest>,
  );
  const logAxis = [1000].join('');
  await expect(log.locator('_react=Axis[scale="log"]')).toHaveText(logAxis);
});

test('axis scale time', async ({ mount }) => {
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
  await expect(time.locator('_react=Axis[scale="time"]')).toHaveText(timeAxis);
});

test('constant x axis', async ({ mount }) => {
  const plot = await mount(
    <DefaultPlotTest>
      <LineSeries
        data={[
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 0, y: 4 },
        ]}
      />
    </DefaultPlotTest>,
  );
  await expect(plot.locator('_react=HorizontalAxis >> text=0')).toBeVisible();
});

test('constant y axis', async ({ mount }) => {
  const plot = await mount(
    <DefaultPlotTest>
      <LineSeries
        data={[
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 4, y: 0 },
        ]}
      />
    </DefaultPlotTest>,
  );
  await expect(plot.locator('_react=VerticalAxis >> text=0')).toBeVisible();
});

test('constant x and y axes', async ({ mount }) => {
  const plot = await mount(
    <DefaultPlotTest>
      <LineSeries
        data={[
          { x: 1, y: 2 },
          { x: 1, y: 2 },
          { x: 1, y: 2 },
        ]}
      />
    </DefaultPlotTest>,
  );
  await expect(plot.locator('_react=HorizontalAxis >> text=1')).toBeVisible();
  await expect(plot.locator('_react=VerticalAxis >> text=2')).toBeVisible();
});

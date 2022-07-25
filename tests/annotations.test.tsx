import { test, expect } from '@playwright/experimental-ct-react';

import { Annotations, Plot } from '../src';
import { Arrow } from '../src/components/Annotations/Arrow';
import { BoxPlot } from '../src/components/Annotations/BoxPlot';
import { Circle } from '../src/components/Annotations/Circle';
import { DirectedEllipse } from '../src/components/Annotations/DirectedEllipse';
import { Ellipse } from '../src/components/Annotations/Ellipse';
import { Group } from '../src/components/Annotations/Group';
import { Line } from '../src/components/Annotations/Line';
import { Polygon } from '../src/components/Annotations/Polygon';
import { Polyline } from '../src/components/Annotations/Polyline';
import { Rectangle } from '../src/components/Annotations/Rectangle';
import { Shape } from '../src/components/Annotations/Shape';
import { Text } from '../src/components/Annotations/Text';

import {
  AnnotationsCallback,
  DEFAULT_PLOT_CONFIG,
  getInfraredSeries,
} from './utils';

test.describe('Annotations test', () => {
  test('common annotations', async ({ mount }) => {
    const plot = await mount(
      <Plot {...DEFAULT_PLOT_CONFIG}>
        {getInfraredSeries()}

        <Annotations>
          <Arrow x1="0" x2="3" y1="0" y2="4" />
          <Line x1="0" x2="3" y1="0" y2="4" />
          <Circle x="0" y="0" r="400" />
          <Ellipse x="0" y="0" rx="400" ry="500" />
          <BoxPlot
            y="50"
            q1="1500"
            q3="3000"
            width="30"
            min="1000"
            max="3500"
            median="2300"
          />
          <DirectedEllipse x1="0" x2="3" y1="0" y2="4" width="5" />
          <Polygon
            points={[
              { x: '20', y: '70' },
              { x: '2000', y: '8' },
            ]}
          />
          <Polyline
            points={[
              { x: '20', y: '70' },
              { x: '2000', y: '8' },
            ]}
          />
          <Rectangle x1="0" x2="3" y1="0" y2="4" />
          <Shape x="20" y="70" shape="diamond" size={20} />
          <Group x="3" y="0">
            <Text x="0" y="0">
              Hello, World!
            </Text>
          </Group>
        </Annotations>
      </Plot>,
    );
    await expect(plot.locator('_react=Arrow')).toBeVisible();
    await expect(plot.locator('_react=Line')).toBeVisible();
    await expect(plot.locator('_react=Polygon')).toBeVisible();
    await expect(plot.locator('_react=Polyline')).toBeVisible();
    await expect(plot.locator('_react=BoxPlot')).toBeVisible();
    await expect(plot.locator('_react=DirectedEllipse')).toBeVisible();
    await expect(plot.locator('_react=Ellipse')).toBeVisible();
    await expect(plot.locator('Circle[r="400"]')).toBeVisible();
    await expect(plot.locator('_react=Group')).toBeVisible();
    await expect(plot.locator('_react=Text')).toBeVisible();
    await expect(plot.locator('_react=Shape')).toBeVisible();
  });

  test('uncommon annotation', async ({ mount }) => {
    const plot = await mount(
      <Plot {...DEFAULT_PLOT_CONFIG}>
        {getInfraredSeries()}
        <Annotations>
          <div>test</div>
        </Annotations>
      </Plot>,
    );
    await expect(plot.locator('_react=Annotations')).toHaveText('test');
  });
  test('annotations callback', async ({ mount }) => {
    const plot = await mount(<AnnotationsCallback />);

    await expect(plot.locator('_react=Arrow[color="red"]')).toBeVisible();
    await expect(plot.locator('_react=Line[color="black"]')).toBeVisible();
    await plot.locator('_react=Line').click();
    await expect(plot.locator('_react=Arrow[color="black"]')).toBeVisible();
    await expect(plot.locator('_react=Line[color="red"]')).toBeVisible();
    await plot.locator('_react=Arrow').click();
    await expect(plot.locator('_react=Arrow[color="red"]')).toBeVisible();
    await expect(plot.locator('_react=Line[color="black"]')).toBeVisible();
  });
});

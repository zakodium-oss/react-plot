import { expect, test } from '@playwright/experimental-ct-react';

import { Annotation, Annotations } from '../src/index.js';

import { AnnotationsCallback, InfraredPlotTest } from './utils.js';

test('valid annotations', async ({ mount }) => {
  const plot = await mount(
    <InfraredPlotTest>
      <Annotations>
        <div>
          <span>uncommon annotation</span>
        </div>
        <Annotation.Arrow x1="0" x2="3" y1="0" y2="4" />
        <Annotation.Line x1="0" x2="3" y1="0" y2="4" />
        <Annotation.Circle x="0" y="0" r="400" />
        <Annotation.Ellipse x="0" y="0" rx="400" ry="500" />
        <Annotation.BoxPlot
          y="50"
          q1="1500"
          q3="3000"
          width="30"
          min="1000"
          max="3500"
          median="2300"
        />
        <Annotation.DirectedEllipse x1="0" x2="3" y1="0" y2="4" width="5" />
        <Annotation.Polygon
          color="blue"
          points={[
            { x: 800, y: 10 },
            { x: 1500, y: 15 },
            { x: 1300, y: 5 },
          ]}
        />
        <Annotation.Polyline
          color="green"
          points={[
            { x: 2000, y: 20 },
            { x: 2500, y: 25 },
            { x: 2200, y: 30 },
            { x: 2000, y: 20 },
          ]}
        />
        <Annotation.Rectangle x1="0" x2="3" y1="0" y2="4" />
        <Annotation.Shape x="20" y="70" shape="diamond" size={20} />
        <Annotation.Group x="3" y="0">
          <Annotation.Text x="0" y="0">
            Hello, World!
          </Annotation.Text>
        </Annotation.Group>
      </Annotations>
    </InfraredPlotTest>,
  );
  await expect(plot.locator('_react=Arrow')).toBeVisible();
  await expect(plot.locator('_react=Line')).toBeVisible();
  await expect(plot.locator('_react=Polygon')).toBeVisible();
  await expect(plot.locator('_react=Polyline')).toBeVisible();
  await expect(plot.locator('_react=BoxPlot')).toBeVisible();
  await expect(plot.locator('_react=DirectedEllipse')).toBeVisible();
  await expect(plot.locator('_react=Ellipse')).toBeVisible();
  await expect(plot.locator('circle[r="400"]')).toBeVisible();
  await expect(plot.locator('_react=Group')).toBeVisible();
  await expect(plot.locator('_react=Text')).toBeVisible();
  await expect(plot.locator('_react=Shape')).toBeVisible();

  // uncommon annotation
  await expect(plot.locator('_react=Annotations >> span')).toHaveText(
    'uncommon annotation',
  );
});

test('annotation callbacks', async ({ mount }) => {
  const plot = await mount(<AnnotationsCallback />);

  await expect(plot.locator('_react=Arrow[color="red"]')).toBeVisible();
  await expect(
    plot.locator('_react=DirectedEllipse[color="black"]'),
  ).toBeVisible();
  await plot.locator('_react=DirectedEllipse').click();
  await expect(plot.locator('_react=Arrow[color="black"]')).toBeVisible();
  await expect(
    plot.locator('_react=DirectedEllipse[color="red"]'),
  ).toBeVisible();
  await plot.locator('_react=Arrow').click();
  await expect(plot.locator('_react=Arrow[color="red"]')).toBeVisible();
  await expect(
    plot.locator('_react=DirectedEllipse[color="black"]'),
  ).toBeVisible();
});

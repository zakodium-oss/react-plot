import { test, expect } from '@playwright/experimental-ct-react';

import { AllAnnotations, AnnotationsCallback } from './utils';

test.describe('Annotations test', () => {
  test('valid annotations', async ({ mount }) => {
    const plot = await mount(<AllAnnotations />);
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
  test('annotations callback', async ({ mount }) => {
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
});

import { expect, test } from '@playwright/experimental-ct-react';

import { ServerSide } from './utils';

test('should render a plot in server-side mode', async ({ mount }) => {
  const plot = await mount(<ServerSide />);
  const html = await plot.innerHTML();
  expect(html).toContain('svg');
});

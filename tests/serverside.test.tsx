import { test, expect } from '@playwright/experimental-ct-react';
import { InfraredPlotTest, ServerSide } from './utils';

test('should render a plot in server-side mode', async ({ mount }) => {
  const serverPlot = await mount(<ServerSide />);
  const clientPlot = await mount(<InfraredPlotTest />);
  const ServerHtml = await serverPlot.innerHTML();
  const ClientHtml = await clientPlot.innerHTML();
  expect(ServerHtml).toBe(ClientHtml);

  // compare screen shots
  const serverImage = await serverPlot.screenshot();
  const clientImage = await clientPlot.screenshot();
  expect(serverImage).toStrictEqual(clientImage);
});

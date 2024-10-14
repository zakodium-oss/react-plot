import type { Meta } from '@storybook/react';

import {
  Annotations,
  Plot,
  PlotController,
  useRectangularZoom,
} from '../../src/index.js';
import { getInfraredSeries } from '../utils.js';

export default {
  title: 'Examples/Parallel Zoom',
} satisfies Meta;

export function ParallelZoom() {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <PlotController>
          <ZoomablePlot />
          <ZoomablePlot />
        </PlotController>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <PlotController>
          <ZoomablePlot />
          <ZoomablePlot />
        </PlotController>
      </div>
    </>
  );
}

function ZoomablePlot() {
  const zoom = useRectangularZoom();
  return (
    <Plot width={400} height={400}>
      {getInfraredSeries()}
      <Annotations>{zoom.annotations}</Annotations>
    </Plot>
  );
}

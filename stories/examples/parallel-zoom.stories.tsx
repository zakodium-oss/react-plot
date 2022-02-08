import { Meta } from '@storybook/react';

import {
  Annotations,
  Plot,
  PlotController,
  useRectangularZoom,
} from '../../src';
import { getInfraredSeries } from '../utils';

export default {
  title: 'Examples/Parallel Zoom',
} as Meta;

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

import { Meta } from '@storybook/react';

import {
  Annotations,
  Plot,
  PlotController,
  useRectangularZoom,
} from '../../src';
import { getInfraredSeries } from '../utils';

export default {
  title: 'Examples/Nested Zoom',
} satisfies Meta;

export function NestedZoom() {
  return (
    <PlotController>
      <PlotController id="other">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <ZoomablePlot controllerId="other" color="gold" />
          <ZoomablePlot />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <ZoomablePlot />
          <ZoomablePlot controllerId="other" color="gold" />
        </div>
      </PlotController>
    </PlotController>
  );
}

function ZoomablePlot(props: { controllerId?: string; color?: string }) {
  const zoom = useRectangularZoom({
    controllerId: props.controllerId,
    color: props.color,
  });
  return (
    <Plot width={400} height={400} controllerId={props.controllerId}>
      {getInfraredSeries()}
      <Annotations>{zoom.annotations}</Annotations>
    </Plot>
  );
}

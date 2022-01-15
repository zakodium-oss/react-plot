import { Meta } from '@storybook/react';

import { Axis, Legend, LineSeries, Plot, LineSeriesProps } from '../../src';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'API/LineSeries',
  component: LineSeries,
  args: {
    displayMarker: true,
    lineStyle: {
      stroke: 'black',
    },
    markerStyle: { fill: 'black' },

    hidden: false,
    label: 'Label',

    markerShape: 'circle',

    markerSize: 10,
    // ErrorBars props
    displayErrorBars: true,

    errorBarsCapSize: 10,
    errorBarsStyle: { strokeWidth: 1 },

    errorBarsCapStyle: { stroke: 'blue' },

    // Disable unnecessary controls
    data: [
      {
        x: 0,
        y: 10,
        xError: 0.2,
        yError: 1,
      },
      {
        x: 1,
        y: 12,
        xError: [0.1, 0.1],
        yError: [0.5, 0.5],
      },
      {
        x: 2,
        y: 14,
        xError: [0.2, null],
        yError: [0, 0.5],
      },
      {
        x: 3,
        y: 16,
        xError: [0.1, 0.2],
        yError: null,
      },
      {
        x: 4,
        y: 18,
        xError: 0.2,
        yError: 0.5,
      },
    ],
  },
} as Meta<LineSeriesProps>;

export function Control(props: LineSeriesProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <LineSeries {...props} xAxis="x" yAxis="y" />
      <Axis id="x" position="bottom" />
      <Axis id="y" position="left" paddingStart={0.1} paddingEnd={0.1} />

      <Legend position="embedded" />
    </Plot>
  );
}

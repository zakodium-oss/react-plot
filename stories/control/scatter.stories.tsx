import type { Meta } from '@storybook/react';

import {
  Axis,
  Legend,
  Plot,
  ScatterSeries,
  type ScatterSeriesProps,
  type SeriesPoint,
  type SeriesPointWithError,
} from '../../src/index.js';
import { DEFAULT_PLOT_CONFIG } from '../utils.js';

export default {
  title: 'API/ScatterSeries',
  component: ScatterSeries,
  args: {
    hidden: false,
    label: 'Label',
    markerShape: 'circle',
    markerSize: 5,
    xShift: '0',
    yShift: '0',
    xAxis: 'x',
    yAxis: 'y',
    // ErrorBars props
    displayErrorBars: true,
    errorBarsCapSize: 10,
    errorBarsStyle: { strokeWidth: 1 },
    errorBarsCapStyle: { stroke: 'blue' },
  },
} satisfies Meta;

const data: SeriesPointWithError[] = [
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
];

export function Control(props: ScatterSeriesProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <Legend position="embedded" />

      <ScatterSeries {...props} data={data} xAxis="x" yAxis="y" />
      <Axis
        id="x"
        position="bottom"
        label="X"
        paddingEnd="10%"
        paddingStart="10%"
      />
      <Axis
        id="y"
        position="left"
        label="Y"
        paddingEnd="10%"
        paddingStart="10%"
      />
    </Plot>
  );
}
export function DisplayLines(props: ScatterSeriesProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <Legend position="embedded" />

      <ScatterSeries {...props} data={data} xAxis="x" yAxis="y" />
      <Axis
        id="x"
        position="bottom"
        label="X"
        paddingEnd="10%"
        paddingStart="10%"
      />
      <Axis
        id="y"
        position="left"
        label="Y"
        paddingEnd="10%"
        paddingStart="10%"
      />
    </Plot>
  );
}
DisplayLines.args = {
  displayLines: true,
  lineStyle: {
    stroke: ({ y }: SeriesPoint) => {
      return y > 14 ? 'red' : 'green';
    },
  },
  displayErrorBars: false,
};

import { Meta } from '@storybook/react';

import {
  Axis,
  Legend,
  LineSeries,
  Plot,
  LineSeriesProps,
  SeriesPoint,
} from '../../src';
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
    xShift: '0',
    yShift: '0',
    xAxis: 'x',
    yAxis: 'y',
    hidden: false,
    label: 'Label',
    markerShape: 'circle',

    markerSize: 10,
    // ErrorBars props
    displayErrorBars: true,

    errorBarsCapSize: 10,
    errorBarsStyle: { strokeWidth: 1 },

    errorBarsCapStyle: { stroke: 'blue' },
  },
} as Meta<LineSeriesProps>;
const data: SeriesPoint[] = [
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
export function Control(props: LineSeriesProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <LineSeries {...props} data={data} xAxis="x" yAxis="y" />
      <Axis id="x" position="bottom" />
      <Axis id="y" position="left" paddingStart="10%" paddingEnd="10%" />

      <Legend position="embedded" />
    </Plot>
  );
}
const data2 = [
  { x: 1, y: 10 },
  { x: 2, y: 5 },
  { x: 3, y: 3 },
  { x: 4, y: 5 },
  { x: 5, y: 10 },
  { x: 8, y: 5 },
  { x: 9, y: 1 },
];
export function GradientLine() {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <LineSeries
        data={data2}
        xAxis="x"
        yAxis="y"
        lineStyle={{ strokeWidth: 2 }}
        gradientStyle={({ x }: SeriesPoint) => {
          if (x <= 1) return 'red';
          if (x >= 8) return 'blue';
          return undefined;
        }}
      />
      <Axis id="x" position="bottom" label="X" />
      <Axis id="y" position="left" label="Y" paddingEnd="10%" />
    </Plot>
  );
}

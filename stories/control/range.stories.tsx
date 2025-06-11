import type { Meta } from '@storybook/react-vite';

import type { RangeSeriesPoint, RangeSeriesProps } from '../../src/index.js';
import {
  Axis,
  Legend,
  LineSeries,
  Plot,
  RangeSeries,
} from '../../src/index.js';
import { DEFAULT_PLOT_CONFIG } from '../utils.js';

export default {
  title: 'API/RangeSeries',
  component: RangeSeries,
  args: {
    lineStyle: {
      stroke: 'green',
      fill: 'yellow',
    },
    xShift: '0',
    yShift: '0',
    xAxis: 'x',
    yAxis: 'y',
    hidden: false,
    label: 'Label',
  },
} satisfies Meta;

const data2 = [
  {
    x: 1,
    y1: 4,
    y2: 6,
  },
  {
    x: 2,
    y1: 6,
    y2: 8,
  },
  {
    x: 3,
    y1: 8,
    y2: 12,
  },
];

const data = [
  {
    x: 1,
    y1: -3,
    y2: 4,
  },
  {
    x: 2,
    y1: -2,
    y2: 5,
  },
  {
    x: 3,
    y1: 2,
    y2: 10,
  },
  {
    x: 4,
    y1: 7,
    y2: 16,
  },
  {
    x: 5,
    y1: 12,
    y2: 22,
  },
  {
    x: 6,
    y1: 18,
    y2: 26,
  },
  {
    x: 7,
    y1: 20,
    y2: 29,
  },
  {
    x: 8,
    y1: 20,
    y2: 28,
  },
  {
    x: 9,
    y1: 16,
    y2: 24,
  },
  {
    x: 10,
    y1: 10,
    y2: 18,
  },
  {
    x: 11,
    y1: 5,
    y2: 12,
  },
  {
    x: 12,
    y1: 0,
    y2: 6,
  },
];

export function Control(props: RangeSeriesProps<RangeSeriesPoint>) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <Legend position="embedded" />

      <RangeSeries {...props} data={data} xAxis="x" yAxis="y" />
      <RangeSeries
        lineStyle={{ fill: 'red', stroke: 'blue' }}
        label="Data 2"
        data={data2}
        xAxis="x"
        yAxis="y"
      />

      <LineSeries
        data={[
          { x: 4, y: 1 },
          { x: 5, y: 5 },
          { x: 6, y: 10 },
        ]}
        label="Data 3"
      />

      <Axis id="x" position="bottom" label="Month" />
      <Axis id="y" position="left" label="Average temperatures" />
    </Plot>
  );
}

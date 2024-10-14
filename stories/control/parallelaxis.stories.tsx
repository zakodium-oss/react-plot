import type { Meta } from '@storybook/react';

import {
  Axis,
  LineSeries,
  ParallelAxis,
  type ParallelAxisProps,
  Plot,
} from '../../src/index.js';
import { DEFAULT_PLOT_CONFIG } from '../utils.js';

export default {
  title: 'API/ParallelAxis',
  component: ParallelAxis,
  args: {
    id: 'x',
    label: 'Parallel axis',
  },
} satisfies Meta<ParallelAxisProps>;

const data = [
  { x: 0, y: 10 },
  { x: 1, y: 12 },
  { x: 2, y: 14 },
  { x: 3, y: 16 },
  { x: 4, y: 18 },
];
export function Control(props: ParallelAxisProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <LineSeries data={data} xAxis="x" yAxis="y" />
      <Axis id="x" position="bottom" label="X" />
      <Axis id="y" position="left" label="Y" />
      <ParallelAxis {...props} />
    </Plot>
  );
}

const data2 = [
  { x: 1, y: -2 },
  { x: 2, y: 3 },
  { x: 3, y: 5 },
  { x: 4, y: 15 },
  { x: 5, y: 25 },
  { x: 6, y: 31 },
  { x: 7, y: 34 },
  { x: 8, y: 30 },
  { x: 9, y: 26 },
  { x: 10, y: 10 },
  { x: 11, y: 6 },
  { x: 12, y: -3 },
];
function toFahrenheit(x: number) {
  return `${(x * 9) / 5 + 32}`;
}
export function WithTickFormat(props: ParallelAxisProps) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <LineSeries data={data2} xAxis="x" yAxis="y" displayMarkers />
      <Axis
        id="x"
        position="bottom"
        label="months"
        tickLabelFormat={(x: number) => months[x - 1]}
      />
      <Axis
        id="y"
        position="left"
        label="temperature (°C)"
        paddingEnd="10%"
        paddingStart="10%"
      />
      <ParallelAxis {...props} />
    </Plot>
  );
}
WithTickFormat.args = {
  id: 'y',
  label: 'temperature (°F)',
  tickLabelFormat: toFahrenheit,
};

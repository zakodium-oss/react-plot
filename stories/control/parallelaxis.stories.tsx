import { Meta } from '@storybook/react';

import {
  Axis,
  ParallelAxis,
  LineSeries,
  Plot,
  ParallelAxisProps,
} from '../../src';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'API/ParallelAxis',
  component: ParallelAxis,
  argTypes: {
    id: { defaultValue: 'x', options: ['x', 'y'], control: { type: 'select' } },
    label: { defaultValue: 'Duplicate', control: 'text' },
  },
} as Meta;

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

import { Meta } from '@storybook/react';

import {
  Axis,
  ParallelAxis,
  LineSeries,
  Plot,
  PlotProps,
  ParallelAxisProps,
} from '../../src';

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

const plot: Omit<PlotProps, 'children'> = {
  width: 900,
  height: 540,
  seriesViewportStyle: {
    stroke: 'black',
  },
};

export function Control(props: ParallelAxisProps) {
  return (
    <Plot {...plot}>
      <LineSeries data={data} xAxis="x" yAxis="y" />
      <Axis id="x" position="bottom" label="X" />
      <Axis id="y" position="left" labelSpace={35} label="Y" />
      <ParallelAxis {...props} />
    </Plot>
  );
}

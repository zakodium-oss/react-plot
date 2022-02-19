import { Meta } from '@storybook/react';

import { Axis, Legend, LineSeries, Plot, PlotProps } from '../../src';

export default {
  title: 'API/Plot',
  component: Plot,
} as Meta;

const data = [
  {
    x: 0,
    y: 10,
  },
  {
    x: 1,
    y: 12,
  },
  {
    x: 2,
    y: 14,
  },
  {
    x: 3,
    y: 16,
  },
  {
    x: 4,
    y: 18,
  },
];

export function Control(args: PlotProps) {
  return (
    <Plot {...args}>
      <Legend position="embedded" />
      <LineSeries data={data} xAxis="x" yAxis="y" label="Line" />
      <Axis id="x" position="bottom" />
      <Axis id="y" position="left" paddingStart="10%" paddingEnd="10%" />
    </Plot>
  );
}

Control.args = {
  width: 900,
  height: 540,
  seriesViewportStyle: { stroke: 'black' },
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
} as PlotProps;

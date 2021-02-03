import { Meta } from '@storybook/react';
import React from 'react';

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

export function PlotControl(args: PlotProps) {
  return (
    <Plot {...args}>
      <Legend position="embedded" />
      <LineSeries data={data} xAxis="x" yAxis="y" label="Line" />
      <Axis id="x" position="bottom" label="Label One" />
      <Axis
        id="y"
        position="left"
        label="Label two"
        paddingStart={0.1}
        paddingEnd={0.1}
      />
    </Plot>
  );
}

PlotControl.args = {
  width: 900,
  height: 540,
  viewportStyle: { stroke: 'black' },
  margin: {
    top: 40,
    right: 40,
    bottom: 45,
    left: 40,
  },
} as PlotProps;

import { Meta } from '@storybook/react';
import React from 'react';

import { Axis, Legend, LegendProps, LineSeries, Plot } from '../../src';

export default {
  title: 'API/Legend',
  component: Legend,
  argTypes: {
    position: {
      defaultValue: 'embedded',
    },
  },
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

export function HeadingControl(props: LegendProps) {
  return (
    <Plot
      width={900}
      height={540}
      viewportStyle={{ stroke: 'black' }}
      margin={{
        bottom: 100,
        left: 100,
        top: 100,
        right: 200,
      }}
    >
      <Legend {...props} />
      <LineSeries data={data} xAxis="x" yAxis="y" label="Label line series" />
      <Axis id="x" position="bottom" label="X" />
      <Axis id="y" position="left" label="Y" />
    </Plot>
  );
}

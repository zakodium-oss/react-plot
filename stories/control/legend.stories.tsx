import { Meta } from '@storybook/react';
import React from 'react';

import { Axis, Legend, LineSeries, Plot } from '../../src';

enum Position {
  'bottom' = 'bottom',
  'embedded' = 'embedded',
  'left' = 'left',
  'right' = 'right',
  'top' = 'top',
}

export default {
  title: 'Control/Legend',
  argTypes: {
    position: {
      control: { type: 'select', options: Position },
      defaultValue: Position.embedded,
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

interface LegendControlProps {
  position: Position;
}

export function HeadingControl(props: LegendControlProps) {
  return (
    <Plot
      width={1500}
      height={540}
      viewportStyle={{ stroke: 'black' }}
      margin={{
        bottom: 100,
        left: 40,
        top: 40,
        right: 40,
      }}
    >
      <Legend {...props} />
      <LineSeries data={data} xAxis="x" yAxis="y" label="Label line series" />
      <Axis id="x" position="bottom" label="X" />
      <Axis id="y" position="left" label="Y" />
    </Plot>
  );
}

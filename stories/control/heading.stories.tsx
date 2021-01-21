import { Meta } from '@storybook/react';
import React from 'react';

import { Axis, Heading, LineSeries, Plot } from '../../src';

enum Position {
  'bottom' = 'bottom',
  'top' = 'top',
}

export default {
  title: 'Control/Heading',
  argTypes: {
    title: {
      control: 'text',
      defaultValue: 'Header Label',
    },
    subtitle: {
      control: 'text',
      defaultValue: 'Subtitle text',
    },
    position: {
      control: { type: 'select', options: Position },
      defaultValue: Position.top,
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

interface HeadingControlProps {
  title: string;
  subtitle: string;
  position: Position;
}

export function HeadingControl(props: HeadingControlProps) {
  return (
    <Plot
      width={900}
      height={540}
      viewportStyle={{ stroke: 'black' }}
      margin={{
        bottom: 100,
        left: 40,
        top: 40,
        right: 40,
      }}
    >
      <Heading {...props} />
      <LineSeries data={data} xAxis="x" yAxis="y" />
      <Axis id="x" position="bottom" label="X" />
      <Axis id="y" position="left" label="Y" />
    </Plot>
  );
}

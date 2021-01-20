import { Meta } from '@storybook/react';
import React from 'react';

import { Axis, LineSeries, Plot } from '../../src';

enum ShapeProps {
  'circle' = 'circle',
  'square' = 'square',
  'triangle' = 'triangle',
}

export default {
  title: 'Control/LineSeries',
  argTypes: {
    lineStyle: {
      control: 'text',
      defaultValue: '{ "stroke": "black" }',
    },
    hidden: {
      control: 'boolean',
      defaultValue: false,
    },
    label: {
      control: 'text',
      defaultValue: 'Label',
    },
    markerShape: {
      control: { type: 'select', options: ShapeProps },
      defaultValue: ShapeProps.circle,
    },
    markerSize: {
      control: 'number',
      defaultValue: 5,
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

interface LineControlProps {
  hidden: boolean;
  label: string;
  markerShape: ShapeProps;
  markerSize: number;
  lineStyle: string;
}

export function LineControl(props: LineControlProps) {
  return (
    <Plot
      width={1500}
      height={540}
      viewportStyle={{ stroke: 'black' }}
      margin={{
        bottom: 45,
        left: 40,
        top: 40,
        right: 40,
      }}
    >
      <LineSeries
        {...props}
        data={data}
        xAxis="x"
        yAxis="y"
        lineStyle={JSON.parse(props.lineStyle)}
      />
      <Axis id="x" position="bottom" label="Label One" />
      <Axis id="y" position="left" label="Label two" padding={[0.1, 0.1]} />
    </Plot>
  );
}

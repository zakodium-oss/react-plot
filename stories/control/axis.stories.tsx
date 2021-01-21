import { Meta } from '@storybook/react';
import React from 'react';

import { Axis, LineSeries, Plot } from '../../src';

export default {
  title: 'Control/Axis',
  argTypes: {
    labelX: {
      control: 'text',
      defaultValue: 'Label X',
    },
    labelY: {
      control: 'text',
      defaultValue: 'Label Y',
    },
    padding: {
      control: 'array',
      defaultValue: [0.1, 0.1],
    },
    flip: {
      control: 'boolean',
      defaultValue: false,
    },
    fontSize: {
      control: 'number',
      defaultValue: 8,
    },
    min: {
      control: 'number',
      defaultValue: 0,
    },
    max: {
      control: 'number',
      defaultValue: 20,
    },
    showGridLines: {
      control: 'boolean',
      defaultValue: true,
    },
    showTicks: {
      control: 'boolean',
      defaultValue: true,
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

interface AxisControlProps {
  labelX: string;
  labelY: string;
  padding: [number, number];
  flip: boolean;
  fontSize: number;
  min: number;
  max: number;
  showGridLines: boolean;
  showTicks: boolean;
}

export function AxisControl(props: AxisControlProps) {
  const { labelX, labelY, ...other } = props;

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
      <LineSeries data={data} xAxis="x" yAxis="y" />
      <Axis id="x" position="bottom" label={labelX} />
      <Axis id="y" position="left" label={labelY} {...other} />
    </Plot>
  );
}

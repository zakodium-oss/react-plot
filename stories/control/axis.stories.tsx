import { Meta } from '@storybook/react';
import React from 'react';

import { Axis, LineSeries, Plot } from '../../src';

export default {
  title: 'API/Axis',
  component: Axis,
  argTypes: {
    labelX: {
      control: 'text',
      defaultValue: 'Label X',
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
  padding: [number, number];
  flip: boolean;
  fontSize: number;
  min: number;
  max: number;
  showGridLines: boolean;
  showTicks: boolean;
}

const plot = {
  width: 900,
  height: 540,
  viewportStyle: {
    stroke: 'black',
  },
  margin: {
    bottom: 45,
    left: 40,
    top: 40,
    right: 40,
  },
};

function getProps(args: AxisControlProps) {
  const { labelX, ...other } = args;

  return {
    labelX,
    args: other,
  };
}

export function AxisLeftControl(props: AxisControlProps) {
  const { args, labelX } = getProps(props);

  return (
    <Plot {...plot}>
      <LineSeries data={data} xAxis="y" yAxis="x" />
      <Axis id="y" position="bottom" label="Label" />
      <Axis id="x" position="left" label={labelX} {...args} />
    </Plot>
  );
}

export function AxisBottomControl(props: AxisControlProps) {
  const { args, labelX } = getProps(props);

  return (
    <Plot {...plot}>
      <LineSeries data={data} xAxis="y" yAxis="x" />
      <Axis id="y" position="bottom" label="Label" />
      <Axis id="x" position="left" label={labelX} {...args} />
    </Plot>
  );
}

export function AxisRightControl(props: AxisControlProps) {
  const { args, labelX } = getProps(props);

  return (
    <Plot {...plot}>
      <LineSeries data={data} xAxis="y" yAxis="x" />
      <Axis id="y" position="bottom" label="Label" />
      <Axis id="x" position="right" label={labelX} {...args} />
    </Plot>
  );
}

export function AxisTopControl(props: AxisControlProps) {
  const { args, labelX } = getProps(props);

  return (
    <Plot {...plot}>
      <LineSeries data={data} xAxis="x" yAxis="y" />
      <Axis id="y" position="left" label="Label" />
      <Axis id="x" position="top" label={labelX} {...args} />
    </Plot>
  );
}

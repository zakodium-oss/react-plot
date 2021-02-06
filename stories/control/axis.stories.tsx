import { Meta } from '@storybook/react';

import { Axis, LineSeries, Plot, PlotProps } from '../../src';

export default {
  title: 'API/Axis',
  component: Axis,
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'Axis label',
    },
    paddingStart: {
      control: 'number',
      defaultValue: 0.1,
    },
    paddingEnd: {
      control: 'number',
      defaultValue: 0.1,
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
    position: {
      table: {
        disable: true,
      },
    },
    id: {
      table: {
        disable: true,
      },
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
  label: string;
  paddingStart: number;
  paddingEnd: number;
  flip: boolean;
  fontSize: number;
  min: number;
  max: number;
}

const plot: Omit<PlotProps, 'children'> = {
  width: 900,
  height: 540,
  seriesViewportStyle: {
    stroke: 'black',
  },
  margin: {
    left: 40,
    right: 40,
  },
};

function getProps(args: AxisControlProps) {
  const { label, ...other } = args;

  return {
    label,
    args: other,
  };
}

export function AxisLeftControl(props: AxisControlProps) {
  const { args, label } = getProps(props);

  return (
    <Plot {...plot}>
      <LineSeries data={data} xAxis="y" yAxis="x" />
      <Axis id="y" position="bottom" label="Label" />
      <Axis id="x" position="left" label={label} {...args} />
    </Plot>
  );
}

export function AxisBottomControl(props: AxisControlProps) {
  const { args, label } = getProps(props);

  return (
    <Plot {...plot}>
      <LineSeries data={data} xAxis="y" yAxis="x" />
      <Axis id="y" position="bottom" label={label} {...args} />
      <Axis id="x" position="left" label="Label" />
    </Plot>
  );
}

export function AxisRightControl(props: AxisControlProps) {
  const { args, label } = getProps(props);

  return (
    <Plot {...plot}>
      <LineSeries data={data} xAxis="y" yAxis="x" />
      <Axis id="y" position="bottom" label="Label" />
      <Axis id="x" position="right" label={label} {...args} />
    </Plot>
  );
}

export function AxisTopControl(props: AxisControlProps) {
  const { args, label } = getProps(props);

  return (
    <Plot {...plot}>
      <LineSeries data={data} xAxis="x" yAxis="y" />
      <Axis id="y" position="left" label="Label" />
      <Axis id="x" position="top" label={label} {...args} />
    </Plot>
  );
}

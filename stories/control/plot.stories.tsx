import { Meta } from '@storybook/react';
import React, { CSSProperties } from 'react';

import { Axis, Legend, LineSeries, Plot } from '../../src';

export default {
  title: 'API/Plot',
  component: Plot,
  argTypes: {
    marginBottom: {
      control: 'number',
      defaultValue: 45,
    },
    marginLeft: {
      control: 'number',
      defaultValue: 40,
    },
    marginTop: {
      control: 'number',
      defaultValue: 40,
    },
    marginRight: {
      control: 'number',
      defaultValue: 40,
    },
    viewportStyle: {
      control: 'object',
      defaultValue: { stroke: 'black' },
    },
    width: {
      control: 'number',
      defaultValue: 900,
    },
    height: {
      control: 'number',
      defaultValue: 540,
    },
  },
} as Meta;

interface PlotControlProps {
  marginBottom: number;
  marginLeft: number;
  marginTop: number;
  marginRight: number;

  viewportStyle: CSSProperties;

  width: number;
  height: number;
}

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

export function PlotControl(props: PlotControlProps) {
  const {
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    viewportStyle,
    ...other
  } = props;

  return (
    <Plot
      {...other}
      viewportStyle={viewportStyle}
      margin={{
        bottom: marginBottom,
        left: marginLeft,
        top: marginTop,
        right: marginRight,
      }}
    >
      <Legend position="embedded" />
      <LineSeries data={data} xAxis="x" yAxis="y" label="Line" />
      <Axis id="x" position="bottom" label="Label One" />
      <Axis id="y" position="left" label="Label two" padding={[0.1, 0.1]} />
    </Plot>
  );
}

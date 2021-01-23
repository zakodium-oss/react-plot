import { Meta } from '@storybook/react';
import React from 'react';

import {
  Axis,
  Legend,
  Plot,
  ScatterSeries,
  ScatterSeriesProps,
} from '../../src';

export default {
  title: 'API/Scatter',
  component: ScatterSeries,
  argTypes: {
    hidden: {
      control: 'boolean',
      defaultValue: false,
    },
    label: {
      control: 'text',
      defaultValue: 'Label',
    },
    markerShape: {
      defaultValue: 'circle',
    },
    markerSize: {
      control: 'number',
      defaultValue: 5,
    },
    groupId: {
      table: {
        disable: true,
      },
    },
    xAxis: {
      table: {
        disable: true,
      },
    },
    yAxis: {
      table: {
        disable: true,
      },
    },
    data: {
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

export function ScatterControl(props: ScatterSeriesProps) {
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
      <Legend position="embedded" />

      <ScatterSeries data={data} xAxis="x" yAxis="y" {...props} />
      <Axis id="x" position="bottom" label="X" />
      <Axis id="y" position="left" label="Y" />
    </Plot>
  );
}

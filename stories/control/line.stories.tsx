import { Meta } from '@storybook/react';
import React from 'react';

import {
  Axis,
  Legend,
  LineSeries,
  LineSeriesProps,
  Plot,
  BarSeries,
} from '../../src';
import { DEFAULT_CONFIG } from '../utils';

export default {
  title: 'API/LineSeries',
  component: LineSeries,
  argTypes: {
    displayMarker: {
      control: 'boolean',
      defaultValue: true,
    },
    lineStyle: {
      control: 'object',
      defaultValue: {
        stroke: 'black',
      },
    },
    markerStyle: {
      control: 'object',
      defaultValue: { fill: 'black' },
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
      defaultValue: 'circle',
    },
    markerSize: {
      control: 'number',
      defaultValue: 10,
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

export function LineControl(props: LineSeriesProps) {
  return (
    <Plot
      width={900}
      height={540}
      viewportStyle={{ stroke: 'black' }}
      margin={{
        bottom: 45,
        left: 40,
        top: 40,
        right: 40,
      }}
    >
      <LineSeries {...props} data={data} xAxis="x" yAxis="y" />
      <Axis id="x" position="bottom" label="Label One" />
      <Axis
        id="y"
        position="left"
        label="Label two"
        paddingStart={0.1}
        paddingEnd={0.1}
      />

      <Legend position="embedded" />
    </Plot>
  );
}

export function BarLineSeriesControl() {
  return (
    <Plot
      {...DEFAULT_CONFIG}
      viewportStyle={{ stroke: 'black' }}
      margin={{
        bottom: 45,
        left: 40,
        top: 40,
        right: 40,
      }}
    >
      <Legend position="embedded" />
      <BarSeries data={data} xAxis="x" yAxis="y" label="Bar series" />
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

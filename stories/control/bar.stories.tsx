import { Meta } from '@storybook/react';

import { Axis, Legend, BarSeriesProps, Plot, BarSeries } from '../../src';

export default {
  title: 'API/BarSeries',
  component: BarSeries,
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

export function Control(props: BarSeriesProps) {
  return (
    <Plot width={900} height={540} seriesViewportStyle={{ stroke: 'black' }}>
      <BarSeries {...props} data={data} xAxis="x" yAxis="y" />
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

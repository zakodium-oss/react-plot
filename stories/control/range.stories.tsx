import { Meta } from '@storybook/react';

import { Axis, RangeSeries, Plot, RangeSeriesProps } from '../../src';

export default {
  title: 'API/RangeSeries',
  component: RangeSeries,
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
    // ErrorBars props
    displayErrorBars: {
      control: 'boolean',
      defaultValue: true,
      table: {
        category: 'Error Bars',
      },
    },
    errorBarsCapSize: {
      control: 'number',
      defaultValue: 10,
      table: {
        category: 'Error Bars',
      },
    },
    errorBarsStyle: {
      defaultValue: { strokeWidth: 1 },
      table: {
        category: 'Error Bars',
      },
    },
    errorBarsCapStyle: {
      defaultValue: { stroke: 'blue' },
      table: {
        category: 'Error Bars',
      },
    },
    // Disable unnecessary controls
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
    x: 1,
    y1: -3,
    y2: 4,
  },
  {
    x: 2,
    y1: -2,
    y2: 5,
  },
  {
    x: 3,
    y1: 2,
    y2: 10,
  },
  {
    x: 4,
    y1: 7,
    y2: 16,
  },
  {
    x: 5,
    y1: 12,
    y2: 22,
  },
  {
    x: 6,
    y1: 18,
    y2: 26,
  },
  {
    x: 7,
    y1: 20,
    y2: 29,
  },
  {
    x: 8,
    y1: 20,
    y2: 28,
  },
  {
    x: 9,
    y1: 16,
    y2: 24,
  },
  {
    x: 10,
    y1: 10,
    y2: 18,
  },
  {
    x: 11,
    y1: 5,
    y2: 12,
  },
  {
    x: 12,
    y1: 0,
    y2: 6,
  },
];

export function RangeControl(props: RangeSeriesProps) {
  return (
    <Plot
      width={900}
      height={540}
      seriesViewportStyle={{ stroke: 'black' }}
      margin={{
        bottom: 45,
        left: 40,
        top: 40,
        right: 40,
      }}
    >
      <RangeSeries {...props} data={data} xAxis="x" yAxis="y" />
      <Axis id="x" position="bottom" label="Month" />
      <Axis id="y" position="left" label="Average temperatures" />
    </Plot>
  );
}

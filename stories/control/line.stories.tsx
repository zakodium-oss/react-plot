import { Meta } from '@storybook/react';
import React from 'react';

import { Axis, Legend, LineSeries, Plot, LineSeriesProps } from '../../src';

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
    // ErrorBars props
    hiddenErrorBars: {
      control: 'boolean',
      defaultValue: false,
      table: {
        category: 'Error Bars',
      },
    },
    capSize: {
      control: 'number',
      defaultValue: 10,
      table: {
        category: 'Error Bars',
      },
    },
    barStroke: {
      control: 'color',
      defaultValue: 'black',
      table: {
        category: 'Error Bars',
        subcategory: 'Bars Style',
      },
    },
    barWidth: {
      control: 'number',
      defaultValue: 1,
      table: {
        category: 'Error Bars',
        subcategory: 'Bars Style',
      },
    },
    capStroke: {
      control: 'color',
      defaultValue: 'blue',
      table: {
        category: 'Error Bars',
        subcategory: 'Cap Style',
      },
    },
    capWidth: {
      control: 'number',
      defaultValue: 2,
      table: {
        category: 'Error Bars',
        subcategory: 'Cap Style',
      },
    },
    // Disable unnecessary controls
    errorBars: {
      table: {
        disable: true,
      },
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
    xError: 0.2,
    yError: 1,
  },
  {
    x: 1,
    y: 12,
    xError: [0.1, 0.1],
    yError: [0.5, 0.5],
  },
  {
    x: 2,
    y: 14,
    xError: [0.2, null],
    yError: [0, 0.5],
  },
  {
    x: 3,
    y: 16,
    xError: [0.1, 0.2],
    yError: null,
  },
  {
    x: 4,
    y: 18,
    xError: 0.2,
    yError: 0.5,
  },
];

interface LineControlProps extends LineSeriesProps {
  hiddenErrorBars?: boolean;
  capSize?: number;
  barStroke?: string;
  barWidth?: number;
  capStroke?: string;
  capWidth?: number;
}

export function LineControl(props: LineControlProps) {
  const {
    hiddenErrorBars,
    capSize,
    barStroke,
    barWidth,
    capStroke,
    capWidth,
  } = props;

  const errorBars = {
    hidden: hiddenErrorBars,
    capSize: capSize,
    style: { stroke: barStroke, strokeWidth: barWidth },
    capStyle: { stroke: capStroke, strokeWidth: capWidth },
  };

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
      <LineSeries
        {...props}
        data={data}
        xAxis="x"
        yAxis="y"
        errorBars={errorBars}
      />
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

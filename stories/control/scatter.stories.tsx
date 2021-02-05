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

export function ScatterControl(props: ScatterSeriesProps) {
  return (
    <Plot
      width={900}
      height={540}
      seriesViewportStyle={{ stroke: 'black' }}
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

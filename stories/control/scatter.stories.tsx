import { Meta } from '@storybook/react';
import React, { SVGAttributes } from 'react';

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
    hiddenErrorBars: {
      control: 'boolean',
      defaultValue: false,
      table: {
        category: 'Error Bars',
      },
    },
    ErrorBarsStyle: {
      control: 'object',
      defaultValue: { stroke: 'black', strokeWidth: 1 },
      table: {
        category: 'Error Bars',
      },
    },
    capSize: {
      control: 'number',
      defaultValue: 8,
      table: {
        category: 'Error Bars',
      },
    },
    capStyle: {
      control: 'object',
      defaultValue: { stroke: 'black', strokeWidth: 1 },
      table: {
        category: 'Error Bars',
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

interface ScatterControlProps extends ScatterSeriesProps {
  hiddenErrorBars?: boolean;
  ErrorBarsStyle?: SVGAttributes<SVGLineElement>;
  capSize?: number;
  capStyle?: SVGAttributes<SVGLineElement>;
}

export function ScatterControl(props: ScatterControlProps) {
  const { hiddenErrorBars, ErrorBarsStyle, capStyle, capSize } = props;
  const errorBars = {
    hidden: hiddenErrorBars,
    style: ErrorBarsStyle,
    capStyle: capStyle,
    capSize: capSize,
  };
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

      <ScatterSeries
        data={data}
        xAxis="x"
        yAxis="y"
        {...props}
        errorBars={errorBars}
      />
      <Axis id="x" position="bottom" label="X" />
      <Axis id="y" position="left" label="Y" />
    </Plot>
  );
}

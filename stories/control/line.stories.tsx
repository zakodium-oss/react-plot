import { Meta } from '@storybook/react';

import {
  Axis,
  Legend,
  LineSeries,
  Plot,
  LineSeriesProps,
  SeriesPoint,
} from '../../src';
import { DEFAULT_PLOT_CONFIG } from '../utils';

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

const data: SeriesPoint[] = [
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

export function Control(props: LineSeriesProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <LineSeries {...props} data={data} xAxis="x" yAxis="y" />
      <Axis id="x" position="bottom" />
      <Axis id="y" position="left" paddingStart={0.1} paddingEnd={0.1} />

      <Legend position="embedded" />
    </Plot>
  );
}

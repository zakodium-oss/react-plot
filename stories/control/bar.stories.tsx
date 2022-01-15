import { Meta } from '@storybook/react';

import { Axis, Legend, BarSeriesProps, Plot, BarSeries } from '../../src';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'API/BarSeries',
  component: BarSeries,
  argTypes: {
    data: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    displayMarker: true,
    lineStyle: {
      stroke: 'black',
    },
    markerStyle: { fill: 'black' },
    hidden: false,
    label: 'Label',
    markerShape: 'circle',
    markerSize: 10,
    data: [
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
    ],
  },
} as Meta<BarSeriesProps>;

export function Control(props: BarSeriesProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <BarSeries {...props} xAxis="x" yAxis="y" />
      <Axis id="x" position="bottom" paddingStart={0.1} paddingEnd={0.1} />
      <Axis id="y" position="left" paddingStart={0.1} paddingEnd={0.1} />

      <Legend position="embedded" />
    </Plot>
  );
}

import { Meta } from '@storybook/react';

import { Axis, Legend, BarSeriesProps, Plot, BarSeries } from '../../src';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'API/BarSeries',
  component: BarSeries,
  args: {
    displayMarkers: true,
    lineStyle: {
      stroke: 'black',
    },
    xShift: '0',
    yShift: '0',
    xAxis: 'x',
    yAxis: 'y',
    markerStyle: { fill: 'black' },
    hidden: false,
    label: 'Label',
    markerShape: 'circle',
    markerSize: 10,
  },
} as Meta<BarSeriesProps>;
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
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <BarSeries {...props} data={data} xAxis="x" yAxis="y" />
      <Axis id="x" position="bottom" paddingStart="10%" paddingEnd="10%" />
      <Axis id="y" position="left" paddingStart="10%" paddingEnd="10%" />

      <Legend position="embedded" />
    </Plot>
  );
}

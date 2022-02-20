import { Meta } from '@storybook/react';

import {
  Axis,
  BarSeries,
  LineSeries,
  ParallelAxis,
  Plot,
  RangeSeries,
} from '../../src';
import data from '../data/weather.json';
import { DEFAULT_PLOT_CONFIG, PlotControllerDecorator } from '../utils';

export default {
  title: 'Examples/Weather Chart',
  decorators: [PlotControllerDecorator],
} as Meta;

export function WeatherChart() {
  const Series = data.map((d) => {
    const temperature = d.temperature.map(([x, y]) => ({ x, y }));
    const rainRange = d.variance_rain.map(([x, y1, y2]) => ({
      x,
      y1,
      y2,
    }));
    const tempRange = d.variance_range.map(([x, y1, y2]) => ({
      x,
      y1,
      y2,
    }));
    const rain = d.rainfall.map(([x, y]) => ({ x, y }));
    return [
      <BarSeries
        key={0}
        label="rain"
        data={rain}
        lineStyle={{
          stroke: 'blue',
          strokeWidth: '4px',
        }}
      />,
      <RangeSeries
        key={1}
        label="rain Range"
        data={rainRange}
        lineStyle={{ fill: 'blue', opacity: '0.5' }}
      />,
      <RangeSeries
        key={2}
        label="temperature Range"
        data={tempRange}
        lineStyle={{ fill: 'red', opacity: '0.5' }}
      />,
      <LineSeries
        key={3}
        label="temperature"
        data={temperature}
        lineStyle={{ stroke: 'red' }}
      />,
    ];
  });
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {Series.map((Serie) => Serie)}
      <Axis id="x" position="bottom" label="time" scale="time" />
      <Axis id="y" position="left" label="temperature(C°)" />
      <ParallelAxis id="y" label="rainfall(F°)" />
    </Plot>
  );
}

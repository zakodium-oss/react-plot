import type { Meta } from '@storybook/react-vite';

import type { RangeSeriesPoint, SeriesPoint } from '../../src/index.js';
import {
  Axis,
  BarSeries,
  LineSeries,
  Plot,
  RangeSeries,
} from '../../src/index.js';
import data from '../data/weather.json' with { type: 'json' };
import { DEFAULT_PLOT_CONFIG, PlotControllerDecorator } from '../utils.js';

export default {
  title: 'Examples/Weather Chart',
  decorators: [PlotControllerDecorator],
} satisfies Meta;

export function WeatherChart() {
  const rain: SeriesPoint[] = [];
  const temperature: SeriesPoint[] = [];
  const tempRange: RangeSeriesPoint[] = [];
  for (const d of data) {
    rain.push(...d.rainfall.map(([x, y]) => ({ x, y })));
    temperature.push(...d.temperature.map(([x, y]) => ({ x, y })));
    tempRange.push(
      ...d.variance_range.map(([x, y1, y2]) => ({
        x,
        y1,
        y2,
      })),
    );
  }
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <BarSeries
        label="rain"
        data={rain}
        lineStyle={{
          stroke: 'blue',
          strokeWidth: '4px',
        }}
        yAxis="z"
      />
      <RangeSeries
        label="temperature Range"
        data={tempRange}
        lineStyle={{ fill: 'red', opacity: '0.5' }}
      />
      <LineSeries
        label="temperature"
        data={temperature}
        lineStyle={{ stroke: 'red' }}
      />

      <Axis id="x" position="bottom" label="time" scale="time" />
      <Axis
        id="y"
        position="left"
        label="temperature(C°)"
        displayPrimaryGridLines
        primaryGridLineStyle={{
          stroke: 'grey',
          strokeWidth: '1px',
          strokeDasharray: 'none',
        }}
      />
      <Axis id="z" position="right" label="rainfall(mm/h)" paddingEnd={0.05} />
    </Plot>
  );
}

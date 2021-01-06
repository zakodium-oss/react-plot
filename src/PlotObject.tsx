import React from 'react';

import Plot from './Plot';
import Legend from './components/Legend';
import LineSeries from './components/LineSeries';
import XAxis from './components/XAxis';
import YAxis from './components/YAxis';
import { AxisProps, LegendProps, LineSeriesProps, PlotProps } from './types';

type Axes = Record<string, AxisProps>;
type Dimentions = Omit<PlotProps, 'colorScheme' | 'children'>;

interface PlotObjectProps {
  axes: Axes;
  series: Array<LineSeriesProps>;
  legend?: LegendProps;
  dimentions: Dimentions;
  colorScheme?: Iterable<string>;
}

export default function PlotObject({
  plot: { dimentions, axes, series, legend, colorScheme },
}: {
  plot: PlotObjectProps;
}) {
  if (axes.x === undefined || axes.y === undefined) {
    throw new Error('x and y axes are required');
  }
  return (
    <Plot colorScheme={colorScheme} {...dimentions}>
      <XAxis {...axes.x} />
      <YAxis {...axes.y} />
      {legend !== undefined ? <Legend {...legend} /> : null}
      {series.map((seriesProps, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <LineSeries key={`series-${i}`} {...seriesProps} />
      ))}
    </Plot>
  );
}

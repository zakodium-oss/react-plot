import React from 'react';

import Plot from './Plot';
import Axis from './components/Axis';
import Legend from './components/Legend';
import LineSeries from './components/LineSeries';
import { PlotObjectProps } from './types';

interface Props {
  plot: PlotObjectProps;
}

export default function PlotObject({
  plot: { dimentions, axes, series, legend, colorScheme },
}: Props) {
  if (axes.x === undefined || axes.y === undefined) {
    throw new Error('x and y axes are required');
  }
  return (
    <Plot colorScheme={colorScheme} {...dimentions}>
      <Axis {...axes.x} position="horizontal" />
      <Axis {...axes.y} position="vertical" />
      {legend !== undefined ? <Legend {...legend} /> : null}
      {series.map((seriesProps, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <LineSeries key={`series-${i}`} {...seriesProps} />
      ))}
    </Plot>
  );
}

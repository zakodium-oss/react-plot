import React from 'react';

import Plot from './Plot';
import Axis from './components/Axis';
import Legend from './components/Legend';
import LineSeries from './components/LineSeries';
import ScatterSeries from './components/ScatterSeries';
import { PlotObjectType } from './types';

interface Props {
  plot: PlotObjectType;
}

export default function PlotObject({
  plot: { dimentions, axes, series, legend, colorScheme },
}: Props) {
  return (
    <Plot colorScheme={colorScheme} {...dimentions}>
      {axes.map((props) => (
        <Axis key={props.id} {...props} />
      ))}
      {legend !== undefined ? <Legend {...legend} /> : null}
      {series.map(({ type, ...props }, i) => {
        switch (type) {
          case 'line': {
            // eslint-disable-next-line react/no-array-index-key
            return <LineSeries key={`lineseries-${i}`} {...props} />;
          }
          case 'scatter': {
            // eslint-disable-next-line react/no-array-index-key
            return <ScatterSeries key={`scatterseries-${i}`} {...props} />;
          }
          default: {
            return null;
          }
        }
      })}
    </Plot>
  );
}

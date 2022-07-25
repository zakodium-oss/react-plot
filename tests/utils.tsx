import { useState } from 'react';

import { Annotations, Plot, ScatterSeries } from '../src';
import { Arrow } from '../src/components/Annotations/Arrow';
import { Line } from '../src/components/Annotations/Line';
import infrared from '../stories/data/infrared.json';

export const DEFAULT_PLOT_CONFIG = {
  width: 900,
  height: 540,
  seriesViewportStyle: {
    stroke: 'black',
    strokeWidth: 0.3,
  },
};
export const data = [
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

export const rangeData = [
  {
    x: 1,
    y1: -3,
    y2: 4,
  },
  {
    x: 2,
    y1: -2,
    y2: 5,
  },
  {
    x: 3,
    y1: 2,
    y2: 10,
  },
  {
    x: 4,
    y1: 7,
    y2: 16,
  },
  {
    x: 5,
    y1: 12,
    y2: 22,
  },
];

export function getInfraredSeries() {
  return (
    <ScatterSeries
      data={infrared}
      lineStyle={{ stroke: '#777' }}
      xAxis="x"
      yAxis="y"
    />
  );
}
export function AnnotationsCallback() {
  const [active, setActive] = useState('arrow');
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {getInfraredSeries()}
      <Annotations>
        <Arrow
          x1="0"
          x2="100"
          y1="0"
          y2="100"
          color={active === 'arrow' ? 'red' : 'black'}
          onClick={() => setActive('arrow')}
        />
        <Line
          x1="200"
          x2="300"
          y1="100"
          y2="4"
          color={active === 'line' ? 'red' : 'black'}
          onClick={() => setActive('line')}
        />
      </Annotations>
    </Plot>
  );
}

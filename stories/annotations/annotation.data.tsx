import { ReactNode } from 'react';

import { Axis, Legend, LineSeries, Plot, Annotations } from '../../src';
import { DEFAULT_CONFIG } from '../utils';

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

export default function AnnotationData(props: { children: ReactNode }) {
  return (
    <Plot {...DEFAULT_CONFIG} seriesViewportStyle={{ stroke: 'black' }}>
      <Legend position="embedded" />

      <LineSeries
        data={data}
        xAxis="x"
        yAxis="y"
        label="Label line series"
        markerShape="pentagon"
        markerStyle={{ fill: 'green' }}
        displayMarker
      />

      <Annotations>{props.children}</Annotations>

      <Axis id="x" position="bottom" label="X" />
      <Axis id="y" position="left" label="Y" />
    </Plot>
  );
}

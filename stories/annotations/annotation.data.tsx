import { ReactNode } from 'react';

import { Axis, LineSeries, Plot, Annotations } from '../../src';
import infrared from '../data/infrared.json';
import { DEFAULT_CONFIG } from '../utils';

export function AnnotationPlot(props: { children: ReactNode }) {
  return (
    <Plot {...DEFAULT_CONFIG}>
      <LineSeries
        data={infrared}
        lineStyle={{ stroke: '#777' }}
        xAxis="x"
        yAxis="y"
      />

      <Annotations>{props.children}</Annotations>

      <Axis id="x" position="bottom" label="X" />
      <Axis
        id="y"
        position="left"
        label="Y"
        paddingStart={0.05}
        paddingEnd={0.05}
      />
    </Plot>
  );
}

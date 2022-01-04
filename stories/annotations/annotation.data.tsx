import { ReactNode } from 'react';

import mass from '../../scripts/mass/HCys100OH_0.01.json';
import { Axis, LineSeries, Plot, Annotations } from '../../src';
import { DEFAULT_CONFIG } from '../utils';

export function AnnotationPlot(props: { children: ReactNode }) {
  return (
    <Plot {...DEFAULT_CONFIG}>
      <LineSeries data={mass.profile} xAxis="x" yAxis="y" />

      <Annotations>{props.children}</Annotations>

      <Axis id="x" position="bottom" label="X" />
      <Axis id="y" position="left" label="Y" />
    </Plot>
  );
}

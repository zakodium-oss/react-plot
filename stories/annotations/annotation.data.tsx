import { ReactNode } from 'react';

import { Axis, Plot, Annotations } from '../../src';
import { DEFAULT_PLOT_CONFIG, getInfraredSeries } from '../utils';

export function AnnotationPlot(props: { children: ReactNode }) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {getInfraredSeries()}

      <Annotations>{props.children}</Annotations>

      <Axis id="x" position="bottom" label="X" />
      <Axis
        id="y"
        position="left"
        label="Y"
        paddingStart="5%"
        paddingEnd="5%"
      />
    </Plot>
  );
}

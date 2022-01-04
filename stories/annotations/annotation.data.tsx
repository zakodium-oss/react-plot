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
        paddingStart={0.05}
        paddingEnd={0.05}
      />
    </Plot>
  );
}

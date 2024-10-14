import type { ReactNode } from 'react';

import { Annotations, Axis, Plot } from '../../src/index.js';
import { DEFAULT_PLOT_CONFIG, getInfraredSeries } from '../utils.js';

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

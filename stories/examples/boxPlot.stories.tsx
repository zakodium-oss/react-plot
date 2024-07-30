import { Meta } from '@storybook/react';

import {
  Annotation,
  AnnotationBoxPlotProps,
  Annotations,
  Axis,
  Plot,
} from '../../src';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'Examples/BoxPlot',
  component: Annotation.BoxPlot,
  args: {
    y: 5,
    q1: 200,
    q3: 800,
    width: '50',
    min: 50,
    max: 900,
    median: 500,
    // default values
    medianColor: 'red',
    boxColor: 'none',
    boxStyle: { fill: 'grey' },
    whiskerColor: 'silver',
    whiskerStyle: { strokeWidth: 50 },
    minMaxColor: 'black',
  },
} satisfies Meta<AnnotationBoxPlotProps>;

export function AnnotationBoxPlot(props: AnnotationBoxPlotProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <Annotations>
        <Annotation.BoxPlot {...props} />
      </Annotations>
      <Axis min={0} max={1000} position="bottom" />
      <Axis min={0} max={10} position="left" hidden />
    </Plot>
  );
}

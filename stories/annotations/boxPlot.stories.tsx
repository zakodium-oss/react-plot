import { Meta } from '@storybook/react';

import {
  AnnotationBoxPlotProps,
  BoxPlot,
} from '../../src/components/Annotations/BoxPlot';

import { AnnotationPlot } from './annotation.data';

export default {
  title: 'API/Annotations',
  component: BoxPlot,
  args: {
    y: 50,
    q1: 1500,
    q3: 3000,
    width: 30,
    min: 1000,
    max: 3500,
    median: 2300,
    // default values
    medianColor: 'black',
    strokeColor: 'black',
    fillColor: 'none',
    whiskerColor: 'black',
    minMaxColor: 'black',
  },
} as Meta<AnnotationBoxPlotProps>;

export function AnnotationBoxPlot(props: AnnotationBoxPlotProps) {
  return (
    <AnnotationPlot>
      <BoxPlot {...props} />
    </AnnotationPlot>
  );
}

AnnotationBoxPlot.storyName = 'Annotation.BoxPlot';

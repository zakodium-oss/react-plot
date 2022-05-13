import { Meta } from '@storybook/react';

import { AnnotationBoxPlotProps, Annotation } from '../../src';

import { AnnotationPlot } from './annotation.data';

export default {
  title: 'API/Annotations',
  component: Annotation.BoxPlot,
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
    boxColor: 'black',
    whiskerColor: 'black',
    minMaxColor: 'black',
  },
} as Meta<AnnotationBoxPlotProps>;

export function AnnotationBoxPlot(props: AnnotationBoxPlotProps) {
  return (
    <AnnotationPlot>
      <Annotation.BoxPlot {...props} />
    </AnnotationPlot>
  );
}

AnnotationBoxPlot.storyName = 'Annotation.BoxPlot';

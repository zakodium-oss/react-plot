import { Meta } from '@storybook/react';

import { AnnotationBoxPlotProps, Annotation } from '../../src';

import { AnnotationPlot } from './annotation.data';

export default {
  title: 'API/Annotations/Annotation.BoxPlot',
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
    yAxis: 'y',
    xAxis: 'x',
    medianColor: 'red',
    medianStyle: { strokeWidth: 5 },
    boxColor: 'blue',
    boxStyle: { fill: 'grey', strokeWidth: 5 },
    whiskerColor: 'black',
    whiskerStyle: { strokeWidth: 5 },
    minMaxColor: 'green',
    minMaxStyle: { strokeWidth: 5 },
  },
} as Meta<AnnotationBoxPlotProps>;

export function Horizontal(props: AnnotationBoxPlotProps) {
  return (
    <AnnotationPlot>
      <Annotation.BoxPlot {...props} />
    </AnnotationPlot>
  );
}

export function Vertical(props: AnnotationBoxPlotProps) {
  return (
    <AnnotationPlot>
      <Annotation.BoxPlot {...props} />
    </AnnotationPlot>
  );
}

Vertical.args = {
  xAxis: 'y',
  yAxis: 'x',
  y: 2500,
  q1: 50,
  q3: 80,
  width: 300,
  min: 20,
  max: 90,
  median: 60,
  medianColor: 'red',
  medianStyle: { strokeWidth: 5 },
  boxColor: 'blue',
  boxStyle: { fill: 'grey', strokeWidth: 5 },
  whiskerColor: 'black',
  whiskerStyle: { strokeWidth: 5 },
  minMaxColor: 'green',
  minMaxStyle: { strokeWidth: 5 },
};

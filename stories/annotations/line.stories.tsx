import { Meta } from '@storybook/react';

import { Annotation, AnnotationLineProps } from '../../src';

import { AnnotationPlot } from './annotation.data';

export default {
  title: 'API/Annotations',
  component: Annotation.Line,
  args: {
    x1: '400',
    x2: 2500,
    y1: '350',
    y2: 33,
    color: 'red',
  },
} as Meta<AnnotationLineProps>;

export function AnnotationLine(props: AnnotationLineProps) {
  return (
    <AnnotationPlot>
      <Annotation.Line {...props} />
    </AnnotationPlot>
  );
}

AnnotationLine.storyName = 'Annotation.Line';

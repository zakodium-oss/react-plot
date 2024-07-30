import { Meta } from '@storybook/react';

import { Annotation, AnnotationCircleProps } from '../../src';

import { AnnotationPlot } from './annotation.data';

export default {
  title: 'API/Annotations',
  component: Annotation.Circle,
  args: {
    x: 2000,
    y: '200',
    r: 100,
    color: 'red',
  },
} satisfies Meta<AnnotationCircleProps>;

export function AnnotationCircle(props: AnnotationCircleProps) {
  return (
    <AnnotationPlot>
      <Annotation.Circle {...props} />
    </AnnotationPlot>
  );
}

AnnotationCircle.storyName = 'Annotation.Circle';

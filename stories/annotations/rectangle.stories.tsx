import { Meta } from '@storybook/react';

import { Annotation, AnnotationRectangleProps } from '../../src';

import { AnnotationPlot } from './annotation.data';

export default {
  title: 'API/Annotations',
  component: Annotation.Rectangle,
  args: {
    x1: '300',
    y1: 45,
    x2: 1000,
    y2: '50',
    color: 'red',
  },
} satisfies Meta<AnnotationRectangleProps>;

export function AnnotationRectangle(props: AnnotationRectangleProps) {
  return (
    <AnnotationPlot>
      <Annotation.Rectangle {...props} />
    </AnnotationPlot>
  );
}

AnnotationRectangle.storyName = 'Annotation.Rectangle';

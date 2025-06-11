import type { Meta } from '@storybook/react-vite';

import { Annotation, type AnnotationRectangleProps } from '../../src/index.js';

import { AnnotationPlot } from './annotation.data.js';

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

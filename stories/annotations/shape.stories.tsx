import type { Meta } from '@storybook/react';

import { Annotation, type AnnotationShapeProps } from '../../src/index.js';

import { AnnotationPlot } from './annotation.data.js';

export default {
  title: 'API/Annotations',
  component: Annotation.Shape,
  args: {
    x: 2200,
    y: '300',
    shape: 'diamond',
    size: 10,
    color: 'red',
  },
} satisfies Meta<AnnotationShapeProps>;

export function AnnotationShape(props: AnnotationShapeProps) {
  return (
    <AnnotationPlot>
      <Annotation.Shape {...props} />
    </AnnotationPlot>
  );
}

AnnotationShape.storyName = 'Annotation.Shape';

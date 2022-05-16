import { Meta } from '@storybook/react';

import { Annotation, AnnotationShapeProps } from '../../src';

import { AnnotationPlot } from './annotation.data';

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
} as Meta<AnnotationShapeProps>;

export function AnnotationShape(props: AnnotationShapeProps) {
  return (
    <AnnotationPlot>
      <Annotation.Shape {...props} />
    </AnnotationPlot>
  );
}

AnnotationShape.storyName = 'Annotation.Shape';

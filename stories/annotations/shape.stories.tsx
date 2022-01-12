import { Meta } from '@storybook/react';

import {
  Shape,
  AnnotationShapeProps,
} from '../../src/components/Annotations/Shape';

import { AnnotationPlot } from './annotation.data';

export default {
  title: 'API/Annotations',
  component: Shape,
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
      <Shape {...props} />
    </AnnotationPlot>
  );
}

AnnotationShape.storyName = 'Annotation.Shape';

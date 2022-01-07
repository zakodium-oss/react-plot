import { Meta } from '@storybook/react';

import {
  Rectangle,
  AnnotationRectangleProps,
} from '../../src/components/Annotations/Rectangle';

import { AnnotationPlot } from './annotation.data';

export default {
  title: 'API/Annotations',
  component: Rectangle,
  args: {
    x: '300',
    y: 45,
    width: 500,
    height: '50',
    style: { fill: 'red' },
  },
} as Meta<AnnotationRectangleProps>;

export function AnnotationRectangle(props: AnnotationRectangleProps) {
  return (
    <AnnotationPlot>
      <Rectangle {...props} />
    </AnnotationPlot>
  );
}

AnnotationRectangle.storyName = 'Annotation.Rectangle';

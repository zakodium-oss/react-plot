import { Meta } from '@storybook/react';

import {
  Circle,
  AnnotationCircleProps,
} from '../../src/components/Annotations/Circle';

import { AnnotationPlot } from './annotation.data';

export default {
  title: 'API/Annotations',
  component: Circle,
  args: {
    x: 2000,
    y: '200',
    r: 100,
    color: 'red',
  },
} as Meta<AnnotationCircleProps>;

export function AnnotationCircle(props: AnnotationCircleProps) {
  return (
    <AnnotationPlot>
      <Circle {...props} />
    </AnnotationPlot>
  );
}

AnnotationCircle.storyName = 'Annotation.Circle';

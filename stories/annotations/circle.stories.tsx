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
    cx: 2000,
    cy: '200',
    r: 100,
    style: { fill: 'red' },
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

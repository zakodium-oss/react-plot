import type { Meta } from '@storybook/react-vite';

import type { AnnotationCircleProps } from '../../src/index.js';
import { Annotation } from '../../src/index.js';

import { AnnotationPlot } from './annotation.data.js';

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

import type { Meta } from '@storybook/react-vite';

import type { AnnotationArrowProps } from '../../src/index.js';
import { Annotation } from '../../src/index.js';

import { AnnotationPlot } from './annotation.data.js';

export default {
  title: 'API/Annotations',
  component: Annotation.Arrow,
  args: {
    x1: '400',
    x2: 1630,
    y1: '350',
    y2: 33,
    startPoint: 'none',
    endPoint: 'triangle',
    color: 'red',
    strokeWidth: 5,
    markerSize: 3,
  },
} satisfies Meta<AnnotationArrowProps>;

export function AnnotationArrow(props: AnnotationArrowProps) {
  return (
    <AnnotationPlot>
      <Annotation.Arrow {...props} />

      <Annotation.Arrow
        x1="5"
        y1="5"
        x2="50"
        y2="22"
        endPoint="none"
        startPoint="triangle"
        color="blue"
      />
    </AnnotationPlot>
  );
}

AnnotationArrow.storyName = 'Annotation.Arrow';

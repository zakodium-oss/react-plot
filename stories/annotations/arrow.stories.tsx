import { Meta } from '@storybook/react';

import {
  Arrow,
  AnnotationArrowProps,
} from '../../src/components/Annotations/Arrow';

import { AnnotationPlot } from './annotation.data';

export default {
  title: 'API/Annotations',
  component: Arrow,
  args: {
    x1: '400',
    x2: 1630,
    y1: '350',
    y2: 33,
    startPoint: 'none',
    endPoint: 'triangle',
    color: 'red',
    strokeWidth: 5,
    markerWidth: 3,
  },
} as Meta<AnnotationArrowProps>;

export function AnnotationArrow(props: AnnotationArrowProps) {
  return (
    <AnnotationPlot>
      <Arrow {...props} />

      <Arrow
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

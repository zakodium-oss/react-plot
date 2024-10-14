import type { Meta } from '@storybook/react';

import { Annotation, type AnnotationLineProps } from '../../src/index.js';

import { AnnotationPlot } from './annotation.data.js';

export default {
  title: 'API/Annotations',
  component: Annotation.Line,
  args: {
    x1: '400',
    x2: 2500,
    y1: '350',
    y2: 33,
    color: 'red',
  },
} satisfies Meta<AnnotationLineProps>;

export function AnnotationLine(props: AnnotationLineProps) {
  return (
    <AnnotationPlot>
      <Annotation.Line {...props} />
    </AnnotationPlot>
  );
}

AnnotationLine.storyName = 'Annotation.Line';

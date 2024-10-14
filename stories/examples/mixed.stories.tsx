import type { Meta } from '@storybook/react';

import { Annotation, type AnnotationLineProps } from '../../src/index.js';
import { AnnotationPlot } from '../annotations/annotation.data.js';

export default {
  title: 'Examples/Mixed Annotations',
  component: Annotation.Line,
  args: {
    x1: '0%',
    x2: 2500,
    y1: '350',
    y2: '33%',
    color: 'blue',
    strokeWidth: 5,
  },
} satisfies Meta<AnnotationLineProps>;

export function AnnotationMixed(props: AnnotationLineProps) {
  return (
    <AnnotationPlot>
      <Annotation.Line {...props} />
      <Annotation.Line x1="0%" x2={2500} y1="350" y2="100%" color="blue" />
    </AnnotationPlot>
  );
}

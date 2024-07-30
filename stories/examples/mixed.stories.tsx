import { Meta } from '@storybook/react';

import {
  AnnotationLineProps,
  Line,
} from '../../src/components/Annotations/Line';
import { AnnotationPlot } from '../annotations/annotation.data';

export default {
  title: 'Examples/Mixed Annotations',
  component: Line,
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
      <Line {...props} />
      <Line x1="0%" x2={2500} y1="350" y2="100%" color="blue" />
    </AnnotationPlot>
  );
}

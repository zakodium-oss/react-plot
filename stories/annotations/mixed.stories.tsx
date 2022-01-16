import { Meta } from '@storybook/react';

import {
  Line,
  AnnotationLineProps,
} from '../../src/components/Annotations/Line';

import { AnnotationPlot } from './annotation.data';

export default {
  title: 'API/Annotations',
  component: Line,
  args: {
    x1: '40%',
    x2: 2500,
    y1: '350',
    y2: '33%',
    color: 'blue',
    strokeWidth: 5,
  },
} as Meta<AnnotationLineProps>;

export function AnnotationMixed(props: AnnotationLineProps) {
  return (
    <AnnotationPlot>
      <Line {...props} />
    </AnnotationPlot>
  );
}

AnnotationMixed.storyName = 'Mixed coordinates';

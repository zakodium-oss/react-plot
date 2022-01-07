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
    x1: '400',
    x2: 2500,
    y1: '350',
    y2: 33,
    style: { stroke: 'red' },
  },
} as Meta<AnnotationLineProps>;

export function AnnotationLine(props: AnnotationLineProps) {
  return (
    <AnnotationPlot>
      <Line {...props} />
    </AnnotationPlot>
  );
}

AnnotationLine.storyName = 'Annotation.Line';

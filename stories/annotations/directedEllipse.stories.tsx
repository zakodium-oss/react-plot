import { Meta } from '@storybook/react';

import {
  AnnotationDirectedEllipseProps,
  DirectedEllipse,
} from '../../src/components/Annotations/DirectedEllipse';

import { AnnotationPlot } from './annotation.data';

export default {
  title: 'API/Annotations',
  component: DirectedEllipse,
  args: {
    x1: 2250,
    y1: '270',
    x2: '30',
    y2: 10,
    width: 10,
    color: 'red',
  },
} as Meta<AnnotationDirectedEllipseProps>;

export function AnnotationDirectedEllipseStories(
  props: AnnotationDirectedEllipseProps,
) {
  return (
    <AnnotationPlot>
      <DirectedEllipse {...props} />
    </AnnotationPlot>
  );
}

AnnotationDirectedEllipseStories.storyName = 'Annotation.DirectedEllipse';

import type { Meta } from '@storybook/react-vite';

import {
  Annotation,
  type AnnotationDirectedEllipseProps,
} from '../../src/index.js';

import { AnnotationPlot } from './annotation.data.js';

export default {
  title: 'API/Annotations',
  component: Annotation.DirectedEllipse,
  args: {
    x1: 2250,
    y1: '270',
    x2: '30',
    y2: 10,
    width: 10,
    color: 'red',
  },
} satisfies Meta<AnnotationDirectedEllipseProps>;

export function AnnotationDirectedEllipseStories(
  props: AnnotationDirectedEllipseProps,
) {
  return (
    <AnnotationPlot>
      <Annotation.DirectedEllipse {...props} />
    </AnnotationPlot>
  );
}

AnnotationDirectedEllipseStories.storyName = 'Annotation.DirectedEllipse';

import type { Meta } from '@storybook/react';

import { Annotation, type AnnotationEllipseProps } from '../../src/index.js';

import { AnnotationPlot } from './annotation.data.js';

export default {
  title: 'API/Annotations',
  component: Annotation.Ellipse,
  args: {
    x: 2250,
    y: '270',
    rx: '30',
    ry: 10,
    color: 'red',
  },
} satisfies Meta<AnnotationEllipseProps>;

export function AnnotationEllipseStories(props: AnnotationEllipseProps) {
  return (
    <AnnotationPlot>
      <Annotation.Ellipse {...props} />
    </AnnotationPlot>
  );
}

AnnotationEllipseStories.storyName = 'Annotation.Ellipse';

import { Meta } from '@storybook/react';

import {
  Ellipse,
  AnnotationEllipseProps,
} from '../../src/components/Annotations/Ellipse';

import { AnnotationPlot } from './annotation.data';

export default {
  title: 'API/Annotations',
  component: Ellipse,
  args: {
    cx: 2250,
    cy: '270',
    rx: '30',
    ry: 10,
    style: { fill: 'red' },
  },
} as Meta<AnnotationEllipseProps>;

export function AnnotationEllipseStories(props: AnnotationEllipseProps) {
  return (
    <AnnotationPlot>
      <Ellipse {...props} />
    </AnnotationPlot>
  );
}

AnnotationEllipseStories.storyName = 'Annotation.Ellipse';

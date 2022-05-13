import { Meta } from '@storybook/react';

import { AnnotationEllipseProps, Annotation } from '../../src';

import { AnnotationPlot } from './annotation.data';

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
} as Meta<AnnotationEllipseProps>;

export function AnnotationEllipseStories(props: AnnotationEllipseProps) {
  return (
    <AnnotationPlot>
      <Annotation.Ellipse {...props} />
    </AnnotationPlot>
  );
}

AnnotationEllipseStories.storyName = 'Annotation.Ellipse';

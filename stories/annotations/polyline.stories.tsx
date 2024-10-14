import type { Meta } from '@storybook/react';

import { Annotation, type AnnotationPolylineProps } from '../../src/index.js';

import { AnnotationPlot } from './annotation.data.js';

export default {
  title: 'API/Annotations',
  component: Annotation.Polyline,
  args: {
    points: [
      { x: 1000, y: '20' },
      { x: 1500, y: 45 },
      { x: '20', y: '70' },
      { x: 2000, y: 8 },
    ],
    color: 'red',
  },
} satisfies Meta<AnnotationPolylineProps>;

export function AnnotationPolyline(props: AnnotationPolylineProps) {
  return (
    <AnnotationPlot>
      <Annotation.Polyline {...props} />
    </AnnotationPlot>
  );
}

AnnotationPolyline.storyName = 'Annotation.Polyline';

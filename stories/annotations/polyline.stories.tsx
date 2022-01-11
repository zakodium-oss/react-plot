import { Meta } from '@storybook/react';

import {
  AnnotationPolylineProps,
  Polyline,
} from '../../src/components/Annotations/Polyline';

import { AnnotationPlot } from './annotation.data';

export default {
  title: 'API/Annotations',
  component: Polyline,
  args: {
    points: [
      { x: 1000, y: '20' },
      { x: 1500, y: 45 },
      { x: '20', y: '70' },
      { x: 2000, y: 8 },
    ],
    displayPoints: true,
    style: { stroke: 'red' },
  },
} as Meta<AnnotationPolylineProps>;

export function AnnotationPolyline(props: AnnotationPolylineProps) {
  return (
    <AnnotationPlot>
      <Polyline {...props} />
    </AnnotationPlot>
  );
}

AnnotationPolyline.storyName = 'Annotation.Polyline';

import { Meta } from '@storybook/react';
import React from 'react';

import { Annotation } from '../../../src';
import AnnotationData from '../annotation.data';

export default {
  title: 'Docs/Annotations/Ellipse',
  decorators: [
    (Story) => (
      <AnnotationData>
        <Story />
      </AnnotationData>
    ),
  ],
} as Meta;

export function AnnotationEllipseStories() {
  return (
    <Annotation.Ellipse
      cx="300"
      cy="270"
      rx="90"
      ry="20"
      style={{ fill: 'red' }}
    />
  );
}

AnnotationEllipseStories.storyName = 'Annotation ellipse with string value';

export function AnnotationEllipseValuesStories() {
  return (
    <Annotation.Ellipse
      cx={2}
      cy={12}
      rx={1}
      ry="20px"
      style={{ fill: 'red' }}
    />
  );
}

AnnotationEllipseValuesStories.storyName =
  'Annotation ellipse with number value';

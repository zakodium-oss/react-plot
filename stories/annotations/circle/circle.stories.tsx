import { Meta } from '@storybook/react';
import React from 'react';

import { Annotation } from '../../../src';
import AnnotationData from '../annotation.data';

export default {
  title: 'Docs/Annotations/Circle',
  decorators: [
    (Story) => (
      <AnnotationData>
        <Story />
      </AnnotationData>
    ),
  ],
} as Meta;

export function AnnotationCircleStories() {
  return <Annotation.Circle cx="100" cy="100" r="20" style={{ fill: 'red' }} />;
}

AnnotationCircleStories.storyName = 'Annotation circle with string value';

export function AnnotationCircleValuesStories() {
  return <Annotation.Circle cx={1} cy={14} r={0.5} style={{ fill: 'red' }} />;
}

AnnotationCircleValuesStories.storyName = 'Annotation circle with number value';

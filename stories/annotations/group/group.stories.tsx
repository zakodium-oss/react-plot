import { Meta } from '@storybook/react';
import React from 'react';

import { Annotation } from '../../../src';
import AnnotationData from '../annotation.data';

export default {
  title: 'Docs/Annotations/Group',
  decorators: [
    (Story) => (
      <AnnotationData>
        <Story />
      </AnnotationData>
    ),
  ],
} as Meta;

export function AnnotationGroupStories() {
  return (
    <Annotation.Group x="50" y="150">
      <Annotation.Text>Hello, World!</Annotation.Text>
    </Annotation.Group>
  );
}

AnnotationGroupStories.storyName = 'Annotation group with string value';

export function AnnotationGroupValuesStories() {
  return (
    <Annotation.Group x={1} y={15}>
      <Annotation.Text>Hello, World!</Annotation.Text>
    </Annotation.Group>
  );
}

AnnotationGroupValuesStories.storyName = 'Annotation group with number value';

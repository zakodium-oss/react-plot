import { Meta } from '@storybook/react';
import React from 'react';

import { Annotation } from '../../src';
import { GroupProps } from '../../src/components/Annotations/Group';

import AnnotationData from './annotation.data';

export default {
  title: 'Docs/Annotations/Group',
  decorators: [
    (Story) => (
      <AnnotationData>
        <Story />
      </AnnotationData>
    ),
  ],
  args: {
    x: 50,
    y: 150,
  },
} as Meta;

export function GroupControl(props: GroupProps) {
  return (
    <Annotation.Group x={String(props.x)} y={String(props.y)}>
      <Annotation.Text>Hello, World!</Annotation.Text>
      <Annotation.Arrow x1="0" x2="100" y1="10" y2="10" endPoint="triangle" />
    </Annotation.Group>
  );
}

export function AnnotationGroupStories() {
  return (
    <Annotation.Group x="50" y="150">
      <Annotation.Text>Hello, World!</Annotation.Text>
      <Annotation.Arrow x1="0" x2="100" y1="10" y2="10" endPoint="triangle" />
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

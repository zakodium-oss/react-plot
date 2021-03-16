import { Meta } from '@storybook/react';

import { Annotation } from '../../src';
import { GroupProps } from '../../src/components/Annotations/Group';

import AnnotationData from './annotation.data';

export default {
  title: 'Docs/Annotations/Group',
  component: Annotation.Group,
  decorators: [
    (Story) => (
      <AnnotationData>
        <Story />
      </AnnotationData>
    ),
  ],
} as Meta;

export function AnnotationGroupStories(props: GroupProps) {
  return (
    <Annotation.Group {...props}>
      <Annotation.Text>Hello, World!</Annotation.Text>
      <Annotation.Arrow x1="0" x2="100" y1="10" y2="10" endPoint="triangle" />
    </Annotation.Group>
  );
}

AnnotationGroupStories.storyName = 'Annotation group with string value';
AnnotationGroupStories.args = {
  x: '50',
  y: '150',
};

export function AnnotationGroupValuesStories(props: GroupProps) {
  return (
    <Annotation.Group {...props}>
      <Annotation.Text>Hello, World!</Annotation.Text>
    </Annotation.Group>
  );
}

AnnotationGroupValuesStories.storyName = 'Annotation group with number value';
AnnotationGroupValuesStories.args = {
  x: 1,
  y: 15,
};

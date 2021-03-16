import { Meta } from '@storybook/react';

import { Annotation } from '../../src';
import { CircleProps } from '../../src/components/Annotations/Circle';

import AnnotationData from './annotation.data';

export default {
  title: 'Docs/Annotations/Circle',
  component: Annotation.Circle,
  decorators: [
    (Story) => (
      <AnnotationData>
        <Story />
      </AnnotationData>
    ),
  ],
  args: {
    style: { fill: 'red' },
  },
} as Meta;

export function AnnotationCircleStories(props: CircleProps) {
  return <Annotation.Circle {...props} />;
}

AnnotationCircleStories.storyName = 'Annotation circle with string value';
AnnotationCircleStories.args = {
  cx: '100',
  cy: '100',
  r: '20',
};

export function AnnotationCircleValuesStories(props: CircleProps) {
  return <Annotation.Circle {...props} />;
}

AnnotationCircleValuesStories.args = {
  cx: 1,
  cy: 14,
  r: 0.5,
};

AnnotationCircleValuesStories.storyName = 'Annotation circle with number value';

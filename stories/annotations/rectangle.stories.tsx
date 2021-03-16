import { Meta } from '@storybook/react';

import { Annotation } from '../../src';
import { RectangleProps } from '../../src/components/Annotations/Rectangle';

import AnnotationData from './annotation.data';

export default {
  title: 'Docs/Annotations/Rectangle',
  component: Annotation.Rectangle,
  decorators: [
    (Story) => (
      <AnnotationData>
        <Story />
      </AnnotationData>
    ),
  ],
  args: {
    fill: 'red',
  },
} as Meta;

export function AnnotationRectangleStories(props: RectangleProps) {
  return <Annotation.Rectangle {...props} />;
}

AnnotationRectangleStories.storyName = 'Annotation rectangle with string value';
AnnotationRectangleStories.args = {
  x: '20',
  y: '270',
  width: '550',
  height: '50',
};

export function AnnotationRectangleValuesStories(props: RectangleProps) {
  return <Annotation.Rectangle {...props} />;
}

AnnotationRectangleValuesStories.storyName =
  'Annotation rectangle with number value';
AnnotationRectangleValuesStories.args = {
  x: 1,
  y: 15,
  width: '100px',
  height: 3,
};

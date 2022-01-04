import { Meta } from '@storybook/react';

import { Annotation, AnnotationRectangleProps } from '../../src';

import { AnnotationPlot } from './annotation.data';

export default {
  title: 'Docs/Annotations/Rectangle',
  component: Annotation.Rectangle,
  decorators: [
    (Story) => (
      <AnnotationPlot>
        <Story />
      </AnnotationPlot>
    ),
  ],
  args: {
    fill: 'red',
  },
} as Meta;

export function AnnotationRectangleStories(props: AnnotationRectangleProps) {
  return <Annotation.Rectangle {...props} />;
}

AnnotationRectangleStories.storyName = 'Annotation rectangle with string value';
AnnotationRectangleStories.args = {
  x: '20',
  y: '270',
  width: '550',
  height: '50',
};

export function AnnotationRectangleValuesStories(
  props: AnnotationRectangleProps,
) {
  return <Annotation.Rectangle {...props} />;
}

AnnotationRectangleValuesStories.storyName =
  'Annotation rectangle with number value';
AnnotationRectangleValuesStories.args = {
  x: 1,
  y: 15,
  width: 3,
  height: 3,
};

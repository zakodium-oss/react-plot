import { Meta } from '@storybook/react';

import { Annotation, AnnotationEllipseProps } from '../../src';

import { AnnotationPlot } from './annotation.data';

export default {
  title: 'Docs/Annotations/Ellipse',
  component: Annotation.Ellipse,
  decorators: [
    (Story) => (
      <AnnotationPlot>
        <Story />
      </AnnotationPlot>
    ),
  ],
  args: {
    style: {
      fill: 'red',
    },
  },
} as Meta;

export function AnnotationEllipseStories(props: AnnotationEllipseProps) {
  return <Annotation.Ellipse {...props} />;
}

AnnotationEllipseStories.storyName = 'Annotation ellipse with string value';
AnnotationEllipseStories.args = {
  cx: '300',
  cy: '270',
  rx: '90',
  ry: '20',
};

export function AnnotationEllipseValuesStories(props: AnnotationEllipseProps) {
  return <Annotation.Ellipse {...props} />;
}

AnnotationEllipseValuesStories.storyName =
  'Annotation ellipse with number value';
AnnotationEllipseValuesStories.args = {
  cx: 2,
  cy: 12,
  rx: 1,
  ry: 1,
};

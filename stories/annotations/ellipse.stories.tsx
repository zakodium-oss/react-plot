import { Meta } from '@storybook/react';

import { Annotation } from '../../src';
import { EllipseProps } from '../../src/components/Annotations/Ellipse';

import AnnotationData from './annotation.data';

export default {
  title: 'Docs/Annotations/Ellipse',
  component: Annotation.Ellipse,
  decorators: [
    (Story) => (
      <AnnotationData>
        <Story />
      </AnnotationData>
    ),
  ],
  args: {
    style: {
      fill: 'red',
    },
  },
} as Meta;

export function AnnotationEllipseStories(props: EllipseProps) {
  return <Annotation.Ellipse {...props} />;
}

AnnotationEllipseStories.storyName = 'Annotation ellipse with string value';
AnnotationEllipseStories.args = {
  cx: '300',
  cy: '270',
  rx: '90',
  ry: '20',
};

export function AnnotationEllipseValuesStories(props: EllipseProps) {
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

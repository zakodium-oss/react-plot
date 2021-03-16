import { Meta } from '@storybook/react';

import { Annotation } from '../../src';
import { ArrowProps } from '../../src/components/Annotations/Arrow';

import AnnotationData from './annotation.data';

export default {
  title: 'Docs/Annotations/Arrow',
  component: Annotation.Arrow,
  decorators: [
    (Story) => (
      <AnnotationData>
        <Story />
      </AnnotationData>
    ),
  ],
  args: {
    endPoint: 'triangle',
    startPoint: 'triangle',
  } as ArrowProps,
} as Meta;

export function AnnotationArrowStories(props: ArrowProps) {
  return <Annotation.Arrow {...props} />;
}

AnnotationArrowStories.storyName = 'Annotation arrow with string value';
AnnotationArrowStories.args = {
  x1: '20',
  x2: '500',
  y1: '300',
  y2: '300',
};

export function AnnotationArrowValuesStories(props: ArrowProps) {
  return <Annotation.Arrow {...props} />;
}

AnnotationArrowValuesStories.storyName = 'Annotation arrow with number value';
AnnotationArrowValuesStories.args = {
  x1: 1,
  x2: 2,
  y1: 15,
  y2: 12,
};

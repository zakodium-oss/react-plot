import { Meta } from '@storybook/react';
import React from 'react';

import { Annotation } from '../../src';
import { ArrowProps } from '../../src/components/Annotations/Arrow';

import AnnotationData from './annotation.data';

export default {
  title: 'Docs/Annotations/Arrow',
  decorators: [
    (Story) => (
      <AnnotationData>
        <Story />
      </AnnotationData>
    ),
  ],
  args: {
    x1: 20,
    x2: 500,
    y1: 300,
    y2: 300,
    endPoint: 'triangle',
  },
} as Meta;

export function ArrowControl(props: ArrowProps) {
  return (
    <Annotation.Arrow
      x1={String(props.x1)}
      x2={String(props.x2)}
      y1={String(props.y1)}
      y2={String(props.y2)}
      endPoint={props.endPoint}
    />
  );
}

export function AnnotationArrowStories() {
  return (
    <Annotation.Arrow x1="20" x2="500" y1="300" y2="300" endPoint="triangle" />
  );
}

AnnotationArrowStories.storyName = 'Annotation string with number value';

export function AnnotationArrowValuesStories() {
  return <Annotation.Arrow x1={1} x2={2} y1={15} y2={12} endPoint="triangle" />;
}

AnnotationArrowStories.storyName = 'Annotation arrow with number value';

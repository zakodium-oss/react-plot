import { Meta } from '@storybook/react';
import React from 'react';

import { Annotation } from '../../src';
import { RectangleProps } from '../../src/components/Annotations/Rectangle';

import AnnotationData from './annotation.data';

export default {
  title: 'Docs/Annotations/Rectangle',
  decorators: [
    (Story) => (
      <AnnotationData>
        <Story />
      </AnnotationData>
    ),
  ],
  args: {
    x: 20,
    y: 270,
    width: 550,
    height: 50,
    fill: 'red',
  },
} as Meta;

export function RectangleControl(props: RectangleProps) {
  return (
    <Annotation.Rectangle
      x={String(props.x)}
      y={String(props.y)}
      width={String(props.width)}
      height={String(props.height)}
      fill={props.fill}
    />
  );
}

export function AnnotationRectangleStories() {
  return (
    <Annotation.Rectangle x="20" y="270" width="550" height="50" fill="red" />
  );
}

AnnotationRectangleStories.storyName = 'Annotation rectangle with string value';

export function AnnotationRectangleValuesStories() {
  return (
    <Annotation.Rectangle x={1} y={15} width="100px" height={3} fill="red" />
  );
}

AnnotationRectangleValuesStories.storyName =
  'Annotation rectangle with number value';

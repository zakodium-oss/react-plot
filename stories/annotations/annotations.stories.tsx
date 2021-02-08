import { Meta } from '@storybook/react';
import React from 'react';

import { Annotation } from '../../src';

import AnnotationData from './annotation.data';

const shapes = ['circle', 'triangle', 'diamond', 'square'];

export default {
  title: 'Docs/Annotations',
  decorators: [
    (Story) => (
      <AnnotationData>
        <Story />
      </AnnotationData>
    ),
  ],
} as Meta;

export function Line() {
  return (
    <Annotation.Line
      x1={20}
      x2={90}
      y1={90}
      y2={250}
      style={{ stroke: 'red' }}
    />
  );
}

export function Text() {
  return (
    <Annotation.Text x={50} y={150}>
      Hello, World!
    </Annotation.Text>
  );
}

export function Shape(props: {
  size: number;
  shape: 'circle' | 'triangle' | 'diamond' | 'square';
}) {
  return (
    <Annotation.Shape
      x={50}
      y={150}
      shape={props.shape}
      size={props.size}
      style={{ fill: 'red' }}
    />
  );
}

Shape.argTypes = {
  size: {
    control: 'number',
    defaultValue: 5,
  },
  shape: {
    defaultValue: shapes[0],
    control: {
      type: 'select',
      options: shapes,
    },
  },
};

import { Meta } from '@storybook/react';
import React from 'react';

import { Annotation } from '../../src';
import { EllipseProps } from '../../src/components/Annotations/Ellipse';

import AnnotationData from './annotation.data';

export default {
  title: 'Docs/Annotations/Ellipse',
  decorators: [
    (Story) => (
      <AnnotationData>
        <Story />
      </AnnotationData>
    ),
  ],
  args: {
    cx: 300,
    cy: 270,
    rx: 90,
    ry: 20,
    style: {
      fill: 'red',
    },
  },
} as Meta;

export function EllipseControl(props: EllipseProps) {
  return (
    <Annotation.Ellipse
      cx={String(props.cx)}
      cy={String(props.cy)}
      rx={String(props.rx)}
      ry={String(props.ry)}
      style={props.style}
    />
  );
}

export function AnnotationEllipseStories() {
  return (
    <Annotation.Ellipse
      cx="300"
      cy="270"
      rx="90"
      ry="20"
      style={{ fill: 'red' }}
    />
  );
}

AnnotationEllipseStories.storyName = 'Annotation ellipse with string value';

export function AnnotationEllipseValuesStories() {
  return (
    <Annotation.Ellipse
      cx={2}
      cy={12}
      rx={1}
      ry="20px"
      style={{ fill: 'red' }}
    />
  );
}

AnnotationEllipseValuesStories.storyName =
  'Annotation ellipse with number value';

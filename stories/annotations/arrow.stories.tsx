import { Meta } from '@storybook/react';
import React from 'react';

import { Annotation } from '../../src';

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
} as Meta;

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

import { Meta } from '@storybook/react';

import { Annotation, AnnotationTextProps } from '../../src';

import { AnnotationPlot } from './annotation.data';

export default {
  title: 'API/Annotations',
  component: Annotation.Text,
  args: {
    x: 1800,
    y: '250',
    color: 'red',
  },
} satisfies Meta<AnnotationTextProps>;

export function AnnotationText(props: AnnotationTextProps) {
  return (
    <AnnotationPlot>
      <Annotation.Text {...props}>Hello, World!</Annotation.Text>
    </AnnotationPlot>
  );
}

AnnotationText.storyName = 'Annotation.Text';

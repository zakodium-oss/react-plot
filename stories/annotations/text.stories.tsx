import type { Meta } from '@storybook/react-vite';

import { Annotation, type AnnotationTextProps } from '../../src/index.js';

import { AnnotationPlot } from './annotation.data.js';

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

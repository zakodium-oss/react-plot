import { Meta } from '@storybook/react';

import {
  Text,
  AnnotationTextProps,
} from '../../src/components/Annotations/Text';

import { AnnotationPlot } from './annotation.data';

export default {
  title: 'API/Annotations',
  component: Text,
  args: {
    x: 1800,
    y: '250',
    style: { fill: 'red' },
  },
} as Meta<AnnotationTextProps>;

export function AnnotationText(props: AnnotationTextProps) {
  return (
    <AnnotationPlot>
      <Text {...props}>Hello, World!</Text>
    </AnnotationPlot>
  );
}

AnnotationText.storyName = 'Annotation.Text';

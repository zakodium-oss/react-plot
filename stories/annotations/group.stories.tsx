import { Meta } from '@storybook/react';

import { Annotation } from '../../src';
import {
  Group,
  AnnotationGroupProps,
} from '../../src/components/Annotations/Group';

import { AnnotationPlot } from './annotation.data';

export default {
  title: 'API/Annotations',
  component: Group,
  args: {
    x: 1800,
    y: '250',
  },
} as Meta<AnnotationGroupProps>;

export function AnnotationGroup(props: AnnotationGroupProps) {
  return (
    <AnnotationPlot>
      <Group {...props}>
        <Annotation.Text x="0" y="0">
          Hello, World!
        </Annotation.Text>
        <Annotation.Arrow x1="0" x2="100" y1="10" y2="10" />
      </Group>
    </AnnotationPlot>
  );
}

AnnotationGroup.storyName = 'Annotation.Group';

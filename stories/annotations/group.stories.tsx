import { Meta } from '@storybook/react';

import { Annotation } from '../../src';
import {
  Group,
  AnnotationGroupProps,
} from '../../src/components/Annotations/Group';
import { Shape } from '../../src/components/Annotations/Shape';

import { AnnotationPlot } from './annotation.data';

export default {
  title: 'API/Annotations',
  component: Group,
  args: {
    x: 2200,
    y: '250',
    horizontalAlign: 'none',
    verticalAlign: 'none',
  },
} as Meta<AnnotationGroupProps>;

export function AnnotationGroup(props: AnnotationGroupProps) {
  return (
    <AnnotationPlot>
      <Shape
        x={props.x}
        y={props.y}
        shape="square"
        size={5}
        style={{ fill: 'red' }}
      />
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

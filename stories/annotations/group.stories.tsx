import { Meta } from '@storybook/react';

import { Annotation, AnnotationGroupProps } from '../../src';

import { AnnotationPlot } from './annotation.data';

export default {
  title: 'API/Annotations',
  component: Annotation.Group,
  args: {
    x: 2200,
    y: '250',
    horizontalAlign: 'none',
    verticalAlign: 'none',
  },
} satisfies Meta<AnnotationGroupProps>;

export function AnnotationGroup(props: AnnotationGroupProps) {
  return (
    <AnnotationPlot>
      <Annotation.Shape
        x={props.x}
        y={props.y}
        shape="square"
        size={5}
        style={{ fill: 'red' }}
      />
      <Annotation.Group {...props}>
        <Annotation.Text x="0" y="0">
          Hello, World!
        </Annotation.Text>
        <Annotation.Arrow x1="0" x2="100" y1="10" y2="10" />
      </Annotation.Group>
    </AnnotationPlot>
  );
}

AnnotationGroup.storyName = 'Annotation.Group';

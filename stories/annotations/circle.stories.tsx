import { Meta } from '@storybook/react';

import { Annotation, CircleProps } from '../../src';

import { AnnotationPlot } from './annotation.data';

export default {
  title: 'API/Annotations',
  component: Annotation.Circle,
  decorators: [
    (Story) => (
      <AnnotationPlot>
        <Story />
      </AnnotationPlot>
    ),
  ],
  args: {
    style: { fill: 'red' },
  },
} as Meta;

export function AnnotationCircleString(props: CircleProps) {
  return <Annotation.Circle {...props} />;
}

AnnotationCircleString.storyName = 'Annotation.Circle (string)';
AnnotationCircleString.args = {
  cx: '100',
  cy: '100',
  r: '20',
};

export const AnnotationCircleNumber = AnnotationCircleString.bind({});
AnnotationCircleNumber.storyName = 'Annotation.Circle (number)';
AnnotationCircleNumber.args = {
  cx: 10345,
  cy: 80,
  r: 1,
};

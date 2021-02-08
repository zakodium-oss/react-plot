import { Meta } from '@storybook/react';
import React from 'react';

import { Axis, LineSeries, Plot, Legend, Annotation } from '../src';

import { DEFAULT_CONFIG } from './utils';

const shapes = ['circle', 'triangle', 'diamond', 'square'];

export default {
  title: 'Docs/Annotations',
  decorators: [
    (Story) => (
      <Plot
        {...DEFAULT_CONFIG}
        seriesViewportStyle={{ stroke: 'black' }}
        margin={{
          bottom: 100,
          left: 100,
          top: 100,
          right: 200,
        }}
      >
        <Legend position="embedded" />

        <LineSeries
          data={data}
          xAxis="x"
          yAxis="y"
          label="Label line series"
          markerShape="pentagon"
          markerStyle={{ fill: 'green' }}
          displayMarker
        />

        <Annotations>
          <Story />
        </Annotations>

        <Axis id="x" position="bottom" label="X" />
        <Axis id="y" position="left" label="Y" />
      </Plot>
    ),
  ],
} as Meta;

const { Annotations } = Annotation;

const data = [
  {
    x: 0,
    y: 10,
  },
  {
    x: 1,
    y: 12,
  },
  {
    x: 2,
    y: 14,
  },
  {
    x: 3,
    y: 16,
  },
  {
    x: 4,
    y: 18,
  },
];

export function AnnotationRectangleStories() {
  return (
    <Annotation.Rectangle x="20" y="270" width="550" height="50" fill="red" />
  );
}

export function AnnotationRectangleValuesStories() {
  return (
    <Annotation.Rectangle x={1} y={15} width="100px" height={3} fill="red" />
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

export function AnnotationCircleStories() {
  return <Annotation.Circle cx="100" cy="100" r="20" style={{ fill: 'red' }} />;
}

export function AnnotationCircleValuesStories() {
  return <Annotation.Circle cx={1} cy={14} r={0.5} style={{ fill: 'red' }} />;
}

export function AnnotationLineStories() {
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

export function AnnotationTextStories() {
  return (
    <Annotation.Text x={50} y={150}>
      Hello, World!
    </Annotation.Text>
  );
}

export function AnnotationGroupStories() {
  return (
    <Annotation.Group x="50" y="150">
      <Annotation.Text>Hello, World!</Annotation.Text>
    </Annotation.Group>
  );
}

export function AnnotationGroupValuesStories() {
  return (
    <Annotation.Group x={1} y={15}>
      <Annotation.Text>Hello, World!</Annotation.Text>
    </Annotation.Group>
  );
}

export function AnnotationArrowStories() {
  return (
    <Annotation.Arrow
      x1={20}
      x2={90}
      y1={90}
      y2={250}
      startPoint="line"
      endPoint="triangle"
    />
  );
}

export function AnnotationShapeStories(props: {
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

AnnotationShapeStories.argTypes = {
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

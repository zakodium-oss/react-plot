import { Meta } from '@storybook/react';
import React from 'react';

import { Axis, LineSeries, Plot, Legend, Annotation } from '../src';

import { DEFAULT_CONFIG } from './utils';

export default {
  title: 'Docs/Annotations',
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

export function AnnotationsStories() {
  return (
    <Plot
      {...DEFAULT_CONFIG}
      viewportStyle={{ stroke: 'black' }}
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
        <Annotation.Rectangle
          x={10}
          y={20}
          width={500}
          height={50}
          fill="red"
        />
        <line x1={0} x2={20} />
      </Annotations>

      <Axis id="x" position="bottom" label="X" />
      <Axis id="y" position="left" label="Y" />
    </Plot>
  );
}

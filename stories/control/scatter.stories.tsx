import { Meta } from '@storybook/react';
import React from 'react';

import { Axis, Plot, ScatterSeries } from '../../src';

enum ShapeProps {
  'circle' = 'circle',
  'square' = 'square',
  'triangle' = 'triangle',
}

export default {
  title: 'API/Scatter',
  component: ScatterSeries,
  argTypes: {
    displayMarker: {
      control: 'boolean',
      defaultValue: true,
    },
    hidden: {
      control: 'boolean',
      defaultValue: false,
    },
    label: {
      control: 'text',
      defaultValue: 'Label',
    },
    markerShape: {
      control: { type: 'select', options: ShapeProps },
      defaultValue: ShapeProps.circle,
    },
    markerSize: {
      control: 'number',
      defaultValue: 5,
    },
  },
} as Meta;

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

interface ScatterControlProps {
  hidden: boolean;
  label: string;
  markerShape: ShapeProps;
  markerSize: number;
  lineStyle: string;
  displayMarker: boolean;
}

export function ScatterControl(props: ScatterControlProps) {
  return (
    <Plot
      width={900}
      height={540}
      viewportStyle={{ stroke: 'black' }}
      margin={{
        bottom: 100,
        left: 40,
        top: 40,
        right: 40,
      }}
    >
      <ScatterSeries data={data} xAxis="x" yAxis="y" {...props} />
      <Axis id="x" position="bottom" label="X" />
      <Axis id="y" position="left" label="Y" />
    </Plot>
  );
}

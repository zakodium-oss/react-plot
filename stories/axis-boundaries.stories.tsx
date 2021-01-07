import { Meta } from '@storybook/react';
import React from 'react';

import { Plot, Heading, Legend, LineSeries, Axis } from '../src/index';

export default {
  title: 'Plot/Axis boundaries',
  component: Plot,
  argTypes: {
    width: { defaultValue: 550, control: 'number' },
    height: { defaultValue: 500, control: 'number' },
    xMin: { defaultValue: 0, control: 'number' },
    xMax: { defaultValue: 6, control: 'number' },
    yMin: { defaultValue: 0, control: 'number' },
    yMax: { defaultValue: 6, control: 'number' },
    paddingLeft: { defaultValue: 0.01, control: 'number' },
    paddingRight: { defaultValue: 0.01, control: 'number' },
    paddingTop: { defaultValue: 0.01, control: 'number' },
    paddingBottom: { defaultValue: 0.01, control: 'number' },
  },
} as Meta;

export function Control(props: Record<string, number>) {
  const {
    width,
    height,
    xMin,
    xMax,
    yMax,
    yMin,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
  } = props;
  return (
    <Plot
      width={width}
      height={height}
      margin={{ bottom: 50, left: 70, top: 50, right: 100 }}
    >
      <Heading
        title="Electrical characterization"
        subtitle="current vs voltage"
      />
      <LineSeries
        data={[
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 3 },
          { x: 4, y: 3 },
          { x: 5, y: 3 },
        ]}
        lineStyle={{ strokeWidth: 3 }}
        label="Vg = 7V"
        displayMarker={false}
      />
      <LineSeries
        data={[
          { x: 1, y: 2 },
          { x: 2, y: 4 },
          { x: 3, y: 6 },
          { x: 4, y: 6 },
          { x: 5, y: 6 },
          { x: 6, y: 6 },
        ]}
        displayMarker={true}
        markerShape="circle"
        label="Vg = 3V"
      />
      <Axis
        position="horizontal"
        label="Drain voltage [V]"
        showGridLines={true}
        min={xMin}
        max={xMax}
        padding={[paddingLeft, paddingRight]}
      />
      <Axis
        position="vertical"
        label="Drain current [mA]"
        showGridLines={true}
        labelSpace={40}
        min={yMin}
        max={yMax}
        padding={[paddingBottom, paddingTop]}
      />
      <Legend position="right" />
    </Plot>
  );
}

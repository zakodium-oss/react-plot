import { Meta } from '@storybook/react';
import React from 'react';

import { Plot, Heading, Legend, LineSeries, Axis } from '../src/index';

export default {
  title: 'Plot/Axis boundaries',
  component: Plot,
  argTypes: {
    width: { defaultValue: 550, control: 'number' },
    height: { defaultValue: 500, control: 'number' },
    allTicksInside: { defaultValue: false, control: 'boolean' },
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

type Props = Record<string, number> & { allTicksInside: boolean };
export function Control(props: Props) {
  const {
    width,
    height,
    allTicksInside,
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
      margin={{ bottom: 50, left: 120, top: 80, right: 120 }}
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
        xAxis="x"
        yAxis="y"
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
        xAxis="x"
        yAxis="y"
        displayMarker={true}
        markerShape="circle"
        label="Vg = 3V"
      />
      <Axis
        id="x"
        position="bottom"
        label="Drain voltage [V]"
        showGridLines={true}
        min={xMin}
        max={xMax}
        padding={[paddingLeft, paddingRight]}
        tickEmbedded={allTicksInside}
      />
      <Axis
        id="y"
        position="left"
        label="Drain current [mA]"
        showGridLines={true}
        labelSpace={40}
        min={yMin}
        max={yMax}
        padding={[paddingBottom, paddingTop]}
        tickEmbedded={allTicksInside}
      />
      <Axis
        id="y"
        position="right"
        tickEmbedded={allTicksInside}
        label="Drain current [mA]"
      />
      <Axis id="x" position="top" tickEmbedded={allTicksInside} />
      <Legend position="embedded" bottom={50} right={90} />
    </Plot>
  );
}

import { Meta } from '@storybook/react';
import React from 'react';

import { Plot, Heading, Legend, LineSeries, Axis } from '../src/index';

export default {
  title: 'Plot/General options',
  component: Plot,
  argTypes: {
    width: {
      defaultValue: 550,
      control: 'number',
    },
    height: {
      defaultValue: 500,
      control: 'number',
    },
    displayPlot: {
      defaultValue: true,
      control: 'boolean',
    },
    showGridLines: {
      defaultValue: true,
      control: 'boolean',
    },
    headingPosition: {
      defaultValue: 'top',
      control: { type: 'select', options: ['top', 'bottom'] },
    },
    legendPosition: {
      defaultValue: 'right',
      control: { type: 'select', options: ['left', 'right'] },
    },
    showAxis: {
      defaultValue: true,
      control: 'boolean',
    },
    xFlip: {
      defaultValue: false,
      control: 'boolean',
    },
    yFlip: {
      defaultValue: false,
      control: 'boolean',
    },
  },
} as Meta;

export function Control(props) {
  const {
    displayPlot,
    showGridLines,
    width,
    height,
    headingPosition,
    legendPosition,
    showAxis,
    xFlip,
    yFlip,
  } = props;

  const bottom = headingPosition === 'top' ? 50 : 100;
  const left = legendPosition === 'right' ? 70 : 150;
  const top = headingPosition === 'top' ? 50 : 10;
  const right = legendPosition === 'right' ? 100 : 10;

  return (
    <Plot width={width} height={height} margin={{ bottom, left, top, right }}>
      <Heading
        title="Electrical characterization"
        subtitle="current vs voltage"
        position={headingPosition}
      />
      {displayPlot && (
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
      )}
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
        position="bottom"
        label="Drain voltage [V]"
        showGridLines={showGridLines}
        display={showAxis}
        flip={xFlip}
      />
      <Axis
        position="left"
        label="Drain current [mA]"
        showGridLines={showGridLines}
        labelSpace={40}
        display={showAxis}
        flip={yFlip}
      />
      <Legend position={legendPosition} />
    </Plot>
  );
}

export function ScientificNotation() {
  const factor = 1000;
  return (
    <Plot
      width={550}
      height={500}
      margin={{ bottom: 50, left: 90, top: 50, right: 100 }}
    >
      <Heading
        title="Electrical characterization"
        subtitle="current vs voltage"
      />
      <LineSeries
        data={[
          { x: 0 / factor, y: 0 * factor },
          { x: 1 / factor, y: 1 * factor },
          { x: 2 / factor, y: 2 * factor },
          { x: 3 / factor, y: 3 * factor },
          { x: 4 / factor, y: 3 * factor },
          { x: 5 / factor, y: 3 * factor },
        ]}
        lineStyle={{ strokeWidth: 3 }}
        label="Vg = 7V"
        displayMarker={false}
      />
      <LineSeries
        data={[
          { x: 1 / factor, y: 2 * factor },
          { x: 2 / factor, y: 4 * factor },
          { x: 3 / factor, y: 6 * factor },
          { x: 4 / factor, y: 6 * factor },
          { x: 5 / factor, y: 6 * factor },
          { x: 6 / factor, y: 6 * factor },
        ]}
        displayMarker={true}
        markerShape="circle"
        label="Vg = 3V"
      />
      <Axis
        position="bottom"
        label="Drain voltage [V]"
        showGridLines={true}
        max={6.1 / factor}
        tickStyle={{ fontSize: '0.8rem' }}
      />
      <Axis
        position="left"
        label="Drain current [mA]"
        showGridLines={true}
        labelSpace={50}
        max={6.1 * factor}
        tickStyle={{ fontSize: '0.8rem' }}
      />
      <Legend position="right" />
    </Plot>
  );
}

import { Meta } from '@storybook/react';
import React from 'react';

import { Plot, Heading, Legend, LineSeries, XAxis, YAxis } from '../src/index';

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
          data={{ x: [0, 1, 2, 3, 4, 5], y: [0, 1, 2, 3, 3, 3] }}
          lineStyle={{ strokeWidth: 3 }}
          label="Vg = 7V"
          displayMarker={false}
        />
      )}
      <LineSeries
        data={{ x: [1, 2, 3, 4, 5, 6], y: [2, 4, 6, 6, 6, 6] }}
        displayMarker={true}
        markerShape="circle"
        label="Vg = 3V"
      />
      <XAxis label="Drain voltage [V]" showGridLines={showGridLines} />
      <YAxis
        label="Drain current [mA]"
        showGridLines={showGridLines}
        labelSpace={40}
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
      margin={{ bottom: 50, left: 70, top: 50, right: 100 }}
    >
      <Heading
        title="Electrical characterization"
        subtitle="current vs voltage"
      />
      <LineSeries
        data={{
          x: [0, 1, 2, 3, 4, 5].map((val) => val / factor),
          y: [0, 1, 2, 3, 3, 3].map((val) => val * factor),
        }}
        lineStyle={{ strokeWidth: 3 }}
        label="Vg = 7V"
        displayMarker={false}
      />
      <LineSeries
        data={{
          x: [1, 2, 3, 4, 5, 6].map((val) => val / factor),
          y: [2, 4, 6, 6, 6, 6].map((val) => val * factor),
        }}
        displayMarker={true}
        markerShape="circle"
        label="Vg = 3V"
      />
      <XAxis
        label="Drain voltage [V]"
        showGridLines={true}
        max={6.1 / factor}
      />
      <YAxis
        label="Drain current [mA]"
        showGridLines={true}
        labelSpace={40}
        max={6.1 * factor}
      />
      <Legend position="right" />
    </Plot>
  );
}

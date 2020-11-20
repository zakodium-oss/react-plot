import { Meta } from '@storybook/react';
import React from 'react';

import { Plot, Heading, Legend, LineSeries, XAxis, YAxis } from '../src/index';

export default {
  title: 'Example/Plot',
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
    display: {
      control: 'boolean',
      defaultValue: true,
    },
    showGridLines: {
      control: 'boolean',
      defaultValue: true,
    },
  },
} as Meta;

export function Control(props) {
  const { display, showGridLines, ...other } = props;
  return (
    <Plot {...other} margin={{ bottom: 50, left: 50, top: 50, right: 100 }}>
      <Heading
        title="Electrical characterization"
        subtitle="current vs voltage"
        position="top"
      />
      {display && (
        <LineSeries
          data={{ x: [0, 1, 2, 3, 4, 5], y: [0, 1, 2, 3, 3, 3] }}
          lineStyle={{ strokeWidth: 3 }}
          label="Vg = 7V"
        />
      )}
      <LineSeries
        data={{ x: [1, 2, 3, 4, 5, 6], y: [2, 4, 6, 6, 6, 6] }}
        label="Vg = 3V"
      />
      <XAxis label="Drain voltage [V]" showGridLines={showGridLines} />
      <YAxis label="Drain current [mA]" showGridLines={showGridLines} />
      <Legend position="right" />
    </Plot>
  );
}

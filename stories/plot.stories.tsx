import { Meta } from '@storybook/react';
import React from 'react';

import { Plot, LineSeries, XAxis, YAxis } from '../src/index';

export default {
  title: 'Example/Plot',
  component: Plot,
  argTypes: {
    width: {
      defaultValue: 500,
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
    <Plot {...other} margin={{ bottom: 50, left: 50, top: 10, right: 10 }}>
      {display && (
        <LineSeries
          data={{ x: [0, 1, 2, 3, 4, 5], y: [0, 1, 2, 3, 3, 3] }}
          lineStyle={{ stroke: 'blue', strokeWidth: 2 }}
          label="Vg = 7V"
        />
      )}
      <LineSeries
        data={{ x: [1, 2, 3, 4, 5, 6], y: [2, 4, 6, 6, 6, 6] }}
        lineStyle={{ stroke: 'red', strokeWidth: 2 }}
        label="Vg = 3V"
      />
      <XAxis label="Drain voltage [V]" showGridLines={showGridLines} />
      <YAxis label="Drain current [mA]" showGridLines={showGridLines} />
    </Plot>
  );
}

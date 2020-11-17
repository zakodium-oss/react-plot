import { Meta } from '@storybook/react';
import React from 'react';

import { Plot, LineSeries } from '../src/index';

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
  },
} as Meta;

export function Control(props) {
  return (
    <Plot {...props} margin={{ botom: 2 }}>
      <LineSeries
        data={{ x: [0, 1, 2, 3, 4, 5], y: [0, 1, 2, 3, 3, 3] }}
        lineStyle={{ stroke: 'blue', strokeWidth: 2 }}
        label="Vg = 7V"
      />
      <LineSeries
        data={{ x: [0, 1, 2, 3, 4, 5], y: [0, 2, 4, 6, 6, 6] }}
        lineStyle={{ stroke: 'blue', strokeWidth: 2 }}
        label="Vg = 3V"
      />
    </Plot>
  );
}

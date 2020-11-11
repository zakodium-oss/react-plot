import { Meta } from '@storybook/react';
import React from 'react';

import Plot, { LineSeries } from '../src/index';

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
        data={[
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 3 },
          { x: 4, y: 3 },
          { x: 5, y: 3 },
        ]}
        lineStyle={{ stroke: 'blue', strokeWidth: 2 }}
        label="Vg = 7V"
      />
      <LineSeries
        data={[
          { x: 0, y: 0 },
          { x: 1, y: 2 },
          { x: 2, y: 4 },
          { x: 3, y: 6 },
          { x: 4, y: 6 },
          { x: 5, y: 6 },
        ]}
        lineStyle={{ stroke: 'blue', strokeWidth: 2 }}
        label="Vg = 3V"
      />
    </Plot>
  );
}

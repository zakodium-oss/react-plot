import { Meta } from '@storybook/react';
import React from 'react';

import { Axis, LineSeries, Plot } from '../../src';
import data from '../data/mass.json';

export default {
  title: 'Experimental spectra/Mass',
} as Meta;

export function MassExample() {
  return (
    <Plot
      width={1400}
      height={540}
      margin={{ bottom: 45, left: 40, top: 40, right: 40 }}
      viewportStyle={{ stroke: 'black' }}
    >
      <LineSeries
        data={data}
        xAxis="x"
        yAxis="y"
        lineStyle={{ stroke: 'black' }}
      />
      <Axis id="x" position="bottom" label="mass [m/z]" />
      <Axis
        id="y"
        position="left"
        label="Relative intensity"
        padding={[0.1, 0.1]}
      />
    </Plot>
  );
}

import { Meta } from '@storybook/react';
import React from 'react';

import { Axis, LineSeries, Plot } from '../../src';
import data from '../data/infrared.json';

export default {
  title: 'Experimental spectra/Infrared',
} as Meta;

export function InfraredExample() {
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
      <Axis id="x" position="bottom" label="Wavenumber [cm⁻¹]" display flip />
      <Axis
        id="y"
        position="left"
        label="Transmittance [%T]"
        display
        padding={[0.1, 0.1]}
      />
    </Plot>
  );
}

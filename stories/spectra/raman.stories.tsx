import { Meta } from '@storybook/react';
import React from 'react';

import { Axis, LineSeries, Plot } from '../../src';
import data from '../data/raman.json';

export default {
  title: 'Experimental spectra/Raman',
} as Meta;

export function RamanExample() {
  return (
    <Plot
      width={1400}
      height={540}
      margin={{ bottom: 45, left: 50, top: 40, right: 40 }}
      viewportStyle={{ stroke: 'black' }}
    >
      <LineSeries
        data={data}
        xAxis="x"
        yAxis="y"
        lineStyle={{ stroke: 'black' }}
      />
      <Axis id="x" position="bottom" label="Raman shift / cm⁻¹" />
      <Axis
        id="y"
        position="left"
        label="Intensity / arbitrary"
        hiddenTicks
        paddingStart={0.1}
        paddingEnd={0.1}
      />
    </Plot>
  );
}

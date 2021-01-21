import { Meta } from '@storybook/react';
import React from 'react';

import { Axis, LineSeries, Plot } from '../../src';
import data from '../data/nmr.json';

export default {
  title: 'Experimental spectra/NMR',
} as Meta;

export function NmrExample() {
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
      <Axis id="x" position="bottom" label="δ [ppm]" flip />
      <Axis
        id="y"
        position="left"
        label="Intensity / arbitrary"
        hidden
        padding={[0.1, 0.1]}
      />
    </Plot>
  );
}

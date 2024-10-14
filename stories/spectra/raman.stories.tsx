import type { Meta } from '@storybook/react';

import { Axis, LineSeries, Plot } from '../../src/index.js';
import data from '../data/raman.json';
import { DEFAULT_PLOT_CONFIG } from '../utils.js';

export default {
  title: 'Experimental spectra/Raman',
} satisfies Meta;

export function RamanExample() {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
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
        paddingStart="10%"
        paddingEnd="10%"
      />
    </Plot>
  );
}

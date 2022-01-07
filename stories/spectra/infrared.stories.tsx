import { Meta } from '@storybook/react';

import { Axis, Plot } from '../../src';
import { DEFAULT_PLOT_CONFIG, getInfraredSeries } from '../utils';

export default {
  title: 'Experimental spectra/Infrared',
} as Meta;

export function InfraredExample() {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {getInfraredSeries()}
      <Axis id="x" position="bottom" label="Wavenumber [cm⁻¹]" flip />
      <Axis
        id="y"
        position="left"
        label="Transmittance [%]"
        paddingStart={0.1}
        paddingEnd={0.1}
      />
    </Plot>
  );
}

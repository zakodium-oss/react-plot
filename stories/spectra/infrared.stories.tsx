import { Meta } from '@storybook/react';

import { Axis, LineSeries, Plot } from '../../src';
import data from '../data/infrared.json';
import { DEFAULT_CONFIG } from '../utils';

export default {
  title: 'Experimental spectra/Infrared',
} as Meta;

export function InfraredExample() {
  return (
    <Plot
      {...DEFAULT_CONFIG}
      margin={{ left: 40, right: 40 }}
      seriesViewportStyle={{ stroke: 'black' }}
    >
      <LineSeries
        data={data}
        xAxis="x"
        yAxis="y"
        lineStyle={{ stroke: 'black' }}
      />
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

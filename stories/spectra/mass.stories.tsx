import { Meta } from '@storybook/react';

import { Axis, BarSeries, LineSeries, Plot } from '../../src';
import advancedData from '../data/HCys100OH_0.01.json';
import data from '../data/mass.json';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'Experimental spectra/Mass',
} as Meta;

export function MassExample() {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <BarSeries
        data={data}
        xAxis="x"
        yAxis="y"
        lineStyle={{ stroke: 'blue' }}
      />
      <Axis id="x" position="bottom" label="Mass [m/z]" />
      <Axis
        id="y"
        position="left"
        label="Relative intensity [%]"
        paddingEnd={0.1}
      />
    </Plot>
  );
}
export function AdvancedMassExample() {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <LineSeries
        data={advancedData.profile}
        lineStyle={{ stroke: 'green' }}
        xAxis="x"
        yAxis="y"
      />
      <BarSeries
        data={advancedData.centroid}
        xAxis="x"
        yAxis="y"
        lineStyle={{ stroke: 'red' }}
      />
      <Axis id="x" position="bottom" label="Mass [m/z]" />
      <Axis
        id="y"
        position="left"
        label="Relative intensity [%]"
        paddingEnd={0.1}
      />
    </Plot>
  );
}

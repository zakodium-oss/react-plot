import { Meta } from '@storybook/react';
import { xyToXYObject } from 'ml-spectra-processing';

import { Axis, LineSeries, Plot } from '../../src';
import data from '../data/nmr.json';
import stackData from '../data/stack-spectra.json';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'Experimental spectra/NMR',
} as Meta;

export function NmrExample() {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
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
        paddingStart="10%"
        paddingEnd="10%"
      />
    </Plot>
  );
}
interface StackData {
  x: number[];
  y: number[];
  color: string;
}
export function StackSpectra() {
  const dataList = (stackData as StackData[]).map(({ x, y, color }) => ({
    data: xyToXYObject({ x, y }),
    color,
  }));
  const LineSeriesList = dataList.map(({ data, color }, i) => (
    <LineSeries
      // eslint-disable-next-line react/no-array-index-key
      key={i}
      data={data}
      xAxis="x"
      yAxis="y"
      lineStyle={{ stroke: color }}
      yShift={`${i * -7}`}
    />
  ));
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {LineSeriesList}
      <Axis id="x" position="bottom" label="δ [ppm]" flip />
      <Axis
        id="y"
        position="left"
        label="Intensity / arbitrary"
        hidden
        paddingEnd="50%"
      />
    </Plot>
  );
}

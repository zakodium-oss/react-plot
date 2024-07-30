import { Meta } from '@storybook/react';

import { Axis, Heading, Plot, ScatterSeries, SeriesPoint } from '../../src';
import data from '../data/color-serie.json';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'Examples/Color Serie',
} satisfies Meta;
interface Data extends SeriesPoint {
  color: string;
}
export function ColorSerie() {
  const data1: Data[] = data.x.map((x, i) => ({
    x,
    y: data.y[i],
    color: data.color[i],
  }));
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <Heading title="COVID-19 cases in USA (2020)" />
      <ScatterSeries
        data={data1}
        displayMarkers={false}
        displayLines
        xAxis="x"
        yAxis="y"
        lineStyle={{ stroke: (d: Data) => d.color, strokeWidth: 2 }}
      />
      <Axis id="x" position="bottom" label="Wavelength [cm-1]" />
      <Axis id="y" position="left" label="Absorbance" paddingEnd="10%" />
    </Plot>
  );
}

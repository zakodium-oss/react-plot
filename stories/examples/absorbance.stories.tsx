import type { Meta } from '@storybook/react-vite';

import type { RangeSeriesPoint, SeriesPoint } from '../../src/index.js';
import { Axis, LineSeries, Plot, RangeSeries } from '../../src/index.js';
import data from '../data/absorb.json' with { type: 'json' };
import { DEFAULT_PLOT_CONFIG } from '../utils.js';

export default {
  title: 'Examples/Absorbance',
} satisfies Meta;

const lineData: SeriesPoint[] = [];
for (let x = 0; x <= data.data[0].x.length; x++) {
  lineData.push({ x: data.data[0].x[x], y: data.data[0].y[x] });
}
lineData.pop();

function getRangePosition(array: SeriesPoint[]): RangeSeriesPoint[] {
  if (array.length % 2 !== 0) throw new Error("The array isn't correct");
  const one = array.slice(0, array.length / 2);
  const two = array.slice(array.length / 2);
  two.reverse();

  const result: RangeSeriesPoint[] = [];

  for (let i = 0; i < one.length; i++) {
    result.push({
      x: one[i].x,
      y1: one[i].y,
      y2: two[i].y,
    });
  }

  return result;
}

export function Absorbance() {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {data.annotations.map((_, index) => (
        <RangeSeries
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          data={getRangePosition(data.annotations[index].properties.position)}
          lineStyle={{
            fill: data.annotations[index].properties.fillColor,
            fillOpacity: data.annotations[index].properties.fillOpacity,
          }}
          xAxis="x"
          yAxis="y"
        />
      ))}

      <LineSeries
        data={lineData}
        xAxis="x"
        yAxis="y"
        lineStyle={{ stroke: 'red' }}
      />

      <Axis id="x" position="bottom" label="Wavelength [cm-1]" flip />
      <Axis
        id="y"
        position="left"
        label="Absorbance"
        displayPrimaryGridLines
        paddingStart="2%"
        paddingEnd="10%"
      />
    </Plot>
  );
}

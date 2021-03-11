import { Meta } from '@storybook/react';

import { Axis, LineSeries, Plot, RangeSeries } from '../../src';
import { SeriesRangePointType } from '../../src/types';
import data from '../data/absorb.json';
import { DEFAULT_CONFIG } from '../utils';

export default {
  title: 'Examples/Absorbance',
} as Meta;

const lineData = [];
for (let x = 0; x <= data.data[0].x.length; x++) {
  lineData.push({ x: data.data[0].x[x], y: data.data[0].y[x] });
}
lineData.pop();

function getRangePosition(
  array: Array<{ x: number; y: number }>,
): Array<SeriesRangePointType> {
  if (array.length % 2 !== 0) throw new Error('The array isnt correct');
  const one = array.slice(0, array.length / 2);
  const two = array.slice(array.length / 2, array.length).reverse();

  const result: Array<SeriesRangePointType> = [];

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
    <Plot
      {...DEFAULT_CONFIG}
      margin={{ bottom: 70, left: 70, top: 50, right: 10 }}
      seriesViewportStyle={{
        stroke: 'black',
        strokeWidth: 0.3,
      }}
    >
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

      <Axis
        id="x"
        position="bottom"
        label="Wavelength [cm-1]"
        labelSpace={40}
        flip
      />
      <Axis
        id="y"
        position="left"
        label="Absorbance"
        labelSpace={50}
        displayGridLines
        paddingStart={0.1}
        paddingEnd={0.1}
      />
    </Plot>
  );
}

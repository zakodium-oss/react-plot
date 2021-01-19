import { Meta } from '@storybook/react';
import React from 'react';

import { Axis, LineSeries, Plot } from '../../src';
import data1 from '../data/tga1.json';
import data2 from '../data/tga2.json';

export default {
  title: 'Experimental spectra/TGA',
} as Meta;

export function TgaExample() {
  return (
    <Plot
      width={1400}
      height={540}
      margin={{ bottom: 45, left: 40, top: 40, right: 40 }}
      viewportStyle={{ stroke: 'black' }}
    >
      <LineSeries
        data={data1}
        xAxis="x"
        yAxis="y"
        lineStyle={{ stroke: 'red' }}
      />

      <LineSeries
        data={data2.map(({ x, y }) => {
          return { x, y: y * 100 };
        })}
        xAxis="x"
        yAxis="y"
        lineStyle={{ stroke: 'blue' }}
      />

      <Axis id="x" position="bottom" label="Temperature/°C" />
      <Axis id="y" position="left" label="Weight loss/%" padding={[0.1, 0.1]} />
    </Plot>
  );
}

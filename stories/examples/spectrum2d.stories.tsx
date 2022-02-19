import { Meta } from '@storybook/react';

import { Axis, LineSeries, Plot } from '../../src';
import data from '../data/spectrum2d.json';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'Examples/Spectrum 2D',
} as Meta;

export function Spectrum2D() {
  const dataList = data.y.map((yArray) =>
    yArray.map((y, i) => ({
      x: data.x[i],
      y,
    })),
  );
  const lineSeriesList = dataList
    .map((data, i) => (
      <LineSeries
        lineStyle={{ stroke: 'black', fill: 'white' }}
        // eslint-disable-next-line react/no-array-index-key
        key={i}
        data={data}
        xShift={`${i * 5}`}
        yShift={`${-i * 5}`}
      />
    ))
    .reverse();
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {lineSeriesList}
      <Axis
        id="x"
        position="bottom"
        label="P1"
        paddingStart="5%"
        paddingEnd="5%"
      />
      <Axis
        id="y"
        position="left"
        label="P2"
        hidden
        paddingStart="10%"
        paddingEnd="10%"
      />
    </Plot>
  );
}

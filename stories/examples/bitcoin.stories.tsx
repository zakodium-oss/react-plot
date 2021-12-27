import { Meta } from '@storybook/react';

import { Axis, LineSeries, Plot, Heading } from '../../src';
import data from '../data/bitcoin.json';
import { DEFAULT_CONFIG } from '../utils';

export default {
  title: 'Examples/Bitcoin prices',
} as Meta;

export function BitcoinPrice() {
  return (
    <Plot
      {...DEFAULT_CONFIG}
      seriesViewportStyle={{
        stroke: 'black',
        strokeWidth: 0.3,
      }}
    >
      <Heading
        title="Bitcoin close price per day"
        subtitle={'With High & Low prices'}
      />
      <LineSeries
        data={data}
        xAxis="x"
        yAxis="y"
        lineStyle={{ stroke: 'green', strokeWidth: 2 }}
        displayMarker
        displayErrorBars
        markerStyle={{ fill: 'green', stroke: 'none' }}
        errorBarsCapSize={8}
        errorBarsCapStyle={{ stroke: 'blue', strokeWidth: 1.5 }}
      />
      <Axis id="x" position="bottom" label="Days" />
      <Axis
        id="y"
        position="left"
        label="$$$"
        paddingStart={0.1}
        paddingEnd={0.1}
      />
    </Plot>
  );
}

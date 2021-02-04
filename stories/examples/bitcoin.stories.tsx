import { Meta } from '@storybook/react';
import React from 'react';

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
      margin={{ bottom: 50, left: 100, top: 50, right: 10 }}
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
        displayMarker={true}
        markerStyle={{ fill: 'green', stroke: 'none' }}
      />
      <Axis id="x" position="bottom" label="Days" labelSpace={30} />
      <Axis
        id="y"
        position="left"
        label="$$$"
        labelSpace={68}
        paddingStart={0.1}
        paddingEnd={0.1}
      />
    </Plot>
  );
}

import { Meta } from '@storybook/react';
import React from 'react';

import { Axis, LineSeries, Plot, Heading } from '../../src';
import data from '../data/covid-cases.json';
import { DEFAULT_CONFIG } from '../utils';

export default {
  title: 'Examples/Covid19 cases-USA',
} as Meta;

export function Covid19Cases() {
  return (
    <Plot
      {...DEFAULT_CONFIG}
      margin={{ bottom: 50, left: 100, top: 50, right: 10 }}
      viewportStyle={{
        stroke: 'black',
        strokeWidth: 0.3,
      }}
    >
      <Heading title="COVID-19 cases in USA (2020)" />
      <LineSeries
        data={data}
        xAxis="x"
        yAxis="y"
        lineStyle={{ stroke: 'red', strokeWidth: 2 }}
      />
      <Axis id="x" position="bottom" label="Week" labelSpace={30} />
      <Axis
        id="y"
        position="left"
        label="Number of cases"
        labelSpace={68}
        paddingEnd={0.1}
      />
    </Plot>
  );
}

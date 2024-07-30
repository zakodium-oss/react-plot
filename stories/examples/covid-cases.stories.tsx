import { Meta } from '@storybook/react';

import { Axis, Heading, LineSeries, Plot } from '../../src';
import data from '../data/covid-cases.json';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'Examples/Covid19 cases-USA',
} satisfies Meta;

export function Covid19Cases() {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <Heading title="COVID-19 cases in USA (2020)" />
      <LineSeries
        data={data}
        xAxis="x"
        yAxis="y"
        lineStyle={{ stroke: 'red', strokeWidth: 2 }}
      />
      <Axis id="x" position="bottom" label="Week" />
      <Axis id="y" position="left" label="Number of cases" paddingEnd="10%" />
    </Plot>
  );
}

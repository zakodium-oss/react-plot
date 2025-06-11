import type { Meta } from '@storybook/react-vite';
import { Fragment } from 'react';

import {
  Axis,
  Heading,
  Legend,
  LineSeries,
  Plot,
  ScatterSeries,
} from '../../src/index.js';
import { DEFAULT_PLOT_CONFIG } from '../utils.js';

export default {
  title: 'Examples/Bed per 10^3 people',
} satisfies Meta;

const data = Array.from(generateNumbers(160))
  .sort((a, b) => b.beds - a.beds)
  .map((e, i) => ({ ...e, country: i }));

export function Covid19BedCases() {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <Heading title="(C) NCC=0.20 (***)" />
      <Legend position="top" />

      <Axis
        id="country"
        position="bottom"
        labelStyle={{ fontWeight: 'bold' }}
        tickLabelStyle={{ fontWeight: 'bold' }}
        label="Country"
      />

      <Axis
        id="beds"
        max={12}
        position="right"
        label={<Fragment>Hospital bed per 10&sup3; people</Fragment>}
      />

      <Axis
        id="cases"
        max={200}
        position="left"
        label={<Fragment>COVID-19 cases per 10&sup3; people</Fragment>}
      />

      <ScatterSeries
        markerStyle={{ fill: 'red', stroke: 'red' }}
        data={data.map((e) => {
          return {
            x: e.country,
            y: e.cases,
          };
        })}
        xAxis="country"
        yAxis="cases"
        label="COVID-19 case fatality"
      />

      <LineSeries
        lineStyle={{ stroke: 'blue' }}
        data={data.map((e) => {
          return {
            x: e.country,
            y: e.beds,
          };
        })}
        xAxis="country"
        yAxis="beds"
        label="Hospital beds"
      />
    </Plot>
  );
}

function* generateNumbers(elements: number) {
  for (let i = 0; i < elements; i++) {
    const result = {
      country: 0,
      beds: Math.random() * 12,
      cases: Math.floor(Math.random() * 200),
    };

    yield result;
  }
}

import { Meta } from '@storybook/react';
import { useState } from 'react';

import {
  Axis,
  Legend,
  LegendProps,
  LineSeries,
  ParallelAxis,
  Plot,
} from '../../src';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'API/Legend',
  component: Legend,
  args: {
    position: 'embedded',
  },
} as Meta;

const data1 = [
  { x: 0, y: 10 },
  { x: 1, y: 12 },
  { x: 2, y: 14 },
  { x: 3, y: 16 },
  { x: 4, y: 18 },
];

const data2 = [
  { x: 0, y: 20 },
  { x: 1, y: 22 },
  { x: 2, y: 24 },
  { x: 3, y: 26 },
  { x: 4, y: 28 },
];

export function Control(props: LegendProps) {
  const [highlight, setHighlight] = useState<boolean>(false);
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <Legend
        {...props}
        onClick={() => {
          setHighlight((highlight) => !highlight);
        }}
      />
      <LineSeries
        data={data1}
        lineStyle={{
          strokeWidth: highlight ? '5' : '',
        }}
        xAxis="x"
        yAxis="y"
        label="Label line series"
      />
      <Axis id="x" position="bottom" label="X" />
      <Axis id="y" position="left" label="Y" />
      <ParallelAxis id="x" />
      <ParallelAxis id="y" />
    </Plot>
  );
}

type TestProps = LegendProps & { hidden: boolean };

export function WithTwoSeries(props: TestProps) {
  const { hidden, ...otherProps } = props;
  const [highlightSeries, setHighlightSeries] = useState<boolean[]>([
    undefined,
  ]);
  const updateHightlight = (id: number) => {
    setHighlightSeries((highlightSeries) => ({
      ...highlightSeries,
      [id]: !highlightSeries[id],
    }));
  };
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <Legend {...otherProps} onClick={(id) => () => updateHightlight(id)} />
      <LineSeries
        data={data1}
        lineStyle={{
          strokeWidth: highlightSeries[0] ? '5' : '',
        }}
        xAxis="x"
        yAxis="y"
        label="Label line series"
      />
      <LineSeries
        data={data2}
        markerStyle={{ fill: 'green' }}
        lineStyle={{
          stroke: 'blue',
          strokeWidth: highlightSeries[1] ? '5' : '',
        }}
        markerShape="square"
        displayMarker
        xAxis="x"
        yAxis="y"
        label="Label line series 2"
        hidden={hidden}
      />
      <Axis id="x" position="bottom" label="X" />
      <Axis id="y" position="left" label="Y" />
    </Plot>
  );
}

WithTwoSeries.storyName = 'With two series';
WithTwoSeries.args = {
  hidden: false,
};

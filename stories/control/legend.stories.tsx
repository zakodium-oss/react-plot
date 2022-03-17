import { Meta } from '@storybook/react';
import { useState } from 'react';

import {
  Axis,
  BarSeries,
  Legend,
  LegendProps,
  LineSeries,
  ParallelAxis,
  Plot,
  RangeSeries,
  ScatterSeries,
} from '../../src';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'API/Legend',
  component: Legend,
  args: {
    position: 'embedded',
    margin: 10,
    showHide: false,
    lineStyle: {},
    labelStyle: {},
  },
} as Meta<LegendProps>;

const data1 = [
  { x: 0, y: 10 },
  { x: 1, y: 12 },
  { x: 2, y: 6 },
  { x: 3, y: 3 },
  { x: 4, y: 18 },
];

const data2 = [
  { x: 0, y: 20 },
  { x: 1, y: 22 },
  { x: 2, y: 24 },
  { x: 3, y: 26 },
  { x: 4, y: 28 },
];

const data3 = [
  { x: 0, y: 12 },
  { x: 0.5, y: 4 },
  { x: 3.5, y: 23 },
  { x: 4, y: 10 },
  { x: 6, y: 15 },
];

const data4 = [
  { x: 0, y1: 11, y2: 10 },
  { x: 1, y1: 6, y2: 3 },
  { x: 3, y1: 25, y2: 20 },
  { x: 4.5, y1: 11, y2: 9 },
  { x: 6, y1: 14, y2: 11 },
];
export function Control(props: LegendProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <Legend {...props} />
      <LineSeries data={data1} xAxis="x" yAxis="y" label="Label line series" />
      <Axis id="x" position="bottom" label="X" />
      <Axis id="y" position="left" label="Y" />
      <ParallelAxis id="x" />
      <ParallelAxis id="y" />
    </Plot>
  );
}

export function WithHiddenSerie() {
  const [hidden, setHidden] = useState(false);
  const [highlightSeries, setHighlightSeries] = useState<
    Record<string, boolean>
  >({});
  const updateHightlight = (id: string) => {
    setHighlightSeries((highlightSeries) => ({
      ...highlightSeries,
      [id]: !highlightSeries[id],
    }));
  };
  const lineStyle = {
    strokeWidth: ({ id }: { id: string }) => (highlightSeries[id] ? '5' : ''),
  };
  return (
    <>
      <div>
        <button type="button" onClick={() => setHidden((hidden) => !hidden)}>
          {hidden ? 'Show series 2' : 'Hide series 2'}
        </button>
      </div>
      <Plot {...DEFAULT_PLOT_CONFIG}>
        <Legend
          labelStyle={{
            fontWeight: ({ id }) => (highlightSeries[id] ? 'bold' : 'normal'),
            cursor: 'hand',
          }}
          onClick={({ id }) => updateHightlight(id)}
          lineStyle={lineStyle}
        />
        <LineSeries
          data={data1}
          lineStyle={lineStyle}
          xAxis="x"
          yAxis="y"
          label="Label line series"
        />
        <LineSeries
          data={data2}
          markerStyle={{ fill: 'green' }}
          lineStyle={{
            stroke: 'blue',
            ...lineStyle,
          }}
          markerShape="square"
          displayMarkers
          xAxis="x"
          yAxis="y"
          label="Label line series 2"
          hidden={hidden}
        />
        <Axis id="x" position="bottom" label="X" />
        <Axis id="y" position="left" label="Y" />
      </Plot>
    </>
  );
}

WithHiddenSerie.storyName = 'With hidden serie';

export function WithShowHide(props: LegendProps) {
  const { showHide, ...otherProps } = props;
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <Legend
        {...otherProps}
        showHide={showHide}
        labelStyle={{ cursor: 'hand' }}
      />
      <LineSeries
        lineStyle={{
          stroke: 'red',
        }}
        data={data1}
        xAxis="x"
        yAxis="y"
        label="Label line series"
      />
      <BarSeries
        data={data2}
        lineStyle={{
          stroke: 'green',
        }}
        label="Label Bar series"
      />
      <ScatterSeries
        data={data3}
        markerStyle={{ fill: 'blue' }}
        label="Label Scatter series"
      />
      <RangeSeries
        data={data4}
        lineStyle={{ fill: 'grey', stroke: 'black' }}
        label="Label Range series"
      />
      <Axis
        id="x"
        position="bottom"
        label="X"
        paddingEnd={0.1}
        paddingStart={0.1}
      />
      <Axis
        id="y"
        position="left"
        label="Y"
        paddingEnd={0.1}
        paddingStart={0.1}
      />
    </Plot>
  );
}

WithShowHide.storyName = 'With Show Hide prop';
WithShowHide.args = {
  showHide: true,
};

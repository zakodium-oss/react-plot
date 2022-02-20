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
} as Meta<LegendProps>;

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

const data3 = [
  { x: 0, y: 12 },
  { x: 1, y: 4 },
  { x: 2, y: 23 },
  { x: 3, y: 10 },
  { x: 4, y: 15 },
];

export function Control(props: LegendProps) {
  const [highlight, setHighlight] = useState<boolean>(false);
  const lineStyle = {
    strokeWidth: highlight ? '5' : '',
  };
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <Legend
        {...props}
        onClick={() => {
          setHighlight((highlight) => !highlight);
        }}
        labelStyle={{
          fontWeight: highlight ? 'bold' : 'normal',
          cursor: 'hand',
        }}
        lineStyle={lineStyle}
      />
      <LineSeries
        data={data1}
        lineStyle={lineStyle}
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

export function WithHiddenSerie(props: LegendProps) {
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
          {...props}
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
          displayMarker
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
      <LineSeries
        data={data2}
        markerStyle={{ fill: 'green' }}
        lineStyle={{
          stroke: 'blue',
        }}
        markerShape="square"
        displayMarker
        xAxis="x"
        yAxis="y"
        label="Label line series 2"
      />
      <LineSeries
        data={data3}
        lineStyle={{
          stroke: 'green',
        }}
        xAxis="x"
        yAxis="y"
        label="Label line series 3"
      />
      <Axis id="x" position="bottom" label="X" />
      <Axis id="y" position="left" label="Y" />
    </Plot>
  );
}

WithShowHide.storyName = 'With Show Hide prop';
WithShowHide.args = {
  showHide: true,
};

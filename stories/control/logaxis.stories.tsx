import { Meta } from '@storybook/react';

import { Axis, LineSeries, Plot } from '../../src';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'API/LogAxis',
  args: {
    label: 'Label',
    hiddenSecondaryTicks: false,
    hidden: false,
    hiddenTicks: false,
  },
} as Meta;

interface AxisControlProps {
  label: string;
  paddingStart: number;
  paddingEnd: number;
}

const data = [
  { x: 0.00001, y: 10 },
  { x: 0.0001, y: 100 },
  { x: 0.001, y: 1000 },
  { x: 0.01, y: 10000 },
  { x: 0.1, y: 100000 },
];
const dataB = [
  { x: 0.0000000001, y: 10000000000 },
  { x: 0.000000001, y: 1000000000 },
  { x: 0.00000001, y: 100000000 },
  { x: 0.0000001, y: 10000000 },
  { x: 0.000001, y: 1000000 },
  { x: 0.00001, y: 100000 },
  { x: 0.0001, y: 10000 },
  { x: 0.001, y: 1000 },
  { x: 0.01, y: 100 },
  { x: 0.1, y: 10 },
  { x: 1, y: 1 },
  { x: 10, y: 0.1 },
  { x: 100, y: 0.01 },
  { x: 1000, y: 0.001 },
  { x: 10000, y: 0.0001 },
  { x: 100000, y: 0.00001 },
  { x: 1000000, y: 0.000001 },
  { x: 10000000, y: 0.0000001 },
  { x: 100000000, y: 0.00000001 },
  { x: 1000000000, y: 0.000000001 },
  { x: 10000000000, y: 0.0000000001 },
];

const logSeries = (
  <LineSeries data={data} lineStyle={{ stroke: '#777' }} xAxis="x" yAxis="y" />
);
const logSeriesB = (
  <LineSeries data={dataB} lineStyle={{ stroke: '#777' }} xAxis="x" yAxis="y" />
);

export function AxisLeftLogControl(props: AxisControlProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {logSeries}
      <Axis id="x" position="bottom" label="Label" />
      <Axis id="y" position="left" scale="log" {...props} />
    </Plot>
  );
}
export function AxisLeftLogControlB(props: AxisControlProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {logSeriesB}
      <Axis id="x" position="bottom" label="Label" />
      <Axis id="y" position="left" scale="log" {...props} />
    </Plot>
  );
}
export function AxisBottomLogControl(props: AxisControlProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {logSeries}
      <Axis id="x" position="bottom" scale="log" {...props} />
      <Axis id="y" position="left" label="Label" />
    </Plot>
  );
}
export function AxisBottomLogControlB(props: AxisControlProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {logSeriesB}
      <Axis id="x" position="bottom" scale="log" {...props} />
      <Axis id="y" position="left" label="Label" />
    </Plot>
  );
}
export function AxisRightLogControl(props: AxisControlProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {logSeries}
      <Axis id="x" position="bottom" label="Label" />
      <Axis id="y" position="right" scale="log" {...props} />
    </Plot>
  );
}

export function AxisTopLogControl(props: AxisControlProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {logSeries}
      <Axis id="x" position="top" scale="log" {...props} />
      <Axis id="y" position="left" label="Label" />
    </Plot>
  );
}

import type { Meta } from '@storybook/react';

import { Axis, LineSeries, Plot } from '../../src/index.js';
import { DEFAULT_PLOT_CONFIG } from '../utils.js';

export default {
  title: 'API/LogAxis',
  args: {
    label: 'Label',
    hiddenSecondaryTicks: false,
    hidden: false,
    hiddenTicks: false,
  },
} satisfies Meta;

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

const logSeries = (
  <LineSeries data={data} lineStyle={{ stroke: '#777' }} xAxis="x" yAxis="y" />
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

export function AxisBottomLogControl(props: AxisControlProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {logSeries}
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

import { Meta } from '@storybook/react';

import { Axis, LineSeries, Plot } from '../../src';
import { dataConvertDate } from '../../src/utils';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'API/TimeAxis',
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
const dataX = [
  { x: new Date(2002, 11, 24, 10, 33), y: 10 },
  { x: new Date(2002, 11, 24, 11, 33), y: 20 },
  { x: new Date(2002, 11, 24, 12, 33), y: 40 },
  { x: new Date(2002, 11, 24, 13, 33), y: 7 },
  { x: new Date(2002, 11, 24, 14, 33), y: 15 },
];
const dataY = [
  { x: 3, y: new Date(2002, 11, 24, 10, 33) },
  { x: 6, y: new Date(2002, 11, 24, 11, 33) },
  { x: 12, y: new Date(2002, 11, 24, 12, 33) },
  { x: 14, y: new Date(2002, 11, 24, 13, 33) },
  { x: 15, y: new Date(2002, 11, 24, 14, 33) },
];
const timeSeriesX = (
  <LineSeries
    data={dataConvertDate(dataX)}
    lineStyle={{ stroke: '#777' }}
    xAxis="x"
    yAxis="y"
  />
);
const timeSeriesY = (
  <LineSeries
    data={dataConvertDate(dataY)}
    lineStyle={{ stroke: '#777' }}
    xAxis="x"
    yAxis="y"
  />
);
export function AxisLeftTimeControl(props: AxisControlProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {timeSeriesY}
      <Axis
        id="x"
        position="bottom"
        label="Label"
        paddingEnd="10%"
        paddingStart="10%"
      />
      <Axis {...props} id="y" position="left" scale="time" />
    </Plot>
  );
}

export function AxisBottomTimeControl(props: AxisControlProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {timeSeriesX}
      <Axis {...props} id="x" position="bottom" scale="time" paddingEnd="10%" />
      <Axis id="y" position="left" label="Label" />
    </Plot>
  );
}

export function AxisRightTimeControl(props: AxisControlProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {timeSeriesY}
      <Axis id="x" position="bottom" label="Label" />
      <Axis
        {...props}
        id="y"
        position="right"
        scale="time"
        paddingStart="10%"
      />
    </Plot>
  );
}

export function AxisTopTimeControl(props: AxisControlProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {timeSeriesX}
      <Axis id="x" position="top" scale="time" {...props} />
      <Axis id="y" position="left" label="Label" />
    </Plot>
  );
}

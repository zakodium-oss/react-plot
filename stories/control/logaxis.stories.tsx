import { Meta } from '@storybook/react';

import { Axis, LineSeries, Plot } from '../../src';

export default {
  title: 'API/LogAxis',
  args: {
    label: 'Label',
  },
} as Meta;

const data = [
  { x: 0.00001, y: 10 },
  { x: 0.0001, y: 100 },
  { x: 0.001, y: 1000 },
  { x: 0.01, y: 10000 },
  { x: 0.1, y: 100000 },
];

interface AxisControlProps {
  label: string;
  paddingStart: number;
  paddingEnd: number;
}

const plot = {
  width: 900,
  height: 540,
  seriesViewportStyle: { stroke: 'black' },
};

export function AxisLeftLogControl(props: AxisControlProps) {
  return (
    <Plot {...plot} margin={{ bottom: 45, left: 90, top: 40, right: 20 }}>
      <LineSeries data={data} xAxis="x" yAxis="y" />
      <Axis id="x" position="bottom" label="Label" />
      <Axis id="y" position="left" logScale labelSpace={65} {...props} />
    </Plot>
  );
}

export function AxisBottomLogControl(props: AxisControlProps) {
  return (
    <Plot {...plot} margin={{ bottom: 45, left: 90, top: 40, right: 20 }}>
      <LineSeries data={data} xAxis="x" yAxis="y" />
      <Axis id="x" position="bottom" logScale {...props} />
      <Axis id="y" position="left" labelSpace={65} label="Label" />
    </Plot>
  );
}

export function AxisRightLogControl(props: AxisControlProps) {
  return (
    <Plot {...plot} margin={{ bottom: 45, left: 10, top: 20, right: 100 }}>
      <LineSeries data={data} xAxis="x" yAxis="y" />
      <Axis id="x" position="bottom" label="Label" />
      <Axis id="y" position="right" labelSpace={50} logScale {...props} />
    </Plot>
  );
}

export function AxisTopLogControl(props: AxisControlProps) {
  return (
    <Plot {...plot} margin={{ bottom: 20, left: 90, top: 60, right: 40 }}>
      <LineSeries data={data} xAxis="x" yAxis="y" />
      <Axis id="y" position="left" labelSpace={65} label="Label" />
      <Axis id="x" position="top" logScale {...props} />
    </Plot>
  );
}

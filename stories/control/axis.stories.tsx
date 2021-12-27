import { Meta } from '@storybook/react';

import { Axis, AxisProps, LineSeries, Plot, PlotProps } from '../../src';

export default {
  title: 'API/Axis',
  component: Axis,
  args: {
    label: 'Axis label',
  },
  parameters: {
    controls: {
      exclude: ['id', 'position'],
    },
  },
} as Meta;

const data = [
  {
    x: 0,
    y: 10,
  },
  {
    x: 1,
    y: 12,
  },
  {
    x: 2,
    y: 14,
  },
  {
    x: 3,
    y: 16,
  },
  {
    x: 4,
    y: 18,
  },
];

type AxisControlProps = Omit<AxisProps, 'id' | 'position'>;

const plot: Omit<PlotProps, 'children'> = {
  width: 900,
  height: 540,
  seriesViewportStyle: {
    stroke: 'black',
  },
};

export function AxisLeftControl(props: AxisControlProps) {
  return (
    <Plot {...plot}>
      <LineSeries data={data} xAxis="y" yAxis="x" />
      <Axis id="y" position="bottom" label="Label" />
      <Axis id="x" position="left" {...props} />
    </Plot>
  );
}

export function AxisBottomControl(props: AxisControlProps) {
  return (
    <Plot {...plot}>
      <LineSeries data={data} xAxis="y" yAxis="x" />
      <Axis id="y" position="bottom" {...props} />
      <Axis id="x" position="left" label="Label" />
    </Plot>
  );
}

export function AxisRightControl(props: AxisControlProps) {
  return (
    <Plot {...plot}>
      <LineSeries data={data} xAxis="y" yAxis="x" />
      <Axis id="y" position="bottom" label="Label" />
      <Axis id="x" position="right" {...props} />
    </Plot>
  );
}

export function AxisTopControl(props: AxisControlProps) {
  return (
    <Plot {...plot}>
      <LineSeries data={data} xAxis="x" yAxis="y" />
      <Axis id="y" position="left" label="Label" />
      <Axis id="x" position="top" {...props} />
    </Plot>
  );
}

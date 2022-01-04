import { Meta } from '@storybook/react';

import { Axis, AxisProps, Plot } from '../../src';
import { DEFAULT_PLOT_CONFIG, getInfraredSeries } from '../utils';

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
} as Meta<AxisProps>;

export function AxisLeft(props: AxisProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {getInfraredSeries()}
      <Axis id="x" position="bottom" />
      <Axis id="y" position="left" {...props} />
    </Plot>
  );
}

export function AxisBottom(props: AxisProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {getInfraredSeries()}
      <Axis id="x" position="bottom" {...props} />
      <Axis id="y" position="left" />
    </Plot>
  );
}

export function AxisRight(props: AxisProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {getInfraredSeries()}
      <Axis id="x" position="bottom" />
      <Axis id="y" position="right" {...props} />
    </Plot>
  );
}

export function AxisTop(props: AxisProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {getInfraredSeries()}
      <Axis id="x" position="top" {...props} />
      <Axis id="y" position="left" />
    </Plot>
  );
}

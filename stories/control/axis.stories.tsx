import type { Meta } from '@storybook/react';

import { Axis, type AxisProps, Plot } from '../../src/index.js';
import { DEFAULT_PLOT_CONFIG, getInfraredSeries } from '../utils.js';

export default {
  title: 'API/Axis',
  component: Axis,
  args: {
    label: 'Axis label',
    flip: false,
    scale: 'linear',
    displayPrimaryGridLines: false,
    displaySecondaryGridLines: false,
    hidden: false,
    tickLabelFormat: String,
    hiddenLine: false,
    hiddenTicks: false,
    tickPosition: 'outer',
    primaryTickLength: 5,
    secondaryTickLength: 2,
    paddingStart: 0,
    paddingEnd: 0,
  },
  parameters: {
    controls: {
      exclude: ['id', 'position'],
    },
  },
} satisfies Meta<AxisProps>;

export function AxisLeft(props: AxisProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {getInfraredSeries()}
      <Axis id="x" position="bottom" />
      <Axis id="y" {...props} position="left" />
    </Plot>
  );
}

export function AxisBottom(props: AxisProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {getInfraredSeries()}
      <Axis id="x" {...props} position="bottom" />
      <Axis id="y" position="left" />
    </Plot>
  );
}

export function AxisRight(props: AxisProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {getInfraredSeries()}
      <Axis id="x" position="bottom" />
      <Axis id="y" {...props} position="right" />
    </Plot>
  );
}

export function AxisTop(props: AxisProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {getInfraredSeries()}
      <Axis id="x" {...props} position="top" />
      <Axis id="y" position="left" />
    </Plot>
  );
}

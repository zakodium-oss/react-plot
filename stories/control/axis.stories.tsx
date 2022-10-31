import { Meta } from '@storybook/react';

import { Axis, AxisProps, Plot } from '../../src';
import { DEFAULT_PLOT_CONFIG, getInfraredSeries } from '../utils';

type AxisStoryProps = Omit<AxisProps, 'id' | 'position'>;

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
} as Meta<AxisStoryProps>;

export function AxisLeft(props: AxisStoryProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {getInfraredSeries()}
      <Axis id="x" position="bottom" />
      <Axis id="y" position="left" {...props} />
    </Plot>
  );
}

export function AxisBottom(props: AxisStoryProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {getInfraredSeries()}
      <Axis id="x" position="bottom" {...props} />
      <Axis id="y" position="left" />
    </Plot>
  );
}

export function AxisRight(props: AxisStoryProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {getInfraredSeries()}
      <Axis id="x" position="bottom" />
      <Axis id="y" position="right" {...props} />
    </Plot>
  );
}

export function AxisTop(props: AxisStoryProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {getInfraredSeries()}
      <Axis id="x" position="top" {...props} />
      <Axis id="y" position="left" />
    </Plot>
  );
}

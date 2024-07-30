import { Meta } from '@storybook/react';

import { Plot } from '../../src';
import { DEFAULT_PLOT_CONFIG, getInfraredSeries } from '../utils';

export default {
  title: 'Examples/Axis',
} satisfies Meta;

export function DefaultAxes() {
  return <Plot {...DEFAULT_PLOT_CONFIG}>{getInfraredSeries()}</Plot>;
}

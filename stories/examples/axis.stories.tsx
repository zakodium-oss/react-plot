import type { Meta } from '@storybook/react';

import { Plot } from '../../src/index.js';
import { DEFAULT_PLOT_CONFIG, getInfraredSeries } from '../utils.js';

export default {
  title: 'Examples/Axis',
} satisfies Meta;

export function DefaultAxes() {
  return <Plot {...DEFAULT_PLOT_CONFIG}>{getInfraredSeries()}</Plot>;
}

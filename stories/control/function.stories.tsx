import { Meta } from '@storybook/react';

import { Axis, Legend, Plot } from '../../src';
import {
  FunctionSeries,
  FunctionSeriesProps,
} from '../../src/components/FunctionSeries';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'API/FunctionSeries',
  component: FunctionSeries,
  args: {
    max: 10,
    min: 0,
    step: 0.001,
  },
} as Meta<FunctionSeriesProps>;

export function Control(args: FunctionSeriesProps) {
  const getY = (x: number) => 4 * Math.sin(2 * x);
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <Legend position="embedded" />
      <FunctionSeries
        data={getY}
        {...args}
        xAxis="x"
        yAxis="y"
        label="y=3*sin(2*x)"
      />
      <Axis min={0} max={50} id="x" position="bottom" />
      <Axis id="y" position="left" paddingStart={0.1} paddingEnd={0.1} />
    </Plot>
  );
}

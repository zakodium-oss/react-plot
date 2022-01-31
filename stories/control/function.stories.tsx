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
    xAxis: 'x',
  },
} as Meta<FunctionSeriesProps>;

function getY(x: number) {
  return 4 * Math.sin(2 * x);
}
export function Control(args: FunctionSeriesProps) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <Legend position="embedded" />
      <FunctionSeries
        getY={getY}
        {...args}
        xAxis="x"
        yAxis="y"
        label="y=4*sin(2*x)"
      />
      <Axis
        min={0}
        max={50}
        paddingStart={0.1}
        paddingEnd={0.1}
        id="x"
        position="bottom"
      />
      <Axis id="y" position="left" paddingStart={0.1} paddingEnd={0.1} />
    </Plot>
  );
}

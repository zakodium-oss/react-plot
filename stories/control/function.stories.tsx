import { Meta } from '@storybook/react';

import {
  Annotations,
  Axis,
  Legend,
  Plot,
  FunctionSeries,
  FunctionSeriesProps,
  useRectangularZoom,
} from '../../src';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'API/FunctionSeries',
  component: FunctionSeries,
  args: {
    xAxis: 'x',
    max: 50,
    min: 0,
  },
} as Meta<FunctionSeriesProps & { min?: number; max?: number }>;

function getY(x: number) {
  return 4 * Math.sin(2 * x);
}
export function Control(
  props: FunctionSeriesProps & { min?: number; max?: number },
) {
  const { max, min, ...otherProps } = props;
  const zoom = useRectangularZoom();
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <Legend position="embedded" />
      <FunctionSeries
        getY={getY}
        {...otherProps}
        xAxis="x"
        yAxis="y"
        label="y=4*sin(2*x)"
      />
      <Annotations>{zoom.annotations}</Annotations>
      <Axis paddingStart={0.1} paddingEnd={0.1} id="x" position="bottom" />
      <Axis id="y" position="left" paddingStart={0.1} paddingEnd={0.1} />
    </Plot>
  );
}

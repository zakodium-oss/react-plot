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
import { DEFAULT_PLOT_CONFIG, PlotControllerDecorator } from '../utils';

export default {
  title: 'API/FunctionSeries',
  component: FunctionSeries,
  decorators: [PlotControllerDecorator],
} as Meta<Omit<FunctionSeriesProps, 'getY'>>;

function getY(x: number) {
  return 4 * Math.sin(2 * x);
}
export function Control(props: FunctionSeriesProps) {
  const zoom = useRectangularZoom();
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <Legend position="embedded" />
      <FunctionSeries
        {...props}
        getY={getY}
        xAxis="x"
        yAxis="y"
        label="y=4*sin(2*x)"
      />
      <Annotations>{zoom.annotations}</Annotations>
      <Axis paddingStart="10%" paddingEnd="10%" id="x" position="bottom" />
      <Axis id="y" position="left" paddingStart="10%" paddingEnd="10%" />
    </Plot>
  );
}

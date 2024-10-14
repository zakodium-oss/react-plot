import type { Meta } from '@storybook/react';

import {
  Annotations,
  Axis,
  FunctionSeries,
  type FunctionSeriesProps,
  Legend,
  LineSeries,
  Plot,
  useRectangularZoom,
} from '../../src/index.js';
import { DEFAULT_PLOT_CONFIG, PlotControllerDecorator } from '../utils.js';

export default {
  title: 'API/FunctionSeries',
  component: FunctionSeries,
  decorators: [PlotControllerDecorator],
} satisfies Meta<FunctionSeriesProps>;

function getY(x: number) {
  return 4 * Math.sin(2 * x) + 20;
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
      <Axis
        min={0}
        max={20}
        paddingStart="10%"
        paddingEnd="10%"
        id="x"
        position="bottom"
      />
      <Axis id="y" position="left" paddingStart="10%" paddingEnd="10%" />
    </Plot>
  );
}
export function WithAnotherSeries(props: FunctionSeriesProps) {
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
      <LineSeries
        label="line"
        data={[
          { x: -2, y: 20 },
          { x: -5, y: 10 },
        ]}
      />
      <Axis id="x" position="bottom" />
      <Axis id="y" position="left" paddingStart="10%" paddingEnd="10%" />
    </Plot>
  );
}

import { Meta } from '@storybook/react';

import {
  Annotations,
  Axis,
  LineSeries,
  Plot,
  useDrawPath,
  UseDrawPathOptions,
  useDrawRectangle,
  UseDrawRectangleOptions,
} from '../../src';
import { DEFAULT_PLOT_CONFIG, PlotControllerDecorator } from '../utils';

export default {
  title: 'Examples/Draw',
  decorators: [PlotControllerDecorator],
  args: { disabled: false },
} satisfies Meta;

const data = [
  { x: 1, y: 10 },
  { x: 2, y: 5 },
  { x: 3, y: 3 },
  { x: 4, y: 5 },
  { x: 5, y: 10 },
  { x: 8, y: 5 },
  { x: 9, y: 1 },
];
export function DrawPath({ disabled }: UseDrawPathOptions) {
  const path = useDrawPath({ disabled });
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <LineSeries data={data} displayMarkers />
      <Annotations>{path.annotations}</Annotations>
      <Axis position="bottom" label="time [s]" />
      <Axis position="left" />
    </Plot>
  );
}

export function DrawRectangle({ disabled }: UseDrawRectangleOptions) {
  const rectangle = useDrawRectangle({ disabled });
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <LineSeries data={data} displayMarkers />
      <Annotations>{rectangle.annotations}</Annotations>
      <Axis position="bottom" label="time [s]" />
      <Axis position="left" />
    </Plot>
  );
}

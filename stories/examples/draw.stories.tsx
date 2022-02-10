import { Meta } from '@storybook/react';

import {
  Axis,
  LineSeries,
  Plot,
  Annotations,
  useDrawPath,
  useDrawRectangle,
} from '../../src';
import { DEFAULT_PLOT_CONFIG, PlotControllerDecorator } from '../utils';

export default {
  title: 'Examples/Draw',
  decorators: [PlotControllerDecorator],
} as Meta;

const data = [
  { x: 1, y: 10 },
  { x: 2, y: 5 },
  { x: 3, y: 3 },
  { x: 4, y: 5 },
  { x: 5, y: 10 },
  { x: 8, y: 5 },
  { x: 9, y: 1 },
];
export function DrawPath() {
  const path = useDrawPath();
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <LineSeries data={data} displayMarker />
      <Annotations>{path.annotations}</Annotations>
      <Axis position="bottom" label="time [s]" />
      <Axis position="left" />
    </Plot>
  );
}

export function DrawRectangle() {
  const rectangle = useDrawRectangle();
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <LineSeries data={data} displayMarker />
      <Annotations>{rectangle.annotations}</Annotations>
      <Axis position="bottom" label="time [s]" />
      <Axis position="left" />
    </Plot>
  );
}

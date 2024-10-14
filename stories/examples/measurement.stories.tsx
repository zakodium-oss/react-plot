import type { Meta } from '@storybook/react';
import { xyToXYObject } from 'ml-spectra-processing';

import {
  Annotations,
  Axis,
  LineSeries,
  Plot,
  useAxisZoom,
  useCrossHair,
  useRectangularZoom,
} from '../../src/index.js';
import measurement from '../data/measurement.json';
import { DEFAULT_PLOT_CONFIG, PlotControllerDecorator } from '../utils.js';

interface MeasurementProps {
  xAxis: 'x' | 'y' | 't' | 'a';
  yAxis: 'x' | 'y' | 't' | 'a';
  hook: 'Cross Hair' | 'Rectangular Zoom' | 'Horizontal Zoom' | 'Vertical Zoom';
}
export default {
  title: 'Examples/Measurement',
  decorators: [PlotControllerDecorator],
  args: {
    xAxis: 'x',
    yAxis: 'y',
    hook: 'Cross Hair',
  },
  argTypes: {
    xAxis: {
      options: ['x', 'y', 't', 'a'],
      control: 'select',
    },
    yAxis: {
      options: ['x', 'y', 't', 'a'],
      control: 'select',
    },
    hook: {
      options: [
        'Cross Hair',
        'Rectangular Zoom',
        'Horizontal Zoom',
        'Vertical Zoom',
      ],
      control: 'select',
    },
  },
} satisfies Meta<MeasurementProps>;

export function Measurement(props: MeasurementProps) {
  const { xAxis = 'x', yAxis = 'y', hook } = props;
  const { data } = measurement;
  const {
    variables: { [xAxis]: x, [yAxis]: y },
  } = data[0];
  const crossHair = useCrossHair({
    horizontalAxisId: xAxis,
    verticalAxisId: yAxis,
    disabled: hook !== 'Cross Hair',
  });
  const rectZoom = useRectangularZoom({
    horizontalAxisId: xAxis,
    verticalAxisId: yAxis,
    disabled: hook !== 'Rectangular Zoom',
  });
  const horizontalZoom = useAxisZoom({
    direction: 'horizontal',
    horizontalAxisId: xAxis,
    verticalAxisId: yAxis,
    disabled: hook !== 'Horizontal Zoom',
  });
  const verticalZoom = useAxisZoom({
    direction: 'vertical',
    horizontalAxisId: xAxis,
    verticalAxisId: yAxis,
    disabled: hook !== 'Vertical Zoom',
  });
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <LineSeries
        data={xyToXYObject({
          x: x.data,
          y: y.data,
        })}
        xAxis={xAxis}
        yAxis={yAxis}
      />
      <Annotations>
        {crossHair.annotations}
        {rectZoom.annotations}
        {horizontalZoom.annotations}
        {verticalZoom.annotations}
      </Annotations>
      <Axis id={xAxis} position="bottom" />
      <Axis id={yAxis} position="left" />
    </Plot>
  );
}

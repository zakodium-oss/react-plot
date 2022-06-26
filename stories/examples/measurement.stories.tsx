import { Meta } from '@storybook/react';
import { xyToXYObject } from 'ml-spectra-processing';

import { Annotations, LineSeries, Plot, useCrossHair } from '../../src';
import measurement from '../data/measurement.json';
import { DEFAULT_PLOT_CONFIG, PlotControllerDecorator } from '../utils';

interface MeasurementProps {
  xAxis: 'x' | 'y' | 't' | 'a';
  yAxis: 'x' | 'y' | 't' | 'a';
}
export default {
  title: 'Examples/Measurement',
  decorators: [PlotControllerDecorator],
  argTypes: {
    xAxis: {
      defaultValue: 'x',
      options: ['x', 'y', 't', 'a'],
      control: 'select',
    },
    yAxis: {
      defaultValue: 'y',
      options: ['x', 'y', 't', 'a'],
      control: 'select',
    },
  },
} as Meta<MeasurementProps>;

export function Measurement(props: MeasurementProps) {
  const { xAxis = 'x', yAxis = 'y' } = props;
  const { data } = measurement;
  const {
    variables: { [xAxis]: x, [yAxis]: y },
  } = data[0];
  const crossHair = useCrossHair({
    horizontalAxisId: xAxis,
    verticalAxisId: yAxis,
  });
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <LineSeries
        data={xyToXYObject({
          x: x.data,
          y: y.data,
        })}
      />
      <Annotations>{crossHair.annotations}</Annotations>
    </Plot>
  );
}

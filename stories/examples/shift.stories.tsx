import { Meta } from '@storybook/react';

import { Axis, Plot, LineSeries, Annotations, Annotation } from '../../src';
import { DEFAULT_PLOT_CONFIG } from '../utils';

export default {
  title: 'Examples/Shift',
} as Meta;

const exampleData = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 2, y: 0 },
  { x: 3, y: 0 },
];

export function SingleSeriesExample(args: { xShift: number; yShift: number }) {
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      <LineSeries data={exampleData} {...args} />
      <Axis id="x" position="bottom" paddingStart={1} paddingEnd={1} />
      <Axis id="y" position="left" paddingStart={1} paddingEnd={1} />
      <Annotations>
        <Annotation.Line color="lightskyblue" y1={0} y2={0} x1="0" x2="100%" />
        <Annotation.Line color="lightskyblue" y1={1} y2={1} x1="0" x2="100%" />
        <Annotation.Line color="lightcoral" y1="0" y2="100%" x1={0} x2={0} />
        <Annotation.Line color="lightcoral" y1="0" y2="100%" x1={3} x2={3} />
      </Annotations>
    </Plot>
  );
}

SingleSeriesExample.args = { xShift: 0, yShift: 0 };

import { Meta } from '@storybook/react';
import React from 'react';

import { Axis, LineSeries, PlotZoom } from '../src/index';

export default {
  title: 'Plot/Plot zoom',
  component: PlotZoom,
  argTypes: {
    zoomHorizontal: {
      defaultValue: 'bottom',
      control: { type: 'select', options: ['bottom', 'none'] },
    },
    zoomVertical: {
      defaultValue: 'left',
      control: { type: 'select', options: ['left', 'none'] },
    },
  },
} as Meta;

export function Control({ zoomHorizontal, zoomVertical }) {
  return (
    <PlotZoom
      width={550}
      height={500}
      margin={{ bottom: 50, left: 70, top: 10, right: 10 }}
      zoomHorizontal={zoomHorizontal}
      zoomVertical={zoomVertical}
    >
      <LineSeries
        data={[
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 3 },
          { x: 4, y: 3 },
          { x: 5, y: 3 },
        ]}
        xAxis="x"
        yAxis="y"
        lineStyle={{ strokeWidth: 3 }}
        label="Vg = 7V"
        displayMarker={false}
      />
      <LineSeries
        data={[
          { x: 1, y: 2 },
          { x: 2, y: 4 },
          { x: 3, y: 6 },
          { x: 4, y: 6 },
          { x: 5, y: 6 },
          { x: 6, y: 6 },
        ]}
        xAxis="x"
        yAxis="y"
        displayMarker={true}
        markerShape="circle"
        label="Vg = 3V"
      />
      <Axis id="x" position="bottom" label="Drain voltage [V]" />
      <Axis id="y" position="left" label="Drain current [mA]" labelSpace={40} />
    </PlotZoom>
  );
}

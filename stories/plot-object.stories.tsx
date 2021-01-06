import { Meta } from '@storybook/react';
import React from 'react';

import { PlotObject } from '../src/index';

export default {
  title: 'Plot/Plot object',
  component: PlotObject,
} as Meta;

export function Control() {
  const plot = {
    dimentions: {
      width: 550,
      height: 500,
      margin: { bottom: 50, left: 50, top: 5, right: 10 },
    },
    axes: {
      x: { label: 'My X axis', position: 'bottom', min: 0, max: 10 },
      y: { label: 'My Y axis', position: 'left', min: 0, max: 10 },
    },
    series: [
      {
        type: 'line', // scatter
        xAxis: 'x',
        yAxis: 'y',
        label: 'My first serie',
        data: [
          { x: 1, y: 2 },
          { x: 2, y: 3 },
          { x: 3, y: 4 },
          { x: 4, y: 6 },
          { x: 7, y: 8 },
        ],
        lineStyle: { strokeWidth: '2px' },
      },
    ],
  };
  return <PlotObject plot={plot} />;
}

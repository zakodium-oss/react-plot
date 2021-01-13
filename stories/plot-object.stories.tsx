import { Meta } from '@storybook/react';
import React from 'react';

import { PlotObject } from '../src/index';
import type { PlotObjectType } from '../src/types';

export default {
  title: 'Plot/Plot object',
  component: PlotObject,
} as Meta;

export function Control() {
  const plot: PlotObjectType = {
    viewportStyle: {
      stroke: 'black',
      strokeWidth: '2px',
      fill: '#111',
    },
    dimentions: {
      width: 550,
      height: 500,
      margin: { bottom: 50, left: 50, top: 60, right: 50 },
    },
    axes: [
      { id: 'x', label: 'My X axis', position: 'bottom', min: 0, max: 10 },
      { id: 'y', label: 'My Y axis', position: 'left', min: 0, max: 10 },
      { id: 'right', position: 'right', min: 1.5, max: 8.5 },
    ],
    series: [
      {
        type: 'line',
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
      {
        type: 'scatter',
        xAxis: 'x',
        yAxis: 'right',
        label: 'Scatter serie',
        data: [
          { x: 2, y: 8 },
          { x: 3, y: 7 },
          { x: 5, y: 4 },
          { x: 6, y: 4 },
          { x: 7, y: 2 },
        ],
        markerStyle: {
          fill: ({ x }) => (x > 4 ? 'blue' : 'green'),
        },
      },
    ],
  };
  return <PlotObject plot={plot} />;
}

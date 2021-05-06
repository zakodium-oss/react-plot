import { Meta } from '@storybook/react';

import { Annotation, PlotObject, PlotObjectType } from '../src';

export default {
  title: 'Plot/Plot object',
  component: PlotObject,
} as Meta;

export function Control() {
  const plot: PlotObjectType = {
    seriesViewportStyle: {
      stroke: 'black',
      strokeWidth: '2px',
      fill: '#ddd',
    },
    dimensions: {
      width: 650,
      height: 500,
    },
    axes: [
      {
        id: 'x',
        type: 'main',
        label: 'My X axis',
        position: 'bottom',
        min: 0,
        max: 10,
      },
      {
        id: 'y',
        type: 'main',
        label: 'My Y axis',
        position: 'left',
        min: 0,
        max: 10,
      },
      {
        id: 'right',
        type: 'main',
        label: 'Logscale is cool',
        position: 'right',
        labelSpace: 40,
        min: 0.5,
        max: 180.5,
        scale: 'log',
      },
      { id: 'x', type: 'secondary', hiddenSecondaryTicks: true },
    ],
    content: [
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
        type: 'annotation',
        children: [
          {
            type: 'group',
            x: '50',
            y: '150',
            children: [
              {
                type: 'arrow',
                x1: '0',
                x2: '100',
                y1: '10',
                y2: '10',
                endPoint: 'triangle',
              },
              { type: 'text', children: 'Test' },
            ],
          },
        ],
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
  return (
    <PlotObject plot={plot}>
      <Annotation.Circle
        cx={4}
        cy={5}
        r={0.2}
        style={{ stroke: 'purple', fill: 'purple' }}
      />
      <Annotation.Line
        x1={2}
        x2={3}
        y1={2}
        y2={3}
        style={{ stroke: 'purple', strokeWidth: '2px' }}
      />
    </PlotObject>
  );
}

import type { Meta } from '@storybook/react';
import { useState } from 'react';

import { Annotation, Annotations, Plot } from '../../src/index.js';
import { DEFAULT_PLOT_CONFIG, getInfraredSeries } from '../utils.js';

export default {
  title: 'Examples/Annotations Callback',
} satisfies Meta;

export function AnnotationCallback() {
  const [overElement, setOverElement] = useState('');
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {getInfraredSeries()}
      <Annotations>
        <Annotation.Line
          x1="400"
          x2={2500}
          y1="350"
          y2={33}
          color={overElement === 'Line' ? 'red' : 'black'}
          strokeWidth={5}
          onMouseEnter={() => {
            setOverElement('Line');
          }}
          onMouseLeave={() => {
            setOverElement('');
          }}
        />
        <Annotation.Rectangle
          x1="40"
          x2={1500}
          y1="150"
          y2={100}
          color={overElement === 'Rectangle' ? 'red' : 'black'}
          strokeWidth={5}
          onMouseEnter={() => {
            setOverElement('Rectangle');
          }}
          onMouseLeave={() => {
            setOverElement('');
          }}
        />
        <Annotation.Arrow
          x1="100"
          y1={50}
          x2="50"
          y2={22}
          endPoint="none"
          startPoint="triangle"
          color={overElement === 'Arrow' ? 'red' : 'black'}
          strokeWidth={5}
          onMouseEnter={() => {
            setOverElement('Arrow');
          }}
          onMouseLeave={() => {
            setOverElement('');
          }}
        />
        <Annotation.Circle
          x={2000}
          y="200"
          r={100}
          color={overElement === 'Circle' ? 'red' : 'black'}
          onMouseEnter={() => {
            setOverElement('Circle');
          }}
          onMouseLeave={() => {
            setOverElement('');
          }}
        />
        <Annotation.Ellipse
          x={2250}
          y="270"
          rx="30"
          ry={10}
          color={overElement === 'Ellipse' ? 'red' : 'black'}
          onMouseEnter={() => {
            setOverElement('Ellipse');
          }}
          onMouseLeave={() => {
            setOverElement('');
          }}
        />
        <Annotation.Polygon
          points={[
            { x: '800', y: '70' },
            { x: 2500, y: 50 },
            { x: 3000, y: 80 },

            { x: 3500, y: 60 },

            { x: 3900, y: 40 },
          ]}
          color={overElement === 'Polygon' ? 'red' : 'black'}
          onMouseEnter={() => {
            setOverElement('Polygon');
          }}
          onMouseLeave={() => {
            setOverElement('');
          }}
        />
        <Annotation.Polyline
          points={[
            { x: 1000, y: '450' },
            { x: 1500, y: 45 },
            { x: '200', y: '300' },
            { x: 2000, y: 8 },
          ]}
          strokeWidth={4}
          color={overElement === 'Polyline' ? 'red' : 'black'}
          onMouseEnter={() => {
            setOverElement('Polyline');
          }}
          onMouseLeave={() => {
            setOverElement('');
          }}
        />
        <Annotation.Shape
          x={3500}
          y="400"
          shape="diamond"
          size={35}
          color={overElement === 'Shape' ? 'red' : 'black'}
          onMouseEnter={() => {
            setOverElement('Shape');
          }}
          onMouseLeave={() => {
            setOverElement('');
          }}
        />
        <Annotation.BoxPlot
          y={15}
          q1={2200}
          q3={2800}
          width="50"
          min={2150}
          max={2900}
          median={2500}
          medianColor={overElement === 'BoxPlot' ? 'red' : 'black'}
          boxColor={overElement === 'BoxPlot' ? 'red' : 'black'}
          boxStyle={{ fill: overElement === 'BoxPlot' ? 'red' : 'black' }}
          whiskerColor={overElement === 'BoxPlot' ? 'red' : 'black'}
          minMaxColor={overElement === 'BoxPlot' ? 'red' : 'black'}
          onMouseEnter={() => {
            setOverElement('BoxPlot');
          }}
          onMouseLeave={() => {
            setOverElement('');
          }}
        />
      </Annotations>
    </Plot>
  );
}

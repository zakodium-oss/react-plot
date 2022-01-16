import { Meta } from '@storybook/react';
import { useState } from 'react';

import { Annotations, Plot } from '../../src';
import { Arrow } from '../../src/components/Annotations/Arrow';
import { Circle } from '../../src/components/Annotations/Circle';
import { Ellipse } from '../../src/components/Annotations/Ellipse';
import { Line } from '../../src/components/Annotations/Line';
import { Polygon } from '../../src/components/Annotations/Polygon';
import { Polyline } from '../../src/components/Annotations/Polyline';
import { Rectangle } from '../../src/components/Annotations/Rectangle';
import { Shape } from '../../src/components/Annotations/Shape';
import { DEFAULT_PLOT_CONFIG, getInfraredSeries } from '../utils';

export default {
  title: 'API/Annotations',
} as Meta;

export function AnnotationCallback() {
  const [overElement, setOverElement] = useState('');
  return (
    <Plot {...DEFAULT_PLOT_CONFIG}>
      {getInfraredSeries()}
      <Annotations>
        <Line
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
        <Rectangle
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
        <Arrow
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
        <Circle
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
        <Ellipse
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
        <Polygon
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
        <Polyline
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
        <Shape
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
      </Annotations>
    </Plot>
  );
}

AnnotationCallback.storyName = 'Callback';

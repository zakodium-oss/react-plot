import { Meta } from '@storybook/react';
import React from 'react';

import {
  Circle,
  Diamond,
  Square,
  Star,
  Triangle,
  XMark,
} from '../../src/components/Markers';

export default {
  title: 'Docs/Shapes',
  decorators: [
    (Story) => (
      <div>
        <svg width={100} height={100}>
          <Story />
        </svg>
      </div>
    ),
  ],
} as Meta;

export function SquareShape() {
  return <Square size={5} x={50} y={50} style={{ fill: 'blue' }} />;
}

export function CircleShape() {
  return <Circle size={5} x={50} y={50} style={{ fill: 'blue' }} />;
}

export function DiamondShape() {
  return <Diamond size={5} x={50} y={10} style={{ fill: 'blue' }} />;
}

export function TriangleShape() {
  return <Triangle size={5} x={50} y={50} style={{ fill: 'blue' }} />;
}

export function XMarkShape() {
  return <XMark style={{ stroke: 'blue', strokeWidth: 3 }} />;
}

export function StarShape() {
  return <Star style={{ fill: 'blue' }} />;
}

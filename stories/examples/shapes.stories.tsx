import type { Meta } from '@storybook/react-vite';

import {
  Circle,
  Cross,
  Diamond,
  Hexagon,
  Pentagon,
  Square,
  Star,
  Triangle,
  XMark,
} from '../../src/components/Markers.js';

const SIZE = 20;
const DEBUG_COLOR = 'yellow';

export default {
  title: 'Docs/Shapes',
  decorators: [
    (Story) => (
      <div>
        <svg style={{ overflow: 'visible' }} width={100} height={100}>
          <line x1={50} x2={50} y1={0} y2={100} stroke={DEBUG_COLOR} />
          <line x1={0} x2={100} y1={50} y2={50} stroke={DEBUG_COLOR} />

          <g transform="translate(50, 50)">
            <circle r={SIZE / 2} stroke={DEBUG_COLOR} fillOpacity={0} />

            <rect
              x={-SIZE / 2}
              y={-SIZE / 2}
              width={SIZE}
              height={SIZE}
              fillOpacity={0}
              stroke={DEBUG_COLOR}
            />
            <Story />
          </g>
        </svg>
      </div>
    ),
  ],
} satisfies Meta;

export function SquareShape() {
  return <Square size={SIZE} style={{ fill: 'blue' }} />;
}

export function CircleShape() {
  return <Circle size={SIZE} style={{ fill: 'blue' }} />;
}

export function DiamondShape() {
  return <Diamond size={SIZE} style={{ fill: 'blue' }} />;
}

export function TriangleShape() {
  return <Triangle size={SIZE} style={{ fill: 'blue' }} />;
}

export function CrossShape() {
  return <Cross size={SIZE} style={{ stroke: 'blue' }} />;
}

export function XCrossShape() {
  return <XMark size={SIZE} style={{ stroke: 'blue' }} />;
}

export function PentagonShape() {
  return <Pentagon size={SIZE} style={{ fill: 'blue' }} />;
}

export function StarShape() {
  return <Star size={SIZE} style={{ fill: 'blue' }} />;
}

export function HexagonShape() {
  return <Hexagon size={SIZE} style={{ fill: 'blue' }} />;
}

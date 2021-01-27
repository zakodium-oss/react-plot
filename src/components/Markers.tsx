import React from 'react';

import type { MarkersProps } from '../types';

export type Shapes =
  | 'circle'
  | 'square'
  | 'diamond'
  | 'triangle'
  | 'cross'
  | 'xmark'
  | 'pentagon'
  | 'star'
  | 'hexagon';

export const markersComps = {
  circle: Circle,
  square: Square,
  diamond: Diamond,
  triangle: Triangle,
  cross: Cross,
  xmark: XMark,
  pentagon: Pentagon,
  star: Star,
  hexagon: Hexagon,
};

export function Circle({ style, size }: MarkersProps) {
  return <circle r={size / 2} style={style} />;
}

export function Square({ style, size }: MarkersProps) {
  return (
    <rect
      x={-size / 2}
      y={-size / 2}
      width={size}
      height={size}
      style={style}
    />
  );
}

export function Diamond({ size, style }: MarkersProps) {
  return (
    <polygon
      points={`0,${-size / 2} ${size / 2},0 0,${size / 2} ${-size / 2},0`}
      style={style}
    />
  );
}

export function Triangle({ style, size }: MarkersProps) {
  const height = (Math.sqrt(3) * size) / 2;
  return (
    <polygon
      transform={`translate(0, -${(size - height) / 2})`}
      points={`${-size / 2},${size / 2} ${size / 2},${size / 2} 0,${
        size / 2 - height
      }`}
      style={style}
    />
  );
}

export function Cross({ size, style }: MarkersProps) {
  return (
    <g strokeWidth={3} style={style}>
      <line x1={0} x2={0} y1={size / 2} y2={-size / 2} />
      <line x1={-size / 2} x2={size / 2} y1={0} y2={0} />
    </g>
  );
}

export function XMark(props: MarkersProps) {
  return (
    <g transform="rotate(45)">
      <Cross {...props} />
    </g>
  );
}

export function Pentagon({ style, size }: MarkersProps) {
  return (
    <polygon
      points={Array.from(getPolyPoints(size, 5)).join(' ')}
      style={style}
    />
  );
}

export function Star({ style, size }: MarkersProps) {
  const ext = Array.from(getPolyPoints(size, 5, 0));
  const int = Array.from(getPolyPoints(size / 2.5, 5, (2 * Math.PI) / 10));

  const points = [];
  for (let i = 0; i < ext.length; i++) {
    points.push(ext[i], int[i]);
  }

  return <polygon points={points.join(' ')} style={style} />;
}

export function Hexagon({ style, size }: MarkersProps) {
  return (
    <polygon
      points={Array.from(getPolyPoints(size, 6)).join(' ')}
      style={style}
    />
  );
}

/**
 * https://math.stackexchange.com/a/3582355
 */
function* getPolyPoints(diameter: number, k: number, angle = 0) {
  const r = diameter / 2;

  for (let i = 0; i < k; i++) {
    const x = r * Math.cos((2 * Math.PI * i) / k - Math.PI / 2 + angle);
    const y = r * Math.sin((2 * Math.PI * i) / k - Math.PI / 2 + angle);

    yield `${x},${y}`;
  }
}

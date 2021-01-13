import React from 'react';

import type { MarkersProps } from '../types';

export function Circle({ x, y, style, size }: MarkersProps) {
  return <circle cx={x} cy={y} r={size} style={style} />;
}

export function Square({ x, y, style, size }: MarkersProps) {
  return (
    <rect
      x={x - size}
      y={y - size}
      width={2 * size}
      height={2 * size}
      style={style}
    />
  );
}

export function Triangle({ x, y, style, size }: MarkersProps) {
  const height = y + size;
  return (
    <polygon
      points={`${x - size},${height} ${x + size},${height} ${x},${y - size}`}
      style={style}
    />
  );
}

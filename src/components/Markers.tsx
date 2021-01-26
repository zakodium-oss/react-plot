import React from 'react';

import type { MarkersProps } from '../types';

type OnlyStyle = Omit<MarkersProps, 'x' | 'y' | 'size'>;

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

export function Diamond(props: MarkersProps) {
  return (
    <g transform="rotate(45)">
      <Square {...props} />
    </g>
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

export function XMark({ style }: OnlyStyle) {
  return <path d="M6 18 L18 6 M6 6 L18 18" style={style} />;
}

export function Star({ style }: OnlyStyle) {
  return <polygon points="100,10 40,198 190,78 10,78 160,198" style={style} />;
}

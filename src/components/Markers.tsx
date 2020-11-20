import React from 'react';

interface MarkersProps {
  x: number;
  y: number;
  fill: string;
  size: number;
}

export function Circle({ x, y, fill, size }: MarkersProps) {
  return <circle cx={x} cy={y} r={size} fill={fill} />;
}

export function Square({ x, y, fill, size }: MarkersProps) {
  return (
    <rect
      x={x - size}
      y={y - size}
      width={2 * size}
      height={2 * size}
      fill={fill}
    />
  );
}

export function Triangle({ x, y, fill, size }: MarkersProps) {
  const height = y + size;
  return (
    <polygon
      points={`${x - size},${height} ${x + size},${height} ${x},${y - size}`}
      fill={fill}
    />
  );
}

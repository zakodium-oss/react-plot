import React from 'react';

interface ArrowProps {
  x1: number;
  y1: number;

  x2: number;
  y2: number;
}

export default function Arrow(props: ArrowProps) {
  const { x1, y1, x2, y2 } = props;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
    </g>
  );
}

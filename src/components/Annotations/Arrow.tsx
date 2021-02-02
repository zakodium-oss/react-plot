import React from 'react';

import Shape, { AnnotationShapeList } from './Shape';

interface ArrowProps {
  x1: number;
  y1: number;

  x2: number;
  y2: number;

  startPoint: AnnotationShapeList | 'none';
  endPoint: AnnotationShapeList | 'none';
}

export default function Arrow(props: ArrowProps) {
  const { x1, y1, x2, y2, startPoint, endPoint } = props;
  return (
    <g>
      {startPoint !== 'none' && (
        <Shape
          x={x1}
          y={y1}
          shape={startPoint}
          size={10}
          style={{ fill: 'black' }}
        />
      )}

      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" />

      {endPoint !== 'none' && (
        <Shape
          x={x2}
          y={y2}
          shape={endPoint}
          size={10}
          style={{ fill: 'black' }}
        />
      )}
    </g>
  );
}

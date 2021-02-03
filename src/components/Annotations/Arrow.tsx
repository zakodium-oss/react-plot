import React from 'react';

type AnnotationShapeList = 'circle' | 'triangle' | 'line' | 'none';

interface ArrowProps {
  x1: number;
  y1: number;

  x2: number;
  y2: number;

  startPoint?: AnnotationShapeList;
  endPoint?: AnnotationShapeList;
}

export default function Arrow(props: ArrowProps) {
  const { x1, y1, x2, y2, startPoint = 'none', endPoint = 'none' } = props;

  const startMarker =
    startPoint !== 'none' ? `url(#marker-${startPoint})` : undefined;
  const endMarker =
    endPoint !== 'none' ? `url(#marker-${endPoint})` : undefined;

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="black"
        markerStart={startMarker}
        markerEnd={endMarker}
      />
    </g>
  );
}

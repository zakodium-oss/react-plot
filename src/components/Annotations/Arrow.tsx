import { usePosition } from '../../hooks';

import MarkerDefs from './MarkerDefs';

type AnnotationShapeList = 'circle' | 'triangle' | 'line' | 'none';

export interface AnnotationArrowProps {
  x1: number | string;
  y1: number | string;
  x2: number | string;
  y2: number | string;
  startPoint?: AnnotationShapeList;
  endPoint?: AnnotationShapeList;
  color?: string;
  strokeWidth?: number | string;
  markerWidth?: number | string;
}

export function Arrow(props: AnnotationArrowProps) {
  const {
    x1: x1Old,
    y1: y1Old,
    x2: x2Old,
    y2: y2Old,
    startPoint = 'none',
    endPoint = 'triangle',
    color = 'black',
    strokeWidth,
    markerWidth,
  } = props;

  const { x: x1, y: y1 } = usePosition({
    x: x1Old,
    y: y1Old,
  });

  const { x: x2, y: y2 } = usePosition({
    x: x2Old,
    y: y2Old,
  });

  const startMarker =
    startPoint !== 'none'
      ? `url(#marker-${startPoint}-${x1}-${y1}-${x2}-${y2})`
      : undefined;
  const endMarker =
    endPoint !== 'none'
      ? `url(#marker-${endPoint}-${x1}-${y1}-${x2}-${y2})`
      : undefined;

  return (
    <g>
      <MarkerDefs
        color={color}
        id={`${x1}-${y1}-${x2}-${y2}`}
        width={markerWidth}
      />
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={strokeWidth}
        markerStart={startMarker}
        markerEnd={endMarker}
      />
    </g>
  );
}

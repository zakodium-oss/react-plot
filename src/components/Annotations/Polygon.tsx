import { SVGProps } from 'react';

import { usePointPosition } from '../../hooks';

export interface AnnotationPolygonProps
  extends Omit<
    SVGProps<SVGPolygonElement>,
    'x1' | 'x2' | 'y1' | 'y2' | 'points'
  > {
  points: { x: number | string; y: number | string }[];
}

export function Polygon(props: AnnotationPolygonProps) {
  const { points: oldPoints, color, ...polylineProps } = props;
  const points = usePointPosition(oldPoints);
  return <polygon fill={color} points={points} {...polylineProps} />;
}

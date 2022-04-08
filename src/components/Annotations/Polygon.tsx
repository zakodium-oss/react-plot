import { SVGProps } from 'react';

import { usePointPosition } from '../../hooks';
import { ScalarValue } from '../../types';

export interface AnnotationPolygonProps
  extends Omit<
    SVGProps<SVGPolygonElement>,
    'x1' | 'x2' | 'y1' | 'y2' | 'points'
  > {
  points: { x: ScalarValue; y: ScalarValue }[];
}

export function Polygon(props: AnnotationPolygonProps) {
  const { points: oldPoints, color, ...polylineProps } = props;
  const points = usePointPosition(oldPoints);
  return <polygon fill={color} points={points} {...polylineProps} />;
}

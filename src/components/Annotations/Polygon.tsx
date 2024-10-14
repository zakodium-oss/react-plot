import type { SVGProps } from 'react';

import { usePointsPosition } from '../../hooks.js';
import type { ScalarValue } from '../../types.js';

export interface AnnotationPolygonProps
  extends Omit<
    SVGProps<SVGPolygonElement>,
    'x1' | 'x2' | 'y1' | 'y2' | 'points'
  > {
  points: Array<{ x: ScalarValue; y: ScalarValue }>;
  xAxis?: string;
  yAxis?: string;
}

export function Polygon(props: AnnotationPolygonProps) {
  const {
    points: oldPoints,
    color,
    xAxis = 'x',
    yAxis = 'y',
    ...polylineProps
  } = props;
  const points = usePointsPosition({ points: oldPoints, xAxis, yAxis });
  return <polygon fill={color} points={points} {...polylineProps} />;
}

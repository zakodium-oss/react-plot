import type { SVGProps } from 'react';

import { usePointsPosition } from '../../hooks.js';
import type { ScalarValue } from '../../types.js';

export interface AnnotationPolylineProps
  extends Omit<
    SVGProps<SVGPolylineElement>,
    'x1' | 'x2' | 'y1' | 'y2' | 'points'
  > {
  points: Array<{ x: ScalarValue; y: ScalarValue }>;
  xAxis?: string;
  yAxis?: string;
  color?: string;
}

export function Polyline(props: AnnotationPolylineProps) {
  const {
    points: oldPoints,
    color,
    xAxis = 'x',
    yAxis = 'y',
    ...polylineProps
  } = props;
  const points = usePointsPosition({ points: oldPoints, xAxis, yAxis });

  return (
    <polyline stroke={color} fill="none" points={points} {...polylineProps} />
  );
}

import { SVGProps } from 'react';

import { usePointsPosition } from '../../hooks';
import { ScalarValue } from '../../types';

export interface AnnotationPolylineProps
  extends Omit<
    SVGProps<SVGPolylineElement>,
    'x1' | 'x2' | 'y1' | 'y2' | 'points'
  > {
  points: { x: ScalarValue; y: ScalarValue }[];
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

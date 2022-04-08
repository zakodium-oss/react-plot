import { SVGProps } from 'react';

import { usePointPosition } from '../../hooks';
import { ScalarValue } from '../../types';

export interface AnnotationPolylineProps
  extends Omit<
    SVGProps<SVGPolylineElement>,
    'x1' | 'x2' | 'y1' | 'y2' | 'points'
  > {
  points: { x: ScalarValue; y: ScalarValue }[];
  color?: string;
}

export function Polyline(props: AnnotationPolylineProps) {
  const { points: oldPoints, color, ...polylineProps } = props;
  const points = usePointPosition(oldPoints);

  return (
    <polyline stroke={color} fill="none" points={points} {...polylineProps} />
  );
}

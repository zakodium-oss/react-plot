import { SVGProps } from 'react';

import { usePointPosition } from '../../hooks';

export interface AnnotationPolylineProps
  extends Omit<SVGProps<SVGPolylineElement>, 'points'> {
  points: { x: number | string; y: number | string }[];
  color: string;
}

export function Polyline(props: AnnotationPolylineProps) {
  const { points: oldPoints, color, ...polylineProps } = props;
  const points = usePointPosition(oldPoints);

  return (
    <polyline stroke={color} fill="none" points={points} {...polylineProps} />
  );
}

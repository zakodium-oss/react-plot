import { SVGProps } from 'react';

import { useEllipsePosition } from '../../hooks';

export interface AnnotationCircleProps
  extends Omit<SVGProps<SVGCircleElement>, 'cx' | 'cy' | 'r'> {
  x: number | string;
  y: number | string;
  r: number | string;
  color?: string;
}

export function Circle(props: AnnotationCircleProps) {
  const { x: oldX, y: oldY, r: oldR, color, ...otherProps } = props;

  const {
    x,
    y,
    rx: r,
  } = useEllipsePosition({
    x: oldX,
    y: oldY,
    rx: oldR,
    ry: oldR,
  });

  return <circle cx={x} cy={y} r={r} fill={color} {...otherProps} />;
}

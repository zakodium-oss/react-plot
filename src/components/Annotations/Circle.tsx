import { SVGProps } from 'react';

import { useEllipsePosition } from '../../hooks';
import { ScalarValue } from '../../types';

export interface AnnotationCircleProps
  extends Omit<
    SVGProps<SVGCircleElement>,
    'x1' | 'x2' | 'y1' | 'y2' | 'cx' | 'cy' | 'r' | 'fill'
  > {
  x: ScalarValue;
  y: ScalarValue;
  r: ScalarValue;
  color?: string;
}

export function Circle(props: AnnotationCircleProps) {
  const { x, y, r: oldR, color, ...otherProps } = props;

  const {
    cx,
    cy,
    rx: r,
  } = useEllipsePosition({
    cx: x,
    cy: y,
    rx: oldR,
    ry: oldR,
  });

  return <circle cx={cx} cy={cy} r={r} fill={color} {...otherProps} />;
}

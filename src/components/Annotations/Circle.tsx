import { SVGProps } from 'react';

import { useEllipsePosition } from '../../hooks';

export interface AnnotationCircleProps
  extends Omit<
    SVGProps<SVGCircleElement>,
    'x1' | 'x2' | 'y1' | 'y2' | 'cx' | 'cy' | 'r'
  > {
  cx: number | string;
  cy: number | string;
  r: number | string;
}

export function Circle(props: AnnotationCircleProps) {
  const { cx: oldCx, cy: oldCy, r: oldR, ...otherProps } = props;

  const {
    cx,
    cy,
    rx: r,
  } = useEllipsePosition({
    cx: oldCx,
    cy: oldCy,
    rx: oldR,
    ry: oldR,
  });

  return <circle cx={cx} cy={cy} r={r} {...otherProps} />;
}

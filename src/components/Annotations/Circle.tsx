import React, { SVGProps } from 'react';

import { useEllipsePosition } from '../../hooks';

type SvgCircleProps = SVGProps<SVGCircleElement>;
export type CircleProps = Omit<SvgCircleProps, 'x1' | 'x2' | 'y1' | 'y2'>;

export default function Circle(props: CircleProps) {
  const { cx: oldCx, cy: oldCy, r: oldR, ...otherProps } = props;

  const { cx, cy, rx: r } = useEllipsePosition({
    cx: oldCx,
    cy: oldCy,
    rx: oldR,
    ry: oldR,
  });

  return <circle cx={cx} cy={cy} r={r} {...otherProps} />;
}

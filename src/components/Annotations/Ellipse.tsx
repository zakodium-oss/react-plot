import React, { SVGProps } from 'react';

import { useEllipsePosition } from '../../hooks';

type SvgEllipseProps = SVGProps<SVGEllipseElement>;
type EllipseProps = Omit<SvgEllipseProps, 'x1' | 'x2' | 'y1' | 'y2'>;

export default function Ellipse(props: EllipseProps) {
  const { cx: oldCx, cy: oldCy, rx: oldRx, ry: oldRy, ...otherProps } = props;

  const { cx, cy, rx, ry } = useEllipsePosition({
    cx: oldCx,
    cy: oldCy,
    rx: oldRx,
    ry: oldRy,
  });

  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} {...otherProps} />;
}

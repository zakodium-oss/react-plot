import { SVGProps } from 'react';

import { useEllipsePosition } from '../../hooks';

export interface AnnotationEllipseProps
  extends Omit<
    SVGProps<SVGEllipseElement>,
    'x1' | 'x2' | 'y1' | 'y2' | 'cx' | 'cy' | 'rx' | 'ry'
  > {
  cx: number | string;
  cy: number | string;
  rx: number | string;
  ry: number | string;
}

export function Ellipse(props: AnnotationEllipseProps) {
  const { cx: oldCx, cy: oldCy, rx: oldRx, ry: oldRy, ...otherProps } = props;

  const { cx, cy, rx, ry } = useEllipsePosition({
    cx: oldCx,
    cy: oldCy,
    rx: oldRx,
    ry: oldRy,
  });

  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} {...otherProps} />;
}

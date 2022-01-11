import { SVGProps } from 'react';

import { useEllipsePosition } from '../../hooks';

export interface AnnotationEllipseProps
  extends Omit<SVGProps<SVGEllipseElement>, 'cx' | 'cy' | 'rx' | 'ry'> {
  x: number | string;
  y: number | string;
  rx: number | string;
  ry: number | string;
}

export function Ellipse(props: AnnotationEllipseProps) {
  const { x: oldX, y: oldY, rx: oldRx, ry: oldRy, ...otherProps } = props;

  const { x, y, rx, ry } = useEllipsePosition({
    x: oldX,
    y: oldY,
    rx: oldRx,
    ry: oldRy,
  });

  return <ellipse cx={x} cy={y} rx={rx} ry={ry} {...otherProps} />;
}

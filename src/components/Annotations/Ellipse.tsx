import { SVGProps } from 'react';

import { useEllipsePosition } from '../../hooks';
import { ScalarValue } from '../../types';

export interface AnnotationEllipseProps
  extends Omit<
    SVGProps<SVGEllipseElement>,
    'x1' | 'x2' | 'y1' | 'y2' | 'cx' | 'cy' | 'rx' | 'ry'
  > {
  x: ScalarValue;
  y: ScalarValue;
  rx: ScalarValue;
  ry: ScalarValue;
  xAxis?: string;
  yAxis?: string;
}

export function Ellipse(props: AnnotationEllipseProps) {
  const {
    x,
    y,
    rx: oldRx,
    ry: oldRy,
    color,
    xAxis = 'x',
    yAxis = 'y',
    ...otherProps
  } = props;

  const { cx, cy, rx, ry } = useEllipsePosition({
    cx: x,
    cy: y,
    rx: oldRx,
    ry: oldRy,
    xAxis,
    yAxis,
  });

  return (
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={color} {...otherProps} />
  );
}

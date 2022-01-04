import { SVGProps } from 'react';

import { useEllipsePosition } from '../../hooks';

type SvgCircleProps = SVGProps<SVGCircleElement>;

export type AnnotationCircleProps = Omit<
  SvgCircleProps,
  'x1' | 'x2' | 'y1' | 'y2'
>;

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

import { SVGProps } from 'react';

import { usePosition } from '../../hooks';

export interface AnnotationLineProps
  extends Omit<SVGProps<SVGLineElement>, 'x1' | 'x2' | 'y2' | 'y2'> {
  x1: number | string;
  x2: number | string;
  y1: number | string;
  y2: number | string;
}

export function Line(props: AnnotationLineProps) {
  const {
    x1: oldX1,
    x2: oldX2,
    y1: oldY1,
    y2: oldY2,
    stroke = 'black',
    ...lineProps
  } = props;
  const { x: x1, y: y1 } = usePosition({ x: oldX1, y: oldY1 });
  const { x: x2, y: y2 } = usePosition({ x: oldX2, y: oldY2 });
  return (
    <line x1={x1} x2={x2} y1={y1} y2={y2} stroke={stroke} {...lineProps} />
  );
}

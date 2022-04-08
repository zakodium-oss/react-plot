import { SVGProps } from 'react';

import { usePosition } from '../../hooks';
import { ScalarValue } from '../../types';

export interface AnnotationLineProps
  extends Omit<
    SVGProps<SVGLineElement>,
    'x' | 'y' | 'x1' | 'x2' | 'y1' | 'y2' | 'stroke'
  > {
  x1: ScalarValue;
  x2: ScalarValue;
  y1: ScalarValue;
  y2: ScalarValue;
  color?: string;
}

export function Line(props: AnnotationLineProps) {
  const {
    x1: oldX1,
    x2: oldX2,
    y1: oldY1,
    y2: oldY2,
    color = 'black',
    ...lineProps
  } = props;
  const { x: x1, y: y1 } = usePosition({ x: oldX1, y: oldY1 });
  const { x: x2, y: y2 } = usePosition({ x: oldX2, y: oldY2 });
  return <line x1={x1} x2={x2} y1={y1} y2={y2} stroke={color} {...lineProps} />;
}

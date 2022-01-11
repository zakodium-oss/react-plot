import { SVGProps } from 'react';

import { useRectanglePosition } from '../../hooks';

export interface AnnotationRectangleProps
  extends Omit<
    SVGProps<SVGRectElement>,
    'x1' | 'x2' | 'y1' | 'y2' | 'x' | 'y' | 'width' | 'height'
  > {
  x1: number | string;
  y1: number | string;
  x2: number | string;
  y2: number | string;
}

export function Rectangle(props: AnnotationRectangleProps) {
  const { x1: oldX1, y1: oldY1, x2: oldX2, y2: oldY2, ...otherProps } = props;
  const { x, y, width, height } = useRectanglePosition({
    x1: oldX1,
    y1: oldY1,
    x2: oldX2,
    y2: oldY2,
  });

  return <rect x={x} y={y} width={width} height={height} {...otherProps} />;
}

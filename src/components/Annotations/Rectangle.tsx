import { SVGProps } from 'react';

import { useRectanglePosition } from '../../hooks';
import { ScalarValue } from '../../types';

export interface AnnotationRectangleProps
  extends Omit<
    SVGProps<SVGRectElement>,
    'x1' | 'x2' | 'y1' | 'y2' | 'x' | 'y' | 'width' | 'height' | 'fill'
  > {
  x1: ScalarValue;
  y1: ScalarValue;
  x2: ScalarValue;
  y2: ScalarValue;
  xAxis?: string;
  yAxis?: string;
  color?: string;
}

export function Rectangle(props: AnnotationRectangleProps) {
  const {
    x1: oldX1,
    y1: oldY1,
    x2: oldX2,
    y2: oldY2,
    color,
    xAxis = 'x',
    yAxis = 'y',
    ...otherProps
  } = props;
  const { x, y, width, height } = useRectanglePosition({
    x1: oldX1,
    y1: oldY1,
    x2: oldX2,
    y2: oldY2,
    xAxis,
    yAxis,
  });

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={color}
      {...otherProps}
    />
  );
}

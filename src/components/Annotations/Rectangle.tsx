import { SVGProps } from 'react';

import { usePositionAndSize } from '../../hooks';

export interface AnnotationRectangleProps
  extends Omit<
    SVGProps<SVGRectElement>,
    'x1' | 'x2' | 'y1' | 'y2' | 'x' | 'y' | 'width' | 'height'
  > {
  x: number | string;
  y: number | string;
  width: number | string;
  height: number | string;
}

export function Rectangle(props: AnnotationRectangleProps) {
  const {
    x: oldX,
    y: oldY,
    width: oldWidth,
    height: oldHeight,
    ...otherProps
  } = props;

  const { x, y, width, height } = usePositionAndSize({
    x: oldX,
    y: oldY,
    width: oldWidth,
    height: oldHeight,
  });

  return <rect x={x} y={y} width={width} height={height} {...otherProps} />;
}

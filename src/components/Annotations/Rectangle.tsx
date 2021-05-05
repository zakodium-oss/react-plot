import { SVGProps } from 'react';

import { usePositionAndSize } from '../../hooks';

type SvgRectProps = SVGProps<SVGRectElement>;
export type RectangleProps = Omit<
  SvgRectProps,
  'x1' | 'x2' | 'y1' | 'y2' | 'transform'
>;

export default function Rectangle(props: RectangleProps) {
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

import React, { SVGProps } from 'react';

type RectangleProps = Omit<SVGProps<SVGRect>, 'x1' | 'x2' | 'y1' | 'y2'>;

export default function Rectangle(props: RectangleProps) {
  const { x, y, width, height, fill } = props;
  return <rect x={x} y={y} width={width} height={height} fill={fill} />;
}

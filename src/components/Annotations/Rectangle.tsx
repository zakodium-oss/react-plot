import React, { SVGProps } from 'react';

type SvgRectProps = SVGProps<SVGRectElement>;
type RectangleProps = Omit<SvgRectProps, 'x1' | 'x2' | 'y1' | 'y2'>;

export default function Rectangle(props: RectangleProps) {
  return <rect {...props} />;
}

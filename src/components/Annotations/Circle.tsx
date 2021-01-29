import React, { SVGProps } from 'react';

type SvgCircleProps = SVGProps<SVGCircleElement>;
type CircleProps = Omit<SvgCircleProps, 'x1' | 'x2' | 'y1' | 'y2'>;

export default function Circle(props: CircleProps) {
  return <circle {...props} />;
}

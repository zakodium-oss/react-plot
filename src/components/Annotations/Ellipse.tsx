import React, { SVGProps } from 'react';

type SvgEllipseProps = SVGProps<SVGEllipseElement>;
type EllipseProps = Omit<SvgEllipseProps, 'x1' | 'x2' | 'y1' | 'y2'>;

export default function Ellipse(props: EllipseProps) {
  return <ellipse {...props} />;
}

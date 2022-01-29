import { SVGProps } from 'react';

import { useDirectedEllipsePosition } from '../../hooks';

export interface AnnotationDirectedEllipseProps
  extends Omit<
    SVGProps<SVGEllipseElement>,
    'x1' | 'x2' | 'y1' | 'y2' | 'cx' | 'cy' | 'rx' | 'ry' | 'x' | 'y' | 'width'
  > {
  x1: number | string;
  y1: number | string;
  x2: number | string;
  y2: number | string;
  width: number | string;
}

export function DirectedEllipse(props: AnnotationDirectedEllipseProps) {
  const { x1, y1, y2, x2, color, width, style, ...otherProps } = props;

  const { cx, cy, rx, ry, rotation } = useDirectedEllipsePosition({
    x1,
    y1,
    y2,
    x2,
    width,
  });

  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      transform={`rotate(${rotation} 0 0)`}
      style={{ ...style, transformOrigin: 'center', transformBox: 'fill-box' }}
      fill={color}
      {...otherProps}
    />
  );
}

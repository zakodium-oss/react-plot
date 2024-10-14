import type { ReactNode, SVGProps } from 'react';

import { usePosition } from '../../hooks.js';
import type { ScalarValue } from '../../types.js';

export interface AnnotationTextProps
  extends Omit<
    SVGProps<SVGTextElement>,
    'x1' | 'y1' | 'x2' | 'y2' | 'x' | 'y' | 'fill'
  > {
  x: ScalarValue;
  y: ScalarValue;
  xAxis?: string;
  yAxis?: string;
  color?: string;
  children: ReactNode;
}

export function Text(props: AnnotationTextProps) {
  const {
    x: xOld,
    y: yOld,
    children,
    color,
    xAxis = 'x',
    yAxis = 'y',
    ...otherProps
  } = props;

  const { x, y } = usePosition({ x: xOld, y: yOld, xAxis, yAxis });

  return (
    <text x={x} y={y} fill={color} {...otherProps}>
      {children}
    </text>
  );
}

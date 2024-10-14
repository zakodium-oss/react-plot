import type { CSSProperties, ReactNode } from 'react';
import { type Align, AlignGroup } from 'react-d3-utils';

import { usePosition } from '../../hooks.js';
import type { ScalarValue } from '../../types.js';

export interface AnnotationGroupProps {
  x: ScalarValue;
  y: ScalarValue;
  children: ReactNode;
  xAxis?: string;
  yAxis?: string;
  horizontalAlign?: Align;
  verticalAlign?: Align;
  style?: CSSProperties;
}

export function Group(props: AnnotationGroupProps) {
  const {
    x: oldX,
    y: oldY,
    horizontalAlign = 'none',
    verticalAlign = 'none',
    style = {},
    xAxis = 'x',
    yAxis = 'y',
    children,
  } = props;
  const { x, y } = usePosition({ x: oldX, y: oldY, xAxis, yAxis });

  return (
    <AlignGroup
      x={x}
      y={y}
      horizontalAlign={horizontalAlign}
      verticalAlign={verticalAlign}
      style={style}
    >
      {children}
    </AlignGroup>
  );
}

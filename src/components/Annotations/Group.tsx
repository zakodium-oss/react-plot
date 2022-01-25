import { ReactNode } from 'react';
import { Align, AlignGroup } from 'react-d3-utils';

import { usePosition } from '../../hooks';

export interface AnnotationGroupProps {
  x: number | string | Date;
  y: number | string | Date;
  horizontalAlign?: Align;
  verticalAlign?: Align;
  children: ReactNode;
}

export function Group(props: AnnotationGroupProps) {
  const {
    x: oldX,
    y: oldY,
    horizontalAlign = 'none',
    verticalAlign = 'none',
    children,
  } = props;
  const { x, y } = usePosition({ x: oldX, y: oldY });

  return (
    <AlignGroup
      x={x}
      y={y}
      horizontalAlign={horizontalAlign}
      verticalAlign={verticalAlign}
    >
      {children}
    </AlignGroup>
  );
}

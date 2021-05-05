import { ReactNode } from 'react';

import { usePosition } from '../../hooks';

export interface GroupProps {
  x: number | string;
  y: number | string;

  children: ReactNode;
}

export default function Group(props: GroupProps) {
  const { x: oldX, y: oldY, children } = props;
  const { x, y } = usePosition({
    x: oldX,
    y: oldY,
  });

  return <g transform={`translate(${x}, ${y})`}>{children}</g>;
}

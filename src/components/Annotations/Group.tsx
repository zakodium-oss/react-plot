import React, { ReactNode } from 'react';

import { usePosition } from '../../hooks';

interface GroupProps {
  x: number | string;
  y: number | string;

  children: ReactNode;
}

export default function Group(props: GroupProps) {
  const { x: oldX, y: oldY, children } = props;
  const { x, y } = usePosition({ x: oldX, y: oldY, height: 0, width: 0 });

  return <g transform={`translate(${x}, ${y})`}>{children}</g>;
}

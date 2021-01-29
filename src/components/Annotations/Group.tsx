import React, { ReactNode } from 'react';

interface GroupProps {
  x: number;
  y: number;

  children: ReactNode;
}

export default function Group(props: GroupProps) {
  const { x, y, children } = props;
  return <g transform={`translate(${x}, ${y})`}>{children}</g>;
}

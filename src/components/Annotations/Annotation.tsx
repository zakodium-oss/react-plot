import React, { ReactNode } from 'react';

import { usePlotContext } from '../../hooks';

interface AnnotationsProps {
  children: ReactNode;
}

export function Annotations(props: AnnotationsProps): JSX.Element {
  const { top, left } = usePlotContext();
  return <g transform={`translate(${left}, ${top})`}>{props.children}</g>;
}

export { default as Rectangle } from './Rectangle';
export { default as Ellipse } from './Ellipse';
export { default as Circle } from './Circle';
export { default as Line } from './Line';
export { default as Text } from './Text';
export { default as Group } from './Group';
export { default as Arrow } from './Arrow';
export { default as Shape } from './Shape';

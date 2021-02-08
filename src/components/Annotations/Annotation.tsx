import React, { ReactNode } from 'react';

interface AnnotationsProps {
  children: ReactNode;
}

export function Annotations(props: AnnotationsProps): JSX.Element {
  return <>{props.children}</>;
}

export { default as Rectangle } from './Rectangle';
export { default as Ellipse } from './Ellipse';
export { default as Circle } from './Circle';
export { default as Line } from './Line';
export { default as Text } from './Text';
export { default as Group } from './Group';
export { default as Arrow } from './Arrow';
export { default as Shape } from './Shape';

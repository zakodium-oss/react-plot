import { ReactNode } from 'react';

import { Arrow } from './Arrow';
import { Circle } from './Circle';
import { Ellipse } from './Ellipse';
import { Group } from './Group';
import { Line } from './Line';
import { Rectangle } from './Rectangle';
import { Shape } from './Shape';
import { Text } from './Text';

export const Annotation = {
  Arrow,
  Circle,
  Ellipse,
  Group,
  Line,
  Rectangle,
  Shape,
  Text,
};

export type { AnnotationArrowProps } from './Arrow';
export type { AnnotationCircleProps } from './Circle';
export type { AnnotationEllipseProps } from './Ellipse';
export type { AnnotationGroupProps } from './Group';
export type { AnnotationLineProps } from './Line';
export type { AnnotationRectangleProps } from './Rectangle';
export type { AnnotationShapeProps, AnnotationShapeName } from './Shape';
export type { AnnotationTextProps } from './Text';

export interface AnnotationsProps {
  children: ReactNode;
}

export function Annotations(props: AnnotationsProps): JSX.Element {
  return <>{props.children}</>;
}

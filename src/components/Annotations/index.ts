import { Arrow } from './Arrow';
import { BoxPlot } from './BoxPlot';
import { Circle } from './Circle';
import { DirectedEllipse } from './DirectedEllipse';
import { Ellipse } from './Ellipse';
import { Group } from './Group';
import { Line } from './Line';
import { Polygon } from './Polygon';
import { Polyline } from './Polyline';
import { Rectangle } from './Rectangle';
import { Shape } from './Shape';
import { Text } from './Text';

export const Annotation = {
  Arrow,
  Circle,
  DirectedEllipse,
  Ellipse,
  Group,
  Line,
  Rectangle,
  Shape,
  Text,
  Polyline,
  Polygon,
  BoxPlot,
};

export * from './Annotations';
export type { AnnotationArrowProps } from './Arrow';
export type { AnnotationCircleProps } from './Circle';
export type { AnnotationDirectedEllipseProps } from './DirectedEllipse';
export type { AnnotationEllipseProps } from './Ellipse';
export type { AnnotationGroupProps } from './Group';
export type { AnnotationLineProps } from './Line';
export type { AnnotationRectangleProps } from './Rectangle';
export type { AnnotationShapeProps, AnnotationShapeName } from './Shape';
export type { AnnotationTextProps } from './Text';
export type { AnnotationPolygonProps } from './Polygon';
export type { AnnotationPolylineProps } from './Polyline';
export type { AnnotationBoxPlotProps } from './BoxPlot';

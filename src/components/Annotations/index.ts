import { Arrow } from './Arrow.js';
import { BoxPlot } from './BoxPlot.js';
import { Circle } from './Circle.js';
import { DirectedEllipse } from './DirectedEllipse.js';
import { Ellipse } from './Ellipse.js';
import { Group } from './Group.js';
import { Line } from './Line.js';
import { Polygon } from './Polygon.js';
import { Polyline } from './Polyline.js';
import { Rectangle } from './Rectangle.js';
import { Shape } from './Shape.js';
import { Text } from './Text.js';

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

export * from './Annotations.js';
export type { AnnotationArrowProps } from './Arrow.js';
export type { AnnotationCircleProps } from './Circle.js';
export type { AnnotationDirectedEllipseProps } from './DirectedEllipse.js';
export type { AnnotationEllipseProps } from './Ellipse.js';
export type { AnnotationGroupProps } from './Group.js';
export type { AnnotationLineProps } from './Line.js';
export type { AnnotationRectangleProps } from './Rectangle.js';
export type { AnnotationShapeName, AnnotationShapeProps } from './Shape.js';
export type { AnnotationTextProps } from './Text.js';
export type { AnnotationPolygonProps } from './Polygon.js';
export type { AnnotationPolylineProps } from './Polyline.js';
export type { AnnotationBoxPlotProps } from './BoxPlot.js';

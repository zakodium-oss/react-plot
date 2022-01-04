import type {
  ScaleContinuousNumeric,
  ScaleLinear,
  ScaleLogarithmic,
  ScaleOrdinal,
} from 'd3-scale';
import { CSSProperties, ReactNode } from 'react';

import { AnnotationArrowProps } from './components/Annotations/Arrow';
import { AnnotationCircleProps } from './components/Annotations/Circle';
import { AnnotationEllipseProps } from './components/Annotations/Ellipse';
import { AnnotationGroupProps } from './components/Annotations/Group';
import { AnnotationLineProps } from './components/Annotations/Line';
import { AnnotationRectangleProps } from './components/Annotations/Rectangle';
import { AnnotationShapeProps } from './components/Annotations/Shape';
import { AnnotationTextProps } from './components/Annotations/Text';

export type Shape =
  | 'circle'
  | 'square'
  | 'diamond'
  | 'triangle'
  | 'cross'
  | 'xmark'
  | 'pentagon'
  | 'star'
  | 'hexagon';

export type Horizontal = 'left' | 'right';
export type Vertical = 'top' | 'bottom';
export type Margins = Partial<Record<Horizontal | Vertical, number>>;

export type SeriesPointErrorType = number | number[] | null;

export interface SeriesPointType {
  x: number;
  y: number;
  xError?: SeriesPointErrorType;
  yError?: SeriesPointErrorType;
}

export type CSSFuncProps<T> = {
  [key in keyof CSSProperties]:
    | ((point: T, index: number, data: T[]) => CSSProperties[key])
    | CSSProperties[key];
};

export interface TickType {
  label: string;
  position: number;
  value: number;
}

export interface BaseSeriesProps<T = SeriesPointType> {
  groupId?: string;
  xAxis?: string;
  yAxis?: string;
  data: Array<T>;
  label?: string;
  hidden?: boolean;
}

export interface AxisChildProps {
  id: string;

  /**
   * Hide all axis elements.
   */
  hidden?: boolean;

  /**
   * Hide the line.
   */
  hiddenLine?: boolean;
  lineStyle?: CSSProperties;

  label?: ReactNode;
  labelStyle?: CSSProperties;

  displayPrimaryGridLines?: boolean;
  primaryGridLineStyle?: CSSProperties;

  displaySecondaryGridLines?: boolean;
  secondaryGridLineStyle?: CSSProperties;

  hiddenTicks?: boolean;
  tickPosition?: 'inner' | 'outer' | 'center';
  // TODO: Precise this.
  tickLabelFormat?: () => string;
  tickLabelStyle?: CSSProperties;

  primaryTickLength?: number;
  primaryTickStyle?: CSSProperties;

  secondaryTickLength?: number;
  secondaryTickStyle?: CSSProperties;
}

export interface AxisParentProps {
  id?: string;
  position: Horizontal | Vertical;
  min?: number;
  max?: number;

  paddingStart?: number;
  paddingEnd?: number;

  flip?: boolean;
  scale?: 'linear' | 'log';
}
export interface MarkersProps {
  size: number;
  style: CSSProperties;
}

export interface ClosestInfo<T extends ClosestMethods> {
  point: SeriesPointType;
  label: string;
  axis: T extends 'euclidean'
    ? Record<'x' | 'y', AxisContextType>
    : AxisContextType;
}
export type ClosestMethods = 'x' | 'y' | 'euclidean';
export type ClosestInfoResult = Record<string, ClosestInfo<ClosestMethods>>;
export interface TrackingResult {
  event: React.MouseEvent<SVGRectElement, MouseEvent>;
  coordinates: Record<string, number>;
  getClosest: (method: ClosestMethods) => ClosestInfoResult;
}
export interface TrackingProps {
  onMouseMove?: (result: TrackingResult) => void;
  onClick?: (result: TrackingResult) => void;
  onMouseEnter?: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
  stateSeries: SeriesType[];
}

export type AnnotationsType =
  // This for each annotation option
  | ({ type: 'arrow' } & AnnotationArrowProps)
  | ({ type: 'circle' } & AnnotationCircleProps)
  | ({ type: 'ellipse' } & AnnotationEllipseProps)
  | ({ type: 'line' } & AnnotationLineProps)
  | ({ type: 'rectangle' } & AnnotationRectangleProps)
  | ({ type: 'shape' } & AnnotationShapeProps)
  | ({ type: 'text'; children: string } & Omit<AnnotationTextProps, 'children'>)
  // Group of annotations only
  | ({ type: 'group'; children: AnnotationsType[] } & Omit<
      AnnotationGroupProps,
      'children'
    >);

interface SeriesAxisType {
  min: number;
  max: number;
  axisId: string;
}
export interface SeriesType {
  id: string;
  x: SeriesAxisType;
  y: SeriesAxisType;
  label: string;
  data?: SeriesPointType[];
}

export interface AxisContextGeneric<
  Scale extends ScaleContinuousNumeric<number, number>,
> {
  scale: Scale;
  scientific: boolean;
  position: Horizontal | Vertical;
}
export type AxisContextType =
  | ({ type: 'linear' } & AxisContextGeneric<ScaleLinear<number, number>>)
  | ({ type: 'log' } & AxisContextGeneric<ScaleLogarithmic<number, number>>);

export interface PlotContextType {
  width?: number;
  height?: number;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  plotWidth?: number;
  plotHeight?: number;
  labels?: Array<{ id: string; label: string }>;
  colorScaler?: ScaleOrdinal<string, string>;
  axisContext: Record<string, AxisContextType>;
}

export type AxisType = Record<string, Omit<AxisParentProps, 'id'>>;

export interface State {
  series: SeriesType[];
  axis: AxisType;
}

export type ReducerActions =
  | { type: 'newData'; value: SeriesType }
  | { type: 'removeData'; value: { id: string } }
  | { type: 'newAxis'; value: AxisParentProps }
  | { type: 'removeAxis'; value: { id: string } };

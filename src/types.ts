import type {
  ScaleContinuousNumeric,
  ScaleLinear,
  ScaleLogarithmic,
  ScaleOrdinal,
} from 'd3-scale';
import type { CSSProperties } from 'react';

import type { AxisProps } from './components/Axis/Axis';

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

export type HorizontalPosition = 'left' | 'right';
export type VerticalPosition = 'top' | 'bottom';
export type Position = HorizontalPosition | VerticalPosition;

export type Margins = Partial<Record<Position, number>>;

export type SeriesPointError = number | [number | null, number | null] | null;

export interface SeriesPoint {
  x: number;
  y: number;
  xError?: SeriesPointError;
  yError?: SeriesPointError;
}

export type CSSFuncProps<T> = {
  [key in keyof CSSProperties]:
    | ((point: T, index: number, data: T[]) => CSSProperties[key])
    | CSSProperties[key];
};

export interface BaseSeriesProps<T = SeriesPoint> {
  groupId?: string;
  xAxis?: string;
  yAxis?: string;
  data: Array<T>;
  label?: string;
  hidden?: boolean;
}

export interface MarkersProps {
  size: number;
  style: CSSProperties;
}

export interface ClosestInfo<T extends ClosestMethods> {
  point: SeriesPoint;
  label: string;
  axis: T extends 'euclidean' ? Record<'x' | 'y', AxisContext> : AxisContext;
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
  stateSeries: Series[];
}

interface SeriesAxis {
  min: number;
  max: number;
  axisId: string;
}
export interface Series {
  id: string;
  x: SeriesAxis;
  y: SeriesAxis;
  label: string;
  data?: SeriesPoint[];
}

export interface AxisContextGeneric<
  Scale extends ScaleContinuousNumeric<number, number>,
> {
  scale: Scale;
  scientific: boolean;
  position: Position;
}
export type AxisContext =
  | ({ type: 'linear' } & AxisContextGeneric<ScaleLinear<number, number>>)
  | ({ type: 'log' } & AxisContextGeneric<ScaleLogarithmic<number, number>>);

export interface PlotContext {
  width?: number;
  height?: number;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  plotWidth: number;
  plotHeight: number;
  labels?: Array<{ id: string; label: string }>;
  colorScaler: ScaleOrdinal<string, string>;
  axisContext: Record<string, AxisContext>;
}

type StateAxis = Pick<
  AxisProps,
  'position' | 'min' | 'max' | 'paddingStart' | 'paddingEnd' | 'flip' | 'scale'
>;

export interface State {
  series: Series[];
  axis: Record<string, StateAxis>;
}

export type ReducerActions =
  | { type: 'newData'; value: Series }
  | { type: 'removeData'; value: { id: string } }
  | { type: 'newAxis'; value: { id: string } & StateAxis }
  | { type: 'removeAxis'; value: { id: string } };

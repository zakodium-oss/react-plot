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

export type Horizontal = 'left' | 'right';
export type Vertical = 'top' | 'bottom';
export type Margins = Partial<Record<Horizontal | Vertical, number>>;

export type SeriesPointErrorType =
  | number
  | [number | null, number | null]
  | null;

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
  plotWidth: number;
  plotHeight: number;
  labels?: Array<{ id: string; label: string }>;
  colorScaler: ScaleOrdinal<string, string>;
  axisContext: Record<string, AxisContextType>;
}

type StateAxisType = Pick<
  AxisProps,
  'position' | 'min' | 'max' | 'paddingStart' | 'paddingEnd' | 'flip' | 'scale'
>;

export interface State {
  series: SeriesType[];
  axis: Record<string, StateAxisType>;
}

export type ReducerActions =
  | { type: 'newData'; value: SeriesType }
  | { type: 'removeData'; value: { id: string } }
  | { type: 'newAxis'; value: { id: string } & StateAxisType }
  | { type: 'removeAxis'; value: { id: string } };

import type {
  ScaleContinuousNumeric,
  ScaleLinear,
  ScaleLogarithmic,
  ScaleOrdinal,
} from 'd3-scale';
import { CSSProperties, ReactNode, SVGAttributes } from 'react';

import { ArrowProps } from './components/Annotations/Arrow';
import { CircleProps } from './components/Annotations/Circle';
import { EllipseProps } from './components/Annotations/Ellipse';
import { GroupProps } from './components/Annotations/Group';
import { LineProps } from './components/Annotations/Line';
import { RectangleProps } from './components/Annotations/Rectangle';
import { ShapeProps } from './components/Annotations/Shape';
import { TextProps } from './components/Annotations/Text';


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

// Component props helpers
export type Horizontal = 'left' | 'right';
export type Vertical = 'top' | 'bottom';
export type Margins = Record<Horizontal | Vertical, number | undefined>;

export type SeriesPointErrorType = number | number[] | null;

export interface SeriesPointType {
  x: number;
  y: number;
  xError?: SeriesPointErrorType;
  yError?: SeriesPointErrorType;
}

export interface RangeSeriesPointType {
  x: number;
  y1: number;
  y2: number;
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

// Component props

export interface PlotProps {
  /**
   * Width of the SVG in pixels.
   */
  width: number;
  /**
   * Height of the SVG in pixels.
   */
  height: number;
  /**
   * Color scheme used to pick colors for the series.
   * Defaults to the "schemeSet1" from "d3-scale-chromatic".
   */
  colorScheme?: Iterable<string>;
  /**
   * Margins around the plot.
   */
  margin?: Partial<Margins>;
  /**
   * Style applied to the SVG element.
   */
  svgStyle?: CSSProperties;
  /**
   * Id of the SVG element
   */
  svgId?: string;
  /**
   * Class name of the SVG element
   */
  svgClassName?: string;
  /**
   * Style applied to the rectangle around the entire plot.
   */
  plotViewportStyle?: CSSProperties;
  /**
   * Style applied to the rectangle around the series viewport.
   */
  seriesViewportStyle?: CSSProperties;
  /**
   * Track values on mouse move
   */
  onMouseMove?: (result: TrackingResult) => void;
  /**
   * Track values on mouse click
   */
  onClick?: (result: TrackingResult) => void;
  /**
   * Mouse enter viewport
   */
  onMouseEnter?: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
  /**
   * Mouse leaves viewport
   */
  onMouseLeave?: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
  /**
   * All plot elements.
   */
  children: ReactNode;
}

export interface BaseSeriesProps<T = SeriesPointType> {
  groupId?: string;
  xAxis?: string;
  yAxis?: string;
  data: Array<T>;
  label?: string;
  hidden?: boolean;
}

export interface ScatterSeriesProps<T = SeriesPointType>
  extends BaseSeriesProps<T> {
  markerShape?: Shape;
  markerSize?: number;
  markerStyle?: CSSFuncProps<T>;
  displayErrorBars?: boolean;
  errorBarsStyle?: SVGAttributes<SVGLineElement>;
  errorBarsCapStyle?: SVGAttributes<SVGLineElement>;
  errorBarsCapSize?: number;
}

export interface LineSeriesProps extends ScatterSeriesProps {
  lineStyle?: CSSProperties;
  displayMarker?: boolean;
}

export type BarSeriesProps = LineSeriesProps;

export interface RangeSeriesProps<T extends RangeSeriesPointType>
  extends BaseSeriesProps<T> {
  lineStyle?: CSSProperties;
}

export interface AxisChildProps {
  id: string;
  fontSize?: number;
  label?: ReactNode;
  displayGridLines?: boolean;
  labelStyle?: CSSProperties;
  tickStyle?: CSSProperties;
  tickEmbedded?: boolean;
  labelSpace?: number;
  hidden?: boolean;
  hiddenTicks?: boolean;
  tickLength?: number;
  hiddenSecondaryTicks?: boolean;
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
export type AxisProps = AxisChildProps & AxisParentProps;
export type ParallelAxisProps = Omit<AxisChildProps, 'displayGridLines'>;

export interface HeadingProps {
  title: string;
  titleStyle?: CSSProperties;
  titleClass?: string;
  subtitle?: string;
  subtitleStyle?: CSSProperties;
  subtitleClass?: string;
  position?: Vertical;
}

export type LegendProps = {
  position: Horizontal | Vertical | 'embedded';
} & { [K in Vertical | Horizontal]?: number };

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

// Plot object related
export type AnnotationsType =
  // This for each annotation option
  | ({ type: 'arrow' } & ArrowProps)
  | ({ type: 'circle' } & CircleProps)
  | ({ type: 'ellipse' } & EllipseProps)
  | ({ type: 'line' } & LineProps)
  | ({ type: 'rectangle' } & RectangleProps)
  | ({ type: 'shape' } & ShapeProps)
  | ({ type: 'text'; children: string } & Omit<TextProps, 'children'>)
  // Group of annotations only
  | ({ type: 'group'; children: AnnotationsType[] } & Omit<
      GroupProps,
      'children'
    >);

type ContentType =
  | { type: 'annotation'; children: AnnotationsType[] }
  // Different series
  | ({ type: 'line' } & LineSeriesProps)
  | ({ type: 'scatter' } & ScatterSeriesProps);

export interface PlotObjectType {
  axes: Array<
    ({ type: 'main' } & AxisProps) | ({ type: 'secondary' } & ParallelAxisProps)
  >;
  content: ContentType[];
  legend?: LegendProps;
  dimensions?: Pick<PlotProps, 'width' | 'height' | 'margin'>;
  svg?: Pick<
    PlotProps,
    | 'plotViewportStyle'
    | 'seriesViewportStyle'
    | 'onClick'
    | 'onMouseMove'
    | 'onMouseEnter'
    | 'onMouseLeave'
  > & {
    className?: string;
    id?: string;
    style?: PlotProps['svgStyle'];
  };
  colorScheme?: Iterable<string>;
  seriesViewportStyle?: CSSProperties;
}

export interface PlotObjectProps {
  plot: PlotObjectType;
  children?: ReactNode;
}

// State related

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
  Scale extends ScaleContinuousNumeric<number, number>
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

// Util functions

export type ReducerActions =
  | { type: 'newData'; value: SeriesType }
  | { type: 'removeData'; value: { id: string } }
  | { type: 'newAxis'; value: AxisParentProps }
  | { type: 'removeAxis'; value: { id: string } };

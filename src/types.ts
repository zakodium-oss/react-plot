import type {
  ScaleContinuousNumeric,
  ScaleLinear,
  ScaleLogarithmic,
  ScaleOrdinal,
} from 'd3-scale';
import { CSSProperties, ReactElement, ReactNode, SVGAttributes } from 'react';

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
   * Margins around the series viewport.
   * They are used to make space within the SVG to place elements that are
   * external to the series viewport (axes, legend, headings, ...).
   */
  margin?: Partial<Margins>;
  /**
   * Style applied to the SVG element.
   */
  svgStyle?: CSSProperties;
  /**
   * Style applied to the rectangle around the entire plot.
   */
  plotViewportStyle?: CSSProperties;
  /**
   * Style applied to the rectangle around the series viewport.
   */
  seriesViewportStyle?: CSSProperties;
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

type Dimensions = Omit<PlotProps, 'colorScheme' | 'children'>;
export interface PlotObjectType {
  axes: AxisProps[];
  series: Array<
    | ({ type: 'line' } & LineSeriesProps)
    | ({ type: 'scatter' } & ScatterSeriesProps)
  >;
  legend?: LegendProps;
  dimensions: Dimensions;
  colorScheme?: Iterable<string>;
  seriesViewportStyle?: CSSProperties;
}

export interface PlotObjectProps {
  plot: PlotObjectType;
}

// State related

interface SeriesAxisType {
  min: number;
  minPositive: number;
  max: number;
  axisId: string;
}
export interface SeriesType {
  id: string;
  x: SeriesAxisType;
  y: SeriesAxisType;
  label: string;
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

export interface PlotChildren {
  hasInvalidChild: boolean;
  series: ReactElement<LineSeriesProps | ScatterSeriesProps>[];
  axes: ReactElement<AxisProps>[];
  heading: ReactElement<HeadingProps> | null;
  legend: ReactElement<LegendProps> | null;
  annotations: Array<ReactElement<LegendProps>>;
}

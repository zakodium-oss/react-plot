import type { ScaleLinear, ScaleOrdinal } from 'd3-scale';
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
export type HorizontalPosition = 'left' | 'right';
export type VerticalPosition = 'top' | 'bottom';
export type Margins = Record<
  HorizontalPosition | VerticalPosition,
  number | undefined
>;

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

export interface ScatterSeriesProps {
  groupId?: string;
  xAxis?: string;
  yAxis?: string;
  data: SeriesPointType[];
  label?: string;
  markerShape?: Shape;
  markerSize?: number;
  hidden?: boolean;
  markerStyle?: CSSFuncProps<SeriesPointType>;
  displayErrorBars?: boolean;
  errorBarsStyle?: SVGAttributes<SVGLineElement>;
  errorBarsCapStyle?: SVGAttributes<SVGLineElement>;
  errorBarsCapSize?: number;
}
export interface LineSeriesProps extends ScatterSeriesProps {
  lineStyle?: CSSProperties;
  displayMarker?: boolean;
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
  position: HorizontalPosition | VerticalPosition;
  min?: number;
  max?: number;

  paddingStart?: number;
  paddingEnd?: number;

  flip?: boolean;
}
export type AxisProps = AxisChildProps & AxisParentProps;

export interface HeadingProps {
  title: string;
  titleStyle?: CSSProperties;
  titleClass?: string;
  subtitle?: string;
  subtitleStyle?: CSSProperties;
  subtitleClass?: string;
  position?: VerticalPosition;
}

export type LegendProps = {
  position: HorizontalPosition | VerticalPosition | 'embedded';
} & { [K in VerticalPosition | HorizontalPosition]?: number };

export interface MarkersProps {
  size: number;
  style: CSSProperties;
}

type Dimentions = Omit<PlotProps, 'colorScheme' | 'children'>;
export interface PlotObjectType {
  axes: AxisProps[];
  series: Array<
    | ({ type: 'line' } & LineSeriesProps)
    | ({ type: 'scatter' } & ScatterSeriesProps)
  >;
  legend?: LegendProps;
  dimentions: Dimentions;
  colorScheme?: Iterable<string>;
  seriesViewportStyle?: CSSProperties;
}

export interface PlotObjectProps {
  plot: PlotObjectType;
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
}

export interface AxisContextType {
  scale: ScaleLinear<number, number>;
  scientific: boolean;
  position: HorizontalPosition | VerticalPosition;
}
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

export interface PlotState {
  series: SeriesType[];
  axis: AxisType;
  headingPosition: VerticalPosition;
}

// Util functions

export type PlotReducerActions =
  | ActionType<'newData', SeriesType>
  | ActionType<'removeData', { id: string }>
  | ActionType<'newAxis', AxisParentProps>
  | ActionType<'removeAxis', { id: string }>
  | ActionType<'setHeadingPosition', VerticalPosition>;

export interface PlotChildren {
  hasInvalidChild: boolean;
  series: ReactElement<LineSeriesProps | ScatterSeriesProps>[];
  axes: ReactElement<AxisProps>[];
  heading: ReactElement<HeadingProps> | null;
  legend: ReactElement<LegendProps> | null;
}

export type ActionType<Action, Payload = void> = Payload extends void
  ? { type: Action }
  : { type: Action; payload: Payload };

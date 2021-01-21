import type { ScaleLinear, ScaleOrdinal } from 'd3-scale';
import { CSSProperties, ReactElement, ReactNode } from 'react';

// Component props helpers
export type Horizontal = 'left' | 'right';
export type Vertical = 'top' | 'bottom';
export type Margins = Record<Horizontal | Vertical, number | undefined>;

export interface Series {
  x: number;
  y: number;
}

export type CSSFuncProps<T> = {
  [key in keyof CSSProperties]:
    | ((point: T, index: number, data: T[]) => CSSProperties[key])
    | CSSProperties[key];
};

// Component props

export interface PlotProps {
  width: number;
  height: number;
  colorScheme?: Iterable<string>;
  margin?: Partial<Margins>;
  viewportStyle?: CSSProperties;
  children: ReactNode;
}

export interface ScatterSeriesProps {
  groupId?: string;
  xAxis?: string;
  yAxis?: string;
  data: Series[];
  label?: string;
  markerShape?: 'circle' | 'square' | 'triangle';
  markerSize?: number;
  hidden?: boolean;
  markerStyle?: CSSFuncProps<Series>;
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
}

export interface AxisParentProps {
  id?: string;
  position: Horizontal | Vertical;
  min?: number;
  max?: number;
  padding?: [number, number];
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
  position?: Vertical;
}

export type LegendProps = {
  position: Horizontal | Vertical | 'embedded';
} & { [K in Vertical | Horizontal]?: number };

export interface MarkersProps {
  x: number;
  y: number;
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
  viewportStyle?: CSSProperties;
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
  position: Horizontal | Vertical;
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
  invalidChild: boolean;
  series: ReactElement<LineSeriesProps | ScatterSeriesProps>[];
  axis: ReactElement<AxisProps>[];
  heading: ReactElement<HeadingProps> | null;
  legend: ReactElement<LegendProps> | null;
}

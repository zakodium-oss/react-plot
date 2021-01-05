import type { AxisScale } from 'd3-axis';
import type { ScaleOrdinal } from 'd3-scale';
import { CSSProperties, ReactElement, ReactNode } from 'react';

// Component props helpers
export type Horizontal = 'left' | 'right';
export type Vertical = 'top' | 'bottom';
export type Margins = Record<Horizontal | Vertical, number | undefined>;

export interface Series {
  x: number;
  y: number;
}

// Component props

export interface PlotProps {
  width: number;
  height: number;
  colorScheme?: Iterable<string>;
  margin?: Partial<Margins>;
  children: ReactNode;
}

export interface LineSeriesProps {
  data: Series[];
  lineStyle?: CSSProperties;
  label?: string;
  displayMarker?: boolean;
  markerShape?: 'circle' | 'square' | 'triangle';
  markerSize?: number;
}

interface AxisProps {
  fontSize?: number;
  label?: string;
  showGridLines?: boolean;
  labelStyle?: CSSProperties;
  tickStyle?: CSSProperties;
  labelSpace?: number;
  min?: number;
  max?: number;
  display?: boolean;
  flip?: boolean;
}

export interface XAxisProps extends AxisProps {
  paddingLeft?: number;
  paddingRight?: number;
}

export interface YAxisProps extends AxisProps {
  paddingTop?: number;
  paddingBottom?: number;
}

export interface HeadingProps {
  title: string;
  titleStyle?: CSSProperties;
  titleClass?: string;
  subtitle?: string;
  subtitleStyle?: CSSProperties;
  subtitleClass?: string;
  position?: Vertical;
}

export interface LegendProps {
  position?: Horizontal;
}

export interface MarkersProps {
  x: number;
  y: number;
  fill: string;
  size: number;
}

// State related

export interface SeriesType {
  id: string;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  label: string;
}

export interface PlotContextType {
  xScale?: AxisScale<number>;
  yScale?: AxisScale<number>;
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
  xScientific: boolean;
  yScientific: boolean;
}

// Util functions

export type ReducerActions =
  | { type: 'newData'; value: SeriesType }
  | { type: 'removeData'; value: { id: string } }
  | { type: 'xMinMax' | 'yMinMax'; value: { min?: number; max?: number } }
  | { type: 'xPadding' | 'yPadding'; value: { min?: number; max?: number } }
  | { type: 'flip'; value: { flip: boolean; axis: 'x' | 'y' } };

export interface PlotChildren {
  invalidChild: boolean;
  lineSeries: ReactElement<LineSeriesProps>[];
  axis: Record<'x' | 'y', ReactElement<AxisProps> | null>;
  heading: ReactElement<HeadingProps> | null;
  legend: ReactElement<LegendProps> | null;
}

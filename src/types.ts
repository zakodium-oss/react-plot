import { AxisScale } from 'd3-axis';
import { CSSProperties, ReactElement, ReactNode } from 'react';

// Component props helpers

type Margins = Record<'top' | 'bottom' | 'left' | 'right', number | undefined>;

export interface Series {
  x: number[];
  y: number[];
}

// Component props

export interface PlotProps {
  width: number;
  height: number;
  colorScheme?: string;
  margin?: Margins;
  children: ReactNode[];
}

export interface LineSeriesProps {
  data: Series;
  lineStyle?: CSSProperties;
  label?: string;
}

export interface AxisProps {
  fontSize?: number;
  label?: string;
  showGridLines?: boolean;
}

// State related

export interface PlotState {
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
  margin?: Margins;
}

// Util functions

export type ReducerActions =
  | { type: 'newData'; value: PlotState }
  | { type: 'removeData'; value: { id: string } };

export interface PlotChildren {
  invalidChild: boolean;
  lineSeries: ReactElement<LineSeriesProps>[];
  axis: Record<'x' | 'y', ReactElement<AxisProps> | null>;
}

import { CSSProperties, ReactNode } from 'react';

export interface PlotProps {
  width: number;
  height: number;
  colorScheme?: string;
  margin: SVGStyleElement;
  children: ReactNode[];
}

export interface Series {
  x: number;
  y: number;
}

export interface LineSeriesProps {
  data: Series[];
  lineStyle?: CSSProperties;
  label?: string;
}

export interface PlotState {
  xMin: number | null;
  xMax: number | null;
  yMin: number | null;
  yMax: number | null;
  xScale: (x: number) => number | null;
  yScale: (x: number) => number | null;
  width: number;
  height: number;
  labels: string[];
}

interface DataAction {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  label: string;
}

export interface ReducerActions {
  type: 'newData';
  value: DataAction;
}

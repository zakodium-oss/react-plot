import { CSSProperties, ReactElement, ReactNode } from 'react';

export interface PlotProps {
  width: number;
  height: number;
  colorScheme?: string;
  margin: Record<'botom', number>;
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
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
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

export interface PlotChildren {
  invalidChild: boolean;
  lineSeries: ReactElement<LineSeriesProps>[];
}

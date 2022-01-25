import { ScaleLinear, ScaleLogarithmic, ScaleTime } from 'd3-scale';
import type { CSSProperties } from 'react';

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

export type SeriesPointError =
  | Date
  | number
  | [Date | number | null, Date | number | null]
  | null;

export interface SeriesPoint {
  x: number | Date;
  y: number | Date;
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

export type ActionType<Action, Payload = void> = Payload extends void
  ? { type: Action }
  : { type: Action; payload: Payload };

export type TickLabelFormat = (value: number | Date) => string;

export type TickPosition = 'inner' | 'outer' | 'center';

export type Scales =
  | ScaleLinear<number, number>
  | ScaleLogarithmic<number, number>
  | ScaleTime<number, number>;

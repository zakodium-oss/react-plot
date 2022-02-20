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

export type SeriesPointError = number | [number | null, number | null] | null;

export interface SeriesPoint {
  x: number;
  y: number;
}

export interface SeriesPointWithError extends SeriesPoint {
  xError?: SeriesPointError;
  yError?: SeriesPointError;
}

export type CSSFuncProps<T> = {
  [key in keyof CSSProperties]:
    | ((point: T, index?: number, data?: T[]) => CSSProperties[key])
    | CSSProperties[key];
};

export type ShapeFuncProps<T> =
  | ((point: T, index?: number, data?: ReadonlyArray<T>) => Shape)
  | Shape;

export type LabelFuncProps<T> =
  | ((point: T, index?: number, data?: ReadonlyArray<T>) => string)
  | string;

export interface BaseSeriesProps<T> {
  data: ReadonlyArray<T>;
  id?: string;
  xAxis?: string;
  yAxis?: string;
  label?: string;
  hidden?: boolean;
  xShift?: number | string;
  yShift?: number | string;
}

export type ActionType<Action, Payload = void> = Payload extends void
  ? { type: Action }
  : { type: Action; payload: Payload };

export type TickLabelFormat<T = number> = (value: T) => string;

export type TickPosition = 'inner' | 'outer' | 'center';

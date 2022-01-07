import { max, min } from 'd3-array';
import {
  ScaleOrdinal,
  ScaleContinuousNumeric,
  ScaleLinear,
  ScaleLogarithmic,
  scaleOrdinal,
  scaleLinear,
  scaleLog,
} from 'd3-scale';
import { createContext, useContext, useMemo } from 'react';

import type { AxisProps } from './components/Axis/Axis';
import type { Position, SeriesPoint } from './types';
import { validatePosition } from './utils';

export interface PlotSeriesStateAxis {
  min: number;
  max: number;
  axisId: string;
}

export interface PlotSeriesState {
  id: string;
  x: PlotSeriesStateAxis;
  y: PlotSeriesStateAxis;
  label: string;
  data?: SeriesPoint[];
}

export interface PlotState {
  series: PlotSeriesState[];
  axis: Record<string, PlotStateAxis>;
}

type PlotStateAxis = Pick<
  AxisProps,
  'position' | 'min' | 'max' | 'paddingStart' | 'paddingEnd' | 'flip' | 'scale'
>;

export type PlotReducerActions =
  | { type: 'newData'; value: PlotSeriesState }
  | { type: 'removeData'; value: { id: string } }
  | { type: 'newAxis'; value: { id: string } & PlotStateAxis }
  | { type: 'removeAxis'; value: { id: string } };

export interface PlotAxisContextGeneric<
  Scale extends ScaleContinuousNumeric<number, number>,
> {
  scale: Scale;
  scientific: boolean;
  position: Position;
}

export type PlotAxisContext =
  | ({ type: 'linear' } & PlotAxisContextGeneric<ScaleLinear<number, number>>)
  | ({ type: 'log' } & PlotAxisContextGeneric<
      ScaleLogarithmic<number, number>
    >);

export interface PlotContext {
  width?: number;
  height?: number;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  plotWidth: number;
  plotHeight: number;
  labels?: Array<{ id: string; label: string }>;
  colorScaler: ScaleOrdinal<string, string>;
  axisContext: Record<string, PlotAxisContext>;
}

export function plotReducer(state: PlotState, action: PlotReducerActions) {
  switch (action.type) {
    case 'newData': {
      state.series.push(action.value);
      break;
    }
    case 'removeData': {
      const { id } = action.value;
      const seriesFiltered = state.series.filter((series) => series.id !== id);
      state.series = seriesFiltered;
      break;
    }
    case 'newAxis': {
      const { id, position, ...values } = action.value;
      let currentAxis = state.axis[id];
      if (currentAxis) {
        validatePosition(currentAxis.position, position, id);
        state.axis[id] = { ...currentAxis, position, ...values };
      } else {
        state.axis[id] = { position, ...values };
      }
      break;
    }
    case 'removeAxis': {
      const { id } = action.value;
      delete state.axis[id];
      break;
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new Error(`Unknown reducer type ${(action as any).type}`);
    }
  }
}

type PlotDispatch = (action: PlotReducerActions) => void;

export const plotContext = createContext<PlotContext>({
  plotWidth: 0,
  plotHeight: 0,
  colorScaler: scaleOrdinal<string>(),
  axisContext: {},
});

export const plotDispatchContext = createContext<PlotDispatch>(() => {
  // No-op
});

export function usePlotContext() {
  const context = useContext(plotContext);
  if (!context) {
    throw new Error('usePlotContext called outside of Plot context');
  }
  return context;
}

export function usePlotDispatchContext() {
  const context = useContext(plotDispatchContext);
  if (!context) {
    throw new Error('usePlotDispatchContext called outside of Plot context');
  }
  return context;
}

interface SizeProps {
  plotWidth: number;
  plotHeight: number;
}

export function useAxisContext(
  state: PlotState,
  { plotWidth, plotHeight }: SizeProps,
) {
  const context = useMemo(() => {
    let axisContext: Record<string, PlotAxisContext> = {};

    for (const id in state.axis) {
      const axis = state.axis[id];
      const isHorizontal = ['top', 'bottom'].includes(axis.position);
      const xY = isHorizontal ? 'x' : 'y';

      // Get limits from state or data
      const axisMin =
        axis.min !== undefined ? axis.min : min(state.series, (d) => d[xY].min);
      const axisMax =
        axis.max !== undefined ? axis.max : max(state.series, (d) => d[xY].max);

      // Limits validation
      if (axisMin === undefined || axisMax === undefined) {
        return {};
      }
      if (axisMin > axisMax) {
        throw new Error(
          `${id}: min (${axisMin}) is bigger than max (${axisMax})`,
        );
      }

      // Limits paddings
      const diff = axisMax - axisMin;
      const minPad = diff * (axis.paddingStart || 0);
      const maxPad = diff * (axis.paddingEnd || 0);

      const range: number[] = isHorizontal ? [0, plotWidth] : [plotHeight, 0];

      switch (axis.scale) {
        case 'log': {
          axisContext[id] = {
            type: axis.scale,
            position: axis.position,
            scientific: true,
            scale: scaleLog()
              .domain([axisMin - minPad, axisMax + maxPad])
              .range(axis.flip ? range.reverse() : range),
          };
          break;
        }
        case 'linear':
        default: {
          axisContext[id] = {
            type: 'linear' as const,
            position: axis.position,
            scientific: diff <= 0.01 || diff >= 1000,
            scale: scaleLinear()
              .domain([axisMin - minPad, axisMax + maxPad])
              .range(axis.flip ? range.reverse() : range),
          };
          break;
        }
      }
    }
    return axisContext;
  }, [state, plotWidth, plotHeight]);

  return context;
}

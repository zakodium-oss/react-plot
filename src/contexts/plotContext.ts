import { max, min } from 'd3-array';
import {
  ScaleOrdinal,
  ScaleContinuousNumeric,
  ScaleLinear,
  ScaleLogarithmic,
  scaleOrdinal,
  scaleLinear,
  scaleLog,
  ScaleTime,
  scaleTime,
} from 'd3-scale';
import { createContext, Dispatch, useContext, useMemo } from 'react';

import type { AxisProps } from '../components/Axis/Axis';
import { LegendPosition } from '../components/Legend';
import type {
  ActionType,
  Position,
  SeriesPoint,
  TickLabelFormat,
  VerticalPosition,
} from '../types';
import { validatePosition } from '../utils';

interface PlotSeriesStateAxis {
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
  headingPosition: VerticalPosition | null;
  legendPosition: LegendPosition | null;
  legendMargin: number;
  series: PlotSeriesState[];
  axes: Record<string, PlotAxisState>;
}

export type PlotAxisState = Pick<
  AxisProps,
  | 'position'
  | 'min'
  | 'max'
  | 'paddingStart'
  | 'paddingEnd'
  | 'flip'
  | 'scale'
  | 'tickLabelFormat'
> & {
  innerOffset: number;
};

export type PlotReducerActions =
  | ActionType<'newData', PlotSeriesState>
  | ActionType<'removeData', { id: string }>
  | ActionType<'newAxis', { id: string } & PlotAxisState>
  | ActionType<'removeAxis', { id: string }>
  | ActionType<'addHeading', { position: VerticalPosition }>
  | ActionType<'removeHeading'>
  | ActionType<'addLegend', { position: LegendPosition; margin: number }>
  | ActionType<'removeLegend'>;

interface PlotAxisContextGeneric<
  Scale extends
    | ScaleContinuousNumeric<number, number>
    | ScaleTime<number, number>,
> {
  scale: Scale;
  tickLabelFormat: TickLabelFormat;
  position: Position;
}

export type PlotAxisContext =
  | ({ type: 'linear' } & PlotAxisContextGeneric<ScaleLinear<number, number>>)
  | ({ type: 'log' } & PlotAxisContextGeneric<ScaleLogarithmic<number, number>>)
  | ({ type: 'time' } & PlotAxisContextGeneric<ScaleTime<number, number>>);

export interface PlotContext {
  width: number;
  height: number;
  plotWidth: number;
  plotHeight: number;
  colorScaler: ScaleOrdinal<string, string>;
  axisContext: Record<string, PlotAxisContext>;
}

export function plotReducer(state: PlotState, action: PlotReducerActions) {
  switch (action.type) {
    case 'newData': {
      state.series.push(action.payload);
      break;
    }
    case 'removeData': {
      const { id } = action.payload;
      const seriesFiltered = state.series.filter((series) => series.id !== id);
      state.series = seriesFiltered;
      break;
    }
    case 'newAxis': {
      const { id, position, ...values } = action.payload;
      let currentAxis = state.axes[id];
      if (currentAxis) {
        validatePosition(currentAxis.position, position, id);
        state.axes[id] = { ...currentAxis, position, ...values };
      } else {
        state.axes[id] = { position, ...values };
      }
      break;
    }
    case 'removeAxis': {
      const { id } = action.payload;
      delete state.axes[id];
      break;
    }
    case 'addHeading': {
      state.headingPosition = action.payload.position;
      break;
    }
    case 'removeHeading': {
      state.headingPosition = null;
      break;
    }
    case 'addLegend': {
      state.legendPosition = action.payload.position;
      state.legendMargin = action.payload.margin;
      break;
    }
    case 'removeLegend': {
      state.legendPosition = null;
      state.legendMargin = 0;
      break;
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new Error(`Unknown reducer type ${(action as any).type}`);
    }
  }
}

type PlotDispatch = Dispatch<PlotReducerActions>;

export const plotContext = createContext<PlotContext>({
  width: 0,
  height: 0,
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

    for (const id in state.axes) {
      const axis = state.axes[id];
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
            tickLabelFormat: axis.tickLabelFormat,
            scale: scaleLog()
              .domain([axisMin - minPad, axisMax + maxPad])
              .range(axis.flip ? range.reverse() : range),
          };
          break;
        }
        case 'time': {
          axisContext[id] = {
            type: axis.scale,
            position: axis.position,
            tickLabelFormat: axis.tickLabelFormat,
            scale: scaleTime()
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
            tickLabelFormat: axis.tickLabelFormat,
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

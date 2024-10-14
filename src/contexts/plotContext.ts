import { max, min } from 'd3-array';
import {
  type ScaleContinuousNumeric,
  type ScaleLinear,
  scaleLinear,
  scaleLog,
  type ScaleLogarithmic,
  type ScaleOrdinal,
  scaleOrdinal,
  type ScaleTime,
  scaleTime,
} from 'd3-scale';
import { createContext, type Dispatch, useContext, useMemo } from 'react';

import type { AxisScale } from '../components/Axis/Axis.js';
import type { LegendPosition } from '../components/Legend.js';
import type {
  ActionType,
  Position,
  ScalarValue,
  SeriesPoint,
  TickLabelFormat,
  VerticalPosition,
} from '../types.js';
import { validatePosition } from '../utils.js';

import type { PlotAxesOverrides } from './plotController/usePlotOverrides.js';

export interface PlotState {
  headingPosition: VerticalPosition | null;
  legendPosition: LegendPosition | null;
  legendMargin: number;
  series: PlotSeriesState[];
  axes: Record<string, PlotAxisState>;
}

export interface PlotSeriesState {
  id: string;
  x: PlotSeriesStateAxis;
  y: PlotSeriesStateAxis;
  label?: string;
  data?: readonly SeriesPoint[];
}

interface PlotSeriesStateAxis {
  min: number;
  max: number;
  shift: ScalarValue;
  axisId: string;
}

export interface PlotAxisState {
  id: string;
  position: Position;
  min?: number;
  max?: number;
  flip: boolean;
  scale: AxisScale;
  innerOffset: number;
  paddingStart: ScalarValue;
  paddingEnd: ScalarValue;
  tickLabelFormat: TickLabelFormat | TickLabelFormat<Date> | undefined;
}

export type PlotReducerActions =
  | ActionType<'addSeries', PlotSeriesState>
  | ActionType<'removeSeries', { id: string }>
  | ActionType<'addAxis', PlotAxisState>
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
  domain: readonly [number, number];
  clampInDomain: (value: number) => number;
  tickLabelFormat: TickLabelFormat | TickLabelFormat<Date> | undefined;
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
    case 'addSeries': {
      state.series.push(action.payload);
      break;
    }
    case 'removeSeries': {
      const { id } = action.payload;
      const seriesFiltered = state.series.filter((series) => series.id !== id);
      state.series = seriesFiltered;
      break;
    }
    case 'addAxis': {
      const { id, position, ...values } = action.payload;
      const currentAxis = state.axes[id];
      if (currentAxis) {
        validatePosition(currentAxis.position, position, id);
        state.axes[id] = { ...currentAxis, position, ...values };
      } else {
        state.axes[id] = { id, position, ...values };
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
  axesOverrides: PlotAxesOverrides,
  { plotWidth, plotHeight }: SizeProps,
) {
  const context = useMemo(() => {
    const axisContext: Record<string, PlotAxisContext> = {};
    for (const id in state.axes) {
      const axis = state.axes[id];
      const overrides = axesOverrides[id];
      const isHorizontal = ['top', 'bottom'].includes(axis.position);
      const xY = isHorizontal ? 'x' : 'y';

      // Get axis boundaries from override (context), state (axis props), or data.
      let isAxisMinForced = false;
      let axisMin: number;
      if (overrides?.min != null) {
        axisMin = overrides.min;
        isAxisMinForced = true;
      } else if (axis.min != null) {
        axisMin = axis.min;
        isAxisMinForced = true;
      } else {
        axisMin = min(
          state.series.filter((s) => xY !== 'x' || !s.id.startsWith('~')),
          (d) => (d[xY].axisId === id ? d[xY].min : undefined),
        ) as number;
      }

      let isAxisMaxForced = false;
      let axisMax: number;
      if (overrides?.max != null) {
        axisMax = overrides.max;
        isAxisMaxForced = true;
      } else if (axis.max != null) {
        axisMax = axis.max;
        isAxisMaxForced = true;
      } else {
        axisMax = max(
          state.series.filter((s) => xY !== 'x' || !s.id.startsWith('~')),
          (d) => (d[xY].axisId === id ? d[xY].max : undefined),
        ) as number;
      }

      // Limits validation
      if (axisMin === undefined || axisMax === undefined) {
        return {};
      }
      if (axisMin > axisMax) {
        throw new Error(
          `${id}: min (${axisMin}) is bigger than max (${axisMax})`,
        );
      }

      const axisSize = isHorizontal ? plotWidth : plotHeight;
      const padding = computeAxisPadding(
        axis,
        axisMax - axisMin,
        axisSize,
        isAxisMinForced,
        isAxisMaxForced,
      );

      const range: number[] = isHorizontal ? [0, plotWidth] : [plotHeight, 0];
      const domain = [axisMin - padding.min, axisMax + padding.max] as const;
      // eslint-disable-next-line unicorn/consistent-function-scoping
      const clampInDomain = function clampInDomain(value: number) {
        return value < domain[0] ? domain[0] : Math.min(value, domain[1]);
      };

      switch (axis.scale) {
        case 'log': {
          axisContext[id] = {
            type: axis.scale,
            position: axis.position,
            tickLabelFormat: axis.tickLabelFormat,
            scale: scaleLog()
              .domain(domain)
              .range(axis.flip ? range.reverse() : range),
            domain,
            clampInDomain,
          };
          break;
        }
        case 'time': {
          axisContext[id] = {
            type: axis.scale,
            position: axis.position,
            tickLabelFormat: axis.tickLabelFormat,
            scale: scaleTime()
              .domain(domain)
              .range(axis.flip ? range.reverse() : range),
            domain,
            clampInDomain,
          };
          break;
        }
        case 'linear': {
          axisContext[id] = {
            type: 'linear' as const,
            position: axis.position,
            tickLabelFormat: axis.tickLabelFormat,
            scale: scaleLinear()
              .domain(domain)
              .range(axis.flip ? range.reverse() : range),
            domain,
            clampInDomain,
          };
          break;
        }
        default: {
          throw new Error('unreachable');
        }
      }
    }
    return axisContext;
  }, [state.axes, state.series, axesOverrides, plotWidth, plotHeight]);

  return context;
}

function computeAxisPadding(
  axis: PlotAxisState,
  diff: number,
  size: number,
  isMinForced: boolean,
  isMaxForced: boolean,
) {
  const { paddingStart, paddingEnd } = axis;

  if (isMinForced && isMaxForced) {
    // No padding when both min and max are forced.
    return { min: 0, max: 0 };
  } else if (isMaxForced) {
    // Only handle min.
    const newPadding = convertAxisPadding(paddingStart, 0, diff, size);
    return { min: newPadding.start, max: 0 };
  } else if (isMinForced) {
    // Only handle max.
    const newPadding = convertAxisPadding(0, paddingEnd, diff, size);
    return { min: 0, max: newPadding.end };
  } else {
    // Handle both.
    const newPadding = convertAxisPadding(paddingStart, paddingEnd, diff, size);
    return { min: newPadding.start, max: newPadding.end };
  }
}

function convertAxisPadding(
  paddingStart: string | number,
  paddingEnd: string | number,
  diff: number,
  size: number,
) {
  let finalPaddingStart = 0;
  let finalPaddingEnd = 0;

  // Padding as a number is an absolute value added to the current range.
  let totalKnown = diff;
  if (typeof paddingStart === 'number') {
    totalKnown += paddingStart;
    finalPaddingStart = paddingStart;
  }
  if (typeof paddingEnd === 'number') {
    totalKnown += paddingEnd;
    finalPaddingEnd = paddingEnd;
  }

  // Padding as a string is converted to a percentage of the total size.
  let percentStart = 0;
  let percentEnd = 0;
  if (typeof paddingStart === 'string') {
    const paddingStartPx = toPx(paddingStart, size);
    percentStart = paddingStartPx / size;
  }
  if (typeof paddingEnd === 'string') {
    const paddingEndPx = toPx(paddingEnd, size);
    percentEnd = paddingEndPx / size;
  }

  const totalPercent = percentStart + percentEnd;
  if (totalPercent !== 0) {
    const totalPadding = (totalPercent * totalKnown) / (1 - totalPercent);
    finalPaddingStart = (percentStart / totalPercent) * totalPadding;
    finalPaddingEnd = (percentEnd / totalPercent) * totalPadding;
  }

  return {
    start: finalPaddingStart,
    end: finalPaddingEnd,
  };
}

function toPx(padding: string, size: number): number {
  if (padding.endsWith('%')) {
    return (Number(padding.slice(0, -1)) / 100) * size;
  } else {
    return Number(padding);
  }
}

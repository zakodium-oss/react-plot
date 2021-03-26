import { max, min } from 'd3-array';
import { ScaleLinear, scaleLinear, scaleLog } from 'd3-scale';
import { createContext, useContext, useMemo } from 'react';

import type {
  AxisContextType,
  PlotContextType,
  ReducerActions,
  State,
} from './types';
import { validateAxis } from './utils';

interface DispatchContextType {
  dispatch: ((action: ReducerActions) => void) | null;
}

export const PlotContext = createContext<PlotContextType>({
  axisContext: {},
});
export const DispatchContext = createContext<DispatchContextType>({
  dispatch: null,
});

export function usePlotContext() {
  const context = useContext(PlotContext);
  if (!context) {
    throw new Error('Plot compound component outside Plot context');
  }
  return context;
}

export function useDispatchContext() {
  const context = useContext(DispatchContext);
  if (!context) {
    throw new Error('Plot compound component outside Dispatch context');
  }
  return context;
}

interface SizeProps {
  plotWidth: number;
  plotHeight: number;
}

export function useAxisContext(
  state: State,
  { plotWidth, plotHeight }: SizeProps,
) {
  const context = useMemo(() => {
    let axisContext: Record<string, AxisContextType> = {};

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
      if ([axisMin, axisMax].includes(undefined)) return {};
      if (axisMin > axisMax) {
        throw new Error(
          `${id}: min (${axisMin}) is bigger than max (${axisMax})`,
        );
      }

      // Limits paddings
      const diff = axisMax - axisMin;
      const minPad = diff * axis.paddingStart;
      const maxPad = diff * axis.paddingEnd;

      const range: number[] = isHorizontal ? [0, plotWidth] : [plotHeight, 0];
      if (axis.logScale) {
        axisContext[id] = {
          type: 'log' as const,
          position: axis.position,
          scientific: true,
          scale: scaleLog()
            .domain([axisMin - minPad, axisMax + maxPad])
            .range(axis.flip ? range.reverse() : range),
        };
      } else {
        axisContext[id] = {
          type: 'linear' as const,
          position: axis.position,
          scientific: diff <= 0.01 || diff >= 1000,
          scale: scaleLinear()
            .domain([axisMin - minPad, axisMax + maxPad])
            .range(axis.flip ? range.reverse() : range),
        };
      }
    }
    return axisContext;
  }, [state, plotWidth, plotHeight]);

  return context;
}

type NumberString = number | string;

interface usePositionProps {
  x: NumberString;
  y: NumberString;

  width: NumberString;
  height: NumberString;
}

interface useEllipsePositionProps {
  cx: NumberString;
  cy: NumberString;
  rx: NumberString;
  ry: NumberString;
}

export function usePosition(config: usePositionProps) {
  const { axisContext } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, 'x', 'y');
  const { x, y, width, height } = config;

  return {
    x: convertValue(x, xScale),
    y: convertValue(y, yScale),
    width: convertValueAbs(width, xScale),
    height: convertValueAbs(height, yScale),
  };
}

export function useEllipsePosition(props: useEllipsePositionProps) {
  const { axisContext } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, 'x', 'y');
  const { cx, cy, rx, ry } = props;

  return {
    cx: convertValue(cx, xScale),
    cy: convertValue(cy, yScale),
    rx: convertValueAbs(rx, xScale),
    ry: convertValueAbs(ry, yScale),
  };
}

function convertValue(
  value: string | number,
  scale?: ScaleLinear<number, number>,
) {
  if (scale === undefined) return 0;
  return typeof value === 'number' ? scale(value) : value;
}

function convertValueAbs(
  value: string | number,
  scale?: ScaleLinear<number, number>,
) {
  if (scale === undefined) return 0;
  return typeof value === 'number' ? Math.abs(scale(0) - scale(value)) : value;
}

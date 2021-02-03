import { max, min } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { createContext, useContext, useMemo } from 'react';

import type {
  AxisContextType,
  PlotContextType,
  PlotReducerActions,
  PlotState,
} from './types';

interface DispatchContextType {
  dispatch: ((action: PlotReducerActions) => void) | null;
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
  state: PlotState,
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
      axisContext[id] = {
        position: axis.position,
        scientific: diff <= 0.01 || diff >= 1000,
        scale: scaleLinear()
          .domain([axisMin - minPad, axisMax + maxPad])
          .range(axis.flip ? range.reverse() : range),
      };
    }
    return axisContext;
  }, [state, plotWidth, plotHeight]);

  return context;
}

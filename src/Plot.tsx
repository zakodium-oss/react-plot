import { max, min } from 'd3-array';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { schemeSet1 } from 'd3-scale-chromatic';
import { produce } from 'immer';
import React, { useMemo, useReducer } from 'react';

import { PlotContext, DispatchContext } from './hooks';
import type {
  PlotProps,
  State,
  ReducerActions,
  AxisContextType,
} from './types';
import { splitChildren, validatePosition } from './utils';

function reducer(state: State, action: ReducerActions) {
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

const reducerCurr = produce(reducer);
export default function Plot({
  width,
  height,
  margin = {},
  colorScheme,
  children,
  viewPortStyle = {},
}: PlotProps) {
  const initialState: State = {
    series: [],
    axis: {},
  };
  const [state, dispatch] = useReducer(reducerCurr, initialState, undefined);

  const compoundComp = splitChildren(children);
  const { invalidChild, series, axis, heading, legend } = compoundComp;
  if (invalidChild) {
    throw new Error('Only compound components of Plot are displayed');
  }

  // Distances in plot
  const { left = 0, right = 0, top = 0, bottom = 0 } = margin;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;

  // Set scales
  const axisContext = useMemo(() => {
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
      const minPad = diff * axis.padding[0];
      const maxPad = diff * axis.padding[1];

      const range = isHorizontal
        ? [left, width - right]
        : [height - bottom, top];
      axisContext[id] = {
        position: axis.position,
        scientific: diff <= 0.01 || diff >= 1000,
        scale: scaleLinear()
          .domain([axisMin - minPad, axisMax + maxPad])
          .range(axis.flip ? range.reverse() : range),
      };
    }
    return axisContext;
  }, [state, width, height, right, left, top, bottom]);

  const labels = useMemo(
    () => state.series.map(({ id, label }) => ({ id, label })),
    [state.series],
  );
  const ids = useMemo(() => state.series.map(({ id }) => id), [state.series]);
  const colorScaler = useMemo(() => {
    return scaleOrdinal<string>()
      .range(colorScheme || schemeSet1)
      .domain(ids);
  }, [colorScheme, ids]);

  return (
    <PlotContext.Provider
      value={{
        width,
        height,
        left,
        right,
        top,
        bottom,
        plotWidth,
        plotHeight,
        labels,
        colorScaler,
        axisContext,
      }}
    >
      <DispatchContext.Provider value={{ dispatch }}>
        <svg
          width={width}
          height={height}
          style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
        >
          <rect
            fillOpacity="0"
            x={left}
            y={top}
            width={plotWidth}
            height={plotHeight}
            style={viewPortStyle}
          />
          {heading}
          {legend}
          {axis}

          {/* Defines the borders of the plot space */}
          <clipPath id="squareClip">
            <rect
              fillOpacity="0"
              x={left}
              y={top}
              width={plotWidth}
              height={plotHeight}
            />
          </clipPath>
          <g style={{ clipPath: 'url(#squareClip)' }}>{series}</g>
        </svg>
      </DispatchContext.Provider>
    </PlotContext.Provider>
  );
}

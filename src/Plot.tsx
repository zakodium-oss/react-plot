import { scaleOrdinal } from 'd3-scale';
import { schemeSet1 } from 'd3-scale-chromatic';
import { produce } from 'immer';
import React, { Reducer, useMemo, useReducer } from 'react';

import { PlotContext, DispatchContext, useAxisContext } from './hooks';
import { reducer } from './plotReducer';
import type { PlotProps, ReducerActions, State } from './types';
import { splitChildren } from './utils';

const reducerCurr: Reducer<State, ReducerActions> = produce(reducer);
export default function Plot({
  width,
  height,
  margin = {},
  colorScheme,
  children,
  viewportStyle = {},
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
  const axisContext = useAxisContext(state, {
    left,
    width,
    right,
    height,
    bottom,
    top,
  });

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
            style={viewportStyle}
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

import { scaleOrdinal } from 'd3-scale';
import { schemeSet1 } from 'd3-scale-chromatic';
import { produce } from 'immer';
import React, { Reducer, useMemo, useReducer } from 'react';

import TransparentRect from './components/TransparentRect';
import { LegendProvider } from './components/legendsContext';
import { PlotContext, DispatchContext, useAxisContext } from './hooks';
import { reducer } from './plotReducer';
import type { PlotProps, ReducerActions, State } from './types';
import { splitChildren } from './utils';

const reducerCurr: Reducer<State, ReducerActions> = produce(reducer);
const initialState: State = {
  series: [],
  axis: {},
};

export default function Plot({
  width,
  height,
  margin = {},
  colorScheme,
  children,
  style = {},
  viewportStyle = {},
}: PlotProps) {
  const [state, dispatch] = useReducer(reducerCurr, initialState, undefined);

  const { hasInvalidChild, series, axes, heading, legend } = splitChildren(
    children,
  );
  if (hasInvalidChild) {
    throw new Error('Only compound components of Plot are displayed');
  }
  if ([width, height].includes(undefined)) {
    throw new Error('Width and height are mandatory');
  }

  // Distances in plot
  const { left = 0, right = 0, top = 0, bottom = 0 } = margin;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;

  // Set scales
  const axisContext = useAxisContext(state, {
    plotWidth,
    plotHeight,
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
        <LegendProvider>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
          >
            {/* Main plot area */}
            <TransparentRect width={width} height={height} style={style} />

            {/* Viewport area */}
            <g transform={`translate(${left}, ${top})`}>
              <TransparentRect
                width={plotWidth}
                height={plotHeight}
                style={viewportStyle}
              />

              {/* Prevents the chart from being drawn outside of the viewport */}
              <clipPath id="viewportClip">
                <rect width={plotWidth} height={plotHeight} />
              </clipPath>

              <g style={{ clipPath: 'url(#viewportClip)' }}>{series}</g>

              {axes}
            </g>

            {heading}
            {legend}
          </svg>
        </LegendProvider>
      </DispatchContext.Provider>
    </PlotContext.Provider>
  );
}

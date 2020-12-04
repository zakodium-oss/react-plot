import { max, min } from 'd3-array';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { schemeSet1 } from 'd3-scale-chromatic';
import React, { useReducer } from 'react';

import { PlotContext, DispatchContext } from './hooks';
import type { PlotProps, PlotState, ReducerActions } from './types';
import { splitChildren } from './utils';

interface State {
  series: PlotState[];
}

function reducer(state: State, action: ReducerActions): State {
  switch (action.type) {
    case 'newData': {
      const { series } = state;
      const serieItem = action.value;
      return { series: [...series, serieItem] };
    }
    case 'removeData': {
      const { id } = action.value;
      const seriesFiltered = state.series.filter((series) => series.id !== id);
      return { series: seriesFiltered };
    }
    default: {
      throw new Error();
    }
  }
}

export default function Plot({
  width,
  height,
  margin,
  colorScheme,
  children,
}: PlotProps) {
  const [state, dispatch] = useReducer(reducer, { series: [] }, undefined);

  const compoundComp = splitChildren(children);
  const { invalidChild, lineSeries, axis, heading, legend } = compoundComp;
  if (invalidChild) {
    throw new Error('Only compound components of Plot are displayed');
  }

  // Distances in plot
  const { left = 0, right = 0, top = 0, bottom = 0 } = margin;
  const plotWidth = width - left - right;
  const plotHeight = height - left - right;

  // Set scales
  const xMin = min(state.series, (d) => d.xMin);
  const xMax = max(state.series, (d) => d.xMax);
  const yMin = min(state.series, (d) => d.yMin);
  const yMax = max(state.series, (d) => d.yMax);

  const xScale = ![xMin, xMax].includes(undefined)
    ? scaleLinear()
        .domain([xMin, xMax])
        .range([left, width - right])
    : null;
  const yScale = ![yMin, yMax].includes(undefined)
    ? scaleLinear()
        .domain([yMin, yMax])
        .range([height - bottom, top])
    : null;

  const labels = state.series.map(({ label }) => label);
  const colorScaler = scaleOrdinal<string>()
    .range(colorScheme || schemeSet1)
    .domain(labels);

  return (
    <PlotContext.Provider
      value={{
        xScale,
        yScale,
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
      }}
    >
      <DispatchContext.Provider value={{ dispatch }}>
        <svg
          width={width}
          height={height}
          style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
        >
          {heading}
          {legend}
          {lineSeries}
          {axis.x}
          {axis.y}
        </svg>
      </DispatchContext.Provider>
    </PlotContext.Provider>
  );
}

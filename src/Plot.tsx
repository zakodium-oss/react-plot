import { scaleLinear } from 'd3-scale';
import React, { useReducer } from 'react';

import { PlotContext, DispatchContext } from './hooks';
import type { PlotProps, PlotState, ReducerActions } from './types';
import { getMax, getMin, splitChildren } from './utils';

function reducer(state: PlotState, action: ReducerActions): PlotState {
  switch (action.type) {
    case 'newData': {
      return {
        ...state,
        xMin: getMin(action.value.xMin, state.xMin),
        xMax: getMax(action.value.xMax, state.xMax),
        yMin: getMin(action.value.yMin, state.yMin),
        yMax: getMax(action.value.yMax, state.yMax),
        labels: [...state.labels, action.value.label],
      };
    }
    default: {
      throw new Error();
    }
  }
}

export default function Plot({ width, height, children }: PlotProps) {
  const [state, dispatch] = useReducer(reducer, { labels: [] }, undefined);
  const { xMin, xMax, yMin, yMax } = state;

  // Set scales
  const xScale = ![xMin, xMax].includes(undefined)
    ? scaleLinear().range([0, width]).domain([xMin, xMax])
    : null;
  const yScale = ![yMin, yMax].includes(undefined)
    ? scaleLinear().range([height, 0]).domain([yMin, yMax])
    : null;

  const { invalidChild, lineSeries } = splitChildren(children);
  if (invalidChild) {
    throw new Error('Only compound components of Plot are displayed');
  }

  return (
    <PlotContext.Provider value={{ ...state, xScale, yScale }}>
      <DispatchContext.Provider value={{ dispatch }}>
        <svg width={width} height={height}>
          {lineSeries}
        </svg>
      </DispatchContext.Provider>
    </PlotContext.Provider>
  );
}

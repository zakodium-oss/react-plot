import { scaleLinear } from 'd3-scale';
import React, { useReducer } from 'react';

import { PlotContext, DispatchContext } from './hooks';
import type { PlotProps, PlotState, ReducerActions } from './types';
import { getMax, getMin } from './utils';

function reducer(state: PlotState, action: ReducerActions): PlotState {
  switch (action.type) {
    case 'newData': {
      const xMin = getMin(action.value.xMin, state.xMin);
      const xMax = getMax(action.value.xMax, state.xMax);
      const yMin = getMin(action.value.yMin, state.yMin);
      const yMax = getMax(action.value.yMax, state.yMax);

      const xScale = scaleLinear().domain([0, state.width]).range([xMin, xMax]);
      const yScale = scaleLinear()
        .domain([state.height, 0])
        .range([yMin, yMax]);

      return {
        ...state,
        xMin,
        xMax,
        yMin,
        yMax,
        xScale,
        yScale,
        labels: [...state.labels, action.value.label],
      };
    }
    default: {
      throw new Error();
    }
  }
}

export default function Plot({ width, height, children }: PlotProps) {
  const [state, dispatch] = useReducer(
    reducer,
    { width, height, labels: [] },
    null,
  );
  return (
    <PlotContext.Provider value={state}>
      <DispatchContext.Provider value={{ dispatch }}>
        <svg width={width} height={height}>
          {children}
        </svg>
      </DispatchContext.Provider>
    </PlotContext.Provider>
  );
}

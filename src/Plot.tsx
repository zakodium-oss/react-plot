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

  const { invalidChild, lineSeries } = splitChildren(children);
  if (invalidChild) {
    // eslint-disable-next-line no-console
    console.error('Only compound components of Plot are displayed');
  }

  // Propagate props to children
  const lineSeriesInjected = lineSeries.map((series) =>
    React.cloneElement(series, { width, height }),
  );
  return (
    <PlotContext.Provider value={state}>
      <DispatchContext.Provider value={{ dispatch }}>
        <svg width={width} height={height}>
          {lineSeriesInjected}
        </svg>
      </DispatchContext.Provider>
    </PlotContext.Provider>
  );
}

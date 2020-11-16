import { max, min } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import React, { useReducer } from 'react';

import { PlotContext, DispatchContext } from './hooks';
import type { PlotProps, PlotState, ReducerActions } from './types';
import { splitChildren } from './utils';

interface State {
  series: PlotState[];
  currentIndex: number;
}

function reducer(state: State, action: ReducerActions): State {
  switch (action.type) {
    case 'newData': {
      const { series, currentIndex } = state;
      const serieItem = { ...action.value, id: currentIndex };
      return { series: [...series, serieItem], currentIndex: currentIndex + 1 };
    }
    default: {
      throw new Error();
    }
  }
}

export default function Plot({ width, height, children }: PlotProps) {
  const [state, dispatch] = useReducer(
    reducer,
    { series: [], currentIndex: 0 },
    undefined,
  );

  const xMin = min(state.series, (d) => d.xMin);
  const xMax = max(state.series, (d) => d.xMax);
  const yMin = min(state.series, (d) => d.yMin);
  const yMax = max(state.series, (d) => d.yMax);

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
    <PlotContext.Provider value={{ xScale, yScale }}>
      <DispatchContext.Provider value={{ dispatch }}>
        <svg width={width} height={height}>
          {lineSeries}
        </svg>
      </DispatchContext.Provider>
    </PlotContext.Provider>
  );
}

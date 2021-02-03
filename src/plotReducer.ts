import type { PlotReducerActions, PlotState } from './types';
import { validatePosition } from './utils';

export function plotReducer(state: PlotState, action: PlotReducerActions) {
  switch (action.type) {
    case 'newData': {
      state.series.push(action.payload);
      break;
    }
    case 'removeData': {
      const { id } = action.payload;
      const seriesFiltered = state.series.filter((series) => series.id !== id);
      state.series = seriesFiltered;
      break;
    }
    case 'newAxis': {
      const { id, position, ...values } = action.payload;
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
      const { id } = action.payload;
      delete state.axis[id];
      break;
    }
    case 'setHeadingPosition': {
      state.headingPosition = action.payload;
      break;
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new Error(`Unknown reducer type ${(action as any).type}`);
    }
  }
}

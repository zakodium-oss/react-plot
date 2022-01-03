import { validatePosition } from './utils';

import type { ReducerActions, State } from './types';

export function reducer(state: State, action: ReducerActions) {
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

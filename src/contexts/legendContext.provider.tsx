import { produce } from 'immer';
import type { ReactNode, Reducer } from 'react';
import { useMemo, useReducer } from 'react';

import type { LegendActions, LegendState } from './legendContext.js';
import { legendContext } from './legendContext.js';

const legendReducer: Reducer<LegendState, LegendActions> = produce(
  (draft: LegendState, action: LegendActions) => {
    switch (action.type) {
      case 'ADD_LEGEND_LABEL': {
        const { shape, ...newLegend } = action.payload;

        const index = draft.labels.findIndex(({ id }) => newLegend.id === id);
        if (index === -1) {
          draft.labels.push({ ...newLegend, shape, isVisible: true });
        } else {
          //isVisible should only updated in TOGGLE_VISIBILITY
          const isVisible = draft.labels[index].isVisible;
          draft.labels[index] = { ...newLegend, isVisible, shape };
        }
        return;
      }
      case 'REMOVE_LEGEND_LABEL': {
        const { id } = action.payload;
        const index = draft.labels.findIndex((val) => val.id === id);
        if (index !== -1) {
          draft.labels.splice(index, 1);
        }
        return;
      }
      case 'TOGGLE_VISIBILITY': {
        const { id } = action.payload;
        const index = draft.labels.findIndex((val) => val.id === id);
        if (index !== -1) {
          draft.labels[index].isVisible = !draft.labels[index].isVisible;
        }
        return;
      }
      default:
        throw new Error('unreachable');
    }
  },
);

const initialLegendState: LegendState = {
  labels: [],
};

export const LegendProvider = (props: { children: ReactNode }) => {
  const [legendState, legendDispatch] = useReducer(
    legendReducer,
    initialLegendState,
  );
  const ctx = useMemo(
    () => [legendState, legendDispatch] as const,
    [legendState, legendDispatch],
  );
  return (
    <legendContext.Provider value={ctx}>
      {props.children}
    </legendContext.Provider>
  );
};

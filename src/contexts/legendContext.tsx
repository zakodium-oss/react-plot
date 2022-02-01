import { produce } from 'immer';
import {
  createContext,
  Dispatch,
  ReactNode,
  Reducer,
  useContext,
  useReducer,
} from 'react';

import type { ActionType, Shape } from '../types';

interface LegendLabelState {
  id: string;
  label?: string;
  visibility?: boolean;
  shape?: {
    figure: Shape;
    color: string;
    hidden: boolean;
  };

  range?: {
    rangeColor: string;
  };

  colorLine: string | null;
}

interface LegendState {
  labels: Array<LegendLabelState>;
}

type LegendActions =
  | ActionType<'ADD_LEGEND_LABEL', LegendLabelState>
  | ActionType<'REMOVE_LEGEND_LABEL', { id: string }>;

type LegendDispatch = Dispatch<LegendActions>;
type LegendContext = [LegendState, LegendDispatch];

const context = createContext<LegendContext | null>(null);

export function useLegend(): LegendContext {
  const ctx = useContext(context);
  if (!ctx) {
    throw new Error('context was not initialized');
  }

  return ctx;
}

const legendReducer: Reducer<LegendState, LegendActions> = produce(
  (draft: LegendState, action: LegendActions) => {
    switch (action.type) {
      case 'ADD_LEGEND_LABEL': {
        const { shape, ...newLegend } = action.payload;

        const index = draft.labels.findIndex(({ id }) => newLegend.id === id);
        if (index < 0) {
          draft.labels.push({ ...newLegend, shape });
        } else {
          draft.labels[index] = { ...newLegend, shape };
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
      default:
        throw new Error('unreachable');
    }
  },
);

const initialLegendState: LegendState = {
  labels: [],
};

export const LegendProvider = (props: { children: ReactNode }) => {
  const ctx = useReducer(legendReducer, initialLegendState);
  return <context.Provider value={ctx}>{props.children}</context.Provider>;
};

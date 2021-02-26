import { produce } from 'immer';
import {
  createContext,
  Dispatch,
  ReactNode,
  Reducer,
  useContext,
  useReducer,
} from 'react';

import { Shape } from '../types';

interface LabelState {
  id: string;
  label: string;

  shape?: {
    figure: Shape;
    color: string;
    hidden: boolean;
  };

  colorLine: string | null;
}

interface LegendState {
  labels: Array<LabelState>;
}

export type ActionType<Action, Payload = void> = Payload extends void
  ? { type: Action }
  : { type: Action; payload: Payload };

type LegendAction =
  | ActionType<'ADD_LEGEND_LABEL', LabelState>
  | ActionType<'REMOVE_LEGEND_LABEL', { id: string }>;

type LegendDispatch = Dispatch<LegendAction>;
type LegendContext = [LegendState, LegendDispatch];

const context = createContext<LegendContext | null>(null);

export function useLegend(): LegendContext {
  const ctx = useContext(context);
  if (!ctx) {
    throw new Error('context was not initialized');
  }

  return ctx;
}

const legendReducer: Reducer<LegendState, LegendAction> = produce(
  (draft: LegendState, action: LegendAction) => {
    switch (action.type) {
      case 'ADD_LEGEND_LABEL': {
        const { shape, ...other } = action.payload;

        if (draft.labels.some((element) => element.label === other.label)) {
          return;
        }

        draft.labels.push({ ...other, shape });
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

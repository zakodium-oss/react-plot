import { produce } from 'immer';
import {
  createContext,
  Dispatch,
  ReactNode,
  Reducer,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import type { ActionType, Shape } from '../types';

interface LegendLabelState {
  id: string;
  isVisible: boolean;
  label?: string;
  shape?: {
    figure: Shape;
    color: string;
    hidden: boolean;
  };

  range?: {
    rangeColor?: string;
  };

  colorLine?: string;
}

interface LegendState {
  labels: LegendLabelState[];
}

type LegendActions =
  | ActionType<'ADD_LEGEND_LABEL', Omit<LegendLabelState, 'isVisible'>>
  | ActionType<'REMOVE_LEGEND_LABEL', { id: string }>
  | ActionType<'TOGGLE_VISIBILITY', { id: string }>;

type LegendDispatch = Dispatch<LegendActions>;
type LegendContext = readonly [LegendState, LegendDispatch];

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
  return <context.Provider value={ctx}>{props.children}</context.Provider>;
};

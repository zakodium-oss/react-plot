import { createContext, type Dispatch, useContext } from 'react';

import type { ActionType, Shape } from '../types.js';

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

export interface LegendState {
  labels: LegendLabelState[];
}

export type LegendActions =
  | ActionType<'ADD_LEGEND_LABEL', Omit<LegendLabelState, 'isVisible'>>
  | ActionType<'REMOVE_LEGEND_LABEL', { id: string }>
  | ActionType<'TOGGLE_VISIBILITY', { id: string }>;

export type LegendDispatch = Dispatch<LegendActions>;
export type LegendContext = readonly [LegendState, LegendDispatch];

export const legendContext = createContext<LegendContext | null>(null);

export function useLegend(): LegendContext {
  const ctx = useContext(legendContext);
  if (!ctx) {
    throw new Error('context was not initialized');
  }

  return ctx;
}

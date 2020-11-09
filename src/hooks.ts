import { createContext, useContext } from 'react';

import { PlotState, ReducerActions } from './types';

interface DispatchContextType {
  dispatch: ((action: ReducerActions) => void) | null;
}

export const PlotContext = createContext<PlotState>({
  xScale: null,
  yScale: null,
  labels: [],
});
export const DispatchContext = createContext<DispatchContextType>({
  dispatch: null,
});

export function usePlotContext() {
  const context = useContext(PlotContext);
  if (!context) {
    throw new Error('Plot compound component outside Plot context');
  }
  return context;
}

export function useDispatchContext() {
  const context = useContext(DispatchContext);
  if (!context) {
    throw new Error('Plot compound component outside Dispatch context');
  }
  return context;
}

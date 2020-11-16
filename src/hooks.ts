import { createContext, useContext } from 'react';

import { ReducerActions } from './types';

interface DispatchContextType {
  dispatch: ((action: ReducerActions) => void) | null;
}

interface PlotContextType {
  xScale?: (x: number) => number;
  yScale?: (y: number) => number;
}

export const PlotContext = createContext<PlotContextType>({});
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

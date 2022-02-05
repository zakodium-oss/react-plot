import { createContext, ReactNode, useContext, useEffect, useRef } from 'react';

import {
  EventsHandlers,
  PlotEventsPlotActions,
  PlotEventsUserActions,
  usePlotEventsState,
} from './usePlotEvents';
import {
  initialPlotOverridesState,
  PlotControls,
  PlotOverridesState,
  usePlotOverridesState,
} from './usePlotOverrides';

const plotOverridesContext = createContext<PlotOverridesState>(
  initialPlotOverridesState,
);

export function usePlotOverrides(): PlotOverridesState {
  return useContext(plotOverridesContext);
}

const plotControlsContext = createContext<PlotControls | null>(null);

export function usePlotControls(): PlotControls {
  const plotControls = useContext(plotControlsContext);
  if (!plotControls) {
    throw new Error(
      'usePlotControls must be called in a child of PlotController',
    );
  }
  return plotControls;
}

const plotEventsUserContext = createContext<PlotEventsUserActions | null>(null);

export function usePlotEvents(handlers: EventsHandlers) {
  const userContext = useContext(plotEventsUserContext);
  if (!userContext) {
    throw new Error(
      'usePlotEvents must be called in a child of PlotController',
    );
  }

  const ref = useRef(handlers);
  useEffect(() => {
    ref.current = handlers;
  }, [handlers]);
  useEffect(() => {
    userContext.registerHandlers(ref);
    return () => userContext.unregisterHandlers(ref);
  }, [userContext]);
}

const plotEventsPlotContext = createContext<PlotEventsPlotActions | null>(null);

export function usePlotEventsPlotContext() {
  return useContext(plotEventsPlotContext);
}

interface PlotControllerProps {
  children: ReactNode;
}

export function PlotController(props: PlotControllerProps) {
  const { userActions, plotActions } = usePlotEventsState();
  const { overrides, controls } = usePlotOverridesState();
  return (
    <plotOverridesContext.Provider value={overrides}>
      <plotControlsContext.Provider value={controls}>
        <plotEventsUserContext.Provider value={userActions}>
          <plotEventsPlotContext.Provider value={plotActions}>
            {props.children}
          </plotEventsPlotContext.Provider>
        </plotEventsUserContext.Provider>
      </plotControlsContext.Provider>
    </plotOverridesContext.Provider>
  );
}

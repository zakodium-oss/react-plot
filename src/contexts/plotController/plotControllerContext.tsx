import { ReactNode, useEffect, useRef } from 'react';

import { ControllerHookOptions } from '../../hooks/types';

import { createNestableContext } from './nestableContext';
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

const plotOverridesContext = createNestableContext<PlotOverridesState>(
  initialPlotOverridesState,
);

export function usePlotOverrides(
  options?: ControllerHookOptions,
): PlotOverridesState {
  return plotOverridesContext.useNestedContext(options?.controllerId);
}

const plotControlsContext = createNestableContext<PlotControls | null>(null);

export function usePlotControls(options?: ControllerHookOptions): PlotControls {
  const id = options?.controllerId;
  const plotControls = plotControlsContext.useNestedContext(id);
  if (!plotControls) {
    throw new Error(
      `usePlotControls must be called in a child of PlotController (id=${id})`,
    );
  }
  return plotControls;
}

const plotEventsUserContext =
  createNestableContext<PlotEventsUserActions | null>(null);

export function usePlotEvents(
  handlers: EventsHandlers,
  options?: ControllerHookOptions,
) {
  const id = options?.controllerId;
  const userContext = plotEventsUserContext.useNestedContext(id);
  if (!userContext) {
    throw new Error(
      `usePlotEvents must be called in a child of PlotController (id=${id})`,
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

const plotEventsPlotContext =
  createNestableContext<PlotEventsPlotActions | null>(null);

export function usePlotEventsPlotContext(options?: ControllerHookOptions) {
  return plotEventsPlotContext.useNestedContext(options?.controllerId);
}

interface PlotControllerProps {
  id?: string;
  children: ReactNode;
}

export function PlotController(props: PlotControllerProps) {
  const { id, children } = props;
  const { userActions, plotActions } = usePlotEventsState();
  const { overrides, controls } = usePlotOverridesState();
  return (
    <plotOverridesContext.NestedContextProvider id={id} value={overrides}>
      <plotControlsContext.NestedContextProvider id={id} value={controls}>
        <plotEventsUserContext.NestedContextProvider
          id={id}
          value={userActions}
        >
          <plotEventsPlotContext.NestedContextProvider
            id={id}
            value={plotActions}
          >
            {children}
          </plotEventsPlotContext.NestedContextProvider>
        </plotEventsUserContext.NestedContextProvider>
      </plotControlsContext.NestedContextProvider>
    </plotOverridesContext.NestedContextProvider>
  );
}

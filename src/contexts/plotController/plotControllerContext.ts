import { useEffect, useRef } from 'react';

import type { ControllerHookOptions } from '../../hooks/types.js';

import { createNestableContext } from './nestableContext.js';
import type {
  EventsHandlers,
  PlotEventsPlotActions,
  PlotEventsUserActions,
} from './usePlotEvents.js';
import {
  initialPlotOverridesState,
  type PlotControls,
  type PlotOverridesState,
} from './usePlotOverrides.js';

export const plotOverridesContext = createNestableContext<PlotOverridesState>(
  initialPlotOverridesState,
);

export function usePlotOverrides(
  options?: ControllerHookOptions,
): PlotOverridesState {
  return plotOverridesContext.useNestedContext(options?.controllerId);
}

export const plotControlsContext = createNestableContext<PlotControls | null>(
  null,
);

export function usePlotControls(options?: ControllerHookOptions): PlotControls {
  const id = options?.controllerId;
  const plotControls = plotControlsContext.useNestedContext(id);
  if (!plotControls) {
    throw new Error(
      `usePlotControls must be called in a child of PlotController (id=${String(
        id,
      )})`,
    );
  }
  return plotControls;
}

export const plotEventsUserContext =
  createNestableContext<PlotEventsUserActions | null>(null);

export function usePlotEvents(
  handlers: EventsHandlers,
  options: ControllerHookOptions = {},
) {
  const { controllerId: id, disabled = false } = options;

  const userContext = plotEventsUserContext.useNestedContext(id);
  if (!disabled && !userContext) {
    throw new Error(
      `usePlotEvents must be called in a child of PlotController (id=${String(
        id,
      )})`,
    );
  }

  const ref = useRef(handlers);
  useEffect(() => {
    if (!disabled) {
      ref.current = handlers;
    }
  }, [disabled, handlers]);
  useEffect(() => {
    if (!disabled && userContext) {
      userContext.registerHandlers(ref);
      return () => userContext.unregisterHandlers(ref);
    }
  }, [disabled, userContext]);
}

export const plotEventsPlotContext =
  createNestableContext<PlotEventsPlotActions | null>(null);

export function usePlotEventsPlotContext(options?: ControllerHookOptions) {
  return plotEventsPlotContext.useNestedContext(options?.controllerId);
}

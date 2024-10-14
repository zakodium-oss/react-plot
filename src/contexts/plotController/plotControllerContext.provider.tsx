import type { ReactNode } from 'react';

import {
  plotControlsContext,
  plotEventsPlotContext,
  plotEventsUserContext,
  plotOverridesContext,
} from './plotControllerContext.js';
import { usePlotEventsState } from './usePlotEvents.js';
import { usePlotOverridesState } from './usePlotOverrides.js';

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

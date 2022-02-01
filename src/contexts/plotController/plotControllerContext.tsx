// import { usePlotEventsState } from './usePlotEvents';
import { createContext, ReactNode, useContext } from 'react';

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

interface PlotControllerProps {
  children: ReactNode;
}

export function PlotController(props: PlotControllerProps) {
  // const plotEvents = usePlotEventsState();
  const { overrides, controls } = usePlotOverridesState();
  return (
    <plotOverridesContext.Provider value={overrides}>
      <plotControlsContext.Provider value={controls}>
        {props.children}
      </plotControlsContext.Provider>
    </plotOverridesContext.Provider>
  );
}

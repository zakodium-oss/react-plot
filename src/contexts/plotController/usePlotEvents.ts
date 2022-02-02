import { RefObject, useMemo, useRef } from 'react';

import { TrackingResult } from '../../components/Tracking';

type MouseEventHandler = (result: TrackingResult) => void;

export type MouseEventType =
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'onMouseDown'
  | 'onMouseUp'
  | 'onMouseMove'
  | 'onClick'
  | 'onDoubleClick'
  | 'onWheel';

export type EventsHandlers = {
  [key in MouseEventType]?: MouseEventHandler;
};

export interface PlotEventsUserActions {
  registerHandlers: (handlersRef: RefObject<EventsHandlers>) => void;
  unregisterHandlers: (handlersRef: RefObject<EventsHandlers>) => void;
}

export interface PlotEventsPlotActions {
  registerPlot: (plotId: string) => void;
  unregisterPlot: (plotId: string) => void;
  handleEvent: (plotId: string, eventType: string, eventData: unknown) => void;
}

interface PlotEventsState {
  currentPlot: string | null;
  plots: Set<string>;
  handlers: Set<RefObject<EventsHandlers>>;
}

const initialState: PlotEventsState = {
  currentPlot: null,
  plots: new Set(),
  handlers: new Set(),
};

export function usePlotEventsState() {
  const plotEvents = useRef<PlotEventsState>(initialState);

  const userActions = useMemo<PlotEventsUserActions>(
    () => ({
      registerHandlers(handlersRef: RefObject<EventsHandlers>) {
        plotEvents.current.handlers.add(handlersRef);
      },
      unregisterHandlers(handlersRef: RefObject<EventsHandlers>) {
        plotEvents.current.handlers.delete(handlersRef);
      },
    }),
    [],
  );

  const plotActions = useMemo<PlotEventsPlotActions>(() => {
    return {
      registerPlot(plotId: string) {
        plotEvents.current.plots.add(plotId);
      },
      unregisterPlot(plotId: string) {
        plotEvents.current.plots.delete(plotId);
      },
      handleEvent(
        plotId: string,
        eventType: MouseEventType,
        eventData: TrackingResult,
      ) {
        if (eventType === 'onMouseDown') {
          plotEvents.current.currentPlot = plotId;
        }
        if (eventType === 'onMouseUp') {
          plotEvents.current.currentPlot = null;
        }
        if (
          plotEvents.current.currentPlot !== null &&
          plotEvents.current.currentPlot !== plotId
        ) {
          // Ignore events on other plots.
          return;
        }

        for (const handler of plotEvents.current.handlers) {
          if (handler.current[eventType]) {
            handler.current[eventType](eventData);
          }
        }
      },
    };
  }, []);

  return { userActions, plotActions };
}

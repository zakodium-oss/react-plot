import type { RefObject } from 'react';
import { useMemo, useRef } from 'react';

import type { TrackingResult } from '../../components/Tracking.js';

type EventHandler<NativeEventType extends MouseEvent> = (
  result: TrackingResult<NativeEventType>,
) => void;

type PointerEventName =
  | 'onPointerEnter'
  | 'onPointerDown'
  | 'onPointerMove'
  | 'onPointerUp'
  | 'onPointerLeave';
type ClickEventName = 'onClick' | 'onDoubleClick';
type WheelEventName = 'onWheel';
export type EventName = PointerEventName | ClickEventName | WheelEventName;

type PointerEventHandlers = Partial<
  Record<PointerEventName, EventHandler<PointerEvent>>
>;
type ClickEventHandlers = Partial<
  Record<ClickEventName, EventHandler<MouseEvent>>
>;
type WheelEventHandlers = Partial<
  Record<WheelEventName, EventHandler<WheelEvent>>
>;
export type EventsHandlers = PointerEventHandlers &
  ClickEventHandlers &
  WheelEventHandlers;

type EventMap = Record<PointerEventName, PointerEvent> &
  Record<ClickEventName, MouseEvent> &
  Record<WheelEventName, WheelEvent>;

export interface PlotEventsUserActions {
  registerHandlers: (handlersRef: RefObject<EventsHandlers>) => void;
  unregisterHandlers: (handlersRef: RefObject<EventsHandlers>) => void;
}

export interface PlotEventsPlotActions {
  registerPlot: (plotId: string) => void;
  unregisterPlot: (plotId: string) => void;
  handleEvent: <T extends EventName>(
    plotId: string,
    eventName: T,
    eventData: TrackingResult<EventMap[T]>,
  ) => void;
}

interface PlotEventsState {
  currentPlot: string | null;
  plots: Set<string>;
  handlers: Set<RefObject<EventsHandlers>>;
}

export function usePlotEventsState() {
  const plotEvents = useRef<PlotEventsState>({
    currentPlot: null,
    plots: new Set(),
    handlers: new Set(),
  });

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
      handleEvent<T extends EventName>(
        plotId: string,
        eventName: T,
        eventData: TrackingResult<EventMap[T]>,
      ) {
        if (!plotEvents.current.plots.has(plotId)) {
          return;
        }
        if (eventName === 'onPointerDown') {
          plotEvents.current.currentPlot = plotId;
        }
        if (eventName === 'onPointerUp') {
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
          if (handler.current?.[eventName]) {
            // @ts-expect-error eventData is guaranteed to be compatible with eventName.
            handler.current[eventName](eventData);
          }
        }
      },
    };
  }, []);

  return { userActions, plotActions };
}

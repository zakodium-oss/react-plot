import { useState } from 'react';

type EventHandler = (event: MouseEvent) => void;

interface EventsHandlers {
  onMouseDown?: EventHandler;
  onMouseMove?: EventHandler;
  onMouseUp?: EventHandler;
  onClick?: EventHandler;
  onDoubleClick?: EventHandler;
}

type PlotEventsHandlers = Record<string, EventsHandlers>;

interface PlotEventsState {
  currentPlot: string | null;
  handlers: PlotEventsHandlers;
}

const initialState: PlotEventsState = {
  currentPlot: null,
  handlers: {},
};

export function usePlotEventsState() {
  const [plotEvents, setPlotEvents] = useState<PlotEventsState>(initialState);
  return [plotEvents, setPlotEvents];
}

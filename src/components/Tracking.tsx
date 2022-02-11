import { euclidean } from 'ml-distance-euclidean';
import { useEffect, useRef } from 'react';

import { PlotAxisContext, PlotSeriesState } from '../contexts/plotContext';
import {
  KeyboardEventType,
  MouseEventType,
  PlotEventsPlotActions,
} from '../contexts/plotController/usePlotEvents';
import { SeriesPoint } from '../types';
import { closestPoint, toNumber } from '../utils';

export interface ClosestInfo<T extends ClosestMethods> {
  point: SeriesPoint;
  label: string;
  axis: T extends 'euclidean'
    ? Record<'x' | 'y', PlotAxisContext>
    : PlotAxisContext;
}
export type ClosestMethods = 'x' | 'y' | 'euclidean';
export type ClosestInfoResult = Record<string, ClosestInfo<ClosestMethods>>;
export interface TrackingResult {
  event: MouseEvent | KeyboardEvent;
  coordinates: Record<string, number>;
  clampedCoordinates: Record<string, number>;
  movement?: Record<string, number>;
  getClosest?: (method: ClosestMethods) => ClosestInfoResult;
  axisDomains?: Record<string, [number, number]>;
}

export interface TrackingProps {
  plotId: string;
  plotEvents: PlotEventsPlotActions;
  stateSeries: PlotSeriesState[];
  axisContext: Record<string, PlotAxisContext>;
  plotWidth: number;
  plotHeight: number;
}

const HORIZONTAL = ['bottom', 'top'];

// function infoFromWheel(
//   event: React.WheelEvent<SVGRectElement>,
//   axisContext: Record<string, PlotAxisContext>,
//   plotHeight: number,
// ) {
//   const ratio = 1 + event.deltaY * -0.001;

//   // Calculate coordinates
//   let coordinates: TrackingResult['coordinates'] = {};
//   const { scale } = axisContext.y;
//   const yPosition = scale(0);
//   const y1 =
//     ratio > 1 ? yPosition * (1 - 1 / ratio) : yPosition * (1 - 1 / ratio);

//   const y2 =
//     ratio > 1
//       ? yPosition + (plotHeight - yPosition) / ratio
//       : plotHeight + (plotHeight - yPosition) * (1 / ratio - 1);
//   coordinates.y1 = toNumber(scale.invert(y1));
//   coordinates.y2 = toNumber(scale.invert(y2));

//   return {
//     event,
//     coordinates,
//   };
// }

function infoFromMouse(
  event: MouseEvent,
  axisContext: Record<string, PlotAxisContext>,
  stateSeries: PlotSeriesState[],
  target: SVGRectElement,
): TrackingResult {
  const { clientX, clientY, movementX, movementY } = event;
  const { left, top } = target.getBoundingClientRect();

  // Calculate coordinates
  const xPosition = clientX - left;
  const yPosition = clientY - top;
  const coordinates: TrackingResult['coordinates'] = {};
  const clampedCoordinates: TrackingResult['clampedCoordinates'] = {};
  const movement: TrackingResult['movement'] = {};
  for (const key in axisContext) {
    const { scale, clampInDomain, position } = axisContext[key];
    if (HORIZONTAL.includes(position)) {
      coordinates[key] = toNumber(scale.invert(xPosition));
      movement[key] =
        toNumber(scale.invert(movementX)) - toNumber(scale.invert(0));
    } else {
      coordinates[key] = toNumber(scale.invert(yPosition));
      movement[key] =
        toNumber(scale.invert(movementY)) - toNumber(scale.invert(0));
    }
    clampedCoordinates[key] = clampInDomain(coordinates[key]);
  }

  return {
    event,
    coordinates,
    clampedCoordinates,
    movement,
    getClosest: (method) =>
      closestCalculation(
        method,
        { x: xPosition, y: yPosition },
        stateSeries,
        axisContext,
      ),
  };
}

function closestCalculation(
  method: ClosestMethods,
  coordinates: Record<'x' | 'y', number>,
  stateSeries: PlotSeriesState[],
  axisContext: Record<string, PlotAxisContext>,
): ClosestInfoResult {
  let series: ClosestInfoResult = {};

  switch (method) {
    case 'x': {
      for (const { id, x, data, label } of stateSeries) {
        if (data) {
          const point = closestPoint(data, coordinates, (point, pos) => {
            const { scale } = axisContext[x.axisId];
            const xVal = pos[x.axisId];
            return Math.abs(scale(point.x) - xVal);
          });
          series[id] = { point, label, axis: axisContext[x.axisId] };
        }
      }
      break;
    }
    case 'y': {
      for (const { id, y, data, label } of stateSeries) {
        if (data) {
          const point = closestPoint(data, coordinates, (point, pos) => {
            const { scale } = axisContext[y.axisId];
            const yVal = pos[y.axisId];
            return Math.abs(scale(point.y) - yVal);
          });
          series[id] = { point, label, axis: axisContext[y.axisId] };
        }
      }
      break;
    }
    case 'euclidean': {
      for (const { id, x, y, data, label } of stateSeries) {
        if (data) {
          const point = closestPoint(data, coordinates, (point, pos) => {
            const { scale: xScale } = axisContext[x.axisId];
            const { scale: yScale } = axisContext[y.axisId];
            const xVal = pos[x.axisId];
            const yVal = pos[y.axisId];
            return euclidean([xScale(point.x), yScale(point.y)], [xVal, yVal]);
          });
          series[id] = {
            point,
            label,
            axis: { x: axisContext[x.axisId], y: axisContext[y.axisId] },
          };
        }
      }
      break;
    }
    default: {
      throw new Error(`Unknown distance name: ${method as string}`);
    }
  }
  return series;
}

type NativeMouseEventType =
  | 'mouseenter'
  | 'mouseleave'
  | 'mousedown'
  | 'mouseup'
  | 'mousemove'
  | 'click'
  | 'dblclick'
  | 'wheel';

const mouseEventMap: Record<NativeMouseEventType, MouseEventType> = {
  mouseenter: 'onMouseEnter',
  mouseleave: 'onMouseLeave',
  mousedown: 'onMouseDown',
  mouseup: 'onMouseUp',
  mousemove: 'onMouseMove',
  click: 'onClick',
  dblclick: 'onDoubleClick',
  wheel: 'onWheel',
};
const mouseEvents: readonly NativeMouseEventType[] = [
  'mouseenter',
  'mouseleave',
  'mousedown',
  'mouseup',
  'mousemove',
  'click',
  'dblclick',
  'wheel',
];

const globalMouseEvents: readonly NativeMouseEventType[] = [
  'mousemove',
  'mouseup',
];

type NativeKeyboardEventType = 'keypress' | 'keydown' | 'keyup';
const keyboardEventMap: Record<NativeKeyboardEventType, KeyboardEventType> = {
  keypress: 'onKeyPress',
  keydown: 'onKeyDown',
  keyup: 'onKeyUp',
};
const keyboardEvents: NativeKeyboardEventType[] = [
  'keypress',
  'keydown',
  'keyup',
];
export default function Tracking({
  plotId,
  plotEvents,
  stateSeries,
  axisContext,
  plotHeight,
  plotWidth,
}: TrackingProps) {
  const rectRef = useRef<SVGRectElement>(null);
  const plotDataRef = useRef({
    plotId,
    plotEvents,
    stateSeries,
    axisContext,
    plotHeight,
    plotWidth,
  });
  useEffect(() => {
    plotDataRef.current = {
      plotId,
      plotEvents,
      stateSeries,
      axisContext,
      plotHeight,
      plotWidth,
    };
  }, [axisContext, plotEvents, plotHeight, plotId, plotWidth, stateSeries]);
  useEffect(() => {
    const rect = rectRef.current;
    if (!rectRef) return;

    function mouseEventListener(event: MouseEvent) {
      if (event.type === 'mousedown') {
        globalMouseEvents.forEach((mouseEvent) =>
          window.addEventListener(mouseEvent, mouseEventListener),
        );
      } else if (event.type === 'mouseup') {
        globalMouseEvents.forEach((mouseEvent) =>
          window.removeEventListener(mouseEvent, mouseEventListener),
        );
      }

      const info = infoFromMouse(
        event,
        plotDataRef.current.axisContext,
        plotDataRef.current.stateSeries,
        rect,
      );
      plotEvents.handleEvent(plotId, mouseEventMap[event.type], info);
    }
    function keyboardEventListener(event: KeyboardEvent) {
      const axisDomains = Object.entries(plotDataRef.current.axisContext).map(
        ([axis, { domain }]) => ({ [axis]: domain }),
      );
      const info = { event, axisDomains };
      plotEvents.handleEvent(plotId, keyboardEventMap[event.type], info);
    }
    mouseEvents.forEach((mouseEvent) =>
      rect.addEventListener(mouseEvent, mouseEventListener),
    );
    keyboardEvents.forEach((keyboardEvent) =>
      rect.addEventListener(keyboardEvent, keyboardEventListener),
    );
    return () => {
      mouseEvents.forEach((mouseEvent) =>
        rect.removeEventListener(mouseEvent, mouseEventListener),
      );
      globalMouseEvents.forEach((mouseEvent) =>
        window.removeEventListener(mouseEvent, mouseEventListener),
      );
      keyboardEvents.forEach((keyboardEvent) =>
        rect.removeEventListener(keyboardEvent, keyboardEventListener),
      );
    };
  }, [plotId, plotEvents]);
  return (
    <rect
      tabIndex={0}
      focusable
      ref={rectRef}
      width={plotWidth}
      height={plotHeight}
      style={{ fillOpacity: 0, outline: 'none' }}
    />
  );
}

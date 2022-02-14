import { euclidean } from 'ml-distance-euclidean';
import { useEffect, useRef } from 'react';

import { PlotAxisContext, PlotSeriesState } from '../contexts/plotContext';
import {
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
export interface TrackingResult<EventType extends MouseEvent = MouseEvent> {
  event: EventType;
  coordinates: Record<string, number>;
  clampedCoordinates: Record<string, number>;
  movement?: Record<string, number>;
  domain?: Record<string, [number, number]>;
  getClosest?: (method: ClosestMethods) => ClosestInfoResult;
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

function infoFromMouse<EventType extends MouseEvent = MouseEvent>(
  event: EventType,
  axisContext: Record<string, PlotAxisContext>,
  stateSeries: PlotSeriesState[],
  plotHeight: number,
  plotWidth: number,
  target: SVGRectElement,
): TrackingResult<EventType> {
  const { clientX, clientY, movementX, movementY } = event;
  const { left, top } = target.getBoundingClientRect();
  const onWheel = event instanceof WheelEvent;
  const ratio = onWheel ? 1 + event.deltaY * -0.001 : 0;
  // Calculate coordinates
  const xPosition = clientX - left;
  const yPosition = clientY - top;
  const coordinates: TrackingResult['coordinates'] = {};
  const clampedCoordinates: TrackingResult['clampedCoordinates'] = {};
  const domain: TrackingResult['domain'] = {};
  const movement: TrackingResult['movement'] = {};
  for (const key in axisContext) {
    const { scale, clampInDomain, position } = axisContext[key];
    if (onWheel) {
      const total = HORIZONTAL.includes(position) ? plotWidth : plotHeight;
      const pos = HORIZONTAL.includes(position) ? clientY - top : scale(0);
      const min = ratio > 1 ? pos * (1 - 1 / ratio) : pos * (1 - 1 / ratio);
      const max =
        ratio > 1
          ? pos + (total - pos) / ratio
          : total + (total - pos) * (1 / ratio - 1);
      domain[key] = [toNumber(scale.invert(min)), toNumber(scale.invert(max))];
    }
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
    domain,
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

    function mouseEventListener(event: MouseEvent | WheelEvent) {
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
        plotDataRef.current.plotHeight,
        plotDataRef.current.plotWidth,
        rect,
      );

      plotEvents.handleEvent(plotId, mouseEventMap[event.type], info);
    }
    mouseEvents.forEach((mouseEvent) => {
      return rect.addEventListener(mouseEvent, mouseEventListener);
    });
    return () => {
      mouseEvents.forEach((mouseEvent) => {
        return rect.removeEventListener(mouseEvent, mouseEventListener);
      });
      globalMouseEvents.forEach((mouseEvent) =>
        window.removeEventListener(mouseEvent, mouseEventListener),
      );
    };
  }, [plotId, plotEvents]);
  return (
    <rect
      ref={rectRef}
      width={plotWidth}
      height={plotHeight}
      style={{ fillOpacity: 0, outline: 'none' }}
    />
  );
}

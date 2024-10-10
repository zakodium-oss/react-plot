import { euclidean } from 'ml-distance-euclidean';
import { useEffect, useRef } from 'react';

import { PlotAxisContext, PlotSeriesState } from '../contexts/plotContext';
import {
  EventName,
  PlotEventsPlotActions,
} from '../contexts/plotController/usePlotEvents';
import { SeriesPoint } from '../types';
import { closestPoint, toNumber } from '../utils';

export interface ClosestInfo<MethodName extends ClosestMethods> {
  point: SeriesPoint;
  label?: string;
  axis: MethodName extends 'euclidean'
    ? Record<'x' | 'y', PlotAxisContext>
    : PlotAxisContext;
}
export type ClosestMethods = 'x' | 'y' | 'euclidean';
export type ClosestInfoResult = Record<string, ClosestInfo<ClosestMethods>>;
export interface TrackingResult<NativeEventType extends MouseEvent> {
  event: NativeEventType;
  coordinates: Record<string, number>;
  clampedCoordinates: Record<string, number>;
  movement: Record<string, number>;
  domains: Record<string, readonly [number, number]>;
  getClosest: (method: ClosestMethods) => ClosestInfoResult;
}

export interface TrackingProps {
  plotId: string;
  plotEvents: PlotEventsPlotActions;
  stateSeries: PlotSeriesState[];
  axisContext: Record<string, PlotAxisContext>;
  plotWidth: number;
  plotHeight: number;
}

const HORIZONTAL = new Set(['bottom', 'top']);

function infoFromEvent<NativeEventType extends MouseEvent>(
  event: NativeEventType,
  axisContext: Record<string, PlotAxisContext>,
  stateSeries: PlotSeriesState[],
  target: SVGRectElement,
): TrackingResult<NativeEventType> {
  type TrackingResultType = TrackingResult<NativeEventType>;
  const { clientX, clientY, movementX, movementY } = event;
  const { left, top } = target.getBoundingClientRect();
  // Calculate coordinates
  const xPosition = clientX - left;
  const yPosition = clientY - top;
  const coordinates: TrackingResultType['coordinates'] = {};
  const clampedCoordinates: TrackingResultType['clampedCoordinates'] = {};
  const domains: TrackingResultType['domains'] = {};
  const movement: TrackingResultType['movement'] = {};
  for (const key in axisContext) {
    const { scale, clampInDomain, position, domain } = axisContext[key];
    if (HORIZONTAL.has(position)) {
      coordinates[key] = toNumber(scale.invert(xPosition));
      movement[key] = toNumber(scale.invert(movementX)) - domain[0];
    } else {
      coordinates[key] = toNumber(scale.invert(yPosition));
      movement[key] = toNumber(scale.invert(movementY)) - domain[1];
    }
    clampedCoordinates[key] = clampInDomain(coordinates[key]);

    domains[key] = domain;
  }
  return {
    event,
    coordinates,
    clampedCoordinates,
    movement,
    getClosest(method) {
      return closestCalculation(
        method,
        { x: xPosition, y: yPosition },
        stateSeries,
        axisContext,
      );
    },
    domains,
  };
}

function closestCalculation(
  method: ClosestMethods,
  coordinates: Record<string, number>,
  stateSeries: PlotSeriesState[],
  axisContext: Record<string, PlotAxisContext>,
): ClosestInfoResult {
  const series: ClosestInfoResult = {};

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

type NativeEventName =
  | 'pointerenter'
  | 'pointerdown'
  | 'pointermove'
  | 'pointerup'
  | 'pointerleave'
  | 'click'
  | 'dblclick'
  | 'wheel';

const nativeEventMap: Record<NativeEventName, EventName> = {
  pointerenter: 'onPointerEnter',
  pointerdown: 'onPointerDown',
  pointermove: 'onPointerMove',
  pointerup: 'onPointerUp',
  pointerleave: 'onPointerLeave',
  click: 'onClick',
  dblclick: 'onDoubleClick',
  wheel: 'onWheel',
};

const nativeEventNames: readonly NativeEventName[] = [
  'pointerenter',
  'pointerdown',
  'pointermove',
  'pointerup',
  'pointerleave',
  'click',
  'dblclick',
  'wheel',
];
const globalNativeEventNames: readonly NativeEventName[] = [
  'pointermove',
  'pointerup',
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
    if (!rect) return;

    function eventListener(nativeEvent: MouseEvent) {
      if (nativeEvent.type === 'pointerdown') {
        for (const pointerEvent of globalNativeEventNames) {
          window.addEventListener(pointerEvent, eventListener);
        }
      } else if (nativeEvent.type === 'pointerup') {
        for (const pointerEvent of globalNativeEventNames) {
          window.removeEventListener(pointerEvent, eventListener);
        }
      }
      const info = infoFromEvent(
        nativeEvent,
        plotDataRef.current.axisContext,
        plotDataRef.current.stateSeries,
        rect as SVGRectElement,
      );

      plotEvents.handleEvent(
        plotId,
        nativeEventMap[nativeEvent.type as NativeEventName],
        info,
      );
    }
    for (const eventName of nativeEventNames) {
      rect.addEventListener(eventName, eventListener);
    }
    return () => {
      for (const eventName of nativeEventNames) {
        rect.removeEventListener(eventName, eventListener);
      }
      for (const eventName of globalNativeEventNames) {
        window.removeEventListener(eventName, eventListener);
      }
    };
  }, [plotId, plotEvents]);
  return (
    <rect
      ref={rectRef}
      width={plotWidth}
      height={plotHeight}
      style={{
        fillOpacity: 0,
      }}
    />
  );
}

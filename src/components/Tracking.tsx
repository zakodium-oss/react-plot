import { euclidean } from 'ml-distance-euclidean';
import React, { useEffect, useRef } from 'react';

import { usePlotContext } from '../hooks';
import type {
  AxisContextType,
  PlotProps,
  SeriesType,
  TrackingProps,
  TrackingResult,
} from '../types';
import { closestPoint } from '../utils';

const HORIZONTAL = ['bottom', 'top'];

function infoFromMouse(
  event: MouseEvent,
  axisContext: Record<string, AxisContextType>,
  top: number,
  left: number,
): TrackingResult {
  const { clientX, clientY } = event;

  // Calculate coordinates
  let coordinates: TrackingResult['coordinates'] = {};
  for (const key in axisContext) {
    const { scale, position } = axisContext[key];
    if (HORIZONTAL.includes(position)) {
      coordinates[key] = scale.invert(clientX - left);
    } else {
      coordinates[key] = scale.invert(clientY - top);
    }
  }

  return { event, coordinates };
}

export function closestCalculation(
  position: TrackingResult,
  closest: PlotProps['closest'],
  stateSeries: SeriesType[],
  axisContext: Record<string, AxisContextType>,
): TrackingResult {
  if (!closest) return position;

  let series: TrackingResult['series'] = {};

  // Closest point on X
  if (closest?.x) {
    for (const { id, x, data } of stateSeries) {
      if (data) {
        const point = closestPoint(data, position, (point, pos) => {
          const xVal = pos.coordinates[x.axisId];
          return xVal !== undefined ? Math.abs(point.x - xVal) : Infinity;
        });
        if (!series[id]) series[id] = {};
        series[id].closestX = { point, axis: [axisContext[x.axisId]] };
      }
    }
  }

  // Closest point on Y
  if (closest?.y) {
    for (const { id, y, data } of stateSeries) {
      if (data) {
        const point = closestPoint(data, position, (point, pos) => {
          const yVal = pos.coordinates[y.axisId];
          return yVal !== undefined ? Math.abs(point.y - yVal) : Infinity;
        });
        if (!series[id]) series[id] = {};
        series[id].closestY = { point, axis: [axisContext[y.axisId]] };
      }
    }
  }

  // Closest euclidean point
  if (closest?.euclidean) {
    for (const { id, x, y, data } of stateSeries) {
      if (data) {
        const point = closestPoint(data, position, (point, pos) => {
          const xVal = pos.coordinates[x.axisId];
          const yVal = pos.coordinates[y.axisId];
          return xVal !== undefined || yVal !== undefined
            ? euclidean([point.x, point.y], [xVal, yVal])
            : Infinity;
        });
        if (!series[id]) series[id] = {};
        series[id].closest = {
          point,
          axis: [axisContext[x.axisId], axisContext[y.axisId]],
        };
      }
    }
  }
  return { ...position, series };
}

export default function Tracking({ onMouseMove, onClick }: TrackingProps) {
  const { axisContext, plotHeight, plotWidth } = usePlotContext();
  const viewportRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const { left, top } = viewportRef.current.getBoundingClientRect();
    if (onClick) {
      viewportRef.current.onclick = (event) => {
        onClick(infoFromMouse(event, axisContext, top, left));
      };
    }

    if (onMouseMove) {
      viewportRef.current.onmousemove = (event) => {
        onMouseMove(infoFromMouse(event, axisContext, top, left));
      };
    }
  }, [viewportRef, onClick, onMouseMove, axisContext]);

  return (
    <rect
      width={plotWidth}
      height={plotHeight}
      className="tracking"
      ref={viewportRef}
      style={{ fillOpacity: 0 }}
    />
  );
}

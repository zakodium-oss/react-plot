import { euclidean } from 'ml-distance-euclidean';
import React from 'react';

import { usePlotContext } from '../hooks';
import type {
  AxisContextType,
  ClosestInfo,
  SeriesType,
  TrackingProps,
  TrackingResult,
} from '../types';
import { closestPoint } from '../utils';

const HORIZONTAL = ['bottom', 'top'];

function infoFromMouse(
  event: React.MouseEvent<SVGRectElement, MouseEvent>,
  axisContext: Record<string, AxisContextType>,
  stateSeries: SeriesType[],
): TrackingResult {
  const { clientX, clientY } = event;
  const { left, top } = event.currentTarget.getBoundingClientRect();

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

  return {
    event,
    coordinates,
    getClosest: (method) =>
      closestCalculation(method, coordinates, stateSeries, axisContext),
  };
}

function closestCalculation(
  method: 'x' | 'y' | 'euclidean',
  coordinates: TrackingResult['coordinates'],
  stateSeries: SeriesType[],
  axisContext: Record<string, AxisContextType>,
): Record<string, ClosestInfo> {
  let series: Record<string, ClosestInfo> = {};

  switch (method) {
    case 'x': {
      for (const { id, x, data } of stateSeries) {
        if (data) {
          const point = closestPoint(data, coordinates, (point, pos) => {
            const xVal = pos[x.axisId];
            return xVal !== undefined ? Math.abs(point.x - xVal) : Infinity;
          });
          series[id] = { point, axis: [axisContext[x.axisId]] };
        }
      }
      break;
    }
    case 'y': {
      for (const { id, y, data } of stateSeries) {
        if (data) {
          const point = closestPoint(data, coordinates, (point, pos) => {
            const yVal = pos[y.axisId];
            return yVal !== undefined ? Math.abs(point.y - yVal) : Infinity;
          });
          series[id] = { point, axis: [axisContext[y.axisId]] };
        }
      }
      break;
    }
    case 'euclidean': {
      for (const { id, x, y, data } of stateSeries) {
        if (data) {
          const point = closestPoint(data, coordinates, (point, pos) => {
            const xVal = pos[x.axisId];
            const yVal = pos[y.axisId];
            return xVal !== undefined || yVal !== undefined
              ? euclidean([point.x, point.y], [xVal, yVal])
              : Infinity;
          });
          series[id] = {
            point,
            axis: [axisContext[x.axisId], axisContext[y.axisId]],
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

export default function Tracking({
  onMouseMove,
  onClick,
  onMouseEnter,
  onMouseLeave,
  stateSeries,
}: TrackingProps) {
  const { axisContext, plotHeight, plotWidth } = usePlotContext();

  return (
    <rect
      width={plotWidth}
      height={plotHeight}
      className="tracking"
      style={{ fillOpacity: 0 }}
      onClick={(event) => {
        onClick(infoFromMouse(event, axisContext, stateSeries));
      }}
      onMouseMove={(event) => {
        onMouseMove(infoFromMouse(event, axisContext, stateSeries));
      }}
      onMouseEnter={(event) => onMouseEnter?.(event)}
      onMouseLeave={(event) => onMouseLeave?.(event)}
    />
  );
}

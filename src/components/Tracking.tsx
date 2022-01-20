import { euclidean } from 'ml-distance-euclidean';
import React from 'react';

import {
  PlotAxisContext,
  PlotSeriesState,
  usePlotContext,
} from '../contexts/plotContext';
import { SeriesPoint } from '../types';
import { closestPoint } from '../utils';

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
  event: React.MouseEvent<SVGRectElement, MouseEvent>;
  coordinates: Record<string, number>;
  getClosest?: (method: ClosestMethods) => ClosestInfoResult;
}
export interface KeysResult {
  event: React.KeyboardEvent<SVGRectElement>;
  x: { max: number; min: number };
  y: { max: number; min: number };
}
export interface TrackingProps {
  onMouseMove?: (result: TrackingResult) => void;
  onClick?: (result: TrackingResult) => void;
  onMouseEnter?: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
  onMouseUp?: (result: TrackingResult) => void;
  onMouseDown?: (result: TrackingResult) => void;
  onDoubleClick?: (result: TrackingResult) => void;
  onWheel?: (result: TrackingResult) => void;
  onKeyPress?: (result: KeysResult) => void;
  onKeyDown?: (result: KeysResult) => void;
  onKeyUp?: (result: KeysResult) => void;
  stateSeries: PlotSeriesState[];
}

const HORIZONTAL = ['bottom', 'top'];
function infoFromKey(
  event: React.KeyboardEvent<SVGRectElement>,
  axisContext: Record<string, PlotAxisContext>,
  plotHeight: number,
  plotWidth: number,
) {
  const { scale: scaleY } = axisContext.y;
  const { scale: scaleX } = axisContext.x;
  return {
    event,
    x: { min: scaleX.invert(0), max: scaleX.invert(plotWidth) },
    y: { min: scaleY.invert(plotHeight), max: scaleY.invert(0) },
  };
}
function infoFromWheel(
  event: React.WheelEvent<SVGRectElement>,
  axisContext: Record<string, PlotAxisContext>,
  plotHeight: number,
) {
  const ratio = 1 + event.deltaY * -0.001;
  const { clientY } = event;
  const { top } = event.currentTarget.getBoundingClientRect();
  // Calculate coordinates
  let coordinates: TrackingResult['coordinates'] = {};
  const { scale } = axisContext.y;
  const yPosition = clientY - top;
  const y1 =
    ratio > 1 ? yPosition * (1 - 1 / ratio) : yPosition * (1 - 1 / ratio);

  const y2 =
    ratio > 1
      ? yPosition + (plotHeight - yPosition) / ratio
      : plotHeight + (plotHeight - yPosition) * (1 / ratio - 1);
  coordinates.y1 = scale.invert(y1);
  coordinates.y2 = scale.invert(y2);

  return {
    event,
    coordinates,
  };
}
function infoFromMouse(
  event: React.MouseEvent<SVGRectElement, MouseEvent>,
  axisContext: Record<string, PlotAxisContext>,
  stateSeries: PlotSeriesState[],
): TrackingResult {
  const { clientX, clientY } = event;
  const { left, top } = event.currentTarget.getBoundingClientRect();

  // Calculate coordinates
  const xPosition = clientX - left;
  const yPosition = clientY - top;
  let coordinates: TrackingResult['coordinates'] = {};
  for (const key in axisContext) {
    const { scale, position } = axisContext[key];
    if (HORIZONTAL.includes(position)) {
      coordinates[key] = scale.invert(xPosition);
    } else {
      coordinates[key] = scale.invert(yPosition);
    }
  }
  return {
    event,
    coordinates,
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

export default function Tracking({
  onMouseMove,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onDoubleClick,
  onWheel,
  onKeyPress,
  onKeyUp,
  onKeyDown,
  stateSeries,
}: TrackingProps) {
  const { axisContext, plotHeight, plotWidth } = usePlotContext();

  return (
    <rect
      tabIndex={0}
      focusable
      width={plotWidth}
      height={plotHeight}
      className="tracking"
      style={{ fillOpacity: 0, outline: 'none' }}
      onClick={(event) => {
        onClick?.(infoFromMouse(event, axisContext, stateSeries));
      }}
      onKeyPress={(event) => {
        onKeyPress?.(infoFromKey(event, axisContext, plotHeight, plotWidth));
      }}
      onKeyDown={(event) => {
        onKeyDown?.(infoFromKey(event, axisContext, plotHeight, plotWidth));
      }}
      onKeyUp={(event) => {
        onKeyUp?.(infoFromKey(event, axisContext, plotHeight, plotWidth));
      }}
      onMouseMove={(event) => {
        onMouseMove?.(infoFromMouse(event, axisContext, stateSeries));
      }}
      onMouseEnter={(event) => onMouseEnter?.(event)}
      onMouseLeave={(event) => onMouseLeave?.(event)}
      onMouseDown={(event) =>
        onMouseDown?.(infoFromMouse(event, axisContext, stateSeries))
      }
      onMouseUp={(event) =>
        onMouseUp?.(infoFromMouse(event, axisContext, stateSeries))
      }
      onDoubleClick={(event) =>
        onDoubleClick?.(infoFromMouse(event, axisContext, stateSeries))
      }
      onWheel={(event) =>
        onWheel?.(infoFromWheel(event, axisContext, plotHeight))
      }
    />
  );
}

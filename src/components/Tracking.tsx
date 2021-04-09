import React, { useEffect, useRef } from 'react';

import { usePlotContext } from '../hooks';
import type { AxisContextType, TrackingProps, TrackingResult } from '../types';

function infoFromMouse(
  event: MouseEvent,
  axisContext: Record<string, AxisContextType>,
  top: number,
  left: number,
): TrackingResult {
  const { clientX, clientY } = event;

  // Calculate coordinates
  let coordinates: Record<string, number> = {};
  for (const key in axisContext) {
    const { scale, position } = axisContext[key];
    if (position === 'bottom' || position === 'top') {
      coordinates[key] = scale.invert(clientX - left);
    } else {
      coordinates[key] = scale.invert(clientY - top);
    }
  }

  // Search over the series

  return { event, coordinates, series: {} };
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

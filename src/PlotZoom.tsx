import React, { useEffect } from 'react';

import Plot from './Plot';
import type { AxisContext, Horizontal, PlotZoomProps, Vertical } from './types';

function searchAxis<T extends string>(position: T | 'none', axis: AxisContext) {
  let axisKey: string;

  // Search for keys in the axis context
  for (const key in axis) {
    if (axis[key]?.position === position) {
      axisKey = key;
    }
  }

  // Validate if keys where assigned
  if (!axisKey && position !== 'none') {
    throw new Error(`${position} is not defined in the axis context`);
  }

  return axisKey;
}

function handleZoom(
  delta: number,
  axis: AxisContext,
  zoomHorizontal: Horizontal | 'none',
  zoomVertical: Vertical | 'none',
  width: number,
  height: number,
): Record<string, [number, number]> {
  const axisHorizontal = searchAxis(zoomHorizontal, axis);
  const axisVertical = searchAxis(zoomVertical, axis);

  // Recalculates padding for each axis
  let zoom: Record<string, [number, number]> = {};
  if (zoomHorizontal !== 'none') {
    const padding = axis[axisHorizontal].padding;
    zoom[axisHorizontal] = [
      padding[0] + delta / width,
      padding[1] + delta / width,
    ];
  }
  if (zoomVertical !== 'none') {
    const padding = axis[axisVertical].padding;
    zoom[axisVertical] = [
      padding[0] + delta / height,
      padding[1] + delta / height,
    ];
  }
  return zoom;
}

export default function PlotZoom({
  zoomVertical = 'bottom',
  zoomHorizontal = 'left',
  width,
  height,
  children,
  ...props
}: PlotZoomProps) {
  useEffect(() => {
    if (zoomHorizontal === 'none' && zoomVertical === 'none') {
      throw new Error('Both zoom axis are disabled');
    }
  });

  return (
    <Plot
      onZoom={(deltaY, axis) =>
        handleZoom(deltaY, axis, zoomHorizontal, zoomVertical, width, height)
      }
      {...props}
      width={width}
      height={height}
    >
      {children}
    </Plot>
  );
}

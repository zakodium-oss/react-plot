import { useMemo } from 'react';

import { SeriesPoint } from '..';
import { Polygon } from '../components/Annotations/Polygon';
import { Polyline } from '../components/Annotations/Polyline';

import { ControllerHookOptions, DualAxisOptions, PathOptions } from './types';
import { usePathData } from './usePathData';

export interface UseDrawPathOptions
  extends ControllerHookOptions,
    DualAxisOptions,
    PathOptions {
  close?: boolean;
  onDraw?: (points: SeriesPoint[]) => void;
  onDrawing?: (points: SeriesPoint[]) => void;
}

export function useDrawPath(options: UseDrawPathOptions = {}) {
  const {
    horizontalAxisId = 'x',
    verticalAxisId = 'y',
    color = 'black',
    close = false,
    style,
    onDraw,
    onDrawing,
  } = options;

  const data = usePathData({
    onMove() {
      if (!data) {
        return;
      }
      onDrawing?.(points);
    },
    onEnd() {
      if (!data) {
        return;
      }
      onDraw?.(points);
    },
  });
  const points = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.map((d) => ({
      x: d[horizontalAxisId],
      y: d[verticalAxisId],
    }));
  }, [data, horizontalAxisId, verticalAxisId]);
  return {
    annotations:
      data !== null ? (
        close ? (
          <Polygon color={color} style={style} points={points} />
        ) : (
          <Polyline color={color} style={style} points={points} />
        )
      ) : null,
  };
}

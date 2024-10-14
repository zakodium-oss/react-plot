import { useMemo, useState } from 'react';

import { Polygon } from '../components/Annotations/Polygon.js';
import { Polyline } from '../components/Annotations/Polyline.js';
import type { SeriesPoint } from '../types.js';

import type {
  ControllerHookOptions,
  DualAxisOptions,
  PathOptions,
} from './types.js';
import { useStartMoveEnd } from './useStartMoveEnd.js';

export interface UseDrawPathOptions
  extends ControllerHookOptions,
    DualAxisOptions,
    PathOptions {
  /**
   * Callback on mouse move while drawing.
   * */
  onDraw?: (points: SeriesPoint[]) => void;
  /**
   * Callback when releasing mouse at end of drawing.
   * */
  onEnd?: (points: SeriesPoint[]) => void;
  /**
   * Close the path (link the first and last points).
   * */
  close?: boolean;
}

export function useDrawPath(options: UseDrawPathOptions = {}) {
  const {
    controllerId,
    disabled,
    horizontalAxisId = 'x',
    verticalAxisId = 'y',
    color = 'black',
    close = false,
    style,
    onDraw,
    onEnd,
  } = options;

  const [data, setData] = useState<Array<Record<string, number>> | null>(null);
  useStartMoveEnd({
    controllerId,
    disabled,
    onStart(result) {
      setData([result.clampedCoordinates]);
    },
    onMove(result) {
      setData((previousData) => {
        if (!previousData) return null;
        const { clampedCoordinates } = result;
        let isDuplicated = true;
        for (const key in clampedCoordinates) {
          if (
            (previousData.at(-1) as Record<string, number>)[key] !==
            clampedCoordinates[key]
          ) {
            isDuplicated = false;
            break;
          }
        }
        if (isDuplicated) return previousData;
        return previousData.concat(clampedCoordinates);
      });
      onDraw?.(points);
    },
    onEnd() {
      if (!data) return;
      setData(null);
      onEnd?.(points);
    },
  });
  const points = useMemo(() => {
    if (!data) return [];
    return data.map((d) => ({
      x: d[horizontalAxisId],
      y: d[verticalAxisId],
    }));
  }, [data, horizontalAxisId, verticalAxisId]);
  return {
    annotations:
      data !== null ? (
        close ? (
          <Polygon
            xAxis={horizontalAxisId}
            yAxis={verticalAxisId}
            color={color}
            style={style}
            points={points}
          />
        ) : (
          <Polyline
            xAxis={horizontalAxisId}
            yAxis={verticalAxisId}
            color={color}
            style={style}
            points={points}
          />
        )
      ) : null,
  };
}

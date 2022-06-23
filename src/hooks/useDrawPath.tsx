import { useMemo, useState } from 'react';

import { SeriesPoint } from '..';
import { Polygon } from '../components/Annotations/Polygon';
import { Polyline } from '../components/Annotations/Polyline';

import { ControllerHookOptions, DualAxisOptions, PathOptions } from './types';
import { useStartMoveEnd } from './useStartMoveEnd';

export interface UseDrawPathOptions
  extends ControllerHookOptions,
    DualAxisOptions,
    PathOptions {
  close?: boolean;
  onDraw?: (points: SeriesPoint[]) => void;
  onEnd?: (points: SeriesPoint[]) => void;
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

  const [data, setData] = useState<Record<string, number>[] | null>(null);
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
            previousData[previousData.length - 1][key] !==
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
          <Polygon color={color} style={style} points={points} />
        ) : (
          <Polyline color={color} style={style} points={points} />
        )
      ) : null,
  };
}

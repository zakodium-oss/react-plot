import { useState } from 'react';

import { Polyline } from '../components/Annotations/Polyline';

import { DualAxisOptions, PathOptions } from './types';
import { useStartMoveEnd } from './useStartMoveEnd';

export interface UseDrawPathOptions extends DualAxisOptions, PathOptions {
  onDraw?: (path: { data: Record<string, number>[] }) => void;
}

export function useDrawPath(options: UseDrawPathOptions = {}) {
  const {
    horizontalAxisId = 'x',
    verticalAxisId = 'y',
    color = 'red',
    style,
    onDraw,
  } = options;

  const [data, setData] = useState<Record<string, number>[] | null>(null);
  useStartMoveEnd({
    ...options,
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
    },
    onEnd() {
      if (!data) return;
      setData(null);
      onDraw?.({ data });
    },
  });

  return {
    annotations:
      data !== null ? (
        <Polyline
          color={color}
          style={style}
          points={data.map((d) => ({
            x: d[horizontalAxisId],
            y: d[verticalAxisId],
          }))}
        />
      ) : null,
  };
}

import { useMemo } from 'react';

import { Polygon } from '../components/Annotations/Polygon';
import { Polyline } from '../components/Annotations/Polyline';

import { ControllerHookOptions, DualAxisOptions, PathOptions } from './types';
import { usePathData } from './usePathData';

export interface UseDrawPathOptions
  extends ControllerHookOptions,
    DualAxisOptions,
    PathOptions {
  type?: 'polyline' | 'polygone';
  onDraw?: (path: { data: Record<string, number>[] }) => void;
}

export function useDrawPath(options: UseDrawPathOptions = {}) {
  const {
    horizontalAxisId = 'x',
    verticalAxisId = 'y',
    color = 'black',
    type = 'polyline',
    style,
    onDraw,
  } = options;

  const data = usePathData({
    onEnd() {
      if (!data) {
        return;
      }
      onDraw?.({ data });
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
    points,
    annotations:
      data !== null ? (
        type === 'polygone' ? (
          <Polygon color={color} style={style} points={points} />
        ) : (
          <Polyline
            color={color}
            style={style}
            points={data.map((d) => ({
              x: d[horizontalAxisId],
              y: d[verticalAxisId],
            }))}
          />
        )
      ) : null,
  };
}

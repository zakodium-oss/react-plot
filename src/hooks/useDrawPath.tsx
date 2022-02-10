import { Polyline } from '../components/Annotations/Polyline';

import { DualAxisOptions, PathOptions } from './types';
import { usePathData } from './usePathData';

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

  const data = usePathData({
    onEnd() {
      if (!data) {
        return;
      }
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

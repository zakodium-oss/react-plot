import { Rectangle } from '../components/Annotations/Rectangle';

import {
  ControllerHookOptions,
  DualAxisOptions,
  RectangleOptions,
} from './types';
import { useStartMoveEnd } from './useStartMoveEnd';

export interface UseDrawRectangleOptions
  extends ControllerHookOptions,
    DualAxisOptions,
    RectangleOptions {
  onDraw?: (rectangle: {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  }) => void;
}

export function useDrawRectangle(options: UseDrawRectangleOptions = {}) {
  const {
    controllerId,
    horizontalAxisId = 'x',
    verticalAxisId = 'y',
    color = 'red',
    style,
    onDraw,
  } = options;

  const startMoveEnd = useStartMoveEnd({
    controllerId,
    onEnd(data) {
      const x1 = startMoveEnd.start.clampedCoordinates[horizontalAxisId];
      const x2 = data.clampedCoordinates[horizontalAxisId];
      const y1 = startMoveEnd.start.clampedCoordinates[verticalAxisId];
      const y2 = data.clampedCoordinates[verticalAxisId];
      if (x1 === x2 || y1 === y2) {
        return;
      }
      onDraw?.({ x1, x2, y1, y2 });
    },
  });

  return {
    annotations: startMoveEnd?.end ? (
      <Rectangle
        color={color}
        style={{ fillOpacity: 0.2, stroke: color, ...style }}
        x1={startMoveEnd.start.clampedCoordinates[horizontalAxisId]}
        x2={startMoveEnd.end.clampedCoordinates[horizontalAxisId]}
        y1={startMoveEnd.start.clampedCoordinates[verticalAxisId]}
        y2={startMoveEnd.end.clampedCoordinates[verticalAxisId]}
      />
    ) : null,
  };
}

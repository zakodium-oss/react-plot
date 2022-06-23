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
  /**
   * Callback when releasing mouse at end of drawing.
   * */
  onEnd?: (rectangle: {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  }) => void;
}

export function useDrawRectangle(options: UseDrawRectangleOptions = {}) {
  const {
    controllerId,
    disabled,
    horizontalAxisId = 'x',
    verticalAxisId = 'y',
    color = 'red',
    style,
    onEnd,
  } = options;

  const startMoveEnd = useStartMoveEnd({
    controllerId,
    disabled,
    onEnd(_, start, end) {
      const x1 = start.clampedCoordinates[horizontalAxisId];
      const x2 = end.clampedCoordinates[horizontalAxisId];
      const y1 = start.clampedCoordinates[verticalAxisId];
      const y2 = end.clampedCoordinates[verticalAxisId];
      if (x1 === x2 || y1 === y2) {
        return;
      }
      onEnd?.({ x1, x2, y1, y2 });
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

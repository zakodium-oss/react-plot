import { useState } from 'react';

import {
  usePlotControls,
  usePlotEvents,
  usePlotOverrides,
} from '../contexts/plotController/plotControllerContext';

import { DualAxisOptions, RectangleOptions } from './types';
import { useDrawRectangle } from './useDrawRectangle';

export interface UseRectangularZoomOptions
  extends DualAxisOptions,
    RectangleOptions {}

export function useRectangularZoom(options: UseRectangularZoomOptions = {}) {
  const { horizontalAxisId = 'x', verticalAxisId = 'y' } = options;

  const {
    axes: { [horizontalAxisId]: oldX, [verticalAxisId]: oldY },
  } = usePlotOverrides();
  const [xY, setXY] = useState({
    [horizontalAxisId]: oldX,
    [verticalAxisId]: oldY,
  });

  const plotControls = usePlotControls();
  const { annotations } = useDrawRectangle({
    ...options,
    onDraw({ x1, x2, y1, y2 }) {
      const xY = {
        [horizontalAxisId]: {
          min: Math.min(x1, x2),
          max: Math.max(x1, x2),
        },
        [verticalAxisId]: {
          min: Math.min(y1, y2),
          max: Math.max(y1, y2),
        },
      };
      plotControls.setAxes(xY);
      setXY(xY);
    },
  });
  usePlotEvents({
    onDoubleClick({ event: { button } }) {
      if (button !== 0) return;
      plotControls.resetAxes([horizontalAxisId, verticalAxisId]);
      setXY({
        [horizontalAxisId]: undefined,
        [verticalAxisId]: undefined,
      });
    },
  });

  return { annotations, ...xY };
}

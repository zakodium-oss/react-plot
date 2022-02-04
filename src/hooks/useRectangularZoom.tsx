import {
  usePlotControls,
  usePlotEvents,
} from '../contexts/plotController/plotControllerContext';

import { DualAxisOptions, RectangleOptions } from './types';
import { useDrawRectangle } from './useDrawRectangle';

export interface UseRectangularZoomOptions
  extends DualAxisOptions,
    RectangleOptions {}

export function useRectangularZoom(options: UseRectangularZoomOptions = {}) {
  const { horizontalAxisId = 'x', verticalAxisId = 'y' } = options;

  const plotControls = usePlotControls();
  const { annotations } = useDrawRectangle({
    ...options,
    onDraw({ x1, x2, y1, y2 }) {
      plotControls.setAxes({
        [horizontalAxisId]: {
          min: Math.min(x1, x2),
          max: Math.max(x1, x2),
        },
        [verticalAxisId]: {
          min: Math.min(y1, y2),
          max: Math.max(y1, y2),
        },
      });
    },
  });
  usePlotEvents({
    onDoubleClick({ event: { button } }) {
      if (button !== 0) return;
      plotControls.resetAxes([horizontalAxisId, verticalAxisId]);
    },
  });

  return { annotations };
}

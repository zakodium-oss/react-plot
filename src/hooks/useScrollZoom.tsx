import { useState } from 'react';

import {
  usePlotControls,
  usePlotEvents,
} from '../contexts/plotController/plotControllerContext';

export interface UseScrollZoomOptions {
  direction?: 'horizontal' | 'vertical';
  axisId?: string;
}

export function useScrollZoom(options: UseScrollZoomOptions = {}) {
  const [maxMin, setMaxMin] = useState<{ max?: number; min?: number }>({
    max: undefined,
    min: undefined,
  });
  const {
    direction = 'vertical',
    axisId = direction === 'horizontal' ? 'x' : 'y',
  } = options;

  const plotControls = usePlotControls();

  usePlotEvents({
    onWheel({ coordinates: { y1, y2 } }) {
      const min = Math.min(y1, y2);
      const max = Math.max(y1, y2);
      setMaxMin({ min, max });
      plotControls.setAxis(axisId, { min, max });
    },
    onDoubleClick({ event: { button } }) {
      if (button !== 0) return;
      plotControls.resetAxis(axisId);
      setMaxMin({
        max: undefined,
        min: undefined,
      });
    },
  });
  return maxMin;
}

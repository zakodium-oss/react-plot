import { useState } from 'react';

import {
  usePlotControls,
  usePlotEvents,
  usePlotOverrides,
} from '../contexts/plotController/plotControllerContext';

export interface UseScrollZoomOptions {
  direction?: 'horizontal' | 'vertical';
  axisId?: string;
}

export function useScrollZoom(options: UseScrollZoomOptions = {}) {
  const {
    direction = 'vertical',
    axisId = direction === 'horizontal' ? 'x' : 'y',
  } = options;

  const plotControls = usePlotControls();

  const {
    axes: { [axisId]: oldY },
  } = usePlotOverrides();
  const [y, setY] = useState(oldY);

  usePlotEvents({
    onWheel({
      newDomain: {
        [axisId]: [y1, y2],
      },
    }) {
      const minMax = {
        min: Math.min(y1, y2),
        max: Math.max(y1, y2),
      };
      plotControls.setAxis(axisId, minMax);
      setY(minMax);
    },
    onDoubleClick({ event: { button } }) {
      if (button !== 0) return;
      plotControls.resetAxis(axisId);
      setY(undefined);
    },
  });
  return y;
}

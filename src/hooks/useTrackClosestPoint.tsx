import { useState } from 'react';

import { ClosestInfoResult, ClosestMethods } from '../components/Tracking';
import { usePlotEvents } from '../contexts/plotController/plotControllerContext';

import { DualAxisOptions } from './types';

export interface UseTrackClosestOptions extends DualAxisOptions {
  method?: ClosestMethods;
}

export function useTrackClosestPoint(options: UseTrackClosestOptions = {}) {
  const [hover, setHover] = useState<{
    event: MouseEvent;
    closest: ClosestInfoResult;
  } | null>(null);
  const { method = ClosestMethods.euclidean } = options;
  usePlotEvents({
    onMouseMove({ getClosest, event }) {
      setHover({
        event,
        closest: getClosest(method),
      });
    },
    onMouseLeave() {
      setHover(null);
    },
  });

  return hover;
}

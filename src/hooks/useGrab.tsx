import { useRef, useState } from 'react';

import {
  usePlotControls,
  usePlotEvents,
} from '../contexts/plotController/plotControllerContext';
import { useMaxMin } from '../hooks';

import { DualAxisOptions } from './types';

export interface UseGrabOptions extends DualAxisOptions {}

export function useGrab(options: UseGrabOptions = {}) {
  const { horizontalAxisId = 'x', verticalAxisId = 'y' } = options;
  const [cursor, setCursor] = useState<'' | 'grabbing' | 'grab'>('');
  const click = useRef<boolean>(false);
  const plotControls = usePlotControls();
  const { [horizontalAxisId]: x, [verticalAxisId]: y } = useMaxMin({
    xAxis: horizontalAxisId,
    yAxis: verticalAxisId,
  });
  usePlotEvents({
    onKeyDown({ event: { altKey } }) {
      if (altKey) {
        setCursor('grab');
      }
    },
    onKeyUp({ event: { altKey } }) {
      if (!altKey) {
        setCursor('');
      }
    },
    onMouseDown({ event: { altKey } }) {
      if (altKey) {
        setCursor('grabbing');
      }
      click.current = true;
    },
    onMouseUp({ event: { altKey } }) {
      if (altKey) {
        setCursor('grab');
      }
      click.current = false;
    },
    onMouseMove({
      event: { altKey },
      movement: { [horizontalAxisId]: xMovement, [verticalAxisId]: yMovement },
    }) {
      if (altKey && click.current) {
        plotControls.setAxis(horizontalAxisId, {
          min: x.min - xMovement,
          max: x.max - xMovement,
        });
        plotControls.setAxis(verticalAxisId, {
          min: y.min - yMovement,
          max: y.max - yMovement,
        });
      }
    },
    onDoubleClick({ event: { button } }) {
      if (button !== 0) return;
      plotControls.resetAxes([horizontalAxisId, verticalAxisId]);
    },
  });

  return { cursor, [horizontalAxisId]: x, [verticalAxisId]: y };
}

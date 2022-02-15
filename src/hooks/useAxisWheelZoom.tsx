import {
  usePlotControls,
  usePlotEvents,
} from '../contexts/plotController/plotControllerContext';

import { ControllerHookOptions } from './types';

export interface UseAxisWheelZoomOptions extends ControllerHookOptions {
  direction?: 'horizontal' | 'vertical';
  axisId?: string;
  zoomCenter?: 'mouse' | number;
  zoomSpeed?: number;
}

export function useAxisWheelZoom(options: UseAxisWheelZoomOptions = {}) {
  const {
    direction = 'vertical',
    axisId = direction === 'horizontal' ? 'x' : 'y',
    zoomCenter = 0,
    zoomSpeed = 1,
  } = options;

  const plotControls = usePlotControls(options);

  usePlotEvents(
    {
      onWheel({
        event,
        coordinates: { [axisId]: mousePosition },
        domains: {
          [axisId]: [oldMin, oldMax],
        },
      }) {
        if (event instanceof WheelEvent) {
          const position = zoomCenter === 'mouse' ? mousePosition : zoomCenter;

          const ratio = 1 + event.deltaY * -0.001 * zoomSpeed;
          const min = position - (position - oldMin) * ratio;
          const max = position + (oldMax - position) * ratio;

          plotControls.setAxis(axisId, {
            min,
            max,
          });
        }
      },
      onDoubleClick({ event: { button } }) {
        if (button !== 0) return;
        plotControls.resetAxis(axisId);
      },
    },
    options,
  );
}

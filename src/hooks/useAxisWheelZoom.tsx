import {
  usePlotControls,
  usePlotEvents,
} from '../contexts/plotController/plotControllerContext';

import { ControllerHookOptions } from './types';

export interface UseAxisWheelZoomOptions extends ControllerHookOptions {
  direction?: 'horizontal' | 'vertical';
  axisId?: string;
  center?: 'mouse' | number;
  factor?: number;
  invert?: boolean;
}

export function useAxisWheelZoom(options: UseAxisWheelZoomOptions = {}) {
  const {
    direction = 'vertical',
    axisId = direction === 'horizontal' ? 'x' : 'y',
    center = 0,
    factor = 1,
    invert = false,
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
          const position = center === 'mouse' ? mousePosition : center;
          const delta = event.deltaY * (invert ? -0.001 : 0.001) * factor;
          const ratio = delta < 0 ? -1 / (delta - 1) : 1 + delta;
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

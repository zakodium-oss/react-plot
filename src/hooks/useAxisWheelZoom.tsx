import {
  usePlotControls,
  usePlotEvents,
} from '../contexts/plotController/plotControllerContext';

import { ControllerHookOptions } from './types';

export interface UseAxisWheelZoomOptions extends ControllerHookOptions {
  /**
   * OnWheel zoom direction
   * @default 'vertical'
   * */
  direction?: 'horizontal' | 'vertical';
  /**
   * Zoom axisId
   * @default 'x' if direction is horizontal
   *          'y' if direction is vertical
   * */
  axisId?: string;
  /**
   * Zoom center
   * @default 0
   * */
  center?: 'pointer' | number;
  /**
   * Zoom factor
   * @default 1
   * */
  factor?: number;
  /**
   * Invert zoom
   * @default false - Zoom in OnWheel up
   * */
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
        coordinates: { [axisId]: pointerPosition },
        domains: {
          [axisId]: [oldMin, oldMax],
        },
      }) {
        event.preventDefault();
        const position = center === 'pointer' ? pointerPosition : center;
        const delta = event.deltaY * (invert ? -0.001 : 0.001) * factor;
        const ratio = delta < 0 ? -1 / (delta - 1) : 1 + delta;
        const min = position - (position - oldMin) * ratio;
        const max = position + (oldMax - position) * ratio;

        plotControls.setAxis(axisId, {
          min,
          max,
        });
      },
      onDoubleClick({ event: { button } }) {
        if (button !== 0) return;
        plotControls.resetAxis(axisId);
      },
    },
    options,
  );
}

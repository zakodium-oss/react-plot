import {
  usePlotControls,
  usePlotEvents,
} from '../contexts/plotController/plotControllerContext';

import { ControllerHookOptions } from './types';

export interface UseAxisWheelZoomOptions extends ControllerHookOptions {
  /**
   * The zoom direction to use on wheel events.
   * @defaultValue  'vertical'
   * */
  direction?: 'horizontal' | 'vertical';
  /**
   * Id of Axis to apply on wheel zoom.
   * @defaultValue  'x' if direction is horizontal, 'y' if direction is vertical
   * */
  axisId?: string;
  /**
   * The zoom center fixed on wheel.
   * @defaultValue 0
   * */
  center?: 'pointer' | number;
  /**
   * The factor to speedup the zoom on wheel.
   * @defaultValue 1
   * */
  factor?: number;
  /**
   * Invert the zoom on wheel default is zoom-in on wheel up.
   * @defaultValue false
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

import { usePlotOverrides } from '../contexts/plotController/plotControllerContext';

import { ControllerHookOptions } from './types';

export interface UsePlotControllerAxisOptions extends ControllerHookOptions {
  axisId?: string;
}
export function usePlotControllerAxis(options: UsePlotControllerAxisOptions) {
  const { axisId } = options;
  const {
    axes: { [axisId]: axis },
  } = usePlotOverrides(options);

  return axis ? axis : { max: null, min: null };
}

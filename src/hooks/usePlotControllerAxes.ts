import { usePlotOverrides } from '../contexts/plotController/plotControllerContext';

import { ControllerHookOptions } from './types';

export interface UsePlotControllerAxesOptions extends ControllerHookOptions {}
export function usePlotControllerAxes(
  options: UsePlotControllerAxesOptions = {},
) {
  const { axes } = usePlotOverrides(options);

  return axes;
}

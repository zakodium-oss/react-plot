import { usePlotOverrides } from '../contexts/plotController/plotControllerContext.js';

import type { ControllerHookOptions } from './types.js';

export type UsePlotControllerAxesOptions = ControllerHookOptions;

export function usePlotControllerAxes(
  options: UsePlotControllerAxesOptions = {},
) {
  const { axes } = usePlotOverrides(options);

  return axes;
}

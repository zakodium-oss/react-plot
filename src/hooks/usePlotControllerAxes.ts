import { usePlotOverrides } from '../contexts/plotController/plotControllerContext';

import { ControllerHookOptions } from './types';

export type UsePlotControllerAxesOptions = ControllerHookOptions;

export function usePlotControllerAxes(
  options: UsePlotControllerAxesOptions = {},
) {
  const { axes } = usePlotOverrides(options);

  return axes;
}

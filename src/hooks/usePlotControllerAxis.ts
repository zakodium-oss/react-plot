import { usePlotOverrides } from '../contexts/plotController/plotControllerContext';

export function usePlotControllerAxis(axisId: string) {
  const {
    axes: { [axisId]: axis },
  } = usePlotOverrides();

  return axis ? axis : { max: null, min: null };
}

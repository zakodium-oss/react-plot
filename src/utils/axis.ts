import { TickPosition } from '../types';

export function getInnerOffset(
  hidden: boolean,
  hiddenTicks: boolean,
  tickPosition: TickPosition,
  primaryTickLength: number,
): number {
  return hidden || hiddenTicks
    ? 0
    : getOffsetFromTickPosition(tickPosition, primaryTickLength);
}

function getOffsetFromTickPosition(
  tickPosition: TickPosition,
  primaryTickLength: number,
): number {
  switch (tickPosition) {
    case 'outer':
      return 0;
    case 'inner':
      return primaryTickLength;
    case 'center':
      return primaryTickLength / 2;
    default:
      throw new Error('unreachable');
  }
}

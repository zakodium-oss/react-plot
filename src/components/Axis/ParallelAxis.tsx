import { ScaleLinear, ScaleLogarithmic } from 'd3-scale';

import { usePlotContext } from '../../hooks';
import type { AxisChildProps, Horizontal, Vertical } from '../../types';

import LinearAxis from './LinearAxis';
import LogAxis from './LogAxis';

function parallelPosition<T extends Horizontal | Vertical>(position: T): T {
  switch (position) {
    case 'bottom': {
      return 'top' as T;
    }
    case 'top': {
      return 'bottom' as T;
    }
    case 'left': {
      return 'right' as T;
    }
    case 'right': {
      return 'left' as T;
    }
    default: {
      throw new Error(`Unknown position ${position}`);
    }
  }
}

export type ParallelAxisProps = Omit<AxisChildProps, 'displayPrimaryGridLines'>;

export function ParallelAxis({
  id,
  hidden = false,
  tickStyle = {},
  tickLength = 6,
  ...props
}: ParallelAxisProps) {
  const { axisContext } = usePlotContext();

  // Don't display axis if parent id not in context
  const parentAxis = axisContext[id];
  if (!parentAxis) return null;

  // Get position opposite to parent axis
  const position = parallelPosition(parentAxis.position);

  // Renders according to position and scale
  const { type, scale, scientific } = parentAxis;
  const childProps: ParallelAxisProps = {
    id,
    hidden,
    tickStyle,
    tickLength,
    ...props,
  };

  if (type === 'linear') {
    return (
      <LinearAxis
        {...childProps}
        scale={scale as ScaleLinear<number, number>}
        scientific={scientific}
        position={position}
      />
    );
  } else {
    return (
      <LogAxis
        {...childProps}
        scale={scale as ScaleLogarithmic<number, number>}
        scientific={scientific}
        position={position}
      />
    );
  }
}

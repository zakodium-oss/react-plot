import { ScaleLinear, ScaleLogarithmic } from 'd3-scale';

import { usePlotContext } from '../../plotContext';
import type { Position } from '../../types';

import { AxisProps } from './Axis';
import LinearAxis from './LinearAxis';
import LogAxis from './LogAxis';
import { AxisChildProps } from './types';

function parallelPosition<T extends Position>(position: T): T {
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

export type ParallelAxisProps = Omit<
  AxisProps,
  | 'id'
  | 'position'
  | 'min'
  | 'max'
  | 'paddingStart'
  | 'paddingEnd'
  | 'flip'
  | 'scale'
  | 'displayPrimaryGridLines'
  | 'displaySecondaryGridLines'
  | 'tickLabelFormat'
> & { id: string };

export function ParallelAxis(props: ParallelAxisProps) {
  const {
    id,
    hidden = false,
    primaryTickLength = 5,
    tickPosition = 'outer',
    hiddenLine = false,
    hiddenTicks = false,
    ...otherProps
  } = props;
  const { axisContext, plotWidth, plotHeight } = usePlotContext();

  // Don't display axis if parent id not in context
  const parentAxis = axisContext[id];
  if (!parentAxis) return null;

  // Get position opposite to parent axis
  const position = parallelPosition(parentAxis.position);

  // Renders according to position and scale
  const { type, scale, tickLabelFormat } = parentAxis;
  const childProps: AxisChildProps = {
    plotWidth,
    plotHeight,
    position,
    tickLabelFormat,
    displayPrimaryGridLines: false,
    hidden,
    primaryTickLength,
    tickPosition,
    hiddenLine,
    hiddenTicks,
    ...otherProps,
  };

  if (type === 'linear') {
    return (
      <LinearAxis
        {...childProps}
        scale={scale as ScaleLinear<number, number>}
      />
    );
  } else {
    return (
      <LogAxis
        {...childProps}
        scale={scale as ScaleLogarithmic<number, number>}
      />
    );
  }
}

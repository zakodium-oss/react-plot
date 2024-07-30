import { ScaleLinear, ScaleLogarithmic, ScaleTime } from 'd3-scale';

import { usePlotContext } from '../../contexts/plotContext';
import type { Position, TickLabelFormat } from '../../types';
import { getInnerOffset } from '../../utils/axis';

import { AxisProps } from './Axis';
import LinearAxis from './LinearAxis';
import LogAxis from './LogAxis';
import TimeAxis from './TimeAxis';

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
> & { id: string };

export function ParallelAxis(props: ParallelAxisProps) {
  const {
    id,
    hidden = false,
    primaryTickLength = 5,
    secondaryTickLength = 3,
    tickPosition = 'outer',
    hiddenLine = false,
    hiddenTicks = false,
    tickLabelFormat: newTickLabelFormat,
    ...otherProps
  } = props;
  const { axisContext, plotWidth, plotHeight } = usePlotContext();

  const innerOffset = getInnerOffset(
    hidden,
    hiddenTicks,
    tickPosition,
    primaryTickLength,
  );

  // Don't display axis if parent id not in context
  const parentAxis = axisContext[id];
  if (!parentAxis) return null;

  // Get position opposite to parent axis
  const position = parallelPosition(parentAxis.position);

  // Renders according to position and scale
  const { type, scale, tickLabelFormat: oldTickLabelFormat } = parentAxis;

  const tickLabelFormat = newTickLabelFormat ?? oldTickLabelFormat;

  const childProps = {
    plotWidth,
    plotHeight,
    position,
    displayPrimaryGridLines: false,
    hidden,
    primaryTickLength,
    tickPosition,
    hiddenLine,
    hiddenTicks,
    innerOffset,
    secondaryTickLength,
    ...otherProps,
  };

  if (type === 'linear') {
    return (
      <LinearAxis
        {...childProps}
        tickLabelFormat={tickLabelFormat as TickLabelFormat}
        scale={scale as ScaleLinear<number, number>}
      />
    );
  } else if (type === 'time') {
    return (
      <TimeAxis
        {...childProps}
        tickLabelFormat={tickLabelFormat as TickLabelFormat<Date>}
        scale={scale as ScaleTime<number, number>}
      />
    );
  } else {
    return (
      <LogAxis
        {...childProps}
        tickLabelFormat={tickLabelFormat as TickLabelFormat}
        scale={scale as ScaleLogarithmic<number, number>}
      />
    );
  }
}

import React from 'react';

import { usePlotContext } from '../../hooks';
import type { Horizontal, ParallelAxisProps, Vertical } from '../../types';

import BottomAxis from './BottomAxis';
import BottomLogAxis from './BottomLogAxis';
import LeftAxis from './LeftAxis';
import LeftLogAxis from './LeftLogAxis';
import RightAxis from './RightAxis';
import RightLogAxis from './RightLogAxis';
import TopAxis from './TopAxis';
import TopLogAxis from './TopLogAxis';

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

export default function ParallelAxis({
  id,
  fontSize = 16,
  labelSpace = 24,
  hidden = false,
  tickStyle = {},
  tickLength = 6,
  ...props
}: ParallelAxisProps) {
  const { axisContext } = usePlotContext();

  // Don't display axis if parent id not in context
  const parentAxis = axisContext[id];
  if (!parentAxis) return null;

  // Get position oposite to parent axis
  const position = parallelPosition(parentAxis.position);
  const existing = Object.values(axisContext).find(
    (axis) => axis.position === position,
  );
  if (existing) throw new Error(`Position ${position} was already declared`);

  // Renders accordly to position and scale
  const { type } = parentAxis;
  const childProps: ParallelAxisProps = {
    id,
    fontSize,
    labelSpace,
    hidden,
    tickStyle,
    tickLength,
    ...props,
  };
  switch (`${position}-${type}`) {
    case 'top-log':
      return <TopLogAxis {...childProps} />;
    case 'top-linear':
      return <TopAxis {...childProps} />;
    case 'bottom-log':
      return <BottomLogAxis {...childProps} />;
    case 'bottom-linear':
      return <BottomAxis {...childProps} />;
    case 'left-log':
      return <LeftLogAxis {...childProps} />;
    case 'left-linear':
      return <LeftAxis {...childProps} />;
    case 'right-log':
      return <RightLogAxis {...childProps} />;
    case 'right-linear':
      return <RightAxis {...childProps} />;
    default:
      return null;
  }
}

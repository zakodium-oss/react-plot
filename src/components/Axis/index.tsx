import React, { useEffect } from 'react';

import { useDispatchContext } from '../../hooks';
import type { AxisProps } from '../../types';

import BottomAxis from './BottomAxis';
import LeftAxis from './LeftAxis';
import RightAxis from './RightAxis';
import TopAxis from './TopAxis';

export default function Axis({
  id,
  position,
  min,
  max,
  padding,
  flip = false,

  // children props
  label,
  fontSize = 16,
  labelSpace = 24,
  showGridLines,
  labelStyle,
  display = true,
  tickStyle = {},
}: AxisProps) {
  const { dispatch } = useDispatchContext();
  useEffect(() => {
    const [minPadding = 0, maxPadding = 0] = padding || [0, 0];
    if (minPadding < 0 || minPadding > 1) {
      throw new Error(
        `Padding ${position} (${minPadding}) is not between 0 and 1`,
      );
    }
    if (maxPadding < 0 || maxPadding > 1) {
      throw new Error(
        `Padding ${position} (${maxPadding}) is not between 0 and 1`,
      );
    }

    dispatch({
      type: 'newAxis',
      value: {
        id,
        position,
        min,
        max,
        padding: [minPadding, maxPadding],
        flip,
      },
    });

    return () => dispatch({ type: 'removeAxis', value: { id } });
  }, [dispatch, id, position, min, max, padding, flip]);

  const childProps = {
    id,
    showGridLines,
    display,
    label,
    labelSpace,
    labelStyle,
    fontSize,
    tickStyle,
  };

  switch (position) {
    case 'top':
      return <TopAxis {...childProps} />;
    case 'bottom':
      return <BottomAxis {...childProps} />;
    case 'left':
      return <LeftAxis {...childProps} />;
    case 'right':
      return <RightAxis {...childProps} />;
    default:
      return null;
  }
}

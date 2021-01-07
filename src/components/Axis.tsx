import React, { useEffect } from 'react';

import { useDispatchContext } from '../hooks';
import type { AxisProps } from '../types';

import XAxis from './XAxis';
import YAxis from './YAxis';

export default function Axis({
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
  const isHorizontal = position === 'horizontal';

  // Send min and max to main state
  useEffect(() => {
    dispatch({
      type: 'minMax',
      value: { min, max, axis: isHorizontal ? 'x' : 'y' },
    });
  }, [dispatch, min, max, isHorizontal]);

  // Send flip to main state
  useEffect(() => {
    dispatch({
      type: 'flip',
      value: { flip, axis: isHorizontal ? 'x' : 'y' },
    });
  }, [dispatch, flip, isHorizontal]);

  // Send paddings to main state
  useEffect(() => {
    const [min = 0, max = 0] = padding || [0, 0];
    if (min < 0 || min > 1) {
      throw new Error(
        `Padding ${
          isHorizontal ? 'left' : 'bottom'
        } (${min}) is not between 0 and 1`,
      );
    }
    if (max < 0 || max > 1) {
      throw new Error(
        `Padding ${
          isHorizontal ? 'right' : 'top'
        } (${max}) is not between 0 and 1`,
      );
    }

    dispatch({
      type: 'padding',
      value: { min, max, axis: isHorizontal ? 'x' : 'y' },
    });
  }, [dispatch, padding, isHorizontal]);

  const childProps = {
    showGridLines,
    display,
    label,
    labelSpace,
    labelStyle,
    fontSize,
    tickStyle,
  };
  return isHorizontal ? <XAxis {...childProps} /> : <YAxis {...childProps} />;
}

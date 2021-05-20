import { ScaleLinear, ScaleLogarithmic } from 'd3-scale';
import { useEffect } from 'react';

import { useDispatchContext, usePlotContext } from '../../hooks';


import LinearAxis from './LinearAxis';
import LogAxis from './LogAxis';
import { AxisChildProps } from './types';

import type { AxisProps } from '../../types';

export default function Axis({
  id,
  position,
  min,
  max,
  paddingStart,
  paddingEnd,
  flip = false,
  scale = 'linear',

  // children props
  label,
  fontSize = 16,
  labelSpace = 24,
  displayGridLines,
  labelStyle,
  hidden = false,
  tickStyle = {},
  hiddenTicks,
  tickEmbedded,
  tickLength = 6,
  hiddenSecondaryTicks,
}: AxisProps) {
  const { dispatch } = useDispatchContext();
  const { axisContext, plotWidth, plotHeight } = usePlotContext();

  const xY = ['top', 'bottom'].includes(position) ? 'x' : 'y';
  useEffect(() => {
    const minPadding = paddingStart || 0;
    const maxPadding = paddingEnd || 0;

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
        id: id || xY,
        position,
        min,
        max,
        paddingStart: minPadding,
        paddingEnd: maxPadding,
        flip,
        scale,
      },
    });

    return () => dispatch({ type: 'removeAxis', value: { id: id || xY } });
  }, [
    dispatch,
    xY,
    id,
    position,
    min,
    max,
    flip,
    paddingStart,
    paddingEnd,
    scale,
  ]);

  const currentAxis = axisContext[id || xY];
  if (!currentAxis) return null;

  const childProps: AxisChildProps = {
    hidden,
    plotWidth,
    plotHeight,
    displayGridLines,
    label,
    labelSpace,
    labelStyle,
    tickEmbedded,
    position,
    scientific: currentAxis.scientific,
  };

  if (scale === 'linear') {
    return (
      <LinearAxis
        {...childProps}
        scale={currentAxis.scale as ScaleLinear<number, number>}
      />
    );
  } else {
    return (
      <LogAxis
        {...childProps}
        scale={currentAxis.scale as ScaleLogarithmic<number, number>}
      />
    );
  }
}

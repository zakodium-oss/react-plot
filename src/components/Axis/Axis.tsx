import { ScaleLinear, ScaleLogarithmic } from 'd3-scale';
import { CSSProperties, ReactNode, useEffect } from 'react';

import {
  usePlotContext,
  usePlotDispatchContext,
} from '../../contexts/plotContext';
import { Position, TickLabelFormat, TickPosition } from '../../types';
import { getInnerOffset } from '../../utils/axis';

import LinearAxis from './LinearAxis';
import LogAxis from './LogAxis';

export interface AxisProps {
  id?: string;

  position: Position;

  min?: number;
  max?: number;

  paddingStart?: number;
  paddingEnd?: number;

  flip?: boolean;
  scale?: 'linear' | 'log';

  /**
   * Hide all axis elements.
   */
  hidden?: boolean;

  /**
   * Hide the line.
   */
  hiddenLine?: boolean;
  lineStyle?: CSSProperties;

  label?: ReactNode;
  labelStyle?: CSSProperties;

  displayPrimaryGridLines?: boolean;
  primaryGridLineStyle?: CSSProperties;

  displaySecondaryGridLines?: boolean;
  secondaryGridLineStyle?: CSSProperties;

  hiddenTicks?: boolean;
  tickPosition?: TickPosition;
  tickLabelFormat?: TickLabelFormat;
  tickLabelStyle?: CSSProperties;

  primaryTickLength?: number;
  primaryTickStyle?: CSSProperties;

  secondaryTickLength?: number;
  secondaryTickStyle?: CSSProperties;
}

export function Axis({
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
  displayPrimaryGridLines = false,
  labelStyle,
  hidden = false,
  tickLabelStyle,
  tickLabelFormat = (value) => String(value),
  hiddenLine = false,
  lineStyle,
  primaryGridLineStyle,
  hiddenTicks = false,
  tickPosition = 'outer',
  primaryTickLength = 5,
  primaryTickStyle,
}: AxisProps) {
  const dispatch = usePlotDispatchContext();
  const { axisContext, plotWidth, plotHeight } = usePlotContext();

  const xY = ['top', 'bottom'].includes(position) ? 'x' : 'y';

  const innerOffset = getInnerOffset(
    hidden,
    hiddenTicks,
    tickPosition,
    primaryTickLength,
  );

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
      payload: {
        id: id || xY,
        position,
        min,
        max,
        paddingStart: minPadding,
        paddingEnd: maxPadding,
        flip,
        scale,
        innerOffset,
      },
    });

    return () => dispatch({ type: 'removeAxis', payload: { id: id || xY } });
  }, [
    dispatch,
    flip,
    id,
    innerOffset,
    max,
    min,
    paddingEnd,
    paddingStart,
    position,
    scale,
    xY,
  ]);

  const currentAxis = axisContext[id || xY];
  if (!currentAxis) return null;

  const childProps = {
    hidden,
    plotWidth,
    plotHeight,
    displayPrimaryGridLines,
    label,
    labelStyle,
    tickLabelStyle,
    position,
    tickLabelFormat,
    hiddenLine,
    primaryGridLineStyle,
    lineStyle,
    hiddenTicks,
    tickPosition,
    primaryTickLength,
    primaryTickStyle,
    innerOffset,
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

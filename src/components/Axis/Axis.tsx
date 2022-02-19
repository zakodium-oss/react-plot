import { ScaleLinear, ScaleLogarithmic, ScaleTime } from 'd3-scale';
import { CSSProperties, ReactNode, useEffect } from 'react';

import {
  usePlotContext,
  usePlotDispatchContext,
} from '../../contexts/plotContext';
import { Position, TickLabelFormat, TickPosition } from '../../types';
import { getInnerOffset } from '../../utils/axis';

import LinearAxis from './LinearAxis';
import LogAxis from './LogAxis';
import TimeAxis from './TimeAxis';

export interface AxisProps {
  id?: string;

  position: Position;

  min?: number;
  max?: number;

  paddingStart?: number | string;
  paddingEnd?: number | string;

  flip?: boolean;
  scale?: 'linear' | 'log' | 'time';

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
  /**
   * With time scale the default values is d3's smart tickFormat
   * With other types of scales the default is converting the value to a string
   */
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
  paddingStart = 0,
  paddingEnd = 0,
  flip = false,
  scale = 'linear',

  // children props
  label,
  displayPrimaryGridLines = false,
  labelStyle,
  hidden = false,
  tickLabelStyle,
  tickLabelFormat = scale === 'time' ? undefined : (value) => String(value),
  hiddenLine = false,
  lineStyle,
  primaryGridLineStyle,
  hiddenTicks = false,
  tickPosition = 'outer',
  primaryTickLength = 5,
  primaryTickStyle,
  secondaryTickLength = 3,
  secondaryTickStyle,
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
    dispatch({
      type: 'newAxis',
      payload: {
        id: id || xY,
        position,
        min,
        max,
        paddingStart,
        paddingEnd,
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
    secondaryTickLength,
    secondaryTickStyle,
  };

  if (scale === 'linear') {
    return (
      <LinearAxis
        {...childProps}
        scale={currentAxis.scale as ScaleLinear<number, number>}
      />
    );
  }
  if (scale === 'time') {
    return (
      <TimeAxis
        {...childProps}
        scale={currentAxis.scale as ScaleTime<number, number>}
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

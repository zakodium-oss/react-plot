import { ScaleLinear, ScaleLogarithmic, ScaleTime } from 'd3-scale';
import { CSSProperties, ReactNode, useEffect } from 'react';

import {
  usePlotContext,
  usePlotDispatchContext,
} from '../../contexts/plotContext';
import {
  Position,
  ScalarValue,
  TickLabelFormat,
  TickPosition,
} from '../../types';
import { getInnerOffset } from '../../utils/axis';

import LinearAxis from './LinearAxis';
import LogAxis from './LogAxis';
import TimeAxis from './TimeAxis';

export type AxisScale = 'linear' | 'log' | 'time';

export interface AxisProps {
  id?: string;

  position: Position;

  min?: number;
  max?: number;

  paddingStart?: ScalarValue;
  paddingEnd?: ScalarValue;

  flip?: boolean;
  scale?: AxisScale;

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
  tickLabelFormat?: TickLabelFormat | TickLabelFormat<Date>;
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
  primaryGridLineStyle,
  displaySecondaryGridLines,
  secondaryGridLineStyle,
  labelStyle,
  hidden = false,
  tickLabelStyle,
  tickLabelFormat = scale === 'time' ? undefined : String,
  hiddenLine = false,
  lineStyle,
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
  const axisId = id || xY;

  const innerOffset = getInnerOffset(
    hidden,
    hiddenTicks,
    tickPosition,
    primaryTickLength,
  );

  useEffect(() => {
    dispatch({
      type: 'addAxis',
      payload: {
        id: axisId,
        position,
        min,
        max,
        paddingStart,
        paddingEnd,
        flip,
        scale,
        innerOffset,
        tickLabelFormat,
      },
    });

    return () => dispatch({ type: 'removeAxis', payload: { id: axisId } });
  }, [
    dispatch,
    flip,
    innerOffset,
    max,
    min,
    paddingEnd,
    paddingStart,
    position,
    scale,
    axisId,
    tickLabelFormat,
  ]);

  const currentAxis = axisContext[axisId];
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
    hiddenLine,
    primaryGridLineStyle,
    displaySecondaryGridLines,
    secondaryGridLineStyle,
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
        tickLabelFormat={tickLabelFormat as TickLabelFormat}
        scale={currentAxis.scale as ScaleLinear<number, number>}
      />
    );
  } else if (scale === 'time') {
    return (
      <TimeAxis
        {...childProps}
        tickLabelFormat={tickLabelFormat as TickLabelFormat<Date>}
        scale={currentAxis.scale as ScaleTime<number, number>}
      />
    );
  } else {
    return (
      <LogAxis
        {...childProps}
        tickLabelFormat={tickLabelFormat as TickLabelFormat}
        scale={currentAxis.scale as ScaleLogarithmic<number, number>}
      />
    );
  }
}

import { ScaleLinear, ScaleLogarithmic } from 'd3-scale';
import { CSSProperties, ReactNode, useEffect } from 'react';

import { usePlotContext, usePlotDispatchContext } from '../../plotContext';
import { Position } from '../../types';

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
  tickPosition?: 'inner' | 'outer' | 'center';
  // TODO: Precise this.
  tickLabelFormat?: () => string;
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
}: AxisProps) {
  const dispatch = usePlotDispatchContext();
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

  const childProps = {
    hidden,
    plotWidth,
    plotHeight,
    displayPrimaryGridLines,
    label,
    labelStyle,
    tickLabelStyle,
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

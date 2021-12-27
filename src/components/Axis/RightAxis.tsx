import { useMemo } from 'react';

import { usePlotContext } from '../../hooks';
import type { AxisChildProps } from '../../types';
import VerticalText from '../VerticalText';

import { Ticks } from './Ticks';

export default function RightAxis({
  id,
  hidden = false,
  label,
  labelStyle,
  tickStyle,
  hiddenTicks = false,
  tickEmbedded,
  tickLength,
  hiddenSecondaryTicks,
}: AxisChildProps) {
  const { axisContext, plotWidth, plotHeight } = usePlotContext();

  // Calculates the main axis values
  const { scale, scientific } = axisContext[id] || {};
  const ticks: number[] = useMemo(() => scale?.ticks() || [], [scale]);
  const range = scale?.range() || [0, 0];

  const tickDirection = tickEmbedded ? -1 : 1;
  const tickLen = tickDirection * tickLength;
  const tickTextPosition = tickEmbedded ? 8 : 8 + tickLen;
  return (
    <g className="axis">
      {!hidden && (
        <g className="ticks" transform={`translate(${plotWidth} 0)`}>
          <line y1={range[0]} y2={range[1]} stroke="black" />
          <Ticks
            scientific={scientific}
            scale={scale}
            hidden={hiddenTicks}
            primaryTicks={ticks}
            style={tickStyle}
            hiddenSecondaryTicks={hiddenSecondaryTicks}
            anchor="begin"
            getPositions={(y) => ({
              line: { x2: tickLen, y1: y, y2: y },
              text: { x1: tickTextPosition, y1: y },
            })}
          />
        </g>
      )}
      {label && !hidden && (
        <VerticalText
          label={label}
          dy={0}
          style={labelStyle}
          transform={`translate(${plotWidth + (scientific ? 14 : 0)}, ${
            plotHeight / 2
          })`}
        />
      )}
    </g>
  );
}

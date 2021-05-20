import { useMemo } from 'react';

import { usePlotContext } from '../../hooks';
import type { AxisChildProps } from '../../types';
import { calculateTicksNumber } from '../../utils';

import { Ticks } from './Ticks';

export default function TopAxis({
  id,
  hidden = false,
  label,
  labelSpace,
  labelStyle,
  fontSize,
  tickStyle,
  hiddenTicks = false,
  tickEmbedded,
  tickLength,
  hiddenSecondaryTicks,
}: AxisChildProps) {
  const { axisContext, plotWidth } = usePlotContext();

  // Calculates the main axis values
  const { scale, scientific } = axisContext[id] || {};
  const ticks: number[] = useMemo(() => {
    const ticksNumber = calculateTicksNumber(
      plotWidth,
      scientific,
      scale?.domain(),
    );
    return scale?.ticks(ticksNumber) || [];
  }, [scale, scientific, plotWidth]);
  const range = scale?.range() || [0, 0];

  const tickDirection = tickEmbedded ? 1 : -1;
  const tickLen = tickDirection * tickLength;
  const tickTextPosition = tickEmbedded ? -12 : -12 + tickLen;
  return (
    <g className="axis">
      {!hidden && (
        <g className="ticks">
          <line x1={range[0]} x2={range[1]} stroke="black" />
          <Ticks
            scientific={scientific}
            scale={scale}
            anchor="middle"
            hidden={hiddenTicks}
            primaryTicks={ticks}
            style={tickStyle}
            hiddenSecondaryTicks={hiddenSecondaryTicks}
            getPositions={(val) => ({
              line: { x1: val, x2: val, y2: tickLen },
              text: { x1: val, y1: tickTextPosition },
            })}
          />
        </g>
      )}
      {label && !hidden && (
        <text
          x={plotWidth / 2}
          y={0 - labelSpace - fontSize}
          fontSize={fontSize}
          textAnchor="middle"
          style={labelStyle}
        >
          {label}
        </text>
      )}
    </g>
  );
}

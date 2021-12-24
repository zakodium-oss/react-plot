import { useMemo } from 'react';

import { usePlotContext } from '../../hooks';
import type { AxisChildProps } from '../../types';
import { calculateTicksNumber } from '../../utils';

import { Ticks } from './Ticks';


export default function BottomAxis({
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
  const { axisContext, plotWidth, plotHeight } = usePlotContext();

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

  const tickDirection = tickEmbedded ? -1 : 1;
  const tickLen = tickDirection * tickLength;
  const tickTextPosition = tickEmbedded ? 16 : 16 + tickLen;
  return (
    <g className="axis">
      {!hidden && (
        <g className="ticks" transform={`translate(0, ${plotHeight})`}>
          <line x1={range[0]} x2={range[1]} stroke="black" />
          <Ticks
            scientific={scientific}
            scale={scale}
            hidden={hiddenTicks}
            primaryTicks={ticks}
            style={tickStyle}
            hiddenSecondaryTicks={hiddenSecondaryTicks}
            anchor="middle"
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
          y={plotHeight + labelSpace + fontSize}
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

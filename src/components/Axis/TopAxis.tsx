import React, { useMemo } from 'react';

import { usePlotContext } from '../../hooks';
import type { AxisChildProps } from '../../types';
import { calculateTicksNumber } from '../../utils';

import { Ticks } from './Ticks';

export default function TopAxis({
  id,
  displayGridLines,
  hidden = false,
  label,
  labelSpace,
  labelStyle,
  fontSize,
  tickStyle,
  hiddenTicks = false,
  tickEmbedded,
  tickLength,
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

  // Create gridlines
  const gridlines = useMemo(() => {
    if (!displayGridLines || !scale) return null;
    return (
      <g className="gridLines">
        {ticks.map((val) => (
          <line
            key={val}
            x1={scale(val)}
            x2={scale(val)}
            y1={plotHeight}
            y2="0"
            stroke="black"
            strokeDasharray="2,2"
            strokeOpacity={0.5}
          />
        ))}
      </g>
    );
  }, [displayGridLines, ticks, scale, plotHeight]);

  const tickDirection = tickEmbedded ? 1 : -1;
  const tickLen = tickDirection * tickLength;
  return (
    <g className="axis">
      {gridlines}
      {!hidden && (
        <g className="ticks">
          <line x1={range[0]} x2={range[1]} stroke="black" />
          <Ticks
            scientific={scientific}
            scale={scale}
            anchor="middle"
            hidden={hiddenTicks}
            ticks={ticks}
            style={tickStyle}
            getPositions={(val) => ({
              line: { x1: val, x2: val, y2: tickLen },
              text: { x1: val, y1: -12 },
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

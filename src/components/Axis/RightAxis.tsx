import React, { useMemo } from 'react';

import { usePlotContext } from '../../hooks';
import type { AxisChildProps } from '../../types';
import VerticalText from '../VerticalText';

import { Ticks } from './Ticks';

export default function RightAxis({
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
  secondaryTicksHidden,
}: AxisChildProps) {
  const { axisContext, plotWidth, plotHeight } = usePlotContext();

  // Calculates the main axis values
  const { scale, scientific } = axisContext[id] || {};
  const ticks: number[] = useMemo(() => scale?.ticks() || [], [scale]);
  const range = scale?.range() || [0, 0];

  // Create gridlines
  const gridlines = useMemo(() => {
    if (!displayGridLines || !scale) return null;
    return (
      <g className="gridLines">
        {ticks.map((val) => (
          <line
            key={val}
            x1="0"
            x2={plotWidth}
            y1={scale(val)}
            y2={scale(val)}
            stroke="black"
            strokeDasharray="2,2"
            strokeOpacity={0.5}
          />
        ))}
      </g>
    );
  }, [displayGridLines, ticks, scale, plotWidth]);

  const tickDirection = tickEmbedded ? -1 : 1;
  const tickLen = tickDirection * tickLength;
  return (
    <g className="axis">
      {gridlines}
      {!hidden && (
        <g className="ticks" transform={`translate(${plotWidth} 0)`}>
          <line y1={range[0]} y2={range[1]} stroke="black" />
          <Ticks
            scientific={scientific}
            scale={scale}
            hidden={hiddenTicks}
            ticks={ticks}
            style={tickStyle}
            secondaryTicksHidden={secondaryTicksHidden}
            anchor="begin"
            getPositions={(y) => ({
              line: { x2: tickLen, y1: y, y2: y },
              text: { x1: 10, y1: y },
            })}
          />
        </g>
      )}
      {label && !hidden && (
        <VerticalText
          label={label}
          dy={fontSize}
          fontSize={fontSize}
          style={labelStyle}
          transform={`translate(${
            plotWidth + fontSize + labelSpace + (scientific ? 14 : 0)
          }, ${plotHeight / 2})`}
        />
      )}
    </g>
  );
}

import { scaleLog } from 'd3-scale';
import { useMemo, useRef } from 'react';
import { useLogTicks } from 'react-d3-utils';

import { usePlotContext } from '../../hooks';
import type { AxisChildProps, TickType } from '../../types';

import { TicksLog } from './TicksLog';

export default function TopLogAxis({
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
  hiddenSecondaryTicks,
}: AxisChildProps) {
  const { axisContext, plotWidth, plotHeight } = usePlotContext();

  // Calculates the main axis values
  const { scale = scaleLog(), scientific } = axisContext[id] || {};
  const groupRef = useRef<SVGGElement>(null);
  const tickFormat = useMemo(
    () => (scientific ? (x: number) => x.toExponential(2) : undefined),
    [scientific],
  );
  const ticks: TickType[] = useLogTicks(scale, 'vertical', groupRef, {
    tickFormat,
  });
  const range = scale?.range() || [0, 0];

  // Create gridlines
  const gridlines = useMemo(() => {
    if (!displayGridLines || !scale) return null;
    return (
      <g className="gridLines">
        {ticks.map(({ position }) => (
          <line
            key={position}
            x1={position}
            x2={position}
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
  const tickTextPosition = tickEmbedded ? -12 : -12 + tickLen;
  return (
    <g className="axis">
      {gridlines}
      {!hidden && (
        <g className="ticks">
          <line x1={range[0]} x2={range[1]} stroke="black" />
          <TicksLog
            anchor="middle"
            hidden={hiddenTicks}
            ticks={ticks}
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

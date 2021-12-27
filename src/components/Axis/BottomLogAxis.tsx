import { scaleLog } from 'd3-scale';
import { useMemo, useRef } from 'react';
import { useLogTicks } from 'react-d3-utils';

import { usePlotContext } from '../../hooks';
import type { AxisChildProps, TickType } from '../../types';

import { TicksLog } from './TicksLog';

export default function BottomLogAxis({
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

  const tickDirection = tickEmbedded ? -1 : 1;
  const tickLen = tickDirection * tickLength;
  const tickTextPosition = tickEmbedded ? 16 : 16 + tickLen;
  return (
    <g className="axis">
      {!hidden && (
        <g className="ticks" transform={`translate(0, ${plotHeight})`}>
          <line x1={range[0]} x2={range[1]} stroke="black" />
          <TicksLog
            hidden={hiddenTicks}
            ticks={ticks}
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
          y={plotHeight}
          textAnchor="middle"
          style={labelStyle}
        >
          {label}
        </text>
      )}
    </g>
  );
}

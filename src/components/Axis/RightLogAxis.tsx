import { scaleLog } from 'd3-scale';
import { useMemo, useRef } from 'react';
import { useLogTicks } from 'react-d3-utils';

import { usePlotContext } from '../../hooks';
import type { AxisChildProps, TickType } from '../../types';
import VerticalText from '../VerticalText';

import { TicksLog } from './TicksLog';

export default function RightLogAxis({
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
  const tickTextPosition = tickEmbedded ? 8 : 8 + tickLen;
  return (
    <g ref={groupRef} className="axis">
      {!hidden && (
        <g className="ticks" transform={`translate(${plotWidth} 0)`}>
          <line y1={range[0]} y2={range[1]} stroke="black" />
          <TicksLog
            hidden={hiddenTicks}
            ticks={ticks}
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

import { scaleLog } from 'd3-scale';
import { useMemo, useRef } from 'react';
import { useLogTicks } from 'react-d3-utils';

import { usePlotContext } from '../../hooks';
import VerticalText from '../VerticalText';

import { TicksLog } from './TicksLog';

import type { AxisChildProps, TickType } from '../../types';

export default function LeftLogAxis({
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
  const { axisContext, plotHeight } = usePlotContext();

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

  const tickDirection = tickEmbedded ? 1 : -1;
  const tickLen = tickDirection * tickLength;
  const tickTextPosition = tickEmbedded ? -8 : -8 + tickLen;
  return (
    <g className="axis">
      {!hidden && (
        <g ref={groupRef} className="ticks">
          <line y1={range[0]} y2={range[1]} stroke="black" />
          <TicksLog
            hidden={hiddenTicks}
            ticks={ticks}
            style={tickStyle}
            hiddenSecondaryTicks={hiddenSecondaryTicks}
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
          transform={`translate(${
            0 - fontSize - labelSpace - (scientific ? 14 : 0)
          }, ${plotHeight / 2})`}
          dy={fontSize}
          fontSize={fontSize}
          style={labelStyle}
        />
      )}
    </g>
  );
}

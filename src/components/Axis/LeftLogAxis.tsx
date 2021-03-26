import { scaleLog } from 'd3-scale';
import { useMemo, useRef } from 'react';
import { useLogTicks } from 'react-d3-utils';

import { usePlotContext } from '../../hooks';
import type { AxisChildProps, TickType } from '../../types';
import VerticalText from '../VerticalText';

import { TicksLog } from './TicksLog';

export default function LeftLogAxis({
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
  const { axisContext, plotHeight, plotWidth } = usePlotContext();

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
            x1="0"
            x2={plotWidth}
            y1={position}
            y2={position}
            stroke="black"
            strokeDasharray="2,2"
            strokeOpacity={0.5}
          />
        ))}
      </g>
    );
  }, [displayGridLines, ticks, scale, plotWidth]);

  const tickDirection = tickEmbedded ? 1 : -1;
  const tickLen = tickDirection * tickLength;
  const tickTextPosition = tickEmbedded ? -8 : -8 + tickLen;
  return (
    <g className="axis">
      {gridlines}
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

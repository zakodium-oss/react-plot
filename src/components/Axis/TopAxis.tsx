import React, { useMemo } from 'react';

import { usePlotContext } from '../../hooks';
import type { AxisChildProps } from '../../types';

export default function TopAxis({
  id,
  showGridLines,
  display,
  label,
  labelSpace,
  labelStyle,
  fontSize,
  tickStyle,
}: AxisChildProps) {
  const {
    axisContext,
    plotWidth,
    top,
    bottom,
    left,
    height,
  } = usePlotContext();

  // Calculates the main axis values
  const { scale, scientific } = axisContext[id] || {};
  const ticks: number[] = useMemo(
    () => scale?.ticks(scientific ? plotWidth / 50 : undefined) || [],
    [scale, scientific, plotWidth],
  );
  const range = scale?.range() || [0, 0];

  // Create gridlines
  const gridlines = useMemo(() => {
    if (!showGridLines || !scale) return null;
    return (
      <g className="gridLines">
        {ticks.map((val) => (
          <line
            key={val}
            x1={scale(val)}
            x2={scale(val)}
            y1={height - bottom}
            y2={top}
            stroke="black"
            strokeDasharray="2,2"
            strokeOpacity={0.5}
          />
        ))}
      </g>
    );
  }, [showGridLines, ticks, top, scale, height, bottom]);

  return (
    <g className="axis">
      {gridlines}
      {display && (
        <g className="ticks" transform={`translate(0, ${top})`}>
          <line x1={range[0]} x2={range[1]} stroke="black" />
          {ticks.map((val) => {
            const x = scale(val);
            return (
              <g key={val}>
                <line x1={x} x2={x} y2={-6} stroke="black" />
                <text
                  x={x}
                  y={-12}
                  textAnchor="middle"
                  style={{ userSelect: 'none', ...tickStyle }}
                >
                  {scientific ? val.toExponential(2) : val}
                </text>
              </g>
            );
          })}
        </g>
      )}
      {label && display && (
        <text
          x={plotWidth / 2 + left}
          y={top - labelSpace - fontSize}
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

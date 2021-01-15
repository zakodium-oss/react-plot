import React, { useMemo } from 'react';

import { usePlotContext } from '../../hooks';
import type { AxisChildProps } from '../../types';

const space = 20;

export default function LeftAxis({
  id,
  showGridLines,
  display,
  label,
  labelSpace,
  labelStyle,
  fontSize,
  tickStyle,
}: AxisChildProps) {
  const { axisContext, plotHeight, top, left, width, right } = usePlotContext();

  // Calculates the main axis values
  const { scale, scientific } = axisContext[id] || {};
  const ticks: number[] = useMemo(() => scale?.ticks() || [], [scale]);
  const range = scale?.range() || [0, 0];

  // Create gridlines
  const gridlines = useMemo(() => {
    if (!showGridLines || !scale) return null;
    return (
      <g className="gridLines">
        {ticks.map((val) => (
          <line
            key={val}
            x1={left}
            x2={width - right}
            y1={scale(val)}
            y2={scale(val)}
            stroke="black"
            strokeDasharray="2,2"
            strokeOpacity={0.5}
          />
        ))}
      </g>
    );
  }, [showGridLines, ticks, scale, left, width, right]);

  return (
    <g className="axis">
      {gridlines}
      {display && (
        <g className="ticks" transform={`translate(${left}, 0)`}>
          <line y1={range[0]} y2={range[1]} stroke="black" />
          {ticks.map((val) => {
            const y = scale(val);
            return (
              <g key={val}>
                <line x2={-6} y1={y} y2={y} stroke="black" />
                <text
                  x={-8}
                  y={y}
                  textAnchor="end"
                  alignmentBaseline="middle"
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
          y={-space}
          transform={`translate(${
            left - fontSize - labelSpace - (scientific ? 14 : 0)
          }, ${top + plotHeight / 2})rotate(-90)`}
          dy={fontSize}
          textAnchor="middle"
          fontSize={fontSize}
          style={labelStyle}
        >
          {label}
        </text>
      )}
    </g>
  );
}

import React, { useMemo } from 'react';

import { usePlotContext } from '../../hooks';
import type { AxisChildProps } from '../../types';

export default function BottomAxis({
  showGridLines,
  display,
  label,
  labelSpace,
  labelStyle,
  fontSize,
  tickStyle,
}: AxisChildProps) {
  const {
    xScale,
    xScientific,
    plotWidth,
    top,
    bottom,
    left,
    height,
  } = usePlotContext();
  // Calculates the main axis values
  const ticks: number[] = useMemo(
    () => xScale?.ticks(xScientific ? plotWidth / 50 : undefined) || [],
    [xScale, xScientific, plotWidth],
  );
  const range = xScale?.range() || [0, 0];

  // Create gridlines
  const gridlines = useMemo(() => {
    if (!showGridLines || !xScale) return null;
    return (
      <g className="gridLines">
        {ticks.map((val) => (
          <line
            key={val}
            x1={xScale(val)}
            x2={xScale(val)}
            y1={height - bottom}
            y2={top}
            stroke="black"
            strokeDasharray="2,2"
            strokeOpacity={0.5}
          />
        ))}
      </g>
    );
  }, [showGridLines, ticks, top, xScale, height, bottom]);

  return (
    <g className="axis">
      {gridlines}
      {display && (
        <g className="ticks" transform={`translate(0, ${height - bottom})`}>
          <line x1={range[0]} x2={range[1]} stroke="black" />
          {ticks.map((val) => {
            const x = xScale(val);
            return (
              <g key={val}>
                <line x1={x} x2={x} y2={6} stroke="black" />
                <text
                  x={x}
                  y={24}
                  textAnchor="middle"
                  style={{ userSelect: 'none', ...tickStyle }}
                >
                  {xScientific ? val.toExponential(2) : val}
                </text>
              </g>
            );
          })}
        </g>
      )}
      {label && display && (
        <text
          x={plotWidth / 2 + left}
          y={height - bottom + labelSpace + fontSize}
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

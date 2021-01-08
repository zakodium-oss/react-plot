import React, { useMemo } from 'react';

import { usePlotContext } from '../../hooks';
import type { AxisChildProps } from '../../types';

export default function RightAxis({
  showGridLines,
  display,
  label,
  labelSpace,
  labelStyle,
  fontSize,
  tickStyle,
}: AxisChildProps) {
  const {
    yScale,
    yScientific,
    plotHeight,
    top,
    left,
    width,
    right,
  } = usePlotContext();
  // Calculates the main axis values
  const ticks: number[] = useMemo(() => yScale?.ticks() || [], [yScale]);
  const range = yScale?.range() || [0, 0];

  // Create gridlines
  const gridlines = useMemo(() => {
    if (!showGridLines || !yScale) return null;
    return (
      <g className="gridLines">
        {ticks.map((val) => (
          <line
            key={val}
            x1={left}
            x2={width - right}
            y1={yScale(val)}
            y2={yScale(val)}
            stroke="black"
            strokeDasharray="2,2"
            strokeOpacity={0.5}
          />
        ))}
      </g>
    );
  }, [showGridLines, ticks, yScale, left, width, right]);

  return (
    <g className="axis">
      {gridlines}
      {display && (
        <g className="ticks" transform={`translate(${width - right}, 0)`}>
          <line y1={range[0]} y2={range[1]} stroke="black" />
          {ticks.map((val) => {
            const y = yScale(val);
            return (
              <g key={val}>
                <line x2={6} y1={y} y2={y} stroke="black" />
                <text
                  x={10}
                  y={y}
                  textAnchor="start"
                  alignmentBaseline="middle"
                  style={{ userSelect: 'none', ...tickStyle }}
                >
                  {yScientific ? val.toExponential(2) : val}
                </text>
              </g>
            );
          })}
        </g>
      )}
      {label && display && (
        <text
          transform={`translate(${
            width - right + fontSize + labelSpace + (yScientific ? 14 : 0)
          }, ${top + plotHeight / 2})rotate(90)`}
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

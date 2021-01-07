import React, { useEffect, useMemo } from 'react';

import { useDispatchContext, usePlotContext } from '../hooks';
import type { AxisProps } from '../types';

export default function Axis({
  label,
  fontSize = 16,
  labelSpace = 24,
  showGridLines,
  labelStyle,
  min,
  max,
  padding,
  display = true,
  flip = false,
  tickStyle = {},
}: AxisProps) {
  const {
    xScale,
    xScientific,
    plotWidth,
    top,
    bottom,
    left,
    height,
    width,
  } = usePlotContext();
  const { dispatch } = useDispatchContext();

  // Send min and max to main state
  useEffect(() => {
    dispatch({ type: 'minMax', value: { min, max, axis: 'x' } });
  }, [dispatch, min, max]);

  // Send flip to main state
  useEffect(() => {
    dispatch({ type: 'flip', value: { flip, axis: 'x' } });
  }, [dispatch, flip]);

  // Send paddings to main state
  useEffect(() => {
    const [paddingLeft = 0, paddingRight = 0] = padding || [];
    if (paddingLeft < 0 || paddingLeft > 1) {
      throw new Error(`Padding left (${paddingLeft}) is not between 0 and 1`);
    }
    if (paddingRight < 0 || paddingRight > 1) {
      throw new Error(`Padding right (${paddingRight}) is not between 0 and 1`);
    }

    dispatch({
      type: 'xPadding',
      value: { min: paddingLeft, max: paddingRight },
    });
  }, [dispatch, padding]);

  // Calculates the main axis values
  const ticks: number[] = useMemo(
    () => xScale?.nice().ticks(width / 80) || [],
    [xScale, width],
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
                <text x={x} y={24} textAnchor="middle" style={tickStyle}>
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

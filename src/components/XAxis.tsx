import { axisBottom } from 'd3-axis';
import { select } from 'd3-selection';
import React, { useEffect, useRef } from 'react';

import { usePlotContext } from '../hooks';
import type { AxisProps } from '../types';

const XAxis = ({
  label,
  fontSize = 16,
  labelSpace = 20,
  showGridLines,
  labelStyle,
  tickFormat,
}: AxisProps) => {
  const axisRef = useRef(null);
  const {
    xScale,
    plotHeight,
    plotWidth,
    bottom,
    left,
    height,
    width,
  } = usePlotContext();

  useEffect(() => {
    if (axisRef?.current && xScale) {
      const axis = axisBottom(xScale);
      if (showGridLines) {
        axis.tickSizeInner(-plotHeight);
      }
      if (tickFormat) {
        axis.tickFormat(tickFormat);
      }

      select(axisRef.current)
        .call(axis)
        .call((g) => {
          g.selectAll('.tick line')
            .attr('stroke-opacity', showGridLines ? 0.5 : 1)
            .attr('stroke-dasharray', showGridLines ? '2,2' : '0');
          g.selectAll('.tick text').attr(
            'transform',
            `translate(0,${showGridLines ? 6 : 0})`,
          );
        });
    }
  }, [axisRef, xScale, plotHeight, height, width, showGridLines, tickFormat]);

  return (
    <>
      <g ref={axisRef} x={0} y={height - bottom} />
      {label && (
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
    </>
  );
};

export default XAxis;

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
  const { xScale, margin, height, width } = usePlotContext();

  useEffect(() => {
    if (axisRef?.current && xScale) {
      const axis = axisBottom(xScale);
      if (showGridLines) {
        axis.tickSizeInner((margin?.bottom || 0) + (margin?.top || 0) - height);
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
  }, [axisRef, xScale, margin, height, width, showGridLines, tickFormat]);

  return (
    <>
      <g ref={axisRef} x={0} y={height - (margin?.bottom || 0)} />
      {label && (
        <text
          x={
            (width - (margin?.left || 0) - (margin?.right || 0)) / 2 +
            (margin?.left || 0)
          }
          y={height - (margin?.bottom || 0) + labelSpace + fontSize}
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

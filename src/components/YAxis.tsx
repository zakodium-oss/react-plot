import { axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import React, { useEffect, useRef } from 'react';

import { usePlotContext } from '../hooks';
import type { AxisProps } from '../types';

const YAxis = ({
  label,
  fontSize = 16,
  showGridLines,
  labelStyle,
}: AxisProps) => {
  const axisRef = useRef(null);
  const { yScale, margin, height, width } = usePlotContext();

  useEffect(() => {
    if (axisRef?.current && yScale) {
      const axis = axisLeft(yScale);
      if (showGridLines) {
        axis.tickSizeInner((margin?.left || 0) + (margin?.right || 0) - width);
      }
      select(axisRef.current)
        .call(axis)
        .call((g) => {
          g.selectAll('.tick line')
            .attr('stroke-opacity', showGridLines ? 0.5 : 1)
            .attr('stroke-dasharray', showGridLines ? '2,2' : '0');
          g.selectAll('.tick text').attr(
            'transform',
            `translate(${showGridLines ? -6 : 0},0)`,
          );
        });
    }
  }, [axisRef, yScale, margin, width, showGridLines]);

  // Recomend bigger margin
  if ((margin?.bottom || 0) < fontSize + 30) {
    // eslint-disable-next-line no-console
    console.warn(`Your margin bottom should be at least ${fontSize + 30}`);
  }

  return (
    <>
      <g ref={axisRef} transform={`translate(${margin?.left || 0}, 0)`} />
      {label && (
        <text
          transform={`translate(${(margin?.left || 0) - fontSize - 30}, ${
            height / 2
          })rotate(-90)`}
          dy={fontSize}
          textAnchor="middle"
          fontSize={fontSize}
          style={labelStyle}
        >
          {label}
        </text>
      )}
    </>
  );
};

export default YAxis;

import { axisBottom } from 'd3-axis';
import { select } from 'd3-selection';
import React, { useLayoutEffect, useRef } from 'react';

import { usePlotContext } from '../hooks';
import type { AxisProps } from '../types';

const XAxis = ({ label, fontSize = 16, showTicks }: AxisProps) => {
  const axisRef = useRef(null);
  const { xScale, margin, height, width } = usePlotContext();

  useLayoutEffect(() => {
    if (axisRef?.current) {
      const axis = axisBottom(xScale);
      if (showTicks) {
        axis.tickSizeInner((margin?.bottom || 0) + (margin?.top || 0) - height);
      }

      select(axisRef.current)
        .call(axis)
        .call((g) => {
          g.selectAll('.tick line')
            .attr('stroke-opacity', showTicks ? 0.5 : 1)
            .attr('stroke-dasharray', showTicks ? '2,2' : '0');
          g.selectAll('.tick text').attr(
            'transform',
            `translate(0,${showTicks ? 6 : 0})`,
          );
        });
    }
  });

  // Recomend bigger margin
  if ((margin?.left || 0) < fontSize + 20) {
    // eslint-disable-next-line no-console
    console.warn(`Your margin left should be at least ${fontSize + 20}`);
  }

  return (
    <>
      <g
        ref={axisRef}
        transform={`translate(0, ${height - (margin?.bottom || 0)})`}
      />
      {label && (
        <text
          transform={`translate(${width / 2} ,${
            height - (margin?.bottom || 0) + 20 + fontSize
          })`}
          fontSize={fontSize}
          textAnchor="middle"
        >
          {label}
        </text>
      )}
    </>
  );
};

export default XAxis;

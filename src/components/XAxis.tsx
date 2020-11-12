import { axisBottom } from 'd3-axis';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import React, { useRef } from 'react';

import { usePlotContext } from '../hooks';
import type { AxisProps } from '../types';

const XAxis = ({ height, width, margin, label, fontSize = 16 }: AxisProps) => {
  const axisRef = useRef(null);
  const { xMin, xMax } = usePlotContext();
  if (axisRef?.current) {
    const xScale = scaleLinear()
      .domain([xMin, xMax])
      .range([margin?.left || 0, width - (margin?.right || 0)]);

    const axis = axisBottom(xScale);
    select(axisRef.current).call(axis);
  }

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

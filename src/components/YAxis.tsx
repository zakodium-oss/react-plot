import { axisLeft } from 'd3-axis';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import React, { useRef } from 'react';

import { usePlotContext } from '../hooks';
import type { AxisProps } from '../types';

const YAxis = ({ height, margin, label, fontSize = 16 }: AxisProps) => {
  const axisRef = useRef(null);
  const { yMin, yMax } = usePlotContext();
  if (axisRef?.current) {
    const yScale = scaleLinear()
      .domain([yMin, yMax])
      .range([height - (margin?.bottom || 0), margin?.top || 0]);
    const axis = axisLeft(yScale);
    select(axisRef.current).call(axis);
  }

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
        >
          {label}
        </text>
      )}
    </>
  );
};

export default YAxis;

import { axisBottom } from 'd3-axis';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import React, { useRef } from 'react';

import { usePlotContext } from '../hooks';
import type { AxisProps } from '../types';

const XAxis = ({ height, width, margin }: AxisProps) => {
  const axisRef = useRef(null);
  const { xMin, xMax } = usePlotContext();
  if (axisRef?.current) {
    const xScale = scaleLinear()
      .domain([xMin, xMax])
      .range([margin?.left || 0, width - (margin?.right || 0)]);

    const axis = axisBottom(xScale);
    select(axisRef.current).call(axis);
  }
  return (
    <g
      ref={axisRef}
      transform={`translate(0, ${height - (margin?.bottom || 0)})`}
    />
  );
};

export default XAxis;

import { axisLeft } from 'd3-axis';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import React, { useRef } from 'react';

import { usePlotContext } from '../hooks';
import type { AxisProps } from '../types';

const YAxis = ({ height, margin }: AxisProps) => {
  const axisRef = useRef(null);
  const { yMin, yMax } = usePlotContext();
  if (axisRef?.current) {
    const yScale = scaleLinear()
      .domain([yMin, yMax])
      .range([height - (margin?.bottom || 0), margin?.top || 0]);
    const axis = axisLeft(yScale);
    select(axisRef.current).call(axis);
  }
  return <g ref={axisRef} transform={`translate(${margin?.left || 0}, 0)`} />;
};

export default YAxis;

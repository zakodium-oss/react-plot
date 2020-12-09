import { axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import React, { useEffect, useRef } from 'react';

import { useDispatchContext, usePlotContext } from '../hooks';
import type { AxisProps } from '../types';

const YAxis = ({
  label,
  fontSize = 16,
  labelSpace = 30,
  showGridLines,
  labelStyle,
  min,
  max,
}: AxisProps) => {
  const axisRef = useRef(null);
  const {
    yScale,
    yScientific,
    plotHeight,
    plotWidth,
    left,
    top,
    width,
  } = usePlotContext();
  const { dispatch } = useDispatchContext();

  // Send min and max to main state
  useEffect(() => {
    dispatch({ type: 'yMinMax', value: { min, max } });
  }, [dispatch, min, max]);

  useEffect(() => {
    if (axisRef?.current && yScale) {
      const axis = axisLeft(yScale);

      if (showGridLines) {
        axis.tickSizeInner(-plotWidth);
      }
      if (yScientific) {
        axis.tickFormat((val) => val.toExponential(2));
      }

      select(axisRef.current)
        .call(axis)
        .call((g) => {
          g.selectAll('.tick line')
            .attr('stroke-opacity', showGridLines ? 0.5 : 1)
            .attr('stroke-dasharray', showGridLines ? '2,2' : '0');
          g.selectAll('.tick text')
            .attr('transform', `translate(${showGridLines ? -6 : 0},0)`)
            .style('user-select', 'none');
        });
    }
  }, [axisRef, yScale, plotWidth, width, showGridLines, yScientific]);

  return (
    <>
      <g ref={axisRef} transform={`translate(${left}, 0)`} />
      {label && (
        <text
          transform={`translate(${
            left - fontSize - labelSpace - (yScientific ? 14 : 0)
          }, ${top + plotHeight / 2})rotate(-90)`}
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

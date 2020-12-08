import { axisBottom } from 'd3-axis';
import { select } from 'd3-selection';
import React, { useEffect, useRef } from 'react';

import { useDispatchContext, usePlotContext } from '../hooks';
import type { AxisProps } from '../types';

const XAxis = ({
  label,
  fontSize = 16,
  labelSpace = 20,
  showGridLines,
  labelStyle,
  min,
  max,
}: AxisProps) => {
  const axisRef = useRef(null);
  const {
    xScale,
    xScientific,
    plotHeight,
    plotWidth,
    bottom,
    left,
    height,
    width,
  } = usePlotContext();
  const { dispatch } = useDispatchContext();

  // Send min and max to main state
  useEffect(() => {
    dispatch({ type: 'xMinMax', value: { min, max } });
  }, [dispatch, min, max]);

  useEffect(() => {
    if (axisRef?.current && xScale) {
      const axis = axisBottom(xScale);

      if (showGridLines) {
        axis.tickSizeInner(-plotHeight);
      }
      if (xScientific) {
        axis.tickFormat((val) => val.toExponential(2));
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

          if (xScientific) {
            g.selectAll('.tick:nth-child(odd) text').style('display', 'none');
          }
        });
    }
  }, [axisRef, xScale, plotHeight, height, width, showGridLines, xScientific]);

  return (
    <>
      <g ref={axisRef} transform={`translate(0, ${height - bottom})`} />
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

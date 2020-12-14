import { axisBottom } from 'd3-axis';
import { select } from 'd3-selection';
import React, { useEffect, useRef } from 'react';

import { useDispatchContext, usePlotContext } from '../hooks';
import type { XAxisProps } from '../types';

const XAxis = ({
  label,
  fontSize = 16,
  labelSpace = 20,
  showGridLines,
  labelStyle,
  min,
  max,
  paddingLeft = 0,
  paddingRight = 0,
  display = true,
  flip = false,
}: XAxisProps) => {
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

  // Send flip to main state
  useEffect(() => {
    dispatch({ type: 'flip', value: { flip, axis: 'x' } });
  }, [dispatch, flip]);

  // Send paddings to main state
  useEffect(() => {
    if (paddingLeft < 0 || paddingLeft > 1) {
      throw new Error(`Padding left (${paddingLeft}) is not between 0 and 1`);
    }
    if (paddingRight < 0 || paddingRight > 1) {
      throw new Error(`Padding right (${paddingRight}) is not between 0 and 1`);
    }

    dispatch({
      type: 'xPadding',
      value: { min: paddingLeft, max: paddingRight },
    });
  }, [dispatch, paddingLeft, paddingRight]);

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
            .attr('stroke-dasharray', showGridLines ? '2,2' : '0')
            .style('display', display || showGridLines ? 'inline' : 'none');
          g.selectAll('.tick text')
            .attr('transform', `translate(0,${showGridLines ? 6 : 0})`)
            .style('user-select', 'none')
            .style('display', display ? 'inline' : 'none');

          if (xScientific) {
            g.selectAll('.tick:nth-child(odd) text').style('display', 'none');
          }

          g.selectAll('path.domain').style(
            'display',
            display ? 'inline' : 'none',
          );
        });
    }
  }, [
    axisRef,
    xScale,
    plotHeight,
    height,
    width,
    showGridLines,
    xScientific,
    display,
  ]);

  return (
    <>
      <g ref={axisRef} transform={`translate(0, ${height - bottom})`} />
      {label && display && (
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

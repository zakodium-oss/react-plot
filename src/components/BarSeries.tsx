import React, { CSSProperties, useEffect, useState } from 'react';

import { usePlotContext } from '../hooks';
import { LineSeriesProps, SeriesPointType } from '../types';
import { getNextId, validateAxis } from '../utils';

import ScatterSeries from './ScatterSeries';
import { useLegend } from './legendsContext';

interface BarSeriesRenderProps {
  id: string;
  data: SeriesPointType[];
  xAxis: string;
  yAxis: string;
  lineStyle: CSSProperties;
}

export default function BarSeries(props: LineSeriesProps) {
  const [, legendDispatch] = useLegend();
  const { colorScaler } = usePlotContext();
  const [id] = useState(() => props.groupId || `series-${getNextId()}`);
  const { lineStyle = {}, displayMarker = false, ...otherProps } = props;
  const lineProps = {
    id,
    data: props.data,
    xAxis: props.xAxis || 'x',
    yAxis: props.yAxis || 'y',
    lineStyle,
  };

  useEffect(() => {
    legendDispatch({
      type: 'ADD_LEGEND_LABEL',
      payload: {
        label: otherProps.label,

        colorLine: lineStyle?.stroke
          ? lineStyle?.stroke.toString()
          : colorScaler(id),

        shape: {
          color: otherProps.markerStyle?.fill.toString() || colorScaler(id),
          figure: otherProps.markerShape || 'circle',
          hidden: !displayMarker,
        },
      },
    });
  }, [
    colorScaler,
    displayMarker,
    id,
    legendDispatch,
    lineStyle,
    lineStyle?.stroke,
    otherProps.label,
    otherProps.markerShape,
    otherProps.markerStyle,
    otherProps.markerStyle?.fill,
  ]);

  return (
    <g>
      {props.hidden ? null : <BarSeriesRender {...lineProps} />}
      <ScatterSeries
        {...otherProps}
        hidden={!displayMarker || props.hidden}
        groupId={id}
      />
    </g>
  );
}

function BarSeriesRender({
  id,
  data,
  xAxis,
  yAxis,
  lineStyle,
}: BarSeriesRenderProps) {
  // Get scales from context
  const { axisContext, colorScaler } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, xAxis, yAxis);

  // calculates the path to display
  const color = colorScaler(id);
  if ([xScale, yScale].includes(undefined)) return null;

  // default style
  const style = {
    stroke: color,
    strokeWidth: 2,
    ...lineStyle,
  };

  return (
    <g>
      {data.map(({ x, y }) => (
        <line
          style={style}
          key={`${x}-${y}`}
          x1={xScale(x)}
          x2={xScale(x)}
          y1={yScale(y)}
          y2={yScale(0)}
        />
      ))}
    </g>
  );
}

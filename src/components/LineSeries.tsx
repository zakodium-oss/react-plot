import { line } from 'd3-shape';
import React, { CSSProperties, useMemo, useState } from 'react';

import { usePlotContext } from '../hooks';
import type { LineSeriesProps, Series } from '../types';
import { getNextId, validateAxis } from '../utils';

import ScatterSeries from './ScatterSeries';

interface LineSeriesRenderProps {
  id: string;
  data: Series[];
  xAxis: string;
  yAxis: string;
  lineStyle: CSSProperties;
}

export default function LineSeries(props: LineSeriesProps) {
  const [id] = useState(() => props.groupId || `series-${getNextId()}`);
  const { lineStyle = {}, displayMarker = false, ...otherProps } = props;
  const lineProps = {
    id,
    data: props.data,
    xAxis: props.xAxis || 'x',
    yAxis: props.yAxis || 'y',
    lineStyle,
  };

  return (
    <g>
      {props.hidden ? null : <LineSeriesRender {...lineProps} />}
      <ScatterSeries
        {...otherProps}
        hidden={!displayMarker || props.hidden}
        groupId={id}
      />
    </g>
  );
}

function LineSeriesRender({
  id,
  data,
  xAxis,
  yAxis,
  lineStyle,
}: LineSeriesRenderProps) {
  // Get scales from context
  const { axisContext, colorScaler } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, xAxis, yAxis);

  // calculates the path to display
  const color = colorScaler(id);
  const path = useMemo(() => {
    if ([xScale, yScale].includes(undefined)) return null;

    // Calculate line from D3
    const lineGenerator = line<Series>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    return lineGenerator(data);
  }, [data, xScale, yScale]);
  if (!path) return null;

  // default style
  const style = {
    stroke: color,
    strokeWidth: 2,
    ...lineStyle,
  };

  return <path style={style} d={path} fill="none" />;
}

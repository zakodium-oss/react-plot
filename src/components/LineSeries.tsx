import { extent } from 'd3-array';
import { line } from 'd3-shape';
import React, { CSSProperties, useEffect } from 'react';

import { useDispatchContext, usePlotContext } from '../hooks';
import type { LineSeriesProps, Series } from '../types';

interface LineSeriesRenderProps {
  data: Series[];
  lineStyle?: CSSProperties;
}

export default function LineSeries(props: LineSeriesProps) {
  const { data, label, ...otherProps } = props;
  // Update plot context with data description
  const { dispatch } = useDispatchContext();
  useEffect(() => {
    const [xMin, xMax] = extent(data, (d) => d.x);
    const [yMin, yMax] = extent(data, (d) => d.y);
    dispatch({ type: 'newData', value: { xMin, xMax, yMin, yMax, label } });
  }, [data, label, dispatch]);

  // Render stateless plot component
  return <LineSeriesRender {...otherProps} data={data} />;
}

function LineSeriesRender({ data, lineStyle }: LineSeriesRenderProps) {
  // Get scales from context
  const { xScale, yScale } = usePlotContext();
  if ([xScale, yScale].includes(null)) return null;

  // Calculate line from D3
  const plotLine = line<Series>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y));
  return <path style={lineStyle} d={plotLine(data)} fill="none" />;
}

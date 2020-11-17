import { extent } from 'd3-array';
import { line } from 'd3-shape';
import React, { CSSProperties, useEffect, useMemo } from 'react';

import { useDispatchContext, usePlotContext } from '../hooks';
import type { LineSeriesProps, Series } from '../types';

interface LineSeriesRenderProps {
  data: Series;
  lineStyle?: CSSProperties;
}

export default function LineSeries(props: LineSeriesProps) {
  const { data, label, ...otherProps } = props;
  // Update plot context with data description
  const { dispatch } = useDispatchContext();
  useEffect(() => {
    const [xMin, xMax] = extent(data.x);
    const [yMin, yMax] = extent(data.y);
    dispatch({ type: 'newData', value: { xMin, xMax, yMin, yMax, label } });
  }, [data, label, dispatch]);

  // Render stateless plot component
  return <LineSeriesRender {...otherProps} data={data} />;
}

function LineSeriesRender({ data, lineStyle }: LineSeriesRenderProps) {
  // Get scales from context
  const { xScale, yScale } = usePlotContext();
  const path = useMemo(() => {
    if ([xScale, yScale].includes(null) || data.x.length !== data.y.length) {
      return null;
    }

    // Format data for line function generator
    let series = [];
    for (let index = 0; index < data.x.length; index++) {
      const x = xScale(data.x[index]);
      const y = yScale(data.y[index]);
      series.push({ x, y });
    }

    // Calculate line from D3
    const lineGenerator = line<{ x: number; y: number }>()
      .x((d) => d.x)
      .y((d) => d.y);
    return lineGenerator(series);
  }, [xScale, yScale, data]);
  if ([xScale, yScale].includes(null)) return null;

  return <path style={lineStyle} d={path} fill="none" />;
}

import { extent } from 'd3-array';
import { line } from 'd3-shape';
import React, { CSSProperties, useEffect, useMemo, useState } from 'react';

import { useDispatchContext, usePlotContext } from '../hooks';
import type { LineSeriesProps, Series } from '../types';
import { randomString } from '../utils';

interface LineSeriesRenderProps {
  data: Series;
  lineStyle?: CSSProperties;
}

export default function LineSeries(props: LineSeriesProps) {
  const [id] = useState(randomString(4));

  const { data, label, ...otherProps } = props;

  // Update plot context with data description
  const { dispatch } = useDispatchContext();
  useEffect(() => {
    const [xMin, xMax] = extent(data.x);
    const [yMin, yMax] = extent(data.y);
    dispatch({ type: 'newData', value: { id, xMin, xMax, yMin, yMax, label } });

    // Delete information on unmount
    return () => dispatch({ type: 'removeData', value: { id } });
  }, [data, label, dispatch, id]);

  // Render stateless plot component
  return <LineSeriesRender {...otherProps} data={data} />;
}

function LineSeriesRender({ data, lineStyle }: LineSeriesRenderProps) {
  // Get scales from context
  const { xScale, yScale } = usePlotContext();

  // calculates the path to display
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

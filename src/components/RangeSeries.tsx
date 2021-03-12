import { extent } from 'd3-array';
import { area } from 'd3-shape';
import { CSSProperties, useEffect, useMemo, useState } from 'react';

import { useDispatchContext, usePlotContext } from '../hooks';
import type { RangeSeriesProps, SeriesRangePointType } from '../types';
import { getNextId, validateAxis } from '../utils';

interface RangeSeriesRenderProps {
  data: SeriesRangePointType[];
  xAxis: string;
  yAxis: string;
  lineStyle: CSSProperties;
}

export default function RangeSeries(props: RangeSeriesProps) {
  const [id] = useState(() => props.groupId || `series-${getNextId()}`);
  const { lineStyle = {}, hidden, xAxis, yAxis, data, label } = props;

  // Update plot context with data description
  const { dispatch } = useDispatchContext();
  useEffect(() => {
    const [xMin, xMax] = extent(data, (d) => d.x);
    const [yMin, yMax] = extent(data, (d) => d.y2);
    const x = { min: xMin, max: xMax, axisId: xAxis };
    const y = { min: yMin, max: yMax, axisId: yAxis };
    dispatch({ type: 'newData', value: { id, x, y, label } });

    // Delete information on unmount
    return () => dispatch({ type: 'removeData', value: { id } });
  }, [dispatch, id, data, xAxis, yAxis, label]);

  if (hidden) return null;

  const lineProps = {
    id,
    data: props.data,
    xAxis: props.xAxis || 'x',
    yAxis: props.yAxis || 'y',
    lineStyle,
  };

  return (
    <g>
      <RangeSeriesRender {...lineProps} />
    </g>
  );
}

function RangeSeriesRender({
  data,
  xAxis,
  yAxis,
  lineStyle,
}: RangeSeriesRenderProps) {
  // Get scales from context
  const { axisContext } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, xAxis, yAxis);

  // calculates the path to display
  const path = useMemo(() => {
    if ([xScale, yScale].includes(undefined)) return null;

    // Calculate area from D3
    const areaGenerator = area<SeriesRangePointType>()
      .x((d) => xScale(d.x))
      .y0((d) => yScale(d.y1))
      .y1((d) => yScale(d.y2));

    return areaGenerator(data);
  }, [data, xScale, yScale]);
  if (!path) return null;

  // default style
  const style: CSSProperties = {
    strokeWidth: 2,
    ...lineStyle,
  };

  return <path style={style} d={path} fill="none" />;
}

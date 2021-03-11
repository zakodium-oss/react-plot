import { area } from 'd3-shape';
import { CSSProperties, useMemo, useState } from 'react';

import { usePlotContext } from '../hooks';
import type { RangeSeriesProps, SeriesRangePointType } from '../types';
import { getNextId, validateAxis } from '../utils';

import ScatterRangeSeries from './ScatterRangeSeries';

interface RangeSeriesRenderProps {
  data: SeriesRangePointType[];
  xAxis: string;
  yAxis: string;
  lineStyle: CSSProperties;
}

export default function RangeSeries(props: RangeSeriesProps) {
  const [id] = useState(() => props.groupId || `series-${getNextId()}`);
  const { lineStyle = {}, hidden, ...otherProps } = props;

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
      <ScatterRangeSeries {...otherProps} hidden={false} groupId={id} />
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

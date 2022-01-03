import { extent } from 'd3-array';
import { area } from 'd3-shape';
import { CSSProperties, useEffect, useMemo, useState } from 'react';

import { useDispatchContext, usePlotContext } from '../hooks';
import { getNextId, validateAxis } from '../utils';

import { useLegend } from './legendsContext';

import type { RangeSeriesProps, RangeSeriesPointType } from '../types';

interface RangeSeriesRenderProps {
  data: RangeSeriesPointType[];
  xAxis: string;
  yAxis: string;
  lineStyle: CSSProperties;
}

export default function RangeSeries<T extends RangeSeriesPointType>(
  props: RangeSeriesProps<T>,
) {
  const [id] = useState(() => props.groupId || `series-${getNextId()}`);
  const [, legendDispatch] = useLegend();
  const { lineStyle = {}, hidden, xAxis, yAxis, data, label } = props;

  // Update plot context with data description
  const { dispatch } = useDispatchContext();
  useEffect(() => {
    const [xMin, xMax] = extent(data, (d) => d.x);

    const [y1Min, y1Max] = extent(data, (d) => d.y1);
    const [y2Min, y2Max] = extent(data, (d) => d.y2);

    const x = { min: xMin, max: xMax, axisId: xAxis };
    const y = {
      min: Math.min(y1Min, y2Min),
      max: Math.max(y1Max, y2Max),
      axisId: yAxis,
    };
    dispatch({ type: 'newData', value: { id, x, y, label } });

    // Delete information on unmount
    return () => dispatch({ type: 'removeData', value: { id } });
  }, [dispatch, id, data, xAxis, yAxis, label]);

  useEffect(() => {
    legendDispatch({
      type: 'ADD_LEGEND_LABEL',
      payload: {
        id,
        label,
        colorLine: lineStyle.stroke,
        range: {
          rangeColor: lineStyle.fill,
        },
      },
    });

    return () =>
      legendDispatch({
        type: 'REMOVE_LEGEND_LABEL',
        payload: { id },
      });
  }, [label, legendDispatch, lineStyle.fill, lineStyle.stroke, id]);

  if (hidden) return null;

  const lineProps = {
    id,
    data: props.data,
    xAxis: props.xAxis || 'x',
    yAxis: props.yAxis || 'y',
    lineStyle,
  };

  return <RangeSeriesRender {...lineProps} />;
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
    const areaGenerator = area<RangeSeriesPointType>()
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

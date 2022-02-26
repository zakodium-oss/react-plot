import { extent } from 'd3-array';
import { area } from 'd3-shape';
import { CSSProperties, useEffect, useMemo } from 'react';

import { useLegend } from '../../contexts/legendContext';
import {
  usePlotContext,
  usePlotDispatchContext,
} from '../../contexts/plotContext';
import { useIsSeriesVisible, useShift } from '../../hooks';
import type { BaseSeriesProps } from '../../types';
import { useId, validateAxis } from '../../utils';

export interface RangeSeriesPoint {
  x: number;
  y1: number;
  y2: number;
}

export interface RangeSeriesProps<T extends RangeSeriesPoint>
  extends BaseSeriesProps<T> {
  lineStyle?: CSSProperties;
}

export function RangeSeries<T extends RangeSeriesPoint>(
  props: RangeSeriesProps<T>,
) {
  const id = useId(props.id, 'series');
  const [, legendDispatch] = useLegend();
  const {
    lineStyle = {},
    hidden,
    xAxis = 'x',
    yAxis = 'y',
    data,
    label,
    xShift: propsXShift = '0',
    yShift: propsYShift = '0',
  } = props;

  const { xShift, yShift } = useShift({
    xAxis,
    yAxis,
    xShift: propsXShift,
    yShift: propsYShift,
  });
  // Update plot context with data description
  const dispatch = usePlotDispatchContext();
  useEffect(() => {
    const [xMin, xMax] = extent(data, (d) => d.x) as [number, number];

    const [y1Min, y1Max] = extent(data, (d) => d.y1) as [number, number];
    const [y2Min, y2Max] = extent(data, (d) => d.y2) as [number, number];

    const x = { min: xMin, max: xMax, shift: propsXShift, axisId: xAxis };
    const y = {
      min: Math.min(y1Min, y2Min),
      max: Math.max(y1Max, y2Max),
      shift: propsYShift,
      axisId: yAxis,
    };
    dispatch({ type: 'addSeries', payload: { id, x, y, label } });

    // Delete information on unmount
    return () => dispatch({ type: 'removeSeries', payload: { id } });
  }, [dispatch, id, data, xAxis, yAxis, label, propsXShift, propsYShift]);

  const isVisible = useIsSeriesVisible(id);
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
    data,
    xAxis,
    yAxis,
    lineStyle,
    transform: `translate(${xShift},${yShift})`,
  };

  return isVisible ? <RangeSeriesRender {...lineProps} /> : null;
}

interface RangeSeriesRenderProps {
  data: ReadonlyArray<RangeSeriesPoint>;
  xAxis: string;
  yAxis: string;
  lineStyle: CSSProperties;
  transform: string;
}

function RangeSeriesRender({
  data,
  xAxis,
  yAxis,
  lineStyle,
  transform,
}: RangeSeriesRenderProps) {
  // Get scales from context
  const { axisContext } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, xAxis, yAxis);

  // calculates the path to display
  const path = useMemo(() => {
    if (xScale === undefined || yScale === undefined) {
      return null;
    }

    // Calculate area from D3
    const areaGenerator = area<RangeSeriesPoint>()
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

  return <path transform={transform} style={style} d={path} fill="none" />;
}

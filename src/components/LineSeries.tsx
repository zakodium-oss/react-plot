import { line } from 'd3-shape';
import { CSSProperties, useEffect, useMemo, useState } from 'react';

import { usePlotContext } from '../hooks';
import type { SeriesPointType } from '../types';
import { getNextId, validateAxis } from '../utils';

import ErrorBars from './ErrorBars';
import { ScatterSeries, ScatterSeriesProps } from './ScatterSeries';
import { useLegend } from './legendsContext';

export interface LineSeriesProps extends ScatterSeriesProps {
  lineStyle?: CSSProperties;
  displayMarker?: boolean;
}

export function LineSeries(props: LineSeriesProps) {
  const [, legendDispatch] = useLegend();
  const { colorScaler } = usePlotContext();

  const [id] = useState(() => props.groupId || `series-${getNextId()}`);
  const {
    lineStyle = {},
    displayMarker = false,
    displayErrorBars = false,
    hidden,
    ...otherProps
  } = props;

  useEffect(() => {
    if (!hidden) {
      legendDispatch({
        type: 'ADD_LEGEND_LABEL',
        payload: {
          id,
          label: otherProps.label,

          colorLine: lineStyle?.stroke?.toString() || colorScaler(id),

          shape: {
            color: otherProps.markerStyle?.fill?.toString() || colorScaler(id),
            figure: otherProps.markerShape || 'circle',
            hidden: !displayMarker,
          },
        },
      });
    }
    return () =>
      legendDispatch({ type: 'REMOVE_LEGEND_LABEL', payload: { id } });
  }, [
    hidden,
    colorScaler,
    displayMarker,
    id,
    legendDispatch,
    lineStyle?.stroke,
    otherProps.label,
    otherProps.markerShape,
    otherProps.markerStyle,
    otherProps.markerStyle?.fill,
  ]);
  if (hidden) return null;

  const lineProps = {
    id,
    data: props.data,
    xAxis: props.xAxis || 'x',
    yAxis: props.yAxis || 'y',
    lineStyle,
  };
  const errorBarsProps = {
    data: props.data,
    xAxis: props.xAxis || 'x',
    yAxis: props.yAxis || 'y',
    hidden: !displayErrorBars,
    style: props.errorBarsStyle,
    capStyle: props.errorBarsCapStyle,
    capSize: props.errorBarsCapSize,
  };

  return (
    <g>
      <LineSeriesRender {...lineProps} />
      <ErrorBars {...errorBarsProps} />
      <ScatterSeries {...otherProps} hidden={!displayMarker} groupId={id} />
    </g>
  );
}

interface LineSeriesRenderProps {
  id: string;
  data: SeriesPointType[];
  xAxis: string;
  yAxis: string;
  lineStyle: CSSProperties;
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
    if (xScale === undefined || yScale === undefined) {
      return null;
    }

    // Calculate line from D3
    const lineGenerator = line<SeriesPointType>()
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

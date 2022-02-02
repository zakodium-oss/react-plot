import { line } from 'd3-shape';
import { CSSProperties, useEffect, useMemo, useState } from 'react';

import { useLegend } from '../contexts/legendContext';
import { usePlotContext } from '../contexts/plotContext';
import { useIsSeriesVisible } from '../hooks';
import type { CSSFuncProps, SeriesPoint } from '../types';
import { functionalStyle, getNextId, validateAxis } from '../utils';

import ErrorBars from './ErrorBars';
import { ScatterSeries, ScatterSeriesProps } from './ScatterSeries';

export interface LineSeriesProps extends ScatterSeriesProps {
  lineStyle?: CSSFuncProps<{ id: string }>;
  displayMarker?: boolean;
}

export function LineSeries(props: LineSeriesProps) {
  const [, legendDispatch] = useLegend();
  const { colorScaler } = usePlotContext();

  const [id] = useState(() => props.id || `series-${getNextId()}`);
  const {
    lineStyle: OldLineStyle,
    displayMarker = false,
    displayErrorBars = false,
    hidden,
    ...otherProps
  } = props;
  const lineStyle = functionalStyle({}, OldLineStyle, { id });
  const isVisible = useIsSeriesVisible(id);
  useEffect(() => {
    if (!hidden) {
      legendDispatch({
        type: 'ADD_LEGEND_LABEL',
        payload: {
          id,
          label: otherProps.label,
          colorLine: lineStyle?.stroke?.toString() || colorScaler(id),
          isVisible,
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
    isVisible,
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
  return isVisible ? (
    <g>
      <LineSeriesRender lineStyle={lineStyle} {...lineProps} />
      <ErrorBars {...errorBarsProps} />
      <ScatterSeries {...otherProps} hidden={!displayMarker} id={id} />
    </g>
  ) : null;
}

interface LineSeriesRenderProps {
  id: string;
  data: SeriesPoint[];
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
    const lineGenerator = line<SeriesPoint>()
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

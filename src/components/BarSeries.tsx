import { CSSProperties, useEffect, useMemo, useState } from 'react';

import { useLegend } from '../contexts/legendContext';
import { usePlotContext } from '../contexts/plotContext';
import type { SeriesPoint } from '../types';
import { functionalStyleId, getNextId, validateAxis } from '../utils';

import { LineSeriesProps } from './LineSeries';
import { ScatterSeries } from './ScatterSeries';

export interface BarSeriesProps extends LineSeriesProps {}

export function BarSeries(props: BarSeriesProps) {
  const [, legendDispatch] = useLegend();
  const { colorScaler } = usePlotContext();
  const [id] = useState(() => props.id || `series-${getNextId()}`);
  const { lineStyle = {}, displayMarker = false, ...otherProps } = props;
  const lineProps = {
    id,
    data: props.data,
    xAxis: props.xAxis || 'x',
    yAxis: props.yAxis || 'y',
    lineStyle: functionalStyleId(lineStyle, id),
  };

  const colorLine = lineStyle?.stroke
    ? lineStyle?.stroke.toString()
    : colorScaler(id);

  const color = otherProps.markerStyle?.fill?.toString() || colorScaler(id);
  const figure = otherProps.markerShape || 'circle';

  const shape = useMemo(() => {
    return {
      color,
      figure,
      hidden: !displayMarker,
    };
  }, [color, displayMarker, figure]);

  useEffect(() => {
    legendDispatch({
      type: 'ADD_LEGEND_LABEL',
      payload: {
        id,
        label: otherProps.label,
        colorLine,
        shape,
      },
    });
    return () =>
      legendDispatch({ type: 'REMOVE_LEGEND_LABEL', payload: { id } });
  }, [colorLine, legendDispatch, otherProps.label, shape, id]);

  return (
    <g>
      {props.hidden ? null : <BarSeriesRender {...lineProps} />}
      <ScatterSeries
        {...otherProps}
        hidden={!displayMarker || props.hidden}
        id={id}
      />
    </g>
  );
}

interface BarSeriesRenderProps {
  id: string;
  data: SeriesPoint[];
  xAxis: string;
  yAxis: string;
  lineStyle: CSSProperties;
}

function BarSeriesRender({
  id,
  data,
  xAxis,
  yAxis,
  lineStyle,
}: BarSeriesRenderProps) {
  // Get scales from context
  const { axisContext, colorScaler } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, xAxis, yAxis);

  const color = colorScaler(id);
  if (xScale === undefined || yScale === undefined) {
    return null;
  }

  // default style
  const style = {
    stroke: color,
    strokeWidth: 2,
    ...lineStyle,
  };

  return (
    <g>
      {data.map(({ x, y }) => (
        <line
          style={style}
          key={`${x}-${y}`}
          x1={xScale(x)}
          x2={xScale(x)}
          y1={yScale(y)}
          y2={yScale(0)}
        />
      ))}
    </g>
  );
}

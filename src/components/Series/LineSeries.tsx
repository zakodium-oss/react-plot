import { line } from 'd3-shape';
import type { CSSProperties } from 'react';
import { memo, useEffect, useMemo } from 'react';

import { useLegend } from '../../contexts/legendContext.js';
import { usePlotContext } from '../../contexts/plotContext.js';
import { useIsSeriesVisible, useShift } from '../../hooks.js';
import type { CSSFuncProps, SeriesPoint, Shape } from '../../types.js';
import { functionalStyle, useId, validateAxis } from '../../utils.js';

import type { ScatterSeriesProps } from './ScatterSeries.js';
import { ScatterSeries } from './ScatterSeries.js';

export interface LineSeriesProps<T extends SeriesPoint = SeriesPoint>
  extends Omit<
    ScatterSeriesProps<T>,
    'markerShape' | 'lineStyle' | 'displayLines'
  > {
  data: readonly T[];
  markerShape?: Shape;
  lineStyle?: CSSFuncProps<{ id: string }>;
}

function LineSeriesInner<T extends SeriesPoint = SeriesPoint>(
  props: LineSeriesProps<T>,
) {
  const [, legendDispatch] = useLegend();
  const { colorScaler } = usePlotContext();

  const id = useId(props.id, 'series');
  const {
    lineStyle: lineStyleFromProps = {},
    displayMarkers = false,
    hidden,
    ...otherProps
  } = props;
  const {
    xAxis = 'x',
    yAxis = 'y',
    xShift: oldXShift = '0',
    yShift: oldYShift = '0',
    pointLabel,
    displayErrorBars,
    label,
    markerStyle,
    markerShape,
  } = otherProps;
  const { xShift, yShift } = useShift({
    xAxis,
    yAxis,
    xShift: oldXShift,
    yShift: oldYShift,
  });
  const lineStyle = functionalStyle({}, lineStyleFromProps, { id });
  const isVisible = useIsSeriesVisible(id);
  useEffect(() => {
    if (!hidden) {
      legendDispatch({
        type: 'ADD_LEGEND_LABEL',
        payload: {
          id,
          label,
          colorLine: lineStyle?.stroke?.toString() || colorScaler(id),
          shape: {
            color: markerStyle?.fill?.toString() || colorScaler(id),
            figure: markerShape || 'circle',
            hidden: !displayMarkers,
          },
        },
      });
      return () =>
        legendDispatch({ type: 'REMOVE_LEGEND_LABEL', payload: { id } });
    }
    return undefined;
  }, [
    hidden,
    colorScaler,
    displayMarkers,
    id,
    legendDispatch,
    lineStyle?.stroke,
    label,
    markerShape,
    markerStyle?.fill,
  ]);
  if (hidden) return null;

  const lineProps = {
    id,
    data: props.data,
    xAxis,
    yAxis,
    lineStyle,
    transform: `translate(${xShift},${yShift})`,
  };

  return (
    <g>
      {isVisible && <LineSeriesRender {...lineProps} />}
      <ScatterSeries
        {...otherProps}
        hidden={!displayMarkers && !pointLabel && !displayErrorBars}
        displayMarkers={displayMarkers}
        id={id}
      />
    </g>
  );
}

export const LineSeries = memo(LineSeriesInner);

interface LineSeriesRenderProps {
  id: string;
  data: readonly SeriesPoint[];
  xAxis: string;
  yAxis: string;
  lineStyle: CSSProperties;
  transform: string;
}

function LineSeriesRender({
  id,
  data,
  xAxis,
  yAxis,
  lineStyle,
  transform,
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

  return <path transform={transform} style={style} d={path} fill="none" />;
}

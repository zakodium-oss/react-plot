import { line } from 'd3-shape';
import { CSSProperties, useEffect, useMemo } from 'react';

import { useLegend } from '../../contexts/legendContext';
import { usePlotContext } from '../../contexts/plotContext';
import { useIsSeriesVisible, useShift } from '../../hooks';
import type { CSSFuncProps, SeriesPoint, Shape } from '../../types';
import { functionalStyle, useId, validateAxis } from '../../utils';

import { ScatterSeries, ScatterSeriesProps } from './ScatterSeries';

export interface LineSeriesProps<T extends SeriesPoint = SeriesPoint>
  extends Omit<
    ScatterSeriesProps<T>,
    'markerShape' | 'lineStyle' | 'displayLines'
  > {
  data: ReadonlyArray<T>;
  markerShape?: Shape;
  lineStyle?: CSSFuncProps<{ id: string }>;
}

export function LineSeries<T extends SeriesPoint = SeriesPoint>(
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
          label: otherProps.label,
          colorLine: lineStyle?.stroke?.toString() || colorScaler(id),
          shape: {
            color: otherProps.markerStyle?.fill?.toString() || colorScaler(id),
            figure: otherProps.markerShape || 'circle',
            hidden: !displayMarkers,
          },
        },
      });
      return () =>
        legendDispatch({ type: 'REMOVE_LEGEND_LABEL', payload: { id } });
    }
  }, [
    hidden,
    colorScaler,
    displayMarkers,
    id,
    legendDispatch,
    lineStyle?.stroke,
    otherProps.label,
    otherProps.markerShape,
    otherProps.markerStyle?.fill,
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

interface LineSeriesRenderProps {
  id: string;
  data: ReadonlyArray<SeriesPoint>;
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

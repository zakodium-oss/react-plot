import { line } from 'd3-shape';
import { euclidean } from 'ml-distance-euclidean';
import { CSSProperties, useEffect, useMemo } from 'react';

import { useLegend } from '../contexts/legendContext';
import { usePlotContext } from '../contexts/plotContext';
import { useIsSeriesVisible, useShift } from '../hooks';
import type { CSSFuncProps, SeriesPoint, Shape } from '../types';
import { functionalStyle, useId, validateAxis } from '../utils';

import ErrorBars from './ErrorBars';
import GradientDefs from './GradientDefs ';
import { ScatterSeries, ScatterSeriesProps } from './ScatterSeries';

export interface LineSeriesProps
  extends Omit<ScatterSeriesProps, 'markerShape'> {
  markerShape?: Shape;
  lineStyle?: CSSFuncProps<{ id: string }>;
  displayMarker?: boolean;
  gradientStyle?: (point: SeriesPoint) => string;
}

export function LineSeries(props: LineSeriesProps) {
  const [, legendDispatch] = useLegend();
  const { colorScaler } = usePlotContext();

  const id = useId(props.id, 'series');
  const {
    lineStyle: OldLineStyle,
    displayMarker = false,
    displayErrorBars = false,
    hidden,
    gradientStyle,
    ...otherProps
  } = props;
  const {
    xAxis = 'x',
    yAxis = 'y',
    xShift: oldXShift = '0',
    yShift: oldYShift = '0',
  } = otherProps;
  const { xShift, yShift } = useShift({
    xAxis,
    yAxis,
    xShift: oldXShift,
    yShift: oldYShift,
  });
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
    xAxis,
    yAxis,
    lineStyle,
    transform: `translate(${xShift},${yShift})`,
    gradientStyle,
  };
  const errorBarsProps = {
    data: props.data,
    xAxis,
    yAxis,
    hidden: !displayErrorBars,
    style: props.errorBarsStyle,
    capStyle: props.errorBarsCapStyle,
    capSize: props.errorBarsCapSize,
    transform: `translate(${xShift},${yShift})`,
  };
  return (
    <g>
      {isVisible && (
        <>
          <LineSeriesRender lineStyle={lineStyle} {...lineProps} />
          <ErrorBars {...errorBarsProps} />
        </>
      )}
      <ScatterSeries {...otherProps} hidden={!displayMarker} id={id} />
    </g>
  );
}

interface LineSeriesRenderProps {
  id: string;
  data: SeriesPoint[];
  xAxis: string;
  yAxis: string;
  lineStyle: CSSProperties;
  transform: string;
  gradientStyle?: (point: SeriesPoint) => string;
}

function LineSeriesRender({
  id,
  data,
  xAxis,
  yAxis,
  lineStyle,
  transform,
  gradientStyle,
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
    strokeWidth: 2,
    ...lineStyle,
    stroke: gradientStyle ? `url(#gradient-${id})` : color,
  };

  function calculateOffset(data, i) {
    return euclidean([data[i - 1].x, data[i - 1].y], [data[i].x, data[i].y]);
  }
  let x = 0;
  return (
    <g>
      {gradientStyle && (
        <GradientDefs
          colors={data
            .map((point, i) => {
              if (i === 0) x = 0;
              else x += calculateOffset(data, i);
              return {
                color: gradientStyle(point),
                offset: x,
              };
            })
            .reverse()}
          id={`gradient-${id}`}
        />
      )}
      <path transform={transform} style={style} d={path} fill="none" />
    </g>
  );
}

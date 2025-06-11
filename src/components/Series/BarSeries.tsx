import type { CSSProperties } from 'react';
import { useEffect, useMemo } from 'react';

import { useLegend } from '../../contexts/legendContext.js';
import { usePlotContext } from '../../contexts/plotContext.js';
import { useIsSeriesVisible, useShift } from '../../hooks.js';
import type { SeriesPoint } from '../../types.js';
import { functionalStyle, useId, validateAxis } from '../../utils.js';

import type { LineSeriesProps } from './LineSeries.js';
import { ScatterSeries } from './ScatterSeries.js';

export type BarSeriesProps = LineSeriesProps;

export function BarSeries(props: BarSeriesProps) {
  const [, legendDispatch] = useLegend();
  const { colorScaler } = usePlotContext();
  const id = useId(props.id, 'series');
  const {
    lineStyle = {},
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
  const lineProps = {
    id,
    data: props.data,
    xAxis,
    yAxis,
    lineStyle: functionalStyle({}, lineStyle, { id }),
    transform: `translate(${xShift},${yShift})`,
  };

  const colorLine = lineStyle?.stroke
    ? lineStyle?.stroke.toString()
    : colorScaler(id);

  const color = markerStyle?.fill?.toString() || colorScaler(id);
  const figure = markerShape || 'circle';

  const shape = useMemo(() => {
    return {
      color,
      figure,
      hidden: !displayMarkers,
    };
  }, [color, displayMarkers, figure]);
  const isVisible = useIsSeriesVisible(id);
  useEffect(() => {
    if (!hidden) {
      legendDispatch({
        type: 'ADD_LEGEND_LABEL',
        payload: {
          id,
          label,
          colorLine,
          shape,
        },
      });
      return () =>
        legendDispatch({ type: 'REMOVE_LEGEND_LABEL', payload: { id } });
    }
    return undefined;
  }, [colorLine, legendDispatch, label, shape, id, hidden]);
  if (hidden) return null;
  return (
    <g>
      {isVisible && <BarSeriesRender {...lineProps} />}
      <ScatterSeries
        {...otherProps}
        hidden={!displayMarkers && !pointLabel && !displayErrorBars}
        displayMarkers={displayMarkers}
        id={id}
      />
    </g>
  );
}

interface BarSeriesRenderProps {
  id: string;
  data: readonly SeriesPoint[];
  xAxis: string;
  yAxis: string;
  lineStyle: CSSProperties;
  transform: string;
}

function BarSeriesRender({
  id,
  data,
  xAxis,
  yAxis,
  lineStyle,
  transform,
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
    <g transform={transform}>
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

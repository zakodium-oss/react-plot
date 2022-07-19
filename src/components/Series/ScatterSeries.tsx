import { extent } from 'd3-array';
import { SVGAttributes, useEffect, useMemo } from 'react';

import { useLegend } from '../../contexts/legendContext';
import {
  usePlotContext,
  usePlotDispatchContext,
} from '../../contexts/plotContext';
import { useIsSeriesVisible, useShift } from '../../hooks';
import {
  BaseSeriesProps,
  CSSFuncProps,
  LabelFuncProps,
  SeriesPoint,
  ShapeFuncProps,
} from '../../types';
import {
  functionalLabel,
  functionalShape,
  functionalStyle,
  middlePoint,
  useId,
  validateAxis,
} from '../../utils';
import ErrorBars from '../ErrorBars';
import { markersComps } from '../Markers';

export interface ScatterSeriesProps<T extends SeriesPoint = SeriesPoint>
  extends BaseSeriesProps {
  data: ReadonlyArray<T>;
  markerShape?: ShapeFuncProps<T>;
  displayMarkers?: boolean;
  markerSize?: number;
  markerStyle?: CSSFuncProps<T>;
  pointLabel?: LabelFuncProps<T>;
  pointLabelStyle?: CSSFuncProps<T>;
  displayErrorBars?: boolean;
  errorBarsStyle?: SVGAttributes<SVGLineElement>;
  errorBarsCapStyle?: SVGAttributes<SVGLineElement>;
  errorBarsCapSize?: number;
  lineStyle?: CSSFuncProps<T>;
  displayLines?: boolean;
}

export function ScatterSeries<T extends SeriesPoint = SeriesPoint>(
  props: ScatterSeriesProps<T>,
) {
  // Update plot context with data description
  const dispatch = usePlotDispatchContext();
  const { colorScaler } = usePlotContext();
  const [, legendDispatch] = useLegend();

  const id = useId(props.id, 'series');

  const {
    xAxis = 'x',
    yAxis = 'y',
    data,
    label,
    hidden,
    displayErrorBars = false,
    xShift: oldXShift = 0,
    yShift: oldYShift = 0,
    ...otherProps
  } = props;

  const {
    markerShape = 'circle',
    markerStyle = {},
    errorBarsStyle,
    errorBarsCapStyle,
    errorBarsCapSize,
  } = otherProps;

  const isVisible = useIsSeriesVisible(id);
  const { xShift, yShift } = useShift({
    xAxis,
    yAxis,
    xShift: oldXShift,
    yShift: oldYShift,
  });
  const transform = `translate(${xShift},${yShift})`;
  useEffect(() => {
    if (!hidden) {
      legendDispatch({
        type: 'ADD_LEGEND_LABEL',
        payload: {
          id,
          label,
          colorLine: 'white',
          shape: {
            color: markerStyle?.fill?.toString() || colorScaler(id),
            figure: typeof markerShape === 'string' ? markerShape : 'circle',
            hidden: false,
          },
        },
      });
      return () =>
        legendDispatch({ type: 'REMOVE_LEGEND_LABEL', payload: { id } });
    }
  }, [
    colorScaler,
    hidden,
    id,
    label,
    legendDispatch,
    markerShape,
    markerStyle?.fill,
  ]);
  useEffect(() => {
    const [xMin, xMax] = extent(data, (d) => d.x) as [number, number];
    const [yMin, yMax] = extent(data, (d) => d.y) as [number, number];
    const x = { min: xMin, max: xMax, axisId: xAxis, shift: oldXShift };
    const y = { min: yMin, max: yMax, axisId: yAxis, shift: oldYShift };
    dispatch({ type: 'addSeries', payload: { id, x, y, label, data } });
    // Delete information on unmount
    return () => dispatch({ type: 'removeSeries', payload: { id } });
  }, [dispatch, id, data, xAxis, yAxis, label, oldXShift, oldYShift]);

  if (hidden) return null;

  // Render stateless plot component
  const inheritedProps = {
    data,
    xAxis,
    yAxis,
  };
  const errorBarsProps = {
    hidden: !displayErrorBars,
    style: errorBarsStyle,
    capStyle: errorBarsCapStyle,
    capSize: errorBarsCapSize,
    transform,
  };

  return isVisible ? (
    <g>
      <ErrorBars {...inheritedProps} {...errorBarsProps} />
      <ScatterSeriesRender
        {...otherProps}
        {...inheritedProps}
        id={id}
        transform={transform}
      />
    </g>
  ) : null;
}

interface ScatterSeriesRenderProps<T extends SeriesPoint = SeriesPoint>
  extends Omit<ScatterSeriesProps<T>, 'label'> {
  id: string;
  transform: string;
  xAxis: string;
  yAxis: string;
}

function ScatterSeriesRender<T extends SeriesPoint = SeriesPoint>({
  id,
  data,
  xAxis,
  yAxis,
  markerShape = 'circle',
  markerSize = 8,
  markerStyle = {},
  pointLabel = '',
  pointLabelStyle = {},
  displayMarkers = true,
  lineStyle: pointLineStyle = {},
  displayLines = false,
  transform,
}: ScatterSeriesRenderProps<T>) {
  // Get scales from context
  const { axisContext, colorScaler } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, xAxis, yAxis);

  // calculates the path to display
  const markers = useMemo(() => {
    if (xScale === undefined || yScale === undefined) {
      return null;
    }

    const color = colorScaler(id);
    const defaultColor = { fill: color, stroke: color };
    const markers = data.map((point, i) => {
      const style = functionalStyle(defaultColor, markerStyle, point, i, data);

      // Show marker
      const Marker = markersComps[functionalShape(markerShape, point, i, data)];
      const label = functionalLabel(pointLabel, point, i, data);
      const labelStyle = functionalStyle({}, pointLabelStyle, point, i, data);

      const Lines = [];
      if (displayLines) {
        const lineStyle = functionalStyle({}, pointLineStyle, point, i, data);
        const prePoint = i > 0 ? middlePoint(point, data[i - 1]) : undefined;

        const nextPoint = data[i + 1]
          ? middlePoint(point, data[i + 1])
          : undefined;
        const PreviousLine = prePoint ? (
          <line
            x1={0}
            y1={0}
            x2={xScale(prePoint.x) - xScale(point.x)}
            y2={yScale(prePoint.y) - yScale(point.y)}
            style={{ stroke: style.fill, ...lineStyle }}
          />
        ) : null;
        const NextLine = nextPoint ? (
          <line
            x1={0}
            y1={0}
            x2={xScale(nextPoint.x) - xScale(point.x)}
            y2={yScale(nextPoint.y) - yScale(point.y)}
            style={{ stroke: style.fill, ...lineStyle }}
          />
        ) : null;
        Lines.push(PreviousLine, NextLine);
      }
      return (
        <g // eslint-disable-next-line react/no-array-index-key
          key={`markers-${i}`}
          transform={`translate(${xScale(point.x)}, ${yScale(point.y)})`}
        >
          {Lines}
          {displayMarkers ? (
            <Marker
              size={markerSize}
              style={{ stroke: style.fill, ...style }}
            />
          ) : null}
          {label ? <text style={labelStyle}>{label}</text> : null}
        </g>
      );
    });

    return markers;
  }, [
    xScale,
    yScale,
    colorScaler,
    id,
    data,
    markerStyle,
    markerShape,
    pointLabel,
    pointLabelStyle,
    pointLineStyle,
    displayLines,
    displayMarkers,
    markerSize,
  ]);
  if (!markers) return null;

  return (
    <g transform={transform} className="markers">
      {markers}
    </g>
  );
}

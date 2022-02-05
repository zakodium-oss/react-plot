import { extent } from 'd3-array';
import { SVGAttributes, useEffect, useMemo } from 'react';

import { useLegend } from '../contexts/legendContext';
import {
  usePlotContext,
  usePlotDispatchContext,
} from '../contexts/plotContext';
import { useIsSeriesVisible } from '../hooks';
import {
  BaseSeriesProps,
  CSSFuncProps,
  LabelFuncProps,
  SeriesPoint,
  ShapeFuncProps,
} from '../types';
import {
  functionalLabel,
  functionalShape,
  functionalStyle,
  useId,
  validateAxis,
} from '../utils';

import ErrorBars from './ErrorBars';
import { markersComps } from './Markers';

export interface ScatterSeriesProps<T = SeriesPoint>
  extends BaseSeriesProps<T> {
  markerShape?: ShapeFuncProps<T>;
  markerSize?: number;
  markerStyle?: CSSFuncProps<T>;
  pointLabel?: LabelFuncProps<T>;
  pointLabelStyle?: CSSFuncProps<T>;
  displayErrorBars?: boolean;
  errorBarsStyle?: SVGAttributes<SVGLineElement>;
  errorBarsCapStyle?: SVGAttributes<SVGLineElement>;
  errorBarsCapSize?: number;
}

export function ScatterSeries(props: ScatterSeriesProps) {
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
    ...otherProps
  } = props;

  const isVisible = useIsSeriesVisible(id);
  useEffect(() => {
    if (!hidden) {
      legendDispatch({
        type: 'ADD_LEGEND_LABEL',
        payload: {
          id,
          label,
          colorLine: 'white',
          shape: {
            color: otherProps.markerStyle?.fill?.toString() || colorScaler(id),
            figure: 'circle',
            hidden: false,
          },
        },
      });
    }
    return () =>
      legendDispatch({ type: 'REMOVE_LEGEND_LABEL', payload: { id } });
  }, [
    colorScaler,
    hidden,
    id,
    label,
    legendDispatch,
    otherProps.markerShape,
    otherProps.markerStyle?.fill,
  ]);

  useEffect(() => {
    const [xMin, xMax] = extent(data, (d) => d.x);
    const [yMin, yMax] = extent(data, (d) => d.y);
    const x = { min: xMin, max: xMax, axisId: xAxis };
    const y = { min: yMin, max: yMax, axisId: yAxis };
    dispatch({ type: 'newData', payload: { id, x, y, label, data } });

    // Delete information on unmount
    return () => dispatch({ type: 'removeData', payload: { id } });
  }, [dispatch, id, data, xAxis, yAxis, label]);

  if (hidden) return null;

  // Render stateless plot component
  const inheritedProps = { data, xAxis, yAxis };
  const errorBarsProps = {
    hidden: !displayErrorBars,
    style: props.errorBarsStyle,
    capStyle: props.errorBarsCapStyle,
    capSize: props.errorBarsCapSize,
  };

  return isVisible ? (
    <g>
      <ErrorBars {...inheritedProps} {...errorBarsProps} />
      <ScatterSeriesRender {...otherProps} {...inheritedProps} id={id} />
    </g>
  ) : null;
}

interface ScatterSeriesRenderProps extends Omit<ScatterSeriesProps, 'label'> {
  id: string;
}

function ScatterSeriesRender({
  id,
  data,
  xAxis,
  yAxis,
  markerShape = 'circle',
  markerSize = 8,
  markerStyle = {},
  pointLabel = '',
  pointLabelStyle = {},
}: ScatterSeriesRenderProps) {
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
      return (
        <g // eslint-disable-next-line react/no-array-index-key
          key={`markers-${i}`}
          transform={`translate(${xScale(point.x)}, ${yScale(point.y)})`}
        >
          <Marker size={markerSize} style={{ stroke: style.fill, ...style }} />
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
    markerSize,
  ]);
  if (!markers) return null;

  return <g className="markers">{markers}</g>;
}

import { extent } from 'd3-array';
import { SVGAttributes, useEffect, useMemo, useState } from 'react';

import { useLegend } from '../contexts/legendContext';
import {
  usePlotContext,
  usePlotDispatchContext,
} from '../contexts/plotContext';
import { BaseSeriesProps, CSSFuncProps, SeriesPoint, Shape } from '../types';
import { functionalStyle, getNextId, validateAxis } from '../utils';

import ErrorBars from './ErrorBars';
import { markersComps } from './Markers';

export interface ScatterSeriesProps<T = SeriesPoint>
  extends BaseSeriesProps<T> {
  markerShape?: Shape;
  markerSize?: number;
  markerStyle?: CSSFuncProps<T>;
  displayErrorBars?: boolean;
  errorBarsStyle?: SVGAttributes<SVGLineElement>;
  errorBarsCapStyle?: SVGAttributes<SVGLineElement>;
  errorBarsCapSize?: number;
}

export function ScatterSeries(props: ScatterSeriesProps) {
  // Update plot context with data description
  const dispatch = usePlotDispatchContext();
  const { colorScaler } = usePlotContext();
  const [legendState, legendDispatch] = useLegend();

  const [id] = useState(() => props.id || `series-${getNextId()}`);

  const {
    xAxis = 'x',
    yAxis = 'y',
    data,
    label,
    hidden,
    displayErrorBars = false,
    ...otherProps
  } = props;
  const visibility = useMemo(() => {
    const value = legendState.labels.find((label) => label.id === id);
    return value ? value.visibility : true;
  }, [id, legendState.labels]);
  useEffect(() => {
    if (!hidden) {
      legendDispatch({
        type: 'ADD_LEGEND_LABEL',
        payload: {
          id,
          label,
          colorLine: 'white',
          visibility,
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
    visibility,
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

  return visibility ? (
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

    // Show markers
    const Marker = markersComps[markerShape];

    const markers = data.map((point, i) => {
      const style = functionalStyle(defaultColor, markerStyle, point, i, data);

      return (
        <g // eslint-disable-next-line react/no-array-index-key
          key={`markers-${i}`}
          transform={`translate(${xScale(point.x)}, ${yScale(point.y)})`}
        >
          <Marker size={markerSize} style={{ stroke: style.fill, ...style }} />
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
    markerSize,
    markerStyle,
    markerShape,
  ]);
  if (!markers) return null;

  return <g className="markers">{markers}</g>;
}

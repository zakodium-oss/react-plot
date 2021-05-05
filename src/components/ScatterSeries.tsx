import { extent } from 'd3-array';
import { useEffect, useMemo, useState } from 'react';

import { useDispatchContext, usePlotContext } from '../hooks';
import type { ScatterSeriesProps } from '../types';
import { functionalStyle, getNextId, validateAxis } from '../utils';

import ErrorBars from './ErrorBars';
import { markersComps } from './Markers';

interface ScatterSeriesRenderProps extends Omit<ScatterSeriesProps, 'label'> {
  id: string;
}

export default function ScatterSeries(props: ScatterSeriesProps) {
  const [id] = useState(() => props.groupId || `series-${getNextId()}`);

  const {
    xAxis = 'x',
    yAxis = 'y',
    data,
    label,
    hidden,
    displayErrorBars = false,
    ...otherProps
  } = props;

  // Update plot context with data description
  const { dispatch } = useDispatchContext();
  useEffect(() => {
    const [xMin, xMax] = extent(data, (d) => d.x);
    const [yMin, yMax] = extent(data, (d) => d.y);
    const x = { min: xMin, max: xMax, axisId: xAxis };
    const y = { min: yMin, max: yMax, axisId: yAxis };
    dispatch({ type: 'newData', value: { id, x, y, label, data } });

    // Delete information on unmount
    return () => dispatch({ type: 'removeData', value: { id } });
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

  return (
    <g>
      <ErrorBars {...inheritedProps} {...errorBarsProps} />
      <ScatterSeriesRender {...otherProps} {...inheritedProps} id={id} />
    </g>
  );
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
    if ([xScale, yScale].includes(undefined)) return null;

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

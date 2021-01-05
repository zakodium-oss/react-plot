import { extent } from 'd3-array';
import { line } from 'd3-shape';
import React, { useEffect, useMemo, useState } from 'react';

import { useDispatchContext, usePlotContext } from '../hooks';
import type { LineSeriesProps, Series } from '../types';
import { getNextId } from '../utils';

import { Circle, Square, Triangle } from './Markers';

interface LineSeriesRenderProps extends Omit<LineSeriesProps, 'label'> {
  id: string;
}

const markersComps = {
  circle: Circle,
  square: Square,
  triangle: Triangle,
};

export default function LineSeries(props: LineSeriesProps) {
  const [id] = useState(() => `series-${getNextId()}`);

  const { data, label, ...otherProps } = props;

  // Update plot context with data description
  const { dispatch } = useDispatchContext();
  useEffect(() => {
    const [xMin, xMax] = extent(data, (d) => d.x);
    const [yMin, yMax] = extent(data, (d) => d.y);
    dispatch({ type: 'newData', value: { id, xMin, xMax, yMin, yMax, label } });

    // Delete information on unmount
    return () => dispatch({ type: 'removeData', value: { id } });
  }, [data, label, dispatch, id]);

  // Render stateless plot component
  return <LineSeriesRender {...otherProps} data={data} id={id} />;
}

function LineSeriesRender({
  id,
  data,
  lineStyle,
  displayMarker,
  markerShape = 'circle',
  markerSize = 3,
}: LineSeriesRenderProps) {
  // Get scales from context
  const { xScale, yScale, colorScaler } = usePlotContext();

  // calculates the path to display
  const color = colorScaler(id);
  const [path, markers] = useMemo(() => {
    if ([xScale, yScale].includes(undefined)) {
      return [null, null];
    }

    // Calculate line from D3
    const lineGenerator = line<Series>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    // Show markers
    const Marker = markersComps[markerShape];
    const markers = !displayMarker
      ? null
      : data.map(({ x, y }, i) => (
          <Marker
            // eslint-disable-next-line react/no-array-index-key
            key={`markers-${i}`}
            x={xScale(x)}
            y={yScale(y)}
            size={markerSize}
            fill={color}
          />
        ));

    return [lineGenerator(data), markers];
  }, [xScale, yScale, color, data, displayMarker, markerSize, markerShape]);
  if ([xScale, yScale].includes(null)) return null;

  // default style
  const style = {
    stroke: color,
    strokeWidth: 2,
    ...lineStyle,
  };

  return (
    <g>
      {markers}
      <path style={style} d={path} fill="none" />
    </g>
  );
}

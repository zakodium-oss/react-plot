import { extent } from 'd3-array';
import { line } from 'd3-shape';
import React, { CSSProperties, useEffect, useMemo, useState } from 'react';

import { useDispatchContext, usePlotContext } from '../hooks';
import type { LineSeriesProps, Series } from '../types';
import { getNextId } from '../utils';

import { Circle, Square, Triangle } from './Markers';

interface LineSeriesRenderProps {
  id: string;
  data: Series;
  lineStyle?: CSSProperties;
  displayMarker?: boolean;
  markerShape?: 'circle' | 'square' | 'triangle';
  markerSize?: number;
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
    const [xMin, xMax] = extent(data.x);
    const [yMin, yMax] = extent(data.y);
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
    if (
      [xScale, yScale].includes(undefined) ||
      data.x.length !== data.y.length
    ) {
      return [null, null];
    }

    // Format data for line function generator
    let series = [];
    for (let index = 0; index < data.x.length; index++) {
      const x = xScale(data.x[index]);
      const y = yScale(data.y[index]);
      series.push({ x, y });
    }

    // Calculate line from D3
    const lineGenerator = line<{ x: number; y: number }>()
      .x((d) => d.x)
      .y((d) => d.y);

    // Show markers
    const Marker = markersComps[markerShape];
    const markers = !displayMarker
      ? null
      : series.map(({ x, y }, i) => (
          <Marker
            // eslint-disable-next-line react/no-array-index-key
            key={`markers-${i}`}
            x={x}
            y={y}
            size={markerSize}
            fill={color}
          />
        ));

    return [lineGenerator(series), markers];
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

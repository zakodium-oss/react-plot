import { extent } from 'd3-array';
import React, { useEffect, useMemo, useState } from 'react';

import { useDispatchContext, usePlotContext } from '../hooks';
import type { ScatterSeriesProps, Series } from '../types';
import { getNextId } from '../utils';

import { Circle, Square, Triangle } from './Markers';

interface ScatterSeriesRenderProps {
  id: string;
  data: Series;
  markerShape?: 'circle' | 'square' | 'triangle';
  markerSize?: number;
}

const markersComps = {
  circle: Circle,
  square: Square,
  triangle: Triangle,
};

export default function ScatterSeries(props: ScatterSeriesProps) {
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
  return <ScatterSeriesRender {...otherProps} data={data} id={id} />;
}

function ScatterSeriesRender({
  id,
  data,
  markerShape = 'circle',
  markerSize = 3,
}: ScatterSeriesRenderProps) {
  // Get scales from context
  const { xScale, yScale, colorScaler } = usePlotContext();

  // calculates the path to display
  const color = colorScaler(id);
  const markers = useMemo(() => {
    if (
      [xScale, yScale].includes(undefined) ||
      data.x.length !== data.y.length
    ) {
      return null;
    }

    // Format data for line function generator
    let series = [];
    for (let index = 0; index < data.x.length; index++) {
      const x = xScale(data.x[index]);
      const y = yScale(data.y[index]);
      series.push({ x, y });
    }

    // Show markers
    const Marker = markersComps[markerShape];
    const markers = series.map(({ x, y }, i) => (
      <Marker
        // eslint-disable-next-line react/no-array-index-key
        key={`markers-${i}`}
        x={x}
        y={y}
        size={markerSize}
        fill={color}
      />
    ));

    return markers;
  }, [xScale, yScale, color, data, markerSize, markerShape]);
  if ([xScale, yScale].includes(null)) return null;

  return <g>{markers}</g>;
}

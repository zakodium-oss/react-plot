import { extent } from 'd3-array';
import React, { useEffect, useMemo, useState } from 'react';

import { useDispatchContext, usePlotContext } from '../hooks';
import type { ScatterSeriesProps } from '../types';
import { getNextId } from '../utils';

import { Circle, Square, Triangle } from './Markers';

interface ScatterSeriesRenderProps extends Omit<ScatterSeriesProps, 'label'> {
  id: string;
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
    const [xMin, xMax] = extent(data, (d) => d.x);
    const [yMin, yMax] = extent(data, (d) => d.y);
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
    if ([xScale, yScale].includes(undefined)) {
      return null;
    }

    // Show markers
    const Marker = markersComps[markerShape];
    const markers = data.map(({ x, y }, i) => (
      <Marker
        // eslint-disable-next-line react/no-array-index-key
        key={`markers-${i}`}
        x={xScale(x)}
        y={yScale(y)}
        size={markerSize}
        fill={color}
      />
    ));

    return markers;
  }, [xScale, yScale, color, data, markerSize, markerShape]);
  if ([xScale, yScale].includes(null)) return null;

  return <g>{markers}</g>;
}

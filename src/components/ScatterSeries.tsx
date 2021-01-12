import { extent } from 'd3-array';
import React, { useEffect, useMemo, useState } from 'react';

import { useDispatchContext, usePlotContext } from '../hooks';
import type { ScatterSeriesProps } from '../types';
import { getNextId, validateAxis } from '../utils';

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

  const { xAxis = 'x', yAxis = 'y', data, label, ...otherProps } = props;

  // Update plot context with data description
  const { dispatch } = useDispatchContext();
  useEffect(() => {
    const [xMin, xMax] = extent(data, (d) => d.x);
    const [yMin, yMax] = extent(data, (d) => d.y);
    const x = { min: xMin, max: xMax, axisId: xAxis };
    const y = { min: yMin, max: yMax, axisId: yAxis };
    dispatch({ type: 'newData', value: { id, x, y, label } });

    // Delete information on unmount
    return () => dispatch({ type: 'removeData', value: { id } });
  }, [dispatch, id, data, xAxis, yAxis, label]);

  // Render stateless plot component
  const inheretedProps = { data, id, xAxis, yAxis };
  return <ScatterSeriesRender {...otherProps} {...inheretedProps} />;
}

function ScatterSeriesRender({
  id,
  data,
  xAxis,
  yAxis,
  markerShape = 'circle',
  markerSize = 3,
}: ScatterSeriesRenderProps) {
  // Get scales from context
  const { axisContext, colorScaler } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, xAxis, yAxis);

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

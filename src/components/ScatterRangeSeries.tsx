import { extent } from 'd3-array';
import { useEffect, useMemo, useState } from 'react';

import { useDispatchContext, usePlotContext } from '../hooks';
import type { ScatterSeriesProps, SeriesRangePointType } from '../types';
import { getNextId, validateAxis } from '../utils';

import ErrorRangeBars from './ErrorRangeBars';

type ScatterRangeSeriesRenderProps = Omit<
  ScatterSeriesProps<SeriesRangePointType>,
  'label'
>;

export default function ScatterRangeSeries(
  props: ScatterSeriesProps<SeriesRangePointType>,
) {
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
    const [yMin, yMax] = extent(data, (d) => d.y2);
    const x = { min: xMin, max: xMax, axisId: xAxis };
    const y = { min: yMin, max: yMax, axisId: yAxis };
    dispatch({ type: 'newData', value: { id, x, y, label } });

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
      <ErrorRangeBars {...inheritedProps} {...errorBarsProps} />
      <ScatterSeriesRender {...otherProps} {...inheritedProps} />
    </g>
  );
}

function ScatterSeriesRender({
  data,
  xAxis,
  yAxis,
}: ScatterRangeSeriesRenderProps) {
  // Get scales from context
  const { axisContext } = usePlotContext();
  const [xScale, yScale] = validateAxis(axisContext, xAxis, yAxis);

  // calculates the path to display
  const markers = useMemo(() => {
    if ([xScale, yScale].includes(undefined)) return null;

    const markers = data.map((point, i) => {
      return (
        <g // eslint-disable-next-line react/no-array-index-key
          key={`markers-${i}`}
          transform={`translate(${xScale(point.x)}, ${yScale(point.y1)})`}
        />
      );
    });
    return markers;
  }, [xScale, yScale, data]);
  if (!markers) return null;

  return <g className="markers">{markers}</g>;
}

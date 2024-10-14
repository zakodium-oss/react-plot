import type { ScaleTime } from 'd3-scale';
import { memo, useRef } from 'react';
import { useTimeTicks } from 'react-d3-utils';

import HorizontalAxis from './HorizontalAxis.js';
import VerticalAxis from './VerticalAxis.js';
import type { AxisChildProps } from './types.js';

interface TimeAxisProps extends AxisChildProps<Date> {
  scale: ScaleTime<number, number>;
}

function TimeAxis(props: TimeAxisProps) {
  const { position, tickLabelFormat, scale, ...otherProps } = props;

  const axisRef = useRef<SVGGElement>(null);

  const direction =
    position === 'left' || position === 'right' ? 'vertical' : 'horizontal';

  const primaryTicks = useTimeTicks(scale, direction, axisRef, {
    tickFormat: tickLabelFormat,
  });

  const AxisComponent =
    direction === 'vertical' ? VerticalAxis : HorizontalAxis;

  return (
    <AxisComponent
      scale={scale}
      axisRef={axisRef}
      primaryTicks={primaryTicks}
      position={position}
      {...otherProps}
    />
  );
}

export default memo(TimeAxis);

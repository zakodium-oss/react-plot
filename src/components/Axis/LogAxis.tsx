import type { ScaleLogarithmic } from 'd3-scale';
import { memo, useRef } from 'react';
import { useLogTicks } from 'react-d3-utils';

import HorizontalAxis from './HorizontalAxis.js';
import VerticalAxis from './VerticalAxis.js';
import type { AxisChildProps } from './types.js';

interface LogAxisProps extends AxisChildProps<number> {
  scale: ScaleLogarithmic<number, number>;
}

function LogAxis(props: LogAxisProps) {
  const { position, tickLabelFormat, scale, ...otherProps } = props;

  const axisRef = useRef<SVGGElement>(null);

  const direction =
    position === 'left' || position === 'right' ? 'vertical' : 'horizontal';

  const primaryTicks = useLogTicks(scale, direction, axisRef, {
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

export default memo(LogAxis);

import type { ScaleLinear } from 'd3-scale';
import { memo, useRef } from 'react';
import { useLinearPrimaryTicks } from 'react-d3-utils';

import HorizontalAxis from './HorizontalAxis.js';
import VerticalAxis from './VerticalAxis.js';
import type { AxisChildProps } from './types.js';

interface LinearAxisProps extends AxisChildProps<number> {
  scale: ScaleLinear<number, number>;
}

function LinearAxis(props: LinearAxisProps) {
  const { position, tickLabelFormat, scale, ...otherProps } = props;

  const axisRef = useRef<SVGGElement>(null);

  const direction =
    position === 'left' || position === 'right' ? 'vertical' : 'horizontal';

  const { ticks: primaryTicks } = useLinearPrimaryTicks(
    scale,
    direction,
    axisRef,
    {
      tickFormat: tickLabelFormat,
    },
  );

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

export default memo(LinearAxis);

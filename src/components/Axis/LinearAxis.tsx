import { ScaleLinear } from 'd3-scale';
import { useRef } from 'react';
import { useLinearPrimaryTicks } from 'react-d3-utils';

import HorizontalAxis from './HorizontalAxis';
import VerticalAxis from './VerticalAxis';
import { AxisChildProps } from './types';

interface LinearAxisProps extends AxisChildProps {
  scale: ScaleLinear<number, number>;
}

function toExponential(value: number) {
  return value.toExponential(2);
}

export default function LinearAxis(props: LinearAxisProps) {
  const { position, scientific, scale, ...otherProps } = props;

  const axisRef = useRef<SVGGElement>(null);

  const direction =
    position === 'left' || position === 'right' ? 'vertical' : 'horizontal';

  const primaryTicks = useLinearPrimaryTicks(scale, direction, axisRef, {
    tickFormat: scientific ? toExponential : undefined,
  });

  const AxisComponent =
    direction === 'vertical' ? VerticalAxis : HorizontalAxis;
  return (
    <AxisComponent
      axisRef={axisRef}
      primaryTicks={primaryTicks}
      position={position}
      {...otherProps}
    />
  );
}

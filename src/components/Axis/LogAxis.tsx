import { ScaleLogarithmic } from 'd3-scale';
import { useRef } from 'react';
import { useLogTicks } from 'react-d3-utils';

import HorizontalAxis from './HorizontalAxis';
import VerticalAxis from './VerticalAxis';
import { AxisChildProps } from './types';

interface LogAxisProps extends AxisChildProps {
  scale: ScaleLogarithmic<number, number>;
}

function toExponential(value: number) {
  return value.toExponential(2);
}

export default function LinearAxis(props: LogAxisProps) {
  const { position, scientific, scale, ...otherProps } = props;

  const axisRef = useRef<SVGGElement>(null);

  const direction =
    position === 'left' || position === 'right' ? 'vertical' : 'horizontal';

  const primaryTicks = useLogTicks(scale, direction, axisRef, {
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

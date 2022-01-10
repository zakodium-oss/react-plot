import { ScaleLogarithmic } from 'd3-scale';
import { useRef } from 'react';
import { useLogTicks } from 'react-d3-utils';

import HorizontalAxis from './HorizontalAxis';
import VerticalAxis from './VerticalAxis';
import { AxisChildProps } from './types';

interface LogAxisProps extends AxisChildProps {
  scale: ScaleLogarithmic<number, number>;
}

export default function LinearAxis(props: LogAxisProps) {
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
      axisRef={axisRef}
      primaryTicks={primaryTicks}
      position={position}
      {...otherProps}
    />
  );
}

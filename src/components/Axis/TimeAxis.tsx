import { ScaleTime } from 'd3-scale';
import { useRef } from 'react';
import { useTimeTicks } from 'react-d3-utils';

import HorizontalAxis from './HorizontalAxis';
import VerticalAxis from './VerticalAxis';
import { AxisChildProps } from './types';

interface TimeAxisProps extends AxisChildProps {
  scale: ScaleTime<number, number>;
}

export default function TimeAxis(props: TimeAxisProps) {
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
      axisRef={axisRef}
      primaryTicks={primaryTicks}
      position={position}
      {...otherProps}
    />
  );
}

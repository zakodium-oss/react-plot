import { PrimaryLinearTicks, PrimaryLogTicks } from 'react-d3-utils';

import { Position } from '../../types';

interface HorizontalAxisGridLinesProps {
  plotHeight: number;
  primaryTicks: PrimaryLinearTicks[] | PrimaryLogTicks[];
  position: Position;
}

export default function HorizontalAxisGridLines(
  props: HorizontalAxisGridLinesProps,
) {
  const { plotHeight, primaryTicks, position: axisPosition } = props;
  return (
    <g>
      {primaryTicks.map(({ position }) => (
        <line
          key={position}
          x1={position}
          x2={position}
          y1={axisPosition === 'top' ? plotHeight : -plotHeight}
          y2="0"
          stroke="black"
          strokeDasharray="2,2"
          strokeOpacity={0.5}
        />
      ))}
    </g>
  );
}

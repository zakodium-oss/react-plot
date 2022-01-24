import { CSSProperties } from 'react';
import { PrimaryLinearTicks, PrimaryLogTicks, TimeTicks } from 'react-d3-utils';

import { Position, TicksType } from '../../types';

interface VerticalAxisGridlinesProps {
  plotWidth: number;
  primaryTicks: TicksType[];
  position: Position;
  style?: CSSProperties;
}

export default function VerticalAxisGridlines(
  props: VerticalAxisGridlinesProps,
) {
  const { plotWidth, style, primaryTicks, position: axisPosition } = props;
  return (
    <g>
      {primaryTicks.map(({ position }) => (
        <line
          key={position}
          x1="0"
          x2={axisPosition === 'left' ? plotWidth : -plotWidth}
          y1={position}
          y2={position}
          stroke="black"
          strokeDasharray="2,2"
          strokeOpacity={0.5}
          style={style}
        />
      ))}
    </g>
  );
}

import { CSSProperties } from 'react';

import { Position } from '../../types';

import { TicksType } from './types';

interface HorizontalAxisGridLinesProps {
  plotHeight: number;
  primaryTicks: TicksType[];
  position: Position;
  style?: CSSProperties;
}

export default function HorizontalAxisGridLines(
  props: HorizontalAxisGridLinesProps,
) {
  const { plotHeight, style, primaryTicks, position: axisPosition } = props;
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
          style={style}
        />
      ))}
    </g>
  );
}

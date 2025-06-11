import type { CSSProperties, ReactElement } from 'react';
import { useMemo } from 'react';

import type { Position } from '../../types.js';

import type { Scales, TicksType } from './types.js';

interface HorizontalAxisGridLinesProps {
  plotHeight: number;
  primaryTicks: TicksType[];
  position: Position;
  scale?: Scales;
  style?: CSSProperties;
  primaryGrid?: boolean;
  secondaryGrid?: boolean;
  secondaryStyle?: CSSProperties;
}

export default function HorizontalAxisGridLines(
  props: HorizontalAxisGridLinesProps,
) {
  const {
    plotHeight,
    style,
    primaryTicks,
    position: axisPosition,
    primaryGrid,
    secondaryGrid,
    secondaryStyle,
    scale,
  } = props;
  const Grid = useMemo(() => {
    const Grid: ReactElement[] = [];
    if (primaryGrid) {
      for (const { position } of primaryTicks) {
        Grid.push(
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
          />,
        );
      }
    }
    if (secondaryGrid) {
      const density = 5;
      const secondaryGridPosition =
        scale?.ticks(primaryTicks.length * density) || [];
      for (const tick of secondaryGridPosition) {
        const position = scale?.(tick);
        if (
          !position ||
          primaryTicks.map((tick) => tick.position).includes(position)
        ) {
          return null;
        }
        Grid.push(
          <line
            key={position}
            x1={position}
            x2={position}
            y1={axisPosition === 'top' ? plotHeight : -plotHeight}
            y2="0"
            stroke="black"
            strokeDasharray="5"
            strokeOpacity={0.2}
            style={secondaryStyle}
          />,
        );
      }
    }
    return Grid;
  }, [
    axisPosition,
    plotHeight,
    primaryGrid,
    primaryTicks,
    scale,
    secondaryGrid,
    secondaryStyle,
    style,
  ]);

  return <g>{Grid}</g>;
}

import { CSSProperties, useMemo } from 'react';

import { Position } from '../../types';

import { Scales, TicksType } from './types';

interface VerticalAxisGridlinesProps {
  plotWidth: number;
  primaryTicks: TicksType[];
  position: Position;
  style?: CSSProperties;
  scale?: Scales;
  primaryGrid?: boolean;
  secondaryGrid?: boolean;
  secondaryStyle?: CSSProperties;
}

export default function VerticalAxisGridlines(
  props: VerticalAxisGridlinesProps,
) {
  const {
    plotWidth,
    style,
    primaryTicks,
    position: axisPosition,
    primaryGrid,
    secondaryGrid,
    scale,
    secondaryStyle,
  } = props;

  const Grid = useMemo(() => {
    const Grid: JSX.Element[] = [];
    if (primaryGrid) {
      primaryTicks.forEach(({ position }) => {
        Grid.push(
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
          />,
        );
      });
    }
    if (secondaryGrid) {
      const density = 5;
      const secondaryGridPosition =
        scale?.ticks(primaryTicks.length * density) || [];
      secondaryGridPosition.forEach((tick) => {
        const position = scale?.(tick) || 0; // exclude the main ticks
        if (primaryTicks.map((tick) => tick.position).includes(position)) {
          return null;
        }
        Grid.push(
          <line
            key={position}
            x1="0"
            x2={axisPosition === 'left' ? plotWidth : -plotWidth}
            y1={position}
            y2={position}
            stroke="black"
            strokeDasharray="5"
            strokeOpacity={0.2}
            style={secondaryStyle}
          />,
        );
      });
    }
    return Grid;
  }, [
    axisPosition,
    plotWidth,
    primaryTicks,
    scale,
    secondaryGrid,
    secondaryStyle,
    style,
  ]);

  return <g>{Grid}</g>;
}

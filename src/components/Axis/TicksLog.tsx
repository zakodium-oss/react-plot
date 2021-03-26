import { CSSProperties, ReactNode, SVGAttributes } from 'react';

import type { TickType } from '../../types';

interface CoordinatesXY {
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
}

export interface TickLogProps {
  style: CSSProperties;
  children?: ReactNode;

  line: CoordinatesXY;
  text: Omit<CoordinatesXY, 'x2' | 'y2'>;
  secondary?: boolean;

  strokeColor?: string;
  strokeHeight?: number;
  anchor?: SVGAttributes<SVGTextElement>['textAnchor'];
  alignment?: SVGAttributes<SVGTextElement>['alignmentBaseline'];
}

export interface TicksLogProps extends Omit<TickLogProps, 'line' | 'text'> {
  hidden: boolean;
  ticks: TickType[];
  hiddenSecondaryTicks?: boolean;

  getPositions: (
    y: number,
  ) => { line: CoordinatesXY; text: Omit<CoordinatesXY, 'x2' | 'y2'> };
}

export function TicksLog(props: Omit<TicksLogProps, 'children'>) {
  const { hidden, ticks, getPositions, ...otherProps } = props;
  if (hidden) return null;

  // Primary Ticks
  let elements = ticks.map(({ label, position }) => {
    const { line, text } = getPositions(position);
    return (
      <TickLog key={label + position} line={line} text={text} {...otherProps}>
        {label}
      </TickLog>
    );
  });

  return <>{elements}</>;
}

export function TickLog(props: TickLogProps) {
  const {
    line: { x1: lineX1 = 0, x2: lineX2 = 0, y1: lineY1 = 0, y2: lineY2 = 0 },
    text: { x1: textX1 = 0, y1: textY1 = 0 },
    style,
    children,
    strokeColor = 'black',
    strokeHeight = 1,
    anchor = 'end',
    secondary = false,
  } = props;

  return (
    <g>
      <line
        x1={lineX1}
        x2={secondary && lineX1 !== lineX2 ? lineX2 * strokeHeight : lineX2}
        y1={lineY1}
        y2={secondary && lineY1 !== lineY2 ? lineY2 * strokeHeight : lineY2}
        stroke={strokeColor}
        strokeWidth={secondary ? 1 : 1.5}
      />
      {!secondary && (
        <text
          x={textX1}
          y={textY1}
          textAnchor={anchor}
          dominantBaseline="middle"
          style={{ userSelect: 'none', ...style }}
        >
          {children}
        </text>
      )}
    </g>
  );
}

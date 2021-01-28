import { ScaleLinear, ScaleTime } from 'd3-scale';
import React, { CSSProperties, ReactNode, SVGAttributes } from 'react';

interface CoordinatesXY {
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
}

export interface TickProps {
  style: CSSProperties;
  children: ReactNode;

  line: CoordinatesXY;
  text: Omit<CoordinatesXY, 'x2' | 'y2'>;

  strokeColor?: string;
  anchor?: SVGAttributes<SVGTextElement>['textAnchor'];
  alignment?: SVGAttributes<SVGTextElement>['alignmentBaseline'];
}

export interface TicksProps extends Omit<TickProps, 'line' | 'text'> {
  hidden: boolean;
  ticks: any[];
  scale: ScaleLinear<number, number, never> | ScaleTime<number, number, never>;
  scientific?: boolean;

  getPositions: (
    y: number,
  ) => { line: CoordinatesXY; text: Omit<CoordinatesXY, 'x2' | 'y2'> };
}

export function Ticks(props: Omit<TicksProps, 'children'>) {
  const {
    hidden,
    ticks,
    scale,
    getPositions,
    scientific = true,
    ...otherProps
  } = props;
  if (hidden) return null;

  const elements = ticks.map((tick) => {
    const { line, text } = getPositions(scale(tick));
    return (
      <Tick key={tick} line={line} text={text} {...otherProps}>
        {tick instanceof Date
          ? tick.toString()
          : scientific
          ? tick.toExponential(2)
          : tick}
      </Tick>
    );
  });

  return <>{elements}</>;
}

export function Tick(props: TickProps) {
  const {
    line: { x1: lineX1 = 0, x2: lineX2 = 0, y1: lineY1 = 0, y2: lineY2 = 0 },
    text: { x1: textX1 = 0, y1: textY1 = 0 },
    style,
    children,
    strokeColor = 'black',
    anchor = 'end',
  } = props;

  return (
    <g>
      <line
        x1={lineX1}
        x2={lineX2}
        y1={lineY1}
        y2={lineY2}
        stroke={strokeColor}
      />
      <text
        x={textX1}
        y={textY1}
        textAnchor={anchor}
        dominantBaseline="middle"
        style={{ userSelect: 'none', ...style }}
      >
        {children}
      </text>
    </g>
  );
}

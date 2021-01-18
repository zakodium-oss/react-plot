import { ScaleLinear } from 'd3-scale';
import React, { CSSProperties, ReactNode, SVGAttributes } from 'react';

interface NumberXY {
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
}

export interface TickProps {
  style: CSSProperties;
  children: ReactNode;

  line: NumberXY;
  text: Omit<NumberXY, 'x2' | 'y2'>;

  strokeColor?: string;
  anchor?: SVGAttributes<SVGTextElement>['textAnchor'];
  alignment?: SVGAttributes<SVGTextElement>['alignmentBaseline'];
}

export interface TicksProps extends Omit<TickProps, 'line' | 'text'> {
  show: boolean;
  ticks: number[];
  scale: ScaleLinear<number, number, never>;

  getValues: (
    y: number,
  ) => { line: NumberXY; text: Omit<NumberXY, 'x2' | 'y2'> };
  getText: (tick) => string;
}

export function Ticks(props: Omit<TicksProps, 'children'>) {
  const { show, ticks, scale, getValues, getText, ...otherProps } = props;
  if (!show) return null;

  const elements = ticks.map((tick) => {
    const { line, text } = getValues(scale(tick));
    return (
      <Tick
        key={tick}
        line={line}
        text={text}
        children={getText(tick)}
        {...otherProps}
      />
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
    alignment = 'auto',
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
        alignmentBaseline={alignment}
        style={{ userSelect: 'none', ...style }}
      >
        {children}
      </text>
    </g>
  );
}

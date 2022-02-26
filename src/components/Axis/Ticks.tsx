import { CSSProperties, ReactNode, SVGAttributes } from 'react';

import { TicksType, Scales } from './types';

interface CoordinatesXY {
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
}

export interface TickProps {
  children?: ReactNode;

  line: CoordinatesXY;
  text: Omit<CoordinatesXY, 'x2' | 'y2'>;
  secondary?: boolean;
  dominantBaseline?: string;
  strokeColor?: string;
  strokeHeight?: number;
  anchor?: SVGAttributes<SVGTextElement>['textAnchor'];
  labelStyle?: CSSProperties;
  style?: CSSProperties;
}

export interface TicksProps extends Omit<TickProps, 'line' | 'text'> {
  primaryTicks: TicksType[];
  secondaryTickLength: number;
  scale: Scales;
  secondaryTickStyle?: CSSProperties;
  getPositions: (
    y: number,
    secondary?: boolean,
  ) => {
    line: CoordinatesXY;
    text: Omit<CoordinatesXY, 'x2' | 'y2'>;
  };
}

export function Ticks(props: Omit<TicksProps, 'children'>) {
  const {
    primaryTicks,
    getPositions,
    secondaryTickLength,
    scale,
    secondaryTickStyle,
    style,
    ...otherProps
  } = props;
  // Primary Ticks
  let elements: Array<JSX.Element | null> = primaryTicks.map((tick) => {
    const { line, text } = getPositions(tick.position);
    return (
      <Tick
        key={tick.position}
        line={line}
        style={style}
        text={text}
        {...otherProps}
      >
        {tick.label}
      </Tick>
    );
  });

  if (secondaryTickLength !== 0) {
    // generate secondaryTicks according to the density of primaryTicks
    const range = Math.abs(scale?.range()[1] - scale?.range()[0]) || 0;
    const mainTicksDensity = range / primaryTicks.length;
    const density = mainTicksDensity < 50 ? 5 : 10;
    let secTicks = scale?.ticks(primaryTicks.length * density) || [];

    // add secondaryTicks to the elements array
    const secElements =
      secTicks.map((tick) => {
        // exclude the main ticks
        if (primaryTicks.map((tick) => tick.position).includes(scale(tick))) {
          return null;
        }
        const { line, text } = getPositions(scale(tick), true);
        return (
          <Tick
            key={String(tick)}
            line={line}
            text={text}
            secondary
            style={secondaryTickStyle}
            {...otherProps}
          />
        );
      }) || [];
    elements = [...secElements, ...elements];
  }
  return <>{elements}</>;
}

export function Tick(props: TickProps) {
  const {
    line: { x1: lineX1 = 0, x2: lineX2 = 0, y1: lineY1 = 0, y2: lineY2 = 0 },
    text: { x1: textX1 = 0, y1: textY1 = 0 },
    children,
    strokeColor = 'black',
    strokeHeight = 1,
    anchor = 'end',
    secondary = false,
    labelStyle,
    style,
    dominantBaseline = 'middle',
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
        style={style}
      />
      {!secondary && (
        <text
          x={textX1}
          y={textY1}
          textAnchor={anchor}
          dominantBaseline={dominantBaseline}
          style={labelStyle}
        >
          {children}
        </text>
      )}
    </g>
  );
}

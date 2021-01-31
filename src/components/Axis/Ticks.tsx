import { ScaleLinear } from 'd3-scale';
import React, { CSSProperties, ReactNode, SVGAttributes } from 'react';

interface CoordinatesXY {
  x1?: number;
  x2?: number;
  y1?: number;
  y2?: number;
}

export interface TickProps {
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

export interface TicksProps extends Omit<TickProps, 'line' | 'text'> {
  hidden: boolean;
  ticks: number[];
  scale: ScaleLinear<number, number, never>;
  scientific?: boolean;
  secondaryTicks?: boolean;

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
    secondaryTicks = true,
    ...otherProps
  } = props;
  if (hidden) return null;

  // Main Ticks
  let elements = ticks.map((tick) => {
    const { line, text } = getPositions(scale(tick));
    return (
      <Tick key={tick} line={line} text={text} {...otherProps}>
        {scientific ? tick.toExponential(2) : tick}
      </Tick>
    );
  });

  if (secondaryTicks) {
    // generate secondary Ticks according to the density of mainTicks
    const range = Math.abs(scale?.range()[1] - scale?.range()[0]) || 0;
    const mainTicksDensity = range / ticks.length;
    const density = mainTicksDensity < 50 ? 5 : 10;
    let secTicks = scale?.ticks(ticks.length * density) || [];

    // calculate middle tick position ([0,1]=> middle tick == 0.5)
    let middleTick = 0;
    let secTicksPerInterval = 0;
    if (ticks.length > 1) {
      let i = 0;
      while (secTicks[i] < ticks[1]) {
        while (secTicks[i] < ticks[0]) {
          i++;
          middleTick++;
        }
        secTicksPerInterval++;
        i++;
      }
    }
    const middleTickEnabled =
      secTicksPerInterval % 2 === 0 && secTicksPerInterval > 0;
    middleTick = middleTick - secTicksPerInterval / 2 + 1;

    // add secondaryTicks to the elements array
    const secElements =
      secTicks.map((tick) => {
        middleTick--;
        let strokeHeight = middleTickEnabled && middleTick === 0 ? 1 : 0.6;
        // exclude the main ticks
        if (ticks.includes(tick)) {
          middleTick = secTicksPerInterval / 2;
          return null;
        }
        const { line, text } = getPositions(scale(tick));
        return (
          <Tick
            key={tick}
            line={line}
            text={text}
            secondary={true}
            strokeHeight={strokeHeight}
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

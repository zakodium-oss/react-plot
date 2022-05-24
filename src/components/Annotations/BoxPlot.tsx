import { CSSProperties, MouseEventHandler } from 'react';

import { useBoxPlotPosition } from '../../hooks';
import { ScalarValue } from '../../types';

export interface AnnotationBoxPlotProps {
  min: ScalarValue;
  max: ScalarValue;
  q1: ScalarValue;
  median: ScalarValue;
  q3: ScalarValue;
  width: ScalarValue;
  y: ScalarValue;
  xAxis?: string;
  yAxis?: string;
  medianColor?: string;
  medianStyle?: CSSProperties;
  boxColor?: string;
  boxStyle?: CSSProperties;
  whiskerColor?: string;
  whiskerStyle?: CSSProperties;
  minMaxColor?: string;
  minMaxStyle?: CSSProperties;
  onMouseEnter?: MouseEventHandler<SVGGElement>;
  onMouseLeave?: MouseEventHandler<SVGGElement>;
}

export function BoxPlot(props: AnnotationBoxPlotProps) {
  const {
    medianColor = 'black',
    medianStyle,
    boxColor = 'black',
    boxStyle,
    whiskerColor = 'black',
    whiskerStyle,
    minMaxColor = 'black',
    minMaxStyle,
    onMouseEnter,
    onMouseLeave,
    xAxis = 'x',
    yAxis = 'y',
    ...position
  } = props;
  const { min, max, q1, median, q3, width, y, horizontal } = useBoxPlotPosition(
    { ...position, xAxis, yAxis },
  );
  const y1 = y - width / 2;
  const y2 = y + width / 2;
  const height = Math.abs(q3 - q1);
  return (
    <g onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {/* whiskers */}
      <line
        x1={horizontal ? min : y}
        x2={horizontal ? q1 : y}
        y1={horizontal ? y : min}
        y2={horizontal ? y : q1}
        stroke={whiskerColor}
        style={whiskerStyle}
      />
      <line
        x1={horizontal ? q3 : y}
        x2={horizontal ? max : y}
        y1={horizontal ? y : q3}
        y2={horizontal ? y : max}
        stroke={whiskerColor}
        style={whiskerStyle}
      />
      {/* box */}
      <rect
        x={horizontal ? Math.min(q1, q3) : y1}
        y={horizontal ? y1 : Math.min(q1, q3)}
        width={horizontal ? height : width}
        height={horizontal ? width : height}
        stroke={boxColor}
        style={boxStyle}
        fill="none"
      />
      {/* median */}
      <line
        x1={horizontal ? median : y1}
        x2={horizontal ? median : y2}
        y1={horizontal ? y1 : median}
        y2={horizontal ? y2 : median}
        stroke={medianColor}
        style={medianStyle}
      />
      {/* box */}
      <rect
        x={horizontal ? Math.min(q1, q3) : y1}
        y={horizontal ? y1 : Math.min(q1, q3)}
        width={horizontal ? height : width}
        height={horizontal ? width : height}
        stroke={boxColor}
        style={{ ...boxStyle, fill: 'none' }}
        fill="none"
      />
      {/* min */}
      <line
        x1={horizontal ? min : y1}
        x2={horizontal ? min : y2}
        y1={horizontal ? y1 : min}
        y2={horizontal ? y2 : min}
        stroke={minMaxColor}
        style={minMaxStyle}
      />
      {/* max */}
      <line
        x1={horizontal ? max : y1}
        x2={horizontal ? max : y2}
        y1={horizontal ? y1 : max}
        y2={horizontal ? y2 : max}
        stroke={minMaxColor}
        style={minMaxStyle}
      />
    </g>
  );
}

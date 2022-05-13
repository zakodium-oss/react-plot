import { useBoxPlotPosition } from '../../hooks';
import { ScalarValue } from '../../types';

export interface AnnotationBoxPlotProps {
  xAxis?: string;
  yAxis?: string;
  min: ScalarValue;
  max: ScalarValue;
  q1: ScalarValue;
  median: ScalarValue;
  q3: ScalarValue;
  width: ScalarValue;
  y: ScalarValue;
  medianWidth?: number | `${number}`;
  medianColor?: string;
  strokeWidth?: number | `${number}`;
  strokeColor?: string;
  fillColor?: string;
  whiskerWidth?: number | `${number}`;
  whiskerColor?: string;
  minMaxWidth?: number | `${number}`;
  minMaxColor?: string;
}

export function BoxPlot(props: AnnotationBoxPlotProps) {
  const {
    medianWidth,
    medianColor = 'black',
    strokeWidth,
    strokeColor = 'black',
    fillColor = 'none',
    whiskerWidth,
    whiskerColor = 'black',
    minMaxWidth,
    minMaxColor = 'black',
    ...position
  } = props;
  const { min, max, q1, median, q3, width, y, horizontal } =
    useBoxPlotPosition(position);
  const y1 = y - width / 2;
  const y2 = y + width / 2;
  const height = Math.abs(q3 - q1);
  return (
    <g>
      {/* interquartile range */}
      <rect
        x={horizontal ? q1 : y1}
        y={horizontal ? y1 : q1}
        width={horizontal ? height : width}
        height={horizontal ? width : height}
        strokeWidth={strokeWidth}
        stroke={strokeColor}
        fill={fillColor}
      />
      {/* min */}
      <line
        x1={horizontal ? min : y1}
        x2={horizontal ? min : y2}
        y1={horizontal ? y1 : min}
        y2={horizontal ? y2 : min}
        stroke={minMaxColor}
        strokeWidth={minMaxWidth}
      />
      {/* max */}
      <line
        x1={horizontal ? max : y1}
        x2={horizontal ? max : y2}
        y1={horizontal ? y1 : max}
        y2={horizontal ? y2 : max}
        stroke={minMaxColor}
        strokeWidth={minMaxWidth}
      />
      {/* median */}
      <line
        x1={horizontal ? median : y1}
        x2={horizontal ? median : y2}
        y1={horizontal ? y1 : median}
        y2={horizontal ? y2 : median}
        stroke={medianColor}
        strokeWidth={medianWidth}
      />
      {/* whiskers */}
      <line
        x1={horizontal ? min : y}
        x2={horizontal ? q1 : y}
        y1={horizontal ? y : min}
        y2={horizontal ? y : q1}
        strokeWidth={whiskerWidth}
        stroke={whiskerColor}
      />
      <line
        x1={horizontal ? q3 : y}
        x2={horizontal ? max : y}
        y1={horizontal ? y : q3}
        y2={horizontal ? y : max}
        strokeWidth={whiskerWidth}
        stroke={whiskerColor}
      />
    </g>
  );
}

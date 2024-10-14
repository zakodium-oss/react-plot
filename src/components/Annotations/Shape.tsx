import type { CSSProperties, MouseEventHandler } from 'react';

import { usePosition } from '../../hooks.js';
import type { ScalarValue } from '../../types.js';
import {
  Circle as CircleMarker,
  Diamond as DiamondMarker,
  Square as SquareMarker,
  Triangle as TriangleMarker,
} from '../Markers.js';

const shapes = {
  triangle: Triangle,
  circle: Circle,
  diamond: Diamond,
  square: Square,
};

export type AnnotationShapeName = 'triangle' | 'circle' | 'diamond' | 'square';

interface IntAnnotationShape {
  size: number;
  style?: CSSProperties;
}

function Triangle(props: IntAnnotationShape) {
  return <TriangleMarker size={props.size} style={props.style} />;
}

function Circle(props: IntAnnotationShape) {
  return <CircleMarker size={props.size} style={props.style} />;
}

function Diamond(props: IntAnnotationShape) {
  return <DiamondMarker size={props.size} style={props.style} />;
}

function Square(props: IntAnnotationShape) {
  return <SquareMarker size={props.size} style={props.style} />;
}

export interface AnnotationShapeProps {
  x: ScalarValue;
  y: ScalarValue;
  shape: AnnotationShapeName;
  size: number;
  xAxis?: string;
  yAxis?: string;
  style?: CSSProperties;
  color?: string;
  onMouseEnter?: MouseEventHandler<SVGGElement>;
  onMouseLeave?: MouseEventHandler<SVGGElement>;
}

export function Shape(props: AnnotationShapeProps) {
  const {
    shape,
    x: xOld,
    y: yOld,
    onMouseEnter,
    onMouseLeave,
    color,
    size,
    style,
    xAxis = 'x',
    yAxis = 'y',
  } = props;
  const Figure = shapes[shape];

  if (!Figure) {
    throw new Error(`Invalid shape: "${shape}"`);
  }

  const { x, y } = usePosition({ x: xOld, y: yOld, xAxis, yAxis });

  return (
    <g
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      transform={`translate(${x}, ${y})`}
    >
      <Figure size={size} style={{ fill: color, ...style }} />
    </g>
  );
}

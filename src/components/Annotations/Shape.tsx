import { CSSProperties } from 'react';

import { usePosition } from '../../hooks';
import {
  Circle as CircleMarker,
  Triangle as TriangleMarker,
  Diamond as DiamondMarker,
  Square as SquareMarker,
} from '../Markers';

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
  x: string | number;
  y: string | number;
  shape: AnnotationShapeName;
  size: number;
  style?: CSSProperties;
  color?: string;
}

export function Shape(props: AnnotationShapeProps) {
  const Figure = shapes[props.shape];

  if (!Figure) {
    throw new Error(`Invalid shape: "${props.shape}"`);
  }

  const { x, y } = usePosition({ x: props.x, y: props.y });

  return (
    <g transform={`translate(${x}, ${y})`}>
      <Figure size={props.size} style={{ fill: props.color, ...props.style }} />
    </g>
  );
}

import React, { CSSProperties } from 'react';

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

export type AnnotationShapeList = 'triangle' | 'circle' | 'diamond' | 'square';

interface IntAnnotationShape {
  size: number;
  style: CSSProperties;
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

interface ShapeProps {
  x: number;
  y: number;
  shape: AnnotationShapeList;
  size: number;
  style: CSSProperties;
}

export default function Shape(props: ShapeProps) {
  const Figure = shapes[props.shape];

  return (
    <g transform={`translate(${props.x}, ${props.y})`}>
      <Figure size={props.size} style={props.style} />
    </g>
  );
}

import { CSSProperties } from 'react';

export interface MarkersProps {
  size: number;
  style?: CSSProperties;
}

const halfPi = Math.PI / 2;
const twoPi = Math.PI * 2;

export function Circle({ style, size }: MarkersProps) {
  return <circle r={size / 2} style={style} />;
}

export function Square({ style, size }: MarkersProps) {
  const x = size / 2;
  return <rect x={-x} y={-x} width={size} height={size} style={style} />;
}

export function Diamond({ size, style }: MarkersProps) {
  const x = size / 2;
  return <polygon points={`0,${-x} ${x},0 0,${x} ${-x},0`} style={style} />;
}

export function Triangle({ style, size }: MarkersProps) {
  const height = (Math.sqrt(3) * size) / 2;
  const x = size / 2;
  return (
    <polygon
      transform={`translate(0, -${(size - height) / 2})`}
      points={`${-x},${x} ${x},${x} 0,${x - height}`}
      style={style}
    />
  );
}

export function Cross({ size, style }: MarkersProps) {
  const x = size / 2;
  return (
    <g strokeWidth={1} style={style}>
      <line x1={0} x2={0} y1={x} y2={-x} />
      <line x1={-x} x2={x} y1={0} y2={0} />
    </g>
  );
}

export function XMark(props: MarkersProps) {
  return (
    <g transform="rotate(45)">
      <Cross {...props} />
    </g>
  );
}

export function Pentagon({ style, size }: MarkersProps) {
  return (
    <polygon
      points={Array.from(getPolyPoints(size, 5)).join(' ')}
      style={style}
    />
  );
}

export function Star({ style, size }: MarkersProps) {
  const ext = Array.from(getPolyPoints(size, 5, 0));
  const int = Array.from(getPolyPoints(size / 2.5, 5, (2 * Math.PI) / 10));

  const points: string[] = [];
  for (let i = 0; i < ext.length; i++) {
    points.push(ext[i], int[i]);
  }

  return <polygon points={points.join(' ')} style={style} />;
}

export function Hexagon({ style, size }: MarkersProps) {
  return (
    <polygon
      points={Array.from(getPolyPoints(size, 6)).join(' ')}
      style={style}
    />
  );
}

/**
 * https://math.stackexchange.com/a/3582355
 */
function* getPolyPoints(diameter: number, k: number, angle = 0) {
  const r = diameter / 2;

  for (let i = 0; i < k; i++) {
    const calculation = (twoPi * i) / k - halfPi + angle;

    const x = r * Math.cos(calculation);
    const y = r * Math.sin(calculation);

    yield `${x},${y}`;
  }
}

import type { CSSProperties } from 'react';

interface VerticalAxisLineProps {
  plotHeight: number;
  style?: CSSProperties;
}

export default function VerticalAxisLine(props: VerticalAxisLineProps) {
  const { plotHeight, style } = props;
  return <line y1={0} y2={plotHeight} stroke="black" style={style} />;
}

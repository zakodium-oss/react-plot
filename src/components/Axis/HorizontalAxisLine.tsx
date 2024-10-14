import type { CSSProperties } from 'react';

interface HorizontalAxisLineProps {
  plotWidth: number;
  style?: CSSProperties;
}

export default function HorizontalAxisLine(props: HorizontalAxisLineProps) {
  const { plotWidth, style } = props;
  return <line x1={0} x2={plotWidth} stroke="black" style={style} />;
}

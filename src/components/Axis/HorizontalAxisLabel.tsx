import type { CSSProperties, ReactNode } from 'react';
import { type Align, AlignGroup } from 'react-d3-utils';

interface HorizontalAxisLabelProps {
  plotWidth: number;
  label: ReactNode;
  labelStyle?: CSSProperties;
  verticalAlign: Align;
}

export default function HorizontalAxisLabel(props: HorizontalAxisLabelProps) {
  const { plotWidth, label, labelStyle, verticalAlign } = props;
  return (
    <AlignGroup
      x={plotWidth / 2}
      y={0}
      horizontalAlign="middle"
      verticalAlign={verticalAlign}
    >
      <text textAnchor="middle" style={labelStyle}>
        {label}
      </text>
    </AlignGroup>
  );
}

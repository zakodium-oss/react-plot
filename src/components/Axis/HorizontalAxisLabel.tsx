import { CSSProperties, ReactNode } from 'react';
import { AlignGroup } from 'react-d3-utils';

interface HorizontalAxisLabelProps {
  plotWidth: number;
  label: ReactNode;
  labelStyle: CSSProperties;
}

export default function HorizontalAxisLabel(props: HorizontalAxisLabelProps) {
  const { plotWidth, label, labelStyle } = props;
  return (
    <AlignGroup
      x={plotWidth / 2}
      y={0}
      horizontalAlign="middle"
      verticalAlign="start"
    >
      <text textAnchor="middle" style={labelStyle}>
        {label}
      </text>
    </AlignGroup>
  );
}

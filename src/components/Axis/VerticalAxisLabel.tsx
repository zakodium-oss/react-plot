import { CSSProperties, ReactNode } from 'react';
import { AlignGroup } from 'react-d3-utils';

interface VerticalAxisLabelProps {
  plotHeight: number;
  label: ReactNode;
  labelStyle: CSSProperties;
}

export default function VerticalAxisLabel(props: VerticalAxisLabelProps) {
  const { plotHeight, label, labelStyle } = props;
  return (
    <AlignGroup
      x={0}
      y={plotHeight / 2}
      horizontalAlign="middle"
      verticalAlign="middle"
    >
      <text textAnchor="middle" style={labelStyle}>
        {label}
      </text>
    </AlignGroup>
  );
}

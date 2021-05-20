import { CSSProperties, ReactNode } from 'react';
import { AlignGroup } from 'react-d3-utils';

interface HorizontalAxisLabelProps {
  plotWidth: number;
  label: ReactNode;
  labelSpace: number;
  labelStyle: CSSProperties;
}

export default function HorizontalAxisLabel(props: HorizontalAxisLabelProps) {
  const { plotWidth, label, labelSpace, labelStyle } = props;
  return (
    <AlignGroup
      x={plotWidth / 2}
      y={labelSpace}
      horizontalAlign="middle"
      verticalAlign="start"
    >
      <text textAnchor="middle" style={labelStyle}>
        {label}
      </text>
    </AlignGroup>
  );
}
